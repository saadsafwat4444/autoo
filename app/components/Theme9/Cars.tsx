import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { PAD, useFonts } from "@/app/themes/theme9/page";
import { W, pad, TX, BD, TX2, TX3 } from "@/app/themes/theme9/page";
import { Personality, VBG, V, CAR_QUOTES, VD } from "@/app/themes/theme9/page";
import { ArrowLeft, ArrowRight, Car, MessageSquare, Users, Fuel, Settings } from "lucide-react";
import { useState } from "react";

export default function Cars({ activePersonality, onBook }: { activePersonality: Personality | null; onBook: (car: typeof cars[0]) => void }) {
  const { t, isRTL } = useAppContext();
  const { h } = useFonts();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [detailCar, setDetailCar] = useState<typeof cars[0] | null>(null);

  const displayCars = activePersonality
    ? cars.filter(c => activePersonality.carIds.includes(c.id))
    : cars.slice(0, 6);

  return (
    <section id="cars" style={{ padding: PAD, background: W }}>
      <div style={pad}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 12 }}>
          <div>
            {activePersonality ? (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: `${activePersonality.color}12`, marginBottom: 12 }}>
                <span style={{ color: activePersonality.color }}>{activePersonality.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: activePersonality.color }}>
                  {t(activePersonality.ar, activePersonality.en)} {t("بيقولك:", "says:")}
                </span>
              </div>
            ) : (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: VBG, marginBottom: 12 }}>
                <Car size={14} color={V} />
                <span style={{ fontSize: 13, fontWeight: 700, color: V }}>{t("السيارات", "Cars")}</span>
              </div>
            )}
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: TX, fontFamily: h, margin: 0 }}>
              {activePersonality
                ? t(`${activePersonality.ar}: السيارات المناسبة ليك`, `${activePersonality.en}: Cars Matched For You`)
                : t("السيارات بتقدّم نفسها", "Cars Introducing Themselves")}
            </h2>
          </div>
        </div>

        {/* Car grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {displayCars.map(car => {
            const quote = CAR_QUOTES[car.id];
            const pColor = activePersonality?.color || V;
            return (
              <div key={car.id} style={{
                borderRadius: 24, overflow: "hidden", background: W,
                border: `1.5px solid ${BD}`, transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 48px ${pColor}12`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
                {/* Image */}
                <div style={{ position: "relative", height: 190 }}>
                  <img src={car.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  {/* Speech bubble overlay */}
                  {quote && (
                    <div style={{
                      position: "absolute", bottom: 12, left: 12, right: 12,
                      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)",
                      borderRadius: 14, borderBottomLeftRadius: 4, padding: "10px 14px",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <MessageSquare size={11} color={pColor} />
                        <span style={{ fontSize: 10, fontWeight: 700, color: pColor }}>{t(car.name.ar, car.name.en)}</span>
                      </div>
                      <p style={{ fontSize: 12, color: TX2, margin: 0, fontStyle: "italic", lineHeight: 1.5 }}>
                        "{t(quote.ar, quote.en)}"
                      </p>
                    </div>
                  )}
                </div>
                {/* Info */}
                <div style={{ padding: "18px 20px" }}>
                  <h4 style={{ fontSize: 16, fontWeight: 800, color: TX, fontFamily: h, marginBottom: 8 }}>{t(car.name.ar, car.name.en)}</h4>
                  <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: TX3 }}><Users size={12} /> {car.seats}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: TX3 }}><Fuel size={12} /> {t(car.fuel.ar, car.fuel.en)}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: TX3 }}><Settings size={12} /> {t(car.transmission.ar, car.transmission.en)}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ fontSize: 20, fontWeight: 900, color: V, fontFamily: h }}>{car.pricePerDay}</span>
                      <span style={{ fontSize: 12, color: TX3 }}> {t("ج.م/يوم", "EGP/day")}</span>
                    </div>
                    <button onClick={() => onBook(car)} style={{
                      padding: "10px 20px", borderRadius: 12, background: V, color: W,
                      border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: h,
                      display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = VD; }}
                      onMouseLeave={e => { e.currentTarget.style.background = V; }}>
                      {t("اختارني", "Pick Me")} <Arrow size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}