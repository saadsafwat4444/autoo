import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts, BG2, TXT, BG3, GOLD, BG4, TXT_DIM } from "@/app/themes/theme2/page";
import { SectionBadge, RED, CARBON, RED_L, TXT_MUTED, PAD } from "@/app/themes/theme3/page";
import { Check, Copy, Gauge } from "lucide-react";
import { useState, useEffect } from "react";

export default function Offers() {
  const { t } = useAppContext();
  const { heading, body } = useFonts();
  const [time, setTime] = useState({ h: 23, m: 59, s: 59 });
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setTime(p => {
      let { h, m, s } = p;
      s--;
      if (s < 0) { s = 59; m--; if (m < 0) { m = 59; h = Math.max(0, h - 1); } }
      return { h, m, s };
    }), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => n.toString().padStart(2, "0");

  const offers = [
    { ar: "سباق نهاية الأسبوع", en: "Weekend Racing", discount: 25, code: "WEEKEND25", desc: { ar: "احجز أي سيارة رياضية لعطلة نهاية الأسبوع", en: "Book any sports car for the weekend" } },
    { ar: "يوم السوبر كار", en: "Supercar Day", discount: 30, code: "SUPER30", desc: { ar: "تجربة سوبر كار ليوم كامل بخصم مميز", en: "Full-day supercar experience at a special discount" } },
    { ar: "باقة السباقات", en: "Racing Package", discount: 35, code: "RACEPACK35", desc: { ar: "حلبة + سيارة رياضية + مدرب خاص", en: "Track + sports car + private instructor" } },
  ];

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 3000);
  };

  return (
    <section style={{ background: BG2, padding: PAD, position: "relative" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ marginBottom: 20 }}>
          <SectionBadge>{t("عروض", "DEALS")}</SectionBadge>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: TXT, fontFamily: heading, margin: "8px 0 16px" }}>
            {t("عروض السرعة", "SPEED DEALS")}
          </h2>
          {/* Countdown */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 48 }}>
            {[pad(time.h), pad(time.m), pad(time.s)].map((v, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ background: BG3, borderRadius: 4, padding: "8px 14px", borderBottom: `2px solid ${GOLD}` }}>
                  <span style={{ fontSize: 24, fontWeight: 900, color: GOLD, fontFamily: heading }}>{v}</span>
                </div>
                {i < 2 && <span style={{ color: GOLD, fontWeight: 900, fontSize: 24 }}>:</span>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {offers.map((o, i) => (
            <div key={i} style={{
              background: BG3, borderRadius: 4, overflow: "hidden",
              border: `1px solid ${TXT}08`, position: "relative",
              transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${RED}40`; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${TXT}08`; e.currentTarget.style.transform = ""; }}>
              {/* Discount header */}
              <div style={{
                background: `linear-gradient(135deg, ${BG4}, ${CARBON})`,
                padding: "28px 24px", textAlign: "center",
                clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
                borderBottom: `2px solid ${RED}30`,
              }}>
                <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, fontFamily: heading, lineHeight: 1 }}>
                  {o.discount}<span style={{ fontSize: 22 }}>%</span>
                </div>
                <p style={{ margin: "4px 0 0", fontSize: 11, color: RED_L, fontWeight: 600, letterSpacing: "0.15em", fontFamily: heading }}>{t("خصم", "OFF")}</p>
              </div>
              <div style={{ padding: "24px" }}>
                <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: TXT, fontFamily: heading }}>{t(o.ar, o.en)}</h3>
                <p style={{ margin: "0 0 14px", fontSize: 13, color: TXT_MUTED, lineHeight: 1.6, fontFamily: body }}>{t(o.desc.ar, o.desc.en)}</p>
                {/* Coupon code */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 0, marginBottom: 14,
                  border: `1px dashed ${GOLD}50`, borderRadius: 4, overflow: "hidden",
                }}>
                  <div style={{ flex: 1, padding: "10px 14px", background: `${GOLD}10` }}>
                    <span style={{ fontSize: 14, fontWeight: 900, color: GOLD, fontFamily: heading, letterSpacing: "0.15em" }}>{o.code}</span>
                  </div>
                  <button onClick={() => handleCopy(o.code, i)} style={{
                    padding: "10px 14px", background: copiedIdx === i ? `${RED}20` : BG4,
                    border: "none", borderLeft: `1px dashed ${RED}50`, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 6, transition: "all 0.3s",
                  }}>
                    {copiedIdx === i ? <Check size={14} color={RED} /> : <Copy size={14} color={TXT_DIM} />}
                    <span style={{ fontSize: 11, fontWeight: 700, color: copiedIdx === i ? RED : TXT_DIM, fontFamily: heading }}>
                      {copiedIdx === i ? t("تم النسخ!", "COPIED!") : t("نسخ", "COPY")}
                    </span>
                  </button>
                </div>
                {copiedIdx === i ? (
                  <button onClick={() => { setCopiedIdx(null); document.getElementById("fleet-section")?.scrollIntoView({ behavior: "smooth" }); }} style={{
                    width: "100%", padding: "11px", borderRadius: 4, background: RED, color: "#fff",
                    border: "none", fontWeight: 800, cursor: "pointer", fontFamily: heading,
                    fontSize: 12, letterSpacing: "0.08em", display: "flex", alignItems: "center",
                    justifyContent: "center", gap: 8,
                  }}>
                    <Gauge size={14} />
                    {t("روح احجز سيارتك!", "GO BOOK YOUR CAR!")}
                  </button>
                ) : (
                  <button onClick={() => handleCopy(o.code, i)} style={{
                    width: "100%", padding: "11px", borderRadius: 4, background: RED, color: "#fff",
                    border: "none", fontWeight: 800, cursor: "pointer", fontFamily: heading,
                    fontSize: 12, letterSpacing: "0.08em",
                  }}>{t("احصل على العرض", "CLAIM DEAL")}</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}