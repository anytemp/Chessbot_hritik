import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── ICONS (inline SVG, no external deps) ───────────────────────────────────
const Icon = ({ d, size = 20, className = "" }: { d: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);

const icons = {
  bot: "M12 2a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3V4a2 2 0 0 1 2-2zM9 12h.01M15 12h.01M10 16h4",
  trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z",
  brain: "M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0-2 7.5A4 4 0 0 0 12 22a4 4 0 0 0 6-7.5A4 4 0 0 0 16 7V6a4 4 0 0 0-4-4zM12 2v20M8 8h8",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  play: "M5 3l14 9-14 9V3z",
  arrow: "M5 12h14M12 5l7 7-7 7",
  chess: "M12 2L9 7h6l-3-5zM8 8h8l1 4H7l1-4zM6 13h12v2H6zM7 16h10l1 6H6l1-6z",
  sparkle: "M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  menu: "M3 12h18M3 6h18M3 18h18",
  x: "M18 6L6 18M6 6l12 12",
  check: "M20 6L9 17l-5-5",
};

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
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0C0C0C]/90 backdrop-blur-xl border-b hairline" : ""}`}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#C9A961] flex items-center justify-center">
              <span className="text-[#0C0C0C] font-display font-semibold text-sm">♞</span>
            </div>
            <span className="font-display text-lg font-medium tracking-tight text-white">
              ChessBot<span className="text-[#C9A961]">.</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {["Arena", "Learn", "Tournaments", "Community"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-[13px] text-white/50 hover:text-white transition-colors duration-300 tracking-wide uppercase">
                {l}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-[13px] text-white/50 hover:text-white transition-colors tracking-wide uppercase">Sign in</a>
            <a href="#" className="px-5 py-2.5 bg-[#C9A961] text-[#0C0C0C] text-[13px] font-medium rounded-full hover:bg-[#D4B86E] transition-colors tracking-wide uppercase">
              Get Started
            </a>
          </div>

          <button className="md:hidden text-white/70" onClick={() => setOpen(!open)}>
            <Icon d={open ? icons.x : icons.menu} size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0C0C0C] border-b hairline overflow-hidden"
          >
            <div className="px-5 py-6 space-y-4">
              {["Arena", "Learn", "Tournaments", "Community"].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="block text-sm text-white/60 hover:text-white py-2">
                  {l}
                </a>
              ))}
              <a href="#" className="block w-full text-center px-5 py-3 bg-[#C9A961] text-[#0C0C0C] text-sm font-medium rounded-full mt-4">
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── ANIMATED REVEAL ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── CHESS BOARD (minimal) ──────────────────────────────────────────────────
function MiniBoard({ size = "sm" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "w-28 h-28 sm:w-36 sm:h-36" : "w-full aspect-square max-w-[400px]";
  const pieces: Record<string, string> = {
    "0-0": "♜", "1-0": "♞", "2-0": "♝", "3-0": "♛", "4-0": "♚", "5-0": "♝", "6-0": "♞", "7-0": "♜",
    "0-1": "♟", "1-1": "♟", "2-1": "♟", "4-1": "♟", "5-1": "♟", "6-1": "♟", "7-1": "♟",
    "3-3": "♙", "2-4": "♘",
    "0-6": "♙", "1-6": "♙", "4-6": "♙", "5-6": "♙", "6-6": "♙", "7-6": "♙",
    "0-7": "♖", "1-7": "♘", "2-7": "♗", "3-7": "♕", "4-7": "♔", "5-7": "♗", "7-7": "♖",
  };

  return (
    <div className={`${dim} grid grid-cols-8 rounded-lg overflow-hidden border border-white/[0.06]`}>
      {Array.from({ length: 64 }, (_, i) => {
        const r = Math.floor(i / 8), c = i % 8;
        const light = (r + c) % 2 === 0;
        const p = pieces[`${c}-${r}`];
        return (
          <div key={i} className={`aspect-square flex items-center justify-center ${light ? "bg-[#E8D5B5]/90" : "bg-[#B58863]/90"}`}>
            {p && <span className={`${r < 2 ? "text-[#1A1A1A]" : "text-[#F5F1EB]"} ${size === "sm" ? "text-[10px] sm:text-xs" : "text-sm sm:text-lg"}`}>{p}</span>}
          </div>
        );
      })}
    </div>
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
      {/* Subtle radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C9A961]/[0.03] rounded-full blur-3xl" />

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 w-full py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A961] eval-pulse" />
              <span className="text-[12px] text-white/40 tracking-widest uppercase">{count.toLocaleString()} watching live</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-light text-white text-balance"
            >
              Where bots
              <br />
              <span className="text-[#C9A961] italic font-normal">outthink</span> each other
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-[15px] sm:text-base text-white/40 max-w-md leading-relaxed"
            >
              Upload your chess engine. Watch it compete in real-time.
              Learn from an AI grandmaster who narrates every move.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <a href="#" className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#C9A961] text-[#0C0C0C] text-sm font-medium rounded-full hover:bg-[#D4B86E] transition-all">
                Upload your bot
                <Icon d={icons.arrow} size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#" className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/10 text-white/70 text-sm rounded-full hover:border-white/20 hover:text-white transition-all">
                <Icon d={icons.play} size={14} className="text-[#C9A961]" />
                Watch live
              </a>
            </motion.div>
          </div>

          {/* Right — live match card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-[#141414] rounded-2xl border hairline p-4 sm:p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-xs">♞</div>
                  <div>
                    <div className="text-[13px] text-white font-medium">StockfishBot</div>
                    <div className="text-[11px] text-white/30">2847 ELO</div>
                  </div>
                </div>
                <span className="text-[11px] text-white/20 font-medium">VS</span>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-[13px] text-white font-medium text-right">AlphaClone</div>
                    <div className="text-[11px] text-white/30 text-right">2812 ELO</div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-xs">♝</div>
                </div>
              </div>

              {/* Board */}
              <div className="flex justify-center mb-4">
                <MiniBoard size="md" />
              </div>

              {/* Eval bar */}
              <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#C9A961] to-[#D4B86E] rounded-full"
                  animate={{ width: ["48%", "62%", "45%", "58%", "52%"] }}
                  transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                />
              </div>

              {/* GM Commentary */}
              <div className="bg-[#0C0C0C] rounded-xl p-3.5 border hairline">
                <div className="flex items-center gap-1.5 mb-2">
                  <Icon d={icons.sparkle} size={12} className="text-[#C9A961]" />
                  <span className="text-[11px] text-[#C9A961] tracking-wide uppercase font-medium">GM AI</span>
                </div>
                <p className="text-[13px] text-white/50 leading-relaxed">
                  "Brilliant pawn sacrifice on c4. Bot Alpha opens the diagonal — deep calculation, 12 ply ahead."
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t hairline">
                <div className="flex items-center gap-1.5">
                  <Icon d={icons.eye} size={13} className="text-white/30" />
                  <span className="text-[11px] text-white/30">1,247 watching</span>
                </div>
                <span className="text-[11px] text-white/20">Move 10 • White to play</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── MARQUEE ────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ["Bot Arena", "Live Matches", "AI Commentary", "Tournaments", "ELO Ratings", "Move Analysis", "Human Play", "Engine Upload"];
  return (
    <div className="border-y hairline py-5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-[13px] text-white/20 tracking-widest uppercase flex items-center gap-3">
            {item}
            <span className="w-1 h-1 rounded-full bg-[#C9A961]/40" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── FEATURES ───────────────────────────────────────────────────────────────
function Features() {
  const features = [
    {
      icon: icons.bot,
      title: "Bot Arena",
      desc: "Upload any UCI-compatible engine. Watch autonomous matches with sub-100ms move streaming.",
    },
    {
      icon: icons.sparkle,
      title: "AI Grandmaster",
      desc: "Real-time commentary from an AI that explains every move like a world-class narrator.",
    },
    {
      icon: icons.brain,
      title: "Deep Analysis",
      desc: "Blunder detection, best-move suggestions, and personalized improvement reports after every game.",
    },
    {
      icon: icons.trophy,
      title: "Tournaments",
      desc: "Swiss, round-robin, and knockout formats. Automated brackets with live ELO tracking.",
    },
    {
      icon: icons.users,
      title: "Human Play",
      desc: "Play against other humans or any bot. Same AI commentary and analysis tools.",
    },
    {
      icon: icons.eye,
      title: "Live Spectate",
      desc: "Watch matches unfold in real-time. Follow top bots, join the community, build an audience.",
    },
  ];

  return (
    <section id="arena" className="py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="max-w-xl mb-16 sm:mb-20">
            <span className="text-[11px] text-[#C9A961] tracking-[0.2em] uppercase font-medium">Features</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white mt-4 leading-tight">
              Everything to build, battle & <span className="italic text-[#C9A961]">learn</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="bg-[#0C0C0C] p-6 sm:p-8 h-full hover-lift group cursor-default">
                <div className="w-10 h-10 rounded-full bg-white/[0.04] border hairline flex items-center justify-center mb-5 group-hover:border-[#C9A961]/30 transition-colors">
                  <Icon d={f.icon} size={18} className="text-[#C9A961]" />
                </div>
                <h3 className="text-[15px] font-medium text-white mb-2">{f.title}</h3>
                <p className="text-[13px] text-white/35 leading-relaxed">{f.desc}</p>
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
    <section id="learn" className="py-24 sm:py-32 border-t hairline">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div>
              <span className="text-[11px] text-[#C9A961] tracking-[0.2em] uppercase font-medium">AI Dashboard</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white mt-4 leading-tight">
                Every mistake becomes a <span className="italic text-[#C9A961]">lesson</span>
              </h2>
              <p className="mt-5 text-[15px] text-white/40 max-w-md leading-relaxed">
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
                      <div className="w-6 h-6 rounded-full border border-[#C9A961]/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#C9A961]/10 transition-colors">
                        <Icon d={icons.check} size={12} className="text-[#C9A961]" />
                      </div>
                      <div>
                        <div className="text-[14px] text-white font-medium">{item.label}</div>
                        <div className="text-[13px] text-white/35 mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-[#141414] rounded-2xl border hairline p-5 sm:p-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { val: "87%", label: "Accuracy", color: "text-[#C9A961]" },
                  { val: "3", label: "Blunders", color: "text-red-400/80" },
                  { val: "5", label: "Best Moves", color: "text-emerald-400/80" },
                  { val: "+42", label: "ELO Change", color: "text-[#C9A961]" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#0C0C0C] rounded-xl p-3.5 border hairline">
                    <div className={`text-xl font-display font-medium ${s.color}`}>{s.val}</div>
                    <div className="text-[11px] text-white/30 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Blunder card */}
              <div className="bg-[#0C0C0C] rounded-xl p-4 border hairline mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                  <span className="text-[11px] text-red-400/80 tracking-wide uppercase font-medium">Blunder — Move 23</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-red-500/[0.06] border border-red-500/10 rounded-lg px-3 py-2">
                    <div className="text-[10px] text-white/25 mb-0.5">Played</div>
                    <div className="text-[13px] font-mono text-white/70">Qd3?? <span className="text-red-400/60">-2.4</span></div>
                  </div>
                  <Icon d={icons.arrow} size={14} className="text-white/15 flex-shrink-0" />
                  <div className="flex-1 bg-emerald-500/[0.06] border border-emerald-500/10 rounded-lg px-3 py-2">
                    <div className="text-[10px] text-white/25 mb-0.5">Best</div>
                    <div className="text-[13px] font-mono text-white/70">Qf5! <span className="text-emerald-400/60">+0.8</span></div>
                  </div>
                </div>
              </div>

              {/* Performance bars */}
              <div className="bg-[#0C0C0C] rounded-xl p-4 border hairline">
                <div className="text-[11px] text-white/25 mb-3 tracking-wide uppercase">Last 20 games</div>
                <div className="flex items-end gap-[3px] h-16">
                  {[40, 55, 45, 60, 70, 65, 80, 75, 85, 70, 90, 85, 88, 92, 87, 90, 85, 92, 88, 95].map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${v}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.03 }}
                      className={`flex-1 rounded-sm ${v > 80 ? "bg-[#C9A961]/60" : v > 60 ? "bg-white/10" : "bg-white/[0.05]"}`}
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
    <section id="tournaments" className="py-24 sm:py-32 border-t hairline">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <span className="text-[11px] text-[#C9A961] tracking-[0.2em] uppercase font-medium">Tournaments</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white mt-4 leading-tight">
                Compete at the <span className="italic text-[#C9A961]">highest level</span>
              </h2>
            </div>
            <a href="#" className="text-[13px] text-white/40 hover:text-[#C9A961] transition-colors flex items-center gap-1.5 self-start sm:self-auto">
              View all events <Icon d={icons.arrow} size={14} />
            </a>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.1}>
              <div className="bg-[#141414] rounded-2xl border hairline p-5 sm:p-6 hover-lift group">
                <div className="flex items-center justify-between mb-6">
                  <Icon d={icons.trophy} size={20} className="text-[#C9A961]" />
                  <span className={`text-[10px] tracking-widest uppercase font-medium px-2.5 py-1 rounded-full ${
                    e.status === "Live" ? "bg-emerald-500/10 text-emerald-400/80" :
                    e.status === "Open" ? "bg-[#C9A961]/10 text-[#C9A961]" :
                    "bg-white/5 text-white/30"
                  }`}>
                    {e.status}
                  </span>
                </div>

                <h3 className="text-lg font-display font-medium text-white mb-1">{e.name}</h3>
                <p className="text-[13px] text-white/30 mb-6">{e.format}</p>

                <div className="flex items-center justify-between pt-4 border-t hairline">
                  <div>
                    <div className="text-[10px] text-white/20 uppercase tracking-wide">Prize</div>
                    <div className="text-[15px] font-display font-medium text-[#C9A961]">{e.prize}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-white/20 uppercase tracking-wide">Players</div>
                    <div className="text-[15px] font-display font-medium text-white">{e.players}</div>
                  </div>
                </div>

                <button className="w-full mt-5 py-2.5 border border-white/[0.08] text-[13px] text-white/50 rounded-full hover:border-[#C9A961]/30 hover:text-[#C9A961] transition-all">
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
    <section className="py-24 sm:py-32 border-t hairline">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="text-center max-w-xl mx-auto mb-16 sm:mb-20">
            <span className="text-[11px] text-[#C9A961] tracking-[0.2em] uppercase font-medium">Two Modes</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white mt-4 leading-tight">
              For bots <span className="italic text-[#C9A961]">&</span> humans
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4">
          <Reveal>
            <div className="bg-[#141414] rounded-2xl border hairline p-6 sm:p-8 h-full group hover:border-[#C9A961]/20 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#C9A961]/10 flex items-center justify-center">
                  <span className="text-lg">♞</span>
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-white">Bot Arena</h3>
                  <p className="text-[12px] text-white/30">Autonomous engine battles</p>
                </div>
              </div>
              <ul className="space-y-3">
                {["UCI protocol support", "Automated matchmaking", "Bot ELO rankings", "Engine comparison tools", "API for integrations"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[13px] text-white/40">
                    <span className="w-1 h-1 rounded-full bg-[#C9A961]/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-[#141414] rounded-2xl border hairline p-6 sm:p-8 h-full group hover:border-[#C9A961]/20 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-lg">♚</span>
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-white">Human Play</h3>
                  <p className="text-[12px] text-white/30">Play, learn, improve</p>
                </div>
              </div>
              <ul className="space-y-3">
                {["Human vs Human online", "Human vs any bot engine", "AI grandmaster commentary", "Post-game deep analysis", "Puzzles & training modes"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[13px] text-white/40">
                    <span className="w-1 h-1 rounded-full bg-white/20" />
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
    <section className="border-t hairline">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center sm:text-left">
                <div className="font-display text-3xl sm:text-4xl font-light text-[#C9A961]">{s.val}</div>
                <div className="text-[12px] text-white/30 mt-1 tracking-wide">{s.label}</div>
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
    <section className="py-24 sm:py-32 border-t hairline">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="relative bg-[#141414] rounded-3xl border hairline p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A961]/[0.03] via-transparent to-[#C9A961]/[0.02]" />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight max-w-lg mx-auto">
                Ready to build your <span className="italic text-[#C9A961]">chess legacy?</span>
              </h2>
              <p className="mt-5 text-[15px] text-white/35 max-w-md mx-auto">
                Join thousands of bot developers and chess enthusiasts pushing the boundaries of chess intelligence.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="#" className="px-8 py-3.5 bg-[#C9A961] text-[#0C0C0C] text-sm font-medium rounded-full hover:bg-[#D4B86E] transition-colors">
                  Start for free
                </a>
                <a href="#" className="px-8 py-3.5 border border-white/10 text-white/60 text-sm rounded-full hover:border-white/20 hover:text-white transition-all">
                  Watch demo
                </a>
              </div>
              <p className="mt-5 text-[12px] text-white/20">No credit card required • Free forever plan</p>
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
    <footer className="border-t hairline py-12 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-[#C9A961] flex items-center justify-center">
                <span className="text-[#0C0C0C] font-display font-semibold text-xs">♞</span>
              </div>
              <span className="font-display text-base font-medium text-white">ChessBot<span className="text-[#C9A961]">.</span></span>
            </div>
            <p className="text-[13px] text-white/30 max-w-xs">
              The world's first AI-powered chess bot arena. Upload, battle, learn.
            </p>
          </div>

          {[
            { title: "Product", links: ["Bot Arena", "Tournaments", "AI Dashboard", "Human Play"] },
            { title: "Resources", links: ["Documentation", "API Reference", "Bot Guide", "Blog"] },
            { title: "Company", links: ["About", "Careers", "Contact", "Privacy"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] text-white/50 tracking-[0.15em] uppercase font-medium mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-[13px] text-white/30 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t hairline pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/20">© 2026 ChessBot Arena</p>
          <div className="flex items-center gap-5">
            {["Twitter", "GitHub", "Discord"].map((s) => (
              <a key={s} href="#" className="text-[12px] text-white/20 hover:text-[#C9A961] transition-colors">{s}</a>
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
    <div className="min-h-screen bg-[#0C0C0C] text-white overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
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
