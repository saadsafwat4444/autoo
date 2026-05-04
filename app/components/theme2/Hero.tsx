"use client"

import { useAppContext } from "@/app/contexts/AppContext";
import { PAD } from "@/app/themes/theme1/page";
import { GOLD, TXT_DIM, TXT, GOLD_D, BG, ffBody, ffEn, LUX_IMG } from "@/app/themes/theme2/page";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

// GoldLine component replacement
export const GoldLine = ({ width }: { width: number }) => (
  <div style={{ 
    width: width, 
    height: 2, 
    background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` 
  }} />
);

export default function EHero() {
  const { t } = useAppContext();
  const { heading, body, isAr } = useFonts();
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section id="elite-hero" style={{ minHeight: "100vh", background: BG, position: "relative", overflow: "hidden",padding:PAD }}>
      {/* BG image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src={LUX_IMG.rollsRoyce}
          alt=""
          onLoad={() => setImgLoaded(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: imgLoaded ? 0.3 : 0, transition: "opacity 1.5s" }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${isAr ? "to right" : "to left"}, rgba(11,11,11,0.98) 0%, rgba(11,11,11,0.7) 50%, rgba(11,11,11,0.2) 100%)` }} />
        {/* Gold grain overlay */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 70% 80%, ${GOLD}08 0%, transparent 60%)` }} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "100px 40px 160px", display: "flex", alignItems: "center", minHeight: "100vh" }}>
        <div style={{ maxWidth: 620 }}>
          {/* Tag */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
            <GoldLine width={50} />
            <span style={{ color: GOLD, fontSize: 11, letterSpacing: "0.35em", fontFamily: ffBody, fontWeight: 600 }}>
              {t("الفخامة الحقيقية", "TRUE LUXURY")}
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: "clamp(3rem,5.5vw,5.2rem)", fontWeight: 700, color: "#fff",
            lineHeight: 1.05, marginBottom: 28, letterSpacing: "-0.02em",
            fontFamily: heading,
          }}>
            {t("الرفاهية", "Luxury")}<br />
            {t("تبدأ من", "Begins With")}<br />
            <span style={{
              color: GOLD,
            }}>
              {t("هنا.", "The Right Drive.")}
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{ color: TXT, fontSize: 17, lineHeight: 1.9, marginBottom: 44, opacity: 0.7, maxWidth: 480, fontFamily: body }}>
            {t(
              "أرقى تشكيلة من السيارات الفاخرة بين يديك. نوفر لك تجربة استثنائية تجمع بين الأناقة والراحة والأمان.",
              "The finest collection of luxury vehicles at your fingertips. An exceptional experience combining elegance, comfort, and absolute safety."
            )}
          </p>

          {/* CTA */}
          <div style={{ display: "flex", gap: 16, marginBottom: 56 }}>
            <button
              onClick={() => document.getElementById("elite-fleet")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "16px 44px",
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
                color: BG, border: "none", fontWeight: 700, fontSize: 14,
                cursor: "pointer", letterSpacing: "0.08em", fontFamily: body,
                transition: "all 0.3s", display: "flex", alignItems: "center", gap: 10,
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px ${GOLD}50`; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = ""; e.currentTarget.style.transform = ""; }}
            >
              {t("استكشف التشكيلة", "EXPLORE COLLECTION")}
              <ArrowRight size={16} style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 48, paddingTop: 36, borderTop: `1px solid ${GOLD}18`, direction: "ltr" }}>
            {[
              ["200+", t("سيارة فاخرة", "Luxury Cars")],
              ["15+", t("سنة خبرة", "Years Experience")],
              ["99.8%", t("رضا العملاء", "Client Satisfaction")],
            ].map(([val, label], i) => (
              <div key={i} style={{ textAlign: isAr ? "right" : "left" }}>
                <p style={{ margin: 0, fontSize: 32, fontWeight: 800, color: GOLD, fontFamily: heading, lineHeight: 1, direction: "ltr" }}>{val}</p>
                <p style={{ margin: "6px 0 0", fontSize: 11, color: TXT_DIM, letterSpacing: "0.08em", fontFamily: ffBody }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Bar */}
      {/* <ESearchBar /> */}
    </section>
  );
}

function useFonts() {
  const { lang } = useAppContext();
  return {
    heading: lang === "ar" ? "'Cairo',sans-serif" : "'Playfair Display',serif",
    body: lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif",
    isAr: lang === "ar",
  };
}
