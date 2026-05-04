import { useAppContext } from "@/app/contexts/AppContext";
import { BD, BG2, P, PAD, pad, TX, TX3, useFonts, W } from "@/app/themes/theme7/page";
import { Tag, Percent } from "lucide-react";

export default function Offers() {
  const { t } = useAppContext();
  const { h } = useFonts();

  const offers = [
    { ar: "خصم نهاية الأسبوع", en: "Weekend Discount", disc: "25%", code: "WKND25" },
    { ar: "جولة ليلية", en: "Night Ride", disc: "20%", code: "NITE20" },
    { ar: "رحلة عمل", en: "Business Trip", disc: "15%", code: "BIZ15" },
  ];

  return (
    <section id="offers" style={{ padding: PAD, background: BG2 }}>
      <div style={pad}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: TX, fontFamily: h, display: "flex", alignItems: "center", gap: 8 }}>
            <Tag size={18} color={P} />{t("عروض حالية", "Current Offers")}
          </h3>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {offers.map((o, i) => (
            <div key={i} style={{
              flex: 1, display: "flex", alignItems: "center", gap: 16,
              background: W, borderRadius: 16, padding: "18px 20px",
              border: `1px solid ${BD}`, transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${P}30`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BD; }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${P}06`, color: P, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Percent size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: TX, fontFamily: h }}>{t(o.ar, o.en)}</div>
                <div style={{ fontSize: 12, color: TX3 }}>{t("كود الخصم:", "Promo code:")} <span style={{ fontWeight: 700, color: P, fontFamily: "monospace", letterSpacing: "0.05em" }}>{o.code}</span></div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: TX, fontFamily: h, flexShrink: 0 }}>
                {o.disc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
