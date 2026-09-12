import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChessPieces } from "../ChessPieces";
import ChessBoard from "../components/ChessBoard";

const Icon = ({ path, size = 20, className = "" }: { path: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
);

const iconPaths = {
  arrow: "M5 12h14M12 5l7 7-7 7",
  play: "M5 3l14 9-14 9V3z",
  sparkle: "M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  bot: "M12 2a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3V4a2 2 0 0 1 2-2zM9 12h.01M15 12h.01M10 16h4",
  trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M18 2H6v7a6 6 0 0 0 12 0V2Z",
  brain: "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  check: "M20 6L9 17l-5-5",
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDF6F0]">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDF6F0] via-[#FFE8D6]/30 to-[#F5EBE0]" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C4785C]/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#8B9E82] animate-pulse" />
                <span className="text-sm font-medium text-[#6B5B4F]">3,241 watching live</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D1F14] leading-tight">
                Where bots <span className="bg-gradient-to-r from-[#C4785C] to-[#D4956F] bg-clip-text text-transparent">outthink</span> each other
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 text-lg text-[#6B5B4F] max-w-lg">
                Upload your chess engine. Watch it compete in real-time. Learn from an AI grandmaster who narrates every move.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-col sm:flex-row gap-3">
                <button onClick={() => navigate("/live")} className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#C4785C] text-white font-semibold rounded-2xl hover:bg-[#B3685C] transition-all shadow-lg">
                  Watch Live
                  <Icon path={iconPaths.arrow} size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => navigate("/play")} className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-[#2D1F14] font-semibold rounded-2xl hover:bg-[#F5EBE0] transition-all shadow-md">
                  <Icon path={iconPaths.play} size={16} className="text-[#C4785C]" />
                  Play Now
                </button>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="relative">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-white/80">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F5EBE0] flex items-center justify-center">
                      <ChessPieces.Knight color="dark" size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#2D1F14]">StockfishBot</div>
                      <div className="text-xs text-[#9E8E82]">2847 ELO</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#9E8E82]">VS</span>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-[#2D1F14]">AlphaClone</div>
                      <div className="text-xs text-[#9E8E82]">2812 ELO</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#F5EBE0] flex items-center justify-center">
                      <ChessPieces.Bishop color="dark" size={24} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mb-5">
                  <ChessBoard size="md" lastMove={{ from: "3-3", to: "2-4" }} />
                </div>

                <div className="bg-[#FDF6F0] rounded-2xl p-4 border border-[#F5EBE0]">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon path={iconPaths.sparkle} size={14} className="text-[#C4785C]" />
                    <span className="text-xs font-semibold text-[#C4785C] uppercase tracking-wide">GM AI</span>
                  </div>
                  <p className="text-sm text-[#6B5B4F]">"Brilliant pawn sacrifice on c4. Bot Alpha opens the diagonal — deep calculation, 12 ply ahead."</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-[#C4785C] uppercase tracking-wider">Features</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D1F14]">
              Everything to build, battle & <span className="bg-gradient-to-r from-[#C4785C] to-[#D4956F] bg-clip-text text-transparent">learn</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: iconPaths.bot, title: "Bot Arena", desc: "Upload any UCI-compatible engine. Watch autonomous matches with sub-100ms move streaming.", path: "/arena" },
              { icon: iconPaths.sparkle, title: "AI Grandmaster", desc: "Real-time commentary from an AI that explains every move like a world-class narrator.", path: "/live" },
              { icon: iconPaths.brain, title: "Deep Analysis", desc: "Blunder detection, best-move suggestions, and personalized improvement reports.", path: "/analysis" },
              { icon: iconPaths.trophy, title: "Tournaments", desc: "Swiss, round-robin, and knockout formats. Automated brackets with live ELO tracking.", path: "/tournaments" },
              { icon: iconPaths.users, title: "Human Play", desc: "Play against other humans or any bot. Same AI commentary and analysis tools.", path: "/play" },
              { icon: iconPaths.eye, title: "Live Spectate", desc: "Watch matches unfold in real-time. Follow top bots and build an audience.", path: "/live" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(f.path)}
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFE8D6] to-[#F5EBE0] flex items-center justify-center mb-5">
                  <Icon path={f.icon} size={22} className="text-[#C4785C]" />
                </div>
                <h3 className="text-lg font-bold text-[#2D1F14] mb-2">{f.title}</h3>
                <p className="text-sm text-[#6B5B4F]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val: "50K+", label: "Bots uploaded" },
              { val: "2M+", label: "Matches played" },
              { val: "180+", label: "Countries" },
              { val: "99.9%", label: "Uptime" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#C4785C] to-[#D4956F] bg-clip-text text-transparent">{s.val}</div>
                <div className="text-sm text-[#6B5B4F] mt-2 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
