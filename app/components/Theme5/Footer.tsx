import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts, BG, TXT, PAD } from "@/app/themes/theme5/page";
import { BORDER, TXT3 } from "@/app/themes/theme4/page";
import { CYAN, INDIGO, GLOW_CYAN, INDIGO_L } from "@/app/themes/theme5/page";
import { Bot } from "lucide-react";

export default function Footer() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();

  return (
    <footer style={{ background: BG, borderTop: `1px solid ${BORDER}`, padding:PAD}}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex",alignItems:"center",gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10,
                background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: GLOW_CYAN,
              }}>
                <Bot size={18} color="#fff" />
              </div>
              <span style={{ fontWeight: 800, fontSize: 18, color: TXT }}>Smart<span style={{ color: CYAN }}>AI</span></span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: TXT3 }}>{t("منصة ذكية لتأجير السيارات. نختار لك أفضل سيارة بناءً على احتياجاتك.", "Smart car rental platform. We pick the best car for you based on your needs.")}</p>
          </div>
          {[
            { title: { ar: "الشركة", en: "Company" }, links: [{ ar: "من نحن", en: "About" }, { ar: "الفريق", en: "Team" }, { ar: "وظائف", en: "Careers" }] },
            { title: { ar: "السيارات", en: "Cars" }, links: [{ ar: "اقتصادية", en: "Economy" }, { ar: "فاخرة", en: "Luxury" }, { ar: "دفع رباعي", en: "SUV" }] },
            { title: { ar: "التواصل", en: "Contact" }, links: [{ ar: "+20 100 000 0000", en: "+20 100 000 0000" }, { ar: "hello@smartai.eg", en: "hello@smartai.eg" }, { ar: "القاهرة، مصر", en: "Cairo, Egypt" }] },
          ].map((col, i) => (
            <div key={i}>
              <p style={{ color: TXT, fontWeight: 700, marginBottom: 14, fontSize: 14 }}>{t(col.title.ar, col.title.en)}</p>
              {col.links.map((l, j) => (
                <a key={j} href="#" style={{ display: "block", color: TXT3, fontSize: 14, textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = CYAN)}
                  onMouseLeave={e => (e.currentTarget.style.color = TXT3)}>
                  {t(l.ar, l.en)}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: TXT3 }}>© 2026 SmartAI · {t("جميع الحقوق محفوظة", "All Rights Reserved")}</span>
          <div style={{ display: "flex", gap: 8 }}>
            {[CYAN, INDIGO_L, "#F59E0B"].map((c, i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: c, opacity: 0.5 }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}