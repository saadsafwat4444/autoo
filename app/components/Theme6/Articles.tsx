import { useAppContext } from "@/app/contexts/AppContext";
import { blogPosts } from "@/app/data/carDate";
import { useFonts, BG2, TXT, BG } from "@/app/themes/theme2/page";
import { BORDER, GREEN, TXT3, TXT2 } from "@/app/themes/theme4/page";
import { sectionPad, OLIVE, CARD_BG, PAD } from "@/app/themes/theme6/page";
import { BookOpen, ChevronLeft, ChevronRight, Clock, ArrowLeft, ArrowRight, X, Calendar, Users, Share2, Shield, MapPin, Package, Car } from "lucide-react";
import { useRef, useState } from "react";

export default function Articles() {
  const { t, isRTL } = useAppContext();
  const { heading } = useFonts();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePost, setActivePost] = useState<number | null>(null);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  const post = activePost !== null ? blogPosts[activePost] : null;

  return (
    <section style={{ background: BG2, padding: PAD }}>
      <div style={sectionPad}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36 }}>
          <div>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 13, fontWeight: 700, color: OLIVE,
              background: `${OLIVE}10`, padding: "6px 18px", borderRadius: 20,
              marginBottom: 14,
            }}>
              <BookOpen size={14} />
              {t("أفكار للرحلات", "Trip Ideas")}
            </span>
            <h2 style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 900, color: TXT, fontFamily: heading }}>
              {t("أفكار لرحلات قريبة", "Ideas for Nearby Trips")}
            </h2>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => scroll(isRTL ? 1 : -1)} style={{
              width: 40, height: 40, borderRadius: 12, background: CARD_BG,
              border: `1px solid ${BORDER}`, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = GREEN; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = GREEN; }}
              onMouseLeave={e => { e.currentTarget.style.background = CARD_BG; e.currentTarget.style.color = TXT; e.currentTarget.style.borderColor = BORDER; }}>
              <ChevronRight size={18} />
            </button>
            <button onClick={() => scroll(isRTL ? -1 : 1)} style={{
              width: 40, height: 40, borderRadius: 12, background: CARD_BG,
              border: `1px solid ${BORDER}`, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = GREEN; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = GREEN; }}
              onMouseLeave={e => { e.currentTarget.style.background = CARD_BG; e.currentTarget.style.color = TXT; e.currentTarget.style.borderColor = BORDER; }}>
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} style={{
          display: "flex", gap: 20, overflowX: "auto", scrollSnapType: "x mandatory",
          scrollbarWidth: "none", paddingBottom: 8,
        }}>
          {blogPosts.slice(0, 6).map(post => (
            <div key={post.id} style={{
              minWidth: 320, scrollSnapAlign: "start",
              background: CARD_BG, borderRadius: 20, overflow: "hidden",
              border: `1px solid ${BORDER}`, flexShrink: 0, transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
              <img src={post.image} alt="" style={{ width: "100%", height: 180, objectFit: "cover" }} />
              <div style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: GREEN, background: `${GREEN}10`, padding: "3px 10px", borderRadius: 8 }}>
                    {t(post.category.ar, post.category.en)}
                  </span>
                  <span style={{ fontSize: 11, color: TXT3, display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={10} /> {t(post.readTime.ar, post.readTime.en)}
                  </span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 8, lineHeight: 1.5 }}>
                  {t(post.title.ar, post.title.en)}
                </h3>
                <p style={{ fontSize: 13, color: TXT3, lineHeight: 1.6, marginBottom: 14 }}>
                  {t(post.excerpt.ar, post.excerpt.en).slice(0, 80)}...
                </p>
                <button onClick={() => setActivePost(blogPosts.indexOf(post))} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "transparent", border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: 700, color: GREEN, fontFamily: heading,
                  padding: 0, transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.gap = "10px"; }}
                  onMouseLeave={e => { e.currentTarget.style.gap = "6px"; }}>
                  {t("اقرأ المزيد", "Read More")}
                  {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ ARTICLE DETAIL MODAL ═══ */}
      {post && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9990,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20, animation: "t6fadeIn 0.3s ease-out",
        }} onClick={() => setActivePost(null)}>
          <div style={{
            background: CARD_BG, borderRadius: 28, width: "100%", maxWidth: 760,
            maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
          }} onClick={e => e.stopPropagation()}>
            {/* Hero image */}
            <div style={{ position: "relative", height: 300 }}>
              <img src={post.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "28px 28px 0 0" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)", borderRadius: "28px 28px 0 0" }} />
              <button onClick={() => setActivePost(null)} style={{ position: "absolute", top: 16, right: 16, width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={20} color={TXT} />
              </button>
              <div style={{ position: "absolute", bottom: 24, left: 28, right: 28 }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                  <span style={{ background: GREEN, color: "#fff", padding: "5px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700 }}>
                    {t(post.category.ar, post.category.en)}
                  </span>
                  <span style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", color: "#fff", padding: "5px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
                    <Clock size={12} /> {t(post.readTime.ar, post.readTime.en)}
                  </span>
                  <span style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", color: "#fff", padding: "5px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
                    <Calendar size={12} /> {post.date}
                  </span>
                </div>
                <h2 style={{ fontSize: 26, fontWeight: 900, color: "#fff", fontFamily: heading, lineHeight: 1.3 }}>
                  {t(post.title.ar, post.title.en)}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "28px 32px 32px" }}>
              {/* Author info */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28, paddingBottom: 20, borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${GREEN}12`, color: GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Users size={20} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TXT, fontFamily: heading }}>{t(post.author.ar, post.author.en)}</div>
                  <div style={{ fontSize: 12, color: TXT3 }}>{post.date}</div>
                </div>
                <div style={{ marginLeft: "auto", marginRight: isRTL ? "auto" : 0, [isRTL ? "marginLeft" : "marginRight"]: 0 }}>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, background: BG, border: `1px solid ${BORDER}`, cursor: "pointer", fontSize: 12, fontWeight: 600, color: TXT2 }}>
                    <Share2 size={14} /> {t("مشاركة", "Share")}
                  </button>
                </div>
              </div>

              {/* Article body */}
              <p style={{ fontSize: 16, color: TXT2, lineHeight: 2, marginBottom: 24 }}>
                {t(post.excerpt.ar, post.excerpt.en)}
              </p>

              {/* Extended article content */}
              <div style={{ background: BG, borderRadius: 16, padding: "20px 24px", marginBottom: 24, borderLeft: `4px solid ${GREEN}` }}>
                <p style={{ fontSize: 14, color: TXT2, lineHeight: 1.9, fontStyle: "italic" }}>
                  {t(
                    "هذه الفكرة مثالية لمن يبحث عن تجربة مميزة بعيداً عن الروتين اليومي. مع سيارة مناسبة وخطة واضحة، يمكنك الاستمتاع بأفضل ما تقدمه مصر من طبيعة ومناظر خلابة.",
                    "This idea is perfect for those looking for a unique experience away from the daily routine. With the right car and a clear plan, you can enjoy the best of Egypt's nature and stunning landscapes."
                  )}
                </p>
              </div>

              <p style={{ fontSize: 15, color: TXT2, lineHeight: 1.9, marginBottom: 24 }}>
                {t(
                  "ننصحك بالتخطيط المسبق لرحلتك وحجز السيارة قبل الموعد بفترة كافية. تأكد من فحص السيارة قبل الانطلاق واحمل معك كل المستلزمات الضرورية. لا تنسَ أن تأخذ فترات راحة أثناء القيادة الطويلة وتستمتع بالمناظر على الطريق.",
                  "We recommend planning your trip in advance and booking your car well ahead of time. Make sure to inspect the car before departure and bring all necessary supplies. Don't forget to take breaks during long drives and enjoy the scenery along the way."
                )}
              </p>

              {/* Tips section */}
              <h4 style={{ fontSize: 16, fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 16 }}>
                {t("نصائح مهمة", "Important Tips")}
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
                {[
                  { ar: "احجز سيارتك مبكراً", en: "Book your car early", icon: <Calendar size={16} /> },
                  { ar: "تأكد من التأمين الشامل", en: "Ensure comprehensive insurance", icon: <Shield size={16} /> },
                  { ar: "خطط للمحطات على الطريق", en: "Plan your stops along the way", icon: <MapPin size={16} /> },
                  { ar: "احمل مستلزمات الطوارئ", en: "Carry emergency supplies", icon: <Package size={16} /> },
                ].map((tip, ti) => (
                  <div key={ti} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 14, background: BG, border: `1px solid ${BORDER}` }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, background: `${OLIVE}12`, color: OLIVE, display: "flex", alignItems: "center", justifyContent: "center" }}>{tip.icon}</div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: TXT }}>{t(tip.ar, tip.en)}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setActivePost(null)} style={{
                  flex: 1, padding: "14px", borderRadius: 14,
                  background: "transparent", color: TXT2, border: `1.5px solid ${BORDER}`,
                  fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading,
                }}>{t("إغلاق", "Close")}</button>
                <button onClick={() => { setActivePost(null); document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" }); }} style={{
                  flex: 1, padding: "14px", borderRadius: 14,
                  background: GREEN, color: "#fff", border: "none",
                  fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                  <Car size={16} /> {t("احجز سيارتك الآن", "Book Your Car Now")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}