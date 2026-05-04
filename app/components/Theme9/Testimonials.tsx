import { useAppContext } from "@/app/contexts/AppContext";
import { testimonials } from "@/app/data/carDate";
import { useFonts, BG, PAD } from "@/app/themes/theme9/page";
import { pad, TX, W, BD, AMB, TX2 } from "@/app/themes/theme9/page";
import { V, PNK, SKY } from "@/app/themes/theme9/page";
import { Star } from "lucide-react";

export default function Testimonials() {
  const { t, isRTL } = useAppContext();
  const { h } = useFonts();

  return (
    <section style={{ padding: PAD, background: BG }}>
      <div style={pad}>
        <div style={{  marginBottom: 40 }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: TX, fontFamily: h }}>
            {t("ناس جرّبت واختارت شخصيتها", "People who tried and found their match")}
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {testimonials.slice(0, 3).map((tm, i) => {
            const colors = [V, PNK, SKY];
            const c = colors[i % 3];
            return (
              <div key={tm.id} style={{
                borderRadius: 24, padding: "28px 24px", background: W,
                border: `1.5px solid ${BD}`, position: "relative",
              }}>
                {/* Chat bubble tail */}
                <div style={{
                  width: 0, height: 0, position: "absolute", bottom: -12, [isRTL ? "right" : "left"]: 32,
                  borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderTop: `12px solid ${W}`,
                }} />
                <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
                  {Array.from({ length: tm.rating }).map((_, s) => <Star key={s} size={14} fill={AMB} color={AMB} />)}
                </div>
                <p style={{ fontSize: 14, color: TX2, lineHeight: 1.85, marginBottom: 18 }}>
                  "{t(tm.comment.ar, tm.comment.en)}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: `1px solid ${BD}`, paddingTop: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", border: `2px solid ${c}20` }}>
                    <img src={tm.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: TX }}>{t(tm.name.ar, tm.name.en)}</div>
                    <div style={{ fontSize: 11, color: c, fontWeight: 600 }}>{t(tm.role.ar, tm.role.en)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}