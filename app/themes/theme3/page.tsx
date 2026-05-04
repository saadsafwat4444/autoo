
"use client"

import Experience from "@/app/components/theme3/Experience";
import Membership from "@/app/components/theme3/Membership";

import Fleet from "@/app/components/theme3/Fleet";
import Hero from "@/app/components/theme3/Hero";
import Navbar from "@/app/components/theme3/Navbar";
import { Trust } from "@/app/components/theme3/Trust";
import { useAppContext } from "@/app/contexts/AppContext";
import Offers from "@/app/components/theme3/Offers";
import Testimonials from "@/app/components/theme3/Testimonials";
import Blog from "@/app/components/theme3/Blog";
import Contact from "@/app/components/theme3/Contact";
import Newsletter from "@/app/components/theme3/Newsletter";
import Footer from "@/app/components/theme3/Footer";

export const RED = "#C62839";
export const RED_D = "#A21F2E";
export const RED_L = "#E04858";
export const GOLD = "#D4A254";
export const GOLD_L = "#E8C07A";
export const CARBON = "#1F2937";
export const CARBON_L = "#2A3544";
export const BG = "#0B0B0B";
export const BG2 = "#111111";
export const BG3 = "#161616";
export const BG4 = "#1A1A1A";
export const TXT = "#F8FAFC";
export const TXT_DIM = "#94A3B8";
export const TXT_MUTED = "#64748B";
export const STRIPE = "#C6283915";
export const PAD = "50px 130px";

// ─── RACING IMAGES ──────────────────────────────────────────────────────────────
export const RACE_IMG = {
  hero: "https://images.unsplash.com/photo-1759493464783-3d2d5f90d3b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  heroAlt: "https://images.unsplash.com/photo-1717415840036-08a13f830214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  trackAerial: "https://images.unsplash.com/photo-1695227667418-e9cada1f9bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  ferrari: "https://images.unsplash.com/photo-1759171136809-cd23951d6494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  lambo: "https://images.unsplash.com/photo-1758873889126-90ee528a2ac2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  mclaren: "https://images.unsplash.com/photo-1690599070141-4e3c5e34156e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  track: "https://images.unsplash.com/photo-1741880730136-a0d9f49f9cfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  cockpit: "https://images.unsplash.com/photo-1629490860326-a041a7b7ea53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  speedo: "https://images.unsplash.com/photo-1610038587158-88b2f292eba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  porscheGT: "https://images.unsplash.com/photo-1767435721658-c4332c7a429e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

// ─── SPORTS CARS DATA ───────────────────────────────────────────────────────────
export const sportsCars = [
  { id: 101, name: { ar: "بورش 911 توربو", en: "Porsche 911 Turbo" }, year: 2024, seats: 2, hp: 572, topSpeed: 330, zero100: "2.7s", engine: { ar: "توربو مزدوج", en: "Twin Turbo" }, price: 4500, image: RACE_IMG.hero, cat: "super" },
  { id: 102, name: { ar: "فيراري F8 تريبوتو", en: "Ferrari F8 Tributo" }, year: 2024, seats: 2, hp: 710, topSpeed: 340, zero100: "2.9s", engine: { ar: "V8 توربو", en: "V8 Turbo" }, price: 8000, image: RACE_IMG.ferrari, cat: "hyper" },
  { id: 103, name: { ar: "لامبورجيني هوراكان", en: "Lamborghini Huracán" }, year: 2024, seats: 2, hp: 631, topSpeed: 325, zero100: "2.9s", engine: { ar: "V10", en: "V10" }, price: 7500, image: RACE_IMG.lambo, cat: "hyper" },
  { id: 104, name: { ar: "ماكلارين 720S", en: "McLaren 720S" }, year: 2024, seats: 2, hp: 710, topSpeed: 341, zero100: "2.8s", engine: { ar: "V8 توربو", en: "V8 Turbo" }, price: 7000, image: RACE_IMG.mclaren, cat: "hyper" },
  { id: 105, name: { ar: "بورش GT3 RS", en: "Porsche GT3 RS" }, year: 2024, seats: 2, hp: 518, topSpeed: 296, zero100: "3.2s", engine: { ar: "Flat-6", en: "Flat-6" }, price: 5500, image: RACE_IMG.porscheGT, cat: "track" },
  { id: 106, name: { ar: "أودي R8 V10", en: "Audi R8 V10" }, year: 2024, seats: 2, hp: 562, topSpeed: 330, zero100: "3.1s", engine: { ar: "V10", en: "V10" }, price: 5000, image: RACE_IMG.cockpit, cat: "super" },
];

// ─── FONTS HELPER ───────────────────────────────────────────────────────────────
export function useFonts() {
  const { lang } = useAppContext();
  const isAr = lang === "ar";
  return {
    heading: isAr ? "'Cairo', sans-serif" : "'Orbitron', sans-serif",
    body: isAr ? "'Cairo', sans-serif" : "'Inter', sans-serif",
    isAr,
  };
}

export function SectionBadge({ children }: { children: React.ReactNode }) {
  const { heading } = useFonts();
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${RED}18`, borderRadius: 4, padding: "6px 16px", marginBottom: 16, borderLeft: `3px solid ${RED}` }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: heading }}>{children}</span>
    </div>
  );
}


export function SpeedLines({ side = "left" }: { side?: "left" | "right" }) {
  return (
    <div style={{ position: "absolute", top: 0, [side]: 0, width: 120, height: "100%", opacity: 0.04, pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", top: `${i * 13}%`, [side]: -20, width: 200, height: 2, background: RED, transform: "rotate(-15deg)" }} />
      ))}
    </div>
  );
}


export default function Theme3() {
 const { lang } = useAppContext();
  const { body } = useFonts();

    return (
           <div dir={lang === "ar" ? "rtl" : "ltr"} style={{ fontFamily: body, background: BG }}>

             <Navbar />
             <Hero />
             <Trust/>
             <Fleet/>
             <Experience/>
             <Membership/>
             <Offers/>
             <Testimonials/>
             <Blog/>
             <Contact/>
             <Newsletter/>
             <Footer/>
        </div>
    );
}