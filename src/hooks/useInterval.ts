/**
 * zijian
 * 改变delay让定时器一直执行 可以用数字递加，用null来结束
 */

import { useRef, useEffect } from 'react';

export default function useInterval(callback: Function, delay: number | null) {
  const savedCallback = useRef<any>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
