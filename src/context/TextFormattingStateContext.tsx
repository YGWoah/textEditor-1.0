import React, { createContext } from "react";
import { TextStyle, JustifyValue } from "../types/types";

type TextFormattingStateContext = {
  textStyle: TextStyle;
  setTestStyle: React.Dispatch<React.SetStateAction<TextStyle>>;
  justify: JustifyValue;
  setJustify: React.Dispatch<React.SetStateAction<JustifyValue>>;
};

const textFormattingStateContext = createContext<TextFormattingStateContext>({
  textStyle: {
    italic: false,
    bold: false,
    underline: false,
    link: false,
    heading: false,
  },
  setTestStyle: () => {},
  justify: "left",
  setJustify: () => {},
} as TextFormattingStateContext);

export default textFormattingStateContext;
export type { TextFormattingStateContext };
