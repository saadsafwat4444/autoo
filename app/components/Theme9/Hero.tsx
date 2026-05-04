import { useAppContext } from "@/app/contexts/AppContext";
import { PAD } from "@/app/themes/theme7/page";
import { BG, useFonts } from "@/app/themes/theme9/page";
import { IMG } from "@/app/themes/theme9/page";
import { DK, pad, W } from "@/app/themes/theme9/page";
import { V, PNK, VL, PERSONALITIES } from "@/app/themes/theme9/page";
import { ArrowLeft, ArrowRight, Sparkles, Play } from "lucide-react";

export default  function T9Hero() {
  const { t, isRTL } = useAppContext();
  const { h } = useFonts();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section style={{ paddingLeft: "130px", paddingRight: "130px", background: `linear-gradient(160deg, ${DK} 0%, #0F172A 50%, ${DK} 100%)`, position: "relative", overflow: "hidden" }}>
      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${V}15 0%, transparent 70%)` }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${PNK}10 0%, transparent 70%)` }} />

      <div style={{ maxWidth: 1180, margin: "0 auto", paddingLeft: "24px", paddingRight: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", minHeight: "calc(100vh - 64px)", paddingTop: 60, paddingBottom: 80 }}>
        {/* Text side */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 100, background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)", marginBottom: 24 }}>
            <Sparkles size={14} color={VL} />
            <span style={{ fontSize: 12, fontWeight: 700, color: VL, letterSpacing: "0.05em" }}>{t("تجربة جديدة كلياً", "A Whole New Experience")}</span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 900, color: W, fontFamily: h, lineHeight: 1.3, marginBottom: 20 }}>
            {t("كل سيارة لها", "Every car has a")}<br />
            <span style={{ background: `linear-gradient(135deg, ${V}, ${PNK})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t("شخصية", "personality")}
            </span><br />
            {t("أيّهم يشبهك؟", "Which one matches you?")}
          </h1>

          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.9, maxWidth: 440, marginBottom: 32 }}>
            {t(
              "بدل ما تدوّر على سيارة... خلّي السيارات هي اللي تقدّم نفسها ليك. اختار الشخصية اللي تناسبك وابدأ الرحلة.",
              "Instead of searching for a car... let the cars introduce themselves to you. Pick the personality that matches you and start the ride."
            )}
          </p>

          <div style={{ display: "flex", gap: 12 }}>
            <a href="#personalities" style={{
              padding: "16px 32px", borderRadius: 16, background: V, color: W,
              fontWeight: 700, fontSize: 15, textDecoration: "none", fontFamily: h,
              display: "flex", alignItems: "center", gap: 8,
              boxShadow: `0 8px 32px ${V}40`, transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${V}50`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 8px 32px ${V}40`; }}>
              {t("ابدأ التجربة", "Start the Experience")} <Arrow size={16} />
            </a>
            <a href="#cars" style={{
              padding: "16px 28px", borderRadius: 16, background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)", color: W,
              fontWeight: 600, fontSize: 14, textDecoration: "none", fontFamily: h,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <Play size={14} /> {t("شوف السيارات", "Browse Cars")}
            </a>
          </div>
        </div>

        {/* Visual side — car image with floating personality cards */}
        <div style={{ position: "relative", height: 480 }}>
          {/* Main car image */}
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            width: "90%", maxWidth: 440, zIndex: 1,
          }}>
            <img src={IMG.heroCar} alt="" style={{
              width: "100%", borderRadius: 28, objectFit: "cover",
              boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 120px ${V}15`,
            }} />
          </div>
          {/* Floating personality cards around the car */}
          {PERSONALITIES.slice(0, 4).map((p, i) => {
            const positions = [
              { top: 0, right: 10, rotate: "3deg" },
              { top: 60, left: -10, rotate: "-2deg" },
              { bottom: 60, right: -10, rotate: "1deg" },
              { bottom: 0, left: 10, rotate: "-3deg" },
            ];
            const pos = positions[i];
            return (
              <div key={p.id} style={{
                position: "absolute", ...pos, zIndex: 3,
                background: "rgba(255,255,255,0.1)", backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 16, padding: "10px 14px", width: 200,
                transform: `rotate(${pos.rotate})`,
                animation: `t9float${i} 6s ease-in-out infinite`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: p.gradient, display: "flex", alignItems: "center", justifyContent: "center", color: W, flexShrink: 0 }}>
                    {p.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: W, fontFamily: h }}>{t(p.ar, p.en)}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>{t(p.descAr, p.descEn)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wave bottom */}
      <div style={{ height: 60, background: BG, borderRadius: "60px 60px 0 0", marginTop: -30, position: "relative", zIndex: 2 }} />
    </section>
  );
}