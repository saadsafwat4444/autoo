import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { BG, BORDER, CARD_BG, GREEN, IMG, OLIVE, PAD, SAND, sectionPad, TXT, TXT3, useFonts, WARM } from "@/app/themes/theme6/page";
import { Waves, Mountain, TreePine, Building2, Baby, Compass, Check } from "lucide-react";
import { useState } from "react";

export default function RTripTypes() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [selected, setSelected] = useState<number | null>(null);

  const tripTypes = [
    { icon: <Waves size={28} />, ar: "رحلة بحر", en: "Beach Trip", img: IMG.beach, color: "#0EA5E9", desc: { ar: "شواطئ ساحرة ومياه صافية", en: "Stunning beaches & crystal waters" } },
    { icon: <Mountain size={28} />, ar: "رحلة جبل", en: "Mountain Trip", img: IMG.mountain, color: GREEN, desc: { ar: "مغامرة في قمم الجبال", en: "Adventure at mountain peaks" } },
    { icon: <TreePine size={28} />, ar: "رحلة طبيعة", en: "Nature Trip", img: IMG.oasis, color: OLIVE, desc: { ar: "واحات وصحراء خلابة", en: "Oases & stunning deserts" } },
    { icon: <Building2 size={28} />, ar: "رحلة مدينة", en: "City Trip", img: IMG.city, color: "#8B5CF6", desc: { ar: "استكشف أفضل المدن", en: "Explore the best cities" } },
    { icon: <Baby size={28} />, ar: "رحلة عائلية", en: "Family Trip", img: IMG.family, color: WARM, desc: { ar: "ذكريات عائلية لا تُنسى", en: "Unforgettable family memories" } },
  ];

  const recommendedCars = [
    { id: 3, name: { ar: "تويوتا لاند كروزر", en: "Toyota Land Cruiser" }, type: "SUV", price: 900, img: cars[2].image },
    { id: 11, name: { ar: "هيونداي سوناتا", en: "Hyundai Sonata" }, type: "Sedan", price: 420, img: cars[10].image },
  ];

  return (
    <section id="trips" style={{ background: BG, padding: PAD }}>
      <div style={sectionPad}>
        {/* Section header */}
        <div style={{  marginBottom: 56 }}>
          <span style={{
            display: "inline-flex",alignItems:"center", gap: 8,
            fontSize: 13, fontWeight: 700, color: GREEN,
            background: `${GREEN}10`, padding: "0 48px", borderRadius: 20,
            marginBottom: 14,
          }}>
            <Compass size={14} />
            {t("اختر مغامرتك", "Choose Your Adventure")}
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, color: TXT, fontFamily: heading, marginBottom: 10 }}>
            {t("ما نوع الرحلة التي تبحث عنها؟", "What Kind of Trip Are You Looking For?")}
          </h2>
          <p style={{ color: TXT3, fontSize: 16,  margin:"0 auto",lineHeight: 1.7 }}>
            {t("اختر نوع الرحلة وسنقترح لك أفضل السيارات", "Pick your trip type and we'll suggest the best cars")}
          </p>
        </div>

        {/* Trip cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: selected !== null ? 40 : 0 }}>
          {tripTypes.map((trip, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)} style={{
              position: "relative", borderRadius: 20, overflow: "hidden",
              cursor: "pointer", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              transform: selected === i ? "scale(1.03)" : "scale(1)",
              boxShadow: selected === i ? `0 12px 40px ${trip.color}25` : "0 4px 20px rgba(0,0,0,0.06)",
              border: selected === i ? `2.5px solid ${trip.color}` : `2.5px solid transparent`,
            }}
              onMouseEnter={e => { if (selected !== i) e.currentTarget.style.transform = "translateY(-6px)"; }}
              onMouseLeave={e => { if (selected !== i) e.currentTarget.style.transform = "scale(1)"; }}>
              <img src={trip.img} alt="" style={{ width: "100%", height: 200, objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7) 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 18 }}>
                <div style={{ color: "#fff", marginBottom: 6 }}>{trip.icon}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", fontFamily: heading }}>{t(trip.ar, trip.en)}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 3 }}>{t(trip.desc.ar, trip.desc.en)}</div>
              </div>
              {selected === i && (
                <div style={{
                  position: "absolute", top: 12, right: 12,
                  width: 28, height: 28, borderRadius: "50%",
                  background: trip.color, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Check size={16} color="#fff" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Recommended cars when trip selected */}
        {selected !== null && (
          <div style={{
            background: CARD_BG, borderRadius: 24, padding: 32,
            border: `1px solid ${BORDER}`, boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
            animation: "t6fadeIn 0.4s ease-out",
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 6 }}>
              {t("السيارات المناسبة لـ", "Best Cars for ")}{t(tripTypes[selected].ar, tripTypes[selected].en)}
            </h3>
            <p style={{ fontSize: 14, color: TXT3, marginBottom: 24 }}>
              {t("نقترح هذه السيارات بناءً على نوع الرحلة", "We recommend these cars based on your trip type")}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {recommendedCars.map(c => (
                <div key={c.id} style={{
                  borderRadius: 16, overflow: "hidden", border: `1px solid ${BORDER}`,
                  transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = ""; }}>
                  <img src={c.img} alt="" style={{ width: "100%", height: 160, objectFit: "cover" }} />
                  <div style={{ padding: 18 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: TXT, fontFamily: heading }}>{t(c.name.ar, c.name.en)}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                      <span style={{ fontSize: 13, color: TXT3, background: SAND, padding: "4px 12px", borderRadius: 8 }}>{c.type}</span>
                      <span style={{ fontSize: 15, fontWeight: 800, color: GREEN }}>{c.price} {t("ج.م/يوم", "EGP/day")}</span>
                    </div>
                    <button style={{
                      width: "100%", marginTop: 14, padding: "11px", borderRadius: 12,
                      background: GREEN, color: "#fff", border: "none", fontWeight: 700,
                      fontSize: 14, cursor: "pointer", fontFamily: heading, transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#166534"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = GREEN; }}>
                      {t("احجز هذه السيارة", "Book This Car")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes t6fadeIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </section>
  );
}