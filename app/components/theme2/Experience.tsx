"use client"

import { useAppContext } from "@/app/contexts/AppContext";
import { PAD } from "@/app/themes/theme1/page";
import { GOLD, TXT_DIM, BG, BG2, ffAr, ffEn, ffBody, SectionLabel } from "@/app/themes/theme2/page";
import { Car, Calendar, Sparkles } from "lucide-react";

// SectionLabel component
// const SectionLabel = ({ children }: { children: React.ReactNode }) => (
//   <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
//     <div style={{ 
//       width: 50, 
//       height: 2, 
//       background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` 
//     }} />
//     <span style={{ color: GOLD, fontSize: 11, letterSpacing: "0.35em", fontFamily: ffBody, fontWeight: 600 }}>
//       {children}
//     </span>
//   </div>
// );

export default function EExperience() {
  const { t } = useAppContext();
  const { heading, body, isAr } = useFonts();

  const steps = [
    { num: "01", icon: Car, ar: "اختر سيارتك الفاخرة", en: "Choose Your Luxury Car", descAr: "تصفح تشكيلتنا المختارة بعناية واختر السيارة التي تعكس ذوقك.", descEn: "Browse our carefully curated collection and pick the car that reflects your taste." },
    { num: "02", icon: Calendar, ar: "احجز بسهولة تامة", en: "Book With Ease", descAr: "حجز سريع وآمن عبر الموقع مع تأكيد فوري.", descEn: "Fast and secure booking through our site with instant confirmation." },
    { num: "03", icon: Sparkles, ar: "استلم تجربتك", en: "Receive Your Experience", descAr: "سيارتك تصلك أينما تريد — فندق، مطار، أو منزلك.", descEn: "Your car arrives wherever you want — hotel, airport, or home." },
  ];

  return (
    <section style={{ background: BG2, padding: PAD, borderTop: `1px solid ${GOLD}12`, borderBottom: `1px solid ${GOLD}12` }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <SectionLabel>{t("كيف تعمل", "HOW IT WORKS")}</SectionLabel>
          <h2 style={{ fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 700, color: "#fff", margin: "16px 0 0", fontFamily: heading }}>
            {t("ثلاث خطوات نحو الرفاهية", "Three Steps to Luxury")}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, position: "relative" }}>
          {/* Connecting line */}
          <div style={{ position: "absolute", top: 44, left: "16.66%", right: "16.66%", height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}40, ${GOLD}40, transparent)` }} />

          {steps.map((step, i) => (
            <div key={i} style={{ textAlign: "center", padding: "0 32px", position: "relative" }}>
              {/* Number circle */}
              <div style={{
                width: 88, height: 88, margin: "0 auto 28px",
                border: `2px solid ${GOLD}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", background: BG2,
              }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: GOLD, fontFamily: heading }}>{step.num}</span>
                <div style={{ position: "absolute", top: -1, [isAr ? "left" : "right"]: -1, background: GOLD, padding: "3px 6px" }}>
                  <step.icon size={12} color={BG} />
                </div>
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 12px", fontFamily: heading, letterSpacing: "-0.01em" }}>
                {t(step.ar, step.en)}
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: TXT_DIM, lineHeight: 1.8, fontFamily: body }}>
                {t(step.descAr, step.descEn)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function useFonts() {
  const { lang } = useAppContext();
  return {
    heading: lang === "ar" ? ffAr : ffEn,
    body: lang === "ar" ? ffAr : ffBody,
    isAr: lang === "ar",
  };
}
