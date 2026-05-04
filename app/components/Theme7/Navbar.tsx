import { useAppContext } from "@/app/contexts/AppContext";
import { BD, P, PD, TX, TX2, useFonts } from "@/app/themes/theme7/page";
import { Building2, Globe } from "lucide-react";

export default function Navbar() {
  const { t, lang, setLang, isRTL } = useAppContext();
  const { h } = useFonts();
  const links = [
    { ar: "السيارات", en: "Cars", id: "cars" },
    { ar: "الباقات", en: "Plans", id: "plans" },
    { ar: "العروض", en: "Offers", id: "offers" },
    { ar: "المقالات", en: "Articles", id: "articles" },
    { ar: "تواصل", en: "Contact", id: "contact" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 14, left: "50%", transform: "translateX(-50%)",
      zIndex: 9000, width: "min(1160px, 94vw)",
      background: "rgba(255,255,255,0.72)", backdropFilter: "blur(24px) saturate(1.8)",
      borderRadius: 60, border: "1px solid rgba(124,58,237,0.1)",
      boxShadow: "0 8px 40px rgba(124,58,237,0.08), 0 1px 3px rgba(0,0,0,0.04)",
      padding: "6px 8px 6px 20px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg, ${P}, ${PD})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Building2 size={16} color="#fff" />
        </div>
        <span style={{ fontSize: 16, fontWeight: 900, color: TX, fontFamily: h }}>City<span style={{ color: P }}>Drive</span></span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`}
            onClick={e => { e.preventDefault(); document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ fontSize: 13, fontWeight: 600, color: TX2, textDecoration: "none", transition: "color 0.2s", fontFamily: h }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = P; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = TX2; }}>
            {t(l.ar, l.en)}
          </a>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} style={{
          display: "flex", alignItems: "center", gap: 5, padding: "8px 14px", borderRadius: 30,
          background: "transparent", border: `1.5px solid ${BD}`, cursor: "pointer", fontSize: 12, fontWeight: 600, color: TX2,
        }}><Globe size={13} /> {lang === "ar" ? "EN" : "عربي"}</button>
        <button onClick={() => document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" })} style={{
          padding: "10px 22px", borderRadius: 30, background: `linear-gradient(135deg, ${P}, ${PD})`, color: "#fff", border: "none",
          fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: h, boxShadow: `0 4px 16px ${P}40`,
        }}>{t("احجز الآن", "Book Now")}</button>
      </div>
    </nav>
  );
}