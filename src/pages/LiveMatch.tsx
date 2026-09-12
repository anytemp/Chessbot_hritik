import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  heart: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  share: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
};

const mockMoves = [
  { num: 1, white: "e4", black: "e5", eval: "+0.2", time: "0:05" },
  { num: 2, white: "Nf3", black: "Nc6", eval: "+0.1", time: "0:12" },
  { num: 3, white: "Bb5", black: "a6", eval: "+0.3", time: "0:18" },
  { num: 4, white: "Ba4", black: "Nf6", eval: "0.0", time: "0:25" },
  { num: 5, white: "O-O", black: "Be7", eval: "+0.2", time: "0:32" },
  { num: 6, white: "Re1", black: "b5", eval: "+0.4", time: "0:41" },
  { num: 7, white: "Bb3", black: "d6", eval: "+0.3", time: "0:48" },
  { num: 8, white: "c3", black: "O-O", eval: "+0.5", time: "0:55" },
  { num: 9, white: "h3", black: "Nb8", eval: "+0.2", time: "1:02" },
  { num: 10, white: "d4", black: "Nbd7", eval: "+0.6", time: "1:10" },
  { num: 11, white: "Nbd2", black: "Bb7", eval: "+0.4", time: "1:18" },
  { num: 12, white: "Bc2", black: "Re8", eval: "+0.5", time: "1:25" },
];

const aiCommentary = [
  { move: 1, text: "Bot Alpha opens with e4 — the King's Pawn opening. A classic choice that immediately controls the center and opens lines for the bishop and queen.", type: "opening" },
  { move: 3, text: "The Ruy Lopez! One of the oldest and most respected openings. Bot Alpha is playing for long-term positional pressure.", type: "opening" },
  { move: 5, text: "Bot Alpha castles early — excellent king safety. Now the rook is active on the e-file, putting pressure on Black's e5 pawn.", type: "strategy" },
  { move: 6, text: "Interesting! Bot Omega pushes b5, challenging the bishop. This is the Morphy Defense — sharp and dynamic.", type: "tactic" },
  { move: 8, text: "Both bots have completed development. The position is balanced but rich with possibilities. This could go either way.", type: "strategy" },
  { move: 10, text: "Bot Alpha strikes in the center with d4! This is a critical moment. The tension is building...", type: "tactic" },
];

const chatMessages = [
  { user: "ChessMaster99", msg: "What a brilliant opening!", time: "2m ago", avatar: "CM" },
  { user: "BotLover", msg: "Stockfish is playing solid", time: "1m ago", avatar: "BL" },
  { user: "GrandmaGambit", msg: "This is intense! 🔥", time: "45s ago", avatar: "GG" },
  { user: "TacticalGenius", msg: "Watch for the knight fork", time: "30s ago", avatar: "TG" },
  { user: "EndgameKing", msg: "Alpha has better structure", time: "15s ago", avatar: "EK" },
];

export default function LiveMatch() {
  const [currentMove, setCurrentMove] = useState(5);
  const [commentaryIndex, setCommentaryIndex] = useState(0);
  const [viewers, setViewers] = useState(1247);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const [isLiked, setIsLiked] = useState(false);

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

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setMessages([...messages, { user: "You", msg: chatInput, time: "now", avatar: "YO" }]);
      setChatInput("");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF6F0] pt-16 pb-20 lg:pb-0">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">LIVE</span>
              <span className="text-sm text-[#6B5B4F]">Round 14 • Weekly Blitz Championship</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2D1F14]">StockfishBot vs AlphaZero Clone</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                isLiked ? "bg-red-50 border-red-200 text-red-500" : "bg-white border-[#F5EBE0] text-[#6B5B4F] hover:bg-[#F5EBE0]"
              }`}
            >
              <Icon path={iconPaths.heart} size={18} className={isLiked ? "fill-red-500" : ""} />
              <span className="text-sm font-medium">2.4k</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#F5EBE0] hover:bg-[#F5EBE0] transition-colors">
              <Icon path={iconPaths.share} size={18} className="text-[#6B5B4F]" />
              <span className="text-sm font-medium text-[#6B5B4F]">Share</span>
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#F5EBE0]">
              <Icon path={iconPaths.eye} size={18} className="text-[#9E8E82]" />
              <span className="text-sm font-bold text-[#2D1F14]">{viewers.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Main Board */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-8">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-xl border border-white/80">
              {/* Top Player */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2D1F14] to-[#4A3A2F] flex items-center justify-center shadow-lg">
                    <ChessPieces.Knight color="light" size={32} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-[#2D1F14]">StockfishBot v12</span>
                      <span className="px-2 py-0.5 bg-[#C4785C]/10 text-[#C4785C] text-xs font-bold rounded-full">2847</span>
                    </div>
                    <div className="text-xs text-[#9E8E82]">White • 145 wins / 23 losses</div>
                  </div>
                </div>
                <Timer whiteTime={540} blackTime={485} activeColor="white" />
              </div>

              {/* Captured Pieces */}
              <div className="flex items-center gap-2 mb-3 px-2">
                <span className="text-xs text-[#9E8E82]">Captured:</span>
                <div className="flex gap-1">
                  <ChessPieces.Pawn color="dark" size={16} />
                  <ChessPieces.Pawn color="dark" size={16} />
                </div>
              </div>

              {/* Board */}
              <div className="flex justify-center my-4">
                <ChessBoard size="lg" lastMove={{ from: "3-3", to: "2-4" }} />
              </div>

              {/* Captured Pieces */}
              <div className="flex items-center gap-2 mb-3 px-2">
                <span className="text-xs text-[#9E8E82]">Captured:</span>
                <div className="flex gap-1">
                  <ChessPieces.Pawn color="light" size={16} />
                </div>
              </div>

              {/* Bottom Player */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C4785C] to-[#D4956F] flex items-center justify-center shadow-lg">
                    <ChessPieces.Bishop color="light" size={32} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-[#2D1F14]">AlphaZero Clone</span>
                      <span className="px-2 py-0.5 bg-[#8B9E82]/10 text-[#8B9E82] text-xs font-bold rounded-full">2812</span>
                    </div>
                    <div className="text-xs text-[#9E8E82]">Black • 138 wins / 31 losses</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2.5 bg-[#F5EBE0] rounded-xl hover:bg-[#FFE8D6] transition-colors" title="Offer Draw">
                    <Icon path={iconPaths.flag} size={20} className="text-[#6B5B4F]" />
                  </button>
                  <button className="p-2.5 bg-[#F5EBE0] rounded-xl hover:bg-[#FFE8D6] transition-colors" title="Settings">
                    <Icon path={iconPaths.settings} size={20} className="text-[#6B5B4F]" />
                  </button>
                </div>
              </div>

              {/* Evaluation Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#6B5B4F] uppercase tracking-wide">Evaluation</span>
                  <div className="flex items-center gap-2">
                    <Icon path={iconPaths.zap} size={14} className="text-[#C4785C]" />
                    <span className="text-sm font-bold text-[#C4785C]">+0.6</span>
                  </div>
                </div>
                <div className="h-4 bg-[#F5EBE0] rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#C4785C] to-[#D4956F] rounded-full"
                    animate={{ width: ["48%", "52%", "55%", "58%", "62%"] }}
                    transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-full bg-white/50" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            {/* AI Commentary */}
            <AnimatePresence mode="wait">
              <motion.div
                key={commentaryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-br from-[#C4785C]/10 to-[#D4956F]/10 rounded-2xl p-5 border border-[#C4785C]/20 shadow-md"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#C4785C] flex items-center justify-center">
                    <Icon path={iconPaths.sparkle} size={16} className="text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#C4785C] uppercase tracking-wide">AI Grandmaster</span>
                    <div className="text-xs text-[#9E8E82]">Move {aiCommentary[commentaryIndex].move}</div>
                  </div>
                </div>
                <p className="text-sm text-[#2D1F14] leading-relaxed">{aiCommentary[commentaryIndex].text}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    aiCommentary[commentaryIndex].type === "opening" ? "bg-blue-100 text-blue-700" :
                    aiCommentary[commentaryIndex].type === "tactic" ? "bg-red-100 text-red-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {aiCommentary[commentaryIndex].type}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Move History */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white/80 shadow-md">
              <h3 className="text-sm font-bold text-[#2D1F14] mb-4 uppercase tracking-wide flex items-center gap-2">
                <Icon path={iconPaths.zap} size={16} className="text-[#C4785C]" />
                Move History
              </h3>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {mockMoves.slice(0, currentMove).map((move, i) => (
                  <motion.div
                    key={move.num}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${
                      i === currentMove - 1 ? "bg-[#C4785C]/10 border border-[#C4785C]/20" : "hover:bg-[#F5EBE0]"
                    }`}
                  >
                    <span className="text-xs font-bold text-[#9E8E82] w-6">{move.num}.</span>
                    <span className="text-sm font-mono font-semibold text-[#2D1F14] flex-1">{move.white}</span>
                    <span className="text-sm font-mono font-semibold text-[#2D1F14] flex-1">{move.black}</span>
                    <span className="text-xs text-[#9E8E82]">{move.time}</span>
                    <span className={`text-xs font-bold w-10 text-right ${
                      parseFloat(move.eval) > 0.3 ? "text-[#8B9E82]" :
                      parseFloat(move.eval) < 0 ? "text-red-500" : "text-[#9E8E82]"
                    }`}>
                      {move.eval}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Live Chat */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white/80 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#2D1F14] uppercase tracking-wide flex items-center gap-2">
                  <Icon path={iconPaths.users} size={16} className="text-[#6B5B4F]" />
                  Live Chat
                </h3>
                <span className="text-xs text-[#9E8E82]">{viewers} watching</span>
              </div>
              <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
                <AnimatePresence>
                  {messages.map((chat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        chat.avatar === "YO" ? "bg-[#C4785C]" : "bg-gradient-to-br from-[#8B9E82] to-[#A8B8A0]"
                      }`}>
                        {chat.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#2D1F14]">{chat.user}</span>
                          <span className="text-xs text-[#9E8E82]">{chat.time}</span>
                        </div>
                        <p className="text-xs text-[#6B5B4F] mt-0.5">{chat.msg}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 bg-[#FDF6F0] rounded-xl text-sm border border-[#F5EBE0] outline-none focus:ring-2 focus:ring-[#C4785C]/30"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2.5 bg-[#C4785C] text-white rounded-xl hover:bg-[#B3685C] transition-colors"
                >
                  <Icon path={iconPaths.send} size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
