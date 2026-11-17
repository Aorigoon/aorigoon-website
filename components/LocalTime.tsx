"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

// Small live local-time clock. The tick counter starts at 0 so the server
// HTML and the first client render agree; the interval drives the ticks.
export default function LocalTime() {
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTicks((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  if (ticks === 0) return <span aria-hidden="true">--:--:--</span>;

  const now = new Date();
  return (
    <time dateTime={now.toISOString()} suppressHydrationWarning>
      {formatTime(now)}
    </time>
  );
}
