import { useState } from "react";
import CustomTextFeild from "../components/TextEditor/CustumTextFeild";
import { TextStyle, JustifyValue } from "../types/types";
import Header from "../components/Layouts/Header";
import TextToolbar from "../components/TextEditor/TextToolbar";
import textFormattingStateContext from "../context/TextFormattingStateContext";

const Editor = () => {
  const [textStyle, setTestStyle] = useState<TextStyle>({
    italic: false,
    bold: false,
    underline: false,
    link: false,
    heading: false,
  });
  const [justify, setJustify] = useState<JustifyValue>("left");

  return (
    <div className=" w-full flex justify-center items-center flex-col">
      <Header />
      <textFormattingStateContext.Provider
        value={{ textStyle, setTestStyle, justify, setJustify }}
      >
        <TextToolbar />
        <CustomTextFeild />
      </textFormattingStateContext.Provider>
    </div>
  );
};

export default Editor;
