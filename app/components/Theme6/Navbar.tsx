"use client"

import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts, TXT, BG, sectionPad } from "@/app/themes/theme6/page";
import { BORDER, GREEN, TXT2 } from "@/app/themes/theme6/page";
import { OLIVE } from "@/app/themes/theme6/page";
import { Compass, Menu } from "lucide-react";
import { useState, useEffect } from "react";

// ═════════════════════════════════════════════════════════════════════════════
export default function Navbar() {
  const { t, isRTL, lang, setLang } = useAppContext();
  const { heading } = useFonts();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { ar: "من نحن", en: "About", id: "about" },
    { ar: "آلية العمل", en: "How It Works", id: "how-it-works" },
    { ar: "السيارات", en: "Cars", id: "cars" },
    { ar: "الوجهات", en: "Destinations", id: "destinations" },
    { ar: "العروض", en: "Offers", id: "offers" },
    { ar: "التواصل", en: "Contact", id: "contact" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      background: scrolled ? "rgba(250,247,240,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
      transition: "all 0.4s",
    }}>
      <div style={{ ...sectionPad, display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: `linear-gradient(135deg, ${GREEN}, ${OLIVE})`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Compass size={22} color="#fff" />
          </div>
          <span style={{
            fontSize: 20, fontWeight: 800, color: scrolled ? TXT : "#fff",
            fontFamily: heading, transition: "color 0.4s",
          }}>
            {t("رحلتك", "RoadTrip")}
          </span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="hide-mobile">
          {links.map((l, i) => (
            <a key={i} href={`#${l.id}`}
              onClick={e => { e.preventDefault(); document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                fontSize: 14, fontWeight: 600, textDecoration: "none",
                color: scrolled ? TXT2 : "rgba(255,255,255,0.85)",
                transition: "color 0.3s", fontFamily: heading,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = GREEN; }}
              onMouseLeave={e => { e.currentTarget.style.color = scrolled ? TXT2 : "rgba(255,255,255,0.85)"; }}>
              {t(l.ar, l.en)}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} style={{
            padding: "7px 14px", borderRadius: 10,
            background: scrolled ? "rgba(21,128,61,0.08)" : "rgba(255,255,255,0.15)",
            border: "none", cursor: "pointer",
            color: scrolled ? GREEN : "#fff",
            fontSize: 13, fontWeight: 700, transition: "all 0.3s",
          }}>
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <button onClick={() => document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" })} style={{
            padding: "9px 22px", borderRadius: 12,
            background: GREEN, border: "none",
            color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
            fontFamily: heading, transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#166534"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = GREEN; e.currentTarget.style.transform = ""; }}>
            {t("ابدأ رحلتك", "Start Journey")}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            display: "none", width: 40, height: 40, borderRadius: 10,
            background: "transparent", border: "none", cursor: "pointer",
            color: scrolled ? TXT : "#fff",
          }} className="show-mobile">
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: BG, borderTop: `1px solid ${BORDER}`,
          padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12,
        }}>
          {links.map((l, i) => (
            <a key={i} href={`#${l.id}`} onClick={() => setMenuOpen(false)}
              style={{ fontSize: 15, fontWeight: 600, color: TXT2, textDecoration: "none", padding: "8px 0" }}>
              {t(l.ar, l.en)}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}