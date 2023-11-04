import { SetStateAction } from "react";
import { TextConvertedToJSON, CursorPosition } from "../../types/types";
import { pushActionToStack } from "../pushActionToStack";
import CircularBuffer from "../CircularBuffer";

const handleBackSpace = (
  textConvertedToJSON: TextConvertedToJSON,
  setTextConvertedToJSON: React.Dispatch<SetStateAction<TextConvertedToJSON>>,
  setCursorPosition: React.Dispatch<SetStateAction<CursorPosition>>,
  undoStack: React.MutableRefObject<CircularBuffer>
) => {
  // Handle Backspace
  if (!textConvertedToJSON) return;
  let paragraphs = textConvertedToJSON.paragraphs;
  if (paragraphs.length === 0) return;
  let lastParagraph = paragraphs[paragraphs.length - 1];
  let textSegments = lastParagraph.textSegments;
  if (textSegments.length === 0) return;
  let lastTextSegment = textSegments[textSegments.length - 1];
  if (lastTextSegment.insert.length > 0) {
    //TO DO: when deleting a character ,it has to be saved in the undo stack so that it can be undone
    const deletedCharacter =
      lastTextSegment.insert[lastTextSegment.insert.length - 1];
    pushActionToStack("delete", deletedCharacter, undoStack.current);
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
    textSegments.pop();
    setCursorPosition((prevCursorPosition) => {
      if (prevCursorPosition) {
        return {
          ...prevCursorPosition,
          textSegmentIndex:
            prevCursorPosition.textSegmentIndex - 1 > 0
              ? prevCursorPosition.textSegmentIndex - 1
              : 0,
          position: textSegments[textSegments.length - 1]?.insert?.length
            ? textSegments[textSegments.length - 1].insert.length
            : 0,
        };
      }
      return null;
    });
  }
  if (textSegments.length === 0) {
    //substract one from paragraphs and set both posiotion and segmet to the last one
    paragraphs.pop();
    setCursorPosition((prevCursorPosition) => {
      if (prevCursorPosition) {
        return {
          ...prevCursorPosition,
          paragraphIndex:
            prevCursorPosition.paragraphIndex - 1 > 0
              ? prevCursorPosition.paragraphIndex - 1
              : 0,
          textSegmentIndex:
            paragraphs[paragraphs.length - 1]?.textSegments.length - 1 > 0
              ? paragraphs[paragraphs.length - 1]?.textSegments.length - 1
              : 0,
          position:
            paragraphs[paragraphs.length - 1]?.textSegments[
              paragraphs[paragraphs.length - 1]?.textSegments.length - 1
            ].insert.length,
        };
      }
      return null;
    });
  }
  setTextConvertedToJSON({
    paragraphs: paragraphs,
  });
};
export default handleBackSpace;
