import { useEffect } from 'react';

const CLASS_LIST_IGNORE = 'ignore-outside';
const useClickOutside = (
  ref: React.MutableRefObject<any>,
  callback: (event: any) => void,
  refElementIgnore?: React.MutableRefObject<any>
) => {
  const handleClickOutside = (event: any) => {
    if (!ref.current || ref.current.contains(event.target)) {
      return;
    }
    if (event.target.parentElement.classList.contains(CLASS_LIST_IGNORE))
      return;
    if (refElementIgnore && refElementIgnore.current) {
      const { top, bottom, left, right } =
        refElementIgnore.current.getBoundingClientRect();
      const betweenX = left <= event.clientX && event.clientX <= right;
      const betweenY = top < event.clientY && event.clientY <= bottom;
      if (betweenX && betweenY) {
        return;
      }
    }
    callback(event);
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;
