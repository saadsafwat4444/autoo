

"use client";
import { useAppContext } from "@/app/contexts/AppContext";
import { useState } from "react";
import { ChevronRight, ArrowRight, Clock } from "lucide-react";
import { DARK } from "@/app/themes/theme1/page";
import { useRouter } from "next/navigation";
import { blogPosts } from "@/app/data/carDate";

export default function BlogPage() {
  const { t, lang, accent } = useAppContext();
  const router = useRouter();
  const ff   = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isAr = lang === "ar";

  

  const allCategories = [
    { key: "all", ar: "الكل", en: "All" },
    { key: "tips", ar: "نصائح", en: "Tips" },
    { key: "travel", ar: "سياحة", en: "Travel" },
    { key: "subscriptions", ar: "اشتراكات", en: "Subscriptions" },
    { key: "safety", ar: "أمان", en: "Safety" },
    { key: "family", ar: "عائلي", en: "Family" },
    { key: "technology", ar: "تقنية", en: "Technology" },
    { key: "reviews", ar: "مراجعات", en: "Reviews" },
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = blogPosts.filter(p =>
    activeCategory === "all" ||
    t(p.category.ar, p.category.en).toLowerCase() === allCategories.find(c => c.key === activeCategory)?.[isAr ? "ar" : "en"].toLowerCase()
  );

  const featured = blogPosts[0];
  const rest = filtered.filter(p => p.id !== featured.id);

  const formatDate = (d: string) => {
    const date = new Date(d);
    return isAr
      ? date.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })
      : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: ff, direction: isAr ? "rtl" : "ltr" }}>

      {/* Page Hero */}
      <div style={{ background: DARK, padding: "120px 48px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <button onClick={() => router.push("/")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 13, fontFamily: ff, padding: 0, fontWeight: 500 }}>
              {t("الرئيسية", "Home")}
            </button>
            <ChevronRight size={12} color="rgba(255,255,255,0.25)" style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
            <span style={{ color: accent, fontSize: 13, fontWeight: 600 }}>{t("المدونة", "Blog")}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 24, height: 2, background: accent, borderRadius: 2 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              {t("المعرفة", "Knowledge")}
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", margin: 0, lineHeight: 1 }}>
            {t("المدونة.", "The Blog.")}
          </h1>
          <p style={{ margin: "16px 0 0", fontSize: 16, color: "rgba(255,255,255,0.45)", maxWidth: 480 }}>
            {t("نصائح وتقارير ورحلات — كل ما يخص عالم السيارات", "Tips, guides & journeys — everything about the world of cars")}
          </p>
        </div>
      </div>

      {/* Featured Article */}
      {(activeCategory === "all") && (
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 48px 0" }}>
          <div
            onClick={() => {
              router.push(`/blog/${featured.id}`);
            }}
            style={{ borderRadius: 20, overflow: "hidden", position: "relative", height: 420, cursor: "pointer", display: "flex", alignItems: "flex-end" }}
            onMouseEnter={e => { const img = (e.currentTarget as HTMLElement).querySelector("img"); if (img) img.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { const img = (e.currentTarget as HTMLElement).querySelector("img"); if (img) img.style.transform = ""; }}
          >
            <img src={featured.image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)" }} />
            <div style={{ position: "relative", zIndex: 2, padding: "40px 48px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ background: accent, color: "#fff", fontSize: 10, fontWeight: 800, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {t("مميز", "Featured")}
                </span>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{t(featured.category.ar, featured.category.en)} · {t(featured.readTime.ar, featured.readTime.en)}</span>
              </div>
              <h2 style={{ margin: "0 0 12px", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", maxWidth: 700 }}>
                {t(featured.title.ar, featured.title.en)}
              </h2>
              <p style={{ margin: "0 0 20px", fontSize: 15, color: "rgba(255,255,255,0.65)", maxWidth: 560 }}>
                {"excerpt" in featured ? t((featured as any).excerpt.ar, (featured as any).excerpt.en) : ""}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                  {"author" in featured ? t((featured as any).author.ar, (featured as any).author.en) : ""} · {formatDate(featured.date)}
                </span>
                <span style={{ color: accent, fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
                  {t("اقرأ المقال", "Read Article")} <ArrowRight size={13} style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 48px 0" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {allCategories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                padding: "7px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: ff,
                transition: "all 0.18s",
                background: activeCategory === cat.key ? accent : "#F3F4F6",
                color: activeCategory === cat.key ? "#fff" : "#374151",
                border: activeCategory === cat.key ? `1.5px solid ${accent}` : "1.5px solid transparent",
              }}
            >
              {t(cat.ar, cat.en)}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "36px 48px 96px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "96px 0", color: "#9CA3AF" }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#374151" }}>{t("لا توجد مقالات في هذه الفئة", "No articles in this category")}</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {(activeCategory === "all" ? rest : filtered).map(post => (
              <div
                key={post.id}
                onClick={() => {
                  router.push(`/blog/${post.id}`);
                }}
                style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(0,0,0,0.07)", cursor: "pointer", transition: "transform 0.25s, box-shadow 0.25s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
              >
                {/* Image */}
                <div style={{ height: 210, overflow: "hidden", position: "relative" }}>
                  <img
                    src={post.image} alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "")}
                  />
                  <div style={{ position: "absolute", top: 14, [isAr ? "right" : "left"]: 14, background: accent, padding: "4px 12px", borderRadius: 20 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t(post.category.ar, post.category.en)}</span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "22px 24px 26px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                    <Clock size={12} color="#9CA3AF" />
                    <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>{t(post.readTime.ar, post.readTime.en)}</span>
                    <span style={{ color: "#D1D5DB" }}>·</span>
                    <span style={{ fontSize: 11, color: "#9CA3AF" }}>{formatDate(post.date)}</span>
                  </div>
                  <h3 style={{ margin: "0 0 10px", fontSize: 17, fontWeight: 800, color: "#111", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
                    {t(post.title.ar, post.title.en)}
                  </h3>
                  <p style={{ margin: "0 0 18px", fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>
                    {"excerpt" in post ? t((post as any).excerpt.ar, (post as any).excerpt.en) : ""}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, color: accent, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                      {t("اقرأ المزيد", "Read more")} <ArrowRight size={12} style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
                    </span>
                    <span style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500 }}>
                      {"author" in post ? t((post as any).author.ar, (post as any).author.en) : ""}
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