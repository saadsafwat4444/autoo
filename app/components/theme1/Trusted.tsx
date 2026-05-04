
"use client";

import { useAppContext } from "@/app/contexts/AppContext";
import { MID_GRAY, DARK, PAD } from "@/app/themes/theme1/page";
import { Star, Users, ChevronDown } from "lucide-react";
import { useState } from "react";

// ─── TRUSTED ──────────────────────────────────────────────────────────────────
export default function Trusted() {
  const { t, lang, accent } = useAppContext();
  const ff   = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isAr = lang === "ar";

  const [current,   setCurrent]   = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next"|"prev">("next");

  const brands = ["Toyota", "BMW", "Mercedes", "Hyundai", "Tesla", "KIA"];

  const testimonials = [
    {
      text:   { ar: "\"أفضل خدمة تأجير سيارات جربتها. الحجز سهل، السيارة نظيفة، والتسليم في الوقت المحدد تماماً.\"",      en: "\"Best car rental service I've ever used. Easy booking, clean car, and delivery exactly on time.\"" },
      name:   { ar: "أحمد العمري",    en: "Ahmed Al-Omari"    },
      since:  { ar: "عميل منذ ٢٠٢٠", en: "Customer since 2020" },
      rating: 4.9, reviews: "2000+",
    },
    {
      text:   { ar: "\"سيارة فاخرة بسعر معقول جداً. استلمتها في المطار خلال ١٠ دقائق فقط. تجربة رائعة بحق!\"",            en: "\"Luxury car at a very reasonable price. Picked it up at the airport in just 10 minutes. Truly amazing!\"" },
      name:   { ar: "سارة المنصوري",  en: "Sara Al-Mansouri"  },
      since:  { ar: "عميلة منذ ٢٠٢١", en: "Customer since 2021" },
      rating: 5.0, reviews: "1500+",
    },
    {
      text:   { ar: "\"نستخدم DriveNow لجميع موظفينا منذ سنتين. الأسعار ثابتة، الخدمة احترافية، لا نفكر في بديل.\"",     en: "\"We've used DriveNow for all our staff for two years. Fixed prices, professional service — no looking elsewhere.\"" },
      name:   { ar: "خالد الزهراني",  en: "Khalid Al-Zahrani" },
      since:  { ar: "شريك مؤسسي",     en: "Corporate Partner" },
      rating: 4.8, reviews: "800+",
    },
    {
      text:   { ar: "\"حجزت سيارة للحفل بضغطة واحدة. السيارة مبهرة والسائق محترف جداً. شكراً DriveNow!\"",              en: "\"Booked a wedding car with one click. Stunning car and a very professional driver. Thank you DriveNow!\"" },
      name:   { ar: "نورة الشمري",    en: "Noura Al-Shammari" },
      since:  { ar: "عميلة منذ ٢٠٢٢", en: "Customer since 2022" },
      rating: 5.0, reviews: "600+",
    },
  ];

  const total  = testimonials.length;
  const active = testimonials[current];
  const stars  = Math.round(active.rating);

  const go = (dir: "next" | "prev") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(c => dir === "next" ? (c + 1) % total : (c - 1 + total) % total);
      setAnimating(false);
    }, 260);
  };

  return (
    <section style={{ background: "#fff", fontFamily: ff, direction: isAr ? "rtl" : "ltr", padding: PAD }}>
      <style>{`
        @keyframes dn-slide-next { from { opacity:0; transform:translateX(36px);  } to { opacity:1; transform:translateX(0); } }
        @keyframes dn-slide-prev { from { opacity:0; transform:translateX(-36px); } to { opacity:1; transform:translateX(0); } }
        .dn-slide-next { animation: dn-slide-next 0.28s ease forwards; }
        .dn-slide-prev { animation: dn-slide-prev 0.28s ease forwards; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Brand logos */}
        <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.2em", textTransform: "uppercase" , marginBottom: 28 }}>
          {t("أسطولنا من أفضل الماركات", "Our fleet from top brands")}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", marginBottom: 64, alignItems: "center" }}>
          {brands.map(brand => (
            <span key={brand} style={{ fontSize: 17, fontWeight: 900, color: "rgba(0,0,0,0.12)", letterSpacing: "-0.02em", fontFamily: "'Inter',sans-serif", textTransform: "uppercase" }}>{brand}</span>
          ))}
        </div>

        {/* ── Testimonial Slider ── */}
        <div style={{ background: `linear-gradient(135deg, ${DARK} 0%, #0F2847 100%)`, borderRadius: 20, overflow: "hidden", boxShadow: `0 24px 64px ${DARK}55` }}>

          {/* Slide */}
          <div
            key={current}
            className={animating ? "" : direction === "next" ? "dn-slide-next" : "dn-slide-prev"}
            style={{ padding: "48px 56px", display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}
          >
            {/* Quote */}
            <div>
              <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill={i < stars ? "#F59E0B" : "rgba(255,255,255,0.15)"} color={i < stars ? "#F59E0B" : "rgba(255,255,255,0.15)"} />
                ))}
              </div>
              <p style={{ fontSize: "clamp(1.05rem,2vw,1.3rem)", fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.75, margin: "0 0 28px", fontStyle: "italic" }}>
                {t(active.text.ar, active.text.en)}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${accent}22`, border: `1.5px solid ${accent}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Users size={18} color={accent} />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#fff" }}>{t(active.name.ar, active.name.en)}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{t(active.since.ar, active.since.en)}</p>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 120 }}>
              <p style={{ margin: "0 0 4px", fontSize: 44, fontWeight: 900, color: "#fff", letterSpacing: "-0.05em", lineHeight: 1 }}>
                {active.rating.toFixed(1)}
              </p>
              <div style={{ display: "flex", gap: 3 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < stars ? "#F59E0B" : "rgba(255,255,255,0.15)"} color={i < stars ? "#F59E0B" : "rgba(255,255,255,0.15)"} />
                ))}
              </div>
              <p style={{ margin: "6px 0 0", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                {t(`من ${active.reviews} تقييم`, `${active.reviews} reviews`)}
              </p>
            </div>
          </div>

          {/* Dots + arrows bar */}
          <div style={{ padding: "0 56px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

            {/* Dots */}
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!animating && i !== current) {
                      setDirection(i > current ? "next" : "prev");
                      setAnimating(true);
                      setTimeout(() => { setCurrent(i); setAnimating(false); }, 260);
                    }
                  }}
                  style={{
                    width: i === current ? 22 : 7, height: 7,
                    borderRadius: 4, border: "none", cursor: "pointer", padding: 0,
                    background: i === current ? accent : "rgba(255,255,255,0.2)",
                    transition: "width 0.3s, background 0.3s",
                  }}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div style={{ display: "flex", gap: 8 }}>
              {(["prev","next"] as const).map(dir => (
                <button
                  key={dir}
                  onClick={() => go(isAr ? (dir === "prev" ? "next" : "prev") : dir)}
                  style={{ width: 38, height: 38, borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.12)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.18s, border-color 0.18s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${accent}22`; e.currentTarget.style.borderColor = accent; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
                >
                  <ChevronDown size={16} color="rgba(255,255,255,0.7)" style={{ transform: dir === "prev" ? (isAr ? "rotate(-90deg)" : "rotate(90deg)") : (isAr ? "rotate(90deg)" : "rotate(-90deg)"), pointerEvents: "none" }} />
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}