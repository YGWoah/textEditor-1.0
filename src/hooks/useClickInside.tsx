import { useEffect, useState } from "react";

/**
 * Use this hook to detect clicks inside of an element.
 *
 * @param {React.RefObject<HTMLElement>} ref A reference to the element to listen for clicks inside of.
 * @returns {boolean} True if a click has been detected inside of the element, false otherwise.
 */

function useClickInside(ref: React.RefObject<HTMLElement>): boolean {
  const [clickedInside, setClickedInside] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && ref.current.contains(event.target as Node)) {
        setClickedInside(true);
      } else {
        setClickedInside(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return clickedInside;
}

export default useClickInside;
