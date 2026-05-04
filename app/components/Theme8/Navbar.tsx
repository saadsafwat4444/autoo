import { useAppContext } from "@/app/contexts/AppContext";
import { BD, O, OD, pad, TX, TX2, useFonts } from "@/app/themes/theme8/page";
import { Lightbulb, Globe, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Nav() {
  const { t, lang, setLang, isRTL } = useAppContext();
  const { h } = useFonts();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { ar: "المواقف", en: "Situations", id: "situations" },
    { ar: "السيارات", en: "Cars", id: "fleet" },
    { ar: "العروض", en: "Offers", id: "offers" },
    { ar: "من نحن", en: "About", id: "about" },
    { ar: "تواصل معنا", en: "Contact", id: "contact" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000,
      background: "rgba(255,251,245,0.92)", backdropFilter: "blur(20px) saturate(1.5)",
      borderBottom: `1px solid ${BD}`,
      padding: "0 24px",
    }}>
      <div style={{ ...pad, display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, padding: 0 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: O, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Lightbulb size={18} color="#fff" />
          </div>
          <div>
            <span style={{ fontSize: 17, fontWeight: 900, color: TX, fontFamily: h }}>
              {t("حلّ ", "Solve")}
              <span style={{ color: O }}>{t("الموقف", "It")}</span>
            </span>
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`}
              onClick={e => { e.preventDefault(); document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" }); }}
              style={{ fontSize: 13, fontWeight: 600, color: TX2, textDecoration: "none", fontFamily: h, transition: "color 0.2s", cursor: "pointer" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = O; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = TX2; }}>
              {t(l.ar, l.en)}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "8px 14px", borderRadius: 10,
            background: "transparent", border: `1.5px solid ${BD}`,
            cursor: "pointer", fontSize: 12, fontWeight: 600, color: TX2,
          }}><Globe size={13} /> {lang === "ar" ? "EN" : "AR"}</button>
          <button onClick={() => document.getElementById("situations")?.scrollIntoView({ behavior: "smooth" })} style={{
            padding: "10px 22px", borderRadius: 10, background: O, color: "#fff", border: "none",
            fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: h,
            display: "flex", alignItems: "center", gap: 7,
            transition: "background 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = OD; }}
            onMouseLeave={e => { e.currentTarget.style.background = O; }}>
            {t("ابدأ الآن", "Start Now")}
            {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
          </button>
        </div>
      </div>
    </nav>
  );
}