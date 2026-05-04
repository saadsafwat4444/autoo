import { useAppContext } from "@/app/contexts/AppContext";
import { PAD, WARM } from "@/app/themes/theme6/page";
import { useFonts, BG, TXT } from "@/app/themes/theme6/page";
import { GREEN, TXT2, BORDER, TXT3 } from "@/app/themes/theme6/page";
import { OLIVE, sectionPad, CARD_BG } from "@/app/themes/theme6/page";
import { MapPin, Car, CreditCard, Route } from "lucide-react";

export default function RHowItWorks() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();

  const steps = [
    {
      num: "01", ar: "اختر وجهتك", en: "Choose Destination",
      desc: { ar: "حدد وجهتك وتواريخ السفر ونوع الرحلة المفضل لك", en: "Select your destination, travel dates and preferred trip type" },
      icon: <MapPin size={24} />, color: GREEN,
    },
    {
      num: "02", ar: "اختر السيارة", en: "Select Your Car",
      desc: { ar: "تصفح أسطولنا واختر السيارة المناسبة لرحلتك وميزانيتك", en: "Browse our fleet and pick the car that fits your trip and budget" },
      icon: <Car size={24} />, color: OLIVE,
    },
    {
      num: "03", ar: "أكد الحجز وادفع", en: "Confirm & Pay",
      desc: { ar: "أدخل بياناتك واختر طريقة الدفع — كاش أو بطاقة أو تقسيط", en: "Enter your details and choose payment — cash, card or installments" },
      icon: <CreditCard size={24} />, color: WARM,
    },
    {
      num: "04", ar: "استلم واستمتع", en: "Pickup & Enjoy",
      desc: { ar: "استلم سيارتك من أقرب فرع أو نوصلها لباب بيتك واستمتع بالرحلة", en: "Pick up from nearest branch or we deliver to your door — enjoy!" },
      icon: <Route size={24} />, color: "#8B5CF6",
    },
  ];

  return (
    <section id="how-it-works" style={{ background: BG, padding: PAD}}>
      <div style={sectionPad}>
        {/* Editorial split header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
          <div style={{ maxWidth: 520 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontSize: 12, fontWeight: 700, color: OLIVE, letterSpacing: 1.5,
              textTransform: "uppercase", marginBottom: 14,
            }}>
              <span style={{ width: 28, height: 2, background: OLIVE, borderRadius: 2 }} />
              {t("آلية العمل", "How It Works")}
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 900, color: TXT, fontFamily: heading, lineHeight: 1.25 }}>
              {t("من الاختيار للانطلاق", "From Selection to")}
              <br />
              <span style={{ color: GREEN }}>{t("في 4 خطوات بسيطة", "Adventure in 4 Steps")}</span>
            </h2>
          </div>
          <p style={{ fontSize: 15, color: TXT2, lineHeight: 1.85, maxWidth: 360 }}>
            {t(
              "عملية سهلة وسريعة — لا تعقيد ولا انتظار طويل. حجز سيارتك لأجمل رحلة في دقائق.",
              "Simple and fast process — no complexity, no long waits. Book your car for the best trip in minutes."
            )}
          </p>
        </div>

        {/* Staggered cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              background: CARD_BG, borderRadius: 24, padding: "32px 24px 28px",
              border: `1px solid ${BORDER}`, position: "relative", overflow: "hidden",
              marginTop: i % 2 === 1 ? 40 : 0,
              transition: "all 0.4s cubic-bezier(.25,.8,.25,1)", cursor: "default",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = `0 20px 50px ${step.color}18`;
                e.currentTarget.style.borderColor = `${step.color}40`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = BORDER;
              }}>
              {/* Watermark number */}
              <span style={{
                position: "absolute", top: -14, [isRTL ? "left" : "right"]: 8,
                fontSize: 110, fontWeight: 900, color: `${step.color}06`,
                fontFamily: heading, lineHeight: 1, pointerEvents: "none", userSelect: "none",
              }}>{step.num}</span>

              {/* Step pill */}
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 32, height: 32, borderRadius: 10,
                background: `${step.color}12`, color: step.color,
                fontSize: 13, fontWeight: 800, fontFamily: heading, marginBottom: 20,
              }}>{step.num}</span>

              {/* Icon */}
              <div style={{
                width: 64, height: 64, borderRadius: 20, marginBottom: 20,
                background: `linear-gradient(135deg, ${step.color}15, ${step.color}05)`,
                border: `1.5px solid ${step.color}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: step.color,
              }}>{step.icon}</div>

              <h4 style={{ fontSize: 17, fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 10 }}>
                {t(step.ar, step.en)}
              </h4>
              <p style={{ fontSize: 13, color: TXT3, lineHeight: 1.8 }}>
                {t(step.desc.ar, step.desc.en)}
              </p>

              {/* Connector dot between cards */}
              {i < 3 && (
                <div style={{
                  position: "absolute", top: "50%",
                  [isRTL ? "left" : "right"]: -10,
                  width: 20, height: 20, borderRadius: "50%",
                  background: CARD_BG, border: `2px solid ${step.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: step.color }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 56 }}>
          <button onClick={() => document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" })} style={{
            padding: "16px 44px", borderRadius: 60,
            background: `linear-gradient(135deg, ${GREEN}, ${OLIVE})`, color: "#fff", border: "none",
            fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: heading,
            display: "inline-flex", alignItems: "center", gap: 10,
            boxShadow: `0 10px 35px ${GREEN}30`, transition: "all 0.35s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = `0 16px 45px ${GREEN}40`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 10px 35px ${GREEN}30`; }}>
            <Car size={18} />
            {t("ابدأ الحجز الآن", "Start Booking Now")}
          </button>
        </div>
      </div>
    </section>
  );
}