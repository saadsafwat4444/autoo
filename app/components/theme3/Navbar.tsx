import { useAppContext} from "@/app/contexts/AppContext";
import { TXT, TXT_DIM, useFonts } from "@/app/themes/theme2/page";
import { RED, TXT_MUTED } from "@/app/themes/theme3/page";
import { Flag, Globe } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { t, lang, setLang } = useAppContext();
  const { heading, body } = useFonts();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { ar: "الرئيسية", en: "Home" }, { ar: "السيارات", en: "Fleet" },
    { ar: "التجربة", en: "Experience" }, { ar: "العضوية", en: "Membership" },
    { ar: "العروض", en: "Deals" }, { ar: "تواصل", en: "Contact" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(11,11,11,0.95)" : "rgba(11,11,11,0.6)",
      backdropFilter: "blur(20px)", borderBottom: `1px solid ${scrolled ? RED + "30" : "rgba(255,255,255,0.06)"}`,
      transition: "all 0.4s", fontFamily: body,
    }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, background: RED, borderRadius: 4,
            display: "flex", alignItems: "center", justifyContent: "center",
            clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)",
          }}>
            <Flag size={18} color="#fff" />
          </div>
          <div>
            <span style={{ fontFamily: heading, fontWeight: 800, fontSize: 18, color: TXT, letterSpacing: "0.08em" }}>
              SPEED<span style={{ color: RED }}>X</span>
            </span>
            <div style={{ fontSize: 8, color: TXT_MUTED, letterSpacing: "0.2em", fontWeight: 600, marginTop: -2 }}>RACING RENTAL</div>
          </div>
        </div>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: 32 }}>
          {navLinks.map((l, i) => (
            <a key={i} href="#" style={{ fontSize: 13, color: TXT_DIM, fontWeight: 500, textDecoration: "none", transition: "all 0.2s", letterSpacing: "0.03em", position: "relative" }}
              onMouseEnter={e => { e.currentTarget.style.color = RED; }}
              onMouseLeave={e => { e.currentTarget.style.color = TXT_DIM; }}>
              {t(l.ar, l.en)}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} style={{
            fontSize: 12, fontWeight: 600, padding: "7px 14px", borderRadius: 4,
            border: `1px solid ${TXT_MUTED}40`, color: TXT_DIM, background: "transparent",
            cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          }}>
            <Globe size={13} />
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <button onClick={() => document.getElementById("fleet-section")?.scrollIntoView({ behavior: "smooth" })} style={{
            padding: "10px 24px", borderRadius: 4, background: RED, color: "#fff",
            border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer",
            fontFamily: heading, letterSpacing: "0.1em",
            clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
          }}>
            {t("احجز الآن", "BOOK NOW")}
          </button>
        </div>
      </div>
    </nav>
  );
}