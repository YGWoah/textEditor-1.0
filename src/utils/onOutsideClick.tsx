const onOutsideClick = (
  event: MouseEvent,
  targetDivRef: React.RefObject<HTMLDivElement>,
  setIsClickedInside: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (
    targetDivRef.current &&
    !targetDivRef.current.contains(event.target as Node)
  ) {
    setIsClickedInside(false);
  }
};

export default onOutsideClick;
