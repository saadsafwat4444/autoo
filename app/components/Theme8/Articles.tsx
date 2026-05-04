import { useAppContext } from "@/app/contexts/AppContext";
import { blogPosts } from "@/app/data/carDate";
import { PAD } from "@/app/themes/theme7/page";
import { useFonts, BG } from "@/app/themes/theme8/page";
import { GRN, AMB, W, pad, TX, BD, TX2, TX3 } from "@/app/themes/theme8/page";
import { O, OBG, OD } from "@/app/themes/theme8/page";
import { ArrowLeft, ArrowRight, Lightbulb, Crown, Plane, Shield, Heart, Clock, X, Calendar, Quote } from "lucide-react";
import { useState, ReactNode } from "react";
 

export default function Articles() {
  const { t, isRTL } = useAppContext();
  const { h } = useFonts();
  const [readingIdx, setReadingIdx] = useState<number | null>(null);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const tagMap: Record<number, { ar: string; en: string; icon: ReactNode; color: string }> = {
    0: { ar: "نصائح", en: "Tips", icon: <Lightbulb size={12} />, color: O },
    1: { ar: "اشتراكات", en: "VIP", icon: <Crown size={12} />, color: "#8B5CF6" },
    2: { ar: "سياحة", en: "Travel", icon: <Plane size={12} />, color: "#3B82F6" },
    3: { ar: "أمان", en: "Safety", icon: <Shield size={12} />, color: GRN },
    4: { ar: "عائلي", en: "Family", icon: <Heart size={12} />, color: AMB },
  };

  const readPost = readingIdx !== null ? blogPosts[readingIdx] : null;

  return (
    <section id="articles" style={{ background: W, padding: PAD }}>
      <div style={pad}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, color: O, marginBottom: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <Lightbulb size={15} /> {t("نصائح ومقالات", "Tips & Articles")}
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: TX, fontFamily: h, margin: 0 }}>
              {t("مواقف شائعة ونصائح تساعدك", "Common Situations & Helpful Tips")}
            </h2>
          </div>
        </div>

        {/* Featured + side list */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 22 }}>
          {blogPosts[0] && (() => {
            const bp = blogPosts[0]; const tg = tagMap[0];
            return (
              <div onClick={() => setReadingIdx(0)} style={{ borderRadius: 22, overflow: "hidden", background: W, border: `1.5px solid ${BD}`, cursor: "pointer", transition: "all 0.3s", display: "flex", flexDirection: "column" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 14px 44px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = ""; }}>
                <div style={{ position: "relative", height: 300 }}>
                  <img src={bp.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6))" }} />
                  <div style={{ position: "absolute", top: 16, [isRTL ? "right" : "left"]: 16 }}>
                    <span style={{ background: W, borderRadius: 10, padding: "6px 14px", fontSize: 12, fontWeight: 700, color: tg.color, display: "inline-flex", alignItems: "center", gap: 5, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>{tg.icon} {t(tg.ar, tg.en)}</span>
                  </div>
                  <div style={{ position: "absolute", bottom: 20, left: 22, right: 22 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: h, lineHeight: 1.4, marginBottom: 8 }}>{t(bp.title.ar, bp.title.en)}</h3>
                    <div style={{ display: "flex", gap: 14 }}>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{bp.date}</span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: 4 }}><Clock size={10} /> {t(bp.readTime.ar, bp.readTime.en)}</span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{t(bp.author.ar, bp.author.en)}</span>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "20px 22px" }}>
                  <p style={{ fontSize: 14, color: TX2, lineHeight: 1.85, marginBottom: 14 }}>{t(bp.excerpt.ar, bp.excerpt.en)}</p>
                  <span style={{ fontSize: 13, fontWeight: 700, color: O, display: "flex", alignItems: "center", gap: 6 }}>{t("اقرأ المقال كامل", "Read Full Article")} <Arrow size={13} /></span>
                </div>
              </div>
            );
          })()}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {blogPosts.slice(1, 5).map((bp, i) => {
              const tg = tagMap[i + 1] || tagMap[0];
              return (
                <div key={bp.id} onClick={() => setReadingIdx(i + 1)} style={{ display: "flex", gap: 0, borderRadius: 16, overflow: "hidden", background: W, border: `1.5px solid ${BD}`, cursor: "pointer", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${tg.color}30`; e.currentTarget.style.transform = `translateX(${isRTL ? "4" : "-4"}px)`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = BD; e.currentTarget.style.transform = ""; }}>
                  <div style={{ width: 140, flexShrink: 0, position: "relative" }}>
                    <img src={bp.image} alt="" style={{ width: "100%", height: "100%", minHeight: 110, objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: 8, [isRTL ? "right" : "left"]: 8 }}>
                      <span style={{ background: W, borderRadius: 6, padding: "3px 8px", fontSize: 9, fontWeight: 700, color: tg.color, display: "inline-flex", alignItems: "center", gap: 3 }}>{tg.icon} {t(tg.ar, tg.en)}</span>
                    </div>
                  </div>
                  <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: TX, fontFamily: h, lineHeight: 1.5, marginBottom: 6 }}>{t(bp.title.ar, bp.title.en)}</h4>
                    <p style={{ fontSize: 12, color: TX3, lineHeight: 1.6, marginBottom: 8, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{t(bp.excerpt.ar, bp.excerpt.en)}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 10, color: TX3, display: "flex", alignItems: "center", gap: 3 }}><Clock size={10} /> {t(bp.readTime.ar, bp.readTime.en)}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: O, display: "flex", alignItems: "center", gap: 3 }}>{t("اقرأ", "Read")} <Arrow size={11} /></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Full Article Reading Modal ── */}
      {readPost && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9990, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setReadingIdx(null)}>
          <div style={{ background: W, borderRadius: 28, width: "100%", maxWidth: 720, maxHeight: "94vh", overflow: "auto", boxShadow: "0 30px 80px rgba(0,0,0,0.2)", animation: "t8pop 0.3s" }} onClick={e => e.stopPropagation()}>
            {/* Hero */}
            <div style={{ position: "relative", height: 280 }}>
              <img src={readPost.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "28px 28px 0 0" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.65))", borderRadius: "28px 28px 0 0" }} />
              <button onClick={() => setReadingIdx(null)} style={{ position: "absolute", top: 16, [isRTL ? "left" : "right"]: 16, width: 42, height: 42, borderRadius: "50%", background: W, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}><X size={18} color={TX} /></button>
              <div style={{ position: "absolute", bottom: 24, left: 28, right: 28 }}>
                <div style={{ marginBottom: 10 }}>
                  {(() => { const tg = tagMap[readingIdx!] || tagMap[0]; return <span style={{ background: `${tg.color}20`, color: tg.color, borderRadius: 8, padding: "5px 14px", fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 5 }}>{tg.icon} {t(tg.ar, tg.en)}</span>; })()}
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", fontFamily: h, lineHeight: 1.35 }}>{t(readPost.title.ar, readPost.title.en)}</h2>
              </div>
            </div>

            {/* Meta */}
            <div style={{ padding: "0 28px" }}>
              <div style={{ display: "flex", gap: 20, padding: "18px 0", borderBottom: `1px solid ${BD}`, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, color: TX3, display: "flex", alignItems: "center", gap: 5 }}><Calendar size={12} /> {readPost.date}</span>
                <span style={{ fontSize: 12, color: TX3, display: "flex", alignItems: "center", gap: 5 }}><Clock size={12} /> {t(readPost.readTime.ar, readPost.readTime.en)}</span>
                <span style={{ fontSize: 12, color: TX2, fontWeight: 600 }}>{t(readPost.author.ar, readPost.author.en)}</span>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "24px 28px 32px" }}>
              <p style={{ fontSize: 16, color: TX, lineHeight: 2, marginBottom: 24, fontWeight: 600 }}>{t(readPost.excerpt.ar, readPost.excerpt.en)}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <p style={{ fontSize: 15, color: TX2, lineHeight: 2, margin: 0 }}>
                  {t(readPost.excerpt.ar, readPost.excerpt.en)}
                </p>
                <p style={{ fontSize: 15, color: TX2, lineHeight: 2, margin: 0 }}>
                  {t(
                    "هذه المقالة توفر لك معلومات شاملة ومفيدة تساعدك على اتخاذ القرار الأفضل عند اختيار السيارة المناسبة لاحتياجاتك. مع خبرتنا الطويلة في مجال تأجير السيارات، نضمن لك الحصول على أفضل خدمة وأسعار تنافسية.",
                    "This article provides comprehensive and useful information to help you make the best decision when choosing the right car for your needs. With our long experience in car rental, we ensure you get the best service and competitive prices."
                  )}
                </p>
              </div>

              {/* Quote */}
              <div style={{ background: OBG, borderRadius: 16, padding: "20px 24px", marginTop: 28, borderInlineStart: `4px solid ${O}` }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <Quote size={20} color={O} style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontSize: 14, color: TX, lineHeight: 1.9, margin: 0, fontStyle: "italic" }}>
                    {t("اختيار السيارة المناسبة لموقفك يوفر عليك الوقت والمال ويجعل تجربتك أفضل. خبراؤنا ينصحون دائماً بتحديد الاحتياج أولاً.", "Choosing the right car for your situation saves time, money, and improves your experience. Our experts always recommend identifying your needs first.")}
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                <button onClick={() => { setReadingIdx(null); document.getElementById("situations")?.scrollIntoView({ behavior: "smooth" }); }} style={{ flex: 1, padding: "15px", borderRadius: 14, background: O, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: h, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = OD; }} onMouseLeave={e => { e.currentTarget.style.background = O; }}>
                  {t("اختر موقفك الآن", "Choose Your Situation Now")} <Arrow size={15} />
                </button>
                <button onClick={() => setReadingIdx(null)} style={{ padding: "15px 24px", borderRadius: 14, background: BG, color: TX2, border: `1.5px solid ${BD}`, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: h, transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = O; e.currentTarget.style.color = O; }} onMouseLeave={e => { e.currentTarget.style.borderColor = BD; e.currentTarget.style.color = TX2; }}>
                  {t("رجوع", "Back")}
                </button>
              </div>

              {/* Related */}
              <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${BD}` }}>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: TX, fontFamily: h, marginBottom: 14 }}>{t("مقالات ذات صلة", "Related Articles")}</h4>
                <div style={{ display: "flex", gap: 10, overflowX: "auto" }} className="t8-noscroll">
                  {blogPosts.filter((_, idx) => idx !== readingIdx).slice(0, 3).map(rp => (
                    <div key={rp.id} onClick={e => { e.stopPropagation(); setReadingIdx(blogPosts.indexOf(rp)); }} style={{ flex: "0 0 200px", borderRadius: 14, overflow: "hidden", border: `1px solid ${BD}`, cursor: "pointer", transition: "all 0.25s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = `${O}30`; }} onMouseLeave={e => { e.currentTarget.style.borderColor = BD; }}>
                      <img src={rp.image} alt="" style={{ width: "100%", height: 90, objectFit: "cover" }} />
                      <div style={{ padding: "10px 12px" }}>
                        <h5 style={{ fontSize: 12, fontWeight: 700, color: TX, lineHeight: 1.4, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{t(rp.title.ar, rp.title.en)}</h5>
                        <span style={{ fontSize: 10, color: TX3, marginTop: 4, display: "flex", alignItems: "center", gap: 3 }}><Clock size={9} /> {t(rp.readTime.ar, rp.readTime.en)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
