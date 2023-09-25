import { useState } from "react";
import CustomTextFeild from "../components/TextEditor/CustumTextFeild";
import { TextStyle, JustifyValue } from "../types/types";
import Header from "../components/Layouts/Header";
import TextToolbar from "../components/TextEditor/TextToolbar";

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
      <TextToolbar
        textStyle={textStyle}
        setTestStyle={setTestStyle}
        justify={justify}
        setJustify={setJustify}
      />
      <CustomTextFeild
        textStyle={textStyle}
        setTextStyle={setTestStyle}
        justify={justify}
        setJustify={setJustify}
      />
    </div>
  );
};

export default Editor;
