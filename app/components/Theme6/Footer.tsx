import { useAppContext } from "@/app/contexts/AppContext";
import { PAD, useFonts } from "@/app/themes/theme6/page";
import { GREEN } from "@/app/themes/theme6/page";
import { sectionPad, OLIVE, GREEN_L } from "@/app/themes/theme6/page";
import { Compass } from "lucide-react";

export default function Footer() {
  const { t, isRTL } = useAppContext();
  const { heading } = useFonts();

  const cols = [
    {
      title: { ar: "الشركة", en: "Company" },
      links: [
        { ar: "عن رحلتك", en: "About RoadTrip" },
        { ar: "فريقنا", en: "Our Team" },
        { ar: "وظائف", en: "Careers" },
      ],
    },
    {
      title: { ar: "الرحلات", en: "Trips" },
      links: [
        { ar: "رحلات البحر", en: "Beach Trips" },
        { ar: "رحلات الجبل", en: "Mountain Trips" },
        { ar: "رحلات عائلية", en: "Family Trips" },
      ],
    },
    {
      title: { ar: "الدعم", en: "Support" },
      links: [
        { ar: "الأسئلة الشائعة", en: "FAQ" },
        { ar: "سياسة الإلغاء", en: "Cancellation Policy" },
        { ar: "تواصل معنا", en: "Contact Us" },
      ],
    },
  ];

  return (
    <footer style={{ background: "#1F2937", padding:PAD }}>
      <div style={sectionPad}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `linear-gradient(135deg, ${GREEN}, ${OLIVE})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Compass size={20} color="#fff" />
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#fff", fontFamily: heading }}>
                {t("رحلتك", "RoadTrip")}
              </span>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 280 }}>
              {t("السيارة هي مفتاح الرحلة. اختر وجهتك وانطلق.", "The car is the key to your journey. Choose your destination and go.")}
            </p>
          </div>
          {cols.map((col, i) => (
            <div key={i}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: heading, marginBottom: 16 }}>
                {t(col.title.ar, col.title.en)}
              </h4>
              {col.links.map((l, li) => (
                <a key={li} href="#" style={{
                  display: "block", fontSize: 13, color: "rgba(255,255,255,0.45)",
                  textDecoration: "none", marginBottom: 10, transition: "color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = GREEN_L; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}>
                  {t(l.ar, l.en)}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
            {t("© 2026 رحلتك. جميع الحقوق محفوظة.", "© 2026 RoadTrip. All rights reserved.")}
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            {["T", "I", "F"].map((s, i) => (
              <div key={i} style={{
                width: 34, height: 34, borderRadius: 10,
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)",
                cursor: "pointer", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = GREEN; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}