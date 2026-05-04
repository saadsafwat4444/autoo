import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts, BG, TXT } from "@/app/themes/theme5/page";
import { GREEN, TXT2, TXT3 } from "@/app/themes/theme5/page";
import { CYAN, INDIGO_L, INDIGO, BORDER2, GridBG } from "@/app/themes/theme5/page";
import { Bot, Sparkles, Eye, Car, Brain, Zap, Headphones, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [wordIdx, setWordIdx] = useState(0);
  const [particles] = useState(() => Array.from({ length: 24 }, (_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100,
    size: 2 + Math.random() * 3, dur: 4 + Math.random() * 6, delay: Math.random() * 5,
    opacity: 0.15 + Math.random() * 0.25,
  })));

  const words = [
    { ar: "بذكاء", en: "Intelligently" },
    { ar: "بسرعة", en: "Instantly" },
    { ar: "بأمان", en: "Securely" },
    { ar: "بثقة", en: "Confidently" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setWordIdx(p => (p + 1) % words.length), 2800);
    return () => clearInterval(timer);
  }, []);

  const heroImg = "https://images.unsplash.com/photo-1753792707171-162cc17211ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXIlMjBkYXJrJTIwbW9vZHklMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzczMzE4MzcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  return (
    <section style={{ position: "relative", background: BG, minHeight: "100vh", overflow: "hidden" }}>
      {/* Full-bleed background car image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img src={heroImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", opacity: 0.5 }} />
        {/* Navy overlays for depth — keeps car visible but darkens for readability */}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${BG}cc 0%, rgba(2,6,23,0.3) 30%, rgba(2,6,23,0.25) 55%, rgba(2,6,23,0.55) 80%, ${BG} 100%)` }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, rgba(6,182,212,0.06) 0%, transparent 40%, transparent 60%, rgba(79,70,229,0.06) 100%)` }} />
      </div>

      <GridBG />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, borderRadius: "50%",
          background: i % 3 === 0 ? CYAN : i % 3 === 1 ? INDIGO_L : "#F59E0B",
          opacity: p.opacity, pointerEvents: "none",
          animation: `heroFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
        }} /> 
      ))}

      {/* Central Orbital Core */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 1,
      }}>
        <div style={{
          width: 500, height: 500, borderRadius: "50%",
          border: "1px solid rgba(6,182,212,0.06)",
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "heroSpin 30s linear infinite",
        }}>
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translate(-50%, -50%)",
            width: 8, height: 8, borderRadius: "50%", background: CYAN,
            boxShadow: `0 0 12px ${CYAN}`,
          }} />
        </div>
        <div style={{
          width: 700, height: 700, borderRadius: "50%",
          border: "1px dashed rgba(79,70,229,0.06)",
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "heroSpin 45s linear infinite reverse",
        }}>
          <div style={{
            position: "absolute", bottom: 0, left: "50%", transform: "translate(-50%, 50%)",
            width: 6, height: 6, borderRadius: "50%", background: INDIGO_L,
            boxShadow: `0 0 10px ${INDIGO_L}`,
          }} />
        </div>
        <div style={{
          width: 900, height: 900, borderRadius: "50%",
          border: "1px solid rgba(6,182,212,0.03)",
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "heroSpin 60s linear infinite",
        }} />
      </div>

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 3, maxWidth: 1200, margin: "0 auto",
        padding: "140px 24px 60px", minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        {/* Central AI Core Icon */}
        <div style={{
          width: 80, height: 80, borderRadius: 24, marginBottom: 36,
          background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 50px rgba(6,182,212,0.35), 0 0 100px rgba(6,182,212,0.15)`,
          animation: "heroPulse 3s ease-in-out infinite",
          position: "relative",
        }}>
          <Bot size={36} color="#fff" />
          <div style={{
            position: "absolute", inset: -6, borderRadius: 28,
            border: "2px solid rgba(6,182,212,0.3)",
            animation: "heroPing 2s ease-out infinite",
          }} />
        </div>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(6,182,212,0.08)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(6,182,212,0.15)",
          borderRadius: 30, padding: "8px 22px", marginBottom: 28,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: CYAN, letterSpacing: 0.5 }}>
            {t("نظام الذكاء الاصطناعي نشط", "AI System Active")}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 900, color: TXT,
          lineHeight: 1.15, textAlign: "center", fontFamily: heading,
          marginBottom: 10, maxWidth: 700,
        }}>
          {t("ارتك المثالية", "Your Perfect Car")}
        </h1>
        {/* Rotating word */}
        <div style={{
          fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 900,
          textAlign: "center", marginBottom: 24, height: "1.3em",
          overflow: "hidden", position: "relative",
        }}>
          {words.map((w, i) => (
            <div key={i} style={{
              position: i === wordIdx ? "relative" : "absolute",
              top: 0, left: 0, right: 0,
              background: `linear-gradient(135deg, ${CYAN}, ${INDIGO_L})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", fontFamily: heading,
              opacity: i === wordIdx ? 1 : 0,
              transform: i === wordIdx ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}>
              {t(w.ar, w.en)}
            </div>
          ))}
        </div>

        <p style={{
          fontSize: 17, color: TXT2, lineHeight: 1.8, textAlign: "center",
          maxWidth: 540, marginBottom: 44, fontFamily: body,
        }}>
          {t(
            "منصة ذكية تحلل احتياجاتك وتوصي بالسيارة المثالية في ثوانٍ. لا تبحث أنت — دعنا نختار لك.",
            "A smart platform that analyzes your needs and recommends the perfect car in seconds. Don't search — let us choose for you."
          )}
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 16, marginBottom: 56 }}>
          <button onClick={() => document.getElementById("ai")?.scrollIntoView({ behavior: "smooth" })} style={{
            padding: "16px 36px", borderRadius: 16,
            background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
            color: "#fff", border: "none", fontWeight: 700, fontSize: 16,
            cursor: "pointer", fontFamily: heading, display: "flex", alignItems: "center", gap: 10,
            boxShadow: `0 0 30px rgba(6,182,212,0.3), 0 8px 30px rgba(0,0,0,0.3)`,
            transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(6,182,212,0.4), 0 12px 40px rgba(0,0,0,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 0 30px rgba(6,182,212,0.3), 0 8px 30px rgba(0,0,0,0.3)"; }}>
            <Sparkles size={18} />
            {t("ابدأ التجربة الذكية", "Start Smart Experience")}
          </button>
          <button onClick={() => document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" })} style={{
            padding: "16px 32px", borderRadius: 16,
            background: "rgba(15,23,42,0.6)", backdropFilter: "blur(12px)",
            border: `1.5px solid ${BORDER2}`,
            color: TXT2, fontWeight: 600, fontSize: 16, cursor: "pointer",
            fontFamily: heading, display: "flex", alignItems: "center", gap: 8,
            transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = CYAN; e.currentTarget.style.color = CYAN; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER2; e.currentTarget.style.color = TXT2; e.currentTarget.style.transform = ""; }}>
            <Eye size={16} />
            {t("استعرض الأسطول", "Explore Fleet")}
          </button>
        </div>

        {/* Floating Glass Cards — Stats */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { val: "50+", ar: "سيارة في الأسطول", en: "Cars in Fleet", icon: <Car size={18} />, color: CYAN },
            { val: "98%", ar: "دقة التوصيات", en: "AI Accuracy", icon: <Brain size={18} />, color: INDIGO_L },
            { val: "<60s", ar: "لإتمام الحجز", en: "Booking Time", icon: <Zap size={18} />, color: "#F59E0B" },
            { val: "24/7", ar: "دعم متواصل", en: "Support", icon: <Headphones size={18} />, color: GREEN },
          ].map((s, i) => (
            <div key={i} style={{
              background: "rgba(15,23,42,0.6)", backdropFilter: "blur(16px)",
              borderRadius: 18, padding: "18px 26px",
              border: `1px solid rgba(${s.color === CYAN ? "6,182,212" : s.color === INDIGO_L ? "99,102,241" : s.color === GREEN ? "16,185,129" : "245,158,11"},0.15)`,
              display: "flex", alignItems: "center", gap: 16,
              transition: "all 0.3s", minWidth: 200,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = s.color + "40"; e.currentTarget.style.boxShadow = "0 0 25px " + s.color + "15"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = s.color + "15"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: `linear-gradient(135deg, ${s.color}18, ${s.color}06)`,
                border: `1px solid ${s.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center", color: s.color,
              }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: TXT, fontFamily: heading }}>{s.val}</div>
                <div style={{ fontSize: 12, color: TXT3 }}>{t(s.ar, s.en)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{
          marginTop: 52, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "heroBounce 2s infinite",
        }}>
          <span style={{ fontSize: 12, color: TXT3, letterSpacing: 1 }}>{t("اكتشف المزيد", "Discover More")}</span>
          <ChevronDown size={20} color={TXT3} />
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes heroSpin { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.3); }
        }
        @keyframes heroPulse {
          0%, 100% { box-shadow: 0 0 50px rgba(6,182,212,0.35), 0 0 100px rgba(6,182,212,0.15); }
          50% { box-shadow: 0 0 70px rgba(6,182,212,0.5), 0 0 140px rgba(6,182,212,0.2); }
        }
        @keyframes heroPing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes heroBounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }
      `}</style>
    </section>
  );
}