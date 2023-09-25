import CustomButton from "../Buttons/CutomButton";
const Header = () => {
  return (
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
  );
};

export default Header;
