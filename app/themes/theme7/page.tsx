
"use client"
import { useAppContext } from "@/app/contexts/AppContext";
 
import { CSSProperties } from "react";
import { cars } from "@/app/data/carDate";
import Hero from "@/app/components/Theme7/Hero";
import Navbar from "@/app/components/Theme7/Navbar";
import YourDay from "@/app/components/Theme7/YourDay";
import Cars from "@/app/components/Theme7/Cars";
import Subs from "@/app/components/Theme7/Subs";
import Offers from "@/app/components/Theme7/Offers";
import Articles from "@/app/components/Theme7/Articles";
import Contact from "@/app/components/Theme7/Contact";
import Footer from "@/app/components/Theme7/Footer";

export const P = "#7C3AED";
export const PL = "#A78BFA";
export const PD = "#6D28D9";
export const DK = "#1F2937";
export const DK2 = "#111827";
export const BG = "#F8FAFC";
export const BG2 = "#F1F5F9";
export const W = "#FFFFFF";
export const TX = "#111827";
export const TX2 = "#4B5563";
export const TX3 = "#9CA3AF";
export const BD = "#E5E7EB";
export const PINK = "#EC4899";
export const AMB = "#F59E0B";
export const GRN = "#10B981";
export const BLU = "#3B82F6";
export const PAD = "50px 130px";

export const useFonts = () => {
  const { lang } = useAppContext();
  return {
    h: lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif",
    b: lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif",
  };
};

export const IMG = {
  hero: "https://images.unsplash.com/photo-1759886512932-53724250433f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBjaXR5JTIwbmlnaHQlMjBuZW9uJTIwdXJiYW4lMjBkcml2aW5nfGVufDF8fHx8MTc3MzMyNDQ0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  hero2: "https://images.unsplash.com/photo-1763711637623-eaf2fbe90300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaXR5JTIwYWVyaWFsJTIwdmlldyUyMGJ1aWxkaW5ncyUyMG5pZ2h0JTIwcHVycGxlfGVufDF8fHx8MTc3MzMyNDQ0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  street: "https://images.unsplash.com/photo-1690648959086-f1dd0b537b0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGNpdHklMjBzdHJlZXQlMjBldmVuaW5nJTIwYnVpbGRpbmdzfGVufDF8fHx8MTc3MzMyMjgwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

export const pad: CSSProperties = { maxWidth: 1200, margin: "0 auto", padding: "0 24px" };

export const styleId = "t7-kf";
if (typeof document !== "undefined" && !document.getElementById(styleId)) {
  const s = document.createElement("style");
  s.id = styleId;
  s.textContent = `
    @keyframes t7fi { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
    @keyframes t7su { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:none} }
    @keyframes t7float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes t7glow { 0%,100%{box-shadow:0 0 15px rgba(124,58,237,0.3)} 50%{box-shadow:0 0 30px rgba(124,58,237,0.5)} }
    @keyframes t7marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes t7slideR { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:none} }
    @keyframes t7scaleIn { from{opacity:0;transform:scale(0.85) rotate(-3deg)} to{opacity:1;transform:scale(1) rotate(0)} }
    @keyframes t7pulse2 { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
    .t7-noscroll::-webkit-scrollbar{display:none}
  `;
  document.head.appendChild(s);
}

/* ─── Shared input style ─── */
export const INP = (b: string): CSSProperties => ({
  width: "100%", padding: "12px 14px", borderRadius: 12,
  border: `1.5px solid ${BD}`, fontSize: 14, color: TX,
  background: BG, outline: "none", boxSizing: "border-box", fontFamily: b,
});

// /* ─── Shared Booking Modal (6 steps) ─── */
// function BookingModal({ car, onClose, isRTL, t, h, b, mode = "car", planName }: {
//   car: typeof cars[0] | null; onClose: () => void; isRTL: boolean;
//   t: (ar: string, en: string) => string; h: string; b: string;
//   mode?: "car" | "sub"; planName?: string;
// }) 

 
   
export default function Theme7(){
     const { isRTL } = useAppContext();
     return (
      <div dir={isRTL ? "rtl" : "ltr"} style={{ background: BG, fontFamily: "'Inter', sans-serif", color: TX }}>
      <Navbar />
      <Hero />
      <YourDay />
      <Cars />
      <Subs />
      <Offers />
      <Articles />
      <Contact />
      <Footer />
      <div style={{ height: 80 }} />
    </div>
     );
 }