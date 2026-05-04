"use client";

import Hero from "@/app/components/theme2/Hero";
import Navbar from "@/app/components/theme2/Navbar";
import Experience from "@/app/components/theme2/Experience";
import { useAppContext } from "@/app/contexts/AppContext";
import Fleet from "@/app/components/theme2/Fleet";
import Services from "@/app/components/theme2/Services";
import MembershipDialog from "@/app/components/theme2/MembershipDialog";
import Membership from "@/app/components/theme2/Membership";
import Offers from "@/app/components/theme2/Offers";
import Testimonials from "@/app/components/theme2/Testimonials";
import Contact from "@/app/components/theme2/Contact";
import Footer from "@/app/components/theme2/Footer";
import { blogPosts, cars } from "@/app/data/carDate";
import page from "../theme2/page";
import { useState, useEffect } from "react";
import BlogAll from "@/app/components/theme2/BlogAll";
import Blog from "@/app/components/theme2/Blog";
import EFooter from "@/app/components/theme2/Footer";
import ArticleDetail from "@/app/components/theme2/ArticleDetail";
import CarDetail from "@/app/components/theme2/CarDetail";
import EHero from "@/app/components/theme2/Hero";
 

 export type EPage = "home" | "blog" | "article" | "carDetail";
type BlogPost = typeof blogPosts[0];
type CarType = typeof cars[0];

 
  // ─── PALETTE ──────────────────────────────────────────────────────────────────
export const GOLD     = "#D4AF37";
export const GOLD_L   = "#F4E1A1";
export const GOLD_D   = "#A07C1C";
export const BG       = "#0B0B0B";
export const BG2      = "#111111";
export const BG3      = "#171717";
export const BG4      = "#1E1E1E";
export const TXT      = "#E8E0D0";
export const TXT_DIM  = "rgba(232,224,208,0.5)";
// export const SEC_BTN      = "transparent";
// export const SEC_BTN_TXT  = TXT;
// export const SEC_BTN_BRD  = "rgba(232,224,208,0.3)";

export const PAD = "50px 130px";
export const ffAr = "'Cairo',sans-serif";
export const ffEn = "'Playfair Display',serif";
export const ffBody = "'Inter',sans-serif";


// ─── SECONDARY BUTTON STYLE ──────────────────────────────────────────────────
export const SEC_BTN = `${GOLD}18`;
export const SEC_BTN_TXT = `${GOLD}cc`;
export const SEC_BTN_BRD = `${GOLD}30`;

// ─── PAGE STATE (forward declarations) ───────────────────────────────────────

export function useFonts() {
  const { lang } = useAppContext();
  return {
    heading: lang === "ar" ? ffAr : ffEn,
    body: lang === "ar" ? ffAr : ffBody,
    isAr: lang === "ar",
  };
}
export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
    <div style={{ 
      width: 50, 
      height: 2, 
      background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` 
    }} />
    <span style={{ color: GOLD, fontSize: 11, letterSpacing: "0.35em", fontFamily: ffBody, fontWeight: 600 }}>
      {children}
    </span>
  </div>
);

export const LUX_IMG = {
  hotelEntrance: "https://images.unsplash.com/photo-1772929004291-dd78df4247ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  rollsRoyce:   "https://images.unsplash.com/photo-1772990917063-75a68a5af46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  privateJet:   "https://images.unsplash.com/photo-1772354815085-0cb07ca438fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  interior:     "https://images.unsplash.com/photo-1547731269-e4073e054f12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  dubai:        "https://images.unsplash.com/photo-1693946954012-4bbc26cfb6a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  wedding:      "https://images.unsplash.com/photo-1640522196033-e95ec1e93c8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  chauffeur:    "https://images.unsplash.com/photo-1759580596225-abbdd30693da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  cityTour:     "https://images.unsplash.com/photo-1639497366184-abc2260cca65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  corporate:    "https://images.unsplash.com/photo-1758448721134-1798533ae917?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

let _setEPage: ((p: EPage) => void) | null = null;
let _setEArticle: ((a: BlogPost | null) => void) | null = null;
let _setECar: ((c: CarType | null) => void) | null = null;
export function showEPage(p: EPage) { _setEPage?.(p); }
export function showEArticle(post: BlogPost) { _setEArticle?.(post); _setEPage?.("article"); }
export function showECarDetail(car: CarType) { _setECar?.(car); _setEPage?.("carDetail"); }
export default function Theme2() {
 
  const { lang } = useAppContext();
  const [page, setPage] = useState<EPage>("home");
   const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
    const [selectedCar, setSelectedCar] = useState<CarType | null>(null);

  useEffect(() => {
    _setEPage = setPage;
    _setECar = setSelectedCar;
     _setEArticle = setSelectedArticle;
    return () => { 
      _setEPage = null; 
      _setEArticle = null;
    };
  }, []);

// ─── LUXURY IMAGES ───────────────────────────────────────────────────────────
 
  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} style={{ fontFamily: lang === "ar" ? ffAr : ffBody, background: BG }}>
    <Navbar/>
    {page === "blog" && (
        <>
          <BlogAll />
          <Footer />
        </>
      )}

       {page === "article" && selectedArticle && (
        <>
          <ArticleDetail post={selectedArticle} />
          <EFooter />
        </>
      )}

       {page === "carDetail" && selectedCar && (
        <>
          <CarDetail car={selectedCar} />
          <Footer />
        </>
      )}
      {page === "home" && (
        <>
    <EHero/>
    <Experience/>
    <Fleet/>
    <Services/>
    <Membership/>
    <Offers/>
    <Testimonials/>
    <Blog/>
    <Contact/>
    <Footer/>
    </>
      )}
    </div>
    
    
  );
}