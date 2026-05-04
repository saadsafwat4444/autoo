 import { useAppContext } from "@/app/contexts/AppContext";
import { DARK, EXTRA, MID_GRAY, PAD } from "@/app/themes/theme1/page";

// ─── ABOUT ────────────────────────────────────────────────────────────────────
export default function About() {
  const { t, lang, accent, isRTL } = useAppContext();
  const ff   = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isAr = lang === "ar";

  const facts = [
    { val: "2014", ar: "تأسست",        en: "Founded"     },
    { val: "12",   ar: "مدينة",        en: "Cities"      },
    { val: "98%",  ar: "رضا العملاء",  en: "Satisfaction" },
    { val: "500+", ar: "سيارة",        en: "Cars"         },
  ];

  return (
    <section style={{  background: "#fff",fontFamily: ff, direction: isAr ? "rtl" : "ltr", overflow: "hidden",padding:PAD }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center",padding:  "0 48px" }}>

        {/* Image side */}
        <div style={{ position: "relative", height: 520, borderRadius: 20, overflow: "hidden", order: isAr ? 1 : 0, boxShadow: `0 32px 64px ${accent}15` }}>
          <img src={EXTRA.showroom} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${accent}22 0%, transparent 60%)` }} />
        </div>

        {/* Text side */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 24, height: 2, background: accent, borderRadius: 2 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              {t("من نحن", "About Us")}
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 900, color: DARK, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 24px" }}>
            {t("مستقبل التنقل،", "The Future of Mobility,")}
            <br />
            <span style={{ color: accent }}>{t("الآن.", "Now.")}</span>
          </h2>
          <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.85, margin: "0 0 40px", maxWidth: 440 }}>
            {t(
              "منذ ٢٠١٤ ونحن نعيد تعريف تجربة استئجار السيارات في مصر. أسطول متجدد، خدمة سريعة، وتكنولوجيا تجعل كل رحلة أسهل.",
              "Since 2014 we've been redefining car rental in Egypt. A refreshed fleet, fast service, and technology that makes every trip easier."
            )}
          </p>

          {/* Facts grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 40 }}>
            {facts.map((f, i) => (
              <div key={i} style={{ textAlign: isAr ? "right" : "left" }}>
                <p style={{ margin: "0 0 2px", fontSize: "clamp(1.6rem,2.5vw,2rem)", fontWeight: 900, color: accent, letterSpacing: "-0.04em" }}>{f.val}</p>
                <p style={{ margin: 0, fontSize: 11, color: MID_GRAY, letterSpacing: "0.08em", textTransform: "uppercase" }}>{t(f.ar, f.en)}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}