import React from "react";

interface TextStyleButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

const TextStyleButton: React.FC<TextStyleButtonProps> = ({
  isActive,
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "text-xl p-2 rounded cursor-pointer hover:bg-gray-100 " +
        (isActive ? "  text-black" : "text-gray-500  ")
      }
    >
      {children}
    </button>
  );
};

TextStyleButton.defaultProps = {
  className: "",
};

export default TextStyleButton;
