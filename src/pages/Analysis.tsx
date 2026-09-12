import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, Legend } from "recharts";

const Icon = ({ path, size = 20, className = "" }: { path: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
);

const iconPaths = {
  check: "M20 6L9 17l-5-5",
  x: "M18 6L6 18M6 6l12 12",
  alert: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  lightbulb: "M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z",
  target: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  trend: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
};

const moveQualityData = [
  { name: "Excellent", value: 35, color: "#8B9E82" },
  { name: "Good", value: 40, color: "#A8B8A0" },
  { name: "Inaccuracy", value: 15, color: "#F5C26B" },
  { name: "Mistake", value: 7, color: "#E8925C" },
  { name: "Blunder", value: 3, color: "#C4785C" },
];

const performanceData = [
  { game: "G1", accuracy: 82, elo: 1850 },
  { game: "G2", accuracy: 78, elo: 1845 },
  { game: "G3", accuracy: 85, elo: 1860 },
  { game: "G4", accuracy: 90, elo: 1875 },
  { game: "G5", accuracy: 75, elo: 1855 },
  { game: "G6", accuracy: 88, elo: 1870 },
  { game: "G7", accuracy: 92, elo: 1890 },
  { game: "G8", accuracy: 87, elo: 1885 },
  { game: "G9", accuracy: 91, elo: 1895 },
  { game: "G10", accuracy: 95, elo: 1920 },
];

const openingData = [
  { name: "Sicilian", games: 45, winRate: 52 },
  { name: "Ruy Lopez", games: 38, winRate: 58 },
  { name: "Caro-Kann", games: 25, winRate: 48 },
  { name: "French", games: 20, winRate: 45 },
  { name: "Italian", games: 32, winRate: 55 },
];

const blunders = [
  { move: 23, played: "Qd3??", best: "Qf5!", eval: -2.4, explanation: "Queen was exposed to knight fork. Qf5 maintains pressure while keeping queen safe." },
  { move: 15, played: "Nxe5??", best: "Nf3", eval: -1.8, explanation: "Missed opponent's tactical shot. Nf3 develops and defends." },
  { move: 31, played: "Kg2??", best: "Kf1", eval: -3.1, explanation: "King walked into a mating net. Kf1 keeps escape squares." },
];

export default function Analysis() {
  const [selectedGame, setSelectedGame] = useState(0);

  return (
    <div className="min-h-screen bg-[#FDF6F0] pt-16 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2D1F14] mb-2">Deep Analysis</h1>
          <p className="text-[#6B5B4F]">AI-powered insights from your recent games</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Accuracy", value: "87%", change: "+5%", color: "text-[#8B9E82]", bg: "bg-[#8B9E82]/10" },
            { label: "Blunders", value: "3", change: "-2", color: "text-[#C4785C]", bg: "bg-[#C4785C]/10" },
            { label: "Best Moves", value: "28", change: "+8", color: "text-[#C4785C]", bg: "bg-[#C4785C]/10" },
            { label: "ELO Change", value: "+70", change: "Last 10 games", color: "text-[#8B9E82]", bg: "bg-[#8B9E82]/10" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white/80 shadow-md"
            >
              <div className="text-xs text-[#9E8E82] font-medium uppercase tracking-wide mb-2">{stat.label}</div>
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className={`text-xs mt-1 ${stat.color}`}>{stat.change}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Move Quality Pie Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-md">
            <h3 className="text-lg font-bold text-[#2D1F14] mb-4">Move Quality</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={moveQualityData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                    {moveQualityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {moveQualityData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-[#6B5B4F]">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#2D1F14]">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance Trend */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-md">
            <h3 className="text-lg font-bold text-[#2D1F14] mb-4">Performance Trend</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F5EBE0" />
                  <XAxis dataKey="game" stroke="#9E8E82" fontSize={12} />
                  <YAxis stroke="#9E8E82" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#FDF6F0", border: "1px solid #F5EBE0", borderRadius: "12px" }} />
                  <Line type="monotone" dataKey="accuracy" stroke="#C4785C" strokeWidth={2} dot={{ fill: "#C4785C" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Opening Performance */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-md">
            <h3 className="text-lg font-bold text-[#2D1F14] mb-4">Opening Performance</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={openingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F5EBE0" />
                  <XAxis dataKey="name" stroke="#9E8E82" fontSize={11} />
                  <YAxis stroke="#9E8E82" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#FDF6F0", border: "1px solid #F5EBE0", borderRadius: "12px" }} />
                  <Bar dataKey="winRate" fill="#8B9E82" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Blunders Analysis */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-md mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon path={iconPaths.alert} size={20} className="text-[#C4785C]" />
            <h3 className="text-lg font-bold text-[#2D1F14]">Critical Blunders</h3>
          </div>
          <div className="space-y-3">
            {blunders.map((blunder, i) => (
              <div key={i} className="bg-[#FDF6F0] rounded-2xl p-4 border border-[#F5EBE0]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#C4785C] uppercase tracking-wide">Move {blunder.move}</span>
                    <span className="text-xs text-[#9E8E82]">•</span>
                    <span className="text-xs font-mono font-bold text-[#C4785C]">{blunder.eval}</span>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <div className="bg-red-50 rounded-xl px-3 py-2 border border-red-100">
                    <div className="text-xs text-[#9E8E82] mb-0.5">Played</div>
                    <div className="text-sm font-mono font-semibold text-[#2D1F14]">{blunder.played}</div>
                  </div>
                  <div className="bg-green-50 rounded-xl px-3 py-2 border border-green-100">
                    <div className="text-xs text-[#9E8E82] mb-0.5">Best Move</div>
                    <div className="text-sm font-mono font-semibold text-[#2D1F14]">{blunder.best}</div>
                  </div>
                </div>
                <p className="text-sm text-[#6B5B4F]">{blunder.explanation}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Suggestions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-[#C4785C]/10 to-[#D4956F]/10 rounded-3xl p-6 border border-[#C4785C]/20">
          <div className="flex items-center gap-2 mb-4">
            <Icon path={iconPaths.lightbulb} size={20} className="text-[#C4785C]" />
            <h3 className="text-lg font-bold text-[#2D1F14]">AI Recommendations</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Improve Endgame Play", desc: "Your endgame accuracy is 72%. Practice rook endgames to improve.", priority: "High" },
              { title: "Study Sicilian Defense", desc: "You lose 48% of Sicilian games. Learn the Najdorf variation.", priority: "Medium" },
              { title: "Reduce Time Pressure", desc: "You make 60% of blunders in the last 5 moves. Manage time better.", priority: "High" },
              { title: "Tactical Training", desc: "Complete 10 tactical puzzles daily to improve pattern recognition.", priority: "Medium" },
            ].map((rec, i) => (
              <div key={i} className="bg-white/80 rounded-2xl p-4 border border-white/80">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-[#2D1F14]">{rec.title}</h4>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    rec.priority === "High" ? "bg-[#C4785C]/10 text-[#C4785C]" : "bg-[#F5C26B]/10 text-[#F5C26B]"
                  }`}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-xs text-[#6B5B4F]">{rec.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
