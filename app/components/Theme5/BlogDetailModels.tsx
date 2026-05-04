
"use client"
import { useAppContext } from "@/app/contexts/AppContext";
import { blogPosts } from "@/app/data/carDate";
import { useFonts, BG, TXT, BG2 } from "@/app/themes/theme5/page";
import { BORDER, TXT2, TXT3 } from "@/app/themes/theme5/page";
import { CYAN, INDIGO } from "@/app/themes/theme5/page";
import { X, Clock, User, Heart, Share2 } from "lucide-react";
import { useEffect } from "react";

export default function BlogDetailModal({ postId, onClose }: { postId: number; onClose: () => void }) {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const post = blogPosts.find(p => p.id === postId);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!post) return null;

  // Generate mock article body paragraphs
  const paragraphs = [
    { ar: `${t(post.title.ar, post.title.en)} - هذا المقال يقدم لك دليلاً شاملاً حول هذا الموضوع المهم. سواء كنت مسافراً لأول مرة أو لديك خبرة سابقة، ستجد هنا معلومات قيمة تساعدك في اتخاذ القرار الأفضل.`, en: `${t(post.title.ar, post.title.en)} - This article provides a comprehensive guide on this important topic. Whether you're a first-time traveler or experienced, you'll find valuable information to help you make the best decision.` },
    { ar: "عند اختيار سيارة للإيجار، هناك عدة عوامل يجب مراعاتها: عدد الركاب، نوع الطريق، المسافة المقطوعة، والميزانية المتاحة. كل هذه العوامل تلعب دوراً مهماً في تحديد السيارة المثالية لاحتياجاتك.", en: "When choosing a rental car, several factors should be considered: number of passengers, road type, distance traveled, and available budget. All these factors play a crucial role in determining the ideal car for your needs." },
    { ar: "نصيحتنا الأولى هي دائماً التخطيط مسبقاً. الحجز المبكر يمنحك أفضل الأسعار وأكبر تشكيلة من السيارات المتاحة. كما ننصح بقراءة شروط التأمين جيداً وفهم ما يغطيه وما لا يغطيه.", en: "Our top advice is always to plan ahead. Early booking gives you the best prices and largest selection of available cars. We also recommend reading insurance terms carefully and understanding what's covered and what's not." },
    { ar: "في منصة SmartAI، نسهّل عليك هذه العملية بالكامل. محرك الذكاء الاصطناعي لدينا يحلل احتياجاتك ويقدم لك التوصية المثالية في ثوانٍ معدودة، مما يوفر عليك الوقت والجهد.", en: "At SmartAI, we simplify this entire process. Our AI engine analyzes your needs and provides the perfect recommendation in seconds, saving you time and effort." },
    { ar: "لا تتردد في التواصل مع فريق الدعم لدينا إذا كان لديك أي استفسارات. نحن هنا لمساعدتك على مدار الساعة وضمان أن تكون تجربتك مع SmartAI الأفضل على الإطلاق.", en: "Don't hesitate to contact our support team if you have any questions. We're here to help 24/7 and ensure your SmartAI experience is the best ever." },
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, overflow: "auto",
    }} onClick={onClose}>
      <div style={{
        background: BG, borderRadius: 24, maxWidth: 800, width: "100%",
        maxHeight: "92vh", overflow: "auto",
        border: `1px solid ${BORDER}`, boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
      }} onClick={e => e.stopPropagation()}>
        {/* Hero */}
        <div style={{ position: "relative", height: 320 }}>
          <img src={post.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "24px 24px 0 0" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(2,6,23,0.3) 0%, rgba(2,6,23,0.95) 100%)", borderRadius: "24px 24px 0 0" }} />
          <button onClick={onClose} style={{
            position: "absolute", top: 16, [isRTL ? "right" : "left"]: 16,
            width: 42, height: 42, borderRadius: 12,
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)",
            border: `1px solid ${BORDER}`, color: TXT, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}><X size={18} /></button>
          <div style={{ position: "absolute", bottom: 28, left: 28, right: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <span style={{
                background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
                color: "#fff", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 8,
              }}>{t(post.category.ar, post.category.en)}</span>
              <span style={{ fontSize: 12, color: TXT2, display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} /> {t(post.readTime.ar, post.readTime.en)}</span>
              <span style={{ fontSize: 12, color: TXT3 }}>{post.date}</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: TXT, fontFamily: heading, lineHeight: 1.3 }}>
              {t(post.title.ar, post.title.en)}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "28px 32px 36px" }}>
          {/* Author bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 32, paddingBottom: 20, borderBottom: `1px solid ${BORDER}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: `linear-gradient(135deg, ${CYAN}20, ${INDIGO}20)`,
                display: "flex", alignItems: "center", justifyContent: "center", color: CYAN,
              }}><User size={18} /></div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: TXT }}>{t(post.author.ar, post.author.en)}</div>
                <div style={{ fontSize: 12, color: TXT3 }}>{post.date}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{
                width: 38, height: 38, borderRadius: 10, border: `1px solid ${BORDER}`,
                background: BG2, color: TXT3, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "#EF4444"; e.currentTarget.style.borderColor = "#EF444440"; }}
                onMouseLeave={e => { e.currentTarget.style.color = TXT3; e.currentTarget.style.borderColor = BORDER; }}>
                <Heart size={16} />
              </button>
              <button style={{
                width: 38, height: 38, borderRadius: 10, border: `1px solid ${BORDER}`,
                background: BG2, color: TXT3, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = CYAN; e.currentTarget.style.borderColor = `${CYAN}40`; }}
                onMouseLeave={e => { e.currentTarget.style.color = TXT3; e.currentTarget.style.borderColor = BORDER; }}>
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {/* Excerpt highlight */}
          <div style={{
            background: `linear-gradient(135deg, rgba(6,182,212,0.06), rgba(79,70,229,0.06))`,
            borderRadius: 14, padding: "20px 24px", marginBottom: 28,
            borderLeft: isRTL ? "none" : `3px solid ${CYAN}`,
            borderRight: isRTL ? `3px solid ${CYAN}` : "none",
          }}>
            <p style={{ margin: 0, fontSize: 15, color: TXT2, lineHeight: 1.8, fontStyle: "italic" }}>
              {t(post.excerpt.ar, post.excerpt.en)}
            </p>
          </div>

          {/* Article body */}
          {paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 15, color: TXT2, lineHeight: 1.9, marginBottom: 22 }}>
              {t(p.ar, p.en)}
            </p>
          ))}

          {/* Tags */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 28, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}>
            {[
              { ar: "تأجير سيارات", en: "Car Rental" },
              { ar: "نصائح", en: "Tips" },
              { ar: "سفر", en: "Travel" },
              { ar: "SmartAI", en: "SmartAI" },
            ].map((tag, i) => (
              <span key={i} style={{
                background: BG2, border: `1px solid ${BORDER}`, borderRadius: 8,
                padding: "6px 14px", fontSize: 12, color: TXT3, fontWeight: 600,
              }}>#{t(tag.ar, tag.en)}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}