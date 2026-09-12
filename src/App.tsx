import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LiveMatch from "./pages/LiveMatch";
import HumanPlay from "./pages/HumanPlay";
import Tournaments from "./pages/Tournaments";
import Analysis from "./pages/Analysis";
import BotArena from "./pages/BotArena";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FDF6F0]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live" element={<LiveMatch />} />
          <Route path="/play" element={<HumanPlay />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/arena" element={<BotArena />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
