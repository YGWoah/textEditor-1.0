import { SetStateAction } from "react";
import {
  TextStyle,
  TextConvertedToJSON,
  JustifyValue,
  //   CursorPosition,
  Paragraph,
} from "../../types/types";

const handlingEnterKey = (
  textStyle: TextStyle,
  setTextConvertedToJSON: React.Dispatch<SetStateAction<TextConvertedToJSON>>,
  //   setCursorPosition: React.Dispatch<SetStateAction<CursorPosition>>,
  justify: JustifyValue
) => {
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
};

export default handlingEnterKey;
