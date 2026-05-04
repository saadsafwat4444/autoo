import { useAppContext } from "@/app/contexts/AppContext";
import { testimonials } from "@/app/data/carDate";
import { BG, BG3, GOLD, TXT, TXT_DIM, useFonts } from "@/app/themes/theme2/page";
import { SectionBadge, RED, PAD } from "@/app/themes/theme3/page";
import { Star } from "lucide-react";

export default function Testimonials() {
  const { t, lang } = useAppContext();
  const { heading, body } = useFonts();

  return (
    <section style={{ background: BG, padding: PAD }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px" }}>
        <div style={{marginBottom: 48 }}>
          <SectionBadge>{t("آراء العملاء", "TESTIMONIALS")}</SectionBadge>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 900, color: TXT, fontFamily: heading, margin: "8px 0 0" }}>
            {t("ماذا يقول عملاؤنا", "WHAT CLIENTS SAY")}
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {testimonials.map(tm => (
            <div key={tm.id} style={{
              background: BG3, borderRadius: 4, padding: "28px",
              borderTop: `3px solid ${RED}`, position: "relative",
            }}>
              {/* Quote mark */}
              <div style={{ fontSize: 48, color: `${GOLD}40`, fontWeight: 900, lineHeight: 1, marginBottom: 8 }}>"</div>
              <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                {Array.from({ length: tm.rating }).map((_, i) => <Star key={i} size={14} fill={GOLD} color={GOLD} />)}
              </div>
              <p style={{ margin: "0 0 20px", color: TXT_DIM, fontSize: 14, lineHeight: 1.8, fontFamily: body }}>{t(tm.comment.ar, tm.comment.en)}</p>
              <div style={{ display: "flex", gap: 12, alignItems: "center", borderTop: `1px solid ${TXT}10`, paddingTop: 16 }}>
                <img src={tm.avatar} alt="" style={{ width: 44, height: 44, borderRadius: 4, objectFit: "cover", border: `2px solid ${RED}` }} />
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: TXT }}>{t(tm.name.ar, tm.name.en)}</p>
                  <p style={{ margin: 0, fontSize: 12, color: RED, fontWeight: 600 }}>{t(tm.role.ar, tm.role.en)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}