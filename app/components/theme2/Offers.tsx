import { useAppContext } from "@/app/contexts/AppContext";
import { BG, BG2, BG3, ffBody, GOLD, GOLD_D, PAD, SectionLabel, TXT_DIM, useFonts } from "@/app/themes/theme2/page";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function Offers() {
  const { t } = useAppContext();
  const { heading, body, isAr } = useFonts();
  const [time, setTime] = useState({ h: 8, m: 30, s: 0 });
  const [claimedIdx, setClaimedIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

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
    { ar: "نهاية الأسبوع الفاخرة", en: "Luxury Weekend", discount: 25, hasTimer: true, code: "ELITE-WKD25" },
    { ar: "باقة الزفاف", en: "Wedding Package", discount: 30, hasTimer: false, code: "ELITE-WED30" },
    { ar: "باقة رجال الأعمال", en: "Executive Plan", discount: 35, hasTimer: false, code: "ELITE-EXE35" },
    { ar: "عملاء VIP الجدد", en: "New VIP Clients", discount: 20, hasTimer: false, code: "ELITE-VIP20" },
  ];

  return (
    <section id="elite-offers" style={{ background: BG2, padding: PAD, borderTop: `1px solid ${GOLD}12` }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <SectionLabel>{t("عروض حصرية", "EXCLUSIVE OFFERS")}</SectionLabel>
          <h2 style={{ fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 700, color: "#fff", margin: "16px 0 0", fontFamily: heading }}>
            {t("عروض محدودة الوقت", "Limited Time Deals")}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {offers.map((o, i) => (
            <div
              key={i}
              style={{
                background: BG3, border: `1px solid ${GOLD}15`, padding: "36px 24px",
                textAlign: "center", transition: "border-color 0.3s, transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}50`; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}15`; (e.currentTarget as HTMLElement).style.transform = ""; }}
            >
              <p style={{ margin: "0 0 8px", fontSize: 11, color: GOLD, letterSpacing: "0.18em", fontWeight: 600, fontFamily: ffBody }}>
                {t(o.ar, o.en).toUpperCase()}
              </p>
              <p style={{ margin: "0 0 6px", fontSize: 56, fontWeight: 900, color: GOLD, lineHeight: 1, fontFamily: heading }}>
                {o.discount}%
              </p>
              <p style={{ margin: "0 0 20px", fontSize: 11, color: TXT_DIM, letterSpacing: "0.12em" }}>{t("خصم", "DISCOUNT")}</p>

              {o.hasTimer && (
                <div style={{ marginBottom: 20 }}>
                  <p style={{ margin: "0 0 8px", fontSize: 10, color: TXT_DIM }}>{t("ينتهي خلال", "ENDS IN")}</p>
                  <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                    {[pad(time.h), pad(time.m), pad(time.s)].map((v, j) => (
                      <span key={j} style={{
                        background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
                        color: BG, padding: "6px 10px", fontSize: 16, fontWeight: 800, fontFamily: ffBody,
                        minWidth: 36, textAlign: "center",
                      }}>{v}</span>
                    ))}
                  </div>
                </div>
              )}

              {claimedIdx === i ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px 12px", background: `${GOLD}15`, border: `1px dashed ${GOLD}` }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: GOLD, letterSpacing: "0.12em" }}>{o.code}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigator.clipboard?.writeText(o.code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                      style={{ background: "none", border: "none", cursor: "pointer", color: GOLD, padding: 2 }}
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); document.getElementById("elite-fleet")?.scrollIntoView({ behavior: "smooth" }); }}
                    style={{
                      width: "100%", padding: "10px",
                      background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
                      color: BG, border: "none", fontSize: 11, fontWeight: 700,
                      cursor: "pointer", fontFamily: body, letterSpacing: "0.08em",
                    }}
                  >
                    {t("اختر سيارتك", "CHOOSE YOUR CAR")}
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => { e.stopPropagation(); setClaimedIdx(i); setCopied(false); }}
                  style={{
                    width: "100%", padding: "11px",
                    background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
                    color: BG, border: "none", fontSize: 11,
                    letterSpacing: "0.1em", fontWeight: 700, cursor: "pointer",
                    fontFamily: body, transition: "all 0.25s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 12px ${GOLD}40`}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = ""}
                >
                  {t("احصل عليه", "CLAIM")}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}