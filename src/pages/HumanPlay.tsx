import { useState } from "react";
import { motion } from "framer-motion";
import ChessBoard from "../components/ChessBoard";
import Timer from "../components/Timer";
import { ChessPieces } from "../ChessPieces";

const Icon = ({ path, size = 20, className = "" }: { path: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
);

const iconPaths = {
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  bot: "M12 2a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3V4a2 2 0 0 1 2-2zM9 12h.01M15 12h.01M10 16h4",
  clock: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2",
  flag: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7",
  check: "M20 6L9 17l-5-5",
};

export default function HumanPlay() {
  const [mode, setMode] = useState<"human" | "bot" | null>(null);
  const [selectedTime, setSelectedTime] = useState(10);
  const [selectedBot, setSelectedBot] = useState("Stockfish");

  const timeControls = [
    { label: "1 min", value: 1, desc: "Bullet" },
    { label: "3 min", value: 3, desc: "Blitz" },
    { label: "5 min", value: 5, desc: "Blitz" },
    { label: "10 min", value: 10, desc: "Rapid" },
    { label: "15 min", value: 15, desc: "Rapid" },
    { label: "30 min", value: 30, desc: "Classical" },
  ];

  const bots = [
    { name: "Stockfish", elo: 3500, difficulty: "Master" },
    { name: "AlphaZero", elo: 3200, difficulty: "Expert" },
    { name: "Leela", elo: 2800, difficulty: "Advanced" },
    { name: "Komodo", elo: 2500, difficulty: "Intermediate" },
    { name: "Fruit", elo: 2000, difficulty: "Beginner" },
  ];

  if (!mode) {
    return (
      <div className="min-h-screen bg-[#FDF6F0] pt-16 pb-20 lg:pb-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2D1F14] mb-2">Play Chess</h1>
          <p className="text-[#6B5B4F] mb-8">Choose your opponent and time control</p>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMode("human")}
              className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/80 shadow-lg hover:shadow-xl transition-all text-left"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C4785C] to-[#D4956F] flex items-center justify-center mb-4">
                <Icon path={iconPaths.users} size={32} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-[#2D1F14] mb-2">Play vs Human</h2>
              <p className="text-sm text-[#6B5B4F]">Challenge a friend or find a random opponent online</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMode("bot")}
              className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/80 shadow-lg hover:shadow-xl transition-all text-left"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B9E82] to-[#A8B8A0] flex items-center justify-center mb-4">
                <Icon path={iconPaths.bot} size={32} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-[#2D1F14] mb-2">Play vs Bot</h2>
              <p className="text-sm text-[#6B5B4F]">Practice against AI engines at any level</p>
            </motion.button>
          </div>

          {mode === "bot" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h3 className="text-lg font-bold text-[#2D1F14] mb-4">Select Bot</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {bots.map((bot) => (
                  <button
                    key={bot.name}
                    onClick={() => setSelectedBot(bot.name)}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                      selectedBot === bot.name
                        ? "border-[#C4785C] bg-[#C4785C]/5"
                        : "border-[#F5EBE0] bg-white/70 hover:border-[#C4785C]/30"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-[#F5EBE0] flex items-center justify-center">
                        <ChessPieces.Knight color="dark" size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#2D1F14]">{bot.name}</div>
                        <div className="text-xs text-[#9E8E82]">{bot.elo} ELO</div>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-[#C4785C]">{bot.difficulty}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#2D1F14] mb-4">Time Control</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {timeControls.map((tc) => (
                <button
                  key={tc.value}
                  onClick={() => setSelectedTime(tc.value)}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    selectedTime === tc.value
                      ? "border-[#C4785C] bg-[#C4785C]/5"
                      : "border-[#F5EBE0] bg-white/70 hover:border-[#C4785C]/30"
                  }`}
                >
                  <div className="text-lg font-bold text-[#2D1F14]">{tc.label}</div>
                  <div className="text-xs text-[#9E8E82] mt-1">{tc.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <button className="w-full py-4 bg-[#C4785C] text-white font-bold rounded-2xl hover:bg-[#B3685C] transition-colors shadow-lg text-lg">
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0] pt-16 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2D1F14]">
              {mode === "human" ? "Playing vs Human" : `Playing vs ${selectedBot}`}
            </h1>
            <p className="text-sm text-[#6B5B4F] mt-1">{selectedTime} min • {mode === "human" ? "Online Match" : "Practice"}</p>
          </div>
          <button onClick={() => setMode(null)} className="px-4 py-2 bg-white text-[#6B5B4F] text-sm font-semibold rounded-xl hover:bg-[#F5EBE0] transition-colors border border-[#F5EBE0]">
            New Game
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-xl border border-white/80">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F5EBE0] flex items-center justify-center">
                    {mode === "human" ? (
                      <Icon path={iconPaths.users} size={24} className="text-[#6B5B4F]" />
                    ) : (
                      <ChessPieces.Knight color="dark" size={28} />
                    )}
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#2D1F14]">
                      {mode === "human" ? "Opponent" : selectedBot}
                    </div>
                    <div className="text-xs text-[#9E8E82]">{mode === "human" ? "1850 ELO" : "2800 ELO"} • Black</div>
                  </div>
                </div>
                <Timer whiteTime={selectedTime * 60} blackTime={selectedTime * 60} activeColor="white" />
              </div>

              <div className="flex justify-center my-6">
                <ChessBoard size="lg" interactive={true} onSquareClick={(sq) => console.log("Clicked:", sq)} />
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F5EBE0] flex items-center justify-center">
                    <ChessPieces.King color="light" size={28} />
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#2D1F14]">You</div>
                    <div className="text-xs text-[#9E8E82]">1920 ELO • White</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-[#F5EBE0] text-[#6B5B4F] text-sm font-semibold rounded-xl hover:bg-[#FFE8D6] transition-colors">
                    Offer Draw
                  </button>
                  <button className="p-2 bg-[#F5EBE0] rounded-lg hover:bg-[#FFE8D6] transition-colors">
                    <Icon path={iconPaths.flag} size={18} className="text-[#6B5B4F]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white/80 shadow-md">
              <h3 className="text-sm font-bold text-[#2D1F14] mb-4 uppercase tracking-wide">Game Info</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-[#F5EBE0]">
                  <span className="text-sm text-[#6B5B4F]">Time Control</span>
                  <span className="text-sm font-semibold text-[#2D1F14]">{selectedTime} min</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#F5EBE0]">
                  <span className="text-sm text-[#6B5B4F]">Mode</span>
                  <span className="text-sm font-semibold text-[#2D1F14]">{mode === "human" ? "Human" : "Bot"}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-[#6B5B4F]">Status</span>
                  <span className="text-sm font-semibold text-[#8B9E82]">In Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
