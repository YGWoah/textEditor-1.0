import React from "react";
interface UndoRedoButtonProps {
  isActive?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const UndoRedoButton: React.FC<UndoRedoButtonProps> = ({
  isActive,
  onClick,
  children,
  className = " ",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "text-xl p-2 rounded cursor-pointer hover:bg-gray-100 " +
        (isActive ? "  text-black" : "text-gray-500  ") +
        className
      }
    >
      {children}
    </button>
  );
};

export default UndoRedoButton;
