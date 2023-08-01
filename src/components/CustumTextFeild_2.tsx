import { useEffect, KeyboardEvent, useState, useRef } from 'react';
import JsonDiplayer_2 from './JsonDisplay_2';

// type TextStyle = {
//   italic: boolean;
//   bold: boolean;
//   underline: boolean;
//   link: string | null;
//   heading: boolean;
//   color: string;
//   fontSize: string;
// };

type TextStyle = {
  italic: boolean;
  bold: boolean;
  underline: boolean;
  link: boolean;
  heading: boolean;
};
type TextSegment = {
  insert: string;
  attributes: TextStyle;
};

type Paragraph = {
  textSegments: TextSegment[];
  justify: 'left' | 'center' | 'right';
};

type TextConvertedToJSON = {
  paragraphs: Paragraph[];
} | null;

const CustomTextFeild_2 = ({
  textStyle,
  setTextStyle,
}: {
  textStyle: TextStyle;
  setTextStyle: React.Dispatch<React.SetStateAction<TextStyle>>;
}) => {
  const [textConvertedToJSON, setTextConvertedToJSON] =
    useState<TextConvertedToJSON>(null);
  const [title, setTitle] = useState<string>('');

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const key = event.key;
    const keyIsNormalLetter = /^[a-zA-Z]$/.test(key);

    const changeTextStyle = (key: keyof TextStyle) => {
      setTextStyle((prevState: TextStyle) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
    };

    const handleKeyPress = () => {
      if (event.shiftKey) {
        // Handle Shift + key
      } else if (event.ctrlKey && key === 'b') {
        event.preventDefault(); // Prevent the default browser behavior
        changeTextStyle('bold');
      } else if (event.ctrlKey && key === 'i') {
        event.preventDefault();
        changeTextStyle('italic');
      } else if (event.ctrlKey && key === 'u') {
        event.preventDefault();
        changeTextStyle('underline');
      } else if (event.ctrlKey && key === 'Backspace') {
        event.preventDefault(); // Prevent the default browser behavior
        if (!textConvertedToJSON) return;
        let updatedParagraphs = textConvertedToJSON.paragraphs;
        if (updatedParagraphs.length === 0) return;
        let lastParagraph =
          updatedParagraphs[updatedParagraphs.length - 1];
        let updatedTextSegments = lastParagraph.textSegments;
        if (updatedTextSegments.length === 0) return;
        updatedTextSegments.pop();
        if (updatedTextSegments.length === 0) {
          updatedParagraphs.pop();
        }
        setTextConvertedToJSON({
          paragraphs: updatedParagraphs,
        });
      } else if (key === 'Backspace') {
        // Handle Backspace
        if (!textConvertedToJSON) return;
        let updatedParagraphs = textConvertedToJSON.paragraphs;
        if (updatedParagraphs.length === 0) return;
        let lastParagraph =
          updatedParagraphs[updatedParagraphs.length - 1];
        let updatedTextSegments = lastParagraph.textSegments;
        if (updatedTextSegments.length === 0) return;
        let lastTextSegment =
          updatedTextSegments[updatedTextSegments.length - 1];
        if (lastTextSegment.insert.length > 0) {
          lastTextSegment.insert = lastTextSegment.insert.slice(
            0,
            -1
          );
        } else {
          updatedTextSegments.pop();
        }
        if (updatedTextSegments.length === 0) {
          updatedParagraphs.pop();
        }
        setTextConvertedToJSON({
          paragraphs: updatedParagraphs,
        });
      } else if (key === ' ') {
        event.preventDefault();

        setTextConvertedToJSON((prevTextConvertedToJSON) => {
          if (prevTextConvertedToJSON) {
            let updatedParagraphs =
              prevTextConvertedToJSON.paragraphs;
            let lastParagraph =
              updatedParagraphs[updatedParagraphs.length - 1];
            let updatedTextSegments = lastParagraph.textSegments;
            updatedTextSegments[
              updatedTextSegments.length - 1
            ].insert += ' ';
            return {
              paragraphs: updatedParagraphs,
            };
          }
          return null;
        });
      } else if (key === 'Enter') {
        // Handle Enter
        setTextConvertedToJSON((prevTextConvertedToJSON) => {
          if (prevTextConvertedToJSON) {
            const updatedParagraphs = [
              ...prevTextConvertedToJSON.paragraphs,
            ];
            const lastParagraph =
              updatedParagraphs[updatedParagraphs.length - 1];
            const updatedTextSegments = lastParagraph.textSegments;
            updatedTextSegments[
              updatedTextSegments.length - 1
            ].insert += '\n';

            // Create a new paragraph with an empty text segment
            const newParagraph: Paragraph = {
              textSegments: [{ insert: '', attributes: textStyle }],
              justify: 'left',
            };

            return {
              paragraphs: [...updatedParagraphs, newParagraph],
            };
          }
          return null;
        });
      } else if (keyIsNormalLetter) {
        if (textConvertedToJSON?.paragraphs[0]) {
          let updatedParagraphs = textConvertedToJSON.paragraphs;
          let lastParagraph =
            updatedParagraphs[updatedParagraphs.length - 1];
          let updatedTextSegments = lastParagraph?.textSegments;
          if (
            updatedTextSegments.length === 0 ||
            lastParagraph.textSegments[
              lastParagraph.textSegments.length - 1
            ].attributes !== textStyle
          ) {
            updatedTextSegments.push({
              insert: key,
              attributes: textStyle,
            });
            setTextConvertedToJSON({
              paragraphs: updatedParagraphs,
            });
          } else {
            let lastTextSegment =
              updatedTextSegments[updatedTextSegments.length - 1];
            lastTextSegment.insert += key;
            setTextConvertedToJSON({
              paragraphs: updatedParagraphs,
            });
          }
        } else {
          setTextConvertedToJSON({
            paragraphs: [
              {
                textSegments: [
                  { insert: key, attributes: textStyle },
                ],
                justify: 'left',
              },
            ],
          });
        }
      }
    };

    handleKeyPress();
  };

  const handleTitleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>
  ) => {
    const key = event.key;
    const keyIsNormalLetter = /^[a-zA-Z]$/.test(key);
    if (keyIsNormalLetter) {
      setTitle((prevState) => {
        return prevState + event.key;
      });
    } else if (event.ctrlKey && key === 'Backspace') {
      setTitle('');
    } else if (key === 'Backspace') {
      setTitle((prevState) => {
        return prevState.slice(0, -1);
      });
    }
  };

  const targetDivRef = useRef<HTMLDivElement>(null);
  const [isClickedInside, setIsClickedInside] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      targetDivRef.current &&
      !targetDivRef.current.contains(event.target as Node)
    ) {
      setIsClickedInside(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  console.log(textConvertedToJSON);
  console.log(isClickedInside);

  return (
    <div className="flex items-center flex-col w-full">
      <div
        className="font-bold text-3xl"
        tabIndex={0}
        onKeyDown={(e) => {
          handleTitleKeyDown(e);
        }}
      >
        {title.length > 0 ? title : 'Post title here...'}
      </div>
      <div
        onClick={() => {
          setIsClickedInside(true);
        }}
        tabIndex={0}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
        ref={targetDivRef}
        className="cursor-text w-full md:w-2/3 h-96 rounded-lg bg-gray-50 break-words p-4"
      >
        <JsonDiplayer_2
          textConvertedToJSON={textConvertedToJSON}
          isClickedInside={isClickedInside}
        />
      </div>
    </div>
  );
};

export default CustomTextFeild_2;
