import { useAppContext } from "@/app/contexts/AppContext";
import { IMAGES } from "@/app/data/carDate";
import { DARK, EXTRA, MID_GRAY } from "@/app/themes/theme1/page";

export default function Strip() {
    
   const { t, lang, accent } = useAppContext();
    const isRTL = lang === "ar";

     const steps = [
    { num: "01", img: IMAGES.teslaWhite,    ar: "اختر سيارتك", en: "Choose Your Car",  desc: { ar: "من ٥٠٠+ سيارة متنوعة",  en: "From 500+ diverse vehicles" } },
    { num: "02", img: IMAGES.bmwNight,      ar: "حدد الموع��",   en: "Set Your Date",    desc: { ar: "مرونة تامة في المواعيد", en: "Fully flexible scheduling"  } },
    { num: "03", img: IMAGES.mercedesBlack, ar: "ادفع بأمان",   en: "Pay Securely",     desc: { ar: "دفع مشفّر ١٠٠٪",         en: "100% encrypted payment"     } },
    { num: "04", img: EXTRA.womanKeys,      ar: "استلم سيارتك", en: "Get Your Car",     desc: { ar: "توصيل لباب منزلك",       en: "Delivered to your door"     } },
  ];

  return (
    <section style={{ background: "#fff", direction: isRTL ? "rtl" : "ltr", padding: "100px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 24, height: 2, background: accent, borderRadius: 2 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              {t("كيف يعمل", "How It Works")}
            </span>
            <div style={{ width: 24, height: 2, background: accent, borderRadius: 2 }} />
          </div>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, color: DARK, letterSpacing: "-0.04em", margin: "0 0 8px", lineHeight: 1.05 }}>
            {t("أربع خطوات فقط", "Just four steps")}
          </h2>
          <p style={{ fontSize: 15, color: MID_GRAY, margin: 0 }}>{t("من الاختيار إلى الانطلاق", "From selection to driving")}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
              <div style={{ position: "relative", height: 240, borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 32px rgba(13,31,60,0.12)" }}>
                <img src={step.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "")} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${DARK}CC 0%, ${DARK}44 40%, transparent 100%)` }} />
                <span style={{ position: "absolute", top: 14, [isRTL ? "right" : "left"]: 14, fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: "0.12em", fontFamily: "'Inter',sans-serif", background: accent, padding: "4px 10px", borderRadius: 6 }}>
                  {step.num}
                </span>
                <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
                  <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
                    {t(step.ar, step.en)}
                  </h3>
                  <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                    {t(step.desc.ar, step.desc.en)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}