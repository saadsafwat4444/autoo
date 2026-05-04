import { useAppContext } from "@/app/contexts/AppContext";
import { DK2, IMG, P, pad, PD, PINK, PL, TX3, useFonts } from "@/app/themes/theme7/page";
import { Car, Play, Star } from "lucide-react";

export default function Hero() {
  const { t, isRTL } = useAppContext();
  const { h } = useFonts();

  const marqueeText = "CITY DRIVE · RENT · EXPLORE · DRIVE · LUXURY · ECONOMY · SUV · CAIRO · ALEX · GIZA · CITY DRIVE · RENT · EXPLORE · DRIVE · LUXURY · ECONOMY · SUV · CAIRO · ALEX · GIZA · ";

  return (
    <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: DK2 }}>
      {/* Noise grain overlay */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px", zIndex: 1 }} />

      {/* Giant outlined watermark text */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        fontSize: "clamp(8rem, 20vw, 16rem)", fontWeight: 900, fontFamily: h,
        color: "transparent", WebkitTextStroke: `2px rgba(124,58,237,0.07)`,
        whiteSpace: "nowrap", userSelect: "none", zIndex: 0,
        letterSpacing: "-0.02em",
      }}>
        CITY DRIVE
      </div>

      {/* Main content */}
      <div style={{ ...pad, position: "relative", zIndex: 3, width: "100%", paddingTop: 130, paddingBottom: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 50, minHeight: "75vh" }}>

          {/* Left — Text content */}
          <div style={{ flex: 1, paddingTop: 40 }}>
            {/* Vertical accent line + tag */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36, animation: "t7slideR 0.6s ease-out" }}>
              <div style={{ width: 3, height: 40, borderRadius: 4, background: `linear-gradient(180deg, ${P}, ${PINK})` }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: TX3, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 2 }}>
                  {t("منصة تأجير السيارات", "Car Rental Platform")}
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: PL }}>
                  {t("حياة المدينة تبدأ هنا", "City Life Starts Here")}
                </div>
              </div>
            </div>

            {/* Headline with mixed styles */}
            <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 900, fontFamily: h, lineHeight: 1.05, marginBottom: 32, animation: "t7slideR 0.8s ease-out" }}>
              <span style={{ color: "#fff", display: "block" }}>
                {t("سيارتك", "Your Car")}
              </span>
              <span style={{
                display: "block",
                color: "transparent", WebkitTextStroke: `2px ${PL}`,
                fontSize: "clamp(3rem, 6.5vw, 5rem)",
              }}>
                {t("في المدينة", "In The City")}
              </span>
              <span style={{
                display: "inline-block", marginTop: 4,
                background: `linear-gradient(135deg, ${P}, ${PINK})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
              }}>
                {t("— بأسلوبك الخاص", "— On Your Terms")}
              </span>
            </h1>

            <p style={{
              fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, marginBottom: 40, maxWidth: 420,
              animation: "t7slideR 1s ease-out",
            }}>
              {t("سواء كان يوم عمل أو خروج مع الأصدقاء أو مناسبة خاصة — لدينا السيارة المناسبة لكل لحظة في يومك", "Whether it's a work day, hanging out with friends, or a special occasion — we have the right car for every moment")}
            </p>

            {/* CTA area — styled like a boarding pass */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 0, marginBottom: 48,
              animation: "t7slideR 1.2s ease-out",
            }}>
              <button onClick={() => document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" })} style={{
                padding: "18px 36px", borderRadius: "16px 0 0 16px",
                background: P, color: "#fff", border: "none",
                fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: h,
                display: "flex", alignItems: "center", gap: 10,
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = PD; }}
                onMouseLeave={e => { e.currentTarget.style.background = P; }}>
                <Car size={18} />
                {t("استعرض السيارات", "Browse Cars")}
              </button>
              {/* Separator with perforated look */}
              <div style={{ width: 2, height: 56, background: "repeating-linear-gradient(180deg, transparent 0px, transparent 4px, rgba(255,255,255,0.3) 4px, rgba(255,255,255,0.3) 8px)", flexShrink: 0 }} />
              <button onClick={() => document.getElementById("your-day")?.scrollIntoView({ behavior: "smooth" })} style={{
                padding: "18px 32px", borderRadius: "0 16px 16px 0",
                background: "rgba(124,58,237,0.15)", color: PL,
                border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: h,
                backdropFilter: "blur(8px)", display: "flex", alignItems: "center", gap: 8,
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.25)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(124,58,237,0.15)"; }}>
                <Play size={15} />
                {t("خطتك اليوم؟", "Your Plan?")}
              </button>
            </div>

            {/* Stats — inline row */}
            <div style={{ display: "flex", gap: 36, animation: "t7slideR 1.4s ease-out" }}>
              {[
                { val: "5,000+", ar: "عميل", en: "Clients" },
                { val: "200+", ar: "سيارة", en: "Cars" },
                { val: "4.9", ar: "تقييم", en: "Rating" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", fontFamily: h }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: TX3, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{t(s.ar, s.en)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Overlapping tilted image cards */}
          <div style={{ flex: 1, position: "relative", minHeight: 540, animation: "t7scaleIn 1s ease-out" }}>
            {/* Main large image — tilted */}
            <div style={{
              position: "absolute", top: 20, right: 0, width: "88%", height: 420,
              borderRadius: 28, overflow: "hidden",
              transform: "rotate(-3deg)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
              border: "3px solid rgba(255,255,255,0.08)",
            }}>
              <img src={IMG.hero} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(17,24,39,0.6))" }} />
            </div>

            {/* Secondary smaller image — overlapping, tilted opposite */}
            <div style={{
              position: "absolute", bottom: 40, left: -20, width: 220, height: 160,
              borderRadius: 20, overflow: "hidden",
              transform: "rotate(4deg)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
              border: "3px solid rgba(255,255,255,0.1)",
              animation: "t7float 4s ease-in-out infinite",
              zIndex: 5,
            }}>
              <img src={IMG.hero2} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            {/* Glass stat card — floating */}
            <div style={{
              position: "absolute", top: 380, right: 30,
              background: "rgba(124,58,237,0.2)", backdropFilter: "blur(20px)",
              borderRadius: 18, padding: "16px 24px",
              border: "1px solid rgba(124,58,237,0.25)",
              animation: "t7float 3.5s ease-in-out infinite",
              animationDelay: "0.5s", zIndex: 6,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: P, display: "flex", alignItems: "center", justifyContent: "center",
                }}><Star size={18} color="#fff" /></div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: h }}>4.9</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.08em" }}>{t("تقييم العملاء", "CLIENT RATING")}</div>
                </div>
              </div>
            </div>

            {/* Decorative: dotted circle */}
            <div style={{
              position: "absolute", top: -20, right: -30, width: 140, height: 140,
              borderRadius: "50%", border: `2px dotted ${P}20`,
            }} />
            {/* Decorative: small purple square */}
            <div style={{
              position: "absolute", top: 100, left: 30, width: 20, height: 20,
              borderRadius: 5, background: P, opacity: 0.3,
              transform: "rotate(45deg)",
              animation: "t7pulse2 3s ease-in-out infinite",
            }} />
            {/* Decorative: line */}
            <div style={{
              position: "absolute", bottom: 120, left: -40, width: 60, height: 2,
              background: `linear-gradient(90deg, transparent, ${PL}40)`,
            }} />
          </div>
        </div>
      </div>

      {/* Bottom marquee ticker */}
      <div style={{
        position: "relative", zIndex: 4,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(0,0,0,0.2)", backdropFilter: "blur(8px)",
        overflow: "hidden", padding: "14px 0",
      }}>
        <div style={{
          display: "flex", whiteSpace: "nowrap",
          animation: "t7marquee 25s linear infinite",
          width: "fit-content",
        }}>
          {[0, 1].map(k => (
            <span key={k} style={{
              fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.12)",
              letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: h,
              paddingRight: 0,
            }}>
              {marqueeText}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}