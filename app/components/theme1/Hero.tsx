import type { FC } from 'react';
import { useAppContext } from "@/app/contexts/AppContext";
import { PAD } from '@/app/themes/theme1/page';

export default function Hero() {
  const { t, lang, accent } = useAppContext();
  const ff    = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isRTL = lang === "ar";
  const heroImg = "https://images.unsplash.com/photo-1770716485976-0af5c44c9a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400";

  const stats = [
    { val: "500+", ar: "سيارة جاهزة",  en: "Cars Ready"      },
    { val: "60s",  ar: "وقت الحجز",     en: "To Book"         },
    { val: "4.9★", ar: "تقييم العملاء", en: "Customer Rating" },
    { val: "24/7", ar: "دعم مستمر",     en: "Live Support"    },
  ];

  return (
    <section style={{ position: "relative", height: "100vh", minHeight: 700, overflow: "hidden",padding:PAD }}>
      <img src={heroImg} alt="hero" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.15) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to ${isRTL ? "left" : "right"}, ${accent}22 0%, transparent 55%)` }} />

      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", fontFamily: ff, direction: isRTL ? "rtl" : "ltr" }}>
        <div style={{ padding: "0 56px" }}>
          {/* Smart badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: `${accent}18`, border: `1px solid ${accent}40`, padding: "7px 18px", marginBottom: 32, borderRadius: 100 }}>
            <div style={{ width: 6, height: 6, background: accent, borderRadius: "50%", boxShadow: `0 0 8px ${accent}` }} />
            <span style={{ fontSize: 10, fontWeight: 800, color: accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              {t("التنقل الذكي", "Smart Mobility")}
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(4.5rem,9vw,9.5rem)", fontWeight: 900, lineHeight: 0.87, letterSpacing: "-0.05em", margin: "0 0 28px", maxWidth: 860 }}>
            <span style={{ color: "#fff", display: "block" }}>{t("تنقّل", "Move")}</span>
            <span style={{ color: accent, display: "block" }}>{t("بذكاء.", "Smarter.")}</span>
          </h1>

          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, margin: 0, lineHeight: 1.8, maxWidth: 420 }}>
            {t(
              "أكثر من ٥٠٠ سيارة. حجز خلال ٦٠ ثانية. تأمين شامل من اللحظة الأولى.",
              "500+ cars. Book in 60 seconds. Full insurance from day one."
            )}
          </p>
        </div>

        {/* Stats strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", marginTop: 56, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(14px)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: "22px 56px",
              borderRight: isRTL
                ? (i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none")
                : (i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none"),
            }}>
              <p style={{ margin: "0 0 3px", fontSize: "clamp(1.4rem,2vw,1.9rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em" }}>{s.val}</p>
              <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{t(s.ar, s.en)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}