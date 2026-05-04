 "use client"
import { useAppContext } from "@/app/contexts/AppContext";
import { DARK } from "@/app/themes/theme1/page";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { t, lang, setLang, accent } = useAppContext();
  const router = useRouter();
  const ff   = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isAr = lang === "ar";

  const [scrolled,   setScrolled]   = useState(false);
  const [hovLink,    setHovLink]    = useState<number | null>(null);
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const [langHov,    setLangHov]    = useState(false);
  const [langPress,  setLangPress]  = useState(false);
  const [langFocus,  setLangFocus]  = useState(false);
  const [bookHov,    setBookHov]    = useState(false);
  const [bookPress,  setBookPress]  = useState(false);
  const [bookFocus,  setBookFocus]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

 const navLinks = [
    { ar: "السيارات",  en: "Cars",     action: () => router.push("/cars") },
    { ar: "الخدمات",   en: "Services", action: () => { router.push("/"); setTimeout(() => document.getElementById("w-services")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    { ar: "الأسعار",   en: "Pricing",  action: () => { router.push("/"); setTimeout(() => document.getElementById("w-pricing")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    { ar: "المقالات",   en: "Blog",     action: () => router.push("/blog") },
  ];
  // colour tokens
  const BG     = scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.78)";
  const BORDER = scrolled ? "rgba(0,0,0,0.10)"       : "rgba(0,0,0,0.06)";
  const SHADOW = scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none";

  // lang button
  const langBg    = langPress ? accent        : langHov ? `${accent}15` : "transparent";
  const langClr   = langPress ? "#fff"        : langHov ? accent         : "#374151";
  const langBdr   = langFocus ? `2px solid ${accent}` : langHov ? `1.5px solid ${accent}` : "1.5px solid rgba(0,0,0,0.15)";
  const langScale = langPress ? "scale(0.94)" : "scale(1)";

  // book button
  const bookBg    = bookPress ? `${accent}BB` : bookHov ? `${accent}EE` : accent;
  const bookShad  = bookFocus ? `0 0 0 3px ${accent}44` : bookHov ? `0 8px 22px ${accent}44` : `0 2px 8px ${accent}28`;
  const bookScale = bookPress ? "scale(0.95)" : "scale(1)";

  // nav links
  const lBg  = (i: number) => activeLink === i ? `${accent}18` : hovLink === i ? `${accent}0D` : "transparent";
  const lClr = (i: number) => (hovLink === i || activeLink === i) ? accent : DARK;
  const lFw  = (i: number): number => activeLink === i ? 700 : 500;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: BG,
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      borderBottom: `1px solid ${BORDER}`,
      boxShadow: SHADOW,
      transition: "background 0.35s, box-shadow 0.35s, border-color 0.35s",
      fontFamily: ff,
      direction: isAr ? "rtl" : "ltr",
    }}>
      <style>{`
        .dn-link:focus-visible { outline: 2px solid ${accent}; outline-offset: 3px; border-radius: 6px; }
        .dn-lang:focus-visible { outline: 2px solid ${accent}; outline-offset: 3px; border-radius: 8px; }
        .dn-book:focus-visible { outline: 3px solid ${accent}66; outline-offset: 3px; border-radius: 9px; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <a href="#" onClick={e => { e.preventDefault();  }} style={{ textDecoration: "none", userSelect: "none", fontWeight: 900, fontSize: 21, letterSpacing: "-0.04em" }}>
          <span style={{ color: accent }}>Drive</span>
          <span style={{ color: DARK }}>Now</span>
        </a>
 
        <div style={{ display: "flex", gap: 4 }}>
          {navLinks.map((l, i) => (
            <a
              key={i} href="#"
              className="dn-link"
              onClick={e => { e.preventDefault(); l.action?.(); }}
              onMouseEnter={() => setHovLink(i)}
              onMouseLeave={() => { setHovLink(null); setActiveLink(null); }}
              onMouseDown={() => setActiveLink(i)}
              onMouseUp={() => setActiveLink(null)}
              style={{
                display: "flex", alignItems: "center", gap: 5,
                fontSize: 14, fontWeight: lFw(i),
                color: lClr(i), textDecoration: "none", letterSpacing: "0.01em",
                padding: "6px 14px", borderRadius: 8, background: lBg(i),
                transition: "color 0.18s, background 0.18s", userSelect: "none",
              }}
            >
              {t(l.ar, l.en)}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>

          {/* Language toggle
              default  → transparent, gray text, blue-100 border
              hover    → accent-tint bg, accent text, accent border
              pressed  → solid accent bg, white text, scale 0.94
              focus    → 2px accent ring                            */}
          <button
            className="dn-lang"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            onMouseEnter={() => setLangHov(true)}
            onMouseLeave={() => { setLangHov(false); setLangPress(false); }}
            onMouseDown={() => setLangPress(true)}
            onMouseUp={() => setLangPress(false)}
            onFocus={() => setLangFocus(true)}
            onBlur={() => { setLangFocus(false); setLangPress(false); }}
            style={{
              fontSize: 12, fontWeight: 700, padding: "6px 14px",
              border: langBdr, color: langClr, background: langBg,
              cursor: "pointer", borderRadius: 8, letterSpacing: "0.06em",
              fontFamily: ff,
              transition: "background 0.18s, color 0.18s, border 0.18s, transform 0.1s",
              transform: langScale,
              position: "relative",
              zIndex: 50,
            }}
          >
            {lang === "ar" ? "EN" : "عربي"}
          </button>

         
          <button
            className="dn-book"
            onClick={() => router.push("/cars")}
            onMouseEnter={() => setBookHov(true)}
            onMouseLeave={() => { setBookHov(false); setBookPress(false); }}
            onMouseDown={() => setBookPress(true)}
            onMouseUp={() => setBookPress(false)}
            onFocus={() => setBookFocus(true)}
            onBlur={() => { setBookFocus(false); setBookPress(false); }}
            style={{
              fontSize: 13, fontWeight: 700, padding: "9px 22px",
              background: bookBg, color: "#fff", border: "none",
              cursor: "pointer", borderRadius: 9, letterSpacing: "0.03em",
              fontFamily: ff, boxShadow: bookShad,
              transition: "background 0.18s, box-shadow 0.18s, transform 0.1s",
              transform: bookScale,
              display: "flex", alignItems: "center", gap: 7,
            }}
          >
            {t("احجز الآن", "Book Now")}
            <ArrowRight
              size={13}
              style={{
                transform: isAr ? "scaleX(-1)" : "none",
                opacity: bookHov && !bookPress ? 1 : 0.6,
                transition: "opacity 0.18s",
              }}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}