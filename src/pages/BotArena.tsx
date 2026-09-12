import { useState } from "react";
import { motion } from "framer-motion";
import { ChessPieces } from "../ChessPieces";

const Icon = ({ path, size = 20, className = "" }: { path: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
);

const iconPaths = {
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  bot: "M12 2a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3V4a2 2 0 0 1 2-2zM9 12h.01M15 12h.01M10 16h4",
  play: "M5 3l14 9-14 9V3z",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M18 2H6v7a6 6 0 0 0 12 0V2Z",
  check: "M20 6L9 17l-5-5",
};

const myBots = [
  { name: "MyBot v1.2", engine: "Stockfish 15", elo: 2450, wins: 145, losses: 67, draws: 23, status: "Active" },
  { name: "TacticalMaster", engine: "Leela Chess 0.11", elo: 2280, wins: 89, losses: 45, draws: 12, status: "Active" },
  { name: "EndgameKing", engine: "Komodo 14", elo: 2150, wins: 56, losses: 34, draws: 8, status: "Inactive" },
];

const recentMatches = [
  { bot1: "MyBot v1.2", bot2: "AlphaZero Clone", result: "Win", moves: 45, time: "2h ago", elo1: "+12", elo2: "-12" },
  { bot1: "MyBot v1.2", bot2: "Leela Chess", result: "Loss", moves: 38, time: "5h ago", elo1: "-8", elo2: "+8" },
  { bot1: "MyBot v1.2", bot2: "Komodo Dragon", result: "Draw", moves: 62, time: "1d ago", elo1: "+2", elo2: "+2" },
  { bot1: "TacticalMaster", bot2: "Fat Fritz", result: "Win", moves: 51, time: "2d ago", elo1: "+15", elo2: "-15" },
];

export default function BotArena() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDF6F0] pt-16 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#2D1F14] mb-2">Bot Arena</h1>
            <p className="text-[#6B5B4F]">Manage your bots and watch them compete</p>
          </div>
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C4785C] text-white font-semibold rounded-2xl hover:bg-[#B3685C] transition-colors shadow-lg"
          >
            <Icon path={iconPaths.upload} size={18} />
            Upload Bot
          </button>
        </div>

        {/* Upload Modal */}
        {showUpload && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-xl mb-6">
            <h3 className="text-xl font-bold text-[#2D1F14] mb-4">Upload New Bot</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-[#6B5B4F] mb-2 block">Bot Name</label>
                <input type="text" placeholder="My Awesome Bot" className="w-full px-4 py-3 bg-[#FDF6F0] rounded-xl border border-[#F5EBE0] outline-none focus:ring-2 focus:ring-[#C4785C]/30" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#6B5B4F] mb-2 block">Engine</label>
                <select className="w-full px-4 py-3 bg-[#FDF6F0] rounded-xl border border-[#F5EBE0] outline-none focus:ring-2 focus:ring-[#C4785C]/30">
                  <option>Stockfish 15</option>
                  <option>Leela Chess 0.11</option>
                  <option>Komodo 14</option>
                  <option>Custom Engine</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-[#6B5B4F] mb-2 block">Engine File</label>
              <div className="border-2 border-dashed border-[#F5EBE0] rounded-2xl p-8 text-center hover:border-[#C4785C]/30 transition-colors cursor-pointer">
                <Icon path={iconPaths.upload} size={32} className="text-[#9E8E82] mx-auto mb-2" />
                <p className="text-sm text-[#6B5B4F]">Click to upload or drag and drop</p>
                <p className="text-xs text-[#9E8E82] mt-1">UCI-compatible engine (max 100MB)</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-[#C4785C] text-white font-semibold rounded-xl hover:bg-[#B3685C] transition-colors">
                Upload Bot
              </button>
              <button onClick={() => setShowUpload(false)} className="px-6 py-3 bg-[#F5EBE0] text-[#6B5B4F] font-semibold rounded-xl hover:bg-[#FFE8D6] transition-colors">
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* My Bots */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#2D1F14] mb-4">My Bots</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myBots.map((bot, i) => (
              <motion.div
                key={bot.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white/80 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFE8D6] to-[#F5EBE0] flex items-center justify-center">
                    <ChessPieces.Knight color="dark" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-[#2D1F14]">{bot.name}</div>
                    <div className="text-xs text-[#9E8E82]">{bot.engine}</div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    bot.status === "Active" ? "bg-[#8B9E82]/10 text-[#8B9E82]" : "bg-[#F5EBE0] text-[#9E8E82]"
                  }`}>
                    {bot.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#C4785C]">{bot.elo}</div>
                    <div className="text-xs text-[#9E8E82]">ELO</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#8B9E82]">{bot.wins}</div>
                    <div className="text-xs text-[#9E8E82]">Wins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#6B5B4F]">{bot.losses}</div>
                    <div className="text-xs text-[#9E8E82]">Losses</div>
                  </div>
                </div>
                <button className="w-full py-2 bg-[#F5EBE0] text-[#6B5B4F] text-sm font-semibold rounded-xl hover:bg-[#FFE8D6] transition-colors">
                  Manage
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Matches */}
        <div>
          <h2 className="text-xl font-bold text-[#2D1F14] mb-4">Recent Matches</h2>
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/80 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#F5EBE0]">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E8E82] uppercase tracking-wide">Match</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E8E82] uppercase tracking-wide">Result</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E8E82] uppercase tracking-wide">Moves</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E8E82] uppercase tracking-wide">Time</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E8E82] uppercase tracking-wide">ELO</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E8E82] uppercase tracking-wide"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentMatches.map((match, i) => (
                    <tr key={i} className="border-b border-[#F5EBE0] last:border-0 hover:bg-[#FDF6F0] transition-colors">
                      <td className="px-4 py-3">
                        <div className="text-sm font-semibold text-[#2D1F14]">{match.bot1}</div>
                        <div className="text-xs text-[#9E8E82]">vs {match.bot2}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          match.result === "Win" ? "bg-[#8B9E82]/10 text-[#8B9E82]" :
                          match.result === "Loss" ? "bg-[#C4785C]/10 text-[#C4785C]" :
                          "bg-[#F5C26B]/10 text-[#F5C26B]"
                        }`}>
                          {match.result}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#6B5B4F]">{match.moves}</td>
                      <td className="px-4 py-3 text-sm text-[#6B5B4F]">{match.time}</td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-bold ${match.elo1.startsWith("+") ? "text-[#8B9E82]" : "text-[#C4785C]"}`}>
                          {match.elo1}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-[#C4785C] hover:text-[#B3685C] text-sm font-medium">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
