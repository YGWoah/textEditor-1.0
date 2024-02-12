import CircularBuffer from "./CircularBuffer";
import { JustifyValue, TextConvertedToJSON, TextStyle } from "../types/types";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import insertNormalLetter from "./HandlingKeys/insertNormalLetter";
import { text } from "stream/consumers";

/**
 * Undoes the last action performed on the text editor.
 *
 * @param param0 - An object containing the following properties:
 *   * `undoStack`: A mutable reference object to a circular buffer containing the history of actions performed on the text editor.
 *   * `textConvertedToJSON`: The current state of the text editor, converted to JSON.
 *   * `setTextConvertedToJSON`: A dispatch function to set the current state of the text editor.
 *   * `setTextStyle`: A dispatch function to set the current text style.
 *   * `textStyle`: The current text style.
 *   * `setCursorPosition`: A dispatch function to set the current cursor position.
 *   * `setJustify`: A dispatch function to set the current justification.
 *   * `justify`: The current justification.
 *
 * @returns None.
 */

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
  if (!textConvertedToJSON) return { paragraphs: [] };
  console.log(textConvertedToJSON);
  let lastAction = undoStack.current.pop();

  const isItPossibleToUndo = () =>
    textConvertedToJSON &&
    textConvertedToJSON.paragraphs.length > 0 &&
    textConvertedToJSON.paragraphs[0].textSegments.length > 0;

  const getLastTextSegment = () => {
    const lastParagraph = textConvertedToJSON.paragraphs.slice(-1)[0];
    return lastParagraph.textSegments.slice(-1)[0];
  };

  const handleInsert = () => {
    if (!isItPossibleToUndo()) return;

    let lastTextSegment = getLastTextSegment();
    let lastinsert = lastTextSegment.insert;
    const lastActionPayload = lastAction?.payload;

    if (lastinsert.endsWith(lastActionPayload)) {
      lastTextSegment.insert = lastinsert.slice(0, -lastActionPayload.length);

      setTextConvertedToJSON(() => ({
        paragraphs: textConvertedToJSON.paragraphs,
      }));
      if (undoStack.current.peek()?.type === "spaceBar") {
        lastAction = undoStack.current.pop();
        handleSpaceBar();
      }
    } else {
      console.log("toBeRemovedText is not equal to lastAction?.payload insert");
    }
  };

  const handleSpaceBar = () => {
    const lastTextSegment = getLastTextSegment();
    const lastActionPayload = lastAction?.payload;

    if (lastTextSegment.insert.endsWith(" ")) {
      lastTextSegment.insert = lastTextSegment.insert.slice(
        0,
        -lastActionPayload.length
      );
    } else {
      console.log(
        "toBeRemovedText is not equal to lastAction?.payload spacebar"
      );
    }

    setTextConvertedToJSON(() => ({
      paragraphs: textConvertedToJSON.paragraphs,
    }));
  };

  const handleEnter = () => {
    if (!isItPossibleToUndo()) return;

    const lastTextSegment = getLastTextSegment();

    if (lastTextSegment.insert === "") {
      textConvertedToJSON.paragraphs.pop();
      setTextConvertedToJSON(() => ({
        paragraphs: textConvertedToJSON.paragraphs,
      }));
    }
  };

  const deleteEmptyTextSegment = () => {
    if (!isItPossibleToUndo()) return;
    const paragraphs = textConvertedToJSON.paragraphs;

    const lastParagraph = paragraphs[paragraphs.length - 1];
    const textSegments = lastParagraph.textSegments;

    const lastTextSegment = textSegments[textSegments.length - 1];
    const lastText = lastTextSegment.insert;

    if (lastText === "") {
      paragraphs[paragraphs.length - 1].textSegments.pop();
      setTextConvertedToJSON(() => ({
        paragraphs: paragraphs,
      }));
    }
  };

  const changeTextStyle = (key: keyof TextStyle) => {
    setTextStyle((prevState: TextStyle) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
    //when changing the stye a new insert is created in the textConvertedToJSON so we need to delete it
    deleteEmptyTextSegment();
  };

  const handleError = (message: string) => {
    console.log(message);
  };

  switch (lastAction?.type) {
    case "insert":
      handleInsert();
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
