import React, { useContext, useRef } from "react";
import handleKeyDown from "../../utils/HandleKeyDown";
import { TextConvertedToJSON } from "../../types/types";
import JsonDiplayer from "./JsonDisplay";
import textFormattingStateContext from "../../context/TextFormattingStateContext";
import CircularBuffer from "../../utils/CircularBuffer";
import useClickInside from "../../hooks/useClickInside";
const TextInput = ({
  textConvertedToJSON,
  setTextConvertedToJSON,
  undoStack,
}: {
  textConvertedToJSON: TextConvertedToJSON;
  setTextConvertedToJSON: React.Dispatch<
    React.SetStateAction<TextConvertedToJSON>
  >;
  undoStack: React.MutableRefObject<CircularBuffer>;
}) => {
  const textStyle = useContext(textFormattingStateContext).textStyle;
  const setTestStyle = useContext(textFormattingStateContext).setTestStyle;
  const justify = useContext(textFormattingStateContext).justify;
  const setJustify = useContext(textFormattingStateContext).setJustify;
  const setCursorPosition = useContext(
    textFormattingStateContext
  ).setCursorPosition;

  const targetDivRef = useRef<HTMLDivElement>(null);
  //this is a custom hook that returns true if the user clicks outside the target div
  let isClickedInside = useClickInside(targetDivRef);
  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        handleKeyDown(
          e,
          textStyle,
          setTestStyle,
          textConvertedToJSON,
          setTextConvertedToJSON,
          setJustify,
          justify,
          setCursorPosition,
          undoStack
        );
      }}
      onClick={() => {
        console.log(targetDivRef.current);

        targetDivRef.current?.focus();
      }}
      ref={targetDivRef}
      className="cursor-text  w-full md:w-2/3 h-96 rounded-lg bg-gray-50 break-words p-4 border-black border-2"
    >
      <JsonDiplayer
        textConvertedToJSON={textConvertedToJSON}
        isClickedInside={isClickedInside}
      />
    </div>
  );
};

export default TextInput;
