import toggleTextStyle from "../utils/toggleTextStyle";
import TextStyleButton from "./Buttons/TextStyleButton";
import { useContext } from "react";
import textStyleContext from "../context/TextFormattingStateContext";
const TextStyleButtons = () => {
  const textStyle = useContext(textStyleContext).textStyle;
  const setTextStyle = useContext(textStyleContext).setTestStyle;
  return (
    <div>
      <TextStyleButton
        onClick={() => {
          toggleTextStyle("bold", textStyle, setTextStyle);
        }}
        isActive={textStyle.bold}
      >
        <span className=" font-extrabold ">B</span>
      </TextStyleButton>
      <TextStyleButton
        onClick={() => {
          toggleTextStyle("italic", textStyle, setTextStyle);
        }}
        isActive={textStyle.italic}
      >
        <span className=" italic ">I</span>
      </TextStyleButton>
      <TextStyleButton
        onClick={() => {
          toggleTextStyle("underline", textStyle, setTextStyle);
        }}
        isActive={textStyle.underline}
      >
        <span className=" underline uppercase  ">U</span>
      </TextStyleButton>
    </div>
  );
};

export default TextStyleButtons;
