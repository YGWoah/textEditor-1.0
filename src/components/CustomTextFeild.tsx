import { useEffect, KeyboardEvent, useState, useRef } from 'react';
import JsonDiplayer from './JsonDiplayer';

type TextStyle = {
  italic: boolean;
  bold: boolean;
  underline: boolean;
  link: boolean;
  heading: boolean;
};

type OpsArray = {
  insert: string;
  attributes: TextStyle;
}[];

type TextConvertedToJSON = {
  ops: OpsArray;
} | null;

const CustomTextFeild = ({
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
        let updatedOps = textConvertedToJSON?.ops;
        if (updatedOps.length === 0) return;
        updatedOps.pop(); // Remove the last element
        setTextConvertedToJSON({
          ops: updatedOps,
        });
      } else if (key === 'Backspace') {
        // Handle Backspace
        let updatedOps = textConvertedToJSON?.ops;
        if (!updatedOps || updatedOps.length === 0) {
          return;
        } else {
          let lastInsert = updatedOps[updatedOps.length - 1];
          if (lastInsert && lastInsert.insert.length > 0) {
            lastInsert.insert = lastInsert.insert.slice(0, -1);
            if (lastInsert.insert.length === 0) {
              updatedOps.pop();
            } else updatedOps[updatedOps?.length - 1] = lastInsert;
          } else {
            updatedOps.pop();
          }
          setTextConvertedToJSON({
            ops: updatedOps,
          });
        }
      } else if (key === ' ') {
        event.preventDefault();

        setTextConvertedToJSON((prevTextConvertedToJSON) => {
          if (prevTextConvertedToJSON) {
            let updatedOps = prevTextConvertedToJSON.ops;
            updatedOps[updatedOps.length - 1].insert += ' ';
            return {
              ops: updatedOps,
            };
          }
          return null;
        });
      } else if (key === 'Enter') {
        // Handle Enter

        setTextConvertedToJSON((prevTextConvertedToJSON) => {
          if (prevTextConvertedToJSON) {
            let updatedOps = prevTextConvertedToJSON.ops;
            updatedOps[updatedOps.length - 1].insert += '\n';
            return {
              ops: updatedOps,
            };
          }
          return null;
        });
      } else if (keyIsNormalLetter) {
        if (
          textConvertedToJSON &&
          textConvertedToJSON?.ops?.length > 0
        ) {
          let lastInsert =
            textConvertedToJSON.ops[
              textConvertedToJSON.ops.length - 1
            ];

          if (lastInsert.attributes !== textStyle) {
            setTextConvertedToJSON({
              ops: [
                ...textConvertedToJSON.ops,
                {
                  insert: key,
                  attributes: textStyle,
                },
              ],
            });
          } else {
            let updatedOps = textConvertedToJSON.ops;
            updatedOps[updatedOps.length - 1].insert += key;
            setTextConvertedToJSON({
              ops: updatedOps,
            });
          }
        } else {
          setTextConvertedToJSON({
            ops: [
              {
                insert: key,
                attributes: textStyle,
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
        <JsonDiplayer
          textConvertedToJSON={textConvertedToJSON}
          isClickedInside={isClickedInside}
        />
      </div>
    </div>
  );
};

export default CustomTextFeild;
