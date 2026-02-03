import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import HUD from "./components/HUD";
import Hero from "./components/Hero";
import ExperienceNodes from "./components/ExperienceNodes";
import TechArsenal from "./components/TechArsenal";
import AgentRagul from "./components/AgentRagul";
import UnlockOverlay from "./components/UnlockOverlay";
import { useTrustLevel } from "./hooks/useTrustLevel";

function App() {
  const [loadingDone, setLoadingDone] = useState(false);
  const { trustPercent, unlocked, addFromClick } = useTrustLevel();
  const [showUnlock, setShowUnlock] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setLoadingDone(true);
  }, []);

  useEffect(() => {
    if (unlocked) setShowUnlock(true);
  }, [unlocked]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      {!loadingDone && <LoadingScreen onComplete={handleLoadingComplete} />}

      {loadingDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={addFromClick}
        >
          <HUD trustPercent={trustPercent} onMenuClick={() => setMenuOpen((m) => !m)} />

          {menuOpen && (
            <nav
              className="fixed top-[72px] right-0 z-40 p-4 glass border-l border-b border-white/10 rounded-bl-xl"
              aria-label="Quick navigation"
            >
              <ul className="space-y-2">
                <li><a href="#hero" className="text-sm text-[#EDEDED] hover:text-[#00F0FF]" style={{ fontFamily: "var(--font-data)" }}>HERO</a></li>
                <li><a href="#node-yap" className="text-sm text-[#EDEDED] hover:text-[#00F0FF]" style={{ fontFamily: "var(--font-data)" }}>YAP MARKET</a></li>
                <li><a href="#node-bq" className="text-sm text-[#EDEDED] hover:text-[#00F0FF]" style={{ fontFamily: "var(--font-data)" }}>BQ LABS</a></li>
                <li><a href="#node-cba" className="text-sm text-[#EDEDED] hover:text-[#00F0FF]" style={{ fontFamily: "var(--font-data)" }}>CBA TECH</a></li>
                <li><a href="#tech" className="text-sm text-[#EDEDED] hover:text-[#00F0FF]" style={{ fontFamily: "var(--font-data)" }}>TECH ARSENAL</a></li>
              </ul>
            </nav>
          )}

          <main id="main">
            <Hero />
            <ExperienceNodes />
            <TechArsenal />
          </main>

          <AgentRagul />

          {showUnlock && (
            <UnlockOverlay onClose={() => setShowUnlock(false)} />
          )}
        </motion.div>
      )}
    </>
  );
}

export default App;
