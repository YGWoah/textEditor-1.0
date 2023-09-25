import { Dispatch, SetStateAction } from "react";
import { TextStyle } from "../types/types";

const toggleTextStyle = (
  keyName: keyof TextStyle,
  textStyle: TextStyle,
  setTextStyle: Dispatch<SetStateAction<TextStyle>>
) => {
  if (!(keyName in textStyle)) {
    throw new Error("Invalid key name");
  }
  let newTextStyle = { ...textStyle, [keyName]: !textStyle[keyName] };
  setTextStyle(newTextStyle);
};

export default toggleTextStyle;
