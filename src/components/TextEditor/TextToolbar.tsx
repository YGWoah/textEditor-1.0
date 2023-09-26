import TextAlignmentButtons from "../TextAlignmentButtons";
import TextStyleButtons from "../TextStyleButtons";

const TextToolbar = () => {
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
    </div>
  );
};

export default TextToolbar;
