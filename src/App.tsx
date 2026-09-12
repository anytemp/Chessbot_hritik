import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChessPieces } from "./ChessPieces";

// ─── ICONS (clean SVG, no emoji) ────────────────────────────────────────────
const Icon = ({ path, size = 20, className = "" }: { path: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
);

const iconPaths = {
  bot: "M12 2a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3V4a2 2 0 0 1 2-2zM9 12h.01M15 12h.01M10 16h4",
  trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z",
  brain: "M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0-2 7.5A4 4 0 0 0 12 22a4 4 0 0 0 6-7.5A4 4 0 0 0 16 7V6a4 4 0 0 0-4-4zM12 2v20M8 8h8",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  sparkle: "M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  arrow: "M5 12h14M12 5l7 7-7 7",
  check: "M20 6L9 17l-5-5",
  menu: "M3 12h18M3 6h18M3 18h18",
  x: "M18 6L6 18M6 6l12 12",
  play: "M5 3l14 9-14 9V3z",
};

// ─── REVEAL ANIMATION ───────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── CHESS BOARD (proper SVG pieces) ────────────────────────────────────────
function ChessBoard({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? "w-32 h-32" : size === "md" ? "w-64 h-64" : "w-full max-w-md aspect-square";
  const pieceSize = size === "sm" ? 16 : size === "md" ? 24 : 32;
  
  const pieces: Record<string, { piece: keyof typeof ChessPieces; color: "dark" | "light" }> = {
    "0-0": { piece: "Rook", color: "dark" }, "1-0": { piece: "Knight", color: "dark" }, "2-0": { piece: "Bishop", color: "dark" }, "3-0": { piece: "Queen", color: "dark" }, "4-0": { piece: "King", color: "dark" }, "5-0": { piece: "Bishop", color: "dark" }, "6-0": { piece: "Knight", color: "dark" }, "7-0": { piece: "Rook", color: "dark" },
    "0-1": { piece: "Pawn", color: "dark" }, "1-1": { piece: "Pawn", color: "dark" }, "2-1": { piece: "Pawn", color: "dark" }, "4-1": { piece: "Pawn", color: "dark" }, "5-1": { piece: "Pawn", color: "dark" }, "6-1": { piece: "Pawn", color: "dark" }, "7-1": { piece: "Pawn", color: "dark" },
    "3-3": { piece: "Pawn", color: "light" }, "2-4": { piece: "Knight", color: "light" },
    "0-6": { piece: "Pawn", color: "light" }, "1-6": { piece: "Pawn", color: "light" }, "4-6": { piece: "Pawn", color: "light" }, "5-6": { piece: "Pawn", color: "light" }, "6-6": { piece: "Pawn", color: "light" }, "7-6": { piece: "Pawn", color: "light" },
    "0-7": { piece: "Rook", color: "light" }, "1-7": { piece: "Knight", color: "light" }, "2-7": { piece: "Bishop", color: "light" }, "3-7": { piece: "Queen", color: "light" }, "4-7": { piece: "King", color: "light" }, "5-7": { piece: "Bishop", color: "light" }, "7-7": { piece: "Rook", color: "light" },
  };

  return (
    <div className={`${dim} grid grid-cols-8 rounded-2xl overflow-hidden soft-shadow`}>
      {Array.from({ length: 64 }, (_, i) => {
        const r = Math.floor(i / 8), c = i % 8;
        const light = (r + c) % 2 === 0;
        const p = pieces[`${c}-${r}`];
        const Piece = p ? ChessPieces[p.piece] : null;
        return (
          <div key={i} className={`aspect-square flex items-center justify-center ${light ? "bg-[#F0E0CC]" : "bg-[#C4956A]/40"}`}>
            {Piece && <Piece color={p.color} size={pieceSize} />}
          </div>
        );
      })}
    </div>
  );
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm" : ""}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C4785C] to-[#D4956F] flex items-center justify-center">
              <ChessPieces.Knight color="light" size={20} />
            </div>
            <span className="text-xl font-bold text-[#2D1F14]">
              Chess<span className="text-[#C4785C]">Bot</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {["Arena", "Learn", "Tournaments", "Community"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium text-[#6B5B4F] hover:text-[#C4785C] transition-colors">
                {l}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="text-sm font-medium text-[#6B5B4F] hover:text-[#C4785C] transition-colors">Sign in</a>
            <a href="#" className="px-5 py-2.5 bg-[#C4785C] text-white text-sm font-semibold rounded-xl hover:bg-[#B3685C] transition-colors shadow-md">
              Get Started
            </a>
          </div>

          <button className="md:hidden text-[#2D1F14]" onClick={() => setOpen(!open)}>
            <Icon path={open ? iconPaths.x : iconPaths.menu} size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#F5EBE0] overflow-hidden"
          >
            <div className="px-5 py-6 space-y-4">
              {["Arena", "Learn", "Tournaments", "Community"].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="block text-base font-medium text-[#6B5B4F] py-2">
                  {l}
                </a>
              ))}
              <a href="#" className="block w-full text-center px-5 py-3 bg-[#C4785C] text-white font-semibold rounded-xl mt-4">
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────
function Hero() {
  const [count, setCount] = useState(3241);

  useEffect(() => {
    const t = setInterval(() => setCount((p) => p + Math.floor(Math.random() * 7) - 3), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF6F0] via-[#FFE8D6]/30 to-[#F5EBE0]" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C4785C]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#8B9E82]/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#8B9E82] animate-pulse-soft" />
              <span className="text-sm font-medium text-[#6B5B4F]">{count.toLocaleString()} watching live</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D1F14] leading-tight text-balance"
            >
              Where bots{" "}
              <span className="gradient-text">outthink</span>{" "}
              each other
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-lg text-[#6B5B4F] max-w-lg leading-relaxed"
            >
              Upload your chess engine. Watch it compete in real-time.
              Learn from an AI grandmaster who narrates every move.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <a href="#" className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#C4785C] text-white font-semibold rounded-2xl hover:bg-[#B3685C] transition-all shadow-lg hover:shadow-xl">
                Upload your bot
                <Icon path={iconPaths.arrow} size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#" className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-[#2D1F14] font-semibold rounded-2xl hover:bg-[#F5EBE0] transition-all shadow-md">
                <Icon path={iconPaths.play} size={16} className="text-[#C4785C]" />
                Watch live
              </a>
            </motion.div>
          </div>

          {/* Right — live match card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative"
          >
            <div className="glass-card rounded-3xl p-5 sm:p-6">
              {/* Header */}
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

              {/* Board */}
              <div className="flex justify-center mb-5">
                <ChessBoard size="md" />
              </div>

              {/* Eval bar */}
              <div className="h-2 bg-[#F5EBE0] rounded-full overflow-hidden mb-5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#C4785C] to-[#D4956F] rounded-full"
                  animate={{ width: ["48%", "62%", "45%", "58%", "52%"] }}
                  transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                />
              </div>

              {/* GM Commentary */}
              <div className="bg-[#FDF6F0] rounded-2xl p-4 border border-[#F5EBE0]">
                <div className="flex items-center gap-2 mb-2">
                  <Icon path={iconPaths.sparkle} size={14} className="text-[#C4785C]" />
                  <span className="text-xs font-semibold text-[#C4785C] uppercase tracking-wide">GM AI</span>
                </div>
                <p className="text-sm text-[#6B5B4F] leading-relaxed">
                  "Brilliant pawn sacrifice on c4. Bot Alpha opens the diagonal — deep calculation, 12 ply ahead."
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F5EBE0]">
                <div className="flex items-center gap-2">
                  <Icon path={iconPaths.eye} size={14} className="text-[#9E8E82]" />
                  <span className="text-xs text-[#9E8E82]">1,247 watching</span>
                </div>
                <span className="text-xs text-[#9E8E82]">Move 10 • White to play</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES ───────────────────────────────────────────────────────────────
function Features() {
  const features = [
    { icon: iconPaths.bot, title: "Bot Arena", desc: "Upload any UCI-compatible engine. Watch autonomous matches with sub-100ms move streaming." },
    { icon: iconPaths.sparkle, title: "AI Grandmaster", desc: "Real-time commentary from an AI that explains every move like a world-class narrator." },
    { icon: iconPaths.brain, title: "Deep Analysis", desc: "Blunder detection, best-move suggestions, and personalized improvement reports." },
    { icon: iconPaths.trophy, title: "Tournaments", desc: "Swiss, round-robin, and knockout formats. Automated brackets with live ELO tracking." },
    { icon: iconPaths.users, title: "Human Play", desc: "Play against other humans or any bot. Same AI commentary and analysis tools." },
    { icon: iconPaths.eye, title: "Live Spectate", desc: "Watch matches unfold in real-time. Follow top bots and build an audience." },
  ];

  return (
    <section id="arena" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-[#C4785C] uppercase tracking-wider">Features</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D1F14] leading-tight">
              Everything to build, battle & <span className="gradient-text">learn</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 h-full">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFE8D6] to-[#F5EBE0] flex items-center justify-center mb-5">
                  <Icon path={f.icon} size={22} className="text-[#C4785C]" />
                </div>
                <h3 className="text-lg font-bold text-[#2D1F14] mb-2">{f.title}</h3>
                <p className="text-sm text-[#6B5B4F] leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AI DASHBOARD ───────────────────────────────────────────────────────────
function Dashboard() {
  return (
    <section id="learn" className="py-24 sm:py-32 bg-gradient-to-b from-[#FDF6F0] to-[#F5EBE0]/50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div>
              <span className="text-sm font-semibold text-[#C4785C] uppercase tracking-wider">AI Dashboard</span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D1F14] leading-tight">
                Every mistake becomes a <span className="gradient-text">lesson</span>
              </h2>
              <p className="mt-5 text-lg text-[#6B5B4F] max-w-lg leading-relaxed">
                Our AI analyzes every move — blunders, missed opportunities, strategic patterns.
                Get personalized reports that turn losses into improvement.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { label: "Blunder Detection", desc: "AI identifies critical mistakes with engine-level explanations" },
                  { label: "Best Move Analysis", desc: "See what the engine would have played and why" },
                  { label: "Growth Tracking", desc: "Watch your rating improve with detailed performance metrics" },
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-xl bg-[#8B9E82]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8B9E82]/20 transition-colors">
                        <Icon path={iconPaths.check} size={16} className="text-[#8B9E82]" />
                      </div>
                      <div>
                        <div className="text-base font-semibold text-[#2D1F14]">{item.label}</div>
                        <div className="text-sm text-[#6B5B4F] mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="glass-card rounded-3xl p-5 sm:p-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { val: "87%", label: "Accuracy", color: "text-[#C4785C]" },
                  { val: "3", label: "Blunders", color: "text-red-500" },
                  { val: "5", label: "Best Moves", color: "text-[#8B9E82]" },
                  { val: "+42", label: "ELO Change", color: "text-[#C4785C]" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/80 rounded-2xl p-4 border border-[#F5EBE0]">
                    <div className={`text-2xl font-bold ${s.color}`}>{s.val}</div>
                    <div className="text-xs text-[#9E8E82] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Blunder card */}
              <div className="bg-white/80 rounded-2xl p-4 border border-[#F5EBE0] mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-xs font-semibold text-red-500 uppercase tracking-wide">Blunder — Move 23</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-red-50 rounded-xl px-3 py-2 border border-red-100">
                    <div className="text-xs text-[#9E8E82] mb-0.5">Played</div>
                    <div className="text-sm font-mono font-semibold text-[#2D1F14]">Qd3?? <span className="text-red-500">-2.4</span></div>
                  </div>
                  <Icon path={iconPaths.arrow} size={16} className="text-[#9E8E82] flex-shrink-0" />
                  <div className="flex-1 bg-green-50 rounded-xl px-3 py-2 border border-green-100">
                    <div className="text-xs text-[#9E8E82] mb-0.5">Best</div>
                    <div className="text-sm font-mono font-semibold text-[#2D1F14]">Qf5! <span className="text-[#8B9E82]">+0.8</span></div>
                  </div>
                </div>
              </div>

              {/* Performance bars */}
              <div className="bg-white/80 rounded-2xl p-4 border border-[#F5EBE0]">
                <div className="text-xs text-[#9E8E82] mb-3 font-medium uppercase tracking-wide">Last 20 games</div>
                <div className="flex items-end gap-1 h-20">
                  {[40, 55, 45, 60, 70, 65, 80, 75, 85, 70, 90, 85, 88, 92, 87, 90, 85, 92, 88, 95].map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${v}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.03 }}
                      className={`flex-1 rounded-t ${v > 80 ? "bg-[#C4785C]" : v > 60 ? "bg-[#D4956F]" : "bg-[#F5EBE0]"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── TOURNAMENTS ────────────────────────────────────────────────────────────
function Tournaments() {
  const events = [
    { name: "Weekly Blitz", format: "Swiss • 3+0", prize: "$500", players: 128, status: "Open" },
    { name: "Monthly Grand Prix", format: "Round Robin • 10+5", prize: "$2,000", players: 64, status: "Live" },
    { name: "Championship", format: "Knockout • 15+10", prize: "$10,000", players: 32, status: "Soon" },
  ];

  return (
    <section id="tournaments" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <span className="text-sm font-semibold text-[#C4785C] uppercase tracking-wider">Tournaments</span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D1F14] leading-tight">
                Compete at the <span className="gradient-text">highest level</span>
              </h2>
            </div>
            <a href="#" className="text-sm font-medium text-[#C4785C] hover:text-[#B3685C] transition-colors flex items-center gap-2 self-start sm:self-auto">
              View all events <Icon path={iconPaths.arrow} size={16} />
            </a>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.1}>
              <div className="glass-card glass-card-hover rounded-3xl p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFE8D6] to-[#F5EBE0] flex items-center justify-center">
                    <Icon path={iconPaths.trophy} size={22} className="text-[#C4785C]" />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                    e.status === "Live" ? "bg-[#8B9E82]/10 text-[#8B9E82]" :
                    e.status === "Open" ? "bg-[#C4785C]/10 text-[#C4785C]" :
                    "bg-[#F5EBE0] text-[#9E8E82]"
                  }`}>
                    {e.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#2D1F14] mb-1">{e.name}</h3>
                <p className="text-sm text-[#6B5B4F] mb-6">{e.format}</p>

                <div className="flex items-center justify-between pt-4 border-t border-[#F5EBE0]">
                  <div>
                    <div className="text-xs text-[#9E8E82] font-medium uppercase tracking-wide">Prize</div>
                    <div className="text-xl font-bold text-[#C4785C]">{e.prize}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#9E8E82] font-medium uppercase tracking-wide">Players</div>
                    <div className="text-xl font-bold text-[#2D1F14]">{e.players}</div>
                  </div>
                </div>

                <button className="w-full mt-5 py-3 bg-white border border-[#F5EBE0] text-[#2D1F14] text-sm font-semibold rounded-xl hover:bg-[#F5EBE0] transition-colors">
                  {e.status === "Live" ? "Watch Live" : "Register Bot"}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TWO MODES ──────────────────────────────────────────────────────────────
function Modes() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-[#F5EBE0]/50 to-[#FDF6F0]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-[#C4785C] uppercase tracking-wider">Two Modes</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D1F14] leading-tight">
              For bots <span className="gradient-text">&</span> humans
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C4785C] to-[#D4956F] flex items-center justify-center">
                  <ChessPieces.Knight color="light" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2D1F14]">Bot Arena</h3>
                  <p className="text-sm text-[#6B5B4F]">Autonomous engine battles</p>
                </div>
              </div>
              <ul className="space-y-3">
                {["UCI protocol support", "Automated matchmaking", "Bot ELO rankings", "Engine comparison tools", "API for integrations"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#6B5B4F]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C4785C]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B9E82] to-[#A8B8A0] flex items-center justify-center">
                  <ChessPieces.King color="light" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2D1F14]">Human Play</h3>
                  <p className="text-sm text-[#6B5B4F]">Play, learn, improve</p>
                </div>
              </div>
              <ul className="space-y-3">
                {["Human vs Human online", "Human vs any bot engine", "AI grandmaster commentary", "Post-game deep analysis", "Puzzles & training modes"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#6B5B4F]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B9E82]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── STATS ──────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { val: "50K+", label: "Bots uploaded" },
    { val: "2M+", label: "Matches played" },
    { val: "180+", label: "Countries" },
    { val: "99.9%", label: "Uptime" },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text">{s.val}</div>
                <div className="text-sm text-[#6B5B4F] mt-2 font-medium">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFE8D6]/40 via-transparent to-[#F5EBE0]/40" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D1F14] leading-tight max-w-2xl mx-auto">
                Ready to build your <span className="gradient-text">chess legacy?</span>
              </h2>
              <p className="mt-5 text-lg text-[#6B5B4F] max-w-xl mx-auto">
                Join thousands of bot developers and chess enthusiasts pushing the boundaries of chess intelligence.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="#" className="px-8 py-4 bg-[#C4785C] text-white font-semibold rounded-2xl hover:bg-[#B3685C] transition-colors shadow-lg">
                  Start for free
                </a>
                <a href="#" className="px-8 py-4 bg-white text-[#2D1F14] font-semibold rounded-2xl hover:bg-[#F5EBE0] transition-colors shadow-md">
                  Watch demo
                </a>
              </div>
              <p className="mt-5 text-sm text-[#9E8E82]">No credit card required • Free forever plan</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 sm:py-16 border-t border-[#F5EBE0]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C4785C] to-[#D4956F] flex items-center justify-center">
                <ChessPieces.Knight color="light" size={20} />
              </div>
              <span className="text-xl font-bold text-[#2D1F14]">Chess<span className="text-[#C4785C]">Bot</span></span>
            </div>
            <p className="text-sm text-[#6B5B4F] max-w-xs">
              The world's first AI-powered chess bot arena. Upload, battle, learn.
            </p>
          </div>

          {[
            { title: "Product", links: ["Bot Arena", "Tournaments", "AI Dashboard", "Human Play"] },
            { title: "Resources", links: ["Documentation", "API Reference", "Bot Guide", "Blog"] },
            { title: "Company", links: ["About", "Careers", "Contact", "Privacy"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-[#2D1F14] mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm text-[#6B5B4F] hover:text-[#C4785C] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#F5EBE0] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#9E8E82]">© 2026 ChessBot Arena</p>
          <div className="flex items-center gap-6">
            {["Twitter", "GitHub", "Discord"].map((s) => (
              <a key={s} href="#" className="text-sm text-[#9E8E82] hover:text-[#C4785C] transition-colors font-medium">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-[#FDF6F0] text-[#2D1F14] overflow-x-hidden">
      <Nav />
      <Hero />
      <Features />
      <Dashboard />
      <Tournaments />
      <Modes />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
}
