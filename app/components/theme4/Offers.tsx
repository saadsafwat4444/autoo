import { useAppContext } from "@/app/contexts/AppContext";
import { PAD, TXT, useFonts } from "@/app/themes/theme4/page";
import { BG, BLUE, BORDER, TXT3 } from "@/app/themes/theme4/page";
import { ArrowRight } from "lucide-react";

export default function Offers() {
  const { t } = useAppContext();
  const { heading, body } = useFonts();

  const offers = [
    { ar: "عرض نهاية الأسبوع", en: "Weekend Offer", discount: 25, desc: { ar: "خصم 25% على جميع السيارات", en: "25% off all cars" }, color: "#7C3AED" },
    { ar: "عرض الصيف", en: "Summer Offer", discount: 30, desc: { ar: "خصم 30% على السيارات الاقتصادية", en: "30% off economy cars" }, color: "#059669" },
    { ar: "عميل جديد", en: "New Customer", discount: 20, desc: { ar: "خصم 20% لأول حجز", en: "20% off first booking" }, color: BLUE },
  ];

  return (
    <section style={{ background: BG, padding: PAD }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <div style={{  marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 8 }}>
            {t("العروض الحالية", "Current Offers")}
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {offers.map((o, i) => (
            <div key={i} style={{
              background: BG, borderRadius: 16, border: `1px solid ${BORDER}`,
              overflow: "hidden", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = ""; }}>
              <div style={{ padding: "28px 24px 20px", background: `${o.color}08` }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, background: `${o.color}15`,
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
                }}>
                  <span style={{ fontSize: 22, fontWeight: 900, color: o.color, fontFamily: heading }}>{o.discount}%</span>
                </div>
                <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700, color: TXT, fontFamily: heading }}>{t(o.ar, o.en)}</h3>
                <p style={{ margin: 0, fontSize: 14, color: TXT3, fontFamily: body }}>{t(o.desc.ar, o.desc.en)}</p>
              </div>
              <div style={{ padding: "16px 24px 20px" }}>
                <button onClick={() => document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" })} style={{
                  width: "100%", padding: "11px", borderRadius: 10, background: BLUE, color: "#fff",
                  border: "none", fontWeight: 600, cursor: "pointer", fontFamily: heading, fontSize: 14,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                  {t("احجز الآن", "Book Now")}
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}