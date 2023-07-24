import React, { useRef, useState } from 'react';

const Testing = () => {
  const myRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');

  const handleClick = () => {
    const element = document.createElement('p');
    element.textContent = text;
    myRef.current?.appendChild(element);
    console.log(element);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setText(event.target.value);
  };

  return (
    <div ref={myRef}>
      <p>This is my component and i love it </p>
      <input type="text" onChange={handleChange} />
      <button onClick={handleClick}>Add Element</button>
    </div>
  );
};

export default Testing;
