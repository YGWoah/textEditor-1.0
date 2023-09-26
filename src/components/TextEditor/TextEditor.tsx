import React, { useContext } from "react";
import handleKeyDown from "../../utils/HandleKeyDown";
import { TextConvertedToJSON, CursorPosition } from "../../types/types";
import JsonDiplayer from "./JsonDisplay";
import textFormattingStateContext from "../../context/TextFormattingStateContext";

const TextEditor = ({
  setIsClickedInside,
  textConvertedToJSON,
  setTextConvertedToJSON,
  setCursorPosition,
  targetDivRef,
  isClickedInside,
}: {
  setIsClickedInside: React.Dispatch<React.SetStateAction<boolean>>;
  textConvertedToJSON: TextConvertedToJSON;
  setTextConvertedToJSON: React.Dispatch<
    React.SetStateAction<TextConvertedToJSON>
  >;
  setCursorPosition: React.Dispatch<React.SetStateAction<CursorPosition>>;
  targetDivRef: React.RefObject<HTMLDivElement>;
  isClickedInside: boolean;
}) => {
  const textStyle = useContext(textFormattingStateContext).textStyle;
  const setTestStyle = useContext(textFormattingStateContext).setTestStyle;
  const justify = useContext(textFormattingStateContext).justify;
  const setJustify = useContext(textFormattingStateContext).setJustify;

  return (
    <div
      onClick={() => {
        setIsClickedInside(true);
      }}
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
          setCursorPosition
        );
      }}
      ref={targetDivRef}
      className="cursor-text w-full md:w-2/3 h-96 rounded-lg bg-gray-50 break-words p-4"
    >
      <JsonDiplayer
        textConvertedToJSON={textConvertedToJSON}
        isClickedInside={isClickedInside}
      />
    </div>
  );
};

export default TextEditor;
