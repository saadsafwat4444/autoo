import { useAppContext } from "@/app/contexts/AppContext";
import { PAD } from "@/app/themes/theme7/page";
import { AMB, DK2, pad, useFonts } from "@/app/themes/theme8/page";
import { O, OL } from "@/app/themes/theme8/page";
import { ArrowLeft, ArrowRight, Globe, Lightbulb, Mail, Phone } from "lucide-react";

export default function Footer() {
  const { t, isRTL } = useAppContext();
  const { h } = useFonts();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const cols = [
    { title: { ar: "الشركة", en: "Company" }, items: [{ ar: "من نحن", en: "About Us" }, { ar: "الشروط والأحكام", en: "Terms" }, { ar: "سياسة الخصوصية", en: "Privacy" }] },
    { title: { ar: "الخدمات", en: "Services" }, items: [{ ar: "المواقف", en: "Situations" }, { ar: "العروض", en: "Offers" }, { ar: "السيارات", en: "Cars" }] },
    { title: { ar: "المساعدة", en: "Help" }, items: [{ ar: "المقالات", en: "Articles" }, { ar: "تواصل معنا", en: "Contact" }, { ar: "الأسئلة الشائعة", en: "FAQ" }] },
  ];
  return (
    <footer style={{ background: DK2 }}>
      <div style={{ height: 3, background: `linear-gradient(90deg, ${O}, ${AMB}, ${OL})` }} />
      <div style={{ ...pad, padding: PAD }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 36, marginBottom: 36 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: O, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Lightbulb size={16} color="#fff" />
              </div>
              <span style={{ fontSize: 17, fontWeight: 900, color: "#fff", fontFamily: h }}>
                {t("حلّ ", "Solve")}
                <span style={{ color: OL }}>{t("الموقف", "It")}</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.9, maxWidth: 260 }}>
              {t("كل موقف له سيارة مناسبة — أخبرنا بموقفك ونحن نتكفل بالباقي", "Every situation has the right car — tell us yours and we'll handle the rest")}
            </p>
          </div>
          {cols.map((col, ci) => (
            <div key={ci}>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", fontFamily: h, marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.1em" }}>{t(col.title.ar, col.title.en)}</h4>
              {col.items.map((item, ii) => (
                <div key={ii} style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = OL; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}>
                  {t(item.ar, item.en)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
            &copy; 2026 SolveIt. {t("جميع الحقوق محفوظة", "All rights reserved")}.
          </span>
          <div style={{ display: "flex", gap: 16 }}>
            {[Phone, Mail, Globe].map((Icon, ii) => (
              <div key={ii} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = OL; e.currentTarget.style.background = "rgba(249,115,22,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}>
                <Icon size={14} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}