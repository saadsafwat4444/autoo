"use client";

import { useAppContext } from "@/app/contexts/AppContext";
import { blogPosts } from "@/app/data/carDate";
import { DARK } from "@/app/themes/theme1/page";
import { useRouter } from "next/navigation";

import { ChevronRight, ArrowRight } from "lucide-react";

export default function ArticleDetail({ post }: { post: any }) {
  const { t, lang, accent } = useAppContext();
  const router = useRouter();
  const ff   = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isAr = lang === "ar";

  const formatDate = (d: string) => {
    const date = new Date(d);
    return isAr
      ? date.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })
      : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  // Generate article body paragraphs based on excerpt/category
  const bodyAr: string[] = [
    (post as any).excerpt?.ar ?? "",
    "تعدّ هذه النقطة من أبرز ما يجب مراعاته عند الإقدام على هذا الخيار. فمن خلال التجربة الميدانية والتفاعل مع العملاء، تبيّن لنا أن معظم الأشخاص يغفلون عن هذه التفاصيل الدقيقة التي تصنع فارقاً حقيقياً في النهاية.",
    "علاوةً على ذلك، تشير الإحصاءات إلى أن الاهتمام بهذا الجانب يُحسّن تجربة المستخدم بشكل ملحوظ، ويُسهم في ترسيخ الثقة بين الطرفين على المدى البعيد. لذا نوصي دائماً بالاستفسار والتثبّت قبل اتخاذ أي قرار.",
    "في الختام، نؤكد أن كل خطوة صغيرة تخطوها باتجاه الفهم الصحيح ستُعود عليك بنتائج إيجابية ملموسة. لا تتردد في التواصل مع فريقنا المتخصص للحصول على إجابات شافية لجميع استفساراتك.",
  ];

  const bodyEn: string[] = [
    (post as any).excerpt?.en ?? "",
    "This aspect is one of the most critical considerations when making this decision. Through hands-on experience and customer interactions, we found that most people overlook these subtle details that ultimately make a real difference.",
    "Furthermore, data shows that paying attention to this dimension significantly improves the overall user experience and builds lasting trust between all parties involved. We always recommend asking questions and verifying before committing to any decision.",
    "In conclusion, every small step toward proper understanding will yield tangible positive results. Don't hesitate to reach out to our specialist team for comprehensive answers to all your questions.",
  ];

  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: ff, direction: isAr ? "rtl" : "ltr" }}>

      {/* Hero */}
      <div style={{ position: "relative", height: 480, overflow: "hidden" }}>
        <img src={post.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, rgba(13,31,60,0.55) 0%, rgba(13,31,60,0.92) 100%)` }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 48px 56px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", width: "100%" }}>

            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <button onClick={() => router.push("/")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", fontSize: 13, fontFamily: ff, padding: 0, fontWeight: 500 }}>
                {t("الرئيسية", "Home")}
              </button>
              <ChevronRight size={12} color="rgba(255,255,255,0.3)" style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
              <button onClick={() => router.push("/blog")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", fontSize: 13, fontFamily: ff, padding: 0, fontWeight: 500 }}>
                {t("المدونة", "Blog")}
              </button>
              <ChevronRight size={12} color="rgba(255,255,255,0.3)" style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
              <span style={{ color: accent, fontSize: 13, fontWeight: 600 }}>{t(post.category.ar, post.category.en)}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ background: accent, color: "#fff", fontSize: 10, fontWeight: 800, padding: "4px 14px", borderRadius: 20, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {t(post.category.ar, post.category.en)}
              </span>
              <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}>
                {t(post.readTime.ar, post.readTime.en)} {t("للقراءة", "read")}
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 20px", lineHeight: 1.15 }}>
              {t(post.title.ar, post.title.en)}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${accent}30`, border: `1.5px solid ${accent}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 14, color: accent, fontWeight: 800 }}>
                  {((post as any).author?.ar ?? "D")[0]}
                </span>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#fff" }}>
                  {t((post as any).author?.ar ?? "فريق DriveNow", (post as any).author?.en ?? "DriveNow Team")}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{formatDate(post.date)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "56px 48px 96px" }}>

        {/* Intro box */}
        <div style={{ background: `${accent}0D`, border: `2px solid ${accent}30`, borderRadius: 14, padding: "24px 28px", marginBottom: 40 }}>
          <p style={{ margin: 0, fontSize: 17, color: DARK, lineHeight: 1.75, fontWeight: 500 }}>
            {isAr ? bodyAr[0] : bodyEn[0]}
          </p>
        </div>

        {/* Body paragraphs */}
        {(isAr ? bodyAr : bodyEn).slice(1).map((para, i) => (
          <p key={i} style={{ margin: "0 0 28px", fontSize: 16, color: "#374151", lineHeight: 1.85 }}>
            {para}
          </p>
        ))}

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(0,0,0,0.08)", margin: "40px 0" }} />

        {/* Tags */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
          {[post.category, ...(isAr ? [{ ar: "تأجير سيارات", en: "Car Rental" }, { ar: "DriveNow", en: "DriveNow" }] : [{ ar: "Car Rental", en: "Car Rental" }, { ar: "DriveNow", en: "DriveNow" }])].map((tag, i) => (
            <span key={i} style={{ padding: "6px 16px", background: "#F3F4F6", borderRadius: 20, fontSize: 12, fontWeight: 700, color: "#374151", border: "1.5px solid rgba(0,0,0,0.07)" }}>
              # {i === 0 ? t(post.category.ar, post.category.en) : t(tag.ar, tag.en)}
            </span>
          ))}
        </div>

        {/* CTA Banner */}
        <div style={{ background: DARK, borderRadius: 20, padding: "40px 44px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 64 }}>
          <div>
            <h3 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>
              {t("مستعد للانطلاق؟", "Ready to drive?")}
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
              {t("احجز سيارتك الآن بخطوات بسيطة وسريعة", "Book your car now in a few simple steps")}
            </p>
          </div>
          <button
            onClick={() => router.push("/cars")}
            style={{ padding: "14px 36px", background: accent, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: ff, display: "flex", alignItems: "center", gap: 8, flexShrink: 0, transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            {t("تصفح السيارات", "Browse Cars")}
            <ArrowRight size={16} style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
          </button>
        </div>

        {/* Related Articles */}
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: DARK, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
            {t("مقالات ذات صلة", "Related Articles")}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {relatedPosts.map(rp => (
              <div
                key={rp.id}
                onClick={() => router.push(`/blog/${rp.id}`)}
                style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(0,0,0,0.07)", cursor: "pointer", background: "#fff", transition: "transform 0.22s, box-shadow 0.22s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 28px rgba(0,0,0,0.09)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
              >
                <div style={{ height: 140, overflow: "hidden" }}>
                  <img src={rp.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: "16px 18px 20px" }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {t(rp.category.ar, rp.category.en)}
                  </span>
                  <h4 style={{ margin: "6px 0 0", fontSize: 14, fontWeight: 800, color: DARK, lineHeight: 1.35 }}>
                    {t(rp.title.ar, rp.title.en)}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back button */}
        <div style={{ display: "flex", marginTop: 48 }}>
          <button
            onClick={() => router.push("/blog")}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", fontFamily: ff, fontSize: 14, fontWeight: 700, color: DARK, padding: "10px 0" }}
          >
            <ArrowRight size={16} style={{ transform: isAr ? "none" : "scaleX(-1)" }} />
            {t("العودة إلى المدونة", "Back to Blog")}
          </button>
        </div>
      </div>
    </div>
  );
}