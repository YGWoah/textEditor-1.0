import { useEffect, useState, useRef } from "react";
import {
  CursorPosition,
  TextConvertedToJSON,
  TextStyle,
  JustifyValue,
} from "../../types/types";
import TitleInput from "../Inputs/TitleInput";
import TextEditor from "./TextEditor";

const CustomTextFeild = ({
  textStyle,
  setTextStyle,
  justify,
  setJustify,
}: {
  textStyle: TextStyle;
  setTextStyle: React.Dispatch<React.SetStateAction<TextStyle>>;
  justify: JustifyValue;
  setJustify: React.Dispatch<React.SetStateAction<JustifyValue>>;
}) => {
  const [textConvertedToJSON, setTextConvertedToJSON] =
    useState<TextConvertedToJSON>(null);
  const [title, setTitle] = useState<string>("");
  const [cursorPositin, setCursorPosition] = useState<CursorPosition>(null);
  const targetDivRef = useRef<HTMLDivElement>(null);
  const [isClickedInside, setIsClickedInside] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      targetDivRef.current &&
      !targetDivRef.current.contains(event.target as Node)
    ) {
      setIsClickedInside(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTextConvertedToJSON((prevTextConvertedToJSON) => {
      if (prevTextConvertedToJSON) {
        const updatedParagraphs = [...prevTextConvertedToJSON.paragraphs];
        const lastParagraph = updatedParagraphs[updatedParagraphs.length - 1];
        if (lastParagraph) {
          lastParagraph.justify = justify;
        }
        return {
          paragraphs: updatedParagraphs,
        };
      }
      return null;
    });
  }, [justify]);
  console.log(cursorPositin);

  return (
    <div className="flex items-center flex-col w-full">
      <TitleInput title={title} setTitle={setTitle} />
      <TextEditor
        setIsClickedInside={setIsClickedInside}
        textStyle={textStyle}
        setTextStyle={setTextStyle}
        textConvertedToJSON={textConvertedToJSON}
        setTextConvertedToJSON={setTextConvertedToJSON}
        setJustify={setJustify}
        justify={justify}
        setCursorPosition={setCursorPosition}
        targetDivRef={targetDivRef}
        isClickedInside={isClickedInside}
      />
    </div>
  );
};

export default CustomTextFeild;
