import { useAppContext } from "@/app/contexts/AppContext";
import { BG, ffBody, ffEn, GOLD, PAD, TXT_DIM, useFonts } from "@/app/themes/theme2/page";
import { Crown } from "lucide-react";

export default function EFooter() {
  const { t } = useAppContext();
  const { heading, body } = useFonts();

  const cols = [
    {
      title: { ar: "الشركة", en: "Company" },
      links: [{ ar: "من نحن", en: "About" }, { ar: "فريقنا", en: "Our Team" }, { ar: "وظائف", en: "Careers" }],
    },
    {
      title: { ar: "الخدمات", en: "Services" },
      links: [{ ar: "تأجير يومي", en: "Daily Rental" }, { ar: "سائق خاص", en: "Chauffeur" }, { ar: "استقبال المطار", en: "Airport VIP" }],
    },
    {
      title: { ar: "السيارات", en: "Collection" },
      links: [{ ar: "سيارات فاخرة", en: "Luxury Cars" }, { ar: "SUV", en: "SUV" }, { ar: "رياضية", en: "Sports" }],
    },
    {
      title: { ar: "التواصل", en: "Contact" },
      links: [{ ar: "📞 +20 100 000 0000", en: "📞 +20 100 000 0000" }, { ar: "✉️ info@elitedrive.eg", en: "✉️ info@elitedrive.eg" }, { ar: "📍 القاهرة، مصر", en: "📍 Cairo, Egypt" }],
    },
  ];

  return (
    <footer style={{
      background: BG, borderTop: `1px solid ${GOLD}18`,
      padding: PAD, fontFamily: body,
    }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1fr", gap: 48, marginBottom: 52 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 36, height: 36, border: `1.5px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Crown size={18} color={GOLD} />
              </div>
              <div>
                <span style={{ fontFamily: ffEn, fontWeight: 700, fontSize: 18, color: GOLD, letterSpacing: "0.14em", display: "block", lineHeight: 1 }}>ÉLITE</span>
                <span style={{ fontFamily: ffBody, fontSize: 9, color: TXT_DIM, letterSpacing: "0.35em" }}>DRIVE</span>
              </div>
            </div>
            <p style={{ color: TXT_DIM, fontSize: 14, lineHeight: 1.8, maxWidth: 300 }}>
              {t("تجربة القيادة الفاخرة لا مثيل لها. نقدم لك أرقى الخدمات وأفخم السيارات.", "An unparalleled luxury driving experience. We deliver the finest services and the most prestigious cars.")}
            </p>
          </div>

          {/* Columns */}
          {cols.map((col, i) => (
            <div key={i}>
              <p style={{ color: GOLD, fontSize: 10, letterSpacing: "0.22em", fontWeight: 700, marginBottom: 20, fontFamily: ffBody }}>
                {t(col.title.ar, col.title.en).toUpperCase()}
              </p>
              {col.links.map((l, j) => (
                <a
                  key={j} href="#"
                  style={{
                    display: "block", color: TXT_DIM, fontSize: 13,
                    textDecoration: "none", marginBottom: 12,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = GOLD}
                  onMouseLeave={e => e.currentTarget.style.color = TXT_DIM}
                >
                  {t(l.ar, l.en)}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: `1px solid ${GOLD}12`, paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ color: TXT_DIM, fontSize: 12, letterSpacing: "0.06em", opacity: 0.6 }}>
            © 2026 ÉLITE DRIVE — {t("جميع الحقوق محفوظة", "ALL RIGHTS RESERVED")}
          </span>
          <div style={{ display: "flex", gap: 16 }}>
            {[t("سياسة الخصوصية", "Privacy"), t("الشروط", "Terms")].map((link, i) => (
              <a key={i} href="#" style={{ color: TXT_DIM, fontSize: 11, textDecoration: "none", letterSpacing: "0.08em", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = GOLD}
                onMouseLeave={e => e.currentTarget.style.color = TXT_DIM}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}