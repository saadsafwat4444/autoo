import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { BG, BG2, TXT, useFonts } from "@/app/themes/theme4/page";
import { TXT3, BLUE_BG, BLUE } from "@/app/themes/theme4/page";
import { X, Star } from "lucide-react";

export default function CarDetail({ car, onClose, onBook }: { car: typeof cars[0]; onClose: () => void; onBook: () => void }) {
  const { t } = useAppContext();
  const { heading, body } = useFonts();

  const specs = [
    { ar: "الموديل", en: "Year", val: `${car.year}` },
    { ar: "المقاعد", en: "Seats", val: `${car.seats}` },
    { ar: "ناقل الحركة", en: "Transmission", val: t(car.transmission.ar, car.transmission.en) },
    { ar: "الوقود", en: "Fuel", val: t(car.fuel.ar, car.fuel.en) },
    { ar: "التقييم", en: "Rating", val: `${car.rating} / 5` },
    { ar: "المراجعات", en: "Reviews", val: `${car.reviews}` },
  ];

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: BG, borderRadius: 20, width: "min(700px, 95vw)", maxHeight: "90vh", overflow: "auto" }}>
        <div style={{ position: "relative", height: 300 }}>
          <img src={car.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px 20px 0 0" }} />
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: BG, border: "none", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <X size={18} color={TXT} />
          </button>
        </div>
        <div style={{ padding: "24px 28px" }}>
          <h2 style={{ margin: "0 0 6px", fontSize: 24, fontWeight: 800, color: TXT, fontFamily: heading }}>{t(car.name.ar, car.name.en)}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <Star size={14} fill="#F59E0B" color="#F59E0B" />
            <span style={{ fontSize: 14, fontWeight: 600, color: TXT }}>{car.rating}</span>
            <span style={{ fontSize: 13, color: TXT3 }}>({car.reviews} {t("مراجعة", "reviews")})</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
            {specs.map((s, i) => (
              <div key={i} style={{ background: BG2, borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 12, color: TXT3, fontWeight: 500, marginBottom: 4 }}>{t(s.ar, s.en)}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: TXT, fontFamily: heading }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div style={{ background: BLUE_BG, borderRadius: 12, padding: "20px", marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: 28, fontWeight: 800, color: TXT }}>{car.pricePerDay}</span>
                <span style={{ fontSize: 14, color: TXT3 }}> {t("جنيه/يوم", "EGP/day")}</span>
                <div style={{ fontSize: 13, color: TXT3, marginTop: 4 }}>{(car.pricePerDay * 6).toLocaleString()} {t("جنيه/أسبوع", "EGP/week")}</div>
              </div>
              <button onClick={onBook} style={{
                padding: "14px 32px", borderRadius: 10, background: BLUE, color: "#fff",
                border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer",
                fontFamily: heading, boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
              }}>{t("احجز السيارة", "Book This Car")}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}