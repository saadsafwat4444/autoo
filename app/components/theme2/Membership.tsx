import { useAppContext } from "@/app/contexts/AppContext";
import { BG, BG2, BG3, ffBody, GOLD, GOLD_D, GOLD_L, SEC_BTN, SEC_BTN_BRD, SEC_BTN_TXT, SectionLabel, TXT, TXT_DIM, useFonts } from "@/app/themes/theme2/page";
import { Gem, Check } from "lucide-react";
import { useState } from "react";
import MembershipDialog from "./MembershipDialog";
import { PAD } from "@/app/themes/theme1/page";

export default function Membership() {
  const { t, lang } = useAppContext();
  const { heading, body } = useFonts();
  const [joinPlan, setJoinPlan] = useState<{ name: string; price: string } | null>(null);

  const plans = [
    {
      tier: "GOLD", price: { ar: "5,000", en: "5,000" },
      features: {
        ar: ["8 رحلات شهرياً", "تأمين شامل", "خصم 10%", "ترقية في عيد ميلادك"],
        en: ["8 trips/month", "Full insurance", "10% discount", "Birthday upgrade"],
      },
    },
    {
      tier: "PLATINUM", popular: true, price: { ar: "12,000", en: "12,000" },
      features: {
        ar: ["رحلات غير محدودة", "سائق خاص", "خصم 20%", "ترقية مجانية", "استقبال المطار"],
        en: ["Unlimited trips", "Private driver", "20% discount", "Free upgrades", "Airport pickup"],
      },
    },
    {
      tier: "DIAMOND", price: { ar: "25,000", en: "25,000" },
      features: {
        ar: ["كل مزايا Platinum", "سيارة فاخرة دائماً", "خصم 35%", "كونسيرج شخصي", "أولوية الحجز", "صالة VIP"],
        en: ["All Platinum perks", "Always luxury car", "35% discount", "Personal concierge", "Priority booking", "VIP lounge access"],
      },
    },
  ];

  return (
    <section id="elite-membership" style={{ background: BG, position: "relative",padding:PAD }}>
      {/* Decorative */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}30, transparent)` }} />

      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <SectionLabel>{t("العضوية الحصرية", "EXCLUSIVE MEMBERSHIP")}</SectionLabel>
          <h2 style={{ fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 700, color: "#fff", margin: "16px 0 0", fontFamily: heading }}>
            {t("عضوية النخبة", "Elite Membership")}
          </h2>
          <p style={{ margin: "16px auto 0", maxWidth: 500, fontSize: 15, color: TXT_DIM, lineHeight: 1.7, fontFamily: body }}>
            {t("انضم لعضوية النخبة واستمتع بامتيازات حصرية لا تُضاهى.", "Join our elite membership and enjoy unmatched exclusive privileges.")}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr 1fr", gap: 0, alignItems: "stretch" }}>
          {plans.map((plan, i) => (
            <div
              key={i}
              style={{
                background: plan.popular ? BG3 : BG2,
                padding: plan.popular ? "48px 36px" : "40px 32px",
                position: "relative",
                borderLeft: i > 0 ? `1px solid ${GOLD}15` : "none",
                transform: plan.popular ? "scale(1.02)" : "",
                zIndex: plan.popular ? 2 : 1,
                boxShadow: plan.popular ? `0 0 60px ${GOLD}10` : "none",
              }}
            >
              {plan.popular && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})` }} />}

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <Gem size={20} color={GOLD} />
                <span style={{ color: GOLD, fontSize: 13, letterSpacing: "0.2em", fontWeight: 700, fontFamily: ffBody }}>{plan.tier}</span>
                {plan.popular && <span style={{ background: GOLD, color: BG, fontSize: 9, padding: "3px 10px", fontWeight: 800, letterSpacing: "0.1em" }}>POPULAR</span>}
              </div>

              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 42, fontWeight: 900, color: "#fff", fontFamily: heading }}>{t(plan.price.ar, plan.price.en)}</span>
                <span style={{ fontSize: 14, color: TXT_DIM, marginLeft: 4 }}>{t("جنيه", "EGP")}</span>
              </div>
              <p style={{ margin: "0 0 32px", fontSize: 12, color: TXT_DIM, letterSpacing: "0.08em" }}>{t("شهرياً", "/ MONTH")}</p>

              <div style={{ borderTop: `1px solid ${GOLD}18`, paddingTop: 28, marginBottom: 32 }}>
                {(lang === "ar" ? plan.features.ar : plan.features.en).map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 20, height: 20, border: `1.5px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check size={11} color={GOLD} />
                    </div>
                    <span style={{ fontSize: 13, color: TXT, opacity: 0.8 }}>{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setJoinPlan({ name: plan.tier, price: t(plan.price.ar, plan.price.en) })}
                style={{
                  width: "100%", padding: "14px",
                  background: plan.popular ? `linear-gradient(135deg, ${GOLD}, ${GOLD_D})` : SEC_BTN,
                  color: plan.popular ? BG : SEC_BTN_TXT,
                  border: plan.popular ? "none" : `1px solid ${SEC_BTN_BRD}`,
                  fontWeight: 700, fontSize: 13, cursor: "pointer",
                  letterSpacing: "0.1em", fontFamily: body,
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => { if (!plan.popular) { e.currentTarget.style.background = `${GOLD}28`; e.currentTarget.style.color = GOLD; } else { e.currentTarget.style.boxShadow = `0 6px 20px ${GOLD}40`; } }}
                onMouseLeave={e => { if (!plan.popular) { e.currentTarget.style.background = SEC_BTN; e.currentTarget.style.color = SEC_BTN_TXT; } else { e.currentTarget.style.boxShadow = ""; } }}
              >
                {t("انضم الآن", "JOIN NOW")}
              </button>
            </div>
          ))}
        </div>
      </div>
      {joinPlan && <MembershipDialog planName={joinPlan.name} planPrice={joinPlan.price} onClose={() => setJoinPlan(null)} />}
    </section>
  );
}