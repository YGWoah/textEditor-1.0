import { useRef, useState } from "react";
import CustomTextFeild from "../components/TextEditor/CustumTextFeild";
import { TextStyle, JustifyValue, TextConvertedToJSON } from "../types/types";
// import Header from "../components/Layouts/Header";
import { CursorPosition } from "../types/types";
import TextToolbar from "../components/TextEditor/TextToolbar";
import textFormattingStateContext from "../context/TextFormattingStateContext";
import CircularBuffer from "../utils/CircularBuffer";
// import undo from "../utils/undo";

const TextEditor = () => {
  const [textStyle, setTestStyle] = useState<TextStyle>({
    italic: false,
    bold: false,
    underline: false,
    link: false,
    heading: false,
  });
  const [justify, setJustify] = useState<JustifyValue>("left");
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    paragraphIndex: 0,
    textSegmentIndex: 0,
    position: 0,
  });
  const undoStack = useRef(new CircularBuffer(100));
  // const redoStack = useRef(new CircularBuffer(100));

  // TODO : add a context for the textConvertedToJSON
  const [textConvertedToJSON, setTextConvertedToJSON] =
    useState<TextConvertedToJSON>(null);

  return (
    <div className=" w-full flex justify-center items-center flex-col">
      {/* <Header /> */}
      <textFormattingStateContext.Provider
        value={{
          textStyle,
          setTestStyle,
          justify,
          setJustify,
          cursorPosition,
          setCursorPosition,
        }}
      >
        <TextToolbar
          undoStack={undoStack}
          textConvertedToJSON={textConvertedToJSON}
          setTextConvertedToJSON={setTextConvertedToJSON}
        />
        <CustomTextFeild
          undoStack={undoStack}
          textConvertedToJSON={textConvertedToJSON}
          setTextConvertedToJSON={setTextConvertedToJSON}
        />
      </textFormattingStateContext.Provider>
    </div>
  );
};

export default TextEditor;
