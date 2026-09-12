import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Trophy,
  BarChart3,
  Users,
  MessageSquare,
  Play,
  Upload,
  Zap,
  Brain,
  Target,
  TrendingUp,
  Eye,
  ChevronRight,
  Crown,
  Swords,
  Shield,
  Star,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-emerald-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Chess<span className="text-emerald-400">Bot</span> Arena
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-300 hover:text-emerald-400 transition-colors">Features</a>
            <a href="#arena" className="text-sm text-slate-300 hover:text-emerald-400 transition-colors">Arena</a>
            <a href="#dashboard" className="text-sm text-slate-300 hover:text-emerald-400 transition-colors">AI Dashboard</a>
            <a href="#tournaments" className="text-sm text-slate-300 hover:text-emerald-400 transition-colors">Tournaments</a>
            <a href="#pricing" className="text-sm text-slate-300 hover:text-emerald-400 transition-colors">Pricing</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 text-sm bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg font-medium transition-colors">
              Get Started Free
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-emerald-500/10"
          >
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-sm text-slate-300 hover:text-emerald-400">Features</a>
              <a href="#arena" className="block text-sm text-slate-300 hover:text-emerald-400">Arena</a>
              <a href="#dashboard" className="block text-sm text-slate-300 hover:text-emerald-400">AI Dashboard</a>
              <a href="#tournaments" className="block text-sm text-slate-300 hover:text-emerald-400">Tournaments</a>
              <a href="#pricing" className="block text-sm text-slate-300 hover:text-emerald-400">Pricing</a>
              <button className="w-full px-4 py-2 text-sm bg-emerald-500 text-white rounded-lg font-medium">
                Get Started Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function HeroSection() {
  const [liveCount, setLiveCount] = useState(2847);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 chess-pattern" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-emerald-400 font-medium">
              {liveCount.toLocaleString()} watching live right now
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="text-white">Where Bots</span>
            <br />
            <span className="gradient-text">Battle for Glory</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10"
          >
            Upload your chess bot. Watch it compete live. Learn from AI-powered
            grandmaster commentary. The world's first intelligent bot arena.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button className="group px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-semibold text-lg transition-all hover:scale-105 glow-emerald flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Your Bot
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white border border-slate-700 hover:border-emerald-500/50 rounded-xl font-semibold text-lg transition-all flex items-center gap-2">
              <Play className="w-5 h-5 text-emerald-400" />
              Watch Live Matches
            </button>
          </motion.div>

          {/* Chess board preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="glass-card rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-500 ml-2">Live Match — Round 14</span>
                <span className="ml-auto flex items-center gap-1 text-xs text-emerald-400">
                  <Eye className="w-3 h-3" /> 1,247 watching
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Chess board */}
                <div className="lg:col-span-2">
                  <ChessBoardPreview />
                </div>
                {/* Move list */}
                <div className="bg-slate-900/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-medium text-amber-400">GM Commentary</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded bg-slate-800/50 border-l-2 border-emerald-500">
                      <span className="text-emerald-400">♟ Nf3</span>
                      <p className="text-slate-400 mt-1">"A solid Reti opening. Bot Alpha controls the center early."</p>
                    </div>
                    <div className="p-2 rounded bg-slate-800/50 border-l-2 border-amber-500">
                      <span className="text-amber-400">♟ d5</span>
                      <p className="text-slate-400 mt-1">"Bot Omega responds classically. This could get interesting..."</p>
                    </div>
                    <div className="p-2 rounded bg-slate-800/50 border-l-2 border-red-500">
                      <span className="text-red-400">♟ c4!</span>
                      <p className="text-slate-400 mt-1">"⚡ Brilliant! This pawn sacrifice opens the diagonal. Deep calculation!"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ChessBoardPreview() {
  const pieces: Record<string, string> = {
    "0-0": "♜", "1-0": "♞", "2-0": "♝", "3-0": "♛", "4-0": "♚", "5-0": "♝", "6-0": "♞", "7-0": "♜",
    "0-1": "♟", "1-1": "♟", "2-1": "♟", "4-1": "♟", "5-1": "♟", "6-1": "♟", "7-1": "♟",
    "3-2": "♟",
    "3-3": "♙",
    "2-4": "♘",
    "0-6": "♙", "1-6": "♙", "4-6": "♙", "5-6": "♙", "6-6": "♙", "7-6": "♙",
    "0-7": "♖", "1-7": "♘", "2-7": "♗", "3-7": "♕", "4-7": "♔", "5-7": "♗", "7-7": "♖",
  };

  const highlightSquares = ["3-3", "2-4", "3-2"];

  return (
    <div className="grid grid-cols-8 gap-0 aspect-square max-w-sm mx-auto rounded-lg overflow-hidden border border-slate-700">
      {Array.from({ length: 64 }, (_, i) => {
        const row = Math.floor(i / 8);
        const col = i % 8;
        const key = `${col}-${row}`;
        const isLight = (row + col) % 2 === 0;
        const isHighlighted = highlightSquares.includes(key);
        const piece = pieces[key];

        return (
          <div
            key={key}
            className={`aspect-square flex items-center justify-center text-lg sm:text-2xl transition-colors ${
              isHighlighted
                ? "bg-emerald-500/30"
                : isLight
                ? "bg-slate-700/50"
                : "bg-slate-800/80"
            }`}
          >
            {piece && (
              <span className={row < 2 ? "text-slate-300" : "text-white"}>
                {piece}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Swords,
      title: "Live Match Arena",
      description: "Watch your bots battle in real-time with full move visualization, evaluation bars, and live spectator chat.",
      color: "emerald",
      badge: "Core",
    },
    {
      icon: Trophy,
      title: "Tournaments",
      description: "Round-robin, Swiss, and knockout formats. Automated brackets, ELO ratings, and prize pools.",
      color: "amber",
      badge: "Compete",
    },
    {
      icon: Brain,
      title: "AI Dashboard",
      description: "Deep analysis of every match. Blunder detection, best move suggestions, and personalized improvement reports.",
      color: "purple",
      badge: "Learn",
    },
    {
      icon: Users,
      title: "Live Spectators",
      description: "See who's watching in real-time. Build your audience, get followers, and become a community star.",
      color: "blue",
      badge: "Social",
    },
    {
      icon: MessageSquare,
      title: "AI Grandmaster Commentary",
      description: "Real-time AI commentary that explains every move like a world-class commentator. Learn while you watch.",
      color: "rose",
      badge: "AI",
    },
    {
      icon: Target,
      title: "Bot Marketplace",
      description: "Share, sell, or rent your bots. Discover top-performing engines and learn from their strategies.",
      color: "cyan",
      badge: "Market",
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", glow: "group-hover:shadow-emerald-500/20" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", glow: "group-hover:shadow-amber-500/20" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", glow: "group-hover:shadow-purple-500/20" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", glow: "group-hover:shadow-blue-500/20" },
    rose: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20", glow: "group-hover:shadow-rose-500/20" },
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", glow: "group-hover:shadow-cyan-500/20" },
  };

  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
            FEATURES
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Everything You Need to
            <br />
            <span className="gradient-text">Dominate the Arena</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From bot uploads to AI-powered analysis, we've built the complete platform
            for competitive chess bot development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const colors = colorMap[feature.color];
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group glass-card rounded-2xl p-6 hover:shadow-2xl ${colors.glow} transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <span className={`text-xs font-medium ${colors.text} ${colors.bg} px-2 py-1 rounded-full`}>
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ArenaSection() {
  return (
    <section id="arena" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
              BOT ARENA
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Upload. Battle.
              <br />
              <span className="text-emerald-400">Win.</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Your bot, your strategy. Upload any chess engine compatible with UCI protocol.
              Watch it play against thousands of other bots in real-time matches.
            </p>

            <div className="space-y-4">
              {[
                { icon: Upload, text: "Upload any UCI-compatible chess engine" },
                { icon: Zap, text: "Real-time move streaming with sub-100ms latency" },
                { icon: Shield, text: "Sandboxed execution environment for safety" },
                { icon: TrendingUp, text: "Dynamic ELO rating system with leaderboards" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-slate-300">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium text-white">StockfishBot v12</span>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">2847 ELO</span>
              </div>
              <span className="text-xs text-slate-500">VS</span>
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium text-white">AlphaZero Clone</span>
                <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">2812 ELO</span>
              </div>
            </div>

            {/* Evaluation bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: "50%" }}
                animate={{ width: ["50%", "62%", "45%", "71%", "58%"] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
              />
            </div>

            {/* Move history */}
            <div className="bg-slate-900/50 rounded-xl p-4 max-h-64 overflow-y-auto">
              <div className="space-y-1 font-mono text-xs">
                {[
                  { n: 1, w: "e4", b: "e5", eval: "+0.2" },
                  { n: 2, w: "Nf3", b: "Nc6", eval: "+0.1" },
                  { n: 3, w: "Bb5", b: "a6", eval: "+0.3" },
                  { n: 4, w: "Ba4", b: "Nf6", eval: "0.0" },
                  { n: 5, w: "O-O", b: "Be7", eval: "+0.2" },
                  { n: 6, w: "Re1", b: "b5", eval: "+0.4" },
                  { n: 7, w: "Bb3", b: "d6", eval: "+0.3" },
                  { n: 8, w: "c3", b: "O-O", eval: "+0.5" },
                  { n: 9, w: "h3", b: "Nb8", eval: "+0.2" },
                  { n: 10, w: "d4", b: "Nbd7", eval: "+0.6" },
                ].map((move) => (
                  <div key={move.n} className="flex items-center gap-3 py-1 px-2 rounded hover:bg-slate-800/50">
                    <span className="text-slate-600 w-6">{move.n}.</span>
                    <span className="text-white w-12">{move.w}</span>
                    <span className="text-slate-300 w-12">{move.b}</span>
                    <span className={`ml-auto ${parseFloat(move.eval) > 0.3 ? "text-emerald-400" : parseFloat(move.eval) < 0 ? "text-red-400" : "text-slate-500"}`}>
                      {move.eval}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live viewers */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-400">1,247 watching</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DashboardSection() {
  return (
    <section id="dashboard" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Brain className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-white">AI Analysis Dashboard</span>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-900/50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-emerald-400">87%</div>
                  <div className="text-xs text-slate-500">Accuracy Rate</div>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-red-400">3</div>
                  <div className="text-xs text-slate-500">Blunders Found</div>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-amber-400">5</div>
                  <div className="text-xs text-slate-500">Best Moves</div>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-400">+42</div>
                  <div className="text-xs text-slate-500">ELO Change</div>
                </div>
              </div>

              {/* Blunder analysis */}
              <div className="bg-slate-900/50 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-medium text-red-400">Critical Blunder — Move 23</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 mb-1">Your Bot Played</div>
                    <div className="text-sm text-white font-mono bg-red-500/10 border border-red-500/20 rounded px-2 py-1">
                      Qd3?? (eval: -2.4)
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 mb-1">Best Move Was</div>
                    <div className="text-sm text-white font-mono bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-1">
                      Qf5! (eval: +0.8)
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  💡 AI Suggestion: "Your queen was exposed on d3. Qf5 maintains pressure on f7 while keeping the queen safe. Always check for opponent's knight forks before moving your queen."
                </p>
              </div>

              {/* Performance chart placeholder */}
              <div className="bg-slate-900/50 rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-3">Performance Over Last 20 Games</div>
                <div className="flex items-end gap-1 h-20">
                  {[40, 55, 45, 60, 70, 65, 80, 75, 85, 70, 90, 85, 88, 92, 87, 90, 85, 92, 88, 95].map((val, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${val}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className={`flex-1 rounded-t ${val > 80 ? "bg-emerald-500" : val > 60 ? "bg-amber-500" : "bg-red-500"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block px-3 py-1 text-xs font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
              AI DASHBOARD
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Learn From
              <br />
              <span className="text-purple-400">Every Mistake</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Our AI analyzes every move your bot makes. Get detailed reports on blunders,
              missed opportunities, and strategic improvements. Turn losses into lessons.
            </p>

            <div className="space-y-4">
              {[
                { icon: BarChart3, title: "Dynamic Match Reports", desc: "Real-time evaluation graphs and move quality analysis" },
                { icon: Target, title: "Blunder Detection", desc: "AI identifies critical mistakes with explanations" },
                { icon: TrendingUp, title: "Personalized Growth", desc: "Track improvement over time with custom metrics" },
                { icon: Crown, title: "Best Move Suggestions", desc: "See what the engine would have played instead" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{item.title}</div>
                    <div className="text-sm text-slate-400">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TournamentSection() {
  const tournaments = [
    {
      name: "Weekly Bot Blitz",
      format: "Swiss System",
      prize: "$500",
      players: 128,
      status: "Registering",
      timeControl: "3+0",
      startsIn: "2d 14h",
    },
    {
      name: "Monthly Grand Prix",
      format: "Round Robin",
      prize: "$2,000",
      players: 64,
      status: "In Progress",
      timeControl: "10+5",
      startsIn: "Live Now",
    },
    {
      name: "Championship Series",
      format: "Knockout",
      prize: "$10,000",
      players: 32,
      status: "Coming Soon",
      timeControl: "15+10",
      startsIn: "14d 6h",
    },
  ];

  return (
    <section id="tournaments" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
            TOURNAMENTS
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Compete at the
            <br />
            <span className="gradient-text">Highest Level</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Automated tournaments with multiple formats. Your bot competes while you watch
            from the sidelines — or study the games in replay.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tournaments.map((tournament, index) => (
            <motion.div
              key={tournament.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-8 h-8 text-amber-400" />
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  tournament.status === "In Progress"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : tournament.status === "Registering"
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-slate-500/10 text-slate-400"
                }`}>
                  {tournament.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{tournament.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{tournament.format} • {tournament.timeControl}</p>

              <div className="flex items-center justify-between py-3 border-t border-slate-800">
                <div>
                  <div className="text-xs text-slate-500">Prize Pool</div>
                  <div className="text-lg font-bold text-amber-400">{tournament.prize}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Players</div>
                  <div className="text-lg font-bold text-white">{tournament.players}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Starts In</div>
                  <div className="text-sm font-medium text-emerald-400">{tournament.startsIn}</div>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-xl text-sm font-medium transition-colors">
                {tournament.status === "In Progress" ? "Watch Live" : "Register Bot"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TwoModesSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
            TWO MODES
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            For Bots <span className="text-emerald-400">&</span> Humans
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            The same powerful platform serves both bot developers and human players.
            Play against bots, other humans, or watch the machines battle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 border-emerald-500/20 hover:border-emerald-500/40 transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <Bot className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Bot Arena Mode</h3>
            <p className="text-slate-400 mb-6">
              Upload your chess engine and let it compete autonomously. Perfect for AI researchers,
              engine developers, and chess enthusiasts who want to see their creation battle.
            </p>
            <ul className="space-y-3">
              {[
                "UCI protocol support",
                "Automated matchmaking",
                "Bot ELO rankings",
                "Engine comparison tools",
                "API for custom integrations",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 border-amber-500/20 hover:border-amber-500/40 transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Human Play Mode</h3>
            <p className="text-slate-400 mb-6">
              Play chess the traditional way — against other humans or against bots at any level.
              Enhanced with AI commentary and analysis tools to improve your game.
            </p>
            <ul className="space-y-3">
              {[
                "Human vs Human online",
                "Human vs Bot (any engine)",
                "AI grandmaster commentary",
                "Post-game analysis",
                "Puzzles & training modes",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "5 bot uploads",
        "10 matches per day",
        "Basic AI analysis",
        "Community tournaments",
        "Live spectator mode",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "For serious bot developers",
      features: [
        "Unlimited bot uploads",
        "Unlimited matches",
        "Advanced AI dashboard",
        "GM commentary access",
        "Priority matchmaking",
        "Tournament creation",
        "API access",
        "Custom analytics",
      ],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For teams & organizations",
      features: [
        "Everything in Pro",
        "Team management",
        "Private tournaments",
        "White-label options",
        "Dedicated support",
        "Custom engine hosting",
        "SLA guarantee",
        "Advanced API",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
            PRICING
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple, Transparent
            <br />
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card rounded-2xl p-6 relative ${
                plan.popular ? "border-emerald-500/40 glow-emerald" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-400">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-slate-400 text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  plan.popular
                    ? "bg-emerald-500 hover:bg-emerald-400 text-white"
                    : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-500/10" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              Ready to Build Your
              <br />
              <span className="gradient-text">Chess Legacy?</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
              Join thousands of bot developers, chess enthusiasts, and AI researchers
              who are pushing the boundaries of chess intelligence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-semibold text-lg transition-all hover:scale-105 glow-emerald flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Get Started Free
              </button>
              <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white border border-slate-700 hover:border-emerald-500/50 rounded-xl font-semibold text-lg transition-all flex items-center gap-2">
                <Play className="w-5 h-5 text-emerald-400" />
                Watch Demo
              </button>
            </div>
            <p className="text-sm text-slate-500 mt-6">
              No credit card required • Free forever plan • Setup in 2 minutes
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Chess<span className="text-emerald-400">Bot</span>
              </span>
            </div>
            <p className="text-sm text-slate-400">
              The world's first AI-powered chess bot arena. Upload, battle, learn.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400">Bot Arena</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400">Tournaments</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400">AI Dashboard</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400">Human Play</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400">Documentation</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400">API Reference</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400">Bot Guide</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400">About</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400">Careers</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400">Contact</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2026 ChessBot Arena. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-500 hover:text-emerald-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="text-slate-500 hover:text-emerald-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="#" className="text-slate-500 hover:text-emerald-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function StatsBar() {
  const stats = [
    { value: "50K+", label: "Bots Uploaded" },
    { value: "2M+", label: "Matches Played" },
    { value: "180+", label: "Countries" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <section className="py-12 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <ArenaSection />
      <DashboardSection />
      <TournamentSection />
      <TwoModesSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
