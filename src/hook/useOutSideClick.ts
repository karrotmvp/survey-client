import { RefObject, TouchEvent } from 'react';

function useOutsideClick(
  ref: RefObject<HTMLElement>,
  callback: () => void,
): (e: TouchEvent<HTMLDivElement>) => void {
  const handleClick = (e: TouchEvent<HTMLDivElement>) => {
    if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
      callback();
    }
  };
  return handleClick;
}

export default useOutsideClick;
