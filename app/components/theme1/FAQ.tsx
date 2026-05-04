"use client"

import { useAppContext } from "@/app/contexts/AppContext";
import { faqs } from "@/app/data/carDate";
import { DARK, MID_GRAY, OFF_WHITE, PAD } from "@/app/themes/theme1/page";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const { t, lang, accent } = useAppContext();
  const ff   = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isAr = lang === "ar";
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ background: "#fff", fontFamily: ff, direction: isAr ? "rtl" : "ltr", padding: PAD}}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{  marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 24, height: 2, background: accent, borderRadius: 2 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              {t("الأسئلة الشائعة", "FAQ")}
            </span>
            <div style={{ width: 24, height: 2, background: accent, borderRadius: 2 }} />
          </div>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, color: DARK, letterSpacing: "-0.04em", margin: 0 }}>
            {t("أسئلة وأجوبة", "Questions & Answers")}
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faqs.map((faq: any, i: number) => (
            <div
              key={i}
              style={{ background: OFF_WHITE, borderRadius: 14, border: `1.5px solid ${open === i ? accent + "35" : "rgba(0,0,0,0.06)"}`, overflow: "hidden", transition: "border-color 0.2s, box-shadow 0.2s", boxShadow: open === i ? `0 4px 20px ${accent}10` : "none" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", fontFamily: ff, textAlign: isAr ? "right" : "left" }}
              >
                <span style={{ fontSize: 15, fontWeight: 700, color: open === i ? accent : DARK, transition: "color 0.2s" }}>
                  {t(faq.q.ar, faq.q.en)}
                </span>
                {open === i
                  ? <ChevronUp size={18} color={accent} style={{ flexShrink: 0 }} />
                  : <ChevronDown size={18} color={MID_GRAY} style={{ flexShrink: 0 }} />
                }
              </button>
              {open === i && (
                <div style={{ padding: "0 24px 20px" }}>
                  <p style={{ margin: 0, fontSize: 14, color: "#6B7280", lineHeight: 1.75 }}>
                    {t(faq.a.ar, faq.a.en)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
