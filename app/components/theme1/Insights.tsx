"use client";

import { useAppContext } from "@/app/contexts/AppContext";
import { blogPosts } from "@/app/data/carDate";
import { DARK, OFF_WHITE, PAD } from "@/app/themes/theme1/page";
import { useRouter } from "next/navigation";
import { ArrowBigLeft, ArrowRight } from "lucide-react";

export default function Insights() {
  const { t, lang, accent } = useAppContext();
  const router = useRouter();
  const ff   = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isAr = lang === "ar";
  return (
    <section style={{ background: OFF_WHITE, padding: PAD, fontFamily: ff, direction: isAr ? "rtl" : "ltr" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 24, height: 2, background: accent, borderRadius: 2 }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                {t("المدونة", "Blog")}
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900, color: DARK, letterSpacing: "-0.05em", margin: 0, lineHeight: 0.95 }}>
              {t("مقالات.", "Insights.")}
            </h2>
          </div>
          <button 
          onClick={() => router.push("/blog")} 
          style={{ color: accent, fontSize: 14, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, letterSpacing: "0.04em", background: "none", border: "none", cursor: "pointer", fontFamily: ff }}>
            {t("عرض الكل", "View All")} <ArrowRight size={16} style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {blogPosts.slice(0,3).map(post => (
            <div
              key={post.id}
              onClick={() => {
              router.push(`/blog/${post.id}`);
            }}
              style={{ cursor: "pointer", background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", transition: "transform 0.25s, box-shadow 0.25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${accent}14`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <div style={{ height: 220, overflow: "hidden" }}>
                <img src={post.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ""} />
              </div>
              <div style={{ padding: "24px 28px 32px" }}>
                <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {t(post.category.ar, post.category.en)} · {t(post.readTime.ar, post.readTime.en)}
                </p>
                <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 800, color: DARK, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
                  {t(post.title.ar, post.title.en)}
                </h3>
                <span style={{ fontSize: 13, color: accent, fontWeight: 700, letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: 4 }}>
                  {t("اقرأ المزيد", "Read more")} <ArrowRight size={13} style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
