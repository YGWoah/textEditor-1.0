import UndoRedoButton from "../Buttons/UndoRedoButton";
import undo from "../../utils/undo";
import redo from "../../utils/redo";
import CircularBuffer from "../../utils/CircularBuffer";
import { TextConvertedToJSON } from "../../types/types";
import { useContext } from "react";
import textStyleContext from "../../context/TextFormattingStateContext";
const UndoRedoButtons = ({
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
  const setTextStyle = useContext(textStyleContext).setTestStyle;
  const textStyle = useContext(textStyleContext).textStyle;
  const justify = useContext(textStyleContext).justify;
  const setJustify = useContext(textStyleContext).setJustify;
  // const cursorPosition = useContext(textStyleContext).cursorPosition
  const setCursorPosition = useContext(textStyleContext).setCursorPosition;

  return (
    <div>
      <UndoRedoButton
        isActive={true}
        onClick={() => {
          undo({
            undoStack,
            setTextConvertedToJSON,
            textConvertedToJSON,
            setTextStyle,
            textStyle,
            setCursorPosition,
            setJustify,
            justify,
          });
        }}
        className="bg-red-500"
      >
        <span className="text-xs">Undo</span>
      </UndoRedoButton>
      <UndoRedoButton isActive={true} onClick={redo} className="bg-blue-500">
        <span className="text-xs">Redo</span>
      </UndoRedoButton>
    </div>
  );
};

export default UndoRedoButtons;
