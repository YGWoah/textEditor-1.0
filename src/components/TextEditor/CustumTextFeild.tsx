import { useEffect, useState, useRef, useContext } from "react";
import { TextConvertedToJSON } from "../../types/types";
import TitleInput from "../Inputs/TitleInput";
import TextInput from "./TextInput";
import textFormattingStateContext from "../../context/TextFormattingStateContext";
import useClickOutside from "../../hooks/useClickOutside";
import CircularBuffer from "../../utils/CircularBuffer";

const CustomTextFeild = ({
  undoStack,
  textConvertedToJSON,
  setTextConvertedToJSON,
}: {
  undoStack: React.MutableRefObject<CircularBuffer>;
  textConvertedToJSON: TextConvertedToJSON;
  setTextConvertedToJSON: React.Dispatch<
    React.SetStateAction<TextConvertedToJSON>
  >;
}) => {
  // const [textConvertedToJSON, setTextConvertedToJSON] =
  //   useState<TextConvertedToJSON>(null);
  const [title, setTitle] = useState<string>("");
  const targetDivRef = useRef<HTMLDivElement>(null);

  const justify = useContext(textFormattingStateContext).justify;

  //this is a custom hook that returns true if the user clicks outside the target div
  let isClickedInside = useClickOutside(targetDivRef);

  const cursorPositin = useContext(textFormattingStateContext).cursorPosition;

  //TO DO : see if i can remove this useEffect
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
      <TextInput
        textConvertedToJSON={textConvertedToJSON}
        setTextConvertedToJSON={setTextConvertedToJSON}
        targetDivRef={targetDivRef}
        isClickedInside={isClickedInside}
        undoStack={undoStack}
      />
      <p>{cursorPositin?.paragraphIndex}</p>
    </div>
  );
};

export default CustomTextFeild;
