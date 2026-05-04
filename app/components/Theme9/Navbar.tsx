import { useAppContext } from "@/app/contexts/AppContext";
import { BG, useFonts } from "@/app/themes/theme9/page";
import { BD, pad, W, TX, TX2 } from "@/app/themes/theme9/page";
import { V, PNK, VBG } from "@/app/themes/theme9/page";
import { Sparkles, Globe } from "lucide-react";
import { useState } from "react";

export default function Nav() {
  const { t, lang, setLang, isRTL } = useAppContext();
  const { h } = useFonts();
  const [open, setOpen] = useState(false);

  const links = [
    { ar: "الشخصيات", en: "Personalities", href: "#personalities" },
    { ar: "السيارات", en: "Cars", href: "#cars" },
    { ar: "العروض", en: "Offers", href: "#offers" },
    { ar: "المقالات", en: "Articles", href: "#articles" },
    { ar: "تواصل", en: "Contact", href: "#contact" },
  ];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${BD}` }}>
      <div style={{ ...pad, display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: `linear-gradient(135deg, ${V} 0%, ${PNK} 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={18} color={W} />
          </div>
          <span style={{ fontSize: 18, fontWeight: 900, color: TX, fontFamily: h }}>DriveNow</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {links.map((l, i) => (
            <a key={i} href={l.href} style={{ padding: "8px 14px", fontSize: 13, fontWeight: 600, color: TX2, textDecoration: "none", borderRadius: 10, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = VBG; e.currentTarget.style.color = V; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = TX2; }}>
              {t(l.ar, l.en)}
            </a>
          ))}
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 14px", borderRadius: 10, background: BG, border: "none", fontSize: 12, fontWeight: 700, color: TX2, cursor: "pointer" }}>
            <Globe size={13} /> {lang === "ar" ? "EN" : "عربي"}
          </button>
        </div>
      </div>
    </nav>
  );
}
