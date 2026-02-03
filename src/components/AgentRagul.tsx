import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROMPTS = [
  {
    id: "hackathon",
    label: "EXECUTE: Tell_Hackathon_Story",
    response:
      "At the AI Agents Hackathon 2024, our team built an agentic workflow that won the $25K prize. We combined LangGraph with on-chain verification to create a trustless influencer classification system. The judges valued the real-world DeFi use case and clean architecture. It was a 72-hour sprint—vibe coding with Cursor and Lovable got us from idea to demo fast.",
  },
  {
    id: "vibe",
    label: "EXECUTE: Explain_Vibe_Coding",
    response:
      "Vibe coding is rapid prototyping using AI-augmented tools. I use Cursor and Lovable to ship MVPs in days instead of weeks. The loop: define the product spec, prompt the AI for components, iterate on UX, then wire to APIs. It's how we validated Yap Market's influencer engine and BQ Labs' risk dashboards without blocking on engineering. Perfect for product leads who need to own the demo.",
  },
  {
    id: "projects",
    label: "EXECUTE: View_Projects",
    response:
      "Notable projects: Tamadoge—$15M presale, play-to-earn tokenomics and NFT integration. At Yap Market we scaled to 15K+ users and $400K+ in rewards via the LangGraph classification pipeline. At BQ Labs we won Bitcoin Olympics ($34K), secured $200K in grants, and shipped a real-time risk engine. At CBA Tech we drove 300% engagement growth with GPT analytics and scaled $12M TVL in 5 months.",
  },
];

export default function AgentRagul() {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);

  const runPrompt = (res: string) => {
    setResponse(null);
    setTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      index += 2;
      setResponse(res.slice(0, index));
      if (index >= res.length) {
        clearInterval(interval);
        setTyping(false);
      }
    }, 20);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full glass border border-white/10 flex items-center justify-center text-[#00F0FF] hover:border-[#00F0FF]/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
        aria-label={open ? "Close Agent Ragul" : "Open Agent Ragul chatbot"}
        aria-expanded={open}
        title="Ask me about my $25K Hackathon win"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-7 h-7"
          aria-hidden
        >
          <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
          <path d="M12 6v6l4 2" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-[340px] max-w-[calc(100vw-3rem)] rounded-xl glass border border-white/10 overflow-hidden shadow-2xl"
            style={{ fontFamily: "var(--font-data)" }}
          >
            <div className="p-3 border-b border-white/10 bg-black/20">
              <span className="text-[#00F0FF] text-sm">&gt; AGENT_RAGUL ONLINE.</span>
            </div>
            <div className="p-4 max-h-[320px] overflow-y-auto">
              <p className="text-[#888] text-xs mb-3">Click a prompt to run:</p>
              <div className="space-y-2 mb-4">
                {PROMPTS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => runPrompt(p.response)}
                    className="block w-full text-left px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#EDEDED] text-xs hover:border-[#00F0FF]/50 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                  >
                    [{p.label}]
                  </button>
                ))}
              </div>
              {response !== null && (
                <div className="rounded-lg bg-black/40 p-3 text-xs text-[#EDEDED] whitespace-pre-wrap">
                  {response}
                  {typing && (
                    <span className="inline-block w-2 h-4 ml-0.5 bg-[#00F0FF] animate-pulse" />
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
