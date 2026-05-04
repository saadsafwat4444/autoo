"use client";

import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { DARK, MID_GRAY, OFF_WHITE, PAD } from "@/app/themes/theme1/page";
import { useRouter } from "next/navigation";
import { ArrowRight, Bot, Briefcase, Moon, Mountain, Star, Users } from "lucide-react";
import { useState } from "react";
import BookingDialog from "./BookingDialog";

export default function AIAssistant() {
  const { t, lang, accent } = useAppContext();
  const router = useRouter();
  const ff    = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isRTL = lang === "ar";
  const [selected, setSelected] = useState(0);
  const [aiBookCar, setAiBookCar] = useState<typeof cars[0] | null>(null);

  const tripTypes = [
    { Icon: Briefcase, ar: "رحلة عمل",    en: "Business Trip"   },
    { Icon: Users,     ar: "عائلية",       en: "Family Trip"     },
    { Icon: Moon,      ar: "رحلة ليلية",  en: "Night Trip"      },
    { Icon: Mountain,  ar: "مغامرة",       en: "Adventure"       },
  ];

  return (
    <section style={{ background: `linear-gradient(180deg, #fff 0%, ${OFF_WHITE} 100%)`,padding: PAD, fontFamily: ff, direction: isRTL ? "rtl" : "ltr"}}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding:  "0 48px"}}>

        {/* Header */}
        <div style={{  marginBottom: 52 }}>
          {/* <div style={{ width: 56, height: 56, background: `linear-gradient(135deg, ${accent}20, ${accent}08)`, border: `1.5px solid ${accent}30`, borderRadius: 16, display: "flex", alignItems: "center", margin: "0 auto 20px" }}>
            <Bot size={24} color={accent} />
          </div> */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 24, height: 2, background: accent, borderRadius: 2 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              {t("مساعد الرحلة", "Trip Assistant")}
            </span>
            <div style={{ width: 24, height: 2, background: accent, borderRadius: 2 }} />
          </div>
          <h2 style={{ margin: 0, fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 900, color: "#0A0A1A", letterSpacing: "-0.04em", lineHeight: 1.05 }}>
            {t("ما طبيعة رحلتك؟", "What's your trip like?")}
          </h2>
          <p style={{ marginTop: 14, fontSize: 15, color: "#6B7280", lineHeight: 1.7 }}>
            {t("اختر نوع رحلتك ونوصيك بأفضل سيارة تناسبها.", "Choose your trip type and we'll recommend the best car for it.")}
          </p>
        </div>

        {/* Trip type grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 40 }}>
          {tripTypes.map((trip, i) => {
            const active = selected === i;
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                style={{
                  padding: "28px 24px",
                  background: active ? accent : "#ffffff",
                  border: `1px solid ${active ? accent : "rgba(0,0,0,0.09)"}`,
                  cursor: "pointer", fontFamily: ff,
                  textAlign: isRTL ? "right" : "left",
                  transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
                  display: "flex", flexDirection: "column", gap: 12,
                  borderRadius: 14,
                  boxShadow: active ? `0 8px 32px ${accent}30` : "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{
                  width: 44, height: 44,
                  background: active ? "rgba(255,255,255,0.2)" : `${accent}12`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.25s", borderRadius: 10,
                }}>
                  <trip.Icon size={20} color={active ? "#fff" : accent} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: active ? "#fff" : "#1A1A2E", letterSpacing: "-0.01em" }}>
                  {t(trip.ar, trip.en)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Recommendation */}
        {(() => {
          const recMap: Record<number, { carsAr: string; carsEn: string; ids: number[] }> = {
            0: { carsAr: "BMW الفئة الخامسة، مرسيدس E-Class، أودي A6", carsEn: "BMW 5 Series, Mercedes E-Class, Audi A6", ids: [1,2,7] },
            1: { carsAr: "تويوتا لاند كروزر، نيسان باترول، تويوتا هايلاندر", carsEn: "Toyota Land Cruiser, Nissan Patrol, Toyota Highlander", ids: [3,9,12] },
            2: { carsAr: "بورش بوكستر، بنتلي بنتاياجا، رينج روفر فوج", carsEn: "Porsche Boxster, Bentley Bentayga, Range Rover Vogue", ids: [4,6,10] },
            3: { carsAr: "تويوتا لاند كروزر، نيسان باترول، رينج روفر فوج", carsEn: "Toyota Land Cruiser, Nissan Patrol, Range Rover Vogue", ids: [3,9,10] },
          };
          const rec = recMap[selected];
          return (
            <div style={{ background: `${accent}08`, border: `1.5px solid ${accent}22`, borderRadius: 14, padding: "20px 24px", marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <Bot size={16} color={accent} />
                <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>{t("توصيتنا لك","Our Recommendation")}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {rec.ids.map(id => {
                  const c = cars.find(x => x.id === id);
                  if (!c) return null;
                  return (
                    <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", transition: "border-color 0.18s, box-shadow 0.18s", cursor: "pointer", flexDirection: isRTL ? "row-reverse" : "row" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.boxShadow = `0 4px 16px ${accent}15`; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                      <img src={c.image} alt="" style={{ width: 72, height: 52, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                      <div style={{ flex: 1, textAlign: isRTL ? "right" : "left" }}>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: DARK, letterSpacing: "-0.01em" }}>{t(c.name.ar, c.name.en)}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3, flexDirection: isRTL ? "row-reverse" : "row" }}>
                          <span style={{ fontSize: 12, color: MID_GRAY }}>{c.year}</span>
                          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#D1D5DB" }} />
                          <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, color: "#F59E0B" }}>
                            <Star size={10} fill="#F59E0B" color="#F59E0B" />{c.rating}
                          </span>
                          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#D1D5DB" }} />
                          <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>{c.pricePerDay.toLocaleString()} {t("ج.م","EGP")}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); setAiBookCar(c); }}
                        style={{ padding: "8px 16px", background: accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: ff, whiteSpace: "nowrap", flexShrink: 0, display: "flex", alignItems: "center", gap: 5, transition: "opacity 0.18s" }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                      >
                        {t("احجز الآن","Book Now")}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => router.push("/cars")}
            style={{
              padding: "15px 40px", background: accent, color: "#fff", border: "none",
              fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: ff,
              display: "inline-flex", alignItems: "center", gap: 10, borderRadius: 10,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            {t("اعرض السيارات المناسبة", "Show Matching Cars")}
            <ArrowRight size={16} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
          </button>
        </div>
      </div>
      {aiBookCar && <BookingDialog car={aiBookCar} onClose={() => setAiBookCar(null)} />}
    </section>
  );
}
