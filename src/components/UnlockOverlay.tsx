import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

const VCARD = `BEGIN:VCARD
VERSION:3.0
FN:Ragul Vasudevan
TITLE:Product Lead
EMAIL:cvragul777@gmail.com
NOTE:AI & Blockchain Product Leader. Dubai, UAE.
END:VCARD`;

type Props = {
  onClose?: () => void;
};

export default function UnlockOverlay({ onClose }: Props) {
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setFlash(false), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {flash && (
        <motion.div
          className="fixed inset-0 z-[90] bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          aria-hidden
        />
      )}
      <motion.div
        className="fixed inset-0 z-[91] flex items-center justify-center p-4 bg-[#030304]/95 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="text-center max-w-md">
          <h2
            className="text-xl md:text-2xl font-bold uppercase tracking-[1px] text-[#EDEDED] mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            AUTHORIZATION COMPLETE.
          </h2>
          <p
            className="text-sm text-[#00F0FF] mb-8"
            style={{ fontFamily: "var(--font-data)" }}
          >
            DOSSIER UNLOCKED.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-8">
            <a
              href="/Ragul_Product_Resume.pdf"
              download="Ragul_Product_Resume.pdf"
              className="inline-flex items-center justify-center px-6 py-4 rounded-lg font-semibold text-[#030304] bg-[#B6FF00] hover:bg-[#c8ff33] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B6FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030304]"
              style={{ fontFamily: "var(--font-data)" }}
            >
              DOWNLOAD_RESUME.PDF
            </a>
            <a
              href="https://www.instagram.com/ragulvasudevan_?igsh=MXV3bHc5bnlnZmI1Nw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-6 py-4 rounded-lg font-semibold text-[#030304] bg-[#00F0FF] hover:bg-[#33f3ff] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030304]"
              style={{ fontFamily: "var(--font-data)" }}
            >
              OPEN_SIGNAL_FEED (IG)
            </a>
            <a
              href="https://t.me/ragulcv"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-6 py-4 rounded-lg font-semibold text-[#EDEDED] bg-white/5 border border-white/10 hover:border-[#B6FF00]/60 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B6FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030304]"
              style={{ fontFamily: "var(--font-data)" }}
            >
              DM_ON_TELEGRAM (@ragulcv)
            </a>
          </div>
          <p className="text-[#888] text-xs mb-3" style={{ fontFamily: "var(--font-data)" }}>
            SECRET UNLOCK: Add to contacts
          </p>
          <div className="inline-block p-3 rounded-lg bg-white">
            <QRCodeSVG value={VCARD} size={120} level="M" />
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="mt-6 text-sm text-[#888] hover:text-[#EDEDED] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] rounded px-2 py-1"
            >
              Close
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
}
