import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts } from "@/app/themes/theme2/page";
import { BLUE, BLUE_L, PAD } from "@/app/themes/theme4/page";
import { Car } from "lucide-react";

export default function Footer() {
  const { t } = useAppContext();
  const { heading, body } = useFonts();

  return (
    <footer style={{ background: "#111827", padding:  PAD, color: "#9CA3AF" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, background: BLUE, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Car size={18} color="#fff" />
              </div>
              <span style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>Clean<span style={{ color: BLUE_L }}>Drive</span></span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7 }}>{t("أسرع طريقة لحجز سيارتك. بدون تعقيد.", "The fastest way to book your car. No complications.")}</p>
          </div>
          {[
            { title: { ar: "الشركة", en: "Company" }, links: [{ ar: "من نحن", en: "About" }, { ar: "فريقنا", en: "Team" }, { ar: "وظائف", en: "Careers" }] },
            { title: { ar: "السيارات", en: "Cars" }, links: [{ ar: "اقتصادية", en: "Economy" }, { ar: "دفع رباعي", en: "SUV" }, { ar: "فاخرة", en: "Luxury" }] },
            { title: { ar: "التواصل", en: "Contact" }, links: [{ ar: "+20 100 000 0000", en: "+20 100 000 0000" }, { ar: "hello@cleandrive.eg", en: "hello@cleandrive.eg" }, { ar: "القاهرة، مصر", en: "Cairo, Egypt" }] },
          ].map((col, i) => (
            <div key={i}>
              <p style={{ color: "#fff", fontWeight: 700, marginBottom: 14, fontSize: 14 }}>{t(col.title.ar, col.title.en)}</p>
              {col.links.map((l, j) => (
                <a key={j} href="#" style={{ display: "block", color: "#9CA3AF", fontSize: 14, textDecoration: "none", marginBottom: 8, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}>
                  {t(l.ar, l.en)}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #1F2937", paddingTop: 20, textAlign: "center" }}>
          <span style={{ fontSize: 13 }}>© 2026 CleanDrive · {t("جميع الحقوق محفوظة", "All Rights Reserved")}</span>
        </div>
      </div>
    </footer>
  );
}