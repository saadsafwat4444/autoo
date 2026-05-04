 "use client";

import { useAppContext } from "@/app/contexts/AppContext";
import { DARK, PAD } from "@/app/themes/theme1/page";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const { t, lang, accent } = useAppContext();
  const ff   = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isAr = lang === "ar";

  const cols = [
    { title: { ar: "الشركة",    en: "Company"  }, links: [{ ar: "من نحن", en: "About" }, { ar: "الفريق", en: "Team" }, { ar: "الوظائف", en: "Careers" }] },
    { title: { ar: "الخدمات",   en: "Services" }, links: [{ ar: "التأجير اليومي", en: "Daily Rental" }, { ar: "الشهري", en: "Monthly" }, { ar: "مع سائق", en: "Chauffeur" }] },
    { title: { ar: "الدعم",     en: "Support"  }, links: [{ ar: "اتصل بنا", en: "Contact" }, { ar: "الأسئلة", en: "FAQ" }, { ar: "الشكاوى", en: "Complaints" }] },
  ];

  return (
    <footer style={{ background: `linear-gradient(180deg, ${DARK} 0%, #091527 100%)`, fontFamily: ff, direction: isAr ? "rtl" : "ltr", borderTop: `1px solid ${accent}15` }}>
      <div style={{ maxWidth: 1280,  padding: PAD}}>

        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(3,1fr)", gap: 40, marginBottom: 56 }}>
          {/* Brand */}
          <div>
            <a href="#" style={{ textDecoration: "none", fontWeight: 900, fontSize: 22, letterSpacing: "-0.04em", display: "inline-block", marginBottom: 16 }}>
              <span style={{ color: accent }}>Drive</span>
              <span style={{ color: "#fff" }}>Now</span>
            </a>
            <p style={{ margin: "0 0 20px", fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 280 }}>
              {t("التنقل الذكي، بين يديك.", "Smart mobility, in your hands.")}
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[Phone, Mail, MapPin].map((Icon, i) => (
                <div key={i} style={{ width: 36, height: 36, background: "rgba(255,255,255,0.06)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = `${accent}22`}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"}
                >
                  <Icon size={15} color="rgba(255,255,255,0.5)" />
                </div>
              ))}
            </div>
          </div>

          {/* Cols */}
          {cols.map((col, ci) => (
            <div key={ci}>
              <p style={{ margin: "0 0 18px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                {t(col.title.ar, col.title.en)}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((l, li) => (
                  <a key={li} href="#" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = accent)}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    {t(l.ar, l.en)}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
            2026 DriveNow. {t("جميع الحقوق محفوظة.", "All rights reserved.")}
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {[{ ar: "الخصوصية", en: "Privacy" }, { ar: "الشروط", en: "Terms" }].map((l, i) => (
              <a key={i} href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = accent)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
              >
                {t(l.ar, l.en)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}