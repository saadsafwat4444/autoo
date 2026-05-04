"use client"

import { useAppContext } from "@/app/contexts/AppContext";
import { BG, EPage, ffBody, ffEn, GOLD, GOLD_D, SEC_BTN, SEC_BTN_BRD, SEC_BTN_TXT, showEPage, TXT, TXT_DIM, useFonts } from "@/app/themes/theme2/page";
import { Crown } from "lucide-react";
import { useState, useEffect } from "react";

 
export default function ENavbar() {
  const { t, lang, setLang } = useAppContext();
  const { heading, body, isAr } = useFonts();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { ar: "الرئيسية", en: "Home", section: "hero", page: "home" as EPage | null },
    { ar: "التشكيلة الفاخرة", en: "Luxury Collection", section: "fleet", page: null },
    { ar: "خدمات VIP", en: "VIP Services", section: "services", page: null },
    { ar: "العضوية", en: "Membership", section: "membership", page: null },
    { ar: "العروض", en: "Offers", section: "offers", page: null },
    { ar: "المدونة", en: "Blog", section: "blog", page: "blog" as EPage },
    { ar: "تواصل", en: "Contact", section: "contact", page: null },
  ];

  const scrollTo = (id: string, navPage?: EPage | null) => {
    if (navPage === "blog") { showEPage("blog"); return; }
    if (navPage === "home") { showEPage("home"); return; }
    // If on another page, go home first then scroll
    showEPage("home");
    setTimeout(() => {
      document.getElementById(`elite-${id}`)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    setMobileOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(11,11,11,0.97)" : "rgba(11,11,11,0.6)",
      backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
      borderBottom: `1px solid ${scrolled ? GOLD + "25" : "transparent"}`,
      transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
      fontFamily: body,
    }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: scrolled ? 68 : 80, transition: "height 0.4s" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => showEPage("home")}>
          <div style={{ width: 36, height: 36, border: `1.5px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Crown size={18} color={GOLD} />
          </div>
          <div>
            <span style={{ fontFamily: ffEn, fontWeight: 700, fontSize: 18, color: GOLD, letterSpacing: "0.14em", display: "block", lineHeight: 1 }}>ÉLITE</span>
            <span style={{ fontFamily: ffBody, fontSize: 9, color: TXT_DIM, letterSpacing: "0.35em" }}>DRIVE</span>
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 28 }}>
          {links.map((l, i) => (
            <button
              key={i}
              onClick={() => scrollTo(l.section, l.page)}
              style={{
                background: "none", border: "none", cursor: "pointer", padding: "4px 0",
                fontSize: 12, color: TXT, fontWeight: 400, letterSpacing: "0.06em",
                fontFamily: body, transition: "color 0.3s", textDecoration: "none",
                borderBottom: "1px solid transparent",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = GOLD; e.currentTarget.style.borderBottomColor = GOLD; }}
              onMouseLeave={e => { e.currentTarget.style.color = TXT; e.currentTarget.style.borderBottomColor = "transparent"; }}
            >
              {t(l.ar, l.en)}
            </button>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            style={{
              fontSize: 11, fontWeight: 600, padding: "6px 14px",
              border: `1px solid ${SEC_BTN_BRD}`, color: SEC_BTN_TXT, background: SEC_BTN,
              cursor: "pointer", letterSpacing: "0.1em", fontFamily: ffBody,
              transition: "all 0.25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${GOLD}28`; e.currentTarget.style.color = GOLD; }}
            onMouseLeave={e => { e.currentTarget.style.background = SEC_BTN; e.currentTarget.style.color = SEC_BTN_TXT; }}
          >
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <button
            onClick={() => { showEPage("home"); setTimeout(() => document.getElementById("elite-fleet")?.scrollIntoView({ behavior: "smooth" }), 100); }}
            style={{
              fontSize: 12, fontWeight: 700, padding: "10px 28px",
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
              color: BG, border: "none", cursor: "pointer",
              letterSpacing: "0.08em", fontFamily: body,
              transition: "transform 0.25s, box-shadow 0.25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 6px 20px ${GOLD}40`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >
            {t("احجز تجربة فاخرة", "BOOK LUXURY RIDE")}
          </button>
        </div>
      </div>
    </nav>
  );
}