import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts, BG, TXT } from "@/app/themes/theme4/page";
import { BORDER, BLUE, TXT3, BLUE_D } from "@/app/themes/theme4/page";
import { Car, Globe } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { t, lang, setLang } = useAppContext();
  const { heading } = useFonts();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { ar: "الرئيسية", en: "Home", href: "#" },
    { ar: "السيارات", en: "Cars", href: "#cars" },
    { ar: "الباقات", en: "Plans", href: "#plans" },
    { ar: "المقالات", en: "Blog", href: "#blog" },
    { ar: "تواصل", en: "Contact", href: "#contact" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.96)" : BG,
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: `1px solid ${scrolled ? BORDER : "transparent"}`,
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, background: BLUE, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Car size={18} color="#fff" />
          </div>
          <span style={{ fontFamily: heading, fontWeight: 700, fontSize: 18, color: TXT }}>
            Clean<span style={{ color: BLUE }}>Drive</span>
          </span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 32 }}>
          {links.map((l, i) => (
            <a key={i} href={l.href} style={{
              fontSize: 14, color: TXT3, fontWeight: 500, textDecoration: "none",
              transition: "color 0.2s", fontFamily: heading,
            }}
              onMouseEnter={e => (e.currentTarget.style.color = BLUE)}
              onMouseLeave={e => (e.currentTarget.style.color = TXT3)}>
              {t(l.ar, l.en)}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} style={{
            fontSize: 13, fontWeight: 500, padding: "6px 12px", borderRadius: 8,
            border: `1px solid ${BORDER}`, color: TXT3, background: "transparent",
            cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
          }}>
            <Globe size={14} />
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <button onClick={() => document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" })} style={{
            padding: "8px 20px", borderRadius: 8, background: BLUE, color: "#fff",
            border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer",
            fontFamily: heading, transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = BLUE_D)}
            onMouseLeave={e => (e.currentTarget.style.background = BLUE)}>
            {t("ابدأ الحجز", "Start Booking")}
          </button>
        </div>
      </div>
    </nav>
  );
}