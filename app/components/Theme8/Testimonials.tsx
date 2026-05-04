import { useAppContext } from "@/app/contexts/AppContext";
import { testimonials } from "@/app/data/carDate";
import { PAD } from "@/app/themes/theme7/page";
import { useFonts, BG2 } from "@/app/themes/theme8/page";
import { pad, TX, W, BD, AMB, TX2, TX3 } from "@/app/themes/theme8/page";
import { O, OBG } from "@/app/themes/theme8/page";
import { Quote, Star } from "lucide-react";

export default function Testimonials() {
  const { t, isRTL } = useAppContext();
  const { h } = useFonts();
  return (
    <section style={{ padding: PAD, background: BG2 }}>
      <div style={pad}>
        <div style={{  marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, color: O, marginBottom: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <Quote size={14} /> {t("آراء العملاء", "Client Reviews")}
          </div>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: TX, fontFamily: h }}>{t("ماذا يقول عملاؤنا", "What Our Clients Say")}</h2>
        </div>
        <div style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 8 }} className="t8-noscroll">
          {testimonials.map((tm, i) => (
            <div key={tm.id} style={{
              flex: "0 0 340px", background: W, borderRadius: 20,
              padding: "28px 24px", border: `1.5px solid ${BD}`,
              transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
              {/* Stars */}
              <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} size={14} fill={si < tm.rating ? AMB : BD} color={si < tm.rating ? AMB : BD} />
                ))}
              </div>
              <p style={{ fontSize: 14, color: TX2, lineHeight: 1.85, marginBottom: 20, minHeight: 70 }}>
                {t(tm.comment.ar, tm.comment.en)}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: `1px solid ${BD}`, paddingTop: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: `2px solid ${OBG}` }}>
                  <img src={tm.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TX, fontFamily: h }}>{t(tm.name.ar, tm.name.en)}</div>
                  <div style={{ fontSize: 11, color: TX3 }}>{t(tm.role.ar, tm.role.en)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}