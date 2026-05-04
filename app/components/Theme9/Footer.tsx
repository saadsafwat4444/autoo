import { useAppContext } from "@/app/contexts/AppContext";
import { DK, PAD, pad, PERSONALITIES, PNK, useFonts, V, VL, W } from "@/app/themes/theme9/page";
import { Sparkles } from "lucide-react";

export default function Footer() {
  const { t, isRTL } = useAppContext();
  const { h } = useFonts();

  const groups = [
    { title: { ar: "الشركة", en: "Company" }, links: [{ ar: "من نحن", en: "About" }, { ar: "العروض", en: "Offers" }, { ar: "الأسئلة", en: "FAQ" }] },
    { title: { ar: "الشخصيات", en: "Personalities" }, links: PERSONALITIES.slice(0, 4).map(p => ({ ar: p.ar, en: p.en })) },
    { title: { ar: "تواصل", en: "Contact" }, links: [{ ar: "hello@drivenow.com", en: "hello@drivenow.com" }, { ar: "+20 100 123 4567", en: "+20 100 123 4567" }] },
  ];

  return (
    <footer style={{ background: DK, padding: PAD, color: W }}>
      <div style={pad}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(3, 1fr)", gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex",  gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: `linear-gradient(135deg, ${V}, ${PNK})`, display: "flex", alignItems: "center",justifyContent:"center"}}>
                <Sparkles size={18} color={W} />
              </div>
              <span style={{ fontSize: 20, fontWeight: 900, fontFamily: h }}>DriveNow</span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 280 }}>
              {t("كل سيارة لها شخصية... اختار اللي يشبهك.", "Every car has a personality... pick the one that matches you.")}
            </p>
          </div>
          {groups.map((g, i) => (
            <div key={i}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)", marginBottom: 14, fontFamily: h }}>{t(g.title.ar, g.title.en)}</h4>
              {g.links.map((l, j) => (
                <div key={j} style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 8, cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.color = VL; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
                  {t(l.ar, l.en)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>2026 DriveNow. {t("جميع الحقوق محفوظة", "All rights reserved")}.</span>
          <div style={{ display: "flex", gap: 6 }}>
            {PERSONALITIES.map(p => (
              <div key={p.id} style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, opacity: 0.5 }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}