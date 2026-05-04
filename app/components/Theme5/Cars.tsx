import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { useFonts, BG2, TXT, BG3, PAD } from "@/app/themes/theme5/page";
import { BORDER, TXT3, CARD, TXT2 } from "@/app/themes/theme5/page";
import { CYAN, INDIGO, GLOW_CYAN, BORDER2 } from "@/app/themes/theme5/page";
import { Layers, Star, Users, Settings, Fuel } from "lucide-react";
import { useState } from "react";

export default function Cars({ onDetail, onBook }: { onDetail: (id: number) => void; onBook: (carId?: number) => void }) {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [filter, setFilter] = useState("all");
  const cats = [
    { id: "all", ar: "الكل", en: "All" },
    { id: "economy", ar: "اقتصادية", en: "Economy" },
    { id: "luxury", ar: "فاخرة", en: "Luxury" },
    { id: "suv", ar: "دفع رباعي", en: "SUV" },
    { id: "sports", ar: "رياضية", en: "Sports" },
  ];

  const filtered = filter === "all" ? cars : cars.filter(c => c.category === filter);

  return (
    <section id="cars" style={{ position: "relative", background: BG2, padding: PAD, overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 40 }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: `rgba(6,182,212,0.08)`, border: `1px solid rgba(6,182,212,0.15)`,
              borderRadius: 20, padding: "6px 16px", marginBottom: 14,
            }}>
              <Layers size={14} color={CYAN} />
              <span style={{ fontSize: 13, fontWeight: 600, color: CYAN }}>{t("أسطول السيارات", "Car Fleet")}</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: TXT, fontFamily: heading, margin: 0 }}>
              {t("كل السيارات", "All Cars")}
            </h2>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c.id} onClick={() => setFilter(c.id)} style={{
              padding: "9px 22px", borderRadius: 10,
              background: filter === c.id ? `linear-gradient(135deg, ${CYAN}, ${INDIGO})` : "transparent",
              border: `1px solid ${filter === c.id ? "transparent" : BORDER}`,
              color: filter === c.id ? "#fff" : TXT3,
              fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: heading,
              transition: "all 0.2s",
              boxShadow: filter === c.id ? GLOW_CYAN : "none",
            }}>{t(c.ar, c.en)}</button>
          ))}
        </div>

        {/* Cars Grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20,
        }}>
          {filtered.map(car => (
            <div key={car.id} style={{
              background: CARD, borderRadius: 18, overflow: "hidden",
              border: `1px solid ${BORDER}`, transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(6,182,212,0.25)`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ position: "relative", height: 190 }}>
                <img src={car.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(15,23,42,0.95))" }} />
                <div style={{
                  position: "absolute", top: 12, [isRTL ? "left" : "right"]: 12,
                  display: "flex", alignItems: "center", gap: 4,
                  background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
                  borderRadius: 8, padding: "4px 8px",
                }}>
                  <Star size={12} fill="#F59E0B" color="#F59E0B" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#F59E0B" }}>{car.rating}</span>
                </div>
              </div>
              <div style={{ padding: "16px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 10 }}>
                  <h4 style={{ margin: 0, color: TXT, fontWeight: 700, fontSize: 15, fontFamily: heading }}>{t(car.name.ar, car.name.en)}</h4>
                  <span style={{ fontSize: 11, color: TXT3, background: BG3, borderRadius: 6, padding: "3px 8px", fontWeight: 600 }}>{car.year}</span>
                </div>
                <div style={{ display: "flex", gap: 14, fontSize: 12, color: TXT3, marginBottom: 14 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={12} /> {car.seats}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Settings size={12} /> {t(car.transmission.ar, car.transmission.en)}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Fuel size={12} /> {t(car.fuel.ar, car.fuel.en)}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${BORDER}`, paddingTop: 14 }}>
                  <span style={{ fontWeight: 800, color: CYAN, fontSize: 16 }}>{car.pricePerDay} <span style={{ fontSize: 11, fontWeight: 500, color: TXT3 }}>{t("جنيه/يوم", "EGP/day")}</span></span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => onDetail(car.id)} style={{
                      padding: "8px 14px", borderRadius: 10,
                      background: "transparent", border: `1px solid ${BORDER2}`,
                      color: TXT2, fontWeight: 600, fontSize: 12,
                      cursor: "pointer", fontFamily: heading, transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = CYAN; e.currentTarget.style.color = CYAN; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER2; e.currentTarget.style.color = TXT2; }}>{t("التفاصيل", "Details")}</button>
                    <button onClick={() => onBook(car.id)} style={{
                      padding: "8px 16px", borderRadius: 10,
                      background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
                      color: "#fff", border: "none", fontWeight: 700, fontSize: 12,
                      cursor: "pointer", fontFamily: heading, transition: "all 0.2s",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "")}>{t("احجز", "Book")}</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}