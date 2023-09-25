import React, { KeyboardEvent } from "react";
const handleTitleKeyDown = (
  event: KeyboardEvent<HTMLDivElement>,
  setTitle: React.Dispatch<React.SetStateAction<string>>
) => {
  const key = event.key;
  const keyIsNormalLetter = /^[a-zA-Z]$/.test(key);
  if (keyIsNormalLetter) {
    setTitle((prevState) => {
      return prevState + event.key;
    });
  } else if (event.ctrlKey && key === "Backspace") {
    setTitle("");
  } else if (key === "Backspace") {
    setTitle((prevState) => {
      return prevState.slice(0, -1);
    });
  }
};
const TitleInput = ({
  title,
  setTitle,
}: {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div
      className="font-bold text-3xl"
      tabIndex={0}
      onKeyDown={(e) => {
        handleTitleKeyDown(e, setTitle);
      }}
    >
      {title.length > 0 ? title : "Post title here..."}
    </div>
  );
};

export default TitleInput;
