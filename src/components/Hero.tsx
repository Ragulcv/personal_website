import NexusGrid from "./NexusGrid";
import DecryptTitle from "./DecryptTitle";
import BioScanner from "./BioScanner";
import StartMissionCTA from "./StartMissionCTA";

export default function Hero() {
  const scrollToMission = () => {
    document.getElementById("node-yap")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      aria-label="Introduction"
    >
      <NexusGrid />
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <DecryptTitle />
        <p
          className="text-sm md:text-base text-[#888] mb-8 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-data)", letterSpacing: "0.02em" }}
        >
          Product Leader specializing in AI Agents & DeFi. 6+ Years Exp. $15M+ Volume.
        </p>
        <BioScanner />
        <StartMissionCTA onClick={scrollToMission} />
        <p
          className="mt-12 text-[11px] uppercase text-[#888]/80"
          style={{ fontFamily: "var(--font-data)", letterSpacing: "0.2em", wordSpacing: "0.08em" }}
        >
          Scroll to increase clearance level
        </p>
      </div>
    </section>
  );
}
