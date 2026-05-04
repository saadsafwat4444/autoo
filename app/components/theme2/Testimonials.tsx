import { useAppContext } from "@/app/contexts/AppContext";
import { testimonials } from "@/app/data/carDate";
import { BG, BG3, ffBody, ffEn, GOLD, PAD, SectionLabel, TXT, useFonts } from "@/app/themes/theme2/page";
import { Star } from "lucide-react";

export default function Testimonials() {
  const { t } = useAppContext();
  const { heading, body, isAr } = useFonts();

  return (
    <section style={{ background: BG, padding: PAD, borderTop: `1px solid ${GOLD}12` }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60 }}>
          <div>
            <SectionLabel>{t("آراء عملائنا", "CLIENT TESTIMONIALS")}</SectionLabel>
            <h2 style={{ fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, color: "#fff", margin: "16px 0 0", fontFamily: heading }}>
              {t("ماذا يقول عملاؤنا", "What Our Clients Say")}
            </h2>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {testimonials.map((tm, i) => (
            <div
              key={tm.id}
              style={{
                background: BG3, padding: "36px 32px", position: "relative",
                border: `1px solid ${GOLD}12`,
                transition: "border-color 0.3s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}40`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}12`}
            >
              {/* Quote mark */}
              <div style={{
                fontSize: 72, fontFamily: ffEn, color: GOLD, opacity: 0.15,
                position: "absolute", top: 12, [isAr ? "left" : "right"]: 24, lineHeight: 1,
              }}>"</div>

              <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                {Array.from({ length: tm.rating }).map((_, j) => <Star key={j} size={14} fill={GOLD} color={GOLD} />)}
              </div>

              <p style={{ color: TXT, fontSize: 15, lineHeight: 1.85, marginBottom: 28, opacity: 0.85, fontFamily: body }}>
                {t(tm.comment.ar, tm.comment.en)}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 14, borderTop: `1px solid ${GOLD}15`, paddingTop: 20 }}>
                <img src={tm.avatar} alt="" style={{ width: 48, height: 48, objectFit: "cover", filter: "grayscale(30%)" }} />
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#fff", fontFamily: heading }}>
                    {t(tm.name.ar, tm.name.en)}
                  </p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: GOLD, opacity: 0.7, letterSpacing: "0.08em", fontFamily: ffBody }}>
                    {t(tm.role.ar, tm.role.en).toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}