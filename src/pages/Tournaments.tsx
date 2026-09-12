import { useState } from "react";
import { motion } from "framer-motion";

const Icon = ({ path, size = 20, className = "" }: { path: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
);

const iconPaths = {
  trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M18 2H6v7a6 6 0 0 0 12 0V2Z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  clock: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2",
  arrow: "M5 12h14M12 5l7 7-7 7",
  check: "M20 6L9 17l-5-5",
};

const tournaments = [
  {
    id: 1,
    name: "Weekly Blitz Championship",
    format: "Swiss System",
    timeControl: "3+0",
    prize: "$500",
    players: 128,
    registered: 94,
    status: "Registering",
    startDate: "Dec 15, 2024",
    rounds: 9,
  },
  {
    id: 2,
    name: "Monthly Grand Prix",
    format: "Round Robin",
    timeControl: "10+5",
    prize: "$2,000",
    players: 64,
    registered: 64,
    status: "Live",
    startDate: "Dec 10, 2024",
    rounds: 7,
  },
  {
    id: 3,
    name: "AI Masters Invitational",
    format: "Knockout",
    timeControl: "15+10",
    prize: "$10,000",
    players: 32,
    registered: 28,
    status: "Upcoming",
    startDate: "Jan 5, 2025",
    rounds: 5,
  },
  {
    id: 4,
    name: "Beginner Friendly Open",
    format: "Swiss System",
    timeControl: "10+0",
    prize: "$100",
    players: 256,
    registered: 187,
    status: "Registering",
    startDate: "Dec 20, 2024",
    rounds: 7,
  },
];

const leaderboard = [
  { rank: 1, name: "StockfishBot", elo: 3520, wins: 245, losses: 12, country: "🇺🇸" },
  { rank: 2, name: "AlphaZero Clone", elo: 3480, wins: 238, losses: 18, country: "🇬🇧" },
  { rank: 3, name: "Leela Chess", elo: 3420, wins: 225, losses: 25, country: "🇳🇱" },
  { rank: 4, name: "Komodo Dragon", elo: 3380, wins: 218, losses: 32, country: "🇩🇪" },
  { rank: 5, name: "Fat Fritz", elo: 3350, wins: 210, losses: 38, country: "🇦🇹" },
];

export default function Tournaments() {
  const [selectedTournament, setSelectedTournament] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");

  const filteredTournaments = filter === "all" ? tournaments : tournaments.filter((t) => t.status.toLowerCase() === filter);

  if (selectedTournament) {
    const tournament = tournaments.find((t) => t.id === selectedTournament);
    if (!tournament) return null;

    return (
      <div className="min-h-screen bg-[#FDF6F0] pt-16 pb-20 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <button onClick={() => setSelectedTournament(null)} className="flex items-center gap-2 text-[#C4785C] hover:text-[#B3685C] mb-6 font-medium">
            <Icon path={iconPaths.arrow} size={16} className="rotate-180" />
            Back to Tournaments
          </button>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl border border-white/80 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#2D1F14]">{tournament.name}</h1>
                <p className="text-[#6B5B4F] mt-1">{tournament.format} • {tournament.timeControl} • {tournament.rounds} rounds</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  tournament.status === "Live" ? "bg-[#8B9E82]/10 text-[#8B9E82]" :
                  tournament.status === "Registering" ? "bg-[#C4785C]/10 text-[#C4785C]" :
                  "bg-[#F5EBE0] text-[#9E8E82]"
                }`}>
                  {tournament.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#FDF6F0] rounded-2xl p-4">
                <div className="text-xs text-[#9E8E82] font-medium uppercase tracking-wide mb-1">Prize Pool</div>
                <div className="text-2xl font-bold text-[#C4785C]">{tournament.prize}</div>
              </div>
              <div className="bg-[#FDF6F0] rounded-2xl p-4">
                <div className="text-xs text-[#9E8E82] font-medium uppercase tracking-wide mb-1">Players</div>
                <div className="text-2xl font-bold text-[#2D1F14]">{tournament.registered}/{tournament.players}</div>
              </div>
              <div className="bg-[#FDF6F0] rounded-2xl p-4">
                <div className="text-xs text-[#9E8E82] font-medium uppercase tracking-wide mb-1">Start Date</div>
                <div className="text-lg font-bold text-[#2D1F14]">{tournament.startDate}</div>
              </div>
              <div className="bg-[#FDF6F0] rounded-2xl p-4">
                <div className="text-xs text-[#9E8E82] font-medium uppercase tracking-wide mb-1">Format</div>
                <div className="text-lg font-bold text-[#2D1F14]">{tournament.format}</div>
              </div>
            </div>

            {tournament.status === "Registering" && (
              <button className="w-full py-4 bg-[#C4785C] text-white font-bold rounded-2xl hover:bg-[#B3685C] transition-colors shadow-lg">
                Register Bot
              </button>
            )}
            {tournament.status === "Live" && (
              <button className="w-full py-4 bg-[#8B9E82] text-white font-bold rounded-2xl hover:bg-[#7A8D71] transition-colors shadow-lg">
                Watch Live
              </button>
            )}
          </div>

          {/* Leaderboard */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/80">
            <h2 className="text-xl font-bold text-[#2D1F14] mb-4">Leaderboard</h2>
            <div className="space-y-2">
              {leaderboard.map((player) => (
                <div key={player.rank} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#F5EBE0] transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    player.rank === 1 ? "bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-white" :
                    player.rank === 2 ? "bg-gradient-to-br from-[#C0C0C0] to-[#A8A8A8] text-white" :
                    player.rank === 3 ? "bg-gradient-to-br from-[#CD7F32] to-[#A0522D] text-white" :
                    "bg-[#F5EBE0] text-[#6B5B4F]"
                  }`}>
                    {player.rank}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-[#2D1F14]">{player.name}</div>
                    <div className="text-xs text-[#9E8E82]">{player.wins}W / {player.losses}L</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#C4785C]">{player.elo}</div>
                    <div className="text-xs text-[#9E8E82]">ELO</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0] pt-16 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2D1F14] mb-2">Tournaments</h1>
          <p className="text-[#6B5B4F]">Compete in automated tournaments with multiple formats</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {["all", "live", "registering", "upcoming"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                filter === f
                  ? "bg-[#C4785C] text-white"
                  : "bg-white/70 text-[#6B5B4F] hover:bg-[#F5EBE0]"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Tournament Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament, i) => (
            <motion.div
              key={tournament.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedTournament(tournament.id)}
              className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFE8D6] to-[#F5EBE0] flex items-center justify-center">
                  <Icon path={iconPaths.trophy} size={22} className="text-[#C4785C]" />
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  tournament.status === "Live" ? "bg-[#8B9E82]/10 text-[#8B9E82]" :
                  tournament.status === "Registering" ? "bg-[#C4785C]/10 text-[#C4785C]" :
                  "bg-[#F5EBE0] text-[#9E8E82]"
                }`}>
                  {tournament.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#2D1F14] mb-1">{tournament.name}</h3>
              <p className="text-sm text-[#6B5B4F] mb-4">{tournament.format} • {tournament.timeControl}</p>

              <div className="flex items-center justify-between pt-4 border-t border-[#F5EBE0]">
                <div>
                  <div className="text-xs text-[#9E8E82] font-medium uppercase tracking-wide">Prize</div>
                  <div className="text-xl font-bold text-[#C4785C]">{tournament.prize}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#9E8E82] font-medium uppercase tracking-wide">Players</div>
                  <div className="text-xl font-bold text-[#2D1F14]">{tournament.registered}/{tournament.players}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
