import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  trustPercent: number;
  onMenuClick: () => void;
};

export default function HUD({ trustPercent, onMenuClick }: Props) {
  const [menuHover, setMenuHover] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 h-[72px] z-50 flex items-center justify-between px-4 md:px-8 border-b border-[#333] bg-[#030304]/80 backdrop-blur-xl"
      role="banner"
    >
      {/* Left: Brand */}
      <div className="flex flex-col">
        <span
          className="text-base font-bold uppercase tracking-[1px] text-[#EDEDED]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          RAGUL VASUDEVAN
        </span>
        <span
          className="text-[10px] text-[#00F0FF]"
          style={{ fontFamily: "var(--font-data)" }}
        >
          PRODUCT LEAD // DUBAI
        </span>
      </div>

      {/* Center: Trust Level Bar */}
      <div className="hidden sm:flex flex-col items-center gap-1" role="status" aria-live="polite" aria-label={`Trust level sync: ${trustPercent} percent`}>
        <span
          className="text-[10px] text-[#888] uppercase tracking-wider"
          style={{ fontFamily: "var(--font-data)" }}
        >
          SYNC: {trustPercent}%
        </span>
        <div className="w-[300px] h-2 rounded-full bg-[#222] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #00F0FF, #B6FF00)",
              width: `${trustPercent}%`,
            }}
            initial={{ width: "10%" }}
            animate={{ width: `${trustPercent}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </div>
      </div>

      {/* Right: Status + Menu */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span
            className="relative flex h-2 w-2"
            aria-hidden
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B6FF00] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B6FF00]" />
          </span>
          <span
            className="text-xs text-[#888]"
            style={{ fontFamily: "var(--font-data)" }}
          >
            STATUS: ONLINE
          </span>
        </div>
        <button
          type="button"
          onClick={onMenuClick}
          onMouseEnter={() => setMenuHover(true)}
          onMouseLeave={() => setMenuHover(false)}
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#EDEDED] hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030304]"
          style={{ fontFamily: "var(--font-data)" }}
          aria-label="Toggle menu"
        >
          <span className={menuHover ? "inline-block animate-pulse" : ""}>
            MENU
          </span>
          <span className="w-4 h-3 flex flex-col justify-between" aria-hidden>
            <span className="block h-0.5 w-full bg-current rounded" />
            <span className="block h-0.5 w-full bg-current rounded" />
            <span className="block h-0.5 w-full bg-current rounded" />
          </span>
        </button>
      </div>
    </header>
  );
}
