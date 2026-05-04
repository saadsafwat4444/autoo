import { useAppContext } from "@/app/contexts/AppContext";
import { blogPosts } from "@/app/data/carDate";
import { useFonts, BG, PAD } from "@/app/themes/theme7/page";
import { W, pad, P, TX, BD, TX3, TX2 } from "@/app/themes/theme7/page";
import { TrendingUp, ArrowLeft, ArrowRight, Users, Clock, X, Car } from "lucide-react";
import { useState } from "react";

export default function Articles() {
  const { t, isRTL } = useAppContext();
  const { h } = useFonts();
  const [activePost, setActivePost] = useState<number | null>(null);
  const post = activePost !== null ? blogPosts[activePost] : null;
  const articles = [{ idx: 0, tag: { ar: "المدينة", en: "City" } }, { idx: 2, tag: { ar: "نصائح", en: "Tips" } }, { idx: 4, tag: { ar: "عائلي", en: "Family" } }];
  const featured = blogPosts[articles[0].idx];
  const side = [articles[1], articles[2]];

  return (
    <section id="articles" style={{ background: W, padding: PAD }}>
      <div style={pad}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 44 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 800, color: P, marginBottom: 10, letterSpacing: "0.05em" }}><TrendingUp size={16} />{t("نصائح القيادة في المدينة", "City Driving Tips")}</div>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)", fontWeight: 900, color: TX, fontFamily: h }}>{t("أحدث المقالات", "Latest Articles")}</h2>
          </div>
          <button style={{ padding: "10px 24px", borderRadius: 30, background: W, color: P, border: `1.5px solid ${P}30`, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: h, display: "flex", alignItems: "center", gap: 6 }}>
            {t("كل المقالات", "All Articles")} {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 24 }}>
          {featured && (
            <div onClick={() => setActivePost(0)} style={{ borderRadius: 28, overflow: "hidden", position: "relative", cursor: "pointer", transition: "all 0.3s", gridRow: "span 2" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.01)"; }} onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
              <img src={featured.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 480 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(17,24,39,0.85))" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "36px 32px" }}>
                <span style={{ background: P, color: "#fff", padding: "5px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, marginBottom: 16, display: "inline-block" }}>{t(articles[0].tag.ar, articles[0].tag.en)}</span>
                <h3 style={{ fontSize: 26, fontWeight: 900, color: "#fff", fontFamily: h, lineHeight: 1.4, marginBottom: 12 }}>{t(featured.title.ar, featured.title.en)}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 16 }}>{t(featured.excerpt.ar, featured.excerpt.en).slice(0, 120)}...</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 4 }}><Users size={12} /> {t(featured.author.ar, featured.author.en)}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} /> {t(featured.readTime.ar, featured.readTime.en)}</span>
                </div>
              </div>
            </div>
          )}
          {side.map((ca, i) => {
            const p2 = blogPosts[ca.idx]; if (!p2) return null;
            return (
              <div key={i} onClick={() => setActivePost(ca.idx)} style={{ display: "flex", gap: 18, background: BG, borderRadius: 22, padding: 16, cursor: "pointer", border: `1px solid ${BD}`, transition: "all 0.3s", alignItems: "center" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.borderColor = `${P}30`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = BD; }}>
                <img src={p2.image} alt="" style={{ width: 140, height: 120, objectFit: "cover", borderRadius: 16, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: P, background: `${P}08`, padding: "3px 12px", borderRadius: 6, marginBottom: 10, display: "inline-block" }}>{t(ca.tag.ar, ca.tag.en)}</span>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: TX, fontFamily: h, lineHeight: 1.5, marginBottom: 8 }}>{t(p2.title.ar, p2.title.en)}</h4>
                  <div style={{ display: "flex", gap: 12 }}>
                    <span style={{ fontSize: 11, color: TX3, display: "flex", alignItems: "center", gap: 4 }}><Clock size={10} /> {t(p2.readTime.ar, p2.readTime.en)}</span>
                    <span style={{ fontSize: 11, color: TX3 }}>{p2.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {post && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9990, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "t7fi 0.3s" }} onClick={() => setActivePost(null)}>
          <div style={{ background: W, borderRadius: 28, width: "100%", maxWidth: 700, maxHeight: "90vh", overflow: "auto", boxShadow: "0 30px 100px rgba(0,0,0,0.25)" }} onClick={e => e.stopPropagation()}>
            <div style={{ position: "relative", height: 280 }}>
              <img src={post.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "28px 28px 0 0" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6))", borderRadius: "28px 28px 0 0" }} />
              <button onClick={() => setActivePost(null)} style={{ position: "absolute", top: 16, right: 16, width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={20} color={TX} /></button>
              <h2 style={{ position: "absolute", bottom: 24, left: 28, right: 28, fontSize: 24, fontWeight: 900, color: "#fff", fontFamily: h, lineHeight: 1.3 }}>{t(post.title.ar, post.title.en)}</h2>
            </div>
            <div style={{ padding: "28px 28px 32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, paddingBottom: 18, borderBottom: `1px solid ${BD}` }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${P}10`, color: P, display: "flex", alignItems: "center", justifyContent: "center" }}><Users size={18} /></div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TX }}>{t(post.author.ar, post.author.en)}</div>
                  <div style={{ fontSize: 12, color: TX3 }}>{post.date} · {t(post.readTime.ar, post.readTime.en)}</div>
                </div>
              </div>
              <p style={{ fontSize: 15, color: TX2, lineHeight: 1.9, marginBottom: 24 }}>{t(post.excerpt.ar, post.excerpt.en)}</p>
              <div style={{ background: BG, borderRadius: 16, padding: "18px 22px", marginBottom: 24, borderLeft: `4px solid ${P}` }}>
                <p style={{ fontSize: 14, color: TX2, lineHeight: 1.8, fontStyle: "italic" }}>{t("القيادة في المدينة تحتاج تركيز وتخطيط — ابدأ يومك بسيارة مريحة.", "City driving requires focus and planning — start with a comfortable car.")}</p>
              </div>
              <button onClick={() => { setActivePost(null); document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" }); }} style={{ width: "100%", padding: "14px", borderRadius: 16, background: P, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: h, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Car size={16} /> {t("احجز سيارتك", "Book Your Car")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
