import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { useFonts, BG2, BG, PAD } from "@/app/themes/theme7/page";
import { pad, TX, TX3, P, PD, W, TX2, BD, PL } from "@/app/themes/theme7/page";
import { Gauge, Zap, Crown, Car, Settings, Users, Fuel, Eye, ChevronDown } from "lucide-react";
import { useState } from "react";
import BookingModal from "./BookingModel";

export default function Cars() {
  const { t, isRTL } = useAppContext();
  const {  h, b } = useFonts();
  const [filter, setFilter] = useState("all");
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const filters = [
    { id: "all", ar: "الكل", en: "All", icon: <Gauge size={14} /> },
    { id: "economy", ar: "اقتصادية", en: "Economy", icon: <Zap size={14} /> },
    { id: "luxury", ar: "فاخرة", en: "Luxury", icon: <Crown size={14} /> },
    { id: "suv", ar: "SUV", en: "SUV", icon: <Car size={14} /> },
  ];

  const filtered = filter === "all" ? cars : cars.filter(c => c.category === filter);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const car = selectedCar !== null ? cars.find(c => c.id === selectedCar) || null : null;

  const handleFilterChange = (id: string) => { setFilter(id); setVisibleCount(6); };

  return (
    <section id="cars" style={{ background: `linear-gradient(180deg, ${BG2} 0%, ${BG} 100%)`, padding: PAD }}>
      <div style={pad}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 44, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: TX, fontFamily: h, marginBottom: 6 }}>{t("السيارات في مدينتك", "Cars in Your City")}</h2>
            <p style={{ fontSize: 14, color: TX3 }}>{t(`${filtered.length} سيارة متاحة`, `${filtered.length} cars available`)}</p>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {filters.map(f => (
              <button key={f.id} onClick={() => handleFilterChange(f.id)} style={{
                padding: "10px 20px", borderRadius: 30,
                background: filter === f.id ? `linear-gradient(135deg, ${P}, ${PD})` : W,
                color: filter === f.id ? "#fff" : TX2,
                border: filter === f.id ? "none" : `1.5px solid ${BD}`,
                fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: h, transition: "all 0.25s",
                display: "flex", alignItems: "center", gap: 6,
                boxShadow: filter === f.id ? `0 4px 18px ${P}30` : "none",
              }}>{f.icon} {t(f.ar, f.en)}</button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18, gridAutoRows: "minmax(200px, auto)" }}>
          {visible.map((c, i) => {
            const isLg = i === 0 && visibleCount <= 9;
            const span = isLg ? 8 : 4;
            return (
              <div key={c.id} style={{
                gridColumn: `span ${span}`, gridRow: isLg ? "span 2" : "span 1",
                borderRadius: 24, overflow: "hidden", position: "relative",
                background: W, border: `1px solid ${BD}`, cursor: "pointer", transition: "all 0.35s",
              }}
                onClick={() => setSelectedCar(c.id)}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 50px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
                <img src={c.image} alt="" style={{ width: "100%", height: isLg ? "100%" : 200, objectFit: "cover", position: isLg ? "absolute" : "relative", inset: isLg ? 0 : undefined }} />
                <div style={{
                  position: isLg ? "absolute" : "relative", inset: isLg ? 0 : undefined,
                  background: isLg ? "linear-gradient(180deg, transparent 30%, rgba(17,24,39,0.85))" : "transparent",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  padding: isLg ? "32px 36px" : "18px 20px",
                }}>
                  <div style={{ position: "absolute", top: 0, [isRTL ? "left" : "right"]: 0, background: P, color: "#fff", padding: "8px 20px 8px 26px", fontSize: 11, fontWeight: 700, clipPath: isRTL ? "polygon(20px 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 100%, 20px 100%)" }}>{c.year}</div>
                  <h3 style={{ fontSize: isLg ? 26 : 16, fontWeight: 800, color: isLg ? "#fff" : TX, fontFamily: h, marginBottom: 8 }}>{t(c.name.ar, c.name.en)}</h3>
                  <div style={{ display: "flex", gap: 14, marginBottom: isLg ? 16 : 10 }}>
                    <span style={{ fontSize: 12, color: isLg ? "rgba(255,255,255,0.7)" : TX3, display: "flex", alignItems: "center", gap: 4 }}><Settings size={12} /> {t(c.transmission.ar, c.transmission.en)}</span>
                    <span style={{ fontSize: 12, color: isLg ? "rgba(255,255,255,0.7)" : TX3, display: "flex", alignItems: "center", gap: 4 }}><Users size={12} /> {c.seats}</span>
                    <span style={{ fontSize: 12, color: isLg ? "rgba(255,255,255,0.7)" : TX3, display: "flex", alignItems: "center", gap: 4 }}><Fuel size={12} /> {t(c.fuel.ar, c.fuel.en)}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ fontSize: isLg ? 28 : 20, fontWeight: 900, color: isLg ? PL : P, fontFamily: h }}>{c.pricePerDay}</span>
                      <span style={{ fontSize: 12, color: isLg ? "rgba(255,255,255,0.5)" : TX3, marginLeft: 4, marginRight: isRTL ? 4 : 0 }}>{t("ج.م/يوم", "EGP/day")}</span>
                    </div>
                    <div style={{ padding: "8px 18px", borderRadius: 30, background: isLg ? "rgba(255,255,255,0.15)" : `${P}08`, color: isLg ? "#fff" : P, fontSize: 12, fontWeight: 700, backdropFilter: isLg ? "blur(8px)" : "none", border: isLg ? "1px solid rgba(255,255,255,0.2)" : `1.5px solid ${P}20`, display: "flex", alignItems: "center", gap: 6 }}>
                      <Eye size={13} /> {t("التفاصيل", "Details")}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        {hasMore && (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button onClick={() => setVisibleCount(prev => prev + 6)} style={{
              padding: "14px 40px", borderRadius: 30,
              background: W, color: P, border: `2px solid ${P}20`,
              fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: h,
              display: "inline-flex", alignItems: "center", gap: 8,
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = `${P}06`; e.currentTarget.style.borderColor = P; }}
              onMouseLeave={e => { e.currentTarget.style.background = W; e.currentTarget.style.borderColor = `${P}20`; }}>
              <ChevronDown size={16} />
              {t(`عرض المزيد (${filtered.length - visibleCount} سيارة)`, `Load More (${filtered.length - visibleCount} cars)`)}
            </button>
          </div>
        )}

        {/* Show count info */}
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <span style={{ fontSize: 12, color: TX3 }}>
            {t(`عرض ${Math.min(visibleCount, filtered.length)} من ${filtered.length}`, `Showing ${Math.min(visibleCount, filtered.length)} of ${filtered.length}`)}
          </span>
        </div>
      </div>

      {/* Booking Modal */}
      {car && <BookingModal car={car} onClose={() => setSelectedCar(null)} isRTL={isRTL} t={t} h={h} b={b} mode="car" />}
    </section>
  );
}