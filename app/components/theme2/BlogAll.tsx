import { useAppContext } from "@/app/contexts/AppContext";
import { blogPosts } from "@/app/data/carDate";
import { BG, BG2, BG3, GOLD, GOLD_D, SEC_BTN, SEC_BTN_BRD, SEC_BTN_TXT, SectionLabel, TXT_DIM, useFonts, showEPage, showEArticle } from "@/app/themes/theme2/page";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useState } from "react";

export  default function BlogAll(){
 
  const { t, lang } = useAppContext();
  const { heading, body, isAr } = useFonts();
  const [cat, setCat] = useState("all");

  const categories = [
    { key: "all", ar: "الكل", en: "All" },
    { key: "tips", ar: "نصائح", en: "Tips" },
    { key: "travel", ar: "سياحة", en: "Travel" },
    { key: "subscriptions", ar: "اشتراكات", en: "Subscriptions" },
    { key: "safety", ar: "أمان", en: "Safety" },
    { key: "family", ar: "عائلي", en: "Family" },
    { key: "technology", ar: "تقنية", en: "Technology" },
    { key: "reviews", ar: "مراجعات", en: "Reviews" },
  ];

  const filtered = cat === "all" ? blogPosts : blogPosts.filter(p =>
    t(p.category.ar, p.category.en).toLowerCase() === categories.find(c => c.key === cat)?.[isAr ? "ar" : "en"]?.toLowerCase()
  );

  const formatDate = (d: string) => {
    const date = new Date(d);
    return isAr
      ? date.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })
      : date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: body }}>
      {/* Hero */}
      <div style={{ background: BG2, padding: "130px 40px 60px", borderBottom: `1px solid ${GOLD}15` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <button onClick={() => showEPage("home")} style={{ background: "none", border: "none", cursor: "pointer", color: TXT_DIM, fontSize: 13, fontFamily: body, padding: 0 }}>
              {t("الرئيسية", "Home")}
            </button>
            <ChevronRight size={12} color={`${GOLD}40`} style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
            <span style={{ color: GOLD, fontSize: 13, fontWeight: 600 }}>{t("المدونة", "Blog")}</span>
          </div>
          <SectionLabel>{t("المدونة الفاخرة", "LUXURY BLOG")}</SectionLabel>
          <h1 style={{ fontSize: "clamp(2.5rem,4.5vw,4rem)", fontWeight: 700, color: "#fff", margin: "16px 0 0", fontFamily: heading }}>
            {t("جميع المقالات", "All Articles")}
          </h1>
        </div>
      </div>

      {/* Filters */}
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "36px 40px 0" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {categories.map(c => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              style={{
                padding: "8px 20px", fontSize: 12, fontWeight: 600, fontFamily: body,
                cursor: "pointer", letterSpacing: "0.06em", transition: "all 0.25s",
                background: cat === c.key ? `linear-gradient(135deg, ${GOLD}, ${GOLD_D})` : SEC_BTN,
                color: cat === c.key ? BG : SEC_BTN_TXT,
                border: `1px solid ${cat === c.key ? "transparent" : SEC_BTN_BRD}`,
              }}
            >
              {t(c.ar, c.en)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "32px 40px 100px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ color: TXT_DIM, fontSize: 16 }}>{t("لا توجد مقالات في هذه الفئة", "No articles in this category")}</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {filtered.map(post => (
              <div
                key={post.id}
                onClick={() => showEArticle(post)}
                style={{
                  background: BG3, border: `1px solid ${GOLD}12`, cursor: "pointer",
                  transition: "all 0.3s", overflow: "hidden",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}40`; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}12`; (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                <div style={{ height: 200, overflow: "hidden" }}>
                  <img src={post.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)", transition: "transform 0.5s" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                    onMouseLeave={e => e.currentTarget.style.transform = ""} />
                </div>
                <div style={{ padding: "22px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span style={{ background: `${GOLD}15`, color: GOLD, fontSize: 10, fontWeight: 700, padding: "3px 10px", letterSpacing: "0.1em" }}>
                      {t(post.category.ar, post.category.en).toUpperCase()}
                    </span>
                    <span style={{ fontSize: 11, color: TXT_DIM }}>{t(post.readTime.ar, post.readTime.en)}</span>
                  </div>
                  <h3 style={{ margin: "0 0 10px", fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.35, fontFamily: heading }}>
                    {t(post.title.ar, post.title.en)}
                  </h3>
                  <p style={{ margin: "0 0 14px", fontSize: 13, color: TXT_DIM, lineHeight: 1.6 }}>
                    {t((post as any).excerpt?.ar ?? "", (post as any).excerpt?.en ?? "")}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: TXT_DIM }}>
                      {t((post as any).author?.ar ?? "", (post as any).author?.en ?? "")} · {formatDate(post.date)}
                    </span>
                    <span style={{ fontSize: 12, color: GOLD, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                      {t("اقرأ", "Read")} <ArrowRight size={12} style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
