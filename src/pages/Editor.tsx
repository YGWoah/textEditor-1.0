import { useState } from 'react';
import CustomButton from '../components/CutomButton';
import CustomTextFeild_2 from '../components/CustumTextFeild_2';

type TextStyle = {
  italic: boolean;
  bold: boolean;
  underline: boolean;
  link: boolean;
  heading: boolean;
};

const Editor = () => {
  const [textStyle, setTestStyle] = useState<TextStyle>({
    italic: false,
    bold: false,
    underline: false,
    link: false,
    heading: false,
  });

  return (
    <div className=" w-full flex justify-center items-center flex-col">
      <header className="flex justify-center w-full bg-gray-300 h-12">
        <div className="w-1/2 md:w-1/3 flex justify-start items-center p-4">
          <img src="./closeIcon.svg" className="w-6 h-6" />
        </div>
        <div className="w-1/2 sm:w-1/3  flex justify-end items-center">
          <CustomButton
            name="Guide"
            color="texte-black"
            bgColor="bg-white"
            width="w-20"
            additionalCSS="m-2"
          />

          <CustomButton
            name="Save"
            bgColor="bg-secondary"
            width="w-20"
            additionalCSS="m-2"
          />
          <CustomButton
            name="Publish"
            width="w-24"
            color="text-white"
            additionalCSS="m-2"
          />
        </div>
      </header>
      <div className="flex flex-wrap w-full items-center justify-center space-x-1 sm:pl-4">
        <div>
          <button
            type="button"
            onClick={() => {
              setTestStyle((prevState: TextStyle) => ({
                ...prevState,
                bold: !prevState.bold,
              }));
            }}
            className={
              'text-xl p-2 rounded cursor-pointer hover:bg-gray-100 ' +
              (textStyle.bold ? '  text-black' : 'text-gray-500  ')
            }
          >
            <span className=" font-extrabold ">B</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTestStyle((prevState: TextStyle) => ({
                ...prevState,
                italic: !prevState.italic,
              }));
            }}
            className={
              'text-xl p-2 rounded cursor-pointer hover:bg-gray-100 ' +
              (textStyle.italic ? '  text-black' : 'text-gray-500  ')
            }
          >
            <span className=" italic uppercase  ">I</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTestStyle((prevState: TextStyle) => ({
                ...prevState,
                underline: !prevState.underline,
              }));
            }}
            className={
              'text-xl p-2 rounded cursor-pointer hover:bg-gray-100 ' +
              (textStyle.underline
                ? '  text-black'
                : 'text-gray-500  ')
            }
          >
            <span className=" underline uppercase  ">U</span>
          </button>
        </div>
        <div className="flex  items-center justify-end border-l-2 border-gray-500 px-4">
          <button>
            <img
              src="./assets/align-right.png"
              alt="right"
              className="w-8 opacity-50"
            />
          </button>
          <button>
            <img
              src="./assets/align-center.png"
              alt="center"
              className="w-8"
            />
          </button>
          <button>
            <img
              src="./assets/align-left.png"
              alt="left"
              className="w-8"
            />
          </button>
        </div>
        <div className="flex  items-center justify-end border-l-2 border-gray-500 px-4">
          <button>
            <img
              src="./assets/numbered-list.png"
              alt="right"
              className="w-8 "
            />
          </button>
          <button>
            <img
              src="./assets/bulleted-list.png"
              alt="center"
              className="w-8"
            />
          </button>
        </div>
      </div>

      <CustomTextFeild_2
        textStyle={textStyle}
        setTextStyle={setTestStyle}
      />
    </div>
  );
};

export default Editor;
