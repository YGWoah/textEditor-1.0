import { SetStateAction } from "react";
import { TextConvertedToJSON, CursorPosition } from "../../types/types";

const handleCtrlBackSpace = (
  event: React.KeyboardEvent<HTMLDivElement>,

  textConvertedToJSON: TextConvertedToJSON,

  setTextConvertedToJSON: React.Dispatch<SetStateAction<TextConvertedToJSON>>,
  setCursorPosition: React.Dispatch<SetStateAction<CursorPosition>>
) => {
  event.preventDefault(); // Prevent the default browser behavior
  if (!textConvertedToJSON) return;
  let updatedParagraphs = textConvertedToJSON.paragraphs;
  if (updatedParagraphs.length === 0) return;
  let lastParagraph = updatedParagraphs[updatedParagraphs.length - 1];
  let updatedTextSegments = lastParagraph.textSegments;
  if (updatedTextSegments.length === 0) return;
  //TODO: substract from TextSegment and set position to the last one to the last character
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
  if (updatedTextSegments.length === 0) {
    updatedParagraphs.pop();

    //substract from paragraoh and set both TextSegment and position to the last one
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
              ?.length -
              1 >
            0
              ? updatedParagraphs[updatedParagraphs.length - 1]?.textSegments
                  ?.length - 1
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

export default handleCtrlBackSpace;
