// type TextStyle = {
//   italic: boolean;
//   bold: boolean;
//   underline: boolean;
//   link: string | null;
//   heading: boolean;
//   color: string;
//   fontSize: string;
// };

type TextStyle = {
  italic: boolean;
  bold: boolean;
  underline: boolean;
  link: boolean;
  heading: boolean;
};

type TextSegment = {
  insert: string;
  attributes: TextStyle;
};

type Paragraph = {
  textSegments: TextSegment[];
  justify: 'left' | 'center' | 'right';
};

type TextConvertedToJSON = {
  paragraphs: Paragraph[];
} | null;

const JsonDiplayer_2 = ({
  textConvertedToJSON,
  isClickedInside,
}: {
  textConvertedToJSON: TextConvertedToJSON;
  isClickedInside: boolean;
}) => {
  return (
    <div className="text-black text-lg text-center">
      {textConvertedToJSON?.paragraphs[0]
        ? textConvertedToJSON?.paragraphs.map(
            (paragraph, paragraphIndex) => (
              <p key={paragraphIndex} className=" text-left ">
                {paragraph.textSegments.map((element, index) => (
                  <span
                    key={index}
                    className={`
                    ${element.attributes.italic ? 'italic' : ''}
                    ${element.attributes.bold ? 'font-bold' : ''}
                    ${element.attributes.underline ? 'underline' : ''}
                    ${element.attributes.link ? 'link' : ''}
                    ${element.attributes.heading ? 'heading' : ''}
                  `}
                  >
                    {element.insert}
                  </span>
                ))}
                {isClickedInside &&
                paragraphIndex ==
                  textConvertedToJSON.paragraphs.length - 1 ? (
                  <span className="animate-toggle">|</span>
                ) : null}
              </p>
            )
          )
        : ''}
      {isClickedInside ? null : (
        <p className="text-gray-400">Write your Text here...</p>
      )}
    </div>
  );
};

export default JsonDiplayer_2;
