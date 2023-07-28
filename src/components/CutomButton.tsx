import { useState } from 'react';

type Props = {
  name?: string;
  bgColor?: string;
  color?: string;
  width?: string;
  height?: string;
  additionalCSS?: string;
};

const CustomButton = ({
  name = 'button',
  bgColor = 'bg-primary',
  color = 'text-black',
  width = 'w-32',
  height = 'h-10',
  additionalCSS = '',
}: Props) => {
  const [clickable, setClickable] = useState(true);
  const handleLogin = () => {
    setClickable(false);
    console.log('handleLogin');
  };

  return (
    <button
      type="submit"
      onClick={handleLogin}
      className={
        ' flex signIn items-center justify-center bg-primary rounded-md text-base text ' +
        color +
        ' ' +
        additionalCSS +
        ' ' +
        width +
        ' ' +
        height +
        ' ' +
        bgColor +
        (clickable ? ' ' : ' cursor-not-allowed opacity-50')
      }
    >
      {name}
    </button>
  );
};

export default CustomButton;
