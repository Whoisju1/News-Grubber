import { RefObject } from 'react';

type Callback = (elem: EventTarget) => void;

export const handleOutsideClick = (ref: RefObject<HTMLElement>, callback: Callback) => (e: MouseEvent) => {
  const { target } = e;
    if (ref.current && target) {
      const isOutside = !(ref.current).contains(target as Node);
      if (isOutside) {
        callback(target);
      }
    }
}