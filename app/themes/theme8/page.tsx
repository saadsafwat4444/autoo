
"use client"
import { useAppContext } from "@/app/contexts/AppContext";
 import FAQ from "@/app/components/Theme8/FAQ";
import About from "@/app/components/Theme8/About";
import Footer from "@/app/components/Theme8/Footer";
import Hero from "@/app/components/Theme8/Hero";
import Offers from "@/app/components/Theme8/Offers";
import Testimonials from "@/app/components/Theme8/Testimonials";
 
import { cars } from "@/app/data/carDate";
import { PartyPopper, Crown, Shield, Sparkles, Plane, Car, Clock, ShieldCheck, Heart, Users, BadgeCheck, Briefcase, Building2, Zap, CircleDollarSign, Check, Sunrise, Fuel, ArrowLeft, ArrowRight, Calendar, IdCard, Wallet, X, Settings, Star, CreditCard, Banknote, Smartphone, Eye, Gauge, Navigation, Thermometer, Volume2, Wifi, Wind } from "lucide-react";
import { CSSProperties, ReactNode, useState } from "react";
import Nav from "@/app/components/Theme8/Navbar";
import Situations from "@/app/components/Theme8/Situations";
import Articles from "@/app/components/Theme8/Articles";
import Contact from "@/app/components/Theme8/Contact";
import CarShowcase from "@/app/components/Theme8/CarShowcase";

export const O  = "#F97316";
export const OD = "#EA580C";
export const OL = "#FB923C";
export const OBG = "#FFF7ED";
export const DK  = "#1F2937";
export const DK2 = "#111827";
export const BG  = "#FFFBF5";
export const BG2 = "#FEF3E2";
export const W   = "#FFFFFF";
export const TX  = "#111827";
export const TX2 = "#4B5563";
export const TX3 = "#9CA3AF";
export const BD  = "#E5E7EB";
export const GRN = "#10B981";
export const AMB = "#F59E0B";
export const PAD = "50px 130px";

export const useFonts = () => {
  const { lang } = useAppContext();
  return {
    h: lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif",
    b: lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif",
  };
};

export const IMG = {
  hero: "https://images.unsplash.com/photo-1763646870053-8f6026354dd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBwYXJrZWQlMjBjaXR5JTIwc3RyZWV0JTIwd2FybSUyMHN1bnNldCUyMGdvbGRlbnxlbnwxfHx8fDE3NzMzMjUyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  occasion: "https://images.unsplash.com/photo-1756267235860-b200e051f13c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwY2FyJTIwZWxlZ2FudCUyMGV2ZW50JTIwbmlnaHR8ZW58MXx8fHwxNzczMzI1Mjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  airport: "https://images.unsplash.com/photo-1763568321672-f0e25b0daa6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwb3J0JTIwdGVybWluYWwlMjBkZXBhcnR1cmUlMjB0cmF2ZWwlMjBzdWl0Y2FzZXxlbnwxfHx8fDE3NzMzMjQ4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  family: "https://images.unsplash.com/photo-1759197761283-882699970b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTVVYlMjBmYW1pbHklMjBjYXIlMjBzcGFjaW91cyUyMG1vZGVybiUyMHdoaXRlfGVufDF8fHx8MTc3MzMyNTI3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  business: "https://images.unsplash.com/photo-1758518730384-be3d205838e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWwlMjBoYW5kc2hha2UlMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzczMzI0ODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  trip: "https://images.unsplash.com/photo-1764339521142-26d7cdce19c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJvYWQlMjBjb2FzdGFsJTIwZHJpdmUlMjBzdW1tZXIlMjB2YWNhdGlvbnxlbnwxfHx8fDE3NzMzMjUyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

export const pad: CSSProperties = { maxWidth: 1140, margin: "0 auto", padding: "0 48px" };

export const INP = (b: string): CSSProperties => ({
  width: "100%", padding: "13px 16px", borderRadius: 12,
  border: `1.5px solid ${BD}`, fontSize: 14, color: TX,
  background: W, outline: "none", boxSizing: "border-box", fontFamily: b,
});

 export const CAR_FEATURES: Record<string, { ar: string; en: string; icon: ReactNode }[]> = {
  luxury: [
    { ar: "مقاعد جلد طبيعي", en: "Genuine Leather Seats", icon: <Crown size={14} /> },
    { ar: "نظام صوت متقدم", en: "Premium Sound System", icon: <Volume2 size={14} /> },
    { ar: "تحكم مناخي ثنائي", en: "Dual Climate Control", icon: <Thermometer size={14} /> },
    { ar: "شاشة لمس كبيرة", en: "Large Touchscreen", icon: <Eye size={14} /> },
    { ar: "كاميرا 360 درجة", en: "360 Camera", icon: <Navigation size={14} /> },
    { ar: "مثبت سرعة ذكي", en: "Adaptive Cruise", icon: <Gauge size={14} /> },
  ],
  suv: [
    { ar: "دفع رباعي قوي", en: "Powerful 4WD", icon: <Gauge size={14} /> },
    { ar: "��ساحة تخزين واسعة", en: "Large Cargo Space", icon: <Car size={14} /> },
    { ar: "7 مقاعد مريحة", en: "7 Comfortable Seats", icon: <Users size={14} /> },
    { ar: "نظام ملاحة GPS", en: "GPS Navigation", icon: <Navigation size={14} /> },
    { ar: "تكييف خلفي مستقل", en: "Rear AC Zone", icon: <Wind size={14} /> },
    { ar: "أنظمة أمان متقدمة", en: "Advanced Safety", icon: <Shield size={14} /> },
  ],
  sports: [
    { ar: "محرك عالي الأداء", en: "High Performance Engine", icon: <Gauge size={14} /> },
    { ar: "ناقل حركة رياضي", en: "Sport Transmission", icon: <Settings size={14} /> },
    { ar: "مقاعد رياضية", en: "Sport Seats", icon: <Crown size={14} /> },
    { ar: "صوت عادم مميز", en: "Exhaust Sound", icon: <Volume2 size={14} /> },
    { ar: "نظام تعليق رياضي", en: "Sport Suspension", icon: <Zap size={14} /> },
    { ar: "سقف قابل للفتح", en: "Convertible Roof", icon: <Wind size={14} /> },
  ],
  economy: [
    { ar: "استهلاك وقود اقتصادي", en: "Fuel Efficient", icon: <Fuel size={14} /> },
    { ar: "بلوتوث ومنافذ USB", en: "Bluetooth & USB", icon: <Wifi size={14} /> },
    { ar: "شاشة معلومات", en: "Info Display", icon: <Eye size={14} /> },
    { ar: "تكييف هواء قوي", en: "Strong AC", icon: <Wind size={14} /> },
    { ar: "مساعد ركن", en: "Parking Assist", icon: <Navigation size={14} /> },
    { ar: "مقاعد مريحة", en: "Comfortable Seats", icon: <Heart size={14} /> },
  ],
};

export const EXTRA_IMGS: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1758411897888-3ca658535fdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBpbnRlcmlvciUyMGRhc2hib2FyZCUyMGx1eHVyeSUyMG1vZGVybnxlbnwxfHx8fDE3NzMzMjYyNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  2: "https://images.unsplash.com/photo-1764013290141-63b13e311906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBzaG93cm9vbSUyMG1vZGVybiUyMGludGVyaW9yJTIwdmVoaWNsZXN8ZW58MXx8fHwxNzczMzI1ODQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  3: "https://images.unsplash.com/photo-1604445415362-2a9840bd5ff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBrZXlzJTIwaGFuZG92ZXIlMjBkZWxpdmVyeSUyMHJlbnRhbHxlbnwxfHx8fDE3NzMzMjYyNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

// ─── SITUATIONS DATA ─────────────────────────────────────────────────
export const SITUATIONS = [
  {
    id: "occasion", ar: "عندي مناسبة", en: "Special Occasion",
    icon: <PartyPopper size={24} />, color: "#8B5CF6",
    img: IMG.occasion,
    cars: [1, 2, 7],
    desc: { ar: "سيارات فاخرة تليق بأهم لحظاتك", en: "Luxury cars worthy of your important moments" },
    why: [
      { ar: "تصميم أنيق يعكس المناسبة", en: "Elegant design for the occasion", icon: <Crown size={16} /> },
      { ar: "مقاعد جلد مريحة", en: "Comfortable leather seats", icon: <Shield size={16} /> },
      { ar: "خدمة توصيل VIP", en: "VIP delivery service", icon: <Sparkles size={16} /> },
    ],
  },
  {
    id: "airport", ar: "مسافر للمطار", en: "Airport Transfer",
    icon: <Plane size={24} />, color: "#3B82F6",
    img: IMG.airport,
    cars: [1, 5, 8],
    desc: { ar: "وصول مريح وموثوق في الموعد المحدد", en: "Comfortable and reliable on-time arrival" },
    why: [
      { ar: "مساحة واسعة للحقائب", en: "Ample luggage space", icon: <Car size={16} /> },
      { ar: "التزام تام بالمواعيد", en: "Strict on-time guarantee", icon: <Clock size={16} /> },
      { ar: "سائق محترف اختياري", en: "Optional professional driver", icon: <ShieldCheck size={16} /> },
    ],
  },
  {
    id: "family", ar: "رحلة عائلية", en: "Family Trip",
    icon: <Heart size={24} />, color: "#10B981",
    img: IMG.family,
    cars: [3, 6, 9],
    desc: { ar: "سيارات واسعة وآمنة لراحة عائلتك", en: "Spacious and safe cars for your family" },
    why: [
      { ar: "7 مقاعد مريحة", en: "7 comfortable seats", icon: <Users size={16} /> },
      { ar: "أنظمة أمان متقدمة", en: "Advanced safety systems", icon: <Shield size={16} /> },
      { ar: "كرسي أطفال مجاني", en: "Free child seat included", icon: <BadgeCheck size={16} /> },
    ],
  },
  {
    id: "business", ar: "اجتماع عمل", en: "Business Meeting",
    icon: <Briefcase size={24} />, color: "#1F2937",
    img: IMG.business,
    cars: [1, 2, 10],
    desc: { ar: "اترك انطباع احترافي من أول لحظة", en: "Make a professional impression from the start" },
    why: [
      { ar: "تصميم احترافي", en: "Professional design", icon: <Building2 size={16} /> },
      { ar: "راحة للمشاوير الطويلة", en: "Comfortable for long drives", icon: <Car size={16} /> },
      { ar: "شحن أجهزتك أثناء الطريق", en: "Charge devices on the go", icon: <Zap size={16} /> },
    ],
  },
  {
    id: "daycar", ar: "أحتاج سيارة ليوم", en: "Need a Car for a Day",
    icon: <Car size={24} />, color: "#F97316",
    img: IMG.hero,
    cars: [4, 5, 11],
    desc: { ar: "سيارة اقتصادية ومريحة ليومك", en: "Affordable and comfortable for your day" },
    why: [
      { ar: "أسعار يومية مناسبة", en: "Great daily rates", icon: <CircleDollarSign size={16} /> },
      { ar: "استلام فوري بدون انتظار", en: "Instant pickup", icon: <Zap size={16} /> },
      { ar: "إجراءات بسيطة وسريعة", en: "Simple fast process", icon: <Check size={16} /> },
    ],
  },
  {
    id: "trip", ar: "رحلة قصيرة", en: "Short Getaway",
    icon: <Sunrise size={24} />, color: "#F59E0B",
    img: IMG.trip,
    cars: [3, 6, 8],
    desc: { ar: "استمتع برحلتك بسيارة مثالية للطريق", en: "Enjoy your trip with the perfect road car" },
    why: [
      { ar: "استهلاك وقود اقتصادي", en: "Great fuel economy", icon: <Fuel size={16} /> },
      { ar: "صندوق واسع للأمتعة", en: "Spacious trunk", icon: <Car size={16} /> },
      { ar: "قيادة ممتعة ومريحة", en: "Fun and comfortable drive", icon: <Sparkles size={16} /> },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// BOOKING MODAL — Full 5-step business flow
// ═══════════════════════════════════════════════════════════════════════════
export function T8BookingModal({ car, onClose, isRTL, t, h, b }: {
  car: typeof cars[0]; onClose: () => void; isRTL: boolean;
  t: (ar: string, en: string) => string; h: string; b: string;
}) {
  const [step, setStep] = useState(0);
  const [payType, setPayType] = useState<"full" | "inst">("full");
  const [payMethod, setPayMethod] = useState("card");
  const [instMonths, setInstMonths] = useState(3);
  const inp = INP(b);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const steps = [
    { ar: "التفاصيل", en: "Details", icon: <Car size={13} /> },
    { ar: "التاريخ", en: "Date", icon: <Calendar size={13} /> },
    { ar: "بياناتك", en: "Info", icon: <IdCard size={13} /> },
    { ar: "الدفع", en: "Payment", icon: <Wallet size={13} /> },
    { ar: "تأكيد", en: "Done", icon: <Check size={13} /> },
  ];
  const monthly = instMonths > 0 ? Math.ceil((car.pricePerDay * 30) / instMonths) : 0;

  const BtnNext = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
    <button onClick={onClick} style={{
      flex: 2, padding: "14px", borderRadius: 14, background: O, color: "#fff",
      border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: h,
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      transition: "background 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.background = OD; }}
      onMouseLeave={e => { e.currentTarget.style.background = O; }}>
      {children}
    </button>
  );
  const BtnBack = ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} style={{
      flex: 1, padding: "14px", borderRadius: 14, background: "transparent",
      color: TX2, border: `1.5px solid ${BD}`, fontWeight: 700, fontSize: 14,
      cursor: "pointer", fontFamily: h,
    }}>{t("رجوع", "Back")}</button>
  );

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9990, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: W, borderRadius: 28, width: "100%", maxWidth: 820, maxHeight: "92vh", overflow: "auto", boxShadow: "0 30px 80px rgba(0,0,0,0.18)", animation: "t8pop 0.3s ease-out" }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ position: "relative", height: 190, overflow: "hidden", borderRadius: "28px 28px 0 0" }}>
          <img src={car.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(17,24,39,0.1) 0%, rgba(17,24,39,0.75) 100%)" }} />
          <button onClick={onClose} style={{ position: "absolute", top: 14, [isRTL ? "left" : "right"]: 14, width: 38, height: 38, borderRadius: "50%", background: W, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} color={TX} /></button>
          <div style={{ position: "absolute", bottom: 16, left: 24, right: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <h3 style={{ fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: h }}>{t(car.name.ar, car.name.en)}</h3>
            <span style={{ background: O, color: "#fff", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>{car.pricePerDay} {t("ج.م/يوم", "EGP/day")}</span>
          </div>
        </div>

        {/* Stepper */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "18px 24px 0", gap: 0 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: i <= step ? "pointer" : "default" }} onClick={() => { if (i <= step) setStep(i); }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: i < step ? GRN : i === step ? O : "#F3F4F6",
                  color: i <= step ? "#fff" : TX3,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s",
                }}>
                  {i < step ? <Check size={14} /> : s.icon}
                </div>
                <span style={{ fontSize: 9, fontWeight: 600, color: i <= step ? O : TX3, marginTop: 4, fontFamily: h }}>{t(s.ar, s.en)}</span>
              </div>
              {i < 4 && <div style={{ width: 44, height: 2, background: i < step ? GRN : BD, margin: "0 3px", marginBottom: 18, borderRadius: 2 }} />}
            </div>
          ))}
        </div>

        <div style={{ padding: "22px 28px 28px" }}>
          {/* STEP 0 — Details */}
          {step === 0 && (
            <div style={{ animation: "t8fi 0.3s" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
                {[
                  { ar: "المقاعد", en: "Seats", val: car.seats, icon: <Users size={16} /> },
                  { ar: "ناقل الحركة", en: "Transmission", val: t(car.transmission.ar, car.transmission.en), icon: <Settings size={16} /> },
                  { ar: "الوقود", en: "Fuel", val: t(car.fuel.ar, car.fuel.en), icon: <Fuel size={16} /> },
                  { ar: "التقييم", en: "Rating", val: car.rating, icon: <Star size={16} /> },
                ].map((sp, i) => (
                  <div key={i} style={{ background: BG, borderRadius: 14, padding: "14px 10px", textAlign: "center", border: `1px solid ${BD}` }}>
                    <div style={{ color: O, marginBottom: 6, display: "flex", justifyContent: "center" }}>{sp.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: TX, fontFamily: h }}>{sp.val}</div>
                    <div style={{ fontSize: 10, color: TX3, marginTop: 2 }}>{t(sp.ar, sp.en)}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderRadius: 16, background: OBG, border: `1.5px solid ${O}20` }}>
                <div>
                  <div style={{ fontSize: 11, color: TX3, marginBottom: 2 }}>{t("السعر اليومي", "Daily Price")}</div>
                  <span style={{ fontSize: 28, fontWeight: 900, color: O, fontFamily: h }}>{car.pricePerDay}</span>
                  <span style={{ fontSize: 13, color: TX3, marginLeft: 4, marginRight: 4 }}>{t("ج.م/يوم", "EGP/day")}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: GRN, fontSize: 12, fontWeight: 700, background: `${GRN}10`, padding: "7px 16px", borderRadius: 20 }}>
                  <BadgeCheck size={14} /> {t("متاحة للحجز", "Available")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <BtnNext onClick={() => setStep(1)}>{t("احجز هذه السيارة", "Book This Car")} <Arrow size={15} /></BtnNext>
              </div>
            </div>
          )}

          {/* STEP 1 — Date & Location */}
          {step === 1 && (
            <div style={{ animation: "t8fi 0.3s" }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: TX, fontFamily: h, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}><Calendar size={18} color={O} /> {t("التاريخ والموقع", "Date & Location")}</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("تاريخ الاستلام", "Pickup Date")}</label><input type="date" style={inp} /></div>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("تاريخ الإرجاع", "Return Date")}</label><input type="date" style={inp} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("موقع الاستلام", "Pickup Location")}</label>
                  <select style={{ ...inp, appearance: "none" as const }}><option>{t("وسط البلد", "Downtown")}</option><option>{t("المطار", "Airport")}</option><option>{t("المعادي", "Maadi")}</option></select></div>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("مدة الإيجار", "Duration")}</label>
                  <select style={{ ...inp, appearance: "none" as const }}><option>{t("يومي", "Daily")}</option><option>{t("أسبوعي", "Weekly")}</option><option>{t("شهري", "Monthly")}</option></select></div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                <BtnBack onClick={() => setStep(0)} />
                <BtnNext onClick={() => setStep(2)}>{t("التالي", "Next")} <Arrow size={14} /></BtnNext>
              </div>
            </div>
          )}

          {/* STEP 2 — Personal info */}
          {step === 2 && (
            <div style={{ animation: "t8fi 0.3s" }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: TX, fontFamily: h, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}><IdCard size={18} color={O} /> {t("البيانات الشخصية", "Personal Info")}</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("الاسم الكامل", "Full Name")}</label><input style={inp} placeholder={t("محمد أحمد", "Mohammed Ahmed")} /></div>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("الهاتف", "Phone")}</label><input type="tel" style={inp} placeholder="+20 1XX XXX XXXX" /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("البريد الإلكتروني", "Email")}</label><input type="email" style={inp} placeholder="you@email.com" /></div>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("الرقم القومي", "National ID")}</label><input style={inp} placeholder="XXXXXXXXXXXX" /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("رخصة القيادة", "License #")}</label><input style={inp} /></div>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("المدينة", "City")}</label>
                  <select style={{ ...inp, appearance: "none" as const }}><option>{t("القاهرة", "Cairo")}</option><option>{t("الإسكندرية", "Alexandria")}</option><option>{t("الجيزة", "Giza")}</option></select></div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                <BtnBack onClick={() => setStep(1)} />
                <BtnNext onClick={() => setStep(3)}>{t("التالي: الدفع", "Next: Payment")} <Arrow size={14} /></BtnNext>
              </div>
            </div>
          )}

          {/* STEP 3 — Payment */}
          {step === 3 && (
            <div style={{ animation: "t8fi 0.3s" }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: TX, fontFamily: h, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}><Wallet size={18} color={O} /> {t("طريقة الدفع", "Payment Method")}</h4>
              {/* Toggle */}
              <div style={{ display: "flex", gap: 6, marginBottom: 18, background: "#F3F4F6", borderRadius: 14, padding: 4 }}>
                {[
                  { id: "full" as const, ar: "دفع كامل", en: "Full Payment", icon: <CreditCard size={14} /> },
                  { id: "inst" as const, ar: "تقسيط بدون فوائد", en: "0% Installments", icon: <CircleDollarSign size={14} /> },
                ].map(p => (
                  <button key={p.id} onClick={() => setPayType(p.id)} style={{
                    flex: 1, padding: "12px", borderRadius: 10,
                    background: payType === p.id ? W : "transparent",
                    color: payType === p.id ? O : TX2,
                    border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: h,
                    boxShadow: payType === p.id ? "0 2px 10px rgba(0,0,0,0.05)" : "none",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    transition: "all 0.2s",
                  }}>{p.icon} {t(p.ar, p.en)}</button>
                ))}
              </div>
              {payType === "full" && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 18 }}>
                    {[
                      { id: "card", ar: "بطاقة بنكية", en: "Credit Card", icon: <CreditCard size={20} /> },
                      { id: "cash", ar: "كاش عند الاستلام", en: "Cash on Pickup", icon: <Banknote size={20} /> },
                      { id: "wallet", ar: "محفظة إلكترونية", en: "E-Wallet", icon: <Smartphone size={20} /> },
                    ].map(pm => (
                      <div key={pm.id} onClick={() => setPayMethod(pm.id)} style={{
                        padding: 16, borderRadius: 14, cursor: "pointer", textAlign: "center",
                        background: payMethod === pm.id ? OBG : W,
                        border: `2px solid ${payMethod === pm.id ? O : BD}`,
                        transition: "all 0.2s",
                      }}>
                        <div style={{ color: payMethod === pm.id ? O : TX3, marginBottom: 6, display: "flex", justifyContent: "center" }}>{pm.icon}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: TX, fontFamily: h }}>{t(pm.ar, pm.en)}</div>
                      </div>
                    ))}
                  </div>
                  {payMethod === "card" && (
                    <div style={{ background: "#F9FAFB", borderRadius: 14, padding: 16, marginBottom: 16, border: `1px solid ${BD}` }}>
                      <div style={{ marginBottom: 10 }}><input placeholder="XXXX  XXXX  XXXX  XXXX" style={{ ...inp, background: W }} /></div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                        <input placeholder="MM/YY" style={{ ...inp, background: W }} />
                        <input placeholder="CVV" type="password" style={{ ...inp, background: W }} />
                        <input placeholder={t("الاسم على البطاقة", "Cardholder")} style={{ ...inp, background: W }} />
                      </div>
                    </div>
                  )}
                </>
              )}
              {payType === "inst" && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 18 }}>
                    {[3, 6, 12].map(m => (
                      <div key={m} onClick={() => setInstMonths(m)} style={{
                        padding: 16, borderRadius: 14, cursor: "pointer", textAlign: "center",
                        background: instMonths === m ? OBG : W,
                        border: `2px solid ${instMonths === m ? O : BD}`,
                        transition: "all 0.2s",
                      }}>
                        <div style={{ fontSize: 22, fontWeight: 900, color: instMonths === m ? O : TX, fontFamily: h }}>{m}</div>
                        <div style={{ fontSize: 11, color: TX2, marginBottom: 3 }}>{t("شهر", "months")}</div>
                        <div style={{ fontSize: 10, color: GRN, fontWeight: 700 }}>{t("بدون فوائد", "0% interest")}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#F9FAFB", borderRadius: 14, padding: 16, marginBottom: 16, border: `1px solid ${BD}` }}>
                    {[
                      { ar: "الإجمالي (30 يوم)", en: "Total (30 days)", val: `${(car.pricePerDay * 30).toLocaleString()} ${t("ج.م", "EGP")}`, bold: false },
                      { ar: "الدفعة الشهرية", en: "Monthly Payment", val: `${monthly.toLocaleString()} ${t("ج.م", "EGP")}`, bold: true },
                    ].map((r, ri) => (
                      <div key={ri} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: ri === 0 ? `1px solid ${BD}` : "none" }}>
                        <span style={{ fontSize: 13, color: TX3 }}>{t(r.ar, r.en)}</span>
                        <span style={{ fontSize: 14, fontWeight: r.bold ? 800 : 600, color: r.bold ? O : TX }}>{r.val}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#F9FAFB", borderRadius: 14, padding: 16, marginBottom: 16, border: `1px solid ${BD}` }}>
                    <div style={{ marginBottom: 10 }}><input placeholder="XXXX  XXXX  XXXX  XXXX" style={{ ...inp, background: W }} /></div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <input placeholder="MM/YY" style={{ ...inp, background: W }} />
                      <input placeholder="CVV" type="password" style={{ ...inp, background: W }} />
                    </div>
                  </div>
                </>
              )}
              <label style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 18, cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ accentColor: O, marginTop: 3, width: 16, height: 16 }} />
                <span style={{ fontSize: 12, color: TX2, lineHeight: 1.7 }}>{t("أوافق على شروط الخدمة وسياسة الإلغاء والاسترداد", "I agree to the terms of service and cancellation policy")}</span>
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                <BtnBack onClick={() => setStep(2)} />
                <BtnNext onClick={() => setStep(4)}><Shield size={15} /> {t("تأكيد الحجز", "Confirm Booking")}</BtnNext>
              </div>
            </div>
          )}

          {/* STEP 4 — Confirmation */}
          {step === 4 && (
            <div style={{ animation: "t8pop 0.4s", textAlign: "center", padding: "10px 0" }}>
              <div style={{ width: 76, height: 76, borderRadius: "50%", margin: "0 auto 20px", background: `${GRN}10`, border: `3px solid ${GRN}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={38} color={GRN} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: TX, fontFamily: h, marginBottom: 6 }}>{t("تم حجز سيارتك بنجاح", "Your Car is Booked!")}</h3>
              <p style={{ fontSize: 13, color: TX3, marginBottom: 24 }}>{t("السيارة ستكون جاهزة في الموعد المحدد", "The car will be ready at the scheduled time")}</p>
              <div style={{ background: BG, borderRadius: 16, padding: 18, marginBottom: 24, border: `1px solid ${BD}`, textAlign: isRTL ? "right" : "left" }}>
                {[
                  { ar: "السيارة", en: "Car", val: t(car.name.ar, car.name.en), clr: TX },
                  { ar: "رقم الحجز", en: "Booking #", val: "#SS-" + Math.floor(10000 + Math.random() * 90000), clr: TX },
                  { ar: "الدفع", en: "Payment", val: payType === "inst" ? t(`تقسيط ${instMonths} شهر`, `${instMonths} mo installments`) : t("دفع كامل", "Full payment"), clr: TX },
                  { ar: "الحالة", en: "Status", val: t("مؤكد", "Confirmed"), clr: GRN },
                ].map((r, ri) => (
                  <div key={ri} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: ri < 3 ? `1px solid ${BD}` : "none" }}>
                    <span style={{ fontSize: 12, color: TX3 }}>{t(r.ar, r.en)}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: r.clr }}>{r.val}</span>
                  </div>
                ))}
              </div>
              <button onClick={onClose} style={{ padding: "14px 40px", borderRadius: 50, background: O, color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: h }}>{t("عرض حجوزاتي", "View My Bookings")}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 
export default function Theme8(){
 
    const { isRTL } = useAppContext();
     return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{ background: BG, fontFamily: "'Inter', sans-serif", color: TX }}>
      <Nav />
      <Hero />
      <Situations />
      <CarShowcase />
      <Offers />
      <Testimonials />
      <Articles />
      <About />
      <FAQ />
      <Contact />
      <Footer />
      <div style={{ height: 80 }} />
    </div>
  );
}