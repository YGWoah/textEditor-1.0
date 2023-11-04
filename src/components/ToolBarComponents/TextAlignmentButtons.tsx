import React, { useContext } from "react";
import TextAlignmentButton from "../Buttons/TextAlignmentButton";
import textFormattingStateContext from "../../context/TextFormattingStateContext";
const isActive = (
  justify: "left" | "center" | "right",
  active: "left" | "center" | "right"
) => {
  return justify === active;
};

const TextAlignmentButtons: React.FC = () => {
  const justify = useContext(textFormattingStateContext).justify;
  const setJustify = useContext(textFormattingStateContext).setJustify;
  return (
    <div className="flex  items-center justify-end border-l-2 border-gray-500 px-4">
      <TextAlignmentButton
        isActive={isActive(justify, "left")}
        justify="left"
        setJustify={setJustify}
      />
      <TextAlignmentButton
        isActive={isActive(justify, "center")}
        justify="center"
        setJustify={setJustify}
      />
      <TextAlignmentButton
        isActive={isActive(justify, "right")}
        justify="right"
        setJustify={setJustify}
      />
    </div>
  );
};

export default TextAlignmentButtons;
