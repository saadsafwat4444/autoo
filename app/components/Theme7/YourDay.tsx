import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { AMB, BD, BLU, GRN, P, PAD, pad, PINK, TX, TX2, TX3, useFonts, W } from "@/app/themes/theme7/page";
import { Briefcase, ShoppingBag, Coffee, PartyPopper, Plane, Compass, X, Users, Fuel, Star } from "lucide-react";
import { useState } from "react";

export default function YourDay() {
  const { t, isRTL } = useAppContext();
  const { h } = useFonts();
  const [activeAct, setActiveAct] = useState<number | null>(null);
  const activities = [
    { ar: "اجتماع عمل", en: "Business", icon: <Briefcase size={22} />, color: P, recCars: [0, 3, 9], desc: { ar: "سيارات أنيقة لاجتماعاتك", en: "Elegant cars for meetings" } },
    { ar: "تسوق", en: "Shopping", icon: <ShoppingBag size={22} />, color: PINK, recCars: [1, 5, 7], desc: { ar: "سيارات مريحة للتسوق", en: "Comfy cars for shopping" } },
    { ar: "عشاء", en: "Dinner", icon: <Coffee size={22} />, color: AMB, recCars: [0, 2, 4], desc: { ar: "أناقة لأمسيتك", en: "Style for your evening" } },
    { ar: "مناسبة", en: "Event", icon: <PartyPopper size={22} />, color: GRN, recCars: [2, 8, 10], desc: { ar: "اصنع انطباعاً مميزاً", en: "Make an impression" } },
    { ar: "المطار", en: "Airport", icon: <Plane size={22} />, color: BLU, recCars: [1, 6, 11], desc: { ar: "وصول بأعلى راحة", en: "Arrive in comfort" } },
  ];
  const act = activeAct !== null ? activities[activeAct] : null;
  return (
    <section id="your-day" style={{ background: W, padding: PAD, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: `radial-gradient(${P} 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />
      <div style={{ ...pad, position: "relative" }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 800, color: P, marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}><Compass size={16} />{t("يومك في المدينة", "Your Day in the City")}</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900, color: TX, fontFamily: h }}>{t("ما خطتك اليوم؟", "What's Your Plan Today?")}</h2>
        </div>
        <div style={{ position: "relative", marginBottom: 50 }}>
          <div style={{ position: "absolute", top: 38, left: "10%", right: "10%", height: 3, background: `linear-gradient(90deg, ${P}20, ${PINK}20, ${AMB}20, ${GRN}20, ${BLU}20)`, borderRadius: 10, zIndex: 0 }} />
          <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1, padding: "0 5%" }}>
            {activities.map((a, i) => {
              const isActive = activeAct === i;
              return (
                <div key={i} onClick={() => setActiveAct(activeAct === i ? null : i)} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", transition: "all 0.4s" }}>
                  <div style={{ width: isActive ? 76 : 64, height: isActive ? 76 : 64, borderRadius: "50%", background: isActive ? a.color : W, border: `4px solid ${isActive ? a.color : a.color + "40"}`, display: "flex", alignItems: "center", justifyContent: "center", color: isActive ? "#fff" : a.color, transition: "all 0.4s ease", boxShadow: isActive ? `0 8px 30px ${a.color}40, 0 0 0 8px ${a.color}10` : "none", transform: isActive ? "scale(1.1)" : "" }}>
                    {a.icon}
                  </div>
                  <div style={{ marginTop: 14, fontSize: 14, fontWeight: 700, fontFamily: h, color: isActive ? a.color : TX2, transition: "color 0.3s" }}>{t(a.ar, a.en)}</div>
                  {isActive && <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, marginTop: 8 }} />}
                </div>
              );
            })}
          </div>
        </div>
        {act && (
          <div style={{ animation: "t7su 0.4s ease-out" }}>
            <div style={{ borderRadius: 28, padding: 32, background: `${act.color}05`, border: `2px solid ${act.color}15` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: act.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{act.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: TX, fontFamily: h }}>{t("سيارات مقترحة لـ", "Suggested Cars for")} {t(act.ar, act.en)}</h3>
                    <p style={{ fontSize: 13, color: TX3 }}>{t(act.desc.ar, act.desc.en)}</p>
                  </div>
                </div>
                <button onClick={() => setActiveAct(null)} style={{ width: 38, height: 38, borderRadius: "50%", background: W, border: `1.5px solid ${BD}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} color={TX3} /></button>
              </div>
              <div className="t7-noscroll" style={{ display: "flex", gap: 18, overflowX: "auto", padding: "4px 0" }}>
                {act.recCars.map((ci, ri) => {
                  const cr = cars[ci]; if (!cr) return null;
                  return (
                    <div key={ri} style={{ minWidth: 280, borderRadius: 22, overflow: "hidden", background: W, border: `1.5px solid ${BD}`, transition: "all 0.3s", flexShrink: 0 }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 14px 40px ${act.color}15`; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
                      <div style={{ position: "relative" }}>
                        <img src={cr.image} alt="" style={{ width: "100%", height: 150, objectFit: "cover" }} />
                        <div style={{ position: "absolute", bottom: -16, [isRTL ? "left" : "right"]: 16, background: act.color, color: "#fff", padding: "6px 14px", borderRadius: 30, fontSize: 12, fontWeight: 800, boxShadow: `0 4px 12px ${act.color}40` }}>
                          {cr.pricePerDay} {t("ج.م", "EGP")}
                        </div>
                      </div>
                      <div style={{ padding: "24px 18px 18px" }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: TX, fontFamily: h, marginBottom: 8 }}>{t(cr.name.ar, cr.name.en)}</div>
                        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                          <span style={{ fontSize: 11, color: TX3, display: "flex", alignItems: "center", gap: 4 }}><Users size={11} /> {cr.seats}</span>
                          <span style={{ fontSize: 11, color: TX3, display: "flex", alignItems: "center", gap: 4 }}><Fuel size={11} /> {t(cr.fuel.ar, cr.fuel.en)}</span>
                          <span style={{ fontSize: 11, color: TX3, display: "flex", alignItems: "center", gap: 4 }}><Star size={11} fill={AMB} color={AMB} /> {cr.rating}</span>
                        </div>
                        <button onClick={() => document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" })} style={{ width: "100%", padding: "10px", borderRadius: 12, background: `${act.color}08`, color: act.color, border: `1.5px solid ${act.color}25`, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: h }}>
                          {t("احجز الآن", "Book Now")}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}