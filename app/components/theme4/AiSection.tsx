import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { useFonts, BG2, TXT, BG, PAD } from "@/app/themes/theme4/page";
import { BLUE_BG, BLUE, TXT3, BORDER, BLUE_L, TXT2, tripCategories } from "@/app/themes/theme4/page";
import { Sparkles, Users, Settings } from "lucide-react";
import { useState } from "react";
import BookingDialog from "./BookingDialog";
// import BookingDialog from "./BookingDialog";

export default function AiSection() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [selected, setSelected] = useState<string | null>(null);
  const [bookCar, setBookCar] = useState<typeof cars[0] | null>(null);

  const matchedCars = selected
    ? cars.filter(c => tripCategories.find(tc => tc.id === selected)?.cats.includes(c.category))
    : [];

  return (
    <section style={{ background: BG2, padding: PAD }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <div style={{marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: BLUE_BG, borderRadius: 20, padding: "6px 16px", marginBottom: 16 }}>
            <Sparkles size={14} color={BLUE} />
            <span style={{ fontSize: 13, fontWeight: 600, color: BLUE }}>AI</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 8 }}>
            {t("دعنا نساعدك في اختيار السيارة المناسبة", "Tell us what you need")}
          </h2>
          <p style={{ color: TXT3, fontSize: 15, fontFamily: body }}>{t("ما هو هدف رحلتك؟", "What's your trip purpose?")}</p>
        </div>

        {/* Trip Options */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 40 }}>
          {tripCategories.map(cat => (
            <button key={cat.id} onClick={() => setSelected(selected === cat.id ? null : cat.id)} style={{
              padding: "24px 16px", borderRadius: 14, border: `2px solid ${selected === cat.id ? BLUE : BORDER}`,
              background: selected === cat.id ? BLUE_BG : BG, cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { if (selected !== cat.id) e.currentTarget.style.borderColor = BLUE_L; }}
              onMouseLeave={e => { if (selected !== cat.id) e.currentTarget.style.borderColor = BORDER; }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${cat.color}12`, display: "flex", alignItems: "center", justifyContent: "center", color: cat.color }}>
                {cat.icon}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: selected === cat.id ? BLUE : TXT2, fontFamily: heading }}>{t(cat.ar, cat.en)}</span>
            </button>
          ))}
        </div>

        {/* Results */}
        {selected && matchedCars.length > 0 && (
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: TXT2, marginBottom: 20, fontFamily: heading, display: "flex", alignItems: "center", gap: 8 }}>
              <Sparkles size={16} color={BLUE} />
              {t("السيارات المناسبة لهذه الرحلة", "Best cars for this trip")}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {matchedCars.slice(0, 3).map(car => (
                <div key={car.id} style={{
                  background: BG, borderRadius: 14, overflow: "hidden",
                  border: `1px solid ${BORDER}`, transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = ""; }}>
                  <img src={car.image} alt="" style={{ width: "100%", height: 180, objectFit: "cover" }} />
                  <div style={{ padding: "16px 20px" }}>
                    <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: TXT, fontFamily: heading }}>{t(car.name.ar, car.name.en)}</h3>
                    <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                      <span style={{ fontSize: 13, color: TXT3, display: "flex", alignItems: "center", gap: 4 }}><Users size={13} /> {car.seats}</span>
                      <span style={{ fontSize: 13, color: TXT3, display: "flex", alignItems: "center", gap: 4 }}><Settings size={13} /> {t(car.transmission.ar, car.transmission.en)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <span style={{ fontSize: 20, fontWeight: 800, color: TXT }}>{car.pricePerDay}</span>
                        <span style={{ fontSize: 13, color: TXT3 }}> {t("جنيه/يوم", "EGP/day")}</span>
                      </div>
                      <button onClick={() => setBookCar(car)} style={{
                        padding: "8px 20px", borderRadius: 8, background: BLUE, color: "#fff",
                        border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer",
                        fontFamily: heading,
                      }}>{t("احجز", "Book")}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {bookCar && <BookingDialog car={bookCar} onClose={() => setBookCar(null)} />}
    </section>
  );
}