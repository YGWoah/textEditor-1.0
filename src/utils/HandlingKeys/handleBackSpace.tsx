import { SetStateAction } from "react";
import { TextConvertedToJSON, CursorPosition } from "../../types/types";

const handleBackSpace = (
  textConvertedToJSON: TextConvertedToJSON,
  setTextConvertedToJSON: React.Dispatch<SetStateAction<TextConvertedToJSON>>,
  setCursorPosition: React.Dispatch<SetStateAction<CursorPosition>>
) => {
  // Handle Backspace
  if (!textConvertedToJSON) return;
  let updatedParagraphs = textConvertedToJSON.paragraphs;
  if (updatedParagraphs.length === 0) return;
  let lastParagraph = updatedParagraphs[updatedParagraphs.length - 1];
  let updatedTextSegments = lastParagraph.textSegments;
  if (updatedTextSegments.length === 0) return;
  let lastTextSegment = updatedTextSegments[updatedTextSegments.length - 1];
  if (lastTextSegment.insert.length > 0) {
    //substract one from position
    lastTextSegment.insert = lastTextSegment.insert.slice(0, -1);
    setCursorPosition((prevCursorPosition) => {
      if (prevCursorPosition) {
        return {
          ...prevCursorPosition,
          position: lastTextSegment.insert.length,
        };
      }
      return null;
    });
  } else {
    //substract one from TextSegment and set the position to the last one
    updatedTextSegments.pop();
    setCursorPosition((prevCursorPosition) => {
      if (prevCursorPosition) {
        return {
          ...prevCursorPosition,
          textSegmentIndex:
            prevCursorPosition.textSegmentIndex - 1 > 0
              ? prevCursorPosition.textSegmentIndex - 1
              : 0,
          position: updatedTextSegments[updatedTextSegments.length - 1]?.insert
            ?.length
            ? updatedTextSegments[updatedTextSegments.length - 1].insert.length
            : 0,
        };
      }
      return null;
    });
  }
  if (updatedTextSegments.length === 0) {
    //substract one from paragraphs and set both posiotion and segmet to the last one
    updatedParagraphs.pop();
    setCursorPosition((prevCursorPosition) => {
      if (prevCursorPosition) {
        return {
          ...prevCursorPosition,
          paragraphIndex:
            prevCursorPosition.paragraphIndex - 1 > 0
              ? prevCursorPosition.paragraphIndex - 1
              : 0,
          textSegmentIndex:
            updatedParagraphs[updatedParagraphs.length - 1]?.textSegments
              .length -
              1 >
            0
              ? updatedParagraphs[updatedParagraphs.length - 1]?.textSegments
                  .length - 1
              : 0,
          position:
            updatedParagraphs[updatedParagraphs.length - 1]?.textSegments[
              updatedParagraphs[updatedParagraphs.length - 1]?.textSegments
                .length - 1
            ].insert.length,
        };
      }
      return null;
    });
  }
  setTextConvertedToJSON({
    paragraphs: updatedParagraphs,
  });
};
export default handleBackSpace;
