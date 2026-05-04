import { useAppContext } from "@/app/contexts/AppContext";
import { Calendar,X, Users, Zap, Fuel, Layers, Star, CreditCard, Check, ArrowRight } from "lucide-react";
import { cars } from  "@/app/data/carDate"
import { Car } from "@/app/types/car";

interface CarDetailsDialogProps {
  car?: Car;
  img?: string;
  onClose?: () => void;
  onBook?: () => void;
}

export default function CarDetailsDialog({ car, img, onClose, onBook }: CarDetailsDialogProps) {
   const { t, lang, accent, isRTL } = useAppContext();
    const isAr = lang === "ar";

  // Return null if no car is provided
  if (!car) {
    return null;
  }

  const specs = [
    { icon: <Calendar size={15} />, label: { ar: "السنة",        en: "Year"         }, value: String(car.year) },
    { icon: <Users    size={15} />, label: { ar: "المقاعد",      en: "Seats"        }, value: `${car.seats} ${t("مقاعد", "seats")}` },
    { icon: car.fuel.en === "Electric" ? <Zap size={15} /> : <Fuel size={15} />,
                                    label: { ar: "الوقود",       en: "Fuel"         }, value: t(car.fuel.ar, car.fuel.en) },
    { icon: <Layers   size={15} />, label: { ar: "ناقل الحركة", en: "Transmission" }, value: t(car.transmission.ar, car.transmission.en) },
    { icon: <Star     size={15} />, label: { ar: "التقييم",      en: "Rating"       }, value: `${car.rating} ★ (${car.reviews} ${t("تقييم", "reviews")})` },
    { icon: <CreditCard size={15} />, label: { ar: "السعر / يوم", en: "Price / Day" }, value: `${car.pricePerDay.toLocaleString()} ${t("جنيه", "EGP")}` },
  ];
 return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, -apple-system, sans-serif", padding: 16 }}>
      <div style={{ background: "#fff", width: "min(680px,100%)", maxHeight: "92vh", overflow: "auto", boxShadow: "0 40px 80px rgba(0,0,0,0.45)", display: "flex", flexDirection: "column", borderRadius: 20 }}>

        {/* Image */}
        <div style={{ position: "relative", height: 280, flexShrink: 0 }}>
          <img src={img || ''} alt={t(car.name.ar, car.name.en)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
          <button onClick={onClose || (() => {})} style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.5)", border: "none", cursor: "pointer", color: "#fff", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>
            <X size={18} />
          </button>
          <div style={{ position: "absolute", bottom: 20, left: 24, right: 24 }}>
            <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              {car.category === "luxury" ? t("فاخر", "Luxury") : car.category === "sports" ? t("رياضي", "Sports") : car.category === "suv" ? t("SUV","SUV") : t("اقتصادي", "Economy")}
            </p>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>{t(car.name.ar, car.name.en)}</h2>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "28px 32px 32px", direction: isAr ? "rtl" : "ltr" }}>

          {/* Specs grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 28 }}>
            {specs.map((sp, i) => (
              <div key={i} style={{ padding: "14px 16px", background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 8 }}>
                <div style={{ color: accent, marginBottom: 6 }}>{sp.icon}</div>
                <p style={{ margin: "0 0 2px", fontSize: 10, color: "#6B7280", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t(sp.label.ar, sp.label.en)}</p>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#111827" }}>{sp.value}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          {car.features && car.features.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>{t("المميزات", "Features")}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {car.features.map((f: any, i: number) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Check size={14} color={accent} />
                    <span style={{ fontSize: 13, color: "#374151" }}>{t(f.ar, f.en)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose || (() => {})} style={{ flex: 1, padding: "13px", border: `2px solid #E5E7EB`, background: "transparent", color: "#374151", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "system-ui, -apple-system, sans-serif", borderRadius: 8 }}>
              {t("عودة", "Go Back")}
            </button>
            <button onClick={onBook || (() => {})} style={{ flex: 2, padding: "13px", background: accent, color: "#fff", border: "none", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "system-ui, -apple-system, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 8 }}>
              {t("احجز الآن", "Book Now")} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
