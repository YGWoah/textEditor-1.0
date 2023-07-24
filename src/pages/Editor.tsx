import {
  ChangeEvent,
  Fragment,
  useState,
  KeyboardEvent,
  useRef,
} from 'react';
import CustomHtmlTagP from '../components/CustomHtmlTagP';
//the type of text style
type TextStyle = {
  italic: boolean;
  bold: boolean;
  underline: boolean;
  link: boolean;
  heading: boolean;
};

type resultType = {
  text: string;
  className: string;
};

export default function Editor() {
  const [result, setResult] = useState<Array<resultType>>([]);
  const [textStyle, setTestStyle] = useState<TextStyle>({
    italic: false,
    bold: false,
    underline: false,
    link: false,
    heading: false,
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
  };
  const handleEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      let text = e.currentTarget.value;
      console.log(textStyle);

      setResult((oldState) => {
        return [
          ...oldState,
          {
            text: text,
            className:
              'text-black ' +
              (textStyle.italic ? ' italic ' : '') +
              (textStyle.bold ? ' font-bold ' : '') +
              (textStyle.underline ? ' underline ' : '') +
              (textStyle.link ? ' link ' : '') +
              (textStyle.heading ? ' heading ' : ''),
          },
        ];
      });
    }
  };

  const handleCursorPosition = () => {
    if (textareaRef.current) {
      const cursorPosition = textareaRef.current.selectionStart;
      console.log('Cursor position:', cursorPosition);
    }
  };
  const typingResultRef = useRef<HTMLDivElement>(null);

  return (
    <Fragment>
      <header className="flex flex-col p-8 ">
        <div className="flex flex-row justify-between">
          <div>
            <ul className="flex flex-row">
              <li className="m-2">File</li>
              <li className="m-2">Edit</li>
              <li className="m-2">View</li>
              <li className="m-2">Help</li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-row ">
              <li className="m-2">Save</li>
              <li className="m-2">Save As</li>
              <li className="m-2">Open</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <ul className="flex flex-row">
              <li className="text-black  hover:bg-gray-900 hover:text-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 ">
                Undo
              </li>
              <li className="text-black  hover:bg-gray-900 hover:text-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 ">
                Redo
              </li>
            </ul>
          </div>
          <div className="flex flex-row">
            <ul className="flex flex-row">
              <li
                className={
                  '  hover:bg-gray-900 hover:text-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 ' +
                  (textStyle.italic
                    ? 'bg-gray-900 text-white'
                    : 'text-black')
                }
                onClick={() => {
                  console.log('changing italic');
                  setTestStyle((prevState: TextStyle) => ({
                    ...prevState,
                    italic: !prevState.italic,
                  }));
                }}
              >
                italic
              </li>
              <li
                className={
                  '  hover:bg-gray-900 hover:text-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 ' +
                  (textStyle.bold
                    ? 'bg-gray-900 text-white'
                    : 'text-black')
                }
                onClick={() => {
                  console.log('changing italic');
                  setTestStyle((prevState: TextStyle) => ({
                    ...prevState,
                    bold: !prevState.bold,
                  }));
                }}
              >
                bold
              </li>
              <li
                className={
                  '  hover:bg-gray-900 hover:text-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 ' +
                  (textStyle.underline
                    ? 'bg-gray-900 text-white'
                    : 'text-black')
                }
                onClick={() => {
                  console.log('changing italic');
                  setTestStyle((prevState: TextStyle) => ({
                    ...prevState,
                    underline: !prevState.underline,
                  }));
                }}
              >
                underline
              </li>
              <li
                className="text-black  hover:bg-gray-900 hover:text-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 "
                onClick={() => {
                  console.log('changing italic');
                  setTestStyle((prevState: TextStyle) => ({
                    ...prevState,
                    link: !prevState.link,
                  }));
                }}
              >
                link
              </li>
              <li
                className={
                  '  hover:bg-gray-900 hover:text-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 ' +
                  (textStyle.heading
                    ? 'bg-gray-900 text-white'
                    : 'text-black')
                }
                onClick={() => {
                  console.log('changing italic');
                  setTestStyle((prevState: TextStyle) => ({
                    ...prevState,
                    heading: !prevState.heading,
                  }));
                }}
              >
                heading
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main className="flex flex-col p-8 outline-none">
        <div ref={typingResultRef}>
          {result.length > 0 &&
            result.map((item, index) => {
              return (
                <CustomHtmlTagP
                  key={index}
                  text={item.text}
                  className={item.className}
                />
              );
            })}
        </div>
        <textarea
          id="editor"
          rows={8}
          onChange={(e) => {
            changeHandler(e);
          }}
          onKeyDown={(e) => {
            handleEnter(e);
          }}
          ref={textareaRef}
          className="block w-full px-0 text-sm text-gray-800 bg-white focus:ring-0 border"
          placeholder="Write an article..."
          required
        ></textarea>
        <button onClick={handleCursorPosition}>
          Get Cursor Position
        </button>
      </main>
    </Fragment>
  );
}
