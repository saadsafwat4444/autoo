import { useAppContext } from "@/app/contexts/AppContext";
import { blogPosts } from "@/app/data/carDate";
import { BG, BG2, BG3, GOLD, GOLD_D, showEArticle, showEPage, TXT, TXT_DIM, useFonts } from "@/app/themes/theme2/page";
import { ChevronRight, ArrowRight } from "lucide-react";
type BlogPost = typeof blogPosts[0];
export default function ArticleDetail({ post }: { post: BlogPost }) {
  const { t, lang } = useAppContext();
  const { heading, body, isAr } = useFonts();

  const formatDate = (d: string) => {
    const date = new Date(d);
    return isAr
      ? date.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })
      : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const bodyAr = [
    (post as any).excerpt?.ar ?? "",
    "تعدّ هذه النقطة من أبرز ما يجب مراعاته عند الإقدام على هذا الخيار. فمن خلال التجربة الميدانية والتفاعل مع العملاء، تبيّن لنا أن معظم الأشخاص يغفلون عن هذه التفاصيل الدقيقة التي تصنع فارقاً حقيقياً في النهاية.",
    "علاوةً على ذلك، تشير الإحصاءات إلى أن الاهتمام بهذا الجانب يُحسّن تجربة المستخدم بشكل ملحوظ، ويُسهم في ترسيخ الثقة بين الطرفين على المدى البعيد.",
    "في الختام، نؤكد أن كل خطوة صغيرة تخطوها باتجاه الفهم الصحيح ستُعود عليك بنتائج إيجابية ملموسة. لا تتردد في التواصل مع فريقنا.",
  ];
  const bodyEn = [
    (post as any).excerpt?.en ?? "",
    "This aspect is one of the most critical considerations when making this decision. Through hands-on experience and customer interactions, we found that most people overlook these subtle details that ultimately make a real difference.",
    "Furthermore, data shows that paying attention to this dimension significantly improves the overall user experience and builds lasting trust between all parties involved.",
    "In conclusion, every small step toward proper understanding will yield tangible positive results. Don't hesitate to reach out to our specialist team.",
  ];

  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: body }}>
      {/* Hero */}
      <div style={{ position: "relative", height: 460, overflow: "hidden" }}>
        <img src={post.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(11,11,11,0.5) 0%, rgba(11,11,11,0.92) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 40px 52px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", width: "100%" }}>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <button onClick={() => showEPage("home")} style={{ background: "none", border: "none", cursor: "pointer", color: TXT_DIM, fontSize: 13, fontFamily: body, padding: 0 }}>
                {t("الرئيسية", "Home")}
              </button>
              <ChevronRight size={12} color={`${GOLD}40`} style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
              <button onClick={() => showEPage("blog")} style={{ background: "none", border: "none", cursor: "pointer", color: TXT_DIM, fontSize: 13, fontFamily: body, padding: 0 }}>
                {t("المدونة", "Blog")}
              </button>
              <ChevronRight size={12} color={`${GOLD}40`} style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
              <span style={{ color: GOLD, fontSize: 13, fontWeight: 600 }}>{t(post.category.ar, post.category.en)}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ background: GOLD, color: BG, fontSize: 10, fontWeight: 800, padding: "4px 14px", letterSpacing: "0.12em" }}>
                {t(post.category.ar, post.category.en).toUpperCase()}
              </span>
              <span style={{ color: TXT_DIM, fontSize: 12 }}>{t(post.readTime.ar, post.readTime.en)}</span>
            </div>
            <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "#fff", margin: "0 0 20px", lineHeight: 1.2, fontFamily: heading }}>
              {t(post.title.ar, post.title.en)}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 36, height: 36, border: `1.5px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", background: `${GOLD}20` }}>
                <span style={{ fontSize: 14, color: GOLD, fontWeight: 800 }}>{((post as any).author?.ar ?? "E")[0]}</span>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#fff" }}>
                  {t((post as any).author?.ar ?? "فريق Élite", (post as any).author?.en ?? "Élite Team")}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: TXT_DIM }}>{formatDate(post.date)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 40px 96px" }}>
        <div style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}25`, padding: "24px 28px", marginBottom: 36 }}>
          <p style={{ margin: 0, fontSize: 17, color: TXT, lineHeight: 1.8, fontWeight: 500 }}>
            {isAr ? bodyAr[0] : bodyEn[0]}
          </p>
        </div>
        {(isAr ? bodyAr : bodyEn).slice(1).map((p, i) => (
          <p key={i} style={{ margin: "0 0 24px", fontSize: 16, color: TXT_DIM, lineHeight: 1.85 }}>{p}</p>
        ))}

        <div style={{ height: 1, background: `${GOLD}15`, margin: "40px 0" }} />

        {/* Tags */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
          {[t(post.category.ar, post.category.en), t("تأجير سيارات", "Car Rental"), "Élite Drive"].map((tag, i) => (
            <span key={i} style={{ padding: "6px 16px", background: BG3, border: `1px solid ${GOLD}15`, fontSize: 12, fontWeight: 600, color: TXT_DIM }}>
              # {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: BG2, border: `1px solid ${GOLD}20`, padding: "36px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 56 }}>
          <div>
            <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: heading }}>{t("مستعد للقيادة الفاخرة؟", "Ready for a Luxury Drive?")}</h3>
            <p style={{ margin: 0, fontSize: 14, color: TXT_DIM }}>{t("احجز سيارتك الآن بخطوات بسيطة.", "Book your car now in simple steps.")}</p>
          </div>
          <button onClick={() => showEPage("home")} style={{
            padding: "14px 32px", background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
            color: BG, border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: body, letterSpacing: "0.08em",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            {t("تصفح التشكيلة", "Browse Collection")} <ArrowRight size={15} style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
          </button>
        </div>

        {/* Related */}
        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 20px", fontFamily: heading }}>{t("مقالات ذات صلة", "Related Articles")}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {relatedPosts.map(rp => (
            <div
              key={rp.id}
              onClick={() => { showEArticle(rp); window.scrollTo({ top: 0 }); }}
              style={{ background: BG3, border: `1px solid ${GOLD}12`, cursor: "pointer", transition: "border-color 0.3s", overflow: "hidden" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}40`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}12`}
            >
              <div style={{ height: 130, overflow: "hidden" }}>
                <img src={rp.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }} />
              </div>
              <div style={{ padding: "16px 18px" }}>
                <span style={{ fontSize: 10, color: GOLD, letterSpacing: "0.1em", fontWeight: 600 }}>{t(rp.category.ar, rp.category.en).toUpperCase()}</span>
                <h4 style={{ margin: "6px 0 0", fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.35, fontFamily: heading }}>{t(rp.title.ar, rp.title.en)}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Back */}
        <div style={{ marginTop: 40 }}>
          <button onClick={() => showEPage("blog")} style={{
            display: "flex", alignItems: "center", gap: 8, background: "none",
            border: "none", cursor: "pointer", fontFamily: body, fontSize: 14, fontWeight: 700, color: GOLD, padding: 0,
          }}>
            <ArrowRight size={16} style={{ transform: isAr ? "none" : "scaleX(-1)" }} />
            {t("العودة إلى المدونة", "Back to Blog")}
          </button>
        </div>
      </div>
    </div>
  );
}