import { RefObject, MouseEvent } from 'react';

function useOutsideClick(
  ref: RefObject<HTMLElement>,
  callback: () => void,
): (e: MouseEvent) => void {
  const handleClick = (e: MouseEvent) => {
    console.log(ref.current);
    if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
      callback();
    }
  };
  return handleClick;
}

export default useOutsideClick;
