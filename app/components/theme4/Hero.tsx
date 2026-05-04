import { useAppContext } from "@/app/contexts/AppContext";
import { BG, PAD, TXT, useFonts } from "@/app/themes/theme4/page";
import { BLUE_BG, BLUE, TXT3, BLUE_D, BORDER, TXT2, GREEN, IMG } from "@/app/themes/theme4/page";
import { Sparkles, ArrowRight, Search, Check } from "lucide-react";

export default function Hero() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();

  return (
    <section style={{ background: BG, paddingTop: 64,padding:PAD }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        {/* Text */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: BLUE_BG, borderRadius: 20, padding: "6px 16px", marginBottom: 24 }}>
            <Sparkles size={14} color={BLUE} />
            <span style={{ fontSize: 13, fontWeight: 600, color: BLUE }}>{t("حجز ذكي وسريع", "Smart & Fast Booking")}</span>
          </div>
          <h1 style={{
            fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, color: TXT,
            lineHeight: 1.45, marginBottom: 20, fontFamily: heading,
          }}>
            {t("السيارة التي تحتاجها", "The car you need")}
            <br />
            <span style={{ color: BLUE }}>{t("في الوقت الذي تحتاجه", "right when you need it")}</span>
          </h1>
          <p style={{ fontSize: 17, color: TXT3, lineHeight: 1.7, marginBottom: 36, maxWidth: 440, fontFamily: body }}>
            {t("احجز سيارتك خلال دقيقة واحدة. بدون خطوات معقدة.", "Book your car in one minute. No complex steps.")}
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" })} style={{
              padding: "14px 32px", borderRadius: 10, background: BLUE, color: "#fff",
              border: "none", fontWeight: 600, fontSize: 15, cursor: "pointer",
              fontFamily: heading, display: "flex", alignItems: "center", gap: 8,
              transition: "all 0.2s", boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = BLUE_D; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = BLUE; e.currentTarget.style.transform = ""; }}>
              {t("ابدأ الحجز", "Start Booking")}
              <ArrowRight size={16} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
            </button>
            <button onClick={() => document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" })} style={{
              padding: "14px 24px", borderRadius: 10, background: "transparent",
              border: `1.5px solid ${BORDER}`, color: TXT2, fontWeight: 500,
              fontSize: 15, cursor: "pointer", fontFamily: heading,
              display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.color = BLUE; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TXT2; }}>
              <Search size={16} />
              {t("استعرض السيارات", "Browse Cars")}
            </button>
          </div>

          {/* Quick stats */}
          <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
            {[
              { val: "50+", ar: "سيارة متاحة", en: "Cars available" },
              { val: "2500+", ar: "عميل سعيد", en: "Happy clients" },
              { val: "4.8", ar: "تقييم العملاء", en: "Client rating" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 24, fontWeight: 800, color: TXT, fontFamily: heading }}>{s.val}</div>
                <div style={{ fontSize: 13, color: TXT3, fontFamily: body }}>{t(s.ar, s.en)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div style={{ position: "relative" }}>
          <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
            <img src={IMG.hero} alt="" style={{ width: "100%", height: 480, objectFit: "cover" }} />
          </div>
          {/* Floating card */}
          <div style={{
            position: "absolute", bottom: -20, [isRTL ? "right" : "left"]: -20,
            background: BG, borderRadius: 14, padding: "16px 20px", boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
            display: "flex", alignItems: "center", gap: 12, border: `1px solid ${BORDER}`,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check size={20} color={GREEN} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: TXT }}>{t("حجز مؤكد", "Booking Confirmed")}</p>
              <p style={{ margin: 0, fontSize: 12, color: TXT3 }}>Toyota Camry — 3 {t("أيام", "days")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}