import { useState, useEffect } from "react";
import { HashRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChessPieces } from "./ChessPieces";
import { api } from "./services/api";

// ─── ICONS ──────────────────────────────────────────────────────────────────
const Icon = ({ path, size = 20, className = "" }: { path: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
);

const iconPaths = {
  play: "M5 3l14 9-14 9V3z",
  trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M18 2H6v7a6 6 0 0 0 12 0V2Z",
  brain: "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  bot: "M12 2a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3V4a2 2 0 0 1 2-2z",
  arrow: "M5 12h14M12 5l7 7-7 7",
  sparkle: "M12 3v18M3 12h18",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",
  menu: "M3 12h18M3 6h18M3 18h18",
  x: "M18 6L6 18M6 6l12 12",
  check: "M20 6L9 17l-5-5",
  alert: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  trend: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
};

// ─── CHESS BOARD ────────────────────────────────────────────────────────────
function ChessBoard({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? "w-32 h-32" : size === "md" ? "w-48 h-48 sm:w-64 sm:h-64" : "w-full max-w-md aspect-square";
  const pieceSize = size === "sm" ? 16 : size === "md" ? 20 : 32;
  
  const pieces: Record<string, { piece: keyof typeof ChessPieces; color: "dark" | "light" }> = {
    "0-0": { piece: "Rook", color: "dark" }, "1-0": { piece: "Knight", color: "dark" }, "2-0": { piece: "Bishop", color: "dark" }, "3-0": { piece: "Queen", color: "dark" }, "4-0": { piece: "King", color: "dark" }, "5-0": { piece: "Bishop", color: "dark" }, "6-0": { piece: "Knight", color: "dark" }, "7-0": { piece: "Rook", color: "dark" },
    "0-1": { piece: "Pawn", color: "dark" }, "1-1": { piece: "Pawn", color: "dark" }, "2-1": { piece: "Pawn", color: "dark" }, "4-1": { piece: "Pawn", color: "dark" }, "5-1": { piece: "Pawn", color: "dark" }, "6-1": { piece: "Pawn", color: "dark" }, "7-1": { piece: "Pawn", color: "dark" },
    "3-3": { piece: "Pawn", color: "light" }, "2-4": { piece: "Knight", color: "light" },
    "0-6": { piece: "Pawn", color: "light" }, "1-6": { piece: "Pawn", color: "light" }, "4-6": { piece: "Pawn", color: "light" }, "5-6": { piece: "Pawn", color: "light" }, "6-6": { piece: "Pawn", color: "light" }, "7-6": { piece: "Pawn", color: "light" },
    "0-7": { piece: "Rook", color: "light" }, "1-7": { piece: "Knight", color: "light" }, "2-7": { piece: "Bishop", color: "light" }, "3-7": { piece: "Queen", color: "light" }, "4-7": { piece: "King", color: "light" }, "5-7": { piece: "Bishop", color: "light" }, "7-7": { piece: "Rook", color: "light" },
  };

  return (
    <div className={`${dim} grid grid-cols-8 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20`}>
      {Array.from({ length: 64 }, (_, i) => {
        const r = Math.floor(i / 8), c = i % 8;
        const light = (r + c) % 2 === 0;
        const p = pieces[`${c}-${r}`];
        const Piece = p ? ChessPieces[p.piece] : null;
        return (
          <div key={i} className={`aspect-square flex items-center justify-center ${light ? "bg-slate-200" : "bg-slate-500"}`}>
            {Piece && <Piece color={p.color} size={pieceSize} />}
          </div>
        );
      })}
    </div>
  );
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Live Match", path: "/live" },
    { label: "Play", path: "/play" },
    { label: "Tournaments", path: "/tournaments" },
    { label: "Analysis", path: "/analysis" },
    { label: "Bot Arena", path: "/arena" },
  ];

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#E8E0D4]/90 backdrop-blur-xl border-b border-[#c9c1b5]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <button onClick={() => navigate("/")} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl neu-flat flex items-center justify-center">
                <ChessPieces.Knight color="dark" size={22} />
              </div>
              <span className="font-display text-2xl font-semibold text-[#2C1810] hidden sm:block">
                Chess<span className="text-[#8B6914]">Bot</span>
              </span>
            </button>

            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                    location.pathname === link.path
                      ? "neu-pressed text-[#8B6914]"
                      : "text-[#5C4A3A] hover:text-[#2C1810]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button onClick={() => setShowSignIn(true)} className="px-4 py-2 text-sm font-medium text-[#5C4A3A] hover:text-[#2C1810]">Sign in</button>
              <button onClick={() => setShowGetStarted(true)} className="px-5 py-2 bg-gradient-to-br from-[#8B6914] to-[#B8941C] text-[#F5EDE0] text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                Get Started
              </button>
            </div>

            <button className="md:hidden text-[#2C1810]" onClick={() => setMobileOpen(true)}>
              <Icon path={iconPaths.menu} size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-[#E8E0D4] z-50 lg:hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display text-2xl font-semibold text-[#2C1810]">Menu</span>
                  <button onClick={() => setMobileOpen(false)} className="text-[#2C1810]">
                    <Icon path={iconPaths.x} size={24} />
                  </button>
                </div>
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <button
                      key={link.path}
                      onClick={() => { navigate(link.path); setMobileOpen(false); }}
                      className={`w-full text-left px-5 py-4 text-base font-medium rounded-xl transition-all ${
                        location.pathname === link.path
                          ? "neu-pressed text-[#8B6914]"
                          : "text-[#5C4A3A] hover:text-[#2C1810]"
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sign In Modal */}
      <AnimatePresence>
        {showSignIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSignIn(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#E8E0D4] rounded-3xl p-8 max-w-md w-full neu-raised"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-3xl font-semibold text-[#2C1810] mb-6">Sign In</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-[#5C4A3A] mb-2 block">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl neu-pressed text-[#2C1810] placeholder-[#8B7A6A] outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#5C4A3A] mb-2 block">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl neu-pressed text-[#2C1810] placeholder-[#8B7A6A] outline-none"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  alert("Sign in functionality would be implemented here");
                  setShowSignIn(false);
                }}
                className="w-full py-3 bg-gradient-to-br from-[#8B6914] to-[#B8941C] text-white rounded-xl font-semibold hover:shadow-xl transition-all mb-3"
              >
                Sign In
              </button>

              <button
                onClick={() => setShowSignIn(false)}
                className="w-full py-3 neu-btn rounded-xl font-medium text-[#5C4A3A]"
              >
                Cancel
              </button>

              <p className="text-center text-sm text-[#5C4A3A] mt-4">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setShowSignIn(false);
                    setShowGetStarted(true);
                  }}
                  className="text-[#8B6914] font-semibold hover:underline"
                >
                  Get Started
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Get Started Modal */}
      <AnimatePresence>
        {showGetStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowGetStarted(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#E8E0D4] rounded-3xl p-8 max-w-md w-full neu-raised"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-3xl font-semibold text-[#2C1810] mb-6">Get Started</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-[#5C4A3A] mb-2 block">Username</label>
                  <input
                    type="text"
                    placeholder="chessmaster123"
                    className="w-full px-4 py-3 rounded-xl neu-pressed text-[#2C1810] placeholder-[#8B7A6A] outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#5C4A3A] mb-2 block">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl neu-pressed text-[#2C1810] placeholder-[#8B7A6A] outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#5C4A3A] mb-2 block">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl neu-pressed text-[#2C1810] placeholder-[#8B7A6A] outline-none"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  alert("Account created successfully! Welcome to ChessBot Arena.");
                  setShowGetStarted(false);
                }}
                className="w-full py-3 bg-gradient-to-br from-[#8B6914] to-[#B8941C] text-white rounded-xl font-semibold hover:shadow-xl transition-all mb-3"
              >
                Create Account
              </button>

              <button
                onClick={() => setShowGetStarted(false)}
                className="w-full py-3 neu-btn rounded-xl font-medium text-[#5C4A3A]"
              >
                Cancel
              </button>

              <p className="text-center text-sm text-[#5C4A3A] mt-4">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setShowGetStarted(false);
                    setShowSignIn(true);
                  }}
                  className="text-[#8B6914] font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── HOME PAGE ──────────────────────────────────────────────────────────────
function Home() {
  const navigate = useNavigate();
  const [viewers, setViewers] = useState(0);
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch real dashboard data from backend
    api.getDashboard()
      .then(data => {
        setDashboard(data);
        setViewers(data.live_games?.length || 0);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.log('Dashboard API not available:', err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#6B7F5E] animate-pulse-soft" />
            <span className="text-sm font-medium text-[#5C4A3A]">{viewers.toLocaleString()} watching live</span>
          </div>
          <h1 className="luxury-heading text-5xl sm:text-6xl lg:text-7xl text-[#2C1810] mb-4 text-balance">
            Where bots <span className="italic text-[#8B6914]">outthink</span> each other
          </h1>
          <p className="text-lg text-[#5C4A3A] max-w-2xl mx-auto mb-6">
            Upload your chess engine. Watch it compete in real-time. Learn from an AI grandmaster.
          </p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate("/live")}
            className="neu-accent px-8 py-4 rounded-2xl font-semibold text-lg inline-flex items-center gap-3 group"
          >
            <Icon path={iconPaths.play} size={20} />
            Watch Live Now
            <Icon path={iconPaths.arrow} size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {/* Large Hero Card - 2x2 */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate("/live")}
            className="bento-2x2 neu-raised rounded-3xl p-6 sm:p-8 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse-soft">LIVE</span>
              <span className="text-sm text-[#5C4A3A]">Weekly Championship</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#2C1810] mb-3">
              Watch Live Match
            </h2>
            <p className="text-[#5C4A3A] mb-6">
              StockfishBot vs AlphaZero Clone • Round 14
            </p>
            <div className="flex justify-center mb-6">
              <ChessBoard size="md" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon path={iconPaths.eye} size={16} className="text-[#8B7A6A]" />
                <span className="text-sm font-medium text-[#2C1810]">{viewers.toLocaleString()} watching</span>
              </div>
              <div className="flex items-center gap-2 text-[#8B6914] font-medium group-hover:gap-3 transition-all">
                <span className="text-sm">Watch now</span>
                <Icon path={iconPaths.arrow} size={16} />
              </div>
            </div>
          </motion.button>

          {/* Play Card - 2x1 */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate("/play")}
            className="bento-2x1 neu-raised rounded-3xl p-6 text-left group cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl neu-flat flex items-center justify-center">
                <Icon path={iconPaths.users} size={22} className="text-[#8B6914]" />
              </div>
              <Icon path={iconPaths.arrow} size={20} className="text-[#8B7A6A] group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-[#2C1810] mb-2">Play Chess</h3>
            <p className="text-sm text-[#5C4A3A] mb-4">Challenge humans or bots. Multiple time controls.</p>
            
            {/* 3D Interactive King Piece */}
            <div className="absolute bottom-4 right-4 w-20 h-20 perspective-1000">
              <div className="w-full h-full relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Shadow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/20 rounded-full blur-md transform translate-y-2 transition-all duration-300 group-hover:scale-75 group-hover:opacity-50"></div>
                    {/* Queen Piece */}
                    <div className="relative z-10 king-3d">
                      <ChessPieces.Queen color="dark" size={64} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.button>

          {/* Stats Card - 1x1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="neu-raised rounded-3xl p-6"
          >
            <div className="text-center">
              <div className="font-display text-4xl font-bold text-[#8B6914] mb-1">
                {dashboard?.summary?.total_bots ? dashboard.summary.total_bots.toLocaleString() : '50K+'}
              </div>
              <div className="text-sm text-[#5C4A3A]">Bots uploaded</div>
            </div>
          </motion.div>

          {/* Analysis Card - 1x1 */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate("/analysis")}
            className="neu-raised rounded-3xl p-6 text-left group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl neu-flat flex items-center justify-center mb-4">
              <Icon path={iconPaths.brain} size={22} className="text-[#8B6914]" />
            </div>
            <h3 className="font-display text-xl font-semibold text-[#2C1810] mb-2">AI Analysis</h3>
            <p className="text-xs text-[#5C4A3A]">Deep insights & learning</p>
          </motion.button>

          {/* Tournaments Card - 1x2 */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => navigate("/tournaments")}
            className="bento-1x2 neu-raised rounded-3xl p-6 text-left group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl neu-flat flex items-center justify-center mb-4">
              <Icon path={iconPaths.trophy} size={22} className="text-[#8B6914]" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-[#2C1810] mb-3">Tournaments</h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between py-2 border-b border-[#c9c1b5]/30">
                <span className="text-sm text-[#2C1810]">Weekly Blitz</span>
                <span className="text-xs font-bold text-[#6B7F5E]">LIVE</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#c9c1b5]/30">
                <span className="text-sm text-[#2C1810]">Monthly GP</span>
                <span className="text-xs font-bold text-[#8B6914]">OPEN</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-[#2C1810]">Championship</span>
                <span className="text-xs font-bold text-[#8B7A6A]">SOON</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#8B6914] font-medium group-hover:gap-3 transition-all">
              <span className="text-sm">View all</span>
              <Icon path={iconPaths.arrow} size={16} />
            </div>
          </motion.button>

          {/* Bot Arena Card - 2x1 */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => navigate("/arena")}
            className="bento-2x1 neu-raised rounded-3xl p-6 text-left group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl neu-flat flex items-center justify-center">
                <Icon path={iconPaths.bot} size={22} className="text-[#8B6914]" />
              </div>
              <Icon path={iconPaths.arrow} size={20} className="text-[#8B7A6A] group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-[#2C1810] mb-2">Bot Arena</h3>
            <p className="text-sm text-[#5C4A3A]">Upload your engine. Watch autonomous battles. Track ELO.</p>
          </motion.button>
        </div>

      </div>
    </div>
  );
}

// ─── LIVE MATCH PAGE ────────────────────────────────────────────────────────
function LiveMatch() {
  const navigate = useNavigate();
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [moves, setMoves] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [ws, setWs] = useState<WebSocket | null>(null);

  // Fetch live matches on mount
  useEffect(() => {
    api.getDashboard()
      .then(data => {
        setLiveMatches(data.live_games || []);
        setLoading(false);
        // Auto-select first live match if available
        if (data.live_games && data.live_games.length > 0) {
          selectMatch(data.live_games[0]);
        }
      })
      .catch(err => {
        console.log('Could not fetch live matches:', err.message);
        setLoading(false);
      });
  }, []);

  // Connect to WebSocket for selected match
  const selectMatch = (match: any) => {
    // Close existing WebSocket
    if (ws) {
      ws.close();
    }

    setSelectedMatch(match);
    setMoves(match.moves || []);

    // Connect to WebSocket
    const websocket = api.connectToMatch(
      match.id,
      (data) => {
        // Handle WebSocket messages
        if (data.last_move) {
          setMoves(prev => [...prev, data.last_move]);
        }
        if (data.status === 'completed') {
          console.log('Match completed:', data.result);
        }
      },
      () => {
        console.log('WebSocket closed');
      }
    );

    setWs(websocket);
  };

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 sm:px-6 page-enter bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
      <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse-soft">LIVE</span>
                <span className="text-sm text-cyan-300">Live Matches</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-white">
                {liveMatches.length} Active {liveMatches.length === 1 ? 'Match' : 'Matches'}
              </h1>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
              <Icon path={iconPaths.eye} size={18} className="text-cyan-400" />
              <span className="text-sm font-bold text-white">{liveMatches.length}</span>
            </div>
          </div>
        {loading ? (
          <div className="text-center py-20">
            <div className="text-white text-lg">Loading live matches...</div>
          </div>
        ) : liveMatches.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-white text-lg mb-4">No live matches right now</div>
            <button
              onClick={() => navigate("/play")}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Start a Match
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Live Matches List */}
            <div className="lg:col-span-1 space-y-3">
              <h3 className="text-sm font-bold text-white mb-3 uppercase">Select Match</h3>
              {liveMatches.map((match) => (
                <button
                  key={match.id}
                  onClick={() => selectMatch(match)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selectedMatch?.id === match.id
                      ? 'bg-cyan-500/20 border-cyan-400'
                      : 'bg-white/10 border-white/20 hover:bg-white/20'
                  }`}
                >
                  <div className="text-xs text-cyan-300 mb-1">Match #{match.id}</div>
                  <div className="text-sm font-semibold text-white">
                    Bot {match.bot1_id} vs Bot {match.bot2_id}
                  </div>
                  <div className="text-xs text-white/60 mt-1">
                    {match.moves?.length || 0} moves • {match.status}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Match Display */}
            <div className="lg:col-span-2 space-y-4">
              {selectedMatch ? (
                <>
                  <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                    <div className="flex justify-center mb-6">
                      <ChessBoard size="lg" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20">
                          <ChessPieces.Knight color="dark" size={24} />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Bot {selectedMatch.bot1_id}</div>
                          <div className="text-xs text-cyan-300">White</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-cyan-300 mb-1">Status</div>
                        <div className="text-sm font-bold text-white">{selectedMatch.status}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-semibold text-white">Bot {selectedMatch.bot2_id}</div>
                          <div className="text-xs text-cyan-300">Black</div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20">
                          <ChessPieces.Bishop color="dark" size={24} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/20">
                    <h3 className="text-sm font-bold text-white mb-3 uppercase">
                      Moves ({moves.length})
                    </h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {moves.length === 0 ? (
                        <div className="text-white/60 text-sm text-center py-4">
                          Waiting for moves...
                        </div>
                      ) : (
                        moves.map((move, idx) => (
                          <div key={idx} className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-white/10 transition-colors">
                            <span className="text-xs text-cyan-300 w-8">{Math.floor(idx / 2) + 1}.</span>
                            <span className="text-sm font-mono font-semibold text-white flex-1">
                              {idx % 2 === 0 ? move : '...'}
                            </span>
                            <span className="text-sm font-mono font-semibold text-white flex-1">
                              {idx % 2 === 1 ? move : ''}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 text-center">
                  <div className="text-white/60 text-lg">Select a match to watch</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PLAY PAGE ──────────────────────────────────────────────────────────────
function Play() {
  const navigate = useNavigate();
  const [showHumanModal, setShowHumanModal] = useState(false);
  const [showBotModal, setShowBotModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState(10);
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");

  const timeControls = [
    { label: "1 min", value: 1 },
    { label: "3 min", value: 3 },
    { label: "5 min", value: 5 },
    { label: "10 min", value: 10 },
    { label: "15 min", value: 15 },
    { label: "30 min", value: 30 },
  ];

  const difficulties = [
    { label: "Easy", value: "easy", desc: "ELO 1200" },
    { label: "Medium", value: "medium", desc: "ELO 1800" },
    { label: "Hard", value: "hard", desc: "ELO 2400" },
    { label: "Master", value: "master", desc: "ELO 3000" },
  ];

  const startGame = (mode: "human" | "bot") => {
    alert(`Starting ${mode} game!\nTime: ${selectedTime} min${mode === "bot" ? `\nDifficulty: ${selectedDifficulty}` : ""}\n\nGame would start here...`);
    if (mode === "human") setShowHumanModal(false);
    else setShowBotModal(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 sm:px-6 page-enter">
      <div className="max-w-4xl mx-auto">
        <h1 className="luxury-heading text-5xl text-[#2C1810] mb-2 text-center">Play Chess</h1>
        <p className="text-[#5C4A3A] text-center mb-12">Choose your opponent</p>

        <div className="grid sm:grid-cols-2 gap-6">
          <button
            onClick={() => setShowHumanModal(true)}
            className="neu-raised rounded-3xl p-8 text-left group"
          >
            <div className="w-16 h-16 rounded-2xl neu-flat flex items-center justify-center mb-4">
              <Icon path={iconPaths.users} size={32} className="text-[#8B6914]" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-[#2C1810] mb-2">Play vs Human</h2>
            <p className="text-sm text-[#5C4A3A] mb-4">Challenge friends or find opponents online</p>
            <div className="flex items-center gap-2 text-[#8B6914] font-medium group-hover:gap-3 transition-all">
              <span>Start game</span>
              <Icon path={iconPaths.arrow} size={16} />
            </div>
          </button>

          <button
            onClick={() => setShowBotModal(true)}
            className="neu-raised rounded-3xl p-8 text-left group"
          >
            <div className="w-16 h-16 rounded-2xl neu-flat flex items-center justify-center mb-4">
              <Icon path={iconPaths.bot} size={32} className="text-[#8B6914]" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-[#2C1810] mb-2">Play vs Bot</h2>
            <p className="text-sm text-[#5C4A3A] mb-4">Practice against AI engines at any level</p>
            <div className="flex items-center gap-2 text-[#8B6914] font-medium group-hover:gap-3 transition-all">
              <span>Start game</span>
              <Icon path={iconPaths.arrow} size={16} />
            </div>
          </button>
        </div>

        {/* Human vs Human Modal */}
        <AnimatePresence>
          {showHumanModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowHumanModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#E8E0D4] rounded-3xl p-8 max-w-md w-full neu-raised"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-display text-3xl font-semibold text-[#2C1810] mb-6">Play vs Human</h3>
                
                <div className="mb-6">
                  <label className="text-sm font-medium text-[#5C4A3A] mb-3 block">Select Time Control</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeControls.map((tc) => (
                      <button
                        key={tc.value}
                        onClick={() => setSelectedTime(tc.value)}
                        className={`py-3 rounded-xl font-medium transition-all ${
                          selectedTime === tc.value
                            ? "bg-[#8B6914] text-white"
                            : "neu-btn text-[#5C4A3A]"
                        }`}
                      >
                        {tc.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowHumanModal(false)}
                    className="flex-1 py-3 neu-btn rounded-xl font-medium text-[#5C4A3A]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => startGame("human")}
                    className="flex-1 py-3 bg-[#8B6914] text-white rounded-xl font-semibold hover:bg-[#7a5a10] transition-colors"
                  >
                    Find Match
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play vs Bot Modal */}
        <AnimatePresence>
          {showBotModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowBotModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#E8E0D4] rounded-3xl p-8 max-w-md w-full neu-raised"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-display text-3xl font-semibold text-[#2C1810] mb-6">Play vs Bot</h3>
                
                <div className="mb-6">
                  <label className="text-sm font-medium text-[#5C4A3A] mb-3 block">Select Time Control</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeControls.map((tc) => (
                      <button
                        key={tc.value}
                        onClick={() => setSelectedTime(tc.value)}
                        className={`py-3 rounded-xl font-medium transition-all ${
                          selectedTime === tc.value
                            ? "bg-[#8B6914] text-white"
                            : "neu-btn text-[#5C4A3A]"
                        }`}
                      >
                        {tc.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-sm font-medium text-[#5C4A3A] mb-3 block">Select Difficulty</label>
                  <div className="space-y-2">
                    {difficulties.map((diff) => (
                      <button
                        key={diff.value}
                        onClick={() => setSelectedDifficulty(diff.value)}
                        className={`w-full py-3 px-4 rounded-xl font-medium transition-all text-left flex items-center justify-between ${
                          selectedDifficulty === diff.value
                            ? "bg-[#8B6914] text-white"
                            : "neu-btn text-[#5C4A3A]"
                        }`}
                      >
                        <span>{diff.label}</span>
                        <span className="text-xs opacity-70">{diff.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowBotModal(false)}
                    className="flex-1 py-3 neu-btn rounded-xl font-medium text-[#5C4A3A]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => startGame("bot")}
                    className="flex-1 py-3 bg-[#8B6914] text-white rounded-xl font-semibold hover:bg-[#7a5a10] transition-colors"
                  >
                    Start Game
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/")}
            className="neu-btn px-6 py-3 rounded-xl font-medium text-[#5C4A3A] inline-flex items-center gap-2"
          >
            <Icon path={iconPaths.arrow} size={16} className="rotate-180" />
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── TOURNAMENTS PAGE ───────────────────────────────────────────────────────
function Tournaments() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTournaments()
      .then(data => {
        setTournaments(data);
        setLoading(false);
      })
      .catch(err => {
        console.log('Tournaments API not available yet:', err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 sm:px-6 page-enter">
      <div className="max-w-6xl mx-auto">
        <h1 className="luxury-heading text-5xl text-[#2C1810] mb-2">Tournaments</h1>
        <p className="text-[#5C4A3A] mb-12">Compete in automated tournaments</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="text-[#8B7A6A]">Loading tournaments...</div>
            </div>
          ) : tournaments.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-[#8B7A6A]">No tournaments yet. Check back soon!</div>
            </div>
          ) : (
            tournaments.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="neu-raised rounded-3xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl neu-flat flex items-center justify-center">
                    <Icon path={iconPaths.trophy} size={22} className="text-[#8B6914]" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    t.status === "RUNNING" ? "bg-[#6B7F5E]/20 text-[#6B7F5E]" :
                    t.status === "REGISTRATION_OPEN" ? "bg-[#8B6914]/20 text-[#8B6914]" :
                    "bg-[#8B7A6A]/20 text-[#8B7A6A]"
                  }`}>
                    {t.status.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-[#2C1810] mb-2">{t.name}</h3>
                {t.description && (
                  <p className="text-sm text-[#5C4A3A] mb-3">{t.description}</p>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-[#c9c1b5]/30">
                  <div>
                    <div className="text-xs text-[#8B7A6A]">Format</div>
                    <div className="text-sm font-bold text-[#2C1810]">{t.format}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#8B7A6A]">Limit</div>
                    <div className="text-sm font-bold text-[#2C1810]">{t.participant_limit}</div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/")}
            className="neu-btn px-6 py-3 rounded-xl font-medium text-[#5C4A3A] inline-flex items-center gap-2"
          >
            <Icon path={iconPaths.arrow} size={16} className="rotate-180" />
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ANALYSIS PAGE ──────────────────────────────────────────────────────────
function Analysis() {
  const navigate = useNavigate();
  const [selectedBlunder, setSelectedBlunder] = useState(0);

  const moveQualityData = [
    { name: "Excellent", value: 35, color: "#22c55e" },
    { name: "Good", value: 40, color: "#4ade80" },
    { name: "Inaccuracy", value: 15, color: "#facc15" },
    { name: "Mistake", value: 7, color: "#fb923c" },
    { name: "Blunder", value: 3, color: "#f87171" },
  ];

  const blunders = [
    {
      move: 23,
      played: "Qd3??",
      best: "Qf5!",
      eval: -2.4,
      explanation: "Your queen was exposed to a knight fork on e5. Moving to d3 allowed the opponent to win material.",
      suggestion: "Always check for opponent's knight forks before moving your queen. Qf5 maintains pressure on f7 while keeping the queen safe.",
    },
    {
      move: 15,
      played: "Nxe5??",
      best: "Nf3",
      eval: -1.8,
      explanation: "This capture looked tempting but missed a tactical shot. The opponent had a hidden defender.",
      suggestion: "Before capturing, verify all defenders. Nf3 would have developed your piece safely and maintained equality.",
    },
    {
      move: 31,
      played: "Kg2??",
      best: "Kf1",
      eval: -3.1,
      explanation: "Walking the king into a mating net. The g2 square had no escape routes.",
      suggestion: "Keep escape squares for your king. Kf1 maintains safety while staying connected to your pieces.",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 sm:px-6 page-enter bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-3">
            AI Analysis Dashboard
          </h1>
          <p className="text-gray-400 text-lg">Deep insights from your recent games</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Accuracy", value: "87%", icon: iconPaths.check },
            { label: "Blunders", value: "3", icon: iconPaths.alert },
            { label: "Best Moves", value: "28", icon: iconPaths.sparkle },
            { label: "ELO Change", value: "+70", icon: iconPaths.trend },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl hover:border-white/20 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-3">
                <Icon path={stat.icon} size={20} className="text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl hover:border-white/20 transition-all"
          >
            <h3 className="font-display text-2xl font-bold text-white mb-6">Move Quality Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moveQualityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {moveQualityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "12px",
                      color: "#ffffff",
                      fontWeight: "500",
                    }}
                    itemStyle={{ color: "#ffffff" }}
                    labelStyle={{ color: "#ffffff", fontWeight: "bold" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {moveQualityData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-300">{item.name}</span>
                  <span className="text-sm font-bold text-white ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Blunder Analysis */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl hover:border-white/20 transition-all"
          >
            <h3 className="font-display text-2xl font-bold text-white mb-6">Critical Blunders</h3>
            
            {/* Blunder Selector */}
            <div className="flex gap-2 mb-6">
              {blunders.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedBlunder(i)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    selectedBlunder === i
                      ? "bg-gradient-to-r from-white to-gray-200 text-black"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  Move {blunders[i].move}
                </button>
              ))}
            </div>

            {/* Blunder Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedBlunder}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-400 font-bold">Move {blunders[selectedBlunder].move}</span>
                    <span className="text-red-400">•</span>
                    <span className="text-red-400 font-mono font-bold">{blunders[selectedBlunder].eval}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-red-900/20 rounded-xl p-3 border border-red-500/10">
                      <div className="text-xs text-red-300/70 mb-1">You Played</div>
                      <div className="text-lg font-mono font-bold text-white">{blunders[selectedBlunder].played}</div>
                    </div>
                    <div className="bg-green-900/20 rounded-xl p-3 border border-green-500/10">
                      <div className="text-xs text-green-300/70 mb-1">Best Move</div>
                      <div className="text-lg font-mono font-bold text-white">{blunders[selectedBlunder].best}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                  <div className="text-sm font-semibold text-gray-300 mb-2">What went wrong:</div>
                  <p className="text-sm text-gray-400 leading-relaxed">{blunders[selectedBlunder].explanation}</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-4 border border-blue-500/20 backdrop-blur-sm">
                  <div className="text-sm font-semibold text-blue-300 mb-2">AI Suggestion:</div>
                  <p className="text-sm text-gray-300 leading-relaxed">{blunders[selectedBlunder].suggestion}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Performance Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl hover:border-white/20 transition-all mb-8"
        >
          <h3 className="font-display text-2xl font-bold text-white mb-6">Performance Trend (Last 10 Games)</h3>
          <div className="h-64 flex items-end justify-around gap-2">
            {[40, 55, 45, 60, 70, 65, 80, 75, 85, 90].map((val, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${val}%` }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg relative group cursor-pointer hover:from-blue-400 hover:to-purple-400 transition-all"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                  {val}%
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-white/10 backdrop-blur-xl hover:bg-white/20 px-6 py-3 rounded-xl font-medium text-white border border-white/20 inline-flex items-center gap-2 transition-all"
          >
            <Icon path={iconPaths.arrow} size={16} className="rotate-180" />
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── BOT ARENA PAGE ─────────────────────────────────────────────────────────
function BotArena() {
  const navigate = useNavigate();
  const [bots, setBots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBots()
      .then(data => {
        setBots(data);
        setLoading(false);
      })
      .catch(err => {
        console.log('Bots API not available yet:', err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 sm:px-6 page-enter">
      <div className="max-w-6xl mx-auto">
        <h1 className="luxury-heading text-5xl text-[#2C1810] mb-2">Bot Arena</h1>
        <p className="text-[#5C4A3A] mb-12">Manage your chess bots</p>

        <div className="neu-raised rounded-3xl p-6 mb-8">
          <button
            onClick={() => alert("Upload bot feature - Coming soon!")}
            className="neu-accent px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
          >
            Upload New Bot
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="text-[#8B7A6A]">Loading bots...</div>
            </div>
          ) : bots.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-[#8B7A6A] mb-4">No bots yet. Upload your first bot!</div>
              <button
                onClick={() => alert("Upload bot feature - Coming soon!")}
                className="neu-accent px-6 py-3 rounded-xl font-semibold"
              >
                Upload Bot
              </button>
            </div>
          ) : (
            bots.map((bot, i) => (
              <motion.div
                key={bot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="neu-raised rounded-3xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl neu-flat flex items-center justify-center">
                    <ChessPieces.Knight color="dark" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-[#2C1810]">{bot.name}</div>
                    <div className="text-xs text-[#8B7A6A]">{bot.filename}</div>
                  </div>
                </div>
                {bot.description && (
                  <p className="text-sm text-[#5C4A3A] mb-4">{bot.description}</p>
                )}
                <div className="pt-4 border-t border-[#c9c1b5]/30">
                  <div className="text-xs text-[#8B7A6A]">
                    Created: {new Date(bot.created_at).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/")}
            className="neu-btn px-6 py-3 rounded-xl font-medium text-[#5C4A3A] inline-flex items-center gap-2"
          >
            <Icon path={iconPaths.arrow} size={16} className="rotate-180" />
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#E8E0D4] grain">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live" element={<LiveMatch />} />
          <Route path="/play" element={<Play />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/arena" element={<BotArena />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
