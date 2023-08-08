import { SetStateAction } from "react";
import {
  TextStyle,
  TextConvertedToJSON,
  JustifyValue,
  CursorPosition,
} from "../../types/types";

const handleNormalKey = (
  key: string,
  textConvertedToJSON: TextConvertedToJSON,
  textStyle: TextStyle,
  setTextConvertedToJSON: React.Dispatch<SetStateAction<TextConvertedToJSON>>,
  setCursorPosition: React.Dispatch<SetStateAction<CursorPosition>>,
  justify: JustifyValue
) => {
  // add 1 to position
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
      let lastTextSegment = updatedTextSegments[updatedTextSegments.length - 1];
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
  setCursorPosition((prevCursorPosition) => {
    if (prevCursorPosition) {
      return {
        ...prevCursorPosition,
        position: prevCursorPosition.position + 1,
      };
    }
    return {
      paragraphIndex: 1,
      textSegmentIndex: 1,
      position: 1,
    };
  });
};

export default handleNormalKey;
