import { useAppContext } from "@/app/contexts/AppContext";
import { PAD, WARM } from "@/app/themes/theme6/page";
import { useFonts, BG2, TXT } from "@/app/themes/theme6/page";
import { IMG } from "@/app/themes/theme6/page";
import { sectionPad } from "@/app/themes/theme6/page";
import { Camera, MapPin } from "lucide-react";

export default function Stories() {
  const { t } = useAppContext();
  const { heading } = useFonts();

  const stories = [
    { img: IMG.sea, loc: { ar: "دهب", en: "Dahab" }, text: { ar: "كانت رحلة رائعة والسيارة كانت مريحة جداً على الطريق الطويل", en: "It was an amazing trip and the car was so comfortable on the long road" }, name: { ar: "أحمد ومريم", en: "Ahmed & Mariam" } },
    { img: IMG.oasis, loc: { ar: "سيوة", en: "Siwa" }, text: { ar: "اكتشفنا واحة سيوة بسيارة لاند كروزر وكانت تجربة لا تنسى", en: "We explored Siwa Oasis in a Land Cruiser - unforgettable experience" }, name: { ar: "خالد", en: "Khaled" } },
    { img: IMG.couple, loc: { ar: "الساحل", en: "North Coast" }, text: { ar: "عطلة نهاية الأسبوع المثالية بدأت بسيارة من رحلتك", en: "The perfect weekend getaway started with a RoadTrip car" }, name: { ar: "سارة وعمر", en: "Sara & Omar" } },
  ];

  return (
    <section style={{ background: BG2, padding: PAD }}>
      <div style={sectionPad}>
        <div style={{marginBottom: 56 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 13, fontWeight: 700, color: WARM,
            background: `${WARM}10`, padding: "6px 18px", borderRadius: 20,
            marginBottom: 14,
          }}>
            <Camera size={14} />
            {t("قصص الرحلات", "Travel Stories")}
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, color: TXT, fontFamily: heading }}>
            {t("رحلات عملائنا", "Our Customers' Journeys")}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
          {stories.map((s, i) => (
            <div key={i} style={{
              position: "relative", borderRadius: 24, overflow: "hidden",
              height: 400, cursor: "pointer", transition: "all 0.4s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
              <img src={s.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.75) 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 28 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
                  padding: "5px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700, color: "#fff",
                  marginBottom: 12,
                }}>
                  <MapPin size={12} /> {t(s.loc.ar, s.loc.en)}
                </span>
                <p style={{ fontSize: 15, color: "#fff", lineHeight: 1.7, marginBottom: 10, fontStyle: "italic" }}>
                  "{t(s.text.ar, s.text.en)}"
                </p>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                  — {t(s.name.ar, s.name.en)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
