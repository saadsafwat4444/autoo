import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { useFonts, BG2, TXT, BG, PAD } from "@/app/themes/theme4/page";
import { TXT3, BLUE, BORDER, BLUE_BG, TXT2 } from "@/app/themes/theme4/page";
import { Check } from "lucide-react";
import { useState } from "react";
import BookingDialog from "./BookingDialog";

export default function Plans() {
  const { t } = useAppContext();
  const { heading, body } = useFonts();
  const [bookCar, setBookCar] = useState<typeof cars[0] | null>(null);
  const [subLabel, setSubLabel] = useState("");

  const plans = [
    { name: { ar: "أساسي", en: "Basic" }, trips: 8, discount: 10, price: "2,500", popular: false },
    { name: { ar: "بريميوم", en: "Premium" }, trips: 15, discount: 20, price: "5,000", popular: true },
    { name: { ar: "VIP", en: "VIP" }, trips: 0, discount: 30, price: "9,000", popular: false },
  ];

  const handleSub = (plan: typeof plans[0]) => {
    setSubLabel(t(`اشتراك ${t(plan.name.ar, plan.name.en)}`, `${t(plan.name.ar, plan.name.en)} Subscription`));
    setBookCar(cars[0]);
  };

  return (
    <section id="plans" style={{ background: BG2, padding:PAD }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <div style={{  marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 8 }}>
            {t("باقات الاشتراك", "Subscription Plans")}
          </h2>
          <p style={{ color: TXT3, fontSize: 15, fontFamily: body }}>{t("وفّر أكثر مع باقاتنا الشهرية", "Save more with our monthly plans")}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 900, margin: "0 auto" }}>
          {plans.map((plan, i) => (
            <div key={i} style={{
              background: BG, borderRadius: 16, overflow: "hidden",
              border: `2px solid ${plan.popular ? BLUE : BORDER}`,
              boxShadow: plan.popular ? "0 12px 40px rgba(37,99,235,0.12)" : "none",
              transform: plan.popular ? "scale(1.04)" : "none",
              position: "relative",
            }}>
              {plan.popular && (
                <div style={{ background: BLUE, padding: "8px", textAlign: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>
                  {t("الأكثر شعبية", "Most Popular")}
                </div>
              )}
              <div style={{ padding: "28px 24px" }}>
                <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 600, color: TXT3 }}>{t(plan.name.ar, plan.name.en)}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: TXT, fontFamily: heading }}>{plan.price}</span>
                  <span style={{ fontSize: 14, color: TXT3 }}>{t("جنيه/شهر", "EGP/mo")}</span>
                </div>
                <div style={{ display: "inline-flex", background: BLUE_BG, borderRadius: 6, padding: "4px 10px", marginBottom: 20 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: BLUE }}>{t(`خصم ${plan.discount}%`, `${plan.discount}% OFF`)}</span>
                </div>
                <div style={{ marginBottom: 24 }}>
                  {[
                    plan.trips ? t(`${plan.trips} رحلات شهرياً`, `${plan.trips} trips/month`) : t("رحلات غير محدودة", "Unlimited trips"),
                    t(`خصم ${plan.discount}% على كل الحجوزات`, `${plan.discount}% off all bookings`),
                    t("دعم فني", "Support"),
                  ].map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <Check size={16} color={BLUE} />
                      <span style={{ fontSize: 14, color: TXT2 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => handleSub(plan)} style={{
                  width: "100%", padding: "12px", borderRadius: 10,
                  background: plan.popular ? BLUE : BG,
                  color: plan.popular ? "#fff" : BLUE,
                  border: plan.popular ? "none" : `1.5px solid ${BLUE}`,
                  fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: heading,
                }}>{t("اشترك الآن", "Subscribe Now")}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {bookCar && <BookingDialog car={bookCar} onClose={() => { setBookCar(null); setSubLabel(""); }} subLabel={subLabel} />}
    </section>
  );
}