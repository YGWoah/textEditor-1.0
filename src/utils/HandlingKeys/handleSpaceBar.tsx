import { TextConvertedToJSON } from "../../types/types";

const handleSpaceBar = (
  setTextConvertedToJSON: React.Dispatch<
    React.SetStateAction<TextConvertedToJSON>
  >
) => {
  console.log("spacebar");

  //TODO: Fix this there is a bug here ,when you press spacebar it adds a space to the last paragraph but waht if there is no last paragraph
  setTextConvertedToJSON((prevTextConvertedToJSON) => {
    if (prevTextConvertedToJSON) {
      try {
        let updatedParagraphs = prevTextConvertedToJSON.paragraphs;
        let lastParagraph =
          updatedParagraphs[updatedParagraphs.length - 1] || [];

        if (updatedParagraphs.length === 0) {
          updatedParagraphs.push({
            textSegments: [],
            justify: "left",
          });
        }

        let updatedTextSegments = lastParagraph?.textSegments;
        if (updatedTextSegments?.length === 0) {
          updatedTextSegments.push({
            insert: "",
            attributes: {
              bold: false,
              italic: false,
              underline: false,
              link: false,
              heading: false,
            },
          });
        }
        updatedTextSegments[updatedTextSegments.length - 1].insert += " ";
        return {
          paragraphs: updatedParagraphs,
        };
      } catch (error) {
        console.log(error);
      }
    }
    return null;
  });
};

export default handleSpaceBar;
