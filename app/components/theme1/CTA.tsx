"use client"

import { useAppContext } from "@/app/contexts/AppContext";
import { useRouter } from "next/navigation";
import { DARK, OFF_WHITE, PAD } from "@/app/themes/theme1/page";
import { Car, ArrowRight } from "lucide-react";

export default function CTA() {
  const router = useRouter();
  const { t, lang, accent } = useAppContext();
  const ff = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isAr = lang === "ar";

  const ctaImg = "https://images.unsplash.com/photo-1760538978585-f82dc257ec15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400";

  return (
    <section style={{ background: DARK, padding:PAD,fontFamily: ff, overflow: "hidden", direction: isAr ? "rtl" : "ltr"}}>
      {/* Image band fading into dark */}
      <div style={{ position: "relative", height: 420, overflow: "hidden" }}>
        <img src={ctaImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 0%, ${DARK}CC 60%, ${DARK} 100%)` }} />
      </div>

      {/* Text */}
      <div style={{ maxWidth: 1280,  padding: "0 48px", marginTop: -120, position: "relative", zIndex: 2 }}>
        <div style={{  marginBottom: 20 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 24, height: 2, background: accent, borderRadius: 2 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              {t("ابدأ الآن", "Start Now")}
            </span>
            <div style={{ width: 24, height: 2, background: accent, borderRadius: 2 }} />
          </div>
        </div>
        <h2 style={{ fontSize: "clamp(3rem,7vw,7rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.05em", lineHeight: 0.9, margin: "0 0 36px", maxWidth: 700 }}>
          {t("سيارتك في", "Your car in")}
          <br />
          <span style={{ color: accent }}>{t("٦٠ ثانية.", "60 seconds.")}</span>
        </h2>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <button
            onClick={() => router.push("/cars")}
            style={{ padding: "16px 44px", background: accent, color: "#fff", border: "none", fontWeight: 800, fontSize: 16, cursor: "pointer", letterSpacing: "0.02em", fontFamily: ff, display: "inline-flex", alignItems: "center", gap: 10, borderRadius: 12, transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            {t("احجز سيارتك الآن", "Book Your Car Now")}
            <ArrowRight size={18} style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
          </button>
          <button
            onClick={() => router.push("/cars")}
            style={{ padding: "16px 28px", background: "transparent", color: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(255,255,255,0.2)", fontWeight: 700, fontSize: 15, cursor: "pointer", letterSpacing: "0.02em", fontFamily: ff, borderRadius: 12, transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: 8 }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
          >
            <Car size={16} />
            {t("عرض جميع السيارات", "Browse All Cars")}
          </button>
        </div>
      </div>
    </section>
  );
}