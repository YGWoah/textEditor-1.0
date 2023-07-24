import { useState } from 'react';
import CustomTextFeild from '../components/CustomTextFeild';
import CustomButton from '../components/CutomButton';

type TextStyle = {
  italic: boolean;
  bold: boolean;
  underline: boolean;
  link: boolean;
  heading: boolean;
};

const EditorJsonApproach = () => {
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
        <div className="w-1/3 flex justify-start items-center">
          <img src="./closeIcon.svg" className="w-6 h-6" />
        </div>
        <div className="w-1/3 flex justify-end items-center">
          <CustomButton
            name="Guide"
            color="texte-black"
            bgColor="bg-white"
            width="w-20"
            additionalCSS="m-2"
          />
          {/* <button>Options</button> */}
          <CustomButton
            name="Save"
            bgColor="bg-secondary"
            width="w-20"
            additionalCSS="m-2"
          />
          <CustomButton
            name="Publish"
            width="w-24"
            additionalCSS="m-2"
          />
        </div>
      </header>
      <div className="flex flex-wrap items-center space-x-1 sm:pl-4">
        <button
          type="button"
          onClick={() => {
            setTestStyle((prevState: TextStyle) => ({
              ...prevState,
              bold: !prevState.bold,
            }));
          }}
          className={
            'p-2 rounded cursor-pointer hover:bg-gray-100 ' +
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
            'p-2 rounded cursor-pointer hover:bg-gray-100 ' +
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
            'p-2 rounded cursor-pointer hover:bg-gray-100 ' +
            (textStyle.underline ? '  text-black' : 'text-gray-500  ')
          }
        >
          <span className=" underline uppercase  ">U</span>
        </button>
      </div>
      <CustomTextFeild
        textStyle={textStyle}
        setTextStyle={setTestStyle}
      />
    </div>
  );
};

export default EditorJsonApproach;
