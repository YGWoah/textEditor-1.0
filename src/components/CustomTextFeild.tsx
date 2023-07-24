import { KeyboardEvent, useState } from 'react';
import JsonDiplayer from './JsonDiplayer';

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

const CustomTextFeild = ({
  textStyle,
  setTextStyle,
}: {
  textStyle: TextStyle;
  setTextStyle: React.Dispatch<React.SetStateAction<TextStyle>>;
}) => {
  const [textConvertedToJSON, setTextConvertedToJSON] =
    useState<TextConvertedToJSON>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const key = event.key;
    const isNormalLetter = /^[a-zA-Z]$/.test(key);

    const handleKeyPress = () => {
      if (event.shiftKey) {
        // Handle Shift + key
      } else if (event.ctrlKey && event.key === 'b') {
        event.preventDefault(); // Prevent the default browser behavior
        setTextStyle((prevState: TextStyle) => ({
          ...prevState,
          bold: !prevState.bold,
        }));
      } else if (event.ctrlKey && event.key === 'i') {
        event.preventDefault(); // Prevent the default browser behavior
        setTextStyle((prevState: TextStyle) => ({
          ...prevState,
          italic: !prevState.italic,
        }));
      } else if (event.ctrlKey && event.key === 'u') {
        event.preventDefault(); // Prevent the default browser behavior
        setTextStyle((prevState: TextStyle) => ({
          ...prevState,
          underline: !prevState.underline,
        }));
      } else if (event.ctrlKey && event.key === 'Backspace') {
        event.preventDefault(); // Prevent the default browser behavior
        if (!textConvertedToJSON) return;
        let updatedOps = textConvertedToJSON?.ops;
        if (updatedOps.length === 0) return;
        updatedOps.pop(); // Remove the last element
        setTextConvertedToJSON({
          ops: updatedOps,
        });
      } else if (event.key === 'Backspace') {
        // Handle Backspace
        let updatedOps = textConvertedToJSON?.ops;
        if (!updatedOps || updatedOps.length === 0) {
          return;
        } else {
          let lastInsert = updatedOps[updatedOps.length - 1];
          if (lastInsert && lastInsert.insert.length > 0) {
            lastInsert.insert = lastInsert.insert.slice(0, -1);
            if (lastInsert.insert.length === 0) {
              updatedOps.pop();
            } else updatedOps[updatedOps?.length - 1] = lastInsert;
          } else {
            updatedOps.pop();
          }
          setTextConvertedToJSON({
            ops: updatedOps,
          });
        }
      } else if (event.key === ' ') {
        event.preventDefault();

        setTextConvertedToJSON((prevTextConvertedToJSON) => {
          if (prevTextConvertedToJSON) {
            let updatedOps = prevTextConvertedToJSON.ops;
            updatedOps[updatedOps.length - 1].insert += ' ';
            return {
              ops: updatedOps,
            };
          }
          return null;
        });
      } else if (event.key === 'Enter') {
        // Handle Enter

        setTextConvertedToJSON((prevTextConvertedToJSON) => {
          if (prevTextConvertedToJSON) {
            let updatedOps = prevTextConvertedToJSON.ops;
            updatedOps[updatedOps.length - 1].insert += '\n';
            return {
              ops: updatedOps,
            };
          }
          return null;
        });
      } else if (isNormalLetter) {
        if (
          textConvertedToJSON &&
          textConvertedToJSON?.ops?.length > 0
        ) {
          let lastInsert =
            textConvertedToJSON.ops[
              textConvertedToJSON.ops.length - 1
            ];

          if (lastInsert.attributes !== textStyle) {
            setTextConvertedToJSON({
              ops: [
                ...textConvertedToJSON.ops,
                {
                  insert: key,
                  attributes: textStyle,
                },
              ],
            });
          } else {
            let updatedOps = textConvertedToJSON.ops;
            updatedOps[updatedOps.length - 1].insert += key;
            setTextConvertedToJSON({
              ops: updatedOps,
            });
          }
        } else {
          setTextConvertedToJSON({
            ops: [
              {
                insert: key,
                attributes: textStyle,
              },
            ],
          });
        }
      }
    };

    handleKeyPress();
  };

  console.log(textConvertedToJSON);

  return (
    <div>
      <div className="font-bold text-3xl">New post title here...</div>
      <div
        tabIndex={0}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
        className="cursor-text w-full h-96 rounded-lg bg-gray-50 "
      >
        <JsonDiplayer textConvertedToJSON={textConvertedToJSON} />
      </div>
    </div>
  );
};

export default CustomTextFeild;
