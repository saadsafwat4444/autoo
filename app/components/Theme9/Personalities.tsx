import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts, BG, PAD } from "@/app/themes/theme9/page";
import { pad, TX, TX3, W, BD } from "@/app/themes/theme9/page";
import { Personality, VBG, V, PERSONALITIES } from "@/app/themes/theme9/page";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export default  function Personalities({ onSelect }: { onSelect: (p: Personality) => void }) {
  const { t, isRTL } = useAppContext();
  const { h } = useFonts();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="personalities" style={{ padding: PAD, background: BG }}>
      <div style={pad}>
        <div style={{marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 100, background: VBG, marginBottom: 16 }}>
            <Sparkles size={14} color={V} />
            <span style={{ fontSize: 12, fontWeight: 700, color: V }}>{t("اختر شخصيتك", "Choose Your Personality")}</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 900, color: TX, fontFamily: h, marginBottom: 10 }}>
            {t("أنت من أي نوع؟", "What type are you?")}
          </h2>
          <p style={{ fontSize: 15, color: TX3, maxWidth: 500 }}>
            {t("كل شخصية عندها سيارات مخصصة ليها. اختار اللي يشبهك.", "Each personality has its own curated cars. Pick the one that matches you.")}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          {PERSONALITIES.map(p => {
            const isH = hovered === p.id;
            return (
              <div key={p.id}
                onClick={() => onSelect(p)}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: 24, padding: "28px 20px", textAlign: "center",
                  background: isH ? p.gradient : W,
                  border: `2px solid ${isH ? "transparent" : BD}`,
                  cursor: "pointer", transition: "all 0.35s",
                  transform: isH ? "translateY(-8px) scale(1.02)" : "",
                  boxShadow: isH ? `0 20px 50px ${p.color}25` : "none",
                }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 18, margin: "0 auto 14px",
                  background: isH ? "rgba(255,255,255,0.25)" : `${p.color}12`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: isH ? W : p.color, transition: "all 0.35s",
                }}>{p.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: isH ? W : TX, fontFamily: h, marginBottom: 6, transition: "color 0.3s" }}>
                  {t(p.ar, p.en)}
                </h3>
                <p style={{ fontSize: 12, color: isH ? "rgba(255,255,255,0.8)" : TX3, lineHeight: 1.6, margin: 0, transition: "color 0.3s" }}>
                  {t(p.descAr, p.descEn)}
                </p>
                {/* Speech bubble */}
                <div style={{
                  marginTop: 14, padding: "10px 14px", borderRadius: 14, borderBottomLeftRadius: 4,
                  background: isH ? "rgba(255,255,255,0.2)" : BG,
                  fontSize: 11, fontStyle: "italic",
                  color: isH ? "rgba(255,255,255,0.9)" : TX3, transition: "all 0.3s",
                }}>
                  "{t(p.quoteAr, p.quoteEn)}"
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}