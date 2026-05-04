import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { PAD } from "@/app/themes/theme7/page";
import { useFonts, BG } from "@/app/themes/theme8/page";
import { GRN, DK, pad, TX, W, BD, TX3 } from "@/app/themes/theme8/page";
import { O, T8BookingModal } from "@/app/themes/theme8/page";
import { ArrowLeft, ArrowRight, Calendar, Heart, Briefcase, Gift, BadgeCheck } from "lucide-react";
import { useState } from "react";

export default function Offers() {
  const { t, isRTL } = useAppContext();
  const { h, b } = useFonts();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [bookingCar, setBookingCar] = useState<number | null>(null);
  const bookCar = bookingCar !== null ? cars.find(c => c.id === bookingCar) || null : null;

  const offers = [
    { ar: "عرض نهاية الأسبوع", en: "Weekend Deal", disc: "25%", carId: 1, desc: { ar: "خصم على جميع السيارات — الجمعة والسبت", en: "Discount on all cars — Friday & Saturday" }, icon: <Calendar size={22} />, color: "#8B5CF6", bg: "linear-gradient(135deg, #8B5CF620, #8B5CF605)" },
    { ar: "عرض العائلة", en: "Family Package", disc: "20%", carId: 3, desc: { ar: "خصم على سيارات SUV الواسعة", en: "Discount on spacious SUV cars" }, icon: <Heart size={22} />, color: GRN, bg: `linear-gradient(135deg, ${GRN}20, ${GRN}05)` },
    { ar: "عرض رجال الأعمال", en: "Business Class", disc: "15%", carId: 2, desc: { ar: "خصم على السيارات الفاخرة لاجتماعاتك", en: "Discount on luxury cars for meetings" }, icon: <Briefcase size={22} />, color: DK, bg: `linear-gradient(135deg, ${DK}15, ${DK}03)` },
  ];

  return (
    <section id="offers" style={{ padding: PAD, background: BG }}>
      <div style={pad}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, color: O, marginBottom: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <Gift size={15} /> {t("عروض حصرية", "Exclusive Offers")}
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: TX, fontFamily: h }}>{t("حلول بأسعار أفضل", "Solutions at Better Prices")}</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {offers.map((o, i) => {
            const offerCar = cars.find(c => c.id === o.carId);
            return (
              <div key={i} style={{
                borderRadius: 22, overflow: "hidden", background: W,
                border: `1.5px solid ${BD}`, transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 14px 44px ${o.color}12`; e.currentTarget.style.borderColor = `${o.color}30`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = BD; }}>
                {/* Offer car image */}
                {offerCar && (
                  <div style={{ position: "relative", height: 150 }}>
                    <img src={offerCar.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${o.color}10 0%, ${o.color}60 100%)` }} />
                    {/* Discount badge */}
                    <div style={{
                      position: "absolute", top: 12, [isRTL ? "left" : "right"]: 12,
                      background: "#fff", borderRadius: 12, padding: "6px 14px",
                      display: "flex", alignItems: "center", gap: 4,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}>
                      <span style={{ fontSize: 18, fontWeight: 900, color: o.color, fontFamily: h }}>{o.disc}</span>
                      <span style={{ fontSize: 10, color: TX3, fontWeight: 700 }}>{t("خصم", "OFF")}</span>
                    </div>
                    <div style={{ position: "absolute", bottom: 12, left: 16, right: 16, display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.2)", backdropFilter: "blur(6px)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{o.icon}</div>
                      <span style={{ fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: h }}>{t(o.ar, o.en)}</span>
                    </div>
                  </div>
                )}
                <div style={{ padding: "20px 22px 22px" }}>
                  <p style={{ fontSize: 13, color: TX3, lineHeight: 1.7, marginBottom: 18, minHeight: 40 }}>{t(o.desc.ar, o.desc.en)}</p>
                  {/* Car info row */}
                  {offerCar && (
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, padding: "10px 14px", background: BG, borderRadius: 12, border: `1px solid ${BD}` }}>
                      <img src={offerCar.image} alt="" style={{ width: 48, height: 36, objectFit: "cover", borderRadius: 8 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: TX }}>{t(offerCar.name.ar, offerCar.name.en)}</div>
                        <div style={{ fontSize: 11, color: TX3 }}>{offerCar.pricePerDay} {t("ج.م/يوم", "EGP/day")}</div>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: GRN, display: "flex", alignItems: "center", gap: 3 }}><BadgeCheck size={13} /> {t("متاح", "Available")}</div>
                    </div>
                  )}
                  <button onClick={() => setBookingCar(o.carId)} style={{
                    width: "100%", padding: "13px", borderRadius: 12,
                    background: o.color, color: "#fff", border: "none",
                    fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: h,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    transition: "opacity 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
                    {t("احجز العرض الآن", "Book This Offer")} <Arrow size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {bookCar && <T8BookingModal car={bookCar} onClose={() => setBookingCar(null)} isRTL={isRTL} t={t} h={h} b={b} />}
    </section>
  );
}