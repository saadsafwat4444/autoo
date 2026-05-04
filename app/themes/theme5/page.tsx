"use client"
import Cars from "@/app/components/Theme5/Cars";
import AiSection from "@/app/components/Theme5/AiSection";
import Hero from "@/app/components/Theme5/Hero";
import Navbar from "@/app/components/Theme5/Navbar";
import { BookingFlow, CarDetailModal } from "@/app/components/Theme5/Theme5Models";
import BlogDetailModal from "@/app/components/Theme5/BlogDetailModels";
import WhyUs from "@/app/components/Theme5/WhyUs";
import { useAppContext } from "@/app/contexts/AppContext";
import { Briefcase, Baby, TreePine, Car, Plane } from "lucide-react";
import { useState } from "react";
import Plans from "@/app/components/Theme5/Plans";
import Contact from "@/app/components/Theme5/Contact";
import Blog from "@/app/components/Theme5/Blog";
import Offers from "@/app/components/Theme5/Offers";
import Footer from "@/app/components/Theme5/Footer";
import Services from "@/app/components/Theme5/Services";
 
  

// ─── COLORS ──────────────────────────────────────────────────────────────────
export const CYAN = "#06B6D4";
export const CYAN_D = "#0891B2";
export const CYAN_L = "#22D3EE";
export const INDIGO = "#4F46E5";
export const INDIGO_L = "#6366F1";
export const BG = "#020617";
export const BG2 = "#0F172A";
export const BG3 = "#1E293B";
export const CARD = "#0F172A";
export const TXT = "#F8FAFC";
export const TXT2 = "#CBD5E1";
export const TXT3 = "#64748B";
export const BORDER = "#1E293B";
export const BORDER2 = "#334155";
export const GREEN = "#10B981";
export const GLOW_CYAN = "0 0 20px rgba(6,182,212,0.3)";
export const GLOW_INDIGO = "0 0 20px rgba(79,70,229,0.3)";
export const PAD = "50px 130px";

// ─── IMAGES ──────────────────────────────────────────────────────────────────
export const IMG = {
  hero: "https://images.unsplash.com/photo-1762314908505-24bccd998715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBjYXIlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzMyNzE5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  tech: "https://images.unsplash.com/photo-1760224254191-16a7cf659ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
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
  { id: "business", icon: <Briefcase size={22} />, ar: "رحلة عمل", en: "Business Trip", cats: ["luxury"], color: INDIGO_L },
  { id: "family", icon: <Baby size={22} />, ar: "رحلة عائلية", en: "Family Trip", cats: ["suv"], color: "#F59E0B" },
  { id: "nature", icon: <TreePine size={22} />, ar: "رحلة طبيعة", en: "Nature Trip", cats: ["suv"], color: GREEN },
  { id: "city", icon: <Car size={22} />, ar: "تنقل داخل المدينة", en: "City Commute", cats: ["economy"], color: CYAN },
  { id: "airport", icon: <Plane size={22} />, ar: "المطار", en: "Airport", cats: ["economy", "luxury"], color: "#EC4899" },
];

// ─── Grid Background SVG ──────────────────────────────────────────────────────
export function GridBG() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid5" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(6,182,212,0.06)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid5)" />
      </svg>
      {/* Glow orbs */}
      <div style={{
        position: "absolute", top: "10%", left: "20%", width: 400, height: 400,
        background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "15%", width: 350, height: 350,
        background: "radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)",
      }} />
    </div>
  );
}
export default function Theme5(){

   const [detailCar, setDetailCar] = useState<number | null>(null);
  const [bookingCar, setBookingCar] = useState<number | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingMode, setBookingMode] = useState<"booking" | "subscription">("booking");
  const [planName, setPlanName] = useState("");
  const [articleId, setArticleId] = useState<number | null>(null);
   const openDetail = (id: number) => setDetailCar(id);
   const openBooking = (carId?: number) => {
    setBookingCar(carId || null);
    setBookingMode("booking");
    setShowBooking(true);
    setDetailCar(null);
  };

    const openSubscription = (plan: string) => {
    setBookingCar(null);
    setBookingMode("subscription");
    setPlanName(plan);
    setShowBooking(true);
  };
  const openOfferBooking = (offer: { title: string; discount: string }) => {
    setBookingCar(null);
    setBookingMode("booking");
    setPlanName(offer.title + " (-" + offer.discount + ")");
    setShowBooking(true);
  };


     const { lang } = useAppContext();
      const { body } = useFonts();
      return (
        <div dir={lang === "ar" ? "rtl" : "ltr"} style={{ fontFamily: body }}>
          <Navbar />
          <Hero/>
          <AiSection onBook={openBooking} onDetail={openDetail} />
          <WhyUs/>
          
   <Cars onDetail={openDetail} onBook={openBooking} />
     <Services onBook={() => openBooking()} />
      <Plans onSubscribe={openSubscription} />
      <Offers onBookOffer={openOfferBooking} />
      <Blog onOpenArticle={(id) => setArticleId(id)} />
      <Contact />
      <Footer />
           {detailCar && (
        <CarDetailModal carId={detailCar} onClose={() => setDetailCar(null)} onBook={(id) => openBooking(id)} />
      )}
      {showBooking && (
        <BookingFlow
          onClose={() => setShowBooking(false)}
          initialCarId={bookingCar}
          mode={bookingMode}
          planName={planName}
        />
      )}
       {articleId && (
        <BlogDetailModal postId={articleId} onClose={() => setArticleId(null)} />
      )}

        </div>
      );
}