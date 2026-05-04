import { useAppContext } from "@/app/contexts/AppContext";
import { BG2, BG3, PAD, TXT, TXT_DIM, useFonts } from "@/app/themes/theme3/page";
import { RACE_IMG, SectionBadge, TXT_MUTED, RED } from "@/app/themes/theme3/page";
import { Target, Gauge, Flag, ArrowRight, X, Check } from "lucide-react";
import { useState } from "react";

export default function Experience() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [selectedExp, setSelectedExp] = useState<number | null>(null);

  const experiences = [
    {
      icon: <Target size={28} />, ar: "تجربة الحلبة", en: "Track Experience",
      desc: { ar: "قُد سيارتك المفضلة على حلبة احترافية مع مدرب خاص", en: "Drive your favorite car on a professional track with a private instructor" },
      img: RACE_IMG.track,
      fullDesc: { ar: "تجربة قيادة احترافية على حلبة سباقات مجهزة بالكامل. ستحصل على جلسة تعريفية مع مدرب خاص يشرح لك أساسيات القيادة على الحلبة، ثم ستنطلق بسيارتك المختارة لعدة لفات مليئة بالأدرينالين. مناسبة للمبتدئين والمحترفين.", en: "A professional driving experience on a fully equipped racing track. You'll get a briefing session with a private instructor who will teach you the basics of track driving, then you'll take off in your chosen car for several adrenaline-filled laps. Suitable for beginners and pros alike." },
      duration: { ar: "3 ساعات", en: "3 Hours" }, price: { ar: "5,000 جنيه", en: "5,000 EGP" },
      includes: [
        { ar: "مدرب خاص", en: "Private instructor" }, { ar: "5 لفات كاملة", en: "5 full laps" },
        { ar: "فيديو تذكاري", en: "Commemorative video" }, { ar: "تأمين شامل", en: "Full insurance" },
      ],
    },
    {
      icon: <Gauge size={28} />, ar: "جولة المدينة", en: "City Drive",
      desc: { ar: "استمتع بجولة مسائية في شوارع المدينة بسيارة أحلامك", en: "Enjoy an evening cruise through the city in your dream car" },
      img: RACE_IMG.cockpit,
      fullDesc: { ar: "استمتع بجولة مسائية فاخرة في أجمل شوارع القاهرة بسيارة رياضية من اختيارك. جولة مخططة مسبقاً تمر بأبرز المعالم مع توقفات لالتقاط أفضل الصور. تجربة مثالية للأزواج أو لمحبي السيارات.", en: "Enjoy a luxurious evening cruise through Cairo's most beautiful streets in a sports car of your choice. A pre-planned route passing iconic landmarks with stops for the best photo ops. Perfect for couples or car enthusiasts." },
      duration: { ar: "4 ساعات", en: "4 Hours" }, price: { ar: "3,500 جنيه", en: "3,500 EGP" },
      includes: [
        { ar: "مسار سياحي مخطط", en: "Planned scenic route" }, { ar: "مصور محترف", en: "Professional photographer" },
        { ar: "عشاء فاخر", en: "Fine dining stop" }, { ar: "وقود مجاني", en: "Free fuel" },
      ],
    },
    {
      icon: <Flag size={28} />, ar: "عطلة نهاية الأسبوع", en: "Weekend Drive",
      desc: { ar: "احجز سيارتك الرياضية لعطلة نهاية أسبوع مليئة بالإثارة", en: "Book your sports car for a thrilling weekend getaway" },
      img: RACE_IMG.speedo,
      fullDesc: { ar: "اقضِ عطلة نهاية أسبوع لا تُنسى مع سيارة رياضية من أسطولنا. استلم السيارة يوم الخميس مساءً وأعِدها يوم الأحد. اكتشف الطرق الساحلية أو الصحراوية بأسلوبك الخاص. باقة متكاملة تشمل التأمين والوقود.", en: "Spend an unforgettable weekend with a sports car from our fleet. Pick up Thursday evening, return Sunday. Explore coastal or desert roads your way. Complete package includes insurance and fuel." },
      duration: { ar: "3 أيام", en: "3 Days" }, price: { ar: "12,000 جنيه", en: "12,000 EGP" },
      includes: [
        { ar: "3 أيام كاملة", en: "Full 3 days" }, { ar: "كيلومترات غير محدودة", en: "Unlimited mileage" },
        { ar: "تأمين شامل", en: "Full insurance" }, { ar: "مساعدة طريق 24/7", en: "24/7 roadside assist" },
      ],
    },
  ];

  return (
    <section style={{ background: BG2, padding: PAD, position: "relative" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px" }}>
        <div style={{   marginBottom: 56 }}>
          <SectionBadge>{t("التجربة", "THE EXPERIENCE")}</SectionBadge>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: TXT, fontFamily: heading, margin: "8px 0 0" }}>
            {t("ليست مجرد قيادة", "NOT JUST DRIVING")}
          </h2>
          <p style={{ color: TXT_MUTED, fontSize: 15, maxWidth: 500,   fontFamily: body }}>
            {t("نقدم لك تجارب قيادة فريدة تجمع بين الأدرينالين والفخامة", "We offer unique driving experiences that combine adrenaline and luxury")}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {experiences.map((exp, i) => (
            <div key={i} style={{
              background: BG3, borderRadius: 4, overflow: "hidden",
              border: `1px solid ${TXT}08`, transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${RED}40`; e.currentTarget.style.transform = "translateY(-6px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${TXT}08`; e.currentTarget.style.transform = ""; }}>
              <div style={{ position: "relative", height: 200 }}>
                <img src={exp.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${BG3} 10%, transparent 60%)` }} />
                <div style={{ position: "absolute", bottom: 16, left: 16, color: RED }}>{exp.icon}</div>
              </div>
              <div style={{ padding: "20px" }}>
                <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: TXT, fontFamily: heading }}>{t(exp.ar, exp.en)}</h3>
                <p style={{ margin: "0 0 16px", fontSize: 13, color: TXT_MUTED, lineHeight: 1.7, fontFamily: body }}>{t(exp.desc.ar, exp.desc.en)}</p>
                <button onClick={() => setSelectedExp(i)} style={{
                  padding: "10px 20px", borderRadius: 4, background: "transparent",
                  border: `1px solid ${RED}`, color: RED, fontWeight: 700, cursor: "pointer",
                  fontSize: 12, fontFamily: heading, letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 8,
                }}>{t("اكتشف المزيد", "LEARN MORE")} <ArrowRight size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Detail Modal */}
      {selectedExp !== null && (() => {
        const exp = experiences[selectedExp];
        return (
          <div onClick={() => setSelectedExp(null)} style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)",
            zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div onClick={e => e.stopPropagation()} style={{
              background: BG2, borderRadius: 8, width: "min(680px, 95vw)", maxHeight: "90vh",
              overflow: "auto", border: `1px solid ${RED}30`,
            }}>
              {/* Image header */}
              <div style={{ position: "relative", height: 260 }}>
                <img src={exp.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6)" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${BG2} 5%, transparent 60%)` }} />
                <button onClick={() => setSelectedExp(null)} style={{
                  position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.6)",
                  border: "none", borderRadius: 4, width: 36, height: 36, display: "flex",
                  alignItems: "center", justifyContent: "center", cursor: "pointer",
                }}><X size={18} color={TXT} /></button>
                <div style={{ position: "absolute", bottom: 24, left: 28, display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ color: RED }}>{exp.icon}</div>
                  <h2 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: TXT, fontFamily: heading }}>{t(exp.ar, exp.en)}</h2>
                </div>
              </div>

              <div style={{ padding: "24px 28px" }}>
                {/* Quick info bar */}
                <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                  {[
                    { label: t("المدة", "DURATION"), val: t(exp.duration.ar, exp.duration.en) },
                    { label: t("السعر", "PRICE"), val: t(exp.price.ar, exp.price.en) },
                  ].map((info, j) => (
                    <div key={j} style={{ flex: 1, background: BG3, borderRadius: 4, padding: "14px 16px", borderLeft: `3px solid ${RED}` }}>
                      <div style={{ fontSize: 10, color: TXT_MUTED, fontWeight: 600, letterSpacing: "0.1em", marginBottom: 4, fontFamily: heading }}>{info.label}</div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: TXT, fontFamily: heading }}>{info.val}</div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p style={{ color: TXT_DIM, fontSize: 15, lineHeight: 1.9, marginBottom: 24, fontFamily: body }}>{t(exp.fullDesc.ar, exp.fullDesc.en)}</p>

                {/* What's included */}
                <div style={{ marginBottom: 28 }}>
                  <p style={{ fontSize: 12, fontWeight: 800, color: RED, letterSpacing: "0.12em", fontFamily: heading, marginBottom: 14 }}>{t("تشمل التجربة", "WHAT'S INCLUDED")}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {exp.includes.map((inc, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, background: BG3, borderRadius: 4, padding: "10px 14px" }}>
                        <div style={{ width: 20, height: 20, borderRadius: 3, background: `${RED}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Check size={12} color={RED} />
                        </div>
                        <span style={{ fontSize: 13, color: TXT_DIM, fontFamily: body }}>{t(inc.ar, inc.en)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button onClick={() => { setSelectedExp(null); document.getElementById("fleet-section")?.scrollIntoView({ behavior: "smooth" }); }} style={{
                  width: "100%", padding: "15px", background: RED, color: "#fff", border: "none",
                  fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: heading,
                  letterSpacing: "0.1em", borderRadius: 4, display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 10,
                  clipPath: "polygon(0 0, 100% 0, 99% 100%, 1% 100%)",
                }}>
                  <Gauge size={16} />
                  {t("احجز هذه التجربة", "BOOK THIS EXPERIENCE")}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}