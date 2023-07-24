import React, { FC } from 'react';

interface CustomHtmlTagPProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string;
}

const CustomHtmlTagP: FC<CustomHtmlTagPProps> = ({
  text,
  ...props
}) => {
  return <p {...props}>{text}</p>;
};

export default CustomHtmlTagP;
