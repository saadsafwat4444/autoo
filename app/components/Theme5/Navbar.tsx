import { useAppContext } from "@/app/contexts/AppContext";
import { BG2, BORDER, CYAN, GLOW_CYAN, INDIGO, TXT, TXT2, TXT3, useFonts } from "@/app/themes/theme5/page";
import { Bot, Globe } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { t, lang, setLang, isRTL } = useAppContext();
  const { heading } = useFonts();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { ar: "السيارات", en: "Cars", href: "#cars" },
    { ar: "الخدمات", en: "Services", href: "#services" },
    { ar: "الباقات", en: "Plans", href: "#plans" },
    { ar: "العروض", en: "Offers", href: "#offers" },
    { ar: "المقالات", en: "Blog", href: "#blog" },
    { ar: "تواصل", en: "Contact", href: "#contact" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(2,6,23,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: GLOW_CYAN,
          }}>
            <Bot size={20} color="#fff" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 18, color: TXT, fontFamily: heading }}>
            Smart<span style={{ color: CYAN }}>AI</span>
          </span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {links.map((l, i) => (
            <a key={i} href={l.href} style={{
              color: TXT3, textDecoration: "none", fontSize: 14, fontWeight: 500,
              transition: "color 0.2s", fontFamily: heading,
            }}
              onMouseEnter={e => (e.currentTarget.style.color = CYAN)}
              onMouseLeave={e => (e.currentTarget.style.color = TXT3)}>
              {t(l.ar, l.en)}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} style={{
            background: BG2, border: `1px solid ${BORDER}`, borderRadius: 8,
            padding: "7px 14px", color: TXT2, fontSize: 13, fontWeight: 600,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          }}>
            <Globe size={14} />
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <button onClick={() => document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" })} style={{
            background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
            border: "none", borderRadius: 8, padding: "8px 20px",
            color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
            fontFamily: heading, boxShadow: GLOW_CYAN,
          }}>
            {t("ابدأ الآن", "Get Started")}
          </button>
        </div>
      </div>
    </nav>
  );
}