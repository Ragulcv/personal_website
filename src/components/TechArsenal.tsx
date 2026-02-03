import { motion } from "framer-motion";

const CATEGORIES = [
  {
    name: "AI Core",
    color: "#00F0FF",
    items: ["LangGraph", "OpenAI API", "N8N", "Prompt Engineering"],
  },
  {
    name: "Vibe Coding",
    color: "#B6FF00",
    items: ["Cursor", "Lovable", "Replit", "Bolt"],
  },
  {
    name: "Blockchain",
    color: "#00F0FF",
    items: ["DeFi / AMMs", "Smart Wallets", "Tokenomics", "On-Chain Data"],
  },
];

export default function TechArsenal() {
  return (
    <section
      id="tech"
      className="py-24 md:py-32 px-4 overflow-hidden"
      aria-label="Tech arsenal and skills"
    >
      <h2
        className="text-2xl md:text-3xl font-bold uppercase tracking-[1px] text-[#EDEDED] text-center mb-16"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        TECH ARSENAL
      </h2>
      <div className="max-w-4xl mx-auto">
        {CATEGORIES.map((cat) => (
          <div key={cat.name} className="mb-12 last:mb-0">
            <h3
              className="text-sm text-[#888] uppercase tracking-wider mb-6"
              style={{ fontFamily: "var(--font-data)" }}
            >
              {cat.name}
            </h3>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {cat.items.map((item) => (
                <motion.div
                  key={item}
                  className="relative flex items-center justify-center px-5 py-3 rounded-lg glass cursor-default"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  whileHover={{
                    scale: 1.1,
                    borderColor: cat.color,
                    boxShadow: `0 0 20px ${cat.color}33`,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <span
                    className="text-sm font-medium text-[#EDEDED]"
                    style={{ fontFamily: "var(--font-data)" }}
                  >
                    [{item}]
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Mobile: horizontal scroll snap fallback is handled by flex-wrap above; optional snap could be added */}
    </section>
  );
}
