import { useRef } from "react";

const Button: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    // Focus the button
    buttonRef.current?.focus();
  };

  return (
    <button ref={buttonRef} onClick={handleClick}>
      Click me to open the keyboard
    </button>
  );
};

const Testing = () => {
  // const [isFocused, setIsFocused] = useState<boolean>(false);

  // const handleClick = () => {
  //   setIsFocused(true);
  // };

  // const handleFocus = () => {
  //   if (document.activeElement) {
  //     document.activeElement?.blur(); // Safe access operator
  //   }
  // };

  return (
    <div>
      {/* <div
        tabIndex={0}
        onClick={handleClick}
        onFocus={handleFocus}
        style={{ border: "1px solid black", padding: "10px" }}
      >
        Click me to display the keyboard!
      </div>
      {isFocused && <input type="text" />} */}

      <Button />
    </div>
  );
};

export default Testing;
