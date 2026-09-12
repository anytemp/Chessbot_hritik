import { useState, useEffect } from "react";
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
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  sparkle: "M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4",
  flag: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
};

const mockMoves = [
  { num: 1, white: "e4", black: "e5", eval: "+0.2" },
  { num: 2, white: "Nf3", black: "Nc6", eval: "+0.1" },
  { num: 3, white: "Bb5", black: "a6", eval: "+0.3" },
  { num: 4, white: "Ba4", black: "Nf6", eval: "0.0" },
  { num: 5, white: "O-O", black: "Be7", eval: "+0.2" },
  { num: 6, white: "Re1", black: "b5", eval: "+0.4" },
  { num: 7, white: "Bb3", black: "d6", eval: "+0.3" },
  { num: 8, white: "c3", black: "O-O", eval: "+0.5" },
  { num: 9, white: "h3", black: "Nb8", eval: "+0.2" },
  { num: 10, white: "d4", black: "Nbd7", eval: "+0.6" },
];

const aiCommentary = [
  "Bot Alpha opens with the Ruy Lopez — a classical choice. Solid development, controlling the center.",
  "Interesting... Bot Omega responds with the Morphy Defense. This could lead to sharp tactics.",
  "The pawn structure is becoming complex. Both bots are playing with precision.",
  "Bot Alpha castles early — good king safety. Now focusing on piece activity.",
  "Bot Omega pushes the b-pawn, challenging the bishop. A dynamic response.",
  "The position is balanced. Both bots have equal chances. This is high-level play.",
];

export default function LiveMatch() {
  const [currentMove, setCurrentMove] = useState(5);
  const [commentaryIndex, setCommentaryIndex] = useState(0);
  const [viewers, setViewers] = useState(1247);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMove((m) => (m < mockMoves.length ? m + 1 : m));
      setViewers((v) => v + Math.floor(Math.random() * 10) - 5);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCommentaryIndex((i) => (i + 1) % aiCommentary.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF6F0] pt-16 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2D1F14]">Live Match</h1>
            <p className="text-sm text-[#6B5B4F] mt-1">Round 14 • Tournament: Weekly Blitz</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-[#F5EBE0]">
              <Icon path={iconPaths.eye} size={16} className="text-[#9E8E82]" />
              <span className="text-sm font-medium text-[#6B5B4F]">{viewers.toLocaleString()}</span>
            </div>
            <button className="px-4 py-2 bg-[#C4785C] text-white text-sm font-semibold rounded-xl hover:bg-[#B3685C] transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Main Board */}
          <div className="lg:col-span-8">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-xl border border-white/80">
              {/* Players */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F5EBE0] flex items-center justify-center">
                    <ChessPieces.Knight color="dark" size={28} />
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#2D1F14]">StockfishBot v12</div>
                    <div className="text-xs text-[#9E8E82]">2847 ELO • White</div>
                  </div>
                </div>
                <Timer whiteTime={540} blackTime={485} activeColor="white" />
              </div>

              {/* Board */}
              <div className="flex justify-center my-6">
                <ChessBoard size="lg" lastMove={{ from: "3-3", to: "2-4" }} />
              </div>

              {/* Bottom player */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F5EBE0] flex items-center justify-center">
                    <ChessPieces.Bishop color="dark" size={28} />
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#2D1F14]">AlphaZero Clone</div>
                    <div className="text-xs text-[#9E8E82]">2812 ELO • Black</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-[#F5EBE0] rounded-lg hover:bg-[#FFE8D6] transition-colors">
                    <Icon path={iconPaths.flag} size={18} className="text-[#6B5B4F]" />
                  </button>
                  <button className="p-2 bg-[#F5EBE0] rounded-lg hover:bg-[#FFE8D6] transition-colors">
                    <Icon path={iconPaths.settings} size={18} className="text-[#6B5B4F]" />
                  </button>
                </div>
              </div>

              {/* Eval bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[#6B5B4F]">Evaluation</span>
                  <span className="text-xs font-bold text-[#C4785C]">+0.6</span>
                </div>
                <div className="h-3 bg-[#F5EBE0] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#C4785C] to-[#D4956F] rounded-full"
                    animate={{ width: ["48%", "52%", "55%", "58%", "62%"] }}
                    transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            {/* AI Commentary */}
            <motion.div
              key={commentaryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#C4785C]/10 to-[#D4956F]/10 rounded-2xl p-5 border border-[#C4785C]/20"
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon path={iconPaths.sparkle} size={16} className="text-[#C4785C]" />
                <span className="text-sm font-bold text-[#C4785C] uppercase tracking-wide">AI Grandmaster</span>
              </div>
              <p className="text-sm text-[#2D1F14] leading-relaxed">{aiCommentary[commentaryIndex]}</p>
            </motion.div>

            {/* Move History */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white/80 shadow-md">
              <h3 className="text-sm font-bold text-[#2D1F14] mb-4 uppercase tracking-wide">Move History</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {mockMoves.slice(0, currentMove).map((move) => (
                  <div key={move.num} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[#F5EBE0] transition-colors">
                    <span className="text-xs font-medium text-[#9E8E82] w-6">{move.num}.</span>
                    <span className="text-sm font-mono font-semibold text-[#2D1F14] flex-1">{move.white}</span>
                    <span className="text-sm font-mono font-semibold text-[#2D1F14] flex-1">{move.black}</span>
                    <span className={`text-xs font-bold ${parseFloat(move.eval) > 0.3 ? "text-[#8B9E82]" : parseFloat(move.eval) < 0 ? "text-red-500" : "text-[#9E8E82]"}`}>
                      {move.eval}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white/80 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <Icon path={iconPaths.users} size={16} className="text-[#6B5B4F]" />
                <h3 className="text-sm font-bold text-[#2D1F14] uppercase tracking-wide">Live Chat</h3>
              </div>
              <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
                {[
                  { user: "ChessMaster99", msg: "What a brilliant move!", time: "2m ago" },
                  { user: "BotLover", msg: "Stockfish is dominating", time: "1m ago" },
                  { user: "GrandmaGambit", msg: "This is intense!", time: "30s ago" },
                ].map((chat, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#F5EBE0] flex items-center justify-center text-xs font-bold text-[#C4785C]">
                      {chat.user[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#2D1F14]">{chat.user}</span>
                        <span className="text-xs text-[#9E8E82]">{chat.time}</span>
                      </div>
                      <p className="text-xs text-[#6B5B4F] mt-0.5">{chat.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full px-4 py-2.5 bg-[#F5EBE0] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#C4785C]/30"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
