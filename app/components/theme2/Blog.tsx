import { useAppContext } from "@/app/contexts/AppContext";
import { blogPosts } from "@/app/data/carDate";
import { PAD } from "@/app/themes/theme2/page";
import { useFonts, BG3, GOLD, SectionLabel, SEC_BTN, SEC_BTN_BRD, SEC_BTN_TXT, BG, TXT_DIM, BG2, ffBody, showEArticle, showEPage } from "@/app/themes/theme2/page";
import { ArrowRight, Clock } from "lucide-react";

export default function EBlog() {
  const { t } = useAppContext();
  const { heading, body, isAr } = useFonts();

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const featured = blogPosts[7]; // luxury car review
  const rest = blogPosts.filter(p => p.id !== featured.id).slice(0, 4);

  return (
    <section id="elite-blog" style={{ background: BG3, padding: PAD, borderTop: `1px solid ${GOLD}12` }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60 }}>
          <div>
            <SectionLabel>{t("المدونة الفاخرة", "LUXURY BLOG")}</SectionLabel>
            <h2 style={{ fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, color: "#fff", margin: "16px 0 0", fontFamily: heading }}>
              {t("أحدث المقالات", "Latest Articles")}
            </h2>
          </div>
          <button
            onClick={() => showEPage("blog")}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: SEC_BTN, border: `1px solid ${SEC_BTN_BRD}`,
              color: SEC_BTN_TXT, padding: "10px 24px", cursor: "pointer",
              fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", fontFamily: body,
              transition: "all 0.25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${GOLD}28`; e.currentTarget.style.color = GOLD; }}
            onMouseLeave={e => { e.currentTarget.style.background = SEC_BTN; e.currentTarget.style.color = SEC_BTN_TXT; }}
          >
            {t("عرض الكل", "VIEW ALL")} <ArrowRight size={14} style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
          {/* Featured */}
          <div
            onClick={() => showEArticle(featured)}
            style={{
              position: "relative", height: 440, overflow: "hidden",
              border: `1px solid ${GOLD}15`, cursor: "pointer",
            }}
            onMouseEnter={e => {
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.transform = "scale(1.05)";
            }}
            onMouseLeave={e => {
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.transform = "";
            }}
          >
            <img src={featured.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s", filter: "brightness(0.5)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,11,11,0.9) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", bottom: 0, padding: "40px 36px" }}>
              <span style={{ background: GOLD, color: BG, fontSize: 10, fontWeight: 800, padding: "4px 14px", letterSpacing: "0.12em" }}>
                {t("مقال مميز", "FEATURED")}
              </span>
              <h3 style={{ margin: "16px 0 10px", fontSize: 24, fontWeight: 700, color: "#fff", fontFamily: heading, lineHeight: 1.25 }}>
                {t(featured.title.ar, featured.title.en)}
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: TXT_DIM, lineHeight: 1.7, fontFamily: body }}>
                {t((featured as any).excerpt?.ar, (featured as any).excerpt?.en)}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
                <Clock size={12} color={GOLD} />
                <span style={{ fontSize: 12, color: TXT_DIM }}>{t(featured.readTime.ar, featured.readTime.en)}</span>
                <span style={{ color: `${GOLD}30` }}>|</span>
                <span style={{ fontSize: 12, color: TXT_DIM }}>{formatDate(featured.date)}</span>
              </div>
            </div>
          </div>

          {/* Side articles */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {rest.slice(0, 4).map(post => (
              <div
                key={post.id}
                onClick={() => showEArticle(post)}
                style={{
                  display: "flex", gap: 16, padding: 16, background: BG2,
                  border: `1px solid ${GOLD}12`, cursor: "pointer",
                  transition: "border-color 0.3s",
                  flex: 1,
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}40`}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}12`}
              >
                <img src={post.image} alt="" style={{ width: 90, height: 80, objectFit: "cover", flexShrink: 0, filter: "brightness(0.8)" }} />
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span style={{ fontSize: 10, color: GOLD, letterSpacing: "0.12em", fontWeight: 600, fontFamily: ffBody }}>
                    {t(post.category.ar, post.category.en).toUpperCase()}
                  </span>
                  <h4 style={{ margin: "6px 0 0", fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.35, fontFamily: heading }}>
                    {t(post.title.ar, post.title.en)}
                  </h4>
                  <span style={{ fontSize: 11, color: TXT_DIM, marginTop: 4 }}>{formatDate(post.date)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}