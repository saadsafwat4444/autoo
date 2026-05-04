import { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";

import {
  X, Check, ArrowRight, ArrowLeft, Users, Fuel, Settings, Clock,
  Calendar, Phone, Mail, MapPin, Star, Shield, Zap, CreditCard,
  ChevronLeft, ChevronRight, Heart, Car, Eye, Gauge, Palette,
  CircleDot, FileText, User, Lock, CheckCircle, Package, Sparkles,
  Bot, DoorOpen, Wind, Radio, Navigation, Baby as BabySeat, Snowflake,
} from "lucide-react";
import { cars } from "@/app/data/carDate";

// ─── COLORS (same as Theme5) ─────────────────────────────────────────────────
const CYAN = "#06B6D4";
const CYAN_D = "#0891B2";
const INDIGO = "#4F46E5";
const INDIGO_L = "#6366F1";
const BG = "#020617";
const BG2 = "#0F172A";
const BG3 = "#1E293B";
const CARD = "#0F172A";
const TXT = "#F8FAFC";
const TXT2 = "#CBD5E1";
const TXT3 = "#64748B";
const BORDER = "#1E293B";
const BORDER2 = "#334155";
const GREEN = "#10B981";
const GLOW_CYAN = "0 0 20px rgba(6,182,212,0.3)";

function useFonts() {
  const { lang } = useAppContext();
  const isAr = lang === "ar";
  return {
    heading: isAr ? "'Cairo', sans-serif" : "'Inter', sans-serif",
    body: isAr ? "'Cairo', sans-serif" : "'Inter', sans-serif",
    isAr,
  };
}

// ─── Car Features (extended data) ────────────────────────────────────────────
const carFeatures: Record<string, { ar: string; en: string; icon: any }[]> = {
  luxury: [
    { ar: "مقاعد جلدية فاخرة", en: "Premium Leather Seats", icon: <DoorOpen size={16} /> },
    { ar: "تحكم مناخي", en: "Climate Control", icon: <Snowflake size={16} /> },
    { ar: "نظام ملاحة", en: "Navigation System", icon: <Navigation size={16} /> },
    { ar: "نظام صوتي Bose", en: "Bose Sound System", icon: <Radio size={16} /> },
    { ar: "كاميرا 360°", en: "360° Camera", icon: <Eye size={16} /> },
    { ar: "فتحة سقف بانورامية", en: "Panoramic Sunroof", icon: <Wind size={16} /> },
  ],
  economy: [
    { ar: "مكيف هواء", en: "Air Conditioning", icon: <Snowflake size={16} /> },
    { ar: "بلوتوث", en: "Bluetooth", icon: <Radio size={16} /> },
    { ar: "كاميرا خلفية", en: "Rear Camera", icon: <Eye size={16} /> },
    { ar: "مثبت سرعة", en: "Cruise Control", icon: <Gauge size={16} /> },
    { ar: "شاشة لمس", en: "Touchscreen Display", icon: <Navigation size={16} /> },
  ],
  suv: [
    { ar: "دفع رباعي", en: "4WD System", icon: <Car size={16} /> },
    { ar: "مقاعد جلدية", en: "Leather Seats", icon: <DoorOpen size={16} /> },
    { ar: "نظام ملاحة", en: "Navigation System", icon: <Navigation size={16} /> },
    { ar: "تحكم مناخي", en: "Climate Control", icon: <Snowflake size={16} /> },
    { ar: "كاميرا 360°", en: "360° Camera", icon: <Eye size={16} /> },
    { ar: "مقعد أطفال مجاني", en: "Free Child Seat", icon: <BabySeat size={16} /> },
  ],
  sports: [
    { ar: "محرك تيربو", en: "Turbo Engine", icon: <Zap size={16} /> },
    { ar: "نظام عادم رياضي", en: "Sport Exhaust", icon: <Wind size={16} /> },
    { ar: "مقاعد رياضية", en: "Sport Seats", icon: <DoorOpen size={16} /> },
    { ar: "وضع القيادة الرياضي", en: "Sport Drive Mode", icon: <Gauge size={16} /> },
    { ar: "نظام صوتي فاخر", en: "Premium Sound", icon: <Radio size={16} /> },
  ],
};

const carSpecs: Record<string, { ar: string; en: string; value: string }[]> = {
  luxury: [
    { ar: "المحرك", en: "Engine", value: "2.0L Turbo" },
    { ar: "القوة", en: "Power", value: "245 HP" },
    { ar: "التسارع", en: "0-100 km/h", value: "6.2s" },
    { ar: "السرعة القصوى", en: "Top Speed", value: "250 km/h" },
    { ar: "استهلاك الوقود", en: "Fuel Economy", value: "7.5L/100km" },
    { ar: "صندوق الأمتعة", en: "Trunk", value: "530L" },
  ],
  economy: [
    { ar: "المحرك", en: "Engine", value: "1.6L" },
    { ar: "القوة", en: "Power", value: "130 HP" },
    { ar: "التسارع", en: "0-100 km/h", value: "10.5s" },
    { ar: "السرعة القصوى", en: "Top Speed", value: "195 km/h" },
    { ar: "استهلاك الوقود", en: "Fuel Economy", value: "5.8L/100km" },
    { ar: "صندوق الأمتعة", en: "Trunk", value: "420L" },
  ],
  suv: [
    { ar: "المحرك", en: "Engine", value: "3.5L V6" },
    { ar: "القوة", en: "Power", value: "300 HP" },
    { ar: "التسارع", en: "0-100 km/h", value: "7.8s" },
    { ar: "السرعة القصوى", en: "Top Speed", value: "210 km/h" },
    { ar: "استهلاك الوقود", en: "Fuel Economy", value: "12L/100km" },
    { ar: "صندوق الأمتعة", en: "Trunk", value: "810L" },
  ],
  sports: [
    { ar: "المحرك", en: "Engine", value: "3.0L Twin-Turbo" },
    { ar: "القوة", en: "Power", value: "400 HP" },
    { ar: "التسارع", en: "0-100 km/h", value: "4.1s" },
    { ar: "السرعة القصوى", en: "Top Speed", value: "295 km/h" },
    { ar: "استهلاك الوقود", en: "Fuel Economy", value: "10.2L/100km" },
    { ar: "صندوق الأمتعة", en: "Trunk", value: "275L" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// CAR DETAIL MODAL
// ══════════════════════════════════════════════════════════════════════════════
interface CarDetailModalProps {
  carId: number;
  onClose: () => void;
  onBook: (carId: number) => void;
}

export function CarDetailModal({ carId, onClose, onBook }: CarDetailModalProps) {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [liked, setLiked] = useState(false);
  const [tab, setTab] = useState<"specs" | "features" | "reviews">("specs");
  const car = cars.find(c => c.id === carId);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!car) return null;

  const features = carFeatures[car.category] || carFeatures.economy;
  const specs = carSpecs[car.category] || carSpecs.economy;

  const mockReviews = [
    { name: { ar: "أحمد خالد", en: "Ahmed Khaled" }, rating: 5, text: { ar: "سيارة ممتازة وخدمة رائعة!", en: "Excellent car and great service!" }, date: "2026-03-01" },
    { name: { ar: "سمير يوسف", en: "Samir Youssef" }, rating: 4, text: { ar: "تجربة جيدة جداً، أنصح بها.", en: "Very good experience, highly recommend." }, date: "2026-02-20" },
    { name: { ar: "نور الدين", en: "Nour Eldin" }, rating: 5, text: { ar: "سيارة نظيفة ومريحة. سأحجز مجدداً.", en: "Clean and comfortable car. Will book again." }, date: "2026-02-10" },
  ];

  const catLabel: Record<string, { ar: string; en: string }> = {
    luxury: { ar: "فاخرة", en: "Luxury" },
    economy: { ar: "اقتصادية", en: "Economy" },
    suv: { ar: "دفع رباعي", en: "SUV" },
    sports: { ar: "رياضية", en: "Sports" },
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, overflow: "auto",
    }} onClick={onClose}>
      <div style={{
        background: BG, borderRadius: 24, maxWidth: 900, width: "100%",
        maxHeight: "90vh", overflow: "auto",
        border: `1px solid ${BORDER}`, boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
      }} onClick={e => e.stopPropagation()}>
        {/* Hero Image */}
        <div style={{ position: "relative", height: 380 }}>
          <img src={car.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "24px 24px 0 0" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(2,6,23,0.95) 100%)", borderRadius: "24px 24px 0 0" }} />
          
          {/* Top actions */}
          <div style={{ position: "absolute", top: 16, left: 16, right: 16, display: "flex", justifyContent: "space-between" }}>
            <button onClick={onClose} style={{
              width: 42, height: 42, borderRadius: 12,
              background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)",
              border: `1px solid ${BORDER}`, color: TXT, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}><X size={18} /></button>
            <button onClick={() => setLiked(!liked)} style={{
              width: 42, height: 42, borderRadius: 12,
              background: liked ? "rgba(239,68,68,0.2)" : "rgba(0,0,0,0.5)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${liked ? "rgba(239,68,68,0.4)" : BORDER}`,
              color: liked ? "#EF4444" : TXT, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}><Heart size={18} fill={liked ? "#EF4444" : "none"} /></button>
          </div>

          {/* Bottom info overlay */}
          <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{
                background: `rgba(6,182,212,0.15)`, border: `1px solid rgba(6,182,212,0.3)`,
                color: CYAN, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 8,
              }}>{t(catLabel[car.category]?.ar || "", catLabel[car.category]?.en || "")}</span>
              <span style={{ fontSize: 12, color: TXT3 }}>{car.year}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Star size={13} fill="#F59E0B" color="#F59E0B" />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#F59E0B" }}>{car.rating}</span>
                <span style={{ fontSize: 12, color: TXT3 }}>({car.reviews})</span>
              </div>
            </div>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: TXT, fontFamily: heading }}>
              {t(car.name.ar, car.name.en)}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "24px 28px 28px" }}>
          {/* Quick Stats */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28,
          }}>
            {[
              { icon: <Users size={18} />, val: `${car.seats}`, label: { ar: "مقاعد", en: "Seats" } },
              { icon: <Settings size={18} />, val: t(car.transmission.ar, car.transmission.en), label: { ar: "ناقل الحركة", en: "Transmission" } },
              { icon: <Fuel size={18} />, val: t(car.fuel.ar, car.fuel.en), label: { ar: "الوقود", en: "Fuel" } },
              { icon: <Shield size={18} />, val: t("شامل", "Full"), label: { ar: "التأمين", en: "Insurance" } },
            ].map((s, i) => (
              <div key={i} style={{
                background: BG2, borderRadius: 14, padding: "14px 12px", textAlign: "center",
                border: `1px solid ${BORDER}`,
              }}>
                <div style={{ color: CYAN, marginBottom: 6, display: "flex", justifyContent: "center" }}>{s.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: TXT, marginBottom: 2 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: TXT3 }}>{t(s.label.ar, s.label.en)}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
            {(["specs", "features", "reviews"] as const).map(tb => (
              <button key={tb} onClick={() => setTab(tb)} style={{
                padding: "10px 22px", borderRadius: 10,
                background: tab === tb ? `linear-gradient(135deg, ${CYAN}, ${INDIGO})` : "transparent",
                border: `1px solid ${tab === tb ? "transparent" : BORDER}`,
                color: tab === tb ? "#fff" : TXT3,
                fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: heading,
                boxShadow: tab === tb ? GLOW_CYAN : "none",
              }}>
                {tb === "specs" ? t("المواصفات", "Specs") : tb === "features" ? t("المميزات", "Features") : t("التقييمات", "Reviews")}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {tab === "specs" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
              {specs.map((s, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: BG2, borderRadius: 12, padding: "14px 16px",
                  border: `1px solid ${BORDER}`,
                }}>
                  <span style={{ fontSize: 13, color: TXT3 }}>{t(s.ar, s.en)}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: TXT }}>{s.value}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "features" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
              {features.map((f, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: BG2, borderRadius: 12, padding: "14px 16px",
                  border: `1px solid ${BORDER}`,
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 10,
                    background: `rgba(6,182,212,0.1)`, border: `1px solid rgba(6,182,212,0.2)`,
                    display: "flex", alignItems: "center", justifyContent: "center", color: CYAN,
                  }}>{f.icon}</div>
                  <span style={{ fontSize: 14, color: TXT2, fontWeight: 500 }}>{t(f.ar, f.en)}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "reviews" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
              {mockReviews.map((r, i) => (
                <div key={i} style={{
                  background: BG2, borderRadius: 14, padding: "18px 20px",
                  border: `1px solid ${BORDER}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: `linear-gradient(135deg, ${CYAN}20, ${INDIGO}20)`,
                        display: "flex", alignItems: "center", justifyContent: "center", color: CYAN,
                      }}><User size={16} /></div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: TXT }}>{t(r.name.ar, r.name.en)}</div>
                        <div style={{ fontSize: 11, color: TXT3 }}>{r.date}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 3 }}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={13} fill={j < r.rating ? "#F59E0B" : "none"} color={j < r.rating ? "#F59E0B" : TXT3} />
                      ))}
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: TXT2, lineHeight: 1.6 }}>{t(r.text.ar, r.text.en)}</p>
                </div>
              ))}
            </div>
          )}

          {/* Price + Book */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: BG2, borderRadius: 16, padding: "20px 24px",
            border: `1px solid ${BORDER}`,
          }}>
            <div>
              <span style={{ fontSize: 12, color: TXT3 }}>{t("السعر اليومي", "Daily Price")}</span>
              <div style={{ fontSize: 30, fontWeight: 900, color: CYAN, fontFamily: heading }}>
                {car.pricePerDay} <span style={{ fontSize: 14, fontWeight: 500, color: TXT3 }}>{t("جنيه", "EGP")}</span>
              </div>
            </div>
            <button onClick={() => onBook(car.id)} style={{
              padding: "16px 40px", borderRadius: 14,
              background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
              color: "#fff", border: "none", fontWeight: 700, fontSize: 16,
              cursor: "pointer", fontFamily: heading, boxShadow: GLOW_CYAN,
              display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "")}>
              <Calendar size={18} />
              {t("احجز الآن", "Book Now")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ══════════════════════════════════════════════════════════════════════════════
// BOOKING / SUBSCRIPTION FLOW (6 Steps)
// ══════════════════════════════════════════════════════════════════════════════
interface BookingFlowProps {
  onClose: () => void;
  initialCarId?: number | null;
  mode: "booking" | "subscription";
  planName?: string;
}

const locations = [
  { id: "cairo-nasr", ar: "مدينة نصر - القاهرة", en: "Nasr City - Cairo" },
  { id: "cairo-maadi", ar: "المعادي - القاهرة", en: "Maadi - Cairo" },
  { id: "cairo-heliopolis", ar: "مصر الجديدة - القاهرة", en: "Heliopolis - Cairo" },
  { id: "giza-haram", ar: "الهرم - الجيزة", en: "Haram - Giza" },
  { id: "alex-center", ar: "وسط الإسكندرية", en: "Alexandria Center" },
  { id: "cairo-airport", ar: "مطار القاهرة الدولي", en: "Cairo Int'l Airport" },
  { id: "newcairo", ar: "القاهرة الجديدة - التجمع", en: "New Cairo - 5th Settlement" },
];

const extras = [
  { id: "gps", ar: "جهاز ملاحة GPS", en: "GPS Navigator", price: 50, icon: <Navigation size={18} /> },
  { id: "childseat", ar: "مقعد أطفال", en: "Child Seat", price: 75, icon: <BabySeat size={18} /> },
  { id: "driver", ar: "سائق خاص", en: "Private Driver", price: 350, icon: <User size={18} /> },
  { id: "wifi", ar: "واي فاي متنقل", en: "Mobile WiFi", price: 40, icon: <Radio size={18} /> },
  { id: "insurance_plus", ar: "تأمين إضافي شامل", en: "Extended Insurance", price: 120, icon: <Shield size={18} /> },
  { id: "delivery", ar: "توصيل للموقع", en: "Location Delivery", price: 100, icon: <Car size={18} /> },
];

export function BookingFlow({ onClose, initialCarId, mode, planName }: BookingFlowProps) {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [step, setStep] = useState(1);
  const [selectedCar, setSelectedCar] = useState<number | null>(initialCarId || null);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLoc, setPickupLoc] = useState("");
  const [returnLoc, setReturnLoc] = useState("");
  const [sameReturn, setSameReturn] = useState(true);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", idNumber: "", notes: "" });
  const [payMethod, setPayMethod] = useState<"cash" | "card" | "wallet">("card");
  const [confirmed, setConfirmed] = useState(false);
  const [carFilter, setCarFilter] = useState("all");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const car = cars.find(c => c.id === selectedCar);
  const days = pickupDate && returnDate ? Math.max(1, Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / 86400000)) : 1;
  const extrasTotal = extras.filter(e => selectedExtras.includes(e.id)).reduce((s, e) => s + e.price, 0) * days;
  const carPrice = car ? car.pricePerDay * days : 0;
  const total = carPrice + extrasTotal;

  const cats = [
    { id: "all", ar: "الكل", en: "All" },
    { id: "economy", ar: "اقتصادية", en: "Economy" },
    { id: "luxury", ar: "فاخرة", en: "Luxury" },
    { id: "suv", ar: "دفع رباعي", en: "SUV" },
    { id: "sports", ar: "رياضية", en: "Sports" },
  ];
  const filteredCars = carFilter === "all" ? cars : cars.filter(c => c.category === carFilter);

  const canNext = () => {
    if (step === 1) return !!selectedCar;
    if (step === 2) return !!selectedCar;
    if (step === 3) return !!pickupDate && !!returnDate && !!pickupLoc && (sameReturn || !!returnLoc);
    if (step === 4) return true;
    if (step === 5) return !!formData.name && !!formData.phone && !!formData.email;
    return true;
  };

  const stepLabels = [
    { ar: "نوع الخدمة", en: "Service Type" },
    { ar: "اختيار السيارة", en: "Select Car" },
    { ar: "التاريخ والموقع", en: "Date & Location" },
    { ar: "الإضافات", en: "Add-ons" },
    { ar: "البيانات الشخصية", en: "Personal Info" },
    { ar: "التأكيد والدفع", en: "Confirmation" },
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 16px", borderRadius: 12,
    border: `1.5px solid ${BORDER2}`, fontSize: 14, outline: "none",
    boxSizing: "border-box", fontFamily: body, color: TXT,
    background: BG, transition: "all 0.2s",
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: BG, borderRadius: 24, maxWidth: 780, width: "100%",
        maxHeight: "92vh", overflow: "auto", position: "relative",
        border: `1px solid ${BORDER}`, boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          padding: "20px 28px", borderBottom: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, background: BG, zIndex: 10, borderRadius: "24px 24px 0 0",
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: TXT, fontFamily: heading }}>
              {mode === "subscription"
                ? t(`اشتراك ${planName || ""}`, `${planName || ""} Subscription`)
                : t("حجز سيارة", "Book a Car")}
            </h3>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: TXT3 }}>
              {t(`الخطوة ${step} من 6`, `Step ${step} of 6`)}
            </p>
          </div>
          <button onClick={onClose} style={{
            width: 40, height: 40, borderRadius: 10,
            background: BG2, border: `1px solid ${BORDER}`, color: TXT2,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><X size={18} /></button>
        </div>

        {/* Progress */}
        <div style={{ padding: "16px 28px 0", display: "flex", gap: 4 }}>
          {stepLabels.map((s, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                height: 4, width: "100%", borderRadius: 4,
                background: i + 1 <= step ? `linear-gradient(90deg, ${CYAN}, ${INDIGO})` : BORDER,
                transition: "all 0.4s",
              }} />
              <span style={{ fontSize: 10, color: i + 1 <= step ? CYAN : TXT3, fontWeight: 600, textAlign: "center" }}>
                {t(s.ar, s.en)}
              </span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: "24px 28px 28px", minHeight: 400 }}>

          {/* ── Step 1: Service Type ── */}
          {step === 1 && (
            <div>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 20 }}>
                {t("اختر نوع الخدمة", "Choose Service Type")}
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { id: "daily", icon: <Calendar size={24} />, ar: "تأجير يومي", en: "Daily Rental", desc: { ar: "إيجار بالأيام", en: "Rent by days" } },
                  { id: "weekly", icon: <Clock size={24} />, ar: "تأجير أسبوعي", en: "Weekly Rental", desc: { ar: "خصم 15%", en: "15% off" } },
                  { id: "monthly", icon: <Package size={24} />, ar: "تأجير شهري", en: "Monthly Rental", desc: { ar: "خصم 30%", en: "30% off" } },
                  { id: "airport", icon: <Navigation size={24} />, ar: "خدمة المطار", en: "Airport Service", desc: { ar: "استلام من المطار", en: "Airport pickup" } },
                ].map(s => (
                  <button key={s.id} onClick={() => { setSelectedCar(initialCarId || null); setStep(2); }} style={{
                    padding: "24px 20px", borderRadius: 16, background: BG2,
                    border: `1.5px solid ${BORDER}`, cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                    textAlign: "center", transition: "all 0.3s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = CYAN; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = GLOW_CYAN; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14,
                      background: `linear-gradient(135deg, ${CYAN}15, ${INDIGO}10)`,
                      border: `1px solid ${CYAN}20`, color: CYAN,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>{s.icon}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: TXT, fontFamily: heading }}>{t(s.ar, s.en)}</div>
                      <div style={{ fontSize: 12, color: TXT3, marginTop: 4 }}>{t(s.desc.ar, s.desc.en)}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 2: Choose Car ── */}
          {step === 2 && (
            <div>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 16 }}>
                {t("اختر السيارة", "Choose Your Car")}
              </h4>
              {/* Filters */}
              <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                {cats.map(c => (
                  <button key={c.id} onClick={() => setCarFilter(c.id)} style={{
                    padding: "7px 18px", borderRadius: 8,
                    background: carFilter === c.id ? `linear-gradient(135deg, ${CYAN}, ${INDIGO})` : "transparent",
                    border: `1px solid ${carFilter === c.id ? "transparent" : BORDER}`,
                    color: carFilter === c.id ? "#fff" : TXT3,
                    fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: heading,
                  }}>{t(c.ar, c.en)}</button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxHeight: 400, overflow: "auto" }}>
                {filteredCars.map(c => {
                  const active = selectedCar === c.id;
                  return (
                    <button key={c.id} onClick={() => setSelectedCar(c.id)} style={{
                      background: active ? `rgba(6,182,212,0.06)` : BG2,
                      borderRadius: 14, overflow: "hidden", cursor: "pointer",
                      border: `2px solid ${active ? CYAN : BORDER}`,
                      textAlign: isRTL ? "right" : "left",
                      transition: "all 0.2s", padding: 0,
                      boxShadow: active ? GLOW_CYAN : "none",
                    }}>
                      <div style={{ position: "relative", height: 110 }}>
                        <img src={c.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(2,6,23,0.9))" }} />
                        {active && (
                          <div style={{
                            position: "absolute", top: 8, [isRTL ? "left" : "right"]: 8,
                            width: 26, height: 26, borderRadius: 8,
                            background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}><Check size={14} color="#fff" /></div>
                        )}
                      </div>
                      <div style={{ padding: "10px 12px" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 4 }}>
                          {t(c.name.ar, c.name.en)}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: 11, color: TXT3 }}>{c.seats} {t("مقاعد", "seats")} · {t(c.fuel.ar, c.fuel.en)}</span>
                          <span style={{ fontSize: 13, fontWeight: 800, color: CYAN }}>{c.pricePerDay} {t("ج", "EGP")}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Step 3: Date & Location ── */}
          {step === 3 && (
            <div>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 20 }}>
                {t("حدد التاريخ والموقع", "Set Date & Location")}
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, color: TXT2, fontWeight: 600, marginBottom: 7 }}>
                    {t("تاريخ الاستلام", "Pickup Date")}
                  </label>
                  <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)}
                    style={{ ...inputStyle, colorScheme: "dark" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, color: TXT2, fontWeight: 600, marginBottom: 7 }}>
                    {t("تاريخ الإرجاع", "Return Date")}
                  </label>
                  <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)}
                    style={{ ...inputStyle, colorScheme: "dark" }} />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, color: TXT2, fontWeight: 600, marginBottom: 7 }}>
                  {t("موقع الاستلام", "Pickup Location")}
                </label>
                <select value={pickupLoc} onChange={e => setPickupLoc(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="">{t("اختر الموقع", "Choose location")}</option>
                  {locations.map(l => (
                    <option key={l.id} value={l.id}>{t(l.ar, l.en)}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <button onClick={() => setSameReturn(!sameReturn)} style={{
                  width: 22, height: 22, borderRadius: 6,
                  background: sameReturn ? `linear-gradient(135deg, ${CYAN}, ${INDIGO})` : "transparent",
                  border: `2px solid ${sameReturn ? CYAN : BORDER2}`,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {sameReturn && <Check size={12} color="#fff" />}
                </button>
                <span style={{ fontSize: 14, color: TXT2 }}>{t("الإرجاع في نفس الموقع", "Return at same location")}</span>
              </div>

              {!sameReturn && (
                <div>
                  <label style={{ display: "block", fontSize: 13, color: TXT2, fontWeight: 600, marginBottom: 7 }}>
                    {t("موقع الإرجاع", "Return Location")}
                  </label>
                  <select value={returnLoc} onChange={e => setReturnLoc(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">{t("اختر الموقع", "Choose location")}</option>
                    {locations.map(l => (
                      <option key={l.id} value={l.id}>{t(l.ar, l.en)}</option>
                    ))}
                  </select>
                </div>
              )}

              {pickupDate && returnDate && days > 0 && (
                <div style={{
                  marginTop: 20, background: `rgba(6,182,212,0.06)`, borderRadius: 12,
                  padding: "14px 18px", border: `1px solid rgba(6,182,212,0.15)`,
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <Clock size={16} color={CYAN} />
                  <span style={{ fontSize: 14, color: TXT2 }}>
                    {t(`المدة: ${days} ${days > 1 ? "أيام" : "يوم"}`, `Duration: ${days} day${days > 1 ? "s" : ""}`)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* ── Step 4: Extras ── */}
          {step === 4 && (
            <div>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 6 }}>
                {t("الإضافات والخدمات", "Add-ons & Services")}
              </h4>
              <p style={{ fontSize: 13, color: TXT3, marginBottom: 20 }}>
                {t("اختر الإضافات التي تحتاجها (اختياري)", "Select add-ons you need (optional)")}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {extras.map(e => {
                  const active = selectedExtras.includes(e.id);
                  return (
                    <button key={e.id} onClick={() => toggleExtra(e.id)} style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "16px 18px", borderRadius: 14,
                      background: active ? `rgba(6,182,212,0.06)` : BG2,
                      border: `1.5px solid ${active ? CYAN : BORDER}`,
                      cursor: "pointer", textAlign: isRTL ? "right" : "left",
                      transition: "all 0.2s",
                      boxShadow: active ? `0 0 12px rgba(6,182,212,0.15)` : "none",
                    }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                        background: active ? `linear-gradient(135deg, ${CYAN}, ${INDIGO})` : `${CYAN}10`,
                        border: active ? "none" : `1px solid ${CYAN}20`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: active ? "#fff" : CYAN,
                      }}>{e.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: TXT }}>{t(e.ar, e.en)}</div>
                        <div style={{ fontSize: 12, color: CYAN, fontWeight: 600 }}>{e.price} {t("جنيه/يوم", "EGP/day")}</div>
                      </div>
                      <div style={{
                        width: 24, height: 24, borderRadius: 7, flexShrink: 0,
                        background: active ? `linear-gradient(135deg, ${CYAN}, ${INDIGO})` : "transparent",
                        border: `2px solid ${active ? CYAN : BORDER2}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {active && <Check size={13} color="#fff" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Step 5: Personal Info ── */}
          {step === 5 && (
            <div>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 20 }}>
                {t("البيانات الشخصية", "Personal Information")}
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, color: TXT2, fontWeight: 600, marginBottom: 7 }}>
                    {t("الاسم الكامل", "Full Name")} *
                  </label>
                  <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t("أدخل اسمك", "Enter your name")} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, color: TXT2, fontWeight: 600, marginBottom: 7 }}>
                    {t("رقم الهاتف", "Phone Number")} *
                  </label>
                  <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+20 1XX XXX XXXX" style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, color: TXT2, fontWeight: 600, marginBottom: 7 }}>
                    {t("البريد الإلكتروني", "Email")} *
                  </label>
                  <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@email.com" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, color: TXT2, fontWeight: 600, marginBottom: 7 }}>
                    {t("رقم الهوية/جواز السفر", "ID/Passport Number")}
                  </label>
                  <input value={formData.idNumber} onChange={e => setFormData({ ...formData, idNumber: e.target.value })}
                    placeholder={t("اختياري", "Optional")} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, color: TXT2, fontWeight: 600, marginBottom: 7 }}>
                  {t("ملاحظات إضافية", "Additional Notes")}
                </label>
                <textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  rows={3} placeholder={t("أي طلبات خاصة...", "Any special requests...")}
                  style={{ ...inputStyle, resize: "none" }} />
              </div>

              {/* Payment Method */}
              <h5 style={{ fontSize: 15, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 14 }}>
                {t("طريقة الدفع", "Payment Method")}
              </h5>
              <div style={{ display: "flex", gap: 12 }}>
                {([
                  { id: "card" as const, ar: "بطاقة ائتمان", en: "Credit Card", icon: <CreditCard size={20} /> },
                  { id: "cash" as const, ar: "نقداً", en: "Cash", icon: <FileText size={20} /> },
                  { id: "wallet" as const, ar: "محفظة إلكترونية", en: "E-Wallet", icon: <Phone size={20} /> },
                ]).map(pm => (
                  <button key={pm.id} onClick={() => setPayMethod(pm.id)} style={{
                    flex: 1, padding: "16px", borderRadius: 14, cursor: "pointer",
                    background: payMethod === pm.id ? `rgba(6,182,212,0.06)` : BG2,
                    border: `2px solid ${payMethod === pm.id ? CYAN : BORDER}`,
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                    transition: "all 0.2s",
                    boxShadow: payMethod === pm.id ? `0 0 12px rgba(6,182,212,0.15)` : "none",
                  }}>
                    <div style={{ color: payMethod === pm.id ? CYAN : TXT3 }}>{pm.icon}</div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: payMethod === pm.id ? TXT : TXT3 }}>{t(pm.ar, pm.en)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 6: Confirmation ── */}
          {step === 6 && !confirmed && (
            <div>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 20 }}>
                {t("مراجعة وتأكيد", "Review & Confirm")}
              </h4>

              {car && (
                <div style={{
                  display: "flex", gap: 16, background: BG2, borderRadius: 16,
                  padding: 16, border: `1px solid ${BORDER}`, marginBottom: 20,
                }}>
                  <img src={car.image} alt="" style={{ width: 140, height: 95, borderRadius: 12, objectFit: "cover" }} />
                  <div style={{ flex: 1 }}>
                    <h5 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, color: TXT, fontFamily: heading }}>
                      {t(car.name.ar, car.name.en)}
                    </h5>
                    <div style={{ display: "flex", gap: 14, fontSize: 12, color: TXT3, marginBottom: 8 }}>
                      <span>{car.seats} {t("مقاعد", "seats")}</span>
                      <span>{t(car.transmission.ar, car.transmission.en)}</span>
                      <span>{t(car.fuel.ar, car.fuel.en)}</span>
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 800, color: CYAN }}>{car.pricePerDay} {t("جنيه/يوم", "EGP/day")}</span>
                  </div>
                </div>
              )}

              {/* Booking details */}
              <div style={{
                background: BG2, borderRadius: 14, padding: "18px 20px",
                border: `1px solid ${BORDER}`, marginBottom: 20,
              }}>
                {[
                  { label: { ar: "الاسم", en: "Name" }, val: formData.name },
                  { label: { ar: "الهاتف", en: "Phone" }, val: formData.phone },
                  { label: { ar: "البريد", en: "Email" }, val: formData.email },
                  { label: { ar: "الاستلام", en: "Pickup" }, val: pickupDate ? `${pickupDate} · ${locations.find(l => l.id === pickupLoc)?.[isRTL ? "ar" : "en"] || ""}` : "-" },
                  { label: { ar: "الإرجاع", en: "Return" }, val: returnDate || "-" },
                  { label: { ar: "المدة", en: "Duration" }, val: `${days} ${t("يوم", "day" + (days > 1 ? "s" : ""))}` },
                  { label: { ar: "الدفع", en: "Payment" }, val: payMethod === "card" ? t("بطاقة ائتمان", "Credit Card") : payMethod === "cash" ? t("نقداً", "Cash") : t("محفظة", "Wallet") },
                ].map((r, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", padding: "8px 0",
                    borderBottom: i < 6 ? `1px solid ${BORDER}` : "none",
                  }}>
                    <span style={{ fontSize: 13, color: TXT3 }}>{t(r.label.ar, r.label.en)}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: TXT }}>{r.val}</span>
                  </div>
                ))}
              </div>

              {/* Extras */}
              {selectedExtras.length > 0 && (
                <div style={{
                  background: BG2, borderRadius: 14, padding: "14px 20px",
                  border: `1px solid ${BORDER}`, marginBottom: 20,
                }}>
                  <h6 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: TXT }}>{t("الإضافات", "Add-ons")}</h6>
                  {extras.filter(e => selectedExtras.includes(e.id)).map(e => (
                    <div key={e.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13 }}>
                      <span style={{ color: TXT2 }}>{t(e.ar, e.en)}</span>
                      <span style={{ color: CYAN, fontWeight: 600 }}>{e.price * days} {t("جنيه", "EGP")}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Total */}
              <div style={{
                background: `linear-gradient(135deg, rgba(6,182,212,0.08), rgba(79,70,229,0.08))`,
                borderRadius: 14, padding: "18px 22px",
                border: `1px solid rgba(6,182,212,0.2)`, marginBottom: 4,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: TXT3 }}>{t("سعر السيارة", "Car Price")}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: TXT }}>{carPrice} {t("جنيه", "EGP")}</span>
                </div>
                {extrasTotal > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: TXT3 }}>{t("الإضافات", "Add-ons")}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: TXT }}>{extrasTotal} {t("جنيه", "EGP")}</span>
                  </div>
                )}
                <div style={{ borderTop: `1px solid rgba(6,182,212,0.2)`, paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: TXT }}>{t("الإجمالي", "Total")}</span>
                  <span style={{ fontSize: 24, fontWeight: 900, color: CYAN, fontFamily: heading }}>{total} {t("جنيه", "EGP")}</span>
                </div>
              </div>
            </div>
          )}

          {/* Confirmed success */}
          {step === 6 && confirmed && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%", margin: "0 auto 24px",
                background: `linear-gradient(135deg, ${GREEN}20, ${GREEN}08)`,
                border: `2px solid ${GREEN}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 0 30px ${GREEN}20`,
              }}>
                <CheckCircle size={40} color={GREEN} />
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 10 }}>
                {mode === "subscription" ? t("تم الاشتراك بنجاح!", "Subscribed Successfully!") : t("تم الحجز بنجاح!", "Booking Confirmed!")}
              </h3>
              <p style={{ fontSize: 15, color: TXT2, marginBottom: 8, lineHeight: 1.7 }}>
                {t("سيتم إرسال تفاصيل الحجز على بريدك الإلكتروني ورقم هاتفك", "Booking details will be sent to your email and phone")}
              </p>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 32,
                background: `rgba(6,182,212,0.08)`, border: `1px solid rgba(6,182,212,0.2)`,
                borderRadius: 12, padding: "10px 20px",
              }}>
                <FileText size={16} color={CYAN} />
                <span style={{ fontSize: 14, fontWeight: 700, color: CYAN }}>
                  #{Math.random().toString(36).substring(2, 10).toUpperCase()}
                </span>
              </div>
              <br />
              <button onClick={onClose} style={{
                padding: "14px 40px", borderRadius: 14,
                background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
                color: "#fff", border: "none", fontWeight: 700, fontSize: 15,
                cursor: "pointer", fontFamily: heading, boxShadow: GLOW_CYAN,
              }}>{t("إغلاق", "Close")}</button>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        {!(step === 6 && confirmed) && (
          <div style={{
            padding: "16px 28px 24px", borderTop: `1px solid ${BORDER}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            position: "sticky", bottom: 0, background: BG,
          }}>
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} style={{
                padding: "12px 26px", borderRadius: 12,
                background: "transparent", border: `1.5px solid ${BORDER2}`,
                color: TXT2, fontWeight: 600, fontSize: 14, cursor: "pointer",
                fontFamily: heading, display: "flex", alignItems: "center", gap: 8,
              }}>
                {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
                {t("السابق", "Back")}
              </button>
            ) : <div />}
            
            {step < 6 ? (
              <button onClick={() => canNext() && setStep(step + 1)} style={{
                padding: "12px 32px", borderRadius: 12,
                background: canNext() ? `linear-gradient(135deg, ${CYAN}, ${INDIGO})` : BG3,
                color: canNext() ? "#fff" : TXT3, border: "none",
                fontWeight: 700, fontSize: 14, cursor: canNext() ? "pointer" : "not-allowed",
                fontFamily: heading, display: "flex", alignItems: "center", gap: 8,
                boxShadow: canNext() ? GLOW_CYAN : "none", opacity: canNext() ? 1 : 0.5,
                transition: "all 0.2s",
              }}>
                {t("التالي", "Next")}
                {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </button>
            ) : (
              <button onClick={() => setConfirmed(true)} style={{
                padding: "14px 40px", borderRadius: 12,
                background: `linear-gradient(135deg, ${GREEN}, ${CYAN_D})`,
                color: "#fff", border: "none", fontWeight: 700, fontSize: 15,
                cursor: "pointer", fontFamily: heading,
                display: "flex", alignItems: "center", gap: 8,
                boxShadow: `0 0 20px rgba(16,185,129,0.3)`,
              }}>
                <Lock size={16} />
                {t("تأكيد ودفع", "Confirm & Pay")} · {total} {t("جنيه", "EGP")}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

