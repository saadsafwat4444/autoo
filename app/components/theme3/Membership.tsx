import { useAppContext } from "@/app/contexts/AppContext";
import { BG, BG3, GOLD, TXT, TXT_DIM, useFonts } from "@/app/themes/theme2/page";
import { RED, SpeedLines, SectionBadge, TXT_MUTED, PAD } from "@/app/themes/theme3/page";
import { Check } from "lucide-react";
import { useState } from "react";
import SubscriptionDialog from "./SubscriptionDialog";

export default function Membership() {
  const { t } = useAppContext();
  const { heading, body } = useFonts();
  const [subPlan, setSubPlan] = useState<number | null>(null);

  const plans = [
    {
      name: { ar: "ستارتر", en: "STARTER" }, price: { ar: "3,000", en: "3,000" },
      discount: "10%", color: TXT_DIM,
      features: [
        { ar: "خصم 10% على كل الحجوزات", en: "10% off all bookings" },
        { ar: "أولوية في الحجز", en: "Priority booking" },
        { ar: "دعم هاتفي", en: "Phone support" },
      ],
    },
    {
      name: { ar: "ريسر", en: "RACER" }, price: { ar: "7,500", en: "7,500" },
      discount: "20%", color: RED, popular: true,
      features: [
        { ar: "خصم 20% على كل الحجوزات", en: "20% off all bookings" },
        { ar: "دخول الحلبة مرتين شهرياً", en: "2 track sessions / month" },
        { ar: "ترقية مجانية للسيارة", en: "Free car upgrade" },
        { ar: "دعم 24/7", en: "24/7 support" },
      ],
    },
    {
      name: { ar: "برو درايفر", en: "PRO DRIVER" }, price: { ar: "15,000", en: "15,000" },
      discount: "30%", color: GOLD,
      features: [
        { ar: "خصم 30% على كل الحجوزات", en: "30% off all bookings" },
        { ar: "دخول غير محدود للحلبة", en: "Unlimited track access" },
        { ar: "سائق خاص عند الطلب", en: "Private driver on demand" },
        { ar: "فعاليات VIP حصرية", en: "Exclusive VIP events" },
        { ar: "استقبال المطار", en: "Airport VIP pickup" },
      ],
    },
  ];

  return (
    <section style={{ background: BG, padding: PAD, position: "relative" }}>
      <SpeedLines side="right" />
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ marginBottom: 56 }}>
          <SectionBadge>{t("العضوية", "MEMBERSHIP")}</SectionBadge>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: TXT, fontFamily: heading, margin: "8px 0 0" }}>
            {t("عضوية Racing", "RACING MEMBERSHIP")}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "start" }}>
          {plans.map((plan, i) => (
            <div key={i} style={{
              background: BG3, borderRadius: 4, overflow: "hidden",
              border: `1px solid ${plan.popular ? RED : TXT + "10"}`,
              transform: plan.popular ? "scale(1.04)" : "none",
              boxShadow: plan.popular ? `0 20px 60px ${RED}20` : "none",
              position: "relative",
            }}>
              {plan.popular && (
                <div style={{ background: RED, padding: "8px", textAlign: "center", fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: "0.15em", fontFamily: heading }}>
                  {t("الأكثر شعبية", "MOST POPULAR")}
                </div>
              )}
              <div style={{ padding: "32px 28px" }}>
                <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 800, color: plan.color, letterSpacing: "0.15em", fontFamily: heading }}>{t(plan.name.ar, plan.name.en)}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                  <span style={{ fontSize: 36, fontWeight: 900, color: GOLD, fontFamily: heading }}>{t(plan.price.ar, plan.price.en)}</span>
                  <span style={{ fontSize: 14, color: TXT_MUTED }}>{t("جنيه/شهر", "EGP/mo")}</span>
                </div>
                <div style={{ display: "inline-block", background: `${RED}15`, borderRadius: 3, padding: "4px 12px", marginBottom: 20 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: RED }}>{t(`خصم ${plan.discount}`, `${plan.discount} OFF`)}</span>
                </div>
                <div style={{ marginBottom: 24 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 18, height: 18, borderRadius: 3, background: `${RED}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check size={11} color={RED} />
                      </div>
                      <span style={{ fontSize: 13, color: TXT_DIM, fontFamily: body }}>{t(f.ar, f.en)}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setSubPlan(i)} style={{
                  width: "100%", padding: "13px", borderRadius: 4,
                  background: plan.popular ? RED : "transparent",
                  color: plan.popular ? "#fff" : RED,
                  border: `1px solid ${RED}`, fontWeight: 800, cursor: "pointer",
                  fontFamily: heading, fontSize: 12, letterSpacing: "0.1em",
                }}>{t("اشترك الآن", "SUBSCRIBE")}</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Dialog (same as booking flow) */}
      {subPlan !== null && <SubscriptionDialog plan={plans[subPlan]} onClose={() => setSubPlan(null)} />}
    </section>
  );
}