import { useEffect, useState, useRef, useContext } from "react";
import { CursorPosition, TextConvertedToJSON } from "../../types/types";
import TitleInput from "../Inputs/TitleInput";
import TextEditor from "./TextEditor";
import textFormattingStateContext from "../../context/TextFormattingStateContext";

const CustomTextFeild = ({}: {}) => {
  const [textConvertedToJSON, setTextConvertedToJSON] =
    useState<TextConvertedToJSON>(null);
  const [title, setTitle] = useState<string>("");
  const [cursorPositin, setCursorPosition] = useState<CursorPosition>(null);
  const targetDivRef = useRef<HTMLDivElement>(null);
  const [isClickedInside, setIsClickedInside] = useState(false);

  const justify = useContext(textFormattingStateContext).justify;

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
        textConvertedToJSON={textConvertedToJSON}
        setTextConvertedToJSON={setTextConvertedToJSON}
        setCursorPosition={setCursorPosition}
        targetDivRef={targetDivRef}
        isClickedInside={isClickedInside}
      />
    </div>
  );
};

export default CustomTextFeild;
