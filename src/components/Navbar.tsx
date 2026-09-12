import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ChessPieces } from "../ChessPieces";

const Icon = ({ path, size = 20, className = "" }: { path: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
);

const iconPaths = {
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  play: "M5 3l14 9-14 9V3z",
  trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M18 2H6v7a6 6 0 0 0 12 0V2Z",
  brain: "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  bot: "M12 2a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3V4a2 2 0 0 1 2-2zM9 12h.01M15 12h.01M10 16h4",
  menu: "M3 12h18M3 6h18M3 18h18",
  x: "M18 6L6 18M6 6l12 12",
};

const navLinks = [
  { label: "Home", path: "/", icon: iconPaths.home },
  { label: "Live Match", path: "/live", icon: iconPaths.play },
  { label: "Human Play", path: "/play", icon: iconPaths.users },
  { label: "Tournaments", path: "/tournaments", icon: iconPaths.trophy },
  { label: "Analysis", path: "/analysis", icon: iconPaths.brain },
  { label: "Bot Arena", path: "/arena", icon: iconPaths.bot },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#F5EBE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => navigate("/")} className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C4785C] to-[#D4956F] flex items-center justify-center">
                <ChessPieces.Knight color="light" size={20} />
              </div>
              <span className="text-xl font-bold text-[#2D1F14] hidden sm:inline">
                Chess<span className="text-[#C4785C]">Bot</span>
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                    location.pathname === link.path
                      ? "bg-[#C4785C]/10 text-[#C4785C]"
                      : "text-[#6B5B4F] hover:bg-[#F5EBE0] hover:text-[#2D1F14]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <button className="text-sm font-medium text-[#6B5B4F] hover:text-[#C4785C] transition-colors">Sign in</button>
              <button className="px-5 py-2.5 bg-[#C4785C] text-white text-sm font-semibold rounded-xl hover:bg-[#B3685C] transition-colors shadow-md">
                Get Started
              </button>
            </div>

            <button className="lg:hidden text-[#2D1F14]" onClick={() => setMobileOpen(true)}>
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
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-[#FDF6F0] z-50 lg:hidden shadow-2xl"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-bold text-[#2D1F14]">Menu</span>
                  <button onClick={() => setMobileOpen(false)} className="text-[#2D1F14]">
                    <Icon path={iconPaths.x} size={24} />
                  </button>
                </div>
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.path}
                      onClick={() => { navigate(link.path); setMobileOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                        location.pathname === link.path
                          ? "bg-[#C4785C]/10 text-[#C4785C]"
                          : "text-[#6B5B4F] hover:bg-[#F5EBE0]"
                      }`}
                    >
                      <Icon path={link.icon} size={18} />
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom mobile nav */}
      <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/90 backdrop-blur-xl border-t border-[#F5EBE0]">
        <div className="flex items-center justify-around py-2">
          {navLinks.slice(0, 5).map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all ${
                location.pathname === link.path ? "text-[#C4785C]" : "text-[#9E8E82]"
              }`}
            >
              <Icon path={link.icon} size={18} />
              <span className="text-[10px] font-medium">{link.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
