import { useAppContext } from "@/app/contexts/AppContext";
import { blogPosts } from "@/app/data/carDate";
import { PAD, useFonts } from "@/app/themes/theme9/page";
import { W, TX, BD, TX3, TX2, pad } from "@/app/themes/theme9/page";
import { V, RSE, SKY } from "@/app/themes/theme9/page";
import { X, Clock, Calendar, ArrowLeft, ArrowRight } from "lucide-react";

 

// ═══════════════════════════════════════════════════════════════════════════
// ARTICLES — Minimal card row with personality tags
// ═══════════════════════════════════════════════════════════════════════════
export default  function Articles({ onOpenArticle }: { onOpenArticle: (bp: typeof blogPosts[0]) => void }) {
  const { t, isRTL } = useAppContext();
  const { h } = useFonts();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const tags = [
    { ar: "شخصية القيادة", en: "Driving Personality", color: V },
    { ar: "مغامرة", en: "Adventure", color: RSE },
    { ar: "نصائح", en: "Tips", color: SKY },
  ];

  return (
    <section id="articles" style={{ padding: PAD, background: W }}>
      <div style={pad}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36 }}>
          <div>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: TX, fontFamily: h, margin: 0 }}>
              {t("اكتشف شخصيتك في القيادة", "Discover Your Driving Personality")}
            </h2>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {blogPosts.slice(0, 3).map((bp, i) => {
            const tag = tags[i % tags.length];
            return (
              <div key={bp.id} onClick={() => onOpenArticle(bp)} style={{
                borderRadius: 22, overflow: "hidden", background: W,
                border: `1.5px solid ${BD}`, transition: "all 0.3s", cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ position: "relative", height: 180 }}>
                  <img src={bp.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 12, [isRTL ? "right" : "left"]: 12 }}>
                    <span style={{ background: W, borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 700, color: tag.color }}>{t(tag.ar, tag.en)}</span>
                  </div>
                </div>
                <div style={{ padding: "18px 20px" }}>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: TX, fontFamily: h, lineHeight: 1.5, marginBottom: 8 }}>{t(bp.title.ar, bp.title.en)}</h4>
                  <p style={{ fontSize: 13, color: TX3, lineHeight: 1.7, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{t(bp.excerpt.ar, bp.excerpt.en)}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: TX3, display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> {t(bp.readTime.ar, bp.readTime.en)}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: V, display: "flex", alignItems: "center", gap: 4 }}>{t("اقرأ", "Read")} <Arrow size={11} /></span>
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