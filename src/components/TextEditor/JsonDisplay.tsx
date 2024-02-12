import { TextConvertedToJSON } from "../../types/types";

interface PlaceholderTextProps {
  isClickedInside: boolean;
  textConvertedToJSON: TextConvertedToJSON | null;
}

const PlaceholderText: React.FC<PlaceholderTextProps> = ({
  isClickedInside,
  textConvertedToJSON,
}) => {
  if (isClickedInside || textConvertedToJSON?.paragraphs[0]) {
    return null;
  }

  return <p className="text-gray-400">Write your Text here...</p>;
};
interface CursorProps {
  isClickedInside: boolean;
  isLastParagraph: boolean;
}

const Cursor: React.FC<CursorProps> = ({
  isClickedInside,
  isLastParagraph,
}) => {
  if (isClickedInside && isLastParagraph) {
    return <span className="animate-toggle">|</span>;
  }

  return null;
};

const JsonDiplayer = ({
  textConvertedToJSON,
  isClickedInside,
}: {
  textConvertedToJSON: TextConvertedToJSON;
  isClickedInside: boolean;
}) => {
  return (
    <div className="text-black text-lg whitespace-pre ">
      {textConvertedToJSON?.paragraphs[0]
        ? textConvertedToJSON?.paragraphs.map((paragraph, paragraphIndex) => (
            <p
              key={paragraphIndex}
              className={
                paragraph.justify === "right"
                  ? "text-right"
                  : paragraph.justify === "center"
                  ? "text-center"
                  : "text-left"
              }
            >
              {paragraph.textSegments.map((element, index) => (
                <span
                  key={index}
                  className={`
                    ${element.attributes.italic ? "italic" : ""}
                    ${element.attributes.bold ? "font-bold" : ""}
                    ${element.attributes.underline ? "underline" : ""}
                    ${element.attributes.link ? "link" : ""}
                    ${element.attributes.heading ? "heading" : ""}
                  `}
                >
                  {element.insert}
                </span>
              ))}
              <Cursor
                isClickedInside={isClickedInside}
                isLastParagraph={
                  paragraphIndex === textConvertedToJSON?.paragraphs.length - 1
                }
              />
            </p>
          ))
        : ""}
      <PlaceholderText
        isClickedInside={isClickedInside}
        textConvertedToJSON={textConvertedToJSON}
      />
    </div>
  );
};

export default JsonDiplayer;
