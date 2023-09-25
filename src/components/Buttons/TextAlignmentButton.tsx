import React from "react";

interface TextAlignmentButtonProps {
  justify: "left" | "center" | "right";
  setJustify: (justify: "left" | "center" | "right") => void;
  isActive?: boolean;
}

const TextAlignmentButton: React.FC<TextAlignmentButtonProps> = ({
  justify,
  setJustify,
  isActive,
}) => {
  return (
    <button
      onClick={() => {
        setJustify(justify);
      }}
    >
      <img
        src={`./assets/align-${justify}.png`}
        alt={justify}
        className={"w-8" + (isActive ? null : " opacity-50")}
      />
    </button>
  );
};

export default TextAlignmentButton;
