import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { useFonts, BG, TXT, PAD } from "@/app/themes/theme4/page";
import { TXT3, BLUE, BORDER, BLUE_BG, TXT2 } from "@/app/themes/theme4/page";
import { Star, Users, Settings, Fuel } from "lucide-react";
import { useState } from "react";
import BookingDialog from "./BookingDialog";
import CarDetail from "./CarDetails";

export default function Cars() {
  const { t } = useAppContext();
  const { heading, body } = useFonts();
  const [filter, setFilter] = useState("all");
  const [detailCar, setDetailCar] = useState<typeof cars[0] | null>(null);
  const [bookCar, setBookCar] = useState<typeof cars[0] | null>(null);

  const filters = [
    ["all", t("الكل", "All")],
    ["economy", t("اقتصادية", "Economy")],
    ["suv", t("دفع رباعي", "SUV")],
    ["luxury", t("فاخرة", "Luxury")],
  ];
  const filtered = filter === "all" ? cars : cars.filter(c => c.category === filter);

  return (
    <section id="cars" style={{ background: BG, padding: PAD }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
          <div>
            <h2 style={{ fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 6 }}>
              {t("السيارات المتاحة", "Available Cars")}
            </h2>
            <p style={{ color: TXT3, fontSize: 15, fontFamily: body, margin: 0 }}>{t(`${filtered.length} سيارة متاحة`, `${filtered.length} cars available`)}</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {filters.map(([v, l]) => (
              <button key={v} onClick={() => setFilter(v)} style={{
                padding: "8px 18px", borderRadius: 8, fontFamily: heading,
                border: `1.5px solid ${filter === v ? BLUE : BORDER}`,
                background: filter === v ? BLUE_BG : BG,
                color: filter === v ? BLUE : TXT3,
                fontWeight: 600, cursor: "pointer", fontSize: 13,
                transition: "all 0.2s",
              }}>{l}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {filtered.map(car => (
            <div key={car.id} style={{
              background: BG, borderRadius: 14, overflow: "hidden",
              border: `1px solid ${BORDER}`, transition: "all 0.25s",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = ""; }}>
              <div style={{ position: "relative", height: 200 }}>
                <img src={car.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{
                  position: "absolute", top: 12, left: 12, background: BG, borderRadius: 6,
                  padding: "4px 10px", fontSize: 12, fontWeight: 600, color: BLUE, fontFamily: heading,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}>{car.category.toUpperCase()}</div>
                <div style={{
                  position: "absolute", top: 12, right: 12, background: BG, borderRadius: 6,
                  padding: "4px 8px", display: "flex", alignItems: "center", gap: 4,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}>
                  <Star size={12} fill="#F59E0B" color="#F59E0B" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: TXT }}>{car.rating}</span>
                </div>
              </div>
              <div style={{ padding: "18px 20px" }}>
                <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 700, color: TXT, fontFamily: heading }}>{t(car.name.ar, car.name.en)}</h3>
                <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                  {[
                    { icon: <Users size={14} />, val: `${car.seats} ${t("مقاعد", "Seats")}` },
                    { icon: <Settings size={14} />, val: t(car.transmission.ar, car.transmission.en) },
                    { icon: <Fuel size={14} />, val: t(car.fuel.ar, car.fuel.en) },
                  ].map((item, j) => (
                    <span key={j} style={{ fontSize: 13, color: TXT3, display: "flex", alignItems: "center", gap: 4 }}>{item.icon} {item.val}</span>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${BORDER}`, paddingTop: 16 }}>
                  <div>
                    <span style={{ fontSize: 22, fontWeight: 800, color: TXT }}>{car.pricePerDay}</span>
                    <span style={{ fontSize: 13, color: TXT3 }}> {t("جنيه/يوم", "EGP/day")}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setDetailCar(car)} style={{
                      padding: "9px 16px", borderRadius: 8, border: `1.5px solid ${BORDER}`,
                      background: BG, color: TXT2, fontWeight: 600, cursor: "pointer",
                      fontSize: 13, fontFamily: heading, transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.color = BLUE; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TXT2; }}>
                      {t("التفاصيل", "Details")}
                    </button>
                    <button onClick={() => setBookCar(car)} style={{
                      padding: "9px 20px", borderRadius: 8, background: BLUE, color: "#fff",
                      border: "none", fontWeight: 600, cursor: "pointer", fontSize: 13,
                      fontFamily: heading,
                    }}>{t("احجز", "Book")}</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {bookCar && <BookingDialog car={bookCar} onClose={() => setBookCar(null)} />}
      {detailCar && <CarDetail car={detailCar} onClose={() => setDetailCar(null)} onBook={() => { setBookCar(detailCar); setDetailCar(null); }} />}
    </section>
  );
}
