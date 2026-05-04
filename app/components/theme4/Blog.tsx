import { BG, BG2, BLUE, BLUE_BG, BORDER, PAD, TXT, TXT2, TXT3, useFonts } from "@/app/themes/theme4/page";
import { useAppContext } from "@/app/contexts/AppContext";
import { useState } from "react";
import { blogPosts } from "@/app/data/carDate";
import { ArrowRight, Clock, X } from "lucide-react";

export default function Blog() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [viewAll, setViewAll] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const displayPosts = viewAll ? blogPosts : blogPosts.slice(0, 3);

  return (
    <section id="blog" style={{ background: BG2, padding: PAD }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800, color: TXT, fontFamily: heading, margin: 0 }}>
            {t("مقالات ونصائح", "Articles & Tips")}
          </h2>
          <button onClick={() => setViewAll(!viewAll)} style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: BLUE, fontSize: 14, fontWeight: 600, fontFamily: heading,
            display: "flex", alignItems: "center", gap: 6,
          }}>{viewAll ? t("عرض أقل", "Show Less") : t("عرض الكل", "View All")} <ArrowRight size={14} /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {displayPosts.map((post, i) => (
            <div key={post.id} onClick={() => setSelectedArticle(i)} style={{
              background: BG, borderRadius: 14, overflow: "hidden",
              border: `1px solid ${BORDER}`, cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = ""; }}>
              <img src={post.image} alt="" style={{ width: "100%", height: 180, objectFit: "cover" }} />
              <div style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
                  <span style={{ background: BLUE_BG, color: BLUE, borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{t(post.category.ar, post.category.en)}</span>
                  <span style={{ color: TXT3, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} /> {t(post.readTime.ar, post.readTime.en)}</span>
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700, color: TXT, lineHeight: 1.5, fontFamily: body }}>{t(post.title.ar, post.title.en)}</h3>
                <p style={{ margin: 0, fontSize: 13, color: TXT3, lineHeight: 1.6 }}>{t(post.excerpt.ar, post.excerpt.en)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail */}
      {selectedArticle !== null && (() => {
        const post = (viewAll ? blogPosts : blogPosts.slice(0, 3))[selectedArticle];
        if (!post) return null;
        return (
          <div onClick={() => setSelectedArticle(null)} style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)",
            zIndex: 999, overflow: "auto", padding: "40px 20px",
          }}>
            <div onClick={e => e.stopPropagation()} style={{ maxWidth: 720, margin: "0 auto", background: BG, borderRadius: 20, overflow: "hidden" }}>
              <div style={{ position: "relative", height: 300 }}>
                <img src={post.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button onClick={() => setSelectedArticle(null)} style={{
                  position: "absolute", top: 16, right: 16, background: BG, border: "none",
                  borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}><X size={18} color={TXT} /></button>
              </div>
              <div style={{ padding: "28px 32px" }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "center" }}>
                  <span style={{ background: BLUE_BG, color: BLUE, borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>{t(post.category.ar, post.category.en)}</span>
                  <span style={{ color: TXT3, fontSize: 13 }}>{t(post.readTime.ar, post.readTime.en)} {t("قراءة", "read")}</span>
                  <span style={{ color: TXT3, fontSize: 13 }}>{post.date}</span>
                </div>
                <h1 style={{ margin: "0 0 16px", fontSize: 24, fontWeight: 800, color: TXT, fontFamily: heading, lineHeight: 1.4 }}>
                  {t(post.title.ar, post.title.en)}
                </h1>
                <p style={{ fontSize: 15, color: TXT2, lineHeight: 2, marginBottom: 28 }}>
                  {t(post.excerpt.ar, post.excerpt.en)}
                  {"\n\n"}
                  {t(
                    "هذا المقال يقدم لك نظرة شاملة حول الموضوع مع نصائح عملية يمكنك تطبيقها مباشرة. نسعى دائماً لتقديم محتوى قيّم يساعدك في اتخاذ قرارات أفضل عند اختيار سيارتك.",
                    "This article provides a comprehensive overview of the topic with practical tips you can apply directly. We always strive to provide valuable content to help you make better decisions when choosing your car."
                  )}
                </p>
                <button onClick={() => { setSelectedArticle(null); document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" }); }} style={{
                  padding: "12px 24px", borderRadius: 10, background: BLUE, color: "#fff",
                  border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer",
                  fontFamily: heading, display: "flex", alignItems: "center", gap: 8,
                }}>
                  {t("احجز سيارة الآن", "Book a Car Now")}
                  <ArrowRight size={14} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}