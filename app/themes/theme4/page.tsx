
"use client"
import Hero from "@/app/components/theme4/Hero";
import Navbar from "@/app/components/theme4/Navbar";
import { useAppContext } from "@/app/contexts/AppContext";
import { useEffect } from "react";
 
import { TreePine, Briefcase, Baby, Car, Plane } from "lucide-react";
import AiSection from "@/app/components/theme4/AiSection";
import Cars from "@/app/components/theme4/Cars";
import Plans from "@/app/components/theme4/Plans";
import Offers from "@/app/components/theme4/Offers";
import Blog from "@/app/components/theme4/Blog";
import Contact from "@/app/components/theme4/Contact";
import Footer from "@/app/components/theme4/Footer";

// ─── COLORS ──────────────────────────────────────────────────────────────────
export const BLUE = "#2563EB";
export const BLUE_D = "#1D4ED8";
export const BLUE_L = "#3B82F6";
export const BLUE_BG = "#EFF6FF";
export const NEUTRAL = "#6B7280";
export const BG = "#FFFFFF";
export const BG2 = "#F9FAFB";
export const BG3 = "#F3F4F6";
export const CARD = "#F5F5F5";
export const TXT = "#111111";
export const TXT2 = "#374151";
export const TXT3 = "#6B7280";
export const BORDER = "#E5E7EB";
export const GREEN = "#10B981";
export const PAD = "50px 130px";

// ─── IMAGES ──────────────────────────────────────────────────────────────────
export const IMG = {
  hero: "https://images.unsplash.com/photo-1583156863527-52c2730ebaef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  city: "https://images.unsplash.com/photo-1715462822892-5b6ba676b235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  family: "https://images.unsplash.com/photo-1758238249716-12f73dcc3944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  booking: "https://images.unsplash.com/photo-1629726248957-001e3e024267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

// ─── FONTS ──────────────────────────────────────────────────────────────────
export function useFonts() {
  const { lang } = useAppContext();
  const isAr = lang === "ar";
  return {
    heading: isAr ? "'Cairo', sans-serif" : "'Inter', sans-serif",
    body: isAr ? "'Cairo', sans-serif" : "'Inter', sans-serif",
    isAr,
  };
}

// ─── AI Trip Categories ──────────────────────────────────────────────────────
export const tripCategories = [
  { id: "nature", icon: <TreePine size={24} />, ar: "رحلة طبيعة", en: "Nature Trip", cats: ["suv"], color: "#059669" },
  { id: "business", icon: <Briefcase size={24} />, ar: "رحلة عمل", en: "Business Trip", cats: ["luxury"], color: "#7C3AED" },
  { id: "family", icon: <Baby size={24} />, ar: "رحلة عائلية", en: "Family Trip", cats: ["suv"], color: "#F59E0B" },
  { id: "weekend", icon: <Car size={24} />, ar: "خروج سريع", en: "Weekend Drive", cats: ["economy", "sports"], color: BLUE },
  { id: "airport", icon: <Plane size={24} />, ar: "استلام من المطار", en: "Airport Pickup", cats: ["economy", "luxury"], color: "#EC4899" },
];


export default function Theme4(){
     const { lang } = useAppContext();
      const { body } = useFonts();
      
   
    return(
          
           <div dir={lang === "ar" ? "rtl" : "ltr"} style={{ fontFamily: body, background: BG }}>
      <Navbar />
      <Hero />
      <AiSection/>
      <Cars/>
      <Plans/>
      <Offers/>
      <Blog/>
      <Contact/>
      <Footer/>
      
    </div>
    )

}
