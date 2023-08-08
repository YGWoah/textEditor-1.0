import { KeyboardEvent } from "react";

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

type JustifyValue = "left" | "center" | "right";

type Paragraph = {
  textSegments: TextSegment[];
  justify: JustifyValue;
};

type TextConvertedToJSON = {
  paragraphs: Paragraph[];
} | null;

type CursorPosition = {
  paragraphIndex: number;
  textSegmentIndex: number;
  position: number;
} | null;

const handleKeyDown = (
  event: KeyboardEvent<HTMLDivElement>,
  textStyle: TextStyle,
  setTextStyle: React.Dispatch<React.SetStateAction<TextStyle>>,
  textConvertedToJSON: TextConvertedToJSON,
  setTextConvertedToJSON: React.Dispatch<
    React.SetStateAction<TextConvertedToJSON>
  >,
  setJustify: React.Dispatch<React.SetStateAction<JustifyValue>>,
  justify: JustifyValue,
  setCursorPosition: React.Dispatch<React.SetStateAction<CursorPosition>>
) => {
  const key = event.key;
  const keyIsNormalLetter = /^[a-zA-Z]$/.test(key);

  const changeTextStyle = (key: keyof TextStyle) => {
    // this function is used to change the text style becasue there's a lot of repetition in the code
    setTextStyle((prevState: TextStyle) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleKeyPress = () => {
    if (event.shiftKey) {
      // Handle Shift + key
    } else if (event.ctrlKey && key === "b") {
      event.preventDefault(); // Prevent the default browser behavior
      changeTextStyle("bold");
    } else if (event.ctrlKey && key === "i") {
      event.preventDefault();
      changeTextStyle("italic");
    } else if (event.ctrlKey && key === "u") {
      event.preventDefault();
      changeTextStyle("underline");
    } else if (event.ctrlKey && key === "l") {
      event.preventDefault();
      setJustify("left");
    } else if (event.ctrlKey && key === "e") {
      event.preventDefault();
      setJustify("center");
    } else if (event.ctrlKey && key === "r") {
      event.preventDefault();
      setJustify("right");
    } else if (event.ctrlKey && key === "Backspace") {
      event.preventDefault(); // Prevent the default browser behavior
      if (!textConvertedToJSON) return;
      let updatedParagraphs = textConvertedToJSON.paragraphs;
      if (updatedParagraphs.length === 0) return;
      let lastParagraph = updatedParagraphs[updatedParagraphs.length - 1];
      let updatedTextSegments = lastParagraph.textSegments;
      if (updatedTextSegments.length === 0) return;
      updatedTextSegments.pop();
      if (updatedTextSegments.length === 0) {
        updatedParagraphs.pop();
      }
      setTextConvertedToJSON({
        paragraphs: updatedParagraphs,
      });
    } else if (key === "Backspace") {
      // Handle Backspace
      if (!textConvertedToJSON) return;
      let updatedParagraphs = textConvertedToJSON.paragraphs;
      if (updatedParagraphs.length === 0) return;
      let lastParagraph = updatedParagraphs[updatedParagraphs.length - 1];
      let updatedTextSegments = lastParagraph.textSegments;
      if (updatedTextSegments.length === 0) return;
      let lastTextSegment = updatedTextSegments[updatedTextSegments.length - 1];
      if (lastTextSegment.insert.length > 0) {
        lastTextSegment.insert = lastTextSegment.insert.slice(0, -1);
      } else {
        updatedTextSegments.pop();
      }
      if (updatedTextSegments.length === 0) {
        updatedParagraphs.pop();
      }
      setTextConvertedToJSON({
        paragraphs: updatedParagraphs,
      });
    } else if (key === " ") {
      event.preventDefault();

      setTextConvertedToJSON((prevTextConvertedToJSON) => {
        if (prevTextConvertedToJSON) {
          let updatedParagraphs = prevTextConvertedToJSON.paragraphs;
          let lastParagraph = updatedParagraphs[updatedParagraphs.length - 1];
          let updatedTextSegments = lastParagraph.textSegments;
          updatedTextSegments[updatedTextSegments.length - 1].insert += " ";
          return {
            paragraphs: updatedParagraphs,
          };
        }
        return null;
      });
    } else if (key === "Enter") {
      // Handle Enter
      setTextConvertedToJSON((prevTextConvertedToJSON) => {
        if (prevTextConvertedToJSON) {
          const updatedParagraphs = [...prevTextConvertedToJSON.paragraphs];
          const lastParagraph = updatedParagraphs[updatedParagraphs.length - 1];
          const updatedTextSegments = lastParagraph.textSegments;
          updatedTextSegments[updatedTextSegments.length - 1].insert += "\n";

          // Create a new paragraph with an empty text segment
          const newParagraph: Paragraph = {
            textSegments: [{ insert: "", attributes: textStyle }],
            justify: justify,
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
        let lastParagraph = updatedParagraphs[updatedParagraphs.length - 1];
        let updatedTextSegments = lastParagraph?.textSegments;
        if (
          //this if statement is used to check if the last text segment has the same text style as the current text style
          updatedTextSegments.length === 0 ||
          lastParagraph.textSegments[lastParagraph.textSegments.length - 1]
            .attributes !== textStyle
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
              textSegments: [{ insert: key, attributes: textStyle }],
              justify: justify,
            },
          ],
        });
      }
    }
  };

  handleKeyPress();
};

export default handleKeyDown;
