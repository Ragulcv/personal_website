import { QRCodeSVG } from "qrcode.react";

const VCARD = `BEGIN:VCARD
VERSION:3.0
FN:Ragul Vasudevan
TITLE:Product Lead
EMAIL:cvragul777@gmail.com
NOTE:AI & Blockchain Product Leader. Dubai, UAE.
END:VCARD`;

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-4"
      aria-label="Contact and resume actions"
    >
      <div className="max-w-4xl mx-auto rounded-xl glass border border-white/10 p-6 md:p-8">
        <h2
          className="text-2xl md:text-3xl font-bold uppercase tracking-[1px] text-[#EDEDED] text-center mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          CONTACT
        </h2>
        <p
          className="text-sm text-[#00F0FF] text-center mb-8"
          style={{ fontFamily: "var(--font-data)" }}
        >
          Connect, download resume, or add contact card.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-8">
          <a
            href="/resume.pdf"
            download="resume.pdf"
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

        <p
          className="text-[#888] text-xs mb-3 text-center"
          style={{ fontFamily: "var(--font-data)" }}
        >
          ADD TO CONTACTS
        </p>
        <div className="flex justify-center">
          <div className="inline-block p-3 rounded-lg bg-white">
            <QRCodeSVG value={VCARD} size={120} level="M" />
          </div>
        </div>
      </div>
    </section>
  );
}
