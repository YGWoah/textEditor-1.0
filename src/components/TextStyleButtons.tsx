import toggleTextStyle from "../utils/toggleTextStyle";
import TextStyleButton from "./Buttons/TextStyleButton";
import { TextStyle } from "../types/types";

const TextStyleButtons = ({
  textStyle,
  setTextStyle,
}: {
  textStyle: TextStyle;
  setTextStyle: React.Dispatch<React.SetStateAction<TextStyle>>;
}) => {
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
