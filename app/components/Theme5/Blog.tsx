import { useAppContext } from "@/app/contexts/AppContext";
import { blogPosts } from "@/app/data/carDate";
import { useFonts, BG, TXT, BG2, PAD } from "@/app/themes/theme5/page";
import { TXT3, BORDER, TXT2, CARD } from "@/app/themes/theme5/page";
import { GridBG, CYAN } from "@/app/themes/theme5/page";
import { BookOpen, ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function Blog({ onOpenArticle }: { onOpenArticle: (id: number) => void }) {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollBlog = (dir: number) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section id="blog" style={{ position: "relative", background: BG, padding: PAD, overflow: "hidden" }}>
      <GridBG />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div style={{  marginBottom: 52 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `rgba(6,182,212,0.08)`, border: `1px solid rgba(6,182,212,0.15)`,
            borderRadius: 20, padding: "6px 16px", marginBottom: 14,
          }}>
            <BookOpen size={14} color={CYAN} />
            <span style={{ fontSize: 13, fontWeight: 600, color: CYAN }}>{t("المدونة", "Blog")}</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 8 }}>
            {t("نصائح ومقالات", "Tips & Articles")}
          </h2>
          <p style={{ color: TXT3, fontSize: 15 }}>{t("مقالات تساعدك تختار صح وتوفر عليك", "Articles to help you choose right and save")}</p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20 }}>
            <button onClick={() => scrollBlog(isRTL ? 1 : -1)} style={{
              width: 42, height: 42, borderRadius: 12, background: BG2, border: `1px solid ${BORDER}`,
              color: TXT2, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = CYAN; e.currentTarget.style.color = CYAN; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TXT2; }}>
              <ChevronRight size={18} />
            </button>
            <button onClick={() => scrollBlog(isRTL ? -1 : 1)} style={{
              width: 42, height: 42, borderRadius: 12, background: BG2, border: `1px solid ${BORDER}`,
              color: TXT2, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = CYAN; e.currentTarget.style.color = CYAN; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TXT2; }}>
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>
        <div ref={scrollRef} style={{
          display: "flex", gap: 24, overflowX: "auto", scrollSnapType: "x mandatory",
          paddingBottom: 16, scrollbarWidth: "none",
        }}>
          {blogPosts.map(post => (
            <div key={post.id} onClick={() => onOpenArticle(post.id)} style={{
              minWidth: 340, maxWidth: 360, scrollSnapAlign: "start", flexShrink: 0,
              background: CARD, borderRadius: 18, overflow: "hidden",
              border: `1px solid ${BORDER}`, transition: "all 0.3s", cursor: "pointer",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(6,182,212,0.25)`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 50px rgba(0,0,0,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ position: "relative", height: 200 }}>
                <img src={post.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(2,6,23,0.85))" }} />
                <span style={{
                  position: "absolute", top: 14, [isRTL ? "right" : "left"]: 14,
                  background: `rgba(6,182,212,0.15)`, backdropFilter: "blur(8px)",
                  color: CYAN, fontSize: 11, fontWeight: 700, padding: "5px 12px",
                  borderRadius: 8, border: "1px solid rgba(6,182,212,0.2)",
                }}>{t(post.category.ar, post.category.en)}</span>
              </div>
              <div style={{ padding: "18px 20px" }}>
                <h4 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: TXT, fontFamily: heading, lineHeight: 1.4 }}>{t(post.title.ar, post.title.en)}</h4>
                <p style={{ margin: "0 0 14px", fontSize: 13, color: TXT3, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {t(post.excerpt.ar, post.excerpt.en)}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 12, color: TXT3, display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} /> {t(post.readTime.ar, post.readTime.en)}</span>
                    <span style={{ fontSize: 12, color: TXT3 }}>{post.date}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: CYAN, display: "flex", alignItems: "center", gap: 4 }}>
                    {t("اقرأ المزيد", "Read More")} <ArrowRight size={13} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}