import { useAppContext } from "@/app/contexts/AppContext";
import { services } from "@/app/data/carDate";
import { useFonts, BG2, TXT, PAD } from "@/app/themes/theme5/page";
import { GREEN, TXT3, CARD, BORDER } from "@/app/themes/theme5/page";
import { CYAN, INDIGO_L, CYAN_L } from "@/app/themes/theme5/page";
import { Car, CalendarDays, User, Plane, Gem, Briefcase, Wrench, ArrowRight } from "lucide-react";

export default function Services({ onBook }: { onBook: () => void }) {
  const { t, isRTL } = useAppContext();
  const { heading } = useFonts();

  const svcIcons = [
    <Car size={28} />, <CalendarDays size={28} />, <User size={28} />,
    <Plane size={28} />, <Gem size={28} />, <Briefcase size={28} />,
  ];
  const svcColors = [CYAN, INDIGO_L, GREEN, "#F59E0B", "#EC4899", CYAN_L];

  return (
    <section id="services" style={{ background: BG2, padding:PAD }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `rgba(79,70,229,0.08)`, border: `1px solid rgba(79,70,229,0.15)`,
            borderRadius: 20, padding: "6px 16px", marginBottom: 14,
          }}>
            <Wrench size={14} color={INDIGO_L} />
            <span style={{ fontSize: 13, fontWeight: 600, color: INDIGO_L }}>{t("خدماتنا", "Our Services")}</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 8 }}>
            {t("كل الخدمات في مكان واحد", "All Services in One Place")}
          </h2>
          <p style={{ color: TXT3, fontSize: 15 }}>{t("حلول تأجير متكاملة تناسب كل احتياجاتك", "Complete rental solutions for all your needs")}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {services.map((svc, i) => {
            const color = svcColors[i % svcColors.length];
            return (
              <div key={i} style={{
                background: CARD, borderRadius: 20, padding: "32px 26px",
                border: `1px solid ${BORDER}`, transition: "all 0.3s",
                cursor: "pointer", position: "relative", overflow: "hidden",
              }}
                onClick={onBook}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}30`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = ""; }}>
                <div style={{
                  position: "absolute", bottom: -20, [isRTL ? "right" : "left"]: -20,
                  width: 80, height: 80, borderRadius: "50%",
                  background: `radial-gradient(circle, ${color}08 0%, transparent 70%)`,
                }} />
                <div style={{
                  width: 60, height: 60, borderRadius: 18, marginBottom: 20,
                  background: `linear-gradient(135deg, ${color}12, ${color}04)`,
                  border: `1.5px solid ${color}20`,
                  display: "flex", alignItems: "center", justifyContent: "center", color,
                }}>{svcIcons[i]}</div>
                <h4 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 800, color: TXT, fontFamily: heading }}>
                  {t(svc.ar, svc.en)}
                </h4>
                <p style={{ margin: "0 0 18px", fontSize: 14, color: TXT3, lineHeight: 1.6 }}>
                  {t(svc.descAr, svc.descEn)}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color, fontSize: 13, fontWeight: 700 }}>
                  {t("احجز الآن", "Book Now")}
                  <ArrowRight size={14} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}