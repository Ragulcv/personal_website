import { motion } from "framer-motion";

type Props = {
  onClick: () => void;
};

export default function StartMissionCTA({ onClick }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="mt-8 px-8 py-4 rounded-lg border-2 border-[#B6FF00]/60 bg-[#B6FF00]/10 text-[#B6FF00] font-semibold uppercase text-sm hover:bg-[#B6FF00]/20 hover:border-[#B6FF00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B6FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030304] transition-colors"
      style={{ fontFamily: "var(--font-data)", letterSpacing: "0.15em", wordSpacing: "0.12em" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      ▶ START MISSION
    </motion.button>
  );
}
