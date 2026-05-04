import { useAppContext } from "@/app/contexts/AppContext";
import { IMG, PAD } from "@/app/themes/theme6/page";
import { sectionPad, TXT, useFonts } from "@/app/themes/theme6/page";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();

  const socials = [
    { label: "Instagram", icon: "IG" },
    { label: "Twitter", icon: "X" },
    { label: "YouTube", icon: "YT" },
  ];

  return (
    <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden"}}>
      {/* Full background image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img src={IMG.heroRoad} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        {/* Warm cinematic overlay — lighter to show mountains + vehicle */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(30,20,10,0.25) 0%, rgba(30,20,10,0.05) 35%, rgba(30,20,10,0.08) 60%, rgba(15,10,5,0.55) 100%)" }} />
        {/* Warm color tint for sunset feel */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(120,60,20,0.08) 0%, transparent 60%)" }} />
      </div>

      {/* Social icons — right side vertical */}
      <div style={{
        position: "absolute", right: isRTL ? "auto" : 32, left: isRTL ? 32 : "auto",
        top: "50%", transform: "translateY(-50%)", zIndex: 10,
        display: "flex", flexDirection: "column", gap: 12,
      }}>
        {socials.map((s, i) => (
          <button key={i} title={s.label} style={{
            width: 42, height: 42, borderRadius: "50%",
            background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s", fontFamily: "'Inter',sans-serif",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.25)"; e.currentTarget.style.transform = "scale(1.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = ""; }}>
            {s.icon}
          </button>
        ))}
      </div>

      {/* Main content — editorial heading centered vertically */}
      <div style={{
        position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", 
        paddingLeft: "24px", paddingRight: "24px",
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", paddingBottom: 140, paddingTop: 120,
      }}>
        <h1 style={{
          fontSize: "clamp(2.8rem, 7vw, 5.2rem)", fontWeight: 300,
          color: "#fff", lineHeight: 1.08,
          fontFamily: isRTL ? heading : "'Inter', serif",
          maxWidth: 650, letterSpacing: isRTL ? 0 : "-0.02em",
          textShadow: "0 2px 40px rgba(0,0,0,0.15)",
        }}>
          {isRTL ? (
            <>
              {"حيث أحلامك"}
              <br />
              {"تصبح مغامرات"}
              <br />
              <span style={{ fontWeight: 700, fontStyle: "italic" }}>{"أسطورية"}</span>
            </>
          ) : (
            <>
              {"Where Your Dreams"}
              <br />
              {"Become "}
              <span style={{ fontWeight: 700, fontStyle: "italic" }}>{"Legendary"}</span>
              <br />
              {"Adventures"}
            </>
          )}
        </h1>
      </div>

      {/* Bottom bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
        padding: "0 32px 36px", display: "flex", alignItems: "flex-end",
        justifyContent: "space-between", flexWrap: "wrap", gap: 20,
      }}>
        {/* Book Now button + description */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, maxWidth: 520 }}>
          <button onClick={() => document.getElementById("trips")?.scrollIntoView({ behavior: "smooth" })} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "14px 28px", borderRadius: 40,
            background: "rgba(255,255,255,0.95)", color: TXT,
            border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer",
            fontFamily: heading, whiteSpace: "nowrap", transition: "all 0.3s",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.95)"; e.currentTarget.style.transform = ""; }}>
            {t("احجز الآن", "Book Now")}
            <span style={{
              width: 30, height: 30, borderRadius: "50%", background: TXT,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ArrowRight size={14} color="#fff" style={{ transform: isRTL ? "rotate(180deg)" : "" }} />
            </span>
          </button>
          <p style={{
            fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6,
            fontFamily: body, maxWidth: 320,
          }}>
            {t(
              "اكتشف سحر الطبيعة — مناظر خلابة وثقافة نابضة في مغامرة لا تُنسى.",
              "Experience the magic — stunning landscapes and vibrant culture in one unforgettable adventure."
            )}
          </p>
        </div>

        {/* Scroll down */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
        }}
          onClick={() => document.getElementById("trips")?.scrollIntoView({ behavior: "smooth" })}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500, letterSpacing: 0.5 }}>
            {t("اسحب للأسفل", "Scroll down")}
          </span>
          <ChevronDown size={16} color="rgba(255,255,255,0.6)" style={{ animation: "t6bounce 2s infinite" }} />
        </div>
      </div>

      <style>{`
        @keyframes t6bounce { 0%,20%,50%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} 60%{transform:translateY(-3px)} }
      `}</style>
    </section>
  );
}