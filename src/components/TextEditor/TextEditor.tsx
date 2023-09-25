import handleKeyDown from "../../utils/HandleKeyDown";
import {
  TextStyle,
  TextConvertedToJSON,
  CursorPosition,
} from "../../types/types";
import JsonDiplayer from "./JsonDisplay";

const TextEditor = ({
  setIsClickedInside,
  textStyle,
  setTextStyle,
  textConvertedToJSON,
  setTextConvertedToJSON,
  setJustify,
  justify,
  setCursorPosition,
  targetDivRef,
  isClickedInside,
}: {
  setIsClickedInside: React.Dispatch<React.SetStateAction<boolean>>;
  textStyle: TextStyle;
  setTextStyle: React.Dispatch<React.SetStateAction<TextStyle>>;
  textConvertedToJSON: TextConvertedToJSON;
  setTextConvertedToJSON: React.Dispatch<
    React.SetStateAction<TextConvertedToJSON>
  >;
  setJustify: React.Dispatch<React.SetStateAction<"left" | "center" | "right">>;
  justify: "left" | "center" | "right";
  setCursorPosition: React.Dispatch<React.SetStateAction<CursorPosition>>;
  targetDivRef: React.RefObject<HTMLDivElement>;
  isClickedInside: boolean;
}) => {
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
          setTextStyle,
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
