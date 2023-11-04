import TextAlignmentButtons from "../ToolBarComponents/TextAlignmentButtons";
import TextStyleButtons from "../ToolBarComponents/TextStyleButtons";
import UndoRedoButtons from "../ToolBarComponents/UndoRedobuttons";
import CircularBuffer from "../../utils/CircularBuffer";
import { TextConvertedToJSON } from "../../types/types";
const TextToolbar = ({
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
  return (
    <div className="flex flex-wrap w-full items-center justify-center space-x-1 sm:pl-4">
      <TextStyleButtons />
      <TextAlignmentButtons />
      {/* TODO: turn this into a component later */}

      <div className="flex  items-center justify-end border-l-2 border-gray-500 px-4">
        <button>
          <img src="./assets/numbered-list.png" alt="right" className="w-8 " />
        </button>
        <button>
          <img src="./assets/bulleted-list.png" alt="center" className="w-8" />
        </button>
      </div>
      <UndoRedoButtons
        undoStack={undoStack}
        textConvertedToJSON={textConvertedToJSON}
        setTextConvertedToJSON={setTextConvertedToJSON}
      />
    </div>
  );
};

export default TextToolbar;
