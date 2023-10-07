import { useEffect, useState, useRef, useContext } from "react";
import { CursorPosition, TextConvertedToJSON } from "../../types/types";
import TitleInput from "../Inputs/TitleInput";
import TextEditor from "./TextEditor";
import textFormattingStateContext from "../../context/TextFormattingStateContext";
import useClickOutside from "../../hooks/useClickOutside";

const CustomTextFeild = ({}: {}) => {
  const [textConvertedToJSON, setTextConvertedToJSON] =
    useState<TextConvertedToJSON>(null);
  const [title, setTitle] = useState<string>("");
  const [cursorPositin, setCursorPosition] = useState<CursorPosition>(null);
  const targetDivRef = useRef<HTMLDivElement>(null);

  const justify = useContext(textFormattingStateContext).justify;

  //this is a custom hook that returns true if the user clicks outside the target div
  let isClickedInside = useClickOutside(targetDivRef);

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

  return (
    <div className="flex items-center flex-col w-full">
      <TitleInput title={title} setTitle={setTitle} />
      <TextEditor
        textConvertedToJSON={textConvertedToJSON}
        setTextConvertedToJSON={setTextConvertedToJSON}
        setCursorPosition={setCursorPosition}
        targetDivRef={targetDivRef}
        isClickedInside={isClickedInside}
      />
      <p>{cursorPositin?.paragraphIndex}</p>
    </div>
  );
};

export default CustomTextFeild;
