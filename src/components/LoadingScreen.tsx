import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "> INITIALIZING RAGUL_OS v3.0...",
  "> LOADING MODULE: BLOCKCHAIN_ARCHITECT... [OK]",
  "> LOADING MODULE: AI_AGENTS... [OK]",
  "> FETCHING HACKATHON_DATA ($59K PRIZE POOL)... [OK]",
  "> ACCESS GRANTED.",
];

const CHAR_DELAY_MS = 50;

type Props = {
  onComplete: () => void;
};

export default function LoadingScreen({ onComplete }: Props) {
  const [visibleChars, setVisibleChars] = useState<number[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [splitReveal, setSplitReveal] = useState(false);

  useEffect(() => {
    if (currentLine >= LINES.length) {
      setShowCursor(false);
      const t = setTimeout(() => {
        setSplitReveal(true);
      }, 400);
      const t2 = setTimeout(onComplete, 400 + 800);
      return () => {
        clearTimeout(t);
        clearTimeout(t2);
      };
    }

    const line = LINES[currentLine];
    const totalChars = line.length;
    let charIndex = 0;

    const id = setInterval(() => {
      charIndex++;
      setVisibleChars((prev) => [...prev, 1]);
      if (charIndex >= totalChars) {
        clearInterval(id);
        setTimeout(() => {
          setCurrentLine((l) => l + 1);
          setVisibleChars([]);
        }, 200);
      }
    }, CHAR_DELAY_MS);

    return () => clearInterval(id);
  }, [currentLine, onComplete]);

  if (splitReveal) {
    return (
      <motion.div
        className="fixed inset-0 z-[100] flex"
        initial={false}
        animate={{ opacity: 0, transition: { duration: 0.3, delay: 0.5 } }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/2 bg-[#030304]"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#030304]"
          initial={{ y: 0 }}
          animate={{ y: "100%" }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        />
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030304]"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="font-[family-name:var(--font-data)] text-sm md:text-base text-[#00F0FF] tracking-tight"
          style={{ fontFamily: "var(--font-data)" }}
        >
          {LINES.slice(0, currentLine).map((line, i) => (
            <div key={i}>{line}</div>
          ))}
          {currentLine < LINES.length && (
            <div className="flex items-center gap-0.5">
              <span>
                {LINES[currentLine].slice(0, visibleChars.length)}
              </span>
              {showCursor && (
                <motion.span
                  className="inline-block w-2 h-4 bg-[#00F0FF]"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  _
                </motion.span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
