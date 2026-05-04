import { useAppContext } from "@/app/contexts/AppContext";
import { AMB, BLU, DK2, GRN, P, PAD, pad, PD, PINK, PL, useFonts } from "@/app/themes/theme7/page";
import { Building2 } from "lucide-react";

export default function Footer() {
  const { t } = useAppContext();
  const { h } = useFonts();
  const cols = [
    { title: { ar: "الشركة", en: "Company" }, items: [{ ar: "من نحن", en: "About" }, { ar: "الوظائف", en: "Careers" }, { ar: "الشروط", en: "Terms" }] },
    { title: { ar: "الخدمات", en: "Services" }, items: [{ ar: "السيارات", en: "Cars" }, { ar: "الباقات", en: "Plans" }, { ar: "العروض", en: "Offers" }] },
    { title: { ar: "المساعدة", en: "Support" }, items: [{ ar: "المقالات", en: "Articles" }, { ar: "تواصل", en: "Contact" }, { ar: "الأسئلة", en: "FAQ" }] },
  ];
  return (
    <footer style={{ background: DK2 }}>
      <div style={{ height: 3, background: `linear-gradient(90deg, ${P}, ${PINK}, ${BLU}, ${GRN}, ${AMB})` }} />
      <div style={{ ...pad, padding:  PAD }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg, ${P}, ${PD})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Building2 size={16} color="#fff" /></div>
              <span style={{ fontSize: 18, fontWeight: 900, color: "#fff", fontFamily: h }}>City<span style={{ color: PL }}>Drive</span></span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.8, maxWidth: 260 }}>{t("سيارات تناسب حياتك في المدينة — مرونة وأناقة في كل رحلة", "Cars that fit your city life — flexibility and style in every trip")}</p>
          </div>
          {cols.map((col, ci) => (
            <div key={ci}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: h, marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.08em" }}>{t(col.title.ar, col.title.en)}</h4>
              {col.items.map((item, ii) => (
                <div key={ii} style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = PL; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}>
                  {t(item.ar, item.en)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2026 CityDrive. {t("جميع الحقوق محفوظة", "All rights reserved")}.</span>
          <div style={{ display: "flex", gap: 16 }}>
            {["Twitter", "Instagram", "LinkedIn"].map(s => (
              <span key={s} style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", cursor: "pointer" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = PL; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.25)"; }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
