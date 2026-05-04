import { useAppContext } from "@/app/contexts/AppContext";
import { BG2, BG3, PAD, RACE_IMG, RED, SectionBadge, TXT, TXT_DIM, TXT_MUTED, useFonts } from "@/app/themes/theme3/page";
import { Clock, ArrowRight, X, ArrowLeft, Gauge } from "lucide-react";
import { useState } from "react";

export default function Blog() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [viewAll, setViewAll] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const racingBlogs = [
    {
      title: { ar: "أفضل السيارات الرياضية لعام 2026", en: "Best Sports Cars of 2026" },
      cat: { ar: "سيارات", en: "Cars" }, read: "5 min", img: RACE_IMG.ferrari,
      content: {
        ar: "تعرّف على أفضل السيارات الرياضية لهذا العام، من بورش 911 توربو إلى فيراري F8 تريبوتو. نستعرض لك مواصفات كل سيارة وأسعارها وتجربة القيادة الفعلية. هل تبحث عن سيارة أحلامك؟ هذا الدليل الشامل يساعدك في الاختيار المثالي.\n\nبورش 911 توربو — سيارة تجمع بين الأناقة والقوة بمحرك 572 حصان وتسارع من 0-100 في 2.7 ثانية. مثالية للقيادة اليومية والحلبة.\n\nفيراري F8 تريبوتو — تحفة إيطالية بمحرك V8 توربو مزدوج بقوة 710 حصان. صوتها وحده كفيل بإثارة حماسك.\n\nلامبورجيني هوراكان — وحش إيطالي آخر بمحرك V10 طبيعي السحب. تجربة قيادة لا تُضاهى.",
        en: "Discover the best sports cars of this year, from the Porsche 911 Turbo to the Ferrari F8 Tributo. We review each car's specs, pricing, and real driving experience. Looking for your dream car? This comprehensive guide helps you make the perfect choice.\n\nPorsche 911 Turbo — A car that combines elegance and power with a 572 HP engine and 0-100 in 2.7 seconds. Perfect for daily driving and the track.\n\nFerrari F8 Tributo — An Italian masterpiece with a twin-turbo V8 producing 710 HP. Its sound alone is enough to get your adrenaline pumping.\n\nLamborghini Huracán — Another Italian beast with a naturally aspirated V10. An unmatched driving experience."
      },
    },
    {
      title: { ar: "نصائح القيادة على الحلبة للمبتدئين", en: "Track Driving Tips for Beginners" },
      cat: { ar: "نصائح", en: "Tips" }, read: "7 min", img: RACE_IMG.track,
      content: {
        ar: "القيادة على الحلبة تجربة مختلفة تماماً عن الشوارع العادية. إليك أهم النصائح للمبتدئين:\n\n1. ابدأ ببطء — لا تحاول كسر الأرقام القياسية من أول لفة. تعرّف على الحلبة أولاً.\n\n2. انظر بعيداً — نظرك يجب أن يسبق السيارة دائماً. انظر لأبعد نقطة ممكنة.\n\n3. نقطة الفرملة — تعلّم أين تفرمل قبل كل منعطف. الفرملة المتأخرة ليست دائماً أسرع.\n\n4. خط السباق — هناك خط مثالي لكل منعطف. اسأل مدربك عنه.\n\n5. استمتع! — الحلبة مكان للمتعة. لا تضغط على نفسك كثيراً.",
        en: "Track driving is a completely different experience from regular streets. Here are the top tips for beginners:\n\n1. Start Slow — Don't try to break records on your first lap. Get to know the track first.\n\n2. Look Ahead — Your eyes should always be ahead of the car. Look as far as possible.\n\n3. Braking Points — Learn where to brake before each corner. Late braking isn't always faster.\n\n4. Racing Line — There's an optimal line for every corner. Ask your instructor about it.\n\n5. Have Fun! — The track is a place for enjoyment. Don't put too much pressure on yourself."
      },
    },
    {
      title: { ar: "تجربة قيادة بورش 911 — لا تُنسى", en: "Porsche 911 Drive — Unforgettable" },
      cat: { ar: "تجارب", en: "Reviews" }, read: "6 min", img: RACE_IMG.hero,
      content: {
        ar: "قضيت يوماً كاملاً مع بورش 911 توربو S وكانت تجربة لا تُنسى. من لحظة الجلوس خلف المقود، تشعر أن هذه السيارة صُنعت للسائق.\n\nالمقصورة فاخرة ومريحة، الشاشات واضحة، والمقود يعطيك إحساساً مباشراً بالطريق. ضغطت على دواسة الوقود وانطلقت السيارة كالصاروخ — 0 إلى 100 في 2.7 ثانية!\n\nعلى الحلبة، السيارة متوازنة بشكل مذهل. نظام الدفع الرباعي يعطيك ثقة في كل منعطف. الفرامل السيراميكية توقفك بدقة جراحية.\n\nنصيحتي: إذا عندك فرصة تجرّب بورش 911، لا تتردد. هي ليست مجرد سيارة — هي تجربة حياة.",
        en: "I spent a full day with the Porsche 911 Turbo S and it was an unforgettable experience. From the moment you sit behind the wheel, you feel this car was made for the driver.\n\nThe cabin is luxurious and comfortable, screens are clear, and the steering wheel gives you direct road feedback. I pressed the throttle and the car launched like a rocket — 0 to 100 in 2.7 seconds!\n\nOn the track, the car is amazingly balanced. The AWD system gives you confidence in every corner. Ceramic brakes stop you with surgical precision.\n\nMy advice: If you have a chance to try a Porsche 911, don't hesitate. It's not just a car — it's a life experience."
      },
    },
    {
      title: { ar: "مقارنة: فيراري vs لامبورجيني", en: "Ferrari vs Lamborghini Comparison" },
      cat: { ar: "مقارنات", en: "Compare" }, read: "8 min", img: RACE_IMG.lambo,
      content: {
        ar: "المقارنة الأبدية بين عملاقي السيارات الإيطالية. فيراري F8 تريبوتو مقابل لامبورجيني هوراكان — أيهما أفضل؟\n\nفيراري تتفوق في الأناقة والصقل. لامبورجيني تتفوق في العدوانية والحضور. كلاهما يمنحك تجربة قيادة استثنائية.\n\nالحقيقة؟ لا يوجد فائز واحد. كل سيارة لها شخصية مختلفة وتناسب ذوق مختلف. جرّب الاثنتين واختر بنفسك!",
        en: "The eternal comparison between Italian car giants. Ferrari F8 Tributo vs Lamborghini Huracán — which is better?\n\nFerrari excels in elegance and refinement. Lamborghini excels in aggression and presence. Both give you an exceptional driving experience.\n\nThe truth? There's no single winner. Each car has a different personality and suits a different taste. Try both and decide for yourself!"
      },
    },
    {
      title: { ar: "كيف تختار سيارتك الرياضية الأولى", en: "How to Choose Your First Sports Car" },
      cat: { ar: "نصائح", en: "Tips" }, read: "6 min", img: RACE_IMG.mclaren,
      content: {
        ar: "إذا كنت تفكر في تأجير سيارة رياضية لأول مرة، إليك نصائحنا:\n\nحدد ميزانيتك أولاً. ثم اسأل نفسك: هل تريد تجربة حلبة أم جولة مدينة؟ السيارات المختلفة تناسب تجارب مختلفة.\n\nللمبتدئين ننصح ببورش 911 — سهلة القيادة وقوية في نفس الوقت. للمحترفين، فيراري أو ماكلارين هي الخيار الأمثل.",
        en: "If you're thinking about renting a sports car for the first time, here are our tips:\n\nSet your budget first. Then ask yourself: do you want a track experience or a city cruise? Different cars suit different experiences.\n\nFor beginners we recommend the Porsche 911 — easy to drive yet powerful. For experienced drivers, Ferrari or McLaren is the optimal choice."
      },
    },
    {
      title: { ar: "أجمل طرق القيادة في مصر", en: "Best Driving Roads in Egypt" },
      cat: { ar: "أماكن", en: "Places" }, read: "5 min", img: RACE_IMG.trackAerial,
      content: {
        ar: "مصر فيها طرق مذهلة للقيادة بسيارة رياضية. من طريق العين السخنة الساحلي إلى طريق الجلالة الجبلي.\n\nطريق العين السخنة: مستقيم وواسع، مثالي للسرعة. طريق الجلالة: منعطفات جبلية رائعة تختبر مهاراتك.\n\nلا تنسَ طريق الساحل الشمالي في الصيف — قيادة ممتعة مع إطلالات بحرية خلابة.",
        en: "Egypt has amazing roads for sports car driving. From the Ain Sokhna coastal road to the Galala mountain road.\n\nAin Sokhna road: Straight and wide, perfect for speed. Galala road: Amazing mountain curves that test your skills.\n\nDon't forget the North Coast road in summer — enjoyable driving with stunning sea views."
      },
    },
  ];

  const displayedBlogs = racingBlogs.slice(0, 3);

  const BlogCard = ({ post, idx }: { post: typeof racingBlogs[0]; idx: number }) => (
    <div style={{ background: BG3, borderRadius: 4, overflow: "hidden", border: `1px solid ${TXT}08`, transition: "all 0.3s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${RED}30`; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = `${TXT}08`; e.currentTarget.style.transform = ""; }}>
      <div style={{ height: 200, overflow: "hidden", cursor: "pointer" }} onClick={() => setSelectedArticle(idx)}>
        <img src={post.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", filter: "brightness(0.8)" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "")} />
      </div>
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
          <span style={{ background: `${RED}18`, color: RED, borderRadius: 3, padding: "3px 10px", fontSize: 11, fontWeight: 700, fontFamily: heading }}>{t(post.cat.ar, post.cat.en)}</span>
          <span style={{ color: TXT_MUTED, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> {post.read}</span>
        </div>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: TXT, lineHeight: 1.5, fontFamily: body, cursor: "pointer" }}
          onClick={() => setSelectedArticle(idx)}>{t(post.title.ar, post.title.en)}</h3>
        <button onClick={() => setSelectedArticle(idx)} style={{
          background: "transparent", border: "none", padding: 0, cursor: "pointer",
          color: RED, fontSize: 12, fontWeight: 700, fontFamily: heading, letterSpacing: "0.08em",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          {t("اقرأ المزيد", "READ MORE")} <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );

  return (
    <section style={{ background: BG2, padding: PAD }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <SectionBadge>{t("المدونة", "BLOG")}</SectionBadge>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 900, color: TXT, fontFamily: heading, margin: "8px 0 0" }}>{t("أحدث المقالات", "LATEST ARTICLES")}</h2>
          </div>
          <button onClick={() => setViewAll(true)} style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: RED, fontSize: 13, fontWeight: 700, fontFamily: heading, letterSpacing: "0.1em",
            display: "flex", alignItems: "center", gap: 6,
          }}>{t("عرض الكل", "VIEW ALL")} <ArrowRight size={14} /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {displayedBlogs.map((post, i) => <BlogCard key={i} post={post} idx={i} />)}
        </div>
      </div>

      {/* View All Articles Modal */}
      {viewAll && (
        <div onClick={() => setViewAll(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)",
          zIndex: 999, overflow: "auto", padding: "40px 20px",
        }}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 1200, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
              <div>
                <SectionBadge>{t("المدونة", "BLOG")}</SectionBadge>
                <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, color: TXT, fontFamily: heading, margin: "8px 0 0" }}>
                  {t("جميع المقالات", "ALL ARTICLES")} <span style={{ fontSize: 16, color: TXT_MUTED }}>({racingBlogs.length})</span>
                </h2>
              </div>
              <button onClick={() => setViewAll(false)} style={{
                background: BG3, border: `1px solid ${TXT}15`, borderRadius: 4,
                width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}><X size={20} color={TXT} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {racingBlogs.map((post, i) => <BlogCard key={i} post={post} idx={i} />)}
            </div>
          </div>
        </div>
      )}

      {/* Article Detail Modal */}
      {selectedArticle !== null && (() => {
        const article = racingBlogs[selectedArticle];
        return (
          <div onClick={() => setSelectedArticle(null)} style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)",
            zIndex: 1000, overflow: "auto", padding: "40px 20px",
          }}>
            <div onClick={e => e.stopPropagation()} style={{ maxWidth: 780, margin: "0 auto" }}>
              {/* Back button */}
              <button onClick={() => setSelectedArticle(null)} style={{
                background: "transparent", border: "none", cursor: "pointer",
                color: TXT_DIM, display: "flex", alignItems: "center", gap: 8,
                marginBottom: 24, fontSize: 13, fontWeight: 600, fontFamily: body,
              }}>
                <ArrowLeft size={16} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
                {t("رجوع للمقالات", "Back to articles")}
              </button>

              <div style={{ background: BG2, borderRadius: 8, overflow: "hidden", border: `1px solid ${TXT}10` }}>
                {/* Hero image */}
                <div style={{ position: "relative", height: 340 }}>
                  <img src={article.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.65)" }} />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${BG2} 5%, transparent 60%)` }} />
                  <div style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
                    <div style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "center" }}>
                      <span style={{ background: RED, color: "#fff", borderRadius: 3, padding: "4px 12px", fontSize: 11, fontWeight: 700, fontFamily: heading }}>{t(article.cat.ar, article.cat.en)}</span>
                      <span style={{ color: TXT_DIM, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> {article.read} {t("قراءة", "read")}</span>
                    </div>
                    <h1 style={{ margin: 0, fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 900, color: TXT, fontFamily: heading, lineHeight: 1.3 }}>
                      {t(article.title.ar, article.title.en)}
                    </h1>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "32px" }}>
                  <div style={{ fontSize: 15, color: TXT_DIM, lineHeight: 2.1, fontFamily: body, whiteSpace: "pre-line" }}>
                    {t(article.content.ar, article.content.en)}
                  </div>

                  {/* Bottom CTA */}
                  <div style={{
                    marginTop: 40, padding: "24px", borderRadius: 6,
                    background: `linear-gradient(135deg, ${RED}10, ${RED}05)`,
                    border: `1px solid ${RED}25`, textAlign: "center",
                  }}>
                    <p style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: TXT, fontFamily: body }}>
                      {t("جاهز تجرّب بنفسك؟", "Ready to experience it yourself?")}
                    </p>
                    <button onClick={() => { setSelectedArticle(null); setViewAll(false); document.getElementById("fleet-section")?.scrollIntoView({ behavior: "smooth" }); }} style={{
                      padding: "13px 32px", background: RED, color: "#fff", border: "none",
                      fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: heading,
                      letterSpacing: "0.1em", borderRadius: 4, display: "inline-flex",
                      alignItems: "center", gap: 8,
                    }}>
                      <Gauge size={16} />
                      {t("استعرض السيارات", "BROWSE FLEET")}
                    </button>
                  </div>
                </div>
              </div>

              {/* Related articles */}
              {racingBlogs.filter((_, idx) => idx !== selectedArticle).length > 0 && (
                <div style={{ marginTop: 48 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: TXT, fontFamily: heading, letterSpacing: "0.08em", marginBottom: 20 }}>
                    {t("مقالات ذات صلة", "RELATED ARTICLES")}
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                    {racingBlogs.filter((_, idx) => idx !== selectedArticle).slice(0, 3).map((post, i) => {
                      const realIdx = racingBlogs.indexOf(post);
                      return (
                        <div key={i} onClick={() => setSelectedArticle(realIdx)} style={{
                          background: BG3, borderRadius: 4, overflow: "hidden", cursor: "pointer",
                          border: `1px solid ${TXT}08`, transition: "all 0.3s",
                        }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = `${RED}30`; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = `${TXT}08`; }}>
                          <img src={post.img} alt="" style={{ width: "100%", height: 120, objectFit: "cover", filter: "brightness(0.7)" }} />
                          <div style={{ padding: "12px 14px" }}>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: TXT, lineHeight: 1.4, fontFamily: body }}>{t(post.title.ar, post.title.en)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </section>
  );
}

 