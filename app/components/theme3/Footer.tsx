import { useAppContext } from "@/app/contexts/AppContext";
import { BG, GOLD, TXT, useFonts } from "@/app/themes/theme2/page";
import { PAD, RED, TXT_MUTED } from "@/app/themes/theme3/page";
import { Flag } from "lucide-react";

export default function Footer() {
  const { t } = useAppContext();
  const { heading, body } = useFonts();

  return (
    <footer style={{ background: BG, padding: PAD, fontFamily: body }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          {/* Logo */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, background: RED, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)" }}>
                <Flag size={16} color="#fff" />
              </div>
              <span style={{ fontFamily: heading, fontWeight: 800, fontSize: 18, color: TXT, letterSpacing: "0.08em" }}>
                SPEED<span style={{ color: RED }}>X</span>
              </span>
            </div>
            <p style={{ color: TXT_MUTED, fontSize: 14, lineHeight: 1.7 }}>{t("تجربة السباقات الأولى في مصر — اشعر بالسرعة الحقيقية.", "Egypt's #1 racing experience — feel the real speed.")}</p>
          </div>
          {[
            { title: { ar: "الشركة", en: "Company" }, links: [{ ar: "من نحن", en: "About" }, { ar: "فريقنا", en: "Our Team" }, { ar: "وظائف", en: "Careers" }] },
            { title: { ar: "السيارات", en: "Fleet" }, links: [{ ar: "سوبر كار", en: "Supercars" }, { ar: "هايبر كار", en: "Hypercars" }, { ar: "تجربة الحلبة", en: "Track Day" }] },
            { title: { ar: "التواصل", en: "Contact" }, links: [{ ar: "+20 100 000 0000", en: "+20 100 000 0000" }, { ar: "hello@speedx.eg", en: "hello@speedx.eg" }, { ar: "القاهرة، مصر", en: "Cairo, Egypt" }] },
          ].map((col, i) => (
            <div key={i}>
              <p style={{ color: RED, fontWeight: 800, marginBottom: 16, fontSize: 11, letterSpacing: "0.15em", fontFamily: heading }}>{t(col.title.ar, col.title.en)}</p>
              {col.links.map((l, j) => (
                <a key={j} href="#" style={{ display: "block", color: TXT_MUTED, fontSize: 14, textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = TXT)}
                  onMouseLeave={e => (e.currentTarget.style.color = TXT_MUTED)}>
                  {t(l.ar, l.en)}
                </a>
              ))}
            </div>
          ))}
        </div>
        {/* Bottom bar with checkered pattern */}
        <div style={{ borderTop: `1px solid ${TXT}10`, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: TXT_MUTED, fontSize: 12 }}>© 2026 SpeedX Racing Rental · {t("جميع الحقوق محفوظة", "All Rights Reserved")}</span>
          <div style={{
            width: 80, height: 10,
            background: `repeating-linear-gradient(90deg, ${GOLD} 0px, ${GOLD} 10px, transparent 10px, transparent 20px)`,
            opacity: 0.3,
          }} />
        </div>
      </div>
    </footer>
  );
}