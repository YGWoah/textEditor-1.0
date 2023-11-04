import CircularBuffer from "./CircularBuffer";
import { JustifyValue, TextConvertedToJSON, TextStyle } from "../types/types";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import insertNormalLetter from "./HandlingKeys/insertNormalLetter";

const undo = ({
  undoStack,
  textConvertedToJSON = {
    paragraphs: [],
  },
  setTextConvertedToJSON,
  setTextStyle,
  textStyle,
  setCursorPosition,
  setJustify,
  justify,
}: {
  undoStack: MutableRefObject<CircularBuffer>;
  textConvertedToJSON: TextConvertedToJSON;
  setTextConvertedToJSON: Dispatch<SetStateAction<TextConvertedToJSON>>;
  setTextStyle: Dispatch<SetStateAction<TextStyle>>;
  textStyle: TextStyle;
  setCursorPosition: Dispatch<SetStateAction<any>>;
  setJustify: Dispatch<SetStateAction<JustifyValue>>;
  justify: JustifyValue;
}) => {
  const handleInsert = () => {
    if (!textConvertedToJSON) return { paragraphs: [] };

    const paragraphs = textConvertedToJSON.paragraphs;
    if (paragraphs.length === 0) return;

    const lastParagraph = paragraphs[paragraphs.length - 1];
    const textSegments = lastParagraph.textSegments;
    if (textSegments.length === 0) return;

    const lastTextSegment = textSegments[textSegments.length - 1];
    const lastText = lastTextSegment.insert;
    const lastActionPayload = lastAction?.payload;

    if (lastText.endsWith(lastActionPayload)) {
      lastTextSegment.insert = lastText.substring(
        0,
        lastText.length - lastActionPayload.length
      );

      textConvertedToJSON.paragraphs[paragraphs.length - 1].textSegments[
        textSegments.length - 1
      ] = lastTextSegment;
      setTextConvertedToJSON(() => ({
        paragraphs: textConvertedToJSON.paragraphs,
      }));
    } else {
      console.log("toBeRemovedText is not equal to lastAction?.payload");
    }
  };

  const handleSpaceBar = () => {
    if (textConvertedToJSON && textConvertedToJSON.paragraphs?.length > 0) {
      const lastParagraph = textConvertedToJSON.paragraphs.slice(-1)[0];
      const textSegments = lastParagraph.textSegments;
      const lastTextSegment = textSegments.slice(-1)[0];
      const lastActionPayload = lastAction?.payload;

      if (lastTextSegment.insert.endsWith(" ")) {
        lastTextSegment.insert = lastTextSegment.insert.slice(
          0,
          -lastActionPayload.length
        );
      } else {
        console.log("toBeRemovedText is not equal to lastAction?.payload");
      }

      lastParagraph.textSegments[textSegments.length - 1] = lastTextSegment;

      setTextConvertedToJSON(() => ({
        paragraphs: textConvertedToJSON.paragraphs,
      }));
    }
  };

  const handleEnter = () => {
    if (textConvertedToJSON) {
      const paragraphs = textConvertedToJSON.paragraphs;
      if (paragraphs.length === 0) return;

      const lastParagraph = paragraphs[paragraphs.length - 1];
      const textSegments = lastParagraph.textSegments;
      if (textSegments.length === 0) return;

      const lastTextSegment = textSegments[textSegments.length - 1];
      const lastText = lastTextSegment.insert;

      if (lastText === "") {
        paragraphs.pop();
        setTextConvertedToJSON(() => ({
          paragraphs: paragraphs,
        }));
      }
    }
  };

  const changeTextStyle = (key: keyof TextStyle) => {
    setTextStyle((prevState: TextStyle) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  let lastAction = undoStack.current.pop();
  switch (lastAction?.type) {
    case "insert":
      // TO DO: when deleting a word it should also delete the space before it
      handleInsert(); //this function deletes a word  that was inserted
      break;
    case "spaceBar":
      handleSpaceBar();
      break;
    case "enter":
      handleEnter();
      break;
    case "changeStyle":
      changeTextStyle(lastAction?.payload as keyof TextStyle);
      break;
    case "changeJustify":
      setJustify(lastAction?.payload as JustifyValue);
      break;
    case "delete":
      if (lastAction?.payload.length === 1) {
        insertNormalLetter(
          lastAction?.payload,
          textConvertedToJSON,
          textStyle,
          setTextConvertedToJSON,
          setCursorPosition,
          justify
        );
      }
      break;

    default:
      console.log("default");
      console.log(lastAction);
  }
};

export default undo;
