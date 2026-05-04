"use client"

import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts, BG, TXT, TXT_DIM, GOLD, BG2, PAD } from "@/app/themes/theme2/page";
import { RED, RED_L, TXT_MUTED, RACE_IMG } from "@/app/themes/theme3/page";
import { Gauge, Play, Shield, Trophy, Timer, Award, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [count, setCount] = useState({ speed: 0, cars: 0, clients: 0 });
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 200);
    const targets = { speed: 340, cars: 50, clients: 2500 };
    const dur = 2000;
    const steps = 60;
    let step = 0;
    const id = setInterval(() => {
      step++;
      const p = Math.min(step / steps, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount({
        speed: Math.round(targets.speed * ease),
        cars: Math.round(targets.cars * ease),
        clients: Math.round(targets.clients * ease),
      });
      if (step >= steps) clearInterval(id);
    }, dur / steps);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{
      position: "relative", minHeight: "100vh", overflow: "hidden",
      display: "flex", flexDirection: "column", background: BG,
      padding:PAD
    }}>
      {/* Top padding for navbar */}
      <div style={{ height: 72 }} />

      {/* Main split content */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative" }}>
        {/* Left: Content */}
        <div style={{
          position: "relative", zIndex: 3, display: "flex", flexDirection: "column",
          justifyContent: "center", 
          // padding: isRTL ? "60px 32px 60px 0" : "60px 0 60px 80px",
           padding: "0 48px"
        }}>
          {/* Vertical red accent line */}
          <div style={{
            position: "absolute", top: "15%", [isRTL ? "right" : "left"]: isRTL ? 80 : 32,
            width: 3, height: "70%", background: `linear-gradient(to bottom, transparent, ${RED}, transparent)`,
            opacity: 0.3,
          }} />

          <div style={{ maxWidth: 560, margin: isRTL ? "0 60px 0 auto" : "0 auto 0 40px" }}>
            {/* Racing number badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 28,
              opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.2s",
            }}>
              <div style={{
                width: 44, height: 44, background: RED, display: "flex",
                alignItems: "center", justifyContent: "center",
                clipPath: "polygon(15% 0, 100% 0, 85% 100%, 0 100%)",
              }}>
                <span style={{ color: "#fff", fontWeight: 900, fontSize: 18, fontFamily: heading }}>#1</span>
              </div>
              <div style={{ height: 1, width: 40, background: `${RED}60` }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: "0.2em", fontFamily: heading }}>
                {t("تجربة السباقات", "RACING EXPERIENCE")}
              </span>
            </div>

            {/* Main Heading */}
            <h1 style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", fontWeight: 900, color: TXT,
              lineHeight: 1.0, marginBottom: 28, fontFamily: heading,
              letterSpacing: "-0.02em",
              opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s ease 0.4s",
            }}>
              {t("أَطلِق", "UNLEASH")}
              <br />
              <span style={{ color: RED, WebkitTextStroke: "0px", position: "relative" }}>
                {t("وَحشَ", "THE")}
              </span>
              <br />
              <span style={{ position: "relative" }}>
                {t("السرعة", "BEAST")}
                {/* Speed line decorations on the word */}
                <span style={{
                  position: "absolute", [isRTL ? "right" : "left"]: "105%", top: "50%",
                  display: "flex", gap: 4, transform: "translateY(-50%)",
                }}>
                  {[40, 28, 16].map((w, i) => (
                    <span key={i} style={{ width: w, height: 3, background: RED, opacity: 1 - i * 0.25, borderRadius: 2 }} />
                  ))}
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 16, color: TXT_DIM, lineHeight: 1.9, marginBottom: 40,
              maxWidth: 460, fontFamily: body,
              opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.6s",
            }}>
              {t(
                "اختر سيارة رياضية واطلق العنان لتجربة قيادة لا تُنسى. بورش، فيراري، لامبورجيني — كلها تنتظرك.",
                "Choose a sports car and unleash an unforgettable driving experience. Porsche, Ferrari, Lamborghini — all waiting for you."
              )}
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: "flex", gap: 16, marginBottom: 56,
              opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.8s",
            }}>
              <button onClick={() => document.getElementById("fleet-section")?.scrollIntoView({ behavior: "smooth" })} style={{
                padding: "16px 40px", background: RED, color: "#fff", border: "none",
                fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: heading,
                letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 10,
                clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = RED_L; e.currentTarget.style.transform = "scale(1.03)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = RED; e.currentTarget.style.transform = ""; }}>
                <Gauge size={18} />
                {t("استعرض السيارات", "BROWSE FLEET")}
              </button>
              <button onClick={() => setShowVideo(true)} style={{
                padding: "16px 32px", background: "transparent",
                border: `2px solid ${TXT}25`, color: TXT, fontWeight: 600,
                fontSize: 14, cursor: "pointer", fontFamily: body,
                display: "flex", alignItems: "center", gap: 10, transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = RED; e.currentTarget.style.color = RED; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${TXT}25`; e.currentTarget.style.color = TXT; }}>
                <Play size={16} />
                {t("شاهد الفيديو", "WATCH VIDEO")}
              </button>
            </div>

            {/* Counter Stats — horizontal with dividers */}
            <div style={{
              display: "flex", gap: 0,
              opacity: heroLoaded ? 1 : 0, transition: "all 0.6s ease 1s",
            }}>
              {[
                { val: `${count.speed}`, unit: "km/h", ar: "السرعة القصوى", en: "TOP SPEED", highlight: true },
                { val: `${count.cars}+`, unit: "", ar: "سيارة رياضية", en: "SPORTS CARS", highlight: false },
                { val: `${count.clients}+`, unit: "", ar: "عميل سعيد", en: "HAPPY CLIENTS", highlight: false },
              ].map((s, i) => (
                <div key={i} style={{
                  flex: 1, textAlign: "center", position: "relative",
                  padding: "16px 0",
                  borderLeft: i > 0 ? `1px solid ${TXT}12` : "none",
                }}>
                  {s.highlight && (
                    <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 30, height: 2, background: GOLD }} />
                  )}
                  <div style={{ fontSize: 32, fontWeight: 900, color: s.highlight ? GOLD : TXT, fontFamily: heading, lineHeight: 1 }}>
                    {s.val}<span style={{ fontSize: 12, color: TXT_MUTED }}>{s.unit}</span>
                  </div>
                  <div style={{ fontSize: 9, color: TXT_MUTED, fontWeight: 600, letterSpacing: "0.18em", marginTop: 6, fontFamily: heading }}>{t(s.ar, s.en)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Image with aggressive clip */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          {/* Main car image */}
          <div style={{
            position: "absolute", inset: 0,
            clipPath: isRTL
              ? "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)"
              : "polygon(0 0, 100% 0, 100% 100%, 20% 100%)",
          }}>
            <img src={RACE_IMG.hero} alt="" style={{
              width: "100%", height: "100%", objectFit: "cover",
              filter: "brightness(0.7) contrast(1.15) saturate(1.1)",
            }} />
            {/* Red overlay on image */}
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(to ${isRTL ? "right" : "left"}, ${BG} 0%, transparent 30%, transparent 60%, ${RED}15 100%)`,
            }} />
            {/* Bottom gradient */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
              background: `linear-gradient(to top, ${BG}, transparent)`,
            }} />
          </div>

          {/* Floating speedometer element */}
          <div style={{
            position: "absolute", bottom: 60, [isRTL ? "right" : "left"]: 40,
            zIndex: 5, display: "flex", alignItems: "center", gap: 16,
            background: "rgba(11,11,11,0.85)", backdropFilter: "blur(12px)",
            borderRadius: 8, padding: "16px 24px",
            border: `1px solid ${RED}30`,
            opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 1.2s",
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              border: `3px solid ${GOLD}`, display: "flex", alignItems: "center",
              justifyContent: "center", position: "relative",
            }}>
              <Gauge size={22} color={GOLD} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 22, fontWeight: 900, color: TXT, fontFamily: heading, lineHeight: 1 }}>0-100</p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: TXT_MUTED, fontWeight: 600, letterSpacing: "0.1em", fontFamily: heading }}>
                {t("ثانية فقط 2.7", "ONLY 2.7 SEC")}
              </p>
            </div>
          </div>

          {/* Secondary small image */}
          <div style={{
            position: "absolute", top: 100, [isRTL ? "left" : "right"]: 40, zIndex: 5,
            width: 140, height: 90, borderRadius: 6, overflow: "hidden",
            border: `2px solid ${RED}40`,
            boxShadow: `0 10px 40px rgba(0,0,0,0.5)`,
            opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateX(0)" : "translateX(20px)",
            transition: "all 0.8s ease 1.4s",
          }}>
            <img src={RACE_IMG.heroAlt} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Speed lines on image side */}
          <div style={{
            position: "absolute", top: "30%", [isRTL ? "right" : "left"]: 0, zIndex: 4,
            display: "flex", flexDirection: "column", gap: 6, opacity: 0.15,
          }}>
            {[80, 60, 100, 45, 70].map((w, i) => (
              <div key={i} style={{ width: w, height: 2, background: RED, borderRadius: 1 }} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom stats bar with carbon texture */}
      <div style={{
        position: "relative", zIndex: 5, background: BG2,
        borderTop: `1px solid ${TXT}08`,
      }}>
        {/* Checkered flag pattern */}
        <div style={{
          position: "absolute", top: -4, left: 0, right: 0, height: 4,
          background: `repeating-linear-gradient(90deg, ${RED} 0px, ${RED} 20px, transparent 20px, transparent 40px)`,
          opacity: 0.6,
        }} />
        <div style={{
          maxWidth: 1320, margin: "0 auto", padding: "0 32px",
          display: "flex", justifyContent: "center", gap: 0,
        }}>
          {[
            { icon: <Shield size={16} />, ar: "سيارات أصلية 100%", en: "100% Authentic Cars" },
            { icon: <Trophy size={16} />, ar: "50+ سيارة رياضية", en: "50+ Sports Cars" },
            { icon: <Timer size={16} />, ar: "تسليم فوري", en: "Instant Delivery" },
            { icon: <Award size={16} />, ar: "ضمان التجربة", en: "Experience Guarantee" },
          ].map((item, i) => (
            <div key={i} style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
              gap: 10, padding: "16px 20px",
              borderRight: i < 3 ? `1px solid ${TXT}08` : "none",
            }}>
              <span style={{ color: RED }}>{item.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: TXT_DIM, fontFamily: body }}>{t(item.ar, item.en)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div onClick={() => setShowVideo(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)",
          zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div onClick={e => e.stopPropagation()} style={{ position: "relative", width: "min(900px, 92vw)", aspectRatio: "16/9" }}>
            <button onClick={() => setShowVideo(false)} style={{
              position: "absolute", top: -48, right: 0, background: "rgba(255,255,255,0.1)",
              border: "none", borderRadius: 4, width: 40, height: 40,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}><X size={20} color="#fff" /></button>
            <div style={{
              width: "100%", height: "100%", borderRadius: 8, overflow: "hidden",
              border: `2px solid ${RED}40`, background: BG2,
              display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20,
            }}>
              <div style={{
                width: 90, height: 90, borderRadius: "50%",
                background: `${RED}20`, border: `3px solid ${RED}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Play size={40} color={RED} fill={RED} />
              </div>
              <p style={{ color: TXT, fontFamily: heading, fontSize: 20, fontWeight: 800, letterSpacing: "0.08em" }}>
                {t("تجربة SpeedX Racing", "SpeedX Racing Experience")}
              </p>
              <p style={{ color: TXT_MUTED, fontFamily: body, fontSize: 14 }}>
                {t("الفيديو الترويجي — قريباً", "Promo Video — Coming Soon")}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}