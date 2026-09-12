import { useState, useEffect } from "react";

interface TimerProps {
  whiteTime: number;
  blackTime: number;
  activeColor: "white" | "black";
  isRunning?: boolean;
}

export default function Timer({ whiteTime, blackTime, activeColor, isRunning = true }: TimerProps) {
  const [white, setWhite] = useState(whiteTime);
  const [black, setBlack] = useState(blackTime);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      if (activeColor === "white") {
        setWhite((t) => Math.max(0, t - 1));
      } else {
        setBlack((t) => Math.max(0, t - 1));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [activeColor, isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className={`px-5 py-3 rounded-xl font-mono text-xl font-bold transition-all ${
        activeColor === "black"
          ? "bg-gradient-to-br from-[#2D1F14] to-[#4A3A2F] text-white shadow-lg scale-105"
          : "bg-[#F5EBE0] text-[#9E8E82] border border-[#F5EBE0]"
      }`}>
        {formatTime(black)}
      </div>
      <div className={`px-5 py-3 rounded-xl font-mono text-xl font-bold transition-all ${
        activeColor === "white"
          ? "bg-white text-[#2D1F14] shadow-lg border-2 border-[#C4785C] scale-105"
          : "bg-[#F5EBE0] text-[#9E8E82] border border-[#F5EBE0]"
      }`}>
        {formatTime(white)}
      </div>
    </div>
  );
}
