 
"use client"
import Offers from "@/app/components/Theme6/Offers";
import AboutUs from "@/app/components/Theme6/AboutUs";
import Articles from "@/app/components/Theme6/Articles";
import Cars from "@/app/components/Theme6/Cars";
import Contact from "@/app/components/Theme6/Contact";
import Destinations from "@/app/components/Theme6/Destinations";
import Footer from "@/app/components/Theme6/Footer";
import Hero from "@/app/components/Theme6/Hero";
import HowItWorks from "@/app/components/Theme6/HowItWorks";
import Navbar from "@/app/components/Theme6/Navbar";
import Stories from "@/app/components/Theme6/Stories";
import TripTypes from "@/app/components/Theme6/TripTypes";
import { useAppContext } from "@/app/contexts/AppContext";
 
export const GREEN = "#15803D";
export const GREEN_L = "#22C55E";
export const OLIVE = "#65A30D";
export const BG = "#FAF7F0";
export const BG2 = "#F5F0E8";
export const CARD_BG = "#FFFFFF";
export const TXT = "#1F2937";
export const TXT2 = "#4B5563";
export const TXT3 = "#9CA3AF";
export const BORDER = "#E5E0D5";
export const WARM = "#D97706";
export const SAND = "#F5F0E8";
export const PAD = "50px 130px";

export const useFonts = () => {
  const { lang } = useAppContext();
  return {
    heading: lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif",
    body: lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif",
  };
};

// ─── IMAGES ──────────────────────────────────────────────────────────────────
export const IMG = {
  heroRoad: "https://images.unsplash.com/photo-1748445350441-536c54497b68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kJTIwcm92ZXIlMjBkZWZlbmRlciUyMG1vdW50YWlucyUyMGNhbXBpbmclMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzczMzIwNzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ainSokhna: "https://images.unsplash.com/photo-1624612602606-0a4bd0d9839c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaW4lMjBzb2tobmElMjBlZ3lwdCUyMHJlZCUyMHNlYSUyMHJlc29ydCUyMGJlYWNofGVufDF8fHx8MTc3MzMyMDc4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  siwa: "https://images.unsplash.com/photo-1771236581548-31a23ab804dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaXdhJTIwb2FzaXMlMjBlZ3lwdCUyMGxha2UlMjBzYWx0JTIwZGVzZXJ0fGVufDF8fHx8MTc3MzMyMDc4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  dahab: "https://images.unsplash.com/photo-1664056653856-aba186af5b85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWhhYiUyMGVneXB0JTIwYmx1ZSUyMGhvbGUlMjBkaXZpbmclMjBzaW5haXxlbnwxfHx8fDE3NzMzMjA3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  sinai: "https://images.unsplash.com/photo-1642590476385-cdb0eae7b160?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWludCUyMGNhdGhlcmluZSUyMG1vbmFzdGVyeSUyMHNpbmFpJTIwbW91bnRhaW4lMjBlZ3lwdHxlbnwxfHx8fDE3NzMzMjA3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  beach: "https://images.unsplash.com/photo-1772065267600-7da5f36d8e99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcmVzb3J0JTIwdmFjYXRpb24lMjBzdW5ueXxlbnwxfHx8fDE3NzMzMTkwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  mountain: "https://images.unsplash.com/photo-1605377710453-c1c2f8cca870?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZhbGxleSUyMGdyZWVuJTIwbmF0dXJlJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MzMxOTA3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  oasis: "https://images.unsplash.com/photo-1759654528051-ea829773fedd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvYXNpcyUyMGRlc2VydCUyMHBhbG0lMjB0cmVlcyUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NzMzMTkwNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  sea: "https://images.unsplash.com/photo-1589308945435-38c3f99b3824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBzZWElMjBjb3JhbCUyMHJlZWYlMjBzbm9ya2VsaW5nJTIwZWd5cHR8ZW58MXx8fHwxNzczMzE5MDc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  suv: "https://images.unsplash.com/photo-1772918081898-a9f545e8b290?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTVVYlMjBjYXIlMjByb2FkJTIwdHJpcCUyMGFkdmVudHVyZSUyMG91dGRvb3J8ZW58MXx8fHwxNzczMzE5MDcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  couple: "https://images.unsplash.com/photo-1660853807624-35f79c0bb55e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjByb2FkJTIwdHJpcCUyMHN1bnNldCUyMGhhcHB5JTIwZHJpdmluZ3xlbnwxfHx8fDE3NzMzMTkwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  family: "https://images.unsplash.com/photo-1770318724114-e0c866021698?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBjYW1waW5nJTIwdHJpcCUyMG5hdHVyZSUyMG91dGRvb3J8ZW58MXx8fHwxNzczMzE5MDczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  city: "https://images.unsplash.com/photo-1760381493020-75344cfc38a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMG1vZGVybiUyMGRvd250b3duJTIwZXZlbmluZ3xlbnwxfHx8fDE3NzMzMTkwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  team: "https://images.unsplash.com/photo-1717068341688-1b055a0e6c61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZW50YWwlMjBvZmZpY2UlMjB0ZWFtJTIwcHJvZmVzc2lvbmFsJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzczMzIxMzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  handover: "https://images.unsplash.com/photo-1727893512947-8bdc773ceb02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBrZXklMjBoYW5kb3ZlciUyMHJlbnRhbCUyMGN1c3RvbWVyJTIwc2VydmljZXxlbnwxfHx8fDE3NzMzMjEzMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

// ─── SHARED STYLES ───────────────────────────────────────────────────────────
export const sectionPad = { maxWidth: 1200, margin: "0 auto", padding: "0 24px" };
export default function Theme6(){
      const { isRTL } = useAppContext();

  return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{ fontFamily: "'Cairo', 'Inter', sans-serif", background: BG }}>
      <Navbar />
      <Hero />
      <TripTypes />
      <Destinations />
      <Cars />
      <HowItWorks />
      <AboutUs />
      <Stories />
      <Offers />
      <Articles />
      <Contact />
      <Footer />
    </div>
  );
}