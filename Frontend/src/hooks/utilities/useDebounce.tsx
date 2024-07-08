import { useEffect, useState } from "react";

export default function useDebounce({
  value,
  delay,
}: {
  value: string;
  delay: number;
}) {
  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, value]);

  return delayedValue;
}
