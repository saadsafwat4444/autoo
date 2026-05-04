import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts, BG2, TXT, PAD } from "@/app/themes/theme5/page";
import { TXT3, CARD, BORDER, TXT2 } from "@/app/themes/theme5/page";
import { CYAN, INDIGO_L } from "@/app/themes/theme5/page";
import { Calendar, Zap, Plane, Tag, Clock, CreditCard } from "lucide-react";

export default function Offers({ onBookOffer }: { onBookOffer: (offer: { title: string; discount: string }) => void }) {
  const { t, isRTL } = useAppContext();
  const { heading } = useFonts();

  const offers = [
    { title: { ar: "عرض نهاية الأسبوع", en: "Weekend Deal" }, discount: "25%", desc: { ar: "خصم على كل الحجوزات من الجمعة للأحد", en: "Discount on all Friday–Sunday bookings" }, color: CYAN, icon: <Calendar size={22} />, terms: { ar: "صالح حتى نهاية الشهر · الجمعة-الأحد فقط", en: "Valid until end of month · Fri-Sun only" } },
    { title: { ar: "عرض الصيف", en: "Summer Offer" }, discount: "30%", desc: { ar: "خصم خاص على الإيجارات الطويلة 7 أيام فأكثر", en: "Special discount on rentals 7+ days" }, color: "#F59E0B", icon: <Zap size={22} />, terms: { ar: "الحد الأدنى 7 أيام · كل الفئات", en: "Minimum 7 days · All categories" } },
    { title: { ar: "عرض المطار", en: "Airport Special" }, discount: "20%", desc: { ar: "خصم على استلام وتسليم المطار مع توصيل مجاني", en: "Discount on airport pickup & drop-off with free delivery" }, color: INDIGO_L, icon: <Plane size={22} />, terms: { ar: "مطار القاهرة فقط · توصيل مجاني", en: "Cairo Airport only · Free delivery" } },
  ];

  return (
    <section id="offers" style={{ background: BG2, padding: PAD }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{  marginBottom: 52 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `rgba(6,182,212,0.08)`, border: `1px solid rgba(6,182,212,0.15)`,
            borderRadius: 20, padding: "6px 16px", marginBottom: 14,
          }}>
            <Tag size={14} color={CYAN} />
            <span style={{ fontSize: 13, fontWeight: 600, color: CYAN }}>{t("عروض حصرية", "Exclusive Offers")}</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 8 }}>
            {t("العروض الحالية", "Current Offers")}
          </h2>
          <p style={{ color: TXT3, fontSize: 15 }}>{t("لا تفوّت هذه العروض المحدودة", "Don't miss these limited offers")}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {offers.map((o, i) => (
            <div key={i} style={{
              background: CARD, borderRadius: 22, overflow: "hidden",
              border: `1px solid ${BORDER}`, transition: "all 0.3s",
              position: "relative",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${o.color}40`; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.3)`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
              {/* Discount banner */}
              <div style={{
                background: `linear-gradient(135deg, ${o.color}, ${o.color}CC)`,
                padding: "18px 26px", display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "rgba(255,255,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
                  }}>{o.icon}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{t(o.title.ar, o.title.en)}</div>
                  </div>
                </div>
                <div style={{
                  fontSize: 32, fontWeight: 900, color: "#fff",
                  fontFamily: heading, lineHeight: 1,
                }}>-{o.discount}</div>
              </div>
              {/* Body */}
              <div style={{ padding: "22px 26px 26px" }}>
                <p style={{ margin: "0 0 14px", fontSize: 14, color: TXT2, lineHeight: 1.7 }}>{t(o.desc.ar, o.desc.en)}</p>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8, marginBottom: 20,
                  background: `${o.color}08`, borderRadius: 10, padding: "10px 14px",
                  border: `1px solid ${o.color}15`,
                }}>
                  <Clock size={14} color={o.color} />
                  <span style={{ fontSize: 12, color: TXT3 }}>{t(o.terms.ar, o.terms.en)}</span>
                </div>
                <button onClick={() => onBookOffer({ title: t(o.title.ar, o.title.en), discount: o.discount })} style={{
                  width: "100%", padding: "13px 24px", borderRadius: 12,
                  background: `linear-gradient(135deg, ${o.color}, ${o.color}CC)`,
                  color: "#fff", border: "none", fontWeight: 700, fontSize: 14,
                  cursor: "pointer", fontFamily: heading, transition: "all 0.2s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-1px)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "")}>
                  <CreditCard size={16} />
                  {t("احجز العرض الآن", "Book This Offer")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}