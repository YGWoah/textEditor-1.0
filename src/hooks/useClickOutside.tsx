import { useEffect, useState } from "react";

/**
 * Use this hook to detect clicks outside of an element.
 *
 * @param {React.RefObject<HTMLElement>} ref A reference to the element to listen for clicks outside of.
 * @returns {boolean} True if a click has been detected outside of the element, false otherwise.
 */

function useClickOutside(ref: React.RefObject<HTMLElement>): boolean {
  const [clickedOutside, setClickedOutside] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setClickedOutside(true);
      } else {
        setClickedOutside(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return clickedOutside;
}

export default useClickOutside;
