import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { BG, BG2, PAD, TXT, useFonts } from "@/app/themes/theme5/page";
import { tripCategories, TXT3, BORDER, TXT2, CARD } from "@/app/themes/theme5/page";
import { GridBG, INDIGO_L, CYAN, GLOW_CYAN, INDIGO } from "@/app/themes/theme5/page";
import { Cpu, Sparkles, Users, Settings, Fuel } from "lucide-react";
import { useState } from "react";

export default function AiSection({ onBook, onDetail }: { onBook: (carId?: number) => void; onDetail: (id: number) => void }) {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = selected
    ? cars.filter(c => tripCategories.find(tc => tc.id === selected)?.cats.includes(c.category))
    : [];

  return (
    <section id="ai" style={{ position: "relative", background: BG, padding: PAD, overflow: "hidden" }}>
      <GridBG />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ marginBottom: 52 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `rgba(79,70,229,0.1)`, border: `1px solid rgba(79,70,229,0.2)`,
            borderRadius: 20, padding: "6px 16px", marginBottom: 16,
          }}>
            <Cpu size={14} color={INDIGO_L} />
            <span style={{ fontSize: 13, fontWeight: 600, color: INDIGO_L }}>{t("محرك التوصيات", "Recommendation Engine")}</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 12 }}>
            {t("ما الذي تحتاجه اليوم؟", "What do you need today?")}
          </h2>
          <p style={{ color: TXT3, fontSize: 15, maxWidth: 500, margin: "0 auto", fontFamily: body }}>
            {t("اختر نوع رحلتك وسنقترح لك السيارات المناسبة فوراً", "Choose your trip type and we'll instantly suggest matching cars")}
          </p>
        </div>

        {/* Trip cards */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
          {tripCategories.map(tc => {
            const active = selected === tc.id;
            return (
              <button key={tc.id} onClick={() => setSelected(active ? null : tc.id)} style={{
                padding: "16px 28px", borderRadius: 16,
                background: active ? `linear-gradient(135deg, ${tc.color}20, ${tc.color}08)` : BG2,
                border: `1.5px solid ${active ? tc.color : BORDER}`,
                color: active ? tc.color : TXT2,
                fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading,
                display: "flex", alignItems: "center", gap: 10,
                transition: "all 0.3s",
                boxShadow: active ? `0 0 20px ${tc.color}20` : "none",
              }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = tc.color + "60"; e.currentTarget.style.color = tc.color; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TXT2; } }}>
                {tc.icon}
                {t(tc.ar, tc.en)}
              </button>
            );
          })}
        </div>

        {/* Results */}
        {selected && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, justifyContent: "center" }}>
              <Sparkles size={18} color={CYAN} />
              <span style={{ fontSize: 16, fontWeight: 700, color: TXT, fontFamily: heading }}>
                {t("السيارات المناسبة لك", "Cars recommended for you")}
              </span>
              <span style={{
                background: `rgba(6,182,212,0.1)`, color: CYAN,
                padding: "4px 12px", borderRadius: 10, fontSize: 12, fontWeight: 700,
              }}>{filtered.length} {t("سيارة", "cars")}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {filtered.slice(0, 3).map(car => (
                <div key={car.id} style={{
                  background: CARD, borderRadius: 18, overflow: "hidden",
                  border: `1px solid ${BORDER}`, transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(6,182,212,0.3)`; e.currentTarget.style.boxShadow = GLOW_CYAN; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = ""; }}>
                  <div style={{ position: "relative", height: 180 }}>
                    <img src={car.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(2,6,23,0.9))" }} />
                    <div style={{
                      position: "absolute", top: 12, [isRTL ? "left" : "right"]: 12,
                      background: "rgba(6,182,212,0.15)", backdropFilter: "blur(8px)",
                      borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: CYAN,
                      border: "1px solid rgba(6,182,212,0.2)",
                    }}>AI {t("موصى", "Pick")}</div>
                  </div>
                  <div style={{ padding: "16px 18px" }}>
                    <h4 style={{ margin: "0 0 8px", color: TXT, fontWeight: 700, fontSize: 16, fontFamily: heading }}>{t(car.name.ar, car.name.en)}</h4>
                    <div style={{ display: "flex", gap: 16, fontSize: 12, color: TXT3, marginBottom: 14 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={13} /> {car.seats}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Settings size={13} /> {t(car.transmission.ar, car.transmission.en)}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Fuel size={13} /> {t(car.fuel.ar, car.fuel.en)}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 800, color: CYAN, fontSize: 16 }}>{car.pricePerDay} <span style={{ fontSize: 12, fontWeight: 500, color: TXT3 }}>{t("جنيه/يوم", "EGP/day")}</span></span>
                      <button onClick={() => onBook(car.id)} style={{
                        padding: "8px 16px", borderRadius: 10,
                        background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
                        color: "#fff", border: "none", fontWeight: 700, fontSize: 12,
                        cursor: "pointer", fontFamily: heading,
                      }}>{t("احجز", "Book")}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}