import { useEffect, useRef } from 'react';

// eslint-disable-next-line
type CallBack = (...args: any) => any;
const useInterval = (callback: CallBack, delay = 1000) => {
  const savedCallback = useRef<CallBack>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id: ReturnType<typeof setInterval> | null = setInterval(tick, delay);
    return () => {
      clearInterval(id as NodeJS.Timer);
      id = null;
    };
  }, [delay]);
};

export default useInterval;
