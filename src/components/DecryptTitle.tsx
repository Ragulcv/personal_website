import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TITLE = "BUILDING THE INTELLIGENT ONCHAIN FUTURE.";
const CHARS = "!@#$%&*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>?/";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

type Token =
  | { kind: "space"; value: " " }
  | { kind: "word"; value: string };

function tokenizeTitle(input: string): Token[] {
  // Split into words and single spaces (we intentionally normalize to single spaces).
  return input
    .trim()
    .split(/\s+/)
    .flatMap((word, idx, arr) => {
      const tokens: Token[] = [{ kind: "word", value: word }];
      if (idx !== arr.length - 1) tokens.push({ kind: "space", value: " " });
      return tokens;
    });
}

export default function DecryptTitle() {
  const [decrypted, setDecrypted] = useState(false);
  const [display, setDisplay] = useState(() =>
    TITLE.split("").map((c) => (c === " " ? " " : randomChar())).join("")
  );
  const [startDecrypt, setStartDecrypt] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStartDecrypt(true), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!startDecrypt || decrypted) return;
    const target = TITLE;
    let frame = 0;
    const interval = setInterval(() => {
      setDisplay(
        target
          .split("")
          .map((letter, i) => {
            if (letter === " ") return " ";
            const progress = (frame - i * 2) / 12;
            if (progress >= 1) return target[i];
            return randomChar();
          })
          .join("")
      );
      frame++;
      if (frame > target.length + 15) {
        setDecrypted(true);
        setDisplay(TITLE);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [startDecrypt, decrypted]);

  const triggerDecrypt = () => {
    if (!decrypted) setStartDecrypt(true);
  };

  return (
    <motion.div
      onMouseEnter={triggerDecrypt}
      onFocus={triggerDecrypt}
      className="relative inline-block"
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
    >
      <span
        className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] uppercase text-[#00F0FF]/70"
        style={{ fontFamily: "var(--font-data)", letterSpacing: "0.2em", wordSpacing: "0.1em" }}
      >
        {decrypted ? "▼ DECRYPTED" : "▼ CLASSIFIED"}
      </span>
      <h1
        className="font-bold uppercase text-[#EDEDED] mb-4 select-none leading-tight"
        style={{
          fontFamily: "var(--font-heading)",
          // Responsive sizing so long words never get cut on mobile.
          fontSize: "clamp(30px, 7.2vw, 56px)",
          // Reduce tracking on smaller screens so words don't wrap awkwardly.
          letterSpacing: "0.02em",
          wordSpacing: "0.18em",
          // Never split inside words; only wrap at spaces.
          wordBreak: "keep-all",
          overflowWrap: "normal",
          hyphens: "none",
          textWrap: "balance" as any,
          textShadow: decrypted ? "0 0 30px rgba(0, 240, 255, 0.2)" : "0 0 20px rgba(0, 240, 255, 0.3)",
        }}
      >
        {/* Render by WORD so no word is ever split across lines. */}
        {tokenizeTitle(display).map((token, tIdx) => {
          if (token.kind === "space") {
            return (
              <span
                key={`s-${tIdx}`}
                className="inline-block min-w-[0.35em] md:min-w-[0.5em]"
                aria-hidden
              >
                {"\u00A0"}
              </span>
            );
          }

          return (
            <span
              key={`w-${tIdx}`}
              className="inline-block whitespace-nowrap"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {token.value.split("").map((char, cIdx) => (
                <motion.span
                  key={`c-${tIdx}-${cIdx}`}
                  initial={decrypted ? false : { opacity: 0.85 }}
                  animate={{
                    opacity: 1,
                    textShadow: decrypted
                      ? "0 0 30px rgba(0, 240, 255, 0.15)"
                      : "0 0 8px rgba(0, 240, 255, 0.5)",
                  }}
                  transition={{ duration: 0.05 }}
                  className="inline-block"
                  style={{
                    fontFamily: !decrypted ? "var(--font-data)" : "var(--font-heading)",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          );
        })}
      </h1>
      {!decrypted && !startDecrypt && (
        <p
          className="text-xs text-[#888] mb-2 animate-pulse"
          style={{ fontFamily: "var(--font-data)", letterSpacing: "0.1em" }}
        >
          [ Hover to decrypt ]
        </p>
      )}
    </motion.div>
  );
}
