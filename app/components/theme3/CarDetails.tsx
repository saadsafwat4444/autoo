import { useAppContext } from "@/app/contexts/AppContext";
import { BG2, BG3, GOLD, TXT, TXT_DIM, useFonts } from "@/app/themes/theme2/page";
import { sportsCars, RED, TXT_MUTED } from "@/app/themes/theme3/page";
import { X } from "lucide-react";

export default function CarDetail({ car, onClose, onBook }: { car: typeof sportsCars[0]; onClose: () => void; onBook: () => void }) {
  const { t } = useAppContext();
  const { heading, body } = useFonts();

  const specs = [
    { ar: "المحرك", en: "Engine", val: t(car.engine.ar, car.engine.en) },
    { ar: "القوة", en: "Power", val: `${car.hp} HP` },
    { ar: "السرعة القصوى", en: "Top Speed", val: `${car.topSpeed} km/h` },
    { ar: "0-100", en: "0-100", val: car.zero100 },
    { ar: "المقاعد", en: "Seats", val: `${car.seats}` },
    { ar: "الموديل", en: "Year", val: `${car.year}` },
  ];

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: BG2, borderRadius: 4, width: "min(720px, 95vw)", maxHeight: "90vh", overflow: "auto", border: `1px solid ${RED}30` }}>
        {/* Image */}
        <div style={{ position: "relative", height: 300 }}>
          <img src={car.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(17,17,17,1) 0%, transparent 60%)" }} />
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.6)", border: "none", borderRadius: 4, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X size={18} color={TXT} />
          </button>
          <div style={{ position: "absolute", bottom: 24, left: 28 }}>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: TXT, fontFamily: heading }}>{t(car.name.ar, car.name.en)}</h2>
          </div>
        </div>

        <div style={{ padding: "24px 28px" }}>
          {/* Specs Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
            {specs.map((s, i) => (
              <div key={i} style={{ background: BG3, borderRadius: 4, padding: "14px 16px", borderLeft: `3px solid ${RED}` }}>
                <div style={{ fontSize: 10, color: TXT_MUTED, fontWeight: 600, letterSpacing: "0.1em", marginBottom: 4, fontFamily: heading }}>{t(s.ar, s.en)}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: TXT, fontFamily: heading }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* Price + Book */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: BG3, borderRadius: 4, padding: "20px 24px", borderTop: `2px solid ${RED}` }}>
            <div>
              <div style={{ fontSize: 11, color: TXT_MUTED, fontWeight: 600, letterSpacing: "0.1em", fontFamily: heading }}>{t("السعر اليومي", "DAILY RATE")}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: GOLD, fontFamily: heading }}>{car.price.toLocaleString()} <span style={{ fontSize: 14, color: TXT_DIM }}>{t("جنيه/يوم", "EGP/day")}</span></div>
            </div>
            <button onClick={onBook} style={{
              padding: "14px 32px", background: RED, color: "#fff", border: "none",
              fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: heading,
              letterSpacing: "0.1em", borderRadius: 4,
              clipPath: "polygon(0 0, 100% 0, 96% 100%, 4% 100%)",
            }}>{t("احجز السيارة", "BOOK THIS CAR")}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
