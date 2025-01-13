import { KeyboardEvent } from "react";
import insertNormalLetter from "./HandlingKeys/insertNormalLetter";
import {
  CursorPosition,
  JustifyValue,
  TextStyle,
  TextConvertedToJSON,
} from "../types/types";
import handlingEnterKey from "./HandlingKeys/handleEnterKey";
import handleCtrlBackspace from "./HandlingKeys/handleCtrlBackSpace";
import handleBackSpace from "./HandlingKeys/handleBackSpace";
import handleSpaceBar from "./HandlingKeys/handleSpaceBar";
import CircularBuffer from "./CircularBuffer";
import { pushActionToStack } from "./pushActionToStack";
import undo from "./undo";

const handleChangingStyle = (
  event: KeyboardEvent<HTMLDivElement>,
  changeTextStyle: (key: keyof TextStyle) => void,
  undoStack: React.MutableRefObject<CircularBuffer>
) => {
  event.preventDefault();
  let key = event.key;
  let style = "";
  if (key === "b") style = "bold";
  else if (key === "i") style = "italic";
  else if (key === "u") style = "underline";

  changeTextStyle(style as keyof TextStyle);
  pushActionToStack("changeStyle", style, undoStack.current);
};

const changeTextPosition = (
  event: KeyboardEvent<HTMLDivElement>,
  setJustify: React.Dispatch<React.SetStateAction<JustifyValue>>,
  undoStack: React.MutableRefObject<CircularBuffer>
  // justify: JustifyValue
) => {
  event.preventDefault();
  let key = event.key;
  let position = "";
  if (key === "l") position = "left";
  else if (key === "e") position = "center";
  else if (key === "r") position = "right";

  setJustify((prevState: JustifyValue) => {
    pushActionToStack("changeJustify", prevState, undoStack.current);
    return position as JustifyValue;
  });
};

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
  setCursorPosition: React.Dispatch<React.SetStateAction<CursorPosition>>,
  undoStack: React.MutableRefObject<CircularBuffer>
) => {
  const key = event.key;

  const changeTextStyle = (key: keyof TextStyle) => {
    setTextStyle((prevState: TextStyle) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleKeyPressWithShift = () => {
    if (event.ctrlKey) {
      switch (key) {
        case "b":
          handleChangingStyle(event, changeTextStyle, undoStack);
          break;
        case "i":
          handleChangingStyle(event, changeTextStyle, undoStack);
          break;
        case "u":
          handleChangingStyle(event, changeTextStyle, undoStack);
          break;
        case "l":
          changeTextPosition(event, setJustify, undoStack);
          break;
        case "e":
          changeTextPosition(event, setJustify, undoStack);
          break;
        case "r":
          changeTextPosition(event, setJustify, undoStack);
          break;
        case "Backspace":
          handleCtrlBackspace(
            event,
            textConvertedToJSON,
            setTextConvertedToJSON,
            setCursorPosition
          );
          break;
        case "z":
          undo({
            undoStack,
            setTextConvertedToJSON,
            textConvertedToJSON,
            setTextStyle,
            textStyle,
            setCursorPosition,
            justify,
            setJustify,
          });
          break;
        default:
          break;
      }
    } else {
      switch (key) {
        case "Backspace":
          handleBackSpace(
            textConvertedToJSON,
            setTextConvertedToJSON,
            setCursorPosition,
            undoStack
          );
          break;
        case " ":
          handleSpaceBar(setTextConvertedToJSON);
          pushActionToStack("spaceBar", " ", undoStack.current);
          break;
        case "Enter":
          handlingEnterKey(textStyle, setTextConvertedToJSON, justify);
          pushActionToStack("enter", " ", undoStack.current);
          break;
        default:
          //i want toensure that input pattern is one letter
          let inputPattern = /^[a-zA-Z0-9?!]$/;

          if (inputPattern.test(event.key)) {
            insertNormalLetter(
              event.key,
              textConvertedToJSON,
              textStyle,
              setTextConvertedToJSON,
              setCursorPosition,
              justify
            );
            pushActionToStack("insert", event.key, undoStack.current);
          }
          break;
      }
    }
  };

  handleKeyPressWithShift();
};

export default handleKeyDown;
