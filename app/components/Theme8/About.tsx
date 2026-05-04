import { useAppContext } from "@/app/contexts/AppContext";
import { PAD } from "@/app/themes/theme7/page";
import { BD, BG, O, pad, TX, TX2, TX3, useFonts } from "@/app/themes/theme8/page";

export default function About() {
  const { t, isRTL } = useAppContext();
  const { h } = useFonts();

  return (
    <section id="about" style={{ padding: PAD, background: BG }}>
      <div style={{ ...pad }}>

        {/* Thin accent line */}
        <div style={{ width: 48, height: 3, borderRadius: 2, background: O}} />

        <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 900, color: TX, fontFamily: h, lineHeight: 1.55, marginBottom: 20 }}>
          {t("كل موقف في حياتك يستحق السيارة المناسبة", "Every situation in your life deserves the right car")}
        </h2>

        <p style={{ fontSize: 15, color: TX2, lineHeight: 2.1,margin: "0 auto 20px" }}>
          {t(
            "بدأنا من فكرة بسيطة: بدل ما تدور على سيارة، خلينا نسألك عن موقفك ونوصلك بالسيارة المثالية. من مناسبة خاصة لرحلة عمل لمشوار عائلي.",
            "We started with a simple idea: instead of searching for a car, let us ask about your situation and connect you with the perfect car."
          )}
        </p>
        <p style={{ fontSize: 14, color: TX3, lineHeight: 2, margin: "0 auto" }}>
          {t(
            "فريقنا يعمل يومياً على ضمان أعلى جودة خدمة وأفضل تجربة تأجير في مصر.",
            "Our team works daily to ensure the highest quality service and best rental experience in Egypt."
          )}
        </p>

        <div style={{ height: 1, background: BD, margin: "48px 0" }} />

        {/* Inline counter strip */}
        <div style={{ display: "flex", gap: 0 }}>
          {[
            { val: "8+", ar: "سنوات خبرة", en: "Years" },
            { val: "200+", ar: "سيارة", en: "Cars" },
            { val: "5K+", ar: "عميل", en: "Clients" },
            { val: "98%", ar: "رضا", en: "Satisfaction" },
          ].map((s, i, arr) => (
            <div key={i} style={{ flex: 1,  position: "relative" }}>
              <div style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, color: O, fontFamily: h, marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: TX3, letterSpacing: "0.02em" }}>{t(s.ar, s.en)}</div>
              {i < arr.length - 1 && (
                <div style={{ position: "absolute", top: "15%", [isRTL ? "left" : "right"]: 0, width: 1, height: "70%", background: BD }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}