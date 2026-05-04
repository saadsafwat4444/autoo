import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { useFonts, BG, PAD } from "@/app/themes/theme9/page";
import { pad, TX, W } from "@/app/themes/theme9/page";
import { PERSONALITIES, VBG, V } from "@/app/themes/theme9/page";
import { ArrowLeft, ArrowRight, Gift } from "lucide-react";

export default function Offers({ onBook }: { onBook: (car: typeof cars[0]) => void }) {
  const { t, isRTL } = useAppContext();
  const { h } = useFonts();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const offers = [
    { personality: PERSONALITIES[0], discount: "30%", ar: "خصم للمغامرين", en: "Adventurer Discount", descAr: "على السيارات الرياضية لمدة 3 أيام أو أكثر", descEn: "On sports cars for 3+ days rental", carId: 4 },
    { personality: PERSONALITIES[1], discount: "25%", ar: "عرض رجال الأعمال", en: "Business Deal", descAr: "على السيارات الفاخرة مع توصيل مجاني", descEn: "On luxury cars with free delivery", carId: 2 },
    { personality: PERSONALITIES[2], discount: "20%", ar: "عرض العائلة", en: "Family Offer", descAr: "على SUV لمدة أسبوع مع كرسي أطفال مجاني", descEn: "On SUVs for a week with free child seat", carId: 3 },
  ];

  return (
    <section id="offers" style={{ padding: PAD, background: BG }}>
      <div style={pad}>
        <div style={{ marginBottom: 44 }}>
          <div style={{ display: "inline-flex", gap: 8, padding: "8px 18px", borderRadius: 100, background: VBG, marginBottom: 14 }}>
            <Gift size={14} color={V} />
            <span style={{ fontSize: 12, fontWeight: 700, color: V }}>{t("عروض مميزة", "Special Offers")}</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: TX, fontFamily: h }}>
            {t("عروض مميزة حسب شخصيتك", "Offers Matched to Your Personality")}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {offers.map((offer, i) => (
            <div key={i} style={{
              borderRadius: 24, overflow: "hidden", position: "relative",
              background: offer.personality.gradient, padding: "32px 28px",
              color: W, transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
              {/* Discount badge */}
              <div style={{
                position: "absolute", top: 20, [isRTL ? "left" : "right"]: 20,
                width: 60, height: 60, borderRadius: "50%",
                background: "rgba(255,255,255,0.25)", backdropFilter: "blur(4px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 900, fontFamily: h,
              }}>
                {offer.discount}
              </div>

              <div style={{ width: 48, height: 48, borderRadius: 16, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                {offer.personality.icon}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 900, fontFamily: h, marginBottom: 6 }}>{t(offer.ar, offer.en)}</h3>
              <p style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.7, marginBottom: 24 }}>{t(offer.descAr, offer.descEn)}</p>
              <button onClick={() => { const c = cars.find(x => x.id === offer.carId); if (c) onBook(c); }} style={{
                padding: "12px 24px", borderRadius: 14, background: "rgba(255,255,255,0.25)",
                border: "1px solid rgba(255,255,255,0.3)", color: W,
                fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: h,
                display: "flex", alignItems: "center", gap: 6, backdropFilter: "blur(4px)",
              }}>
                {t("احجز العرض", "Book Offer")} <Arrow size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
