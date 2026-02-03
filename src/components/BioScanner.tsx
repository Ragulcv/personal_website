import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function useClickOutside(ref: React.RefObject<HTMLElement | null>, onClickOutside: () => void, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClickOutside();
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [ref, onClickOutside, enabled]);
}

const BIO_ITEMS = [
  { label: "Role", value: "Product Lead" },
  { label: "Focus", value: "AI Agents, LLM Productization, DeFi" },
  { label: "Location", value: "Dubai, UAE" },
  { label: "Wins", value: "Winner, AI Agents Hackathon '24" },
];

const SCAN_DURATION_MS = 1800;

export default function BioScanner() {
  const [phase, setPhase] = useState<"idle" | "scanning" | "granted" | "reveal">("idle");
  const [scanProgress, setScanProgress] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (phase !== "scanning") return;
    const animate = (now: number) => {
      if (startTime.current === null) startTime.current = now;
      const elapsed = now - startTime.current;
      const progress = Math.min(elapsed / SCAN_DURATION_MS, 1);
      setScanProgress(progress);
      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        setPhase("granted");
        setTimeout(() => setPhase("reveal"), 600);
      }
    };
    startTime.current = null;
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [phase]);

  const startScan = () => {
    if (phase === "idle") {
      setPhase("scanning");
      setScanProgress(0);
    }
  };

  const reset = () => {
    if (phase === "scanning") setPhase("idle");
  };

  const showCard = phase === "reveal";
  const cardRef = useRef<HTMLDivElement>(null);

  const closeCard = () => {
    if (phase === "reveal") setPhase("idle");
  };

  useClickOutside(cardRef, closeCard, showCard);

  return (
    <div className="relative flex flex-col items-center">
      <p
        className="text-[11px] uppercase tracking-[0.15em] text-[#888] mb-3 leading-relaxed max-w-[260px] text-center"
        style={{ fontFamily: "var(--font-data)", wordSpacing: "0.12em" }}
      >
        {phase === "idle" && "▼ Verify identity to unlock dossier"}
        {phase === "scanning" && "▼ Scanning..."}
        {phase === "granted" && "▼ ACCESS GRANTED"}
        {phase === "reveal" && "▼ Dossier unlocked"}
      </p>

      <button
        type="button"
        onMouseEnter={startScan}
        onFocus={startScan}
        onMouseLeave={reset}
        onBlur={() => {}}
        className="relative flex items-center justify-center w-20 h-20 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030304]"
        aria-label="Verify identity – fingerprint scan"
        aria-expanded={showCard}
      >
        {/* Outer ring – scan progress */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="2"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#00F0FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 46}`}
            strokeDashoffset={2 * Math.PI * 46 * (1 - scanProgress)}
            initial={false}
            transition={{ duration: 0.1 }}
          />
        </svg>
        {/* Fingerprint icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke={phase === "scanning" || phase === "granted" ? "#00F0FF" : "currentColor"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-10 h-10 text-[#00F0FF] relative z-10"
          aria-hidden
        >
          <path d="M12 11c0 1.5-.5 3-1.5 4.5L9 19c-.5.5-1.5.5-2 0l-2.5-2.5c-.5-.5-.5-1.5 0-2l3.5-3.5C9 10.5 10.5 10 12 10z" />
          <path d="M12 13c0-1.5.5-3 1.5-4.5L15 5c.5-.5 1.5-.5 2 0l2.5 2.5c.5.5.5 1.5 0 2l-3.5 3.5C15 13.5 13.5 14 12 14z" />
        </svg>
      </button>

      <AnimatePresence>
        {phase === "granted" && (
          <motion.p
            key="granted"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-6 text-xs text-[#B6FF00] font-semibold"
            style={{ fontFamily: "var(--font-data)" }}
          >
            ✓ IDENTITY CONFIRMED
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCard && (
          <motion.div
            key="card"
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[320px] p-5 rounded-xl glass border border-[#00F0FF]/30 shadow-2xl z-20"
            style={{
              boxShadow: "0 0 50px rgba(0, 240, 255, 0.2)",
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-[#B6FF00] text-lg">✓</span>
                <span className="text-xs text-[#00F0FF] uppercase tracking-wider" style={{ fontFamily: "var(--font-data)" }}>
                  Dossier
                </span>
              </div>
              <button
                type="button"
                onClick={closeCard}
                className="p-1.5 rounded-md text-[#888] hover:text-[#EDEDED] hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] transition-colors"
                aria-label="Close dossier"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              {BIO_ITEMS.map((item) => (
                <div key={item.label} className="flex justify-between gap-4 items-start">
                  <span className="text-[#888] text-xs uppercase tracking-wider shrink-0" style={{ fontFamily: "var(--font-data)" }}>
                    {item.label}:
                  </span>
                  <span className="text-[#EDEDED] text-sm text-right leading-relaxed">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
