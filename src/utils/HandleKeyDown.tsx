import { KeyboardEvent } from "react";
import handlingNormalKey from "./HandlingKeys/handleNormalKey";
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
    setTextStyle((prevState: TextStyle) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleKeyPress = () => {
    if (event.shiftKey) {
      // Handle Shift + key
    } else if (event.ctrlKey && key === "b") {
      event.preventDefault();
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
    } else if (event.ctrlKey && key === "Backspace")
      handleCtrlBackspace(
        event,
        textConvertedToJSON,
        setTextConvertedToJSON,
        setCursorPosition
      );
    else if (key === "Backspace")
      handleBackSpace(
        textConvertedToJSON,
        setTextConvertedToJSON,
        setCursorPosition
      );
    else if (key === " ") {
      event.preventDefault();
      handleSpaceBar(setTextConvertedToJSON);
    } else if (key === "Enter")
      handlingEnterKey(textStyle, setTextConvertedToJSON, justify);
    else if (keyIsNormalLetter)
      handlingNormalKey(
        key,
        textConvertedToJSON,
        textStyle,
        setTextConvertedToJSON,
        setCursorPosition,
        justify
      );
    // TODO : handle Arrows
  };

  handleKeyPress();
};

export default handleKeyDown;
