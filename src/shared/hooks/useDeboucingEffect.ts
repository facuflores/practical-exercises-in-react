import { useEffect } from "react";

const useDeboucingEffect = (fn:() => void, waitTime: number, deps: any) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      fn.apply(undefined, deps);
    }, waitTime);
    return () => clearTimeout(timeout);
  }, deps);
};

export default useDeboucingEffect;