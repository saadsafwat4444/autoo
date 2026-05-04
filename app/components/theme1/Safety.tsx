"use client";

import { useAppContext } from "@/app/contexts/AppContext";
import { DARK, EXTRA, OFF_WHITE, PAD } from "@/app/themes/theme1/page";
import { Check } from "lucide-react";

export default function Safety() {
  const { t, lang, accent } = useAppContext();
  const ff   = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isAr = lang === "ar";

  const features = [
    { ar: "فحص شامل قبل كل رحلة",         en: "Full inspection before every trip"   },
    { ar: "تأمين ضد الحوادث والسرقة",       en: "Accident & theft insurance"          },
    { ar: "خدمة الطوارئ على الطريق",        en: "24/7 roadside emergency service"      },
    { ar: "كاميرات وأنظمة تتبع GPS",        en: "Cameras & GPS tracking systems"       },
    { ar: "صيانة دورية موثقة",              en: "Documented periodic maintenance"      },
    { ar: "سائقين مرخصين ومدربين",          en: "Licensed and trained drivers"         },
  ];

  return (
    <section style={{ background: OFF_WHITE, fontFamily: ff, direction: isAr ? "rtl" : "ltr", padding: PAD }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>

        {/* Text side */}
        <div style={{ order: isAr ? 1 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 24, height: 2, background: accent, borderRadius: 2 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              {t("الأمان", "Safety")}
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 900, color: DARK, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 20px" }}>
            {t("نقودك وسلامتك", "Your money and safety")}
            <br />
            <span style={{ color: accent }}>{t("أولويتنا.", "are our priority.")}</span>
          </h2>
          <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.8, margin: "0 0 36px", maxWidth: 420 }}>
            {t(
              "نلتزم بأعلى معايير السلامة في كل مرحلة — من الصيانة إلى التأمين وحتى الو��ول.",
              "We maintain the highest safety standards at every stage — from maintenance to insurance to arrival."
            )}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 22, height: 22, background: `${accent}15`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Check size={12} color={accent} />
                </div>
                <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.5 }}>{t(f.ar, f.en)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image side */}
        <div style={{ position: "relative", height: 500, borderRadius: 20, overflow: "hidden", boxShadow: `0 24px 56px ${DARK}22` }}>
          <img src={EXTRA.safety} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />
          {/* Metric card */}
          <div style={{ position: "absolute", bottom: 32, [isAr ? "right" : "left"]: 32, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)", padding: "20px 28px", borderLeft: isAr ? "none" : `3px solid ${accent}`, borderRight: isAr ? `3px solid ${accent}` : "none", borderRadius: 12 }}>
            <p style={{ margin: "0 0 4px", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em" }}>99.8%</p>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t("معدل السلامة", "Safety Rate")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}