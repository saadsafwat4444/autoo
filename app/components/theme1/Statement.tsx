"use client";

import { useAppContext } from "@/app/contexts/AppContext";
import { DARK } from "@/app/themes/theme1/page";
import { BadgeCheck,Lock, Headphones, Shield, ShieldCheck, Tag } from "lucide-react";

export default function Statement() {
  const { t, lang, accent } = useAppContext();
  const ff   = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isAr = lang === "ar";

  const badges = [
    { icon: <ShieldCheck size={26} />, ar: "تأمين شامل",    en: "Full Insurance"   },
    { icon: <Lock        size={26} />, ar: "دفع آمن",        en: "Secure Payment"   },
    { icon: <BadgeCheck  size={26} />, ar: "سيارات معتمدة",  en: "Certified Cars"   },
    { icon: <Headphones  size={26} />, ar: "دعم ٢٤/٧",       en: "24/7 Support"     },
    { icon: <Tag         size={26} />, ar: "أسعار ثابتة",    en: "Fixed Prices"     },
    { icon: <Shield      size={26} />, ar: "ضمان الجودة",    en: "Quality Assured"  },
  ];

  return (
    <section style={{ background: `linear-gradient(135deg, ${DARK} 0%, #162D54 100%)`, fontFamily: ff, direction: isAr ? "rtl" : "ltr" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "repeat(6, 1fr)" }}>
        {badges.map((b, i) => (
          <div
            key={i}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 10, padding: "40px 16px",
              borderRight: isAr
                ? (i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none")
                : (i < 5 ? "1px solid rgba(255,255,255,0.08)" : "none"),
              textAlign: "center", transition: "all 0.25s", cursor: "default",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${accent}18`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <div style={{ color: accent, opacity: 0.9 }}>{b.icon}</div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: "0.03em", lineHeight: 1.3 }}>
              {t(b.ar, b.en)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}