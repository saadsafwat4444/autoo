import { useAppContext } from "@/app/contexts/AppContext";
import { BG, BORDER, CARD, CYAN, CYAN_L, GREEN, GridBG, INDIGO_L, PAD, TXT, TXT3, useFonts } from "@/app/themes/theme5/page";
import { Brain, Shield, Headphones, Zap, BadgeCheck, HeartHandshake, Award } from "lucide-react";

export default function WhyUs() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();

  const reasons = [
    { icon: <Brain size={26} />, ar: "ذكاء اصطناعي متقدم", en: "Advanced AI", descAr: "محرك توصيات ذكي يحلل احتياجاتك ويختار السيارة المثالية لرحلتك", descEn: "Smart recommendation engine analyzes your needs and picks the perfect car", color: CYAN },
    { icon: <Shield size={26} />, ar: "تأمين شامل", en: "Full Insurance", descAr: "جميع سياراتنا مؤمنة تأميناً شاملاً ضد الحوادث والسرقة والأعطال", descEn: "All cars fully insured against accidents, theft, and breakdowns", color: INDIGO_L },
    { icon: <Headphones size={26} />, ar: "دعم 24/7", en: "24/7 Support", descAr: "فريق دعم متاح على مدار الساعة بالعربية والإنجليزية لخدمتك", descEn: "Support team available 24/7 in Arabic & English at your service", color: GREEN },
    { icon: <Zap size={26} />, ar: "حجز فوري", en: "Instant Booking", descAr: "أكمل حجزك في أقل من 60 ثانية بخطوات بسيطة وآمنة", descEn: "Complete your booking in under 60 seconds with simple, secure steps", color: "#F59E0B" },
    { icon: <BadgeCheck size={26} />, ar: "أسطول متميز", en: "Premium Fleet", descAr: "أكثر من 50 سيارة من أفخم الماركات العالمية موديلات 2023-2024", descEn: "50+ cars from top global brands, 2023-2024 models", color: "#EC4899" },
    { icon: <HeartHandshake size={26} />, ar: "أسعار شفافة", en: "Transparent Pricing", descAr: "لا رسوم خفية. السعر الذي تراه هو السعر النهائي بدون مفاجآت", descEn: "No hidden fees. The price you see is the final price, no surprises", color: CYAN_L },
  ];

  return (
    <section style={{ position: "relative", background: BG, padding: PAD, overflow: "hidden" }}>
      <GridBG />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `rgba(6,182,212,0.08)`, border: `1px solid rgba(6,182,212,0.15)`,
            borderRadius: 20, padding: "6px 16px", marginBottom: 14,
          }}>
            <Award size={14} color={CYAN} />
            <span style={{ fontSize: 13, fontWeight: 600, color: CYAN }}>{t("لماذا نحن", "Why Us")}</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.4rem)", fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 10 }}>
            {t("لماذا تختار SmartAI؟", "Why Choose SmartAI?")}
          </h2>
          <p style={{ color: TXT3, fontSize: 15, maxWidth: 500, margin: "0 auto" }}>
            {t("نجمع بين التكنولوجيا المتقدمة وأفضل الخدمات لنقدم لك تجربة تأجير لا مثيل لها", "We combine advanced technology with top-tier service for an unmatched rental experience")}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {reasons.map((r, i) => (
            <div key={i} style={{
              background: CARD, borderRadius: 20, padding: "30px 26px",
              border: `1px solid ${BORDER}`, position: "relative", overflow: "hidden",
              transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${r.color}35`; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 16px 50px rgba(0,0,0,0.3)`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
              {/* Corner glow */}
              <div style={{
                position: "absolute", top: -30, [isRTL ? "left" : "right"]: -30,
                width: 100, height: 100, borderRadius: "50%",
                background: `radial-gradient(circle, ${r.color}10 0%, transparent 70%)`,
              }} />
              <div style={{
                width: 56, height: 56, borderRadius: 16, marginBottom: 18,
                background: `linear-gradient(135deg, ${r.color}15, ${r.color}05)`,
                border: `1px solid ${r.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center", color: r.color,
              }}>{r.icon}</div>
              <h4 style={{ margin: "0 0 10px", fontSize: 17, fontWeight: 800, color: TXT, fontFamily: heading }}>
                {t(r.ar, r.en)}
              </h4>
              <p style={{ margin: 0, fontSize: 14, color: TXT3, lineHeight: 1.7 }}>
                {t(r.descAr, r.descEn)}
              </p>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div style={{
          marginTop: 48, display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap",
        }}>
          {[
            { val: "10,000+", ar: "عميل سعيد", en: "Happy Customers" },
            { val: "50+", ar: "سيارة في الأسطول", en: "Cars in Fleet" },
            { val: "4.9/5", ar: "تقييم العملاء", en: "Customer Rating" },
            { val: "3+", ar: "سنوات خبرة", en: "Years Experience" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: CYAN, fontFamily: heading, marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontSize: 13, color: TXT3 }}>{t(s.ar, s.en)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}