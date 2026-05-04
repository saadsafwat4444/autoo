import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { useFonts, BG, BG2, PAD } from "@/app/themes/theme7/page";
import { pad, TX, TX3, W, BD, TX2 } from "@/app/themes/theme7/page";
import { Zap, Crown, Sparkles, Check } from "lucide-react";
import { useState } from "react";
import BookingModal from "./BookingModel";

export default function Subs() {
  const { t, isRTL } = useAppContext();
  const { h, b } = useFonts();
  const [subModal, setSubModal] = useState<string | null>(null);

  const plans = [
    {
      en: "Basic", ar: "أساسي", icon: <Zap size={20} />, price: "2,500", trips: "8",
      features: [
        { ar: "8 رحلات شهرياً", en: "8 trips/month" },
        { ar: "سيارات اقتصادية", en: "Economy cars" },
        { ar: "تأمين أساسي", en: "Basic insurance" },
        { ar: "دعم عبر الإيميل", en: "Email support" },
      ],
    },
    {
      en: "Premium", ar: "بريميوم", icon: <Crown size={20} />, price: "5,000", trips: "15", popular: true,
      features: [
        { ar: "15 رحلة شهرياً", en: "15 trips/month" },
        { ar: "سيارات فاخرة + اقتصادية", en: "Luxury + Economy" },
        { ar: "تأمين شامل", en: "Full insurance" },
        { ar: "دعم 24/7", en: "24/7 support" },
      ],
    },
    {
      en: "VIP", ar: "VIP", icon: <Sparkles size={20} />, price: "9,500", trips: "∞",
      features: [
        { ar: "رحلات غير محدودة", en: "Unlimited trips" },
        { ar: "جميع فئات السيارات", en: "All car categories" },
        { ar: "تأمين VIP + خدمة طريق", en: "VIP insurance + roadside" },
        { ar: "سائق عند الطلب", en: "On-demand driver" },
      ],
    },
  ];

  return (
    <section id="plans" style={{ padding: PAD, background: BG }}>
      <div style={pad}>
        <div style={{  marginBottom: 40 }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 900, color: TX, fontFamily: h, marginBottom: 6 }}>{t("الباقات الشهرية", "Monthly Plans")}</h2>
          <p style={{ fontSize: 13, color: TX3 }}>{t("اختر الباقة المناسبة لاحتياجاتك", "Choose the plan that fits your needs")}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {plans.map((p, i) => (
            <div key={i} style={{
              background: W, borderRadius: 20, padding: "28px 24px",
              border: p.popular ? `2px solid ${TX}` : `1px solid ${BD}`,
              position: "relative", transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>

              {p.popular && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: TX, color: "#fff", padding: "4px 18px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                  {t("الأكثر طلباً", "POPULAR")}
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: BG2, color: TX2, display: "flex", alignItems: "center", justifyContent: "center" }}>{p.icon}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: TX, fontFamily: h }}>{p.en}</div>
                  <div style={{ fontSize: 11, color: TX3 }}>{p.trips} {t("رحلة/شهر", "trips/mo")}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 20 }}>
                <span style={{ fontSize: 30, fontWeight: 900, color: TX, fontFamily: h }}>{p.price}</span>
                <span style={{ fontSize: 12, color: TX3 }}>{t("ج.م/شهر", "EGP/mo")}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {p.features.map((f, fi) => (
                  <div key={fi} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Check size={14} color={TX3} />
                    <span style={{ fontSize: 12, color: TX2 }}>{t(f.ar, f.en)}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => setSubModal(p.en)} style={{
                width: "100%", padding: "12px", borderRadius: 12,
                background: p.popular ? TX : "transparent",
                color: p.popular ? "#fff" : TX,
                border: p.popular ? "none" : `1.5px solid ${BD}`,
                fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: h,
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { if (!p.popular) { e.currentTarget.style.background = BG2; } }}
                onMouseLeave={e => { if (!p.popular) { e.currentTarget.style.background = "transparent"; } }}>
                {t("اشترك الآن", "Subscribe Now")}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Booking Modal */}
      {subModal && <BookingModal car={cars[0]} onClose={() => setSubModal(null)} isRTL={isRTL} t={t} h={h} b={b} mode="sub" planName={subModal} />}
    </section>
  );
}
