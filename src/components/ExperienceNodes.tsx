import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "./CountUp";

gsap.registerPlugin(ScrollTrigger);

const LANGGRAPH_SNIPPET = `// LangGraph Influencer Classification
async function classifyInfluencer(profile) {
  const graph = new StateGraph({ channels: ["tier"] });
  graph.addNode("analyze", async (state) => {
    const engagement = await getEngagement(state.profile);
    const tier = engagement > 0.05 ? "alpha" : "beta";
    return { ...state, tier };
  });
  graph.addEdge("analyze", END);
  return graph.compile().invoke({ profile });
}`;

export default function ExperienceNodes() {
  const [expandedCode, setExpandedCode] = useState(false);
  const [trophyHover, setTrophyHover] = useState(false);
  const node1 = useRef<HTMLElement>(null);
  const node2 = useRef<HTMLElement>(null);
  const node3 = useRef<HTMLElement>(null);

  useEffect(() => {
    const nodes = [node1.current, node2.current, node3.current].filter(Boolean);
    nodes.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      className="py-24 md:py-32 px-4"
      aria-label="Experience and mission logs"
    >
      <div className="max-w-4xl mx-auto space-y-[120px]">
        {/* Node 1: Yap Market */}
        <article
          ref={node1}
          className="scroll-mt-24 rounded-xl glass border border-white/10 p-6 md:p-8 hover:border-[#00F0FF] transition-colors duration-300 focus-within:ring-2 focus-within:ring-[#00F0FF] focus-within:ring-offset-2 focus-within:ring-offset-[#030304]"
          tabIndex={0}
          id="node-yap"
        >
          <header className="mb-6">
            <span
              className="text-[#00F0FF] text-xs uppercase tracking-wider block mb-1"
              style={{ fontFamily: "var(--font-data)" }}
            >
              YAP MARKET // PRODUCT LEAD
            </span>
            <span className="text-[#888] text-sm">Feb 2025 – Present</span>
          </header>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg bg-white/5 border border-white/10 p-4">
              <span className="text-[#888] text-xs uppercase block mb-1" style={{ fontFamily: "var(--font-data)" }}>USERS</span>
              <CountUp end={15000} duration={2} suffix="+" className="text-xl md:text-2xl font-semibold text-[#00F0FF]" />
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-4">
              <span className="text-[#888] text-xs uppercase block mb-1" style={{ fontFamily: "var(--font-data)" }}>REWARDS</span>
              <CountUp end={400000} duration={2} prefix="$" suffix="+" className="text-xl md:text-2xl font-semibold text-[#B6FF00]" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setExpandedCode(!expandedCode)}
            className="text-sm text-[#00F0FF] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] rounded px-2 py-1"
            style={{ fontFamily: "var(--font-data)" }}
          >
            {expandedCode ? "Hide" : "View"} Algorithm
          </button>
          {expandedCode && (
            <motion.pre
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 rounded-lg bg-[#0a0a0b] border border-[#00F0FF]/30 overflow-x-auto text-xs text-[#00F0FF]"
              style={{ fontFamily: "var(--font-data)" }}
            >
              {LANGGRAPH_SNIPPET}
            </motion.pre>
          )}
        </article>

        {/* Node 2: BQ Labs */}
        <article
          ref={node2}
          className="scroll-mt-24 rounded-xl glass border border-white/10 p-6 md:p-8 hover:border-[#FF2A2A] transition-colors duration-300 focus-within:ring-2 focus-within:ring-[#FF2A2A] focus-within:ring-offset-2 focus-within:ring-offset-[#030304]"
          tabIndex={0}
          id="node-bq"
        >
          <header className="mb-6">
            <span
              className="text-[#FF2A2A] text-xs uppercase tracking-wider block mb-1"
              style={{ fontFamily: "var(--font-data)" }}
            >
              BQ LABS // SENIOR PM
            </span>
            <span className="text-[#888] text-sm">Mar 2024 – Jan 2025</span>
          </header>
          <div
            className="inline-flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 px-4 py-3 mb-6 cursor-default"
            onMouseEnter={() => setTrophyHover(true)}
            onMouseLeave={() => setTrophyHover(false)}
          >
            <span className="text-2xl" aria-hidden>🏆</span>
            <span className="text-[#B6FF00] font-semibold" style={{ fontFamily: "var(--font-data)" }}>
              BITCOIN OLYMPICS WINNER ($34K PRIZE)
            </span>
            {trophyHover && (
              <motion.span
                className="absolute w-2 h-2 rounded-full bg-[#B6FF00]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{ pointerEvents: "none" }}
              />
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-lg bg-white/5 border border-white/10 p-4">
              <span className="text-[#888] text-xs uppercase block mb-1" style={{ fontFamily: "var(--font-data)" }}>Engagement Lift</span>
              <span className="text-[#B6FF00] font-semibold">+40%</span>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-4">
              <span className="text-[#888] text-xs uppercase block mb-1" style={{ fontFamily: "var(--font-data)" }}>Grants Secured</span>
              <span className="text-[#B6FF00] font-semibold">$200K</span>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-4">
              <span className="text-[#888] text-xs uppercase block mb-1" style={{ fontFamily: "var(--font-data)" }}>Risk Engine</span>
              <span className="text-[#EDEDED] text-sm">Real-time Pattern Recognition</span>
            </div>
          </div>
        </article>

        {/* Node 3: CBA Technology */}
        <article
          ref={node3}
          className="scroll-mt-24 rounded-xl glass border border-white/10 p-6 md:p-8 hover:border-[#B6FF00] transition-colors duration-300 focus-within:ring-2 focus-within:ring-[#B6FF00] focus-within:ring-offset-2 focus-within:ring-offset-[#030304]"
          tabIndex={0}
          id="node-cba"
        >
          <header className="mb-6">
            <span
              className="text-[#B6FF00] text-xs uppercase tracking-wider block mb-1"
              style={{ fontFamily: "var(--font-data)" }}
            >
              CBA TECH // PRODUCT MANAGER
            </span>
          </header>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-1 rounded-lg bg-white/5 border border-white/10 p-4 flex items-center gap-4">
              <svg viewBox="0 0 100 40" className="w-24 h-10 flex-shrink-0" aria-hidden>
                <polyline
                  fill="none"
                  stroke="#B6FF00"
                  strokeWidth="2"
                  points="0,35 20,30 40,25 60,15 80,8 100,5"
                />
              </svg>
              <div>
                <span className="text-[#B6FF00] font-semibold block">300%</span>
                <span className="text-[#888] text-xs">Engagement Growth via GPT Analytics</span>
              </div>
            </div>
            <div className="flex-1 rounded-lg bg-white/5 border border-white/10 p-4 flex items-center gap-4">
              <span className="text-[#B6FF00] font-semibold text-2xl">$12M</span>
              <span className="text-[#888] text-sm">TVL Scaled in 5 Months</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
