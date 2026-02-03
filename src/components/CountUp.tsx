import { useEffect, useState } from "react";

type Props = {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export default function CountUp({ end, duration = 2, prefix = "", suffix = "", className = "" }: Props) {
  const [value, setValue] = useState(0);
  const startTime = duration * 1000;

  useEffect(() => {
    let start: number;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / startTime, 1);
      setValue(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, startTime]);

  const formatted = value.toLocaleString();
  return (
    <span className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
