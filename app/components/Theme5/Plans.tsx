import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts, BG, TXT, PAD } from "@/app/themes/theme5/page";
import { TXT3, CARD, BORDER, TXT2 } from "@/app/themes/theme5/page";
import { CYAN, INDIGO_L, GridBG, GLOW_CYAN, INDIGO, BORDER2 } from "@/app/themes/theme5/page";
import { Zap, Check } from "lucide-react";

export default function Plans({ onSubscribe }: { onSubscribe: (plan: string) => void }) {
  const { t } = useAppContext();
  const { heading, body } = useFonts();

  const plans = [
    {
      name: { ar: "Basic", en: "Basic" }, price: "299",
      features: [
        { ar: "8 رحلات شهرياً", en: "8 trips/month" },
        { ar: "سيارات اقتصادية", en: "Economy cars" },
        { ar: "دعم بريد إلكتروني", en: "Email support" },
      ],
      popular: false, color: TXT3,
    },
    {
      name: { ar: "Premium", en: "Premium" }, price: "599",
      features: [
        { ar: "15 رحلة شهرياً", en: "15 trips/month" },
        { ar: "سيارات فاخرة + SUV", en: "Luxury + SUV cars" },
        { ar: "دعم أولوية 24/7", en: "Priority 24/7 support" },
        { ar: "توصيات AI مخصصة", en: "Personalized AI picks" },
      ],
      popular: true, color: CYAN,
    },
    {
      name: { ar: "VIP", en: "VIP" }, price: "999",
      features: [
        { ar: "رحلات غير محدودة", en: "Unlimited trips" },
        { ar: "كل السيارات متاحة", en: "All cars available" },
        { ar: "مدير حساب شخصي", en: "Personal account manager" },
        { ar: "استلام من الباب", en: "Door-to-door delivery" },
        { ar: "ترقية مجانية", en: "Free upgrade" },
      ],
      popular: false, color: INDIGO_L,
    },
  ];

  return (
    <section id="plans" style={{ position: "relative", background: BG, padding: PAD, overflow: "hidden" }}>
      <GridBG />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `rgba(6,182,212,0.08)`, border: `1px solid rgba(6,182,212,0.15)`,
            borderRadius: 20, padding: "6px 16px", marginBottom: 14,
          }}>
            <Zap size={14} color={CYAN} />
            <span style={{ fontSize: 13, fontWeight: 600, color: CYAN }}>{t("الاشتراكات", "Plans")}</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 8 }}>
            {t("باقات التنقل الذكي", "Smart Mobility Plans")}
          </h2>
          <p style={{ color: TXT3, fontSize: 15, fontFamily: body }}>{t("اختر الباقة التي تناسب احتياجاتك", "Pick the plan that suits your needs")}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {plans.map((p, i) => (
            <div key={i} style={{
              background: CARD, borderRadius: 22, padding: "32px 28px",
              border: `1.5px solid ${p.popular ? CYAN : BORDER}`,
              position: "relative", transition: "all 0.3s",
              boxShadow: p.popular ? GLOW_CYAN : "none",
              transform: p.popular ? "scale(1.04)" : "none",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = p.popular ? "scale(1.06)" : "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 0 30px ${p.color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = p.popular ? "scale(1.04)" : ""; e.currentTarget.style.boxShadow = p.popular ? GLOW_CYAN : "none"; }}>
              {p.popular && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
                  color: "#fff", fontSize: 11, fontWeight: 700, padding: "5px 16px",
                  borderRadius: 8, fontFamily: heading,
                }}>{t("الأكثر طلباً", "Most Popular")}</div>
              )}
              <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 800, color: TXT, fontFamily: heading }}>{t(p.name.ar, p.name.en)}</h3>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 40, fontWeight: 900, color: p.color, fontFamily: heading }}>{p.price}</span>
                <span style={{ fontSize: 14, color: TXT3, fontWeight: 500 }}> {t("جنيه/شهر", "EGP/mo")}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 6,
                      background: `${p.color}15`, display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Check size={12} color={p.color} />
                    </div>
                    <span style={{ fontSize: 14, color: TXT2 }}>{t(f.ar, f.en)}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => onSubscribe(t(p.name.ar, p.name.en))} style={{
                width: "100%", padding: "14px", borderRadius: 12,
                background: p.popular ? `linear-gradient(135deg, ${CYAN}, ${INDIGO})` : "transparent",
                border: p.popular ? "none" : `1.5px solid ${BORDER2}`,
                color: p.popular ? "#fff" : TXT2,
                fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading,
                boxShadow: p.popular ? GLOW_CYAN : "none",
                transition: "all 0.2s",
              }}>{t("اشترك الآن", "Subscribe Now")}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}