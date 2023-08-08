import { useEffect, KeyboardEvent, useState, useRef } from "react";
import JsonDiplayer_2 from "./JsonDisplay_2";
import handleKeyDown from "../utils/HandleKeyDown";
import {
  CursorPosition,
  TextConvertedToJSON,
  TextStyle,
  JustifyValue,
} from "../types/types";

const CustomTextFeild_2 = ({
  textStyle,
  setTextStyle,
  justify,
  setJustify,
}: {
  textStyle: TextStyle;
  setTextStyle: React.Dispatch<React.SetStateAction<TextStyle>>;
  justify: JustifyValue;
  setJustify: React.Dispatch<React.SetStateAction<JustifyValue>>;
}) => {
  const [textConvertedToJSON, setTextConvertedToJSON] =
    useState<TextConvertedToJSON>(null);
  const [title, setTitle] = useState<string>("");
  const [cursorPositin, setCursorPosition] = useState<CursorPosition>(null);

  const handleTitleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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

  const targetDivRef = useRef<HTMLDivElement>(null);
  const [isClickedInside, setIsClickedInside] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      targetDivRef.current &&
      !targetDivRef.current.contains(event.target as Node)
    ) {
      setIsClickedInside(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTextConvertedToJSON((prevTextConvertedToJSON) => {
      if (prevTextConvertedToJSON) {
        const updatedParagraphs = [...prevTextConvertedToJSON.paragraphs];
        const lastParagraph = updatedParagraphs[updatedParagraphs.length - 1];
        if (lastParagraph) {
          lastParagraph.justify = justify;
        }
        return {
          paragraphs: updatedParagraphs,
        };
      }
      return null;
    });
  }, [justify]);

  console.log(cursorPositin);

  return (
    <div className="flex items-center flex-col w-full">
      <div
        className="font-bold text-3xl"
        tabIndex={0}
        onKeyDown={(e) => {
          handleTitleKeyDown(e);
        }}
      >
        {title.length > 0 ? title : "Post title here..."}
      </div>
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
        <JsonDiplayer_2
          textConvertedToJSON={textConvertedToJSON}
          isClickedInside={isClickedInside}
        />
      </div>
    </div>
  );
};

export default CustomTextFeild_2;
