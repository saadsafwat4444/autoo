import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { BG, PAD } from "@/app/themes/theme7/page";
import { useFonts} from "@/app/themes/theme8/page";
import { AMB, pad, TX, TX2, W, BD, TX3 } from "@/app/themes/theme8/page";
import { O, OBG, OD, OL } from "@/app/themes/theme8/page";
import { ArrowLeft, ArrowRight, Lightbulb, Car, Users, Settings, Fuel, Star } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const { t, isRTL } = useAppContext();
  const { h, b } = useFonts();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [activeIdx, setActiveIdx] = useState(0);
  const featuredCars = [cars[0], cars[1], cars[2]].filter(Boolean);
  const activeCar = featuredCars[activeIdx];

  return (
    <section style={{ position: "relative", overflow: "hidden", background: BG, padding:PAD}}>
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: -120, [isRTL ? "left" : "right"]: -120, width: 380, height: 380, borderRadius: "50%", background: `${O}06`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, [isRTL ? "right" : "left"]: -80, width: 260, height: 260, borderRadius: "50%", background: `${AMB}06`, pointerEvents: "none" }} />

      <div style={{ ...pad, position: "relative", zIndex: 2 }}>
        {/* Top section: text + featured car */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 50, alignItems: "center", minHeight: "calc(100vh - 80px)", padding: "0 48px", paddingBottom: 40 }}>
          {/* Left: Copy */}
          <div style={{ animation: "t8fi 0.6s ease-out" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: OBG, border: `1px solid ${O}20`,
              borderRadius: 50, padding: "8px 20px", marginBottom: 28,
              fontSize: 13, fontWeight: 700, color: O,
            }}>
              <Lightbulb size={15} />
              {t("تأجير سيارات ذكي", "Smart Car Rental")}
            </div>

            <h1 style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", fontWeight: 900, fontFamily: h,
              color: TX, lineHeight: 1.15, marginBottom: 20,
            }}>
              {t("كل موقف له", "Every Situation")}<br />
              <span style={{ color: O }}>{t("السيارة المناسبة", "Has the Right Car")}</span>
            </h1>

            <p style={{
              fontSize: 16, color: TX2, lineHeight: 1.9,
              marginBottom: 36, maxWidth: 440,
            }}>
              {t(
                "أخبرنا بموقفك — سفر، عمل، مناسبة، أو رحلة — وسنساعدك في اختيار السيارة المناسبة فوراً بدون تعقيد",
                "Tell us your situation — travel, work, event, or trip — and we'll help you choose the right car instantly"
              )}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
              <button onClick={() => document.getElementById("situations")?.scrollIntoView({ behavior: "smooth" })} style={{
                padding: "16px 34px", borderRadius: 14, background: O, color: "#fff", border: "none",
                fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: h,
                display: "flex", alignItems: "center", gap: 10,
                boxShadow: "0 8px 30px rgba(249,115,22,0.25)",
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = OD; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = O; e.currentTarget.style.transform = ""; }}>
                {t("اختر موقفك", "Choose Your Situation")} <Arrow size={16} />
              </button>
              <button onClick={() => document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" })} style={{
                padding: "16px 28px", borderRadius: 14,
                background: W, color: TX,
                border: `1.5px solid ${BD}`,
                fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: h,
                display: "flex", alignItems: "center", gap: 8,
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = O; e.currentTarget.style.color = O; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BD; e.currentTarget.style.color = TX; }}>
                <Car size={15} /> {t("تصفح السيارات", "Browse Cars")}
              </button>
            </div>

            {/* Trust stats */}
            <div style={{ display: "flex", gap: 32 }}>
              {[
                { val: "5,000+", ar: "عميل راضي", en: "Happy Clients" },
                { val: "200+", ar: "سيارة متاحة", en: "Cars Available" },
                { val: "4.9", ar: "تقييم العملاء", en: "Client Rating" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: O, fontFamily: h }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: TX3, fontWeight: 600 }}>{t(s.ar, s.en)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Featured car showcase */}
          <div style={{ animation: "t8fi 0.8s ease-out" }}>
            {activeCar && (
              <div style={{
                position: "relative", borderRadius: 28, overflow: "hidden",
                background: W, boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                border: `1px solid ${BD}`,
              }}>
                <div style={{ position: "relative" }}>
                  <img src={activeCar.image} alt="" style={{ width: "100%", height: 320, objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)" }} />
                  {/* Price badge */}
                  <div style={{
                    position: "absolute", top: 16, [isRTL ? "left" : "right"]: 16,
                    background: O, color: "#fff", borderRadius: 14,
                    padding: "10px 18px", display: "flex", flexDirection: "column", alignItems: "center",
                  }}>
                    <span style={{ fontSize: 22, fontWeight: 900, fontFamily: h }}>{activeCar.pricePerDay}</span>
                    <span style={{ fontSize: 10, opacity: 0.8 }}>{t("ج.م/يوم", "EGP/day")}</span>
                  </div>
                  {/* Car name overlay */}
                  <div style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: h }}>{t(activeCar.name.ar, activeCar.name.en)}</h3>
                  </div>
                </div>

                {/* Specs row */}
                <div style={{ display: "flex", justifyContent: "space-around", padding: "18px 20px", borderBottom: `1px solid ${BD}` }}>
                  {[
                    { icon: <Users size={15} />, val: `${activeCar.seats}`, label: t("مقاعد", "Seats") },
                    { icon: <Settings size={15} />, val: t(activeCar.transmission.ar, activeCar.transmission.en), label: t("ناقل", "Trans.") },
                    { icon: <Fuel size={15} />, val: t(activeCar.fuel.ar, activeCar.fuel.en), label: t("وقود", "Fuel") },
                    { icon: <Star size={15} />, val: `${activeCar.rating}`, label: t("تقييم", "Rating") },
                  ].map((sp, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{ color: O, marginBottom: 4, display: "flex", justifyContent: "center" }}>{sp.icon}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: TX }}>{sp.val}</div>
                      <div style={{ fontSize: 9, color: TX3, marginTop: 1 }}>{sp.label}</div>
                    </div>
                  ))}
                </div>

                {/* Car thumbnails selector */}
                <div style={{ display: "flex", gap: 10, padding: "16px 20px" }}>
                  {featuredCars.map((fc, i) => (
                    <div key={fc.id} onClick={() => setActiveIdx(i)} style={{
                      flex: 1, borderRadius: 14, overflow: "hidden", cursor: "pointer",
                      border: activeIdx === i ? `2.5px solid ${O}` : `2px solid ${BD}`,
                      opacity: activeIdx === i ? 1 : 0.6,
                      transition: "all 0.3s",
                    }}>
                      <img src={fc.image} alt="" style={{ width: "100%", height: 64, objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${O}, ${AMB}, ${OL})` }} />
    </section>
  );
}