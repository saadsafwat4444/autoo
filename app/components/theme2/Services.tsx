import { useAppContext } from "@/app/contexts/AppContext";
import { BG, BG3, GOLD, LUX_IMG, PAD, SectionLabel, TXT_DIM, useFonts } from "@/app/themes/theme2/page";
import { Users, Plane, Heart, Gem, MapPin, Calendar } from "lucide-react";
import { useState } from "react";

// ─── VIP SERVICES ─────────────────────────────────────────────────────────────
export default function EServices() {
  const { t } = useAppContext();
  const { heading, body } = useFonts();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const vipServices = [
    { icon: Users, ar: "سائق خاص", en: "Private Chauffeur", descAr: "سائق محترف بأعلى معايير الخدمة الفاخرة.", descEn: "Professional driver with the highest luxury service standards.", img: LUX_IMG.chauffeur },
    { icon: Plane, ar: "استقبال المطار", en: "Airport VIP", descAr: "استقبال خاص من صالة المطار إلى سيارتك.", descEn: "VIP reception from the airport lounge to your car.", img: LUX_IMG.privateJet },
    { icon: Heart, ar: "سيارات الأفراح", en: "Wedding Cars", descAr: "سيارات مزينة بأناقة ليومك المميز.", descEn: "Elegantly decorated cars for your special day.", img: LUX_IMG.wedding },
    { icon: Gem, ar: "تجربة رجال الأعمال", en: "Corporate Luxury", descAr: "سيارات فاخرة مع سائق لكبار رجال الأعمال.", descEn: "Luxury cars with driver for top executives.", img: LUX_IMG.corporate },
    { icon: MapPin, ar: "جولات فاخرة", en: "Luxury City Tours", descAr: "جولات سياحية بسيارات فاخرة مع مرشد خاص.", descEn: "City tours in luxury cars with a personal guide.", img: LUX_IMG.cityTour },
    { icon: Calendar, ar: "إيجار طويل المدى", en: "Long-Term Leasing", descAr: "باقات إيجار مرنة بأسعار مميزة للشركات والأفراد.", descEn: "Flexible leasing packages at premium rates for companies and individuals.", img: LUX_IMG.interior },
  ];

  return (
    <section id="elite-services" style={{ background: BG3, padding: PAD, borderTop: `1px solid ${GOLD}12` }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <SectionLabel>{t("خدمات VIP", "VIP SERVICES")}</SectionLabel>
          <h2 style={{ fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 700, color: "#fff", margin: "16px 0 0", fontFamily: heading }}>
            {t("خدمات تليق بالنخبة", "Services Worthy of the Elite")}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {vipServices.map((svc, i) => {
            const hovered = hoveredIdx === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  position: "relative", height: 300, overflow: "hidden",
                  border: `1px solid ${hovered ? GOLD + "40" : GOLD + "10"}`,
                  transition: "border-color 0.4s",
                  cursor: "pointer",
                }}
              >
                <img
                  src={svc.img} alt=""
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transition: "transform 0.7s, filter 0.7s",
                    transform: hovered ? "scale(1.08)" : "",
                    filter: `brightness(${hovered ? 0.35 : 0.25})`,
                  }}
                />
                <div style={{
                  position: "absolute", inset: 0, padding: 32,
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                }}>
                  <div style={{
                    width: 48, height: 48, border: `1.5px solid ${GOLD}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 16, transition: "background 0.3s",
                    background: hovered ? GOLD : "transparent",
                  }}>
                    <svc.icon size={20} color={hovered ? BG : GOLD} />
                  </div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: heading }}>
                    {t(svc.ar, svc.en)}
                  </h3>
                  <p style={{
                    margin: 0, fontSize: 13, color: TXT_DIM, lineHeight: 1.7, fontFamily: body,
                    maxHeight: hovered ? 80 : 0, overflow: "hidden", transition: "max-height 0.4s, opacity 0.4s",
                    opacity: hovered ? 1 : 0,
                  }}>
                    {t(svc.descAr, svc.descEn)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}