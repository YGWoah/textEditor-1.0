import { useState } from 'react';

type TextStyle = {
  italic: boolean;
  bold: boolean;
  underline: boolean;
  link: boolean;
  heading: boolean;
};

type OpsArray = {
  insert: string;
  attributes: TextStyle;
}[];

type TextConvertedToJSON = {
  ops: OpsArray;
} | null;

const JsonDiplayer = ({
  textConvertedToJSON,
}: {
  textConvertedToJSON: TextConvertedToJSON;
}) => {
  const [inputFocusedOn, setinputFocusedOn] = useState(false);
  return (
    <div
      className="text-black text-lg text-center"
      onClick={() => {
        console.log('i am being stept on daddy!!!');

        setinputFocusedOn((prevState) => !prevState);
      }}
    >
      {textConvertedToJSON?.ops[0] ? (
        textConvertedToJSON.ops.map((element) => {
          return (
            <>
              <span
                className={`${
                  element.attributes.italic ? 'italic' : ''
                } ${element.attributes.bold ? 'font-bold' : ''} ${
                  element.attributes.underline ? 'underline' : ''
                } ${element.attributes.link ? 'link' : ''} ${
                  element.attributes.heading ? 'heading' : ''
                }`}
              >
                {element.insert}
              </span>
            </>
          );
        })
      ) : (
        <p className=" text-gray-400 ">Write tour Text here...</p>
      )}
      {inputFocusedOn ? (
        <span className="animate-toggle">|</span>
      ) : (
        ''
      )}
    </div>
  );
};
export default JsonDiplayer;
