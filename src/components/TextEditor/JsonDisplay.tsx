import { TextConvertedToJSON } from "../../types/types";

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
              {isClickedInside &&
              paragraphIndex == textConvertedToJSON.paragraphs.length - 1 ? (
                <span className="animate-toggle">|</span>
              ) : null}
            </p>
          ))
        : ""}
      {isClickedInside ? null : textConvertedToJSON?.paragraphs[0] ? null : (
        <p className="text-gray-400">Write your Text here...</p>
      )}
    </div>
  );
};

export default JsonDiplayer;
