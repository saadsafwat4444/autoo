import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts, BG2, TXT, PAD } from "@/app/themes/theme6/page";
import { GREEN, TXT2, IMG, TXT3, BORDER } from "@/app/themes/theme6/page";
import { sectionPad, CARD_BG } from "@/app/themes/theme6/page";
import { Award, Users, Car, Headphones, Target, Shield, Settings, Phone, Info, BadgeCheck } from "lucide-react";

export default function AboutUs() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();

  const stats = [
    { val: "10+", ar: "سنوات خبرة", en: "Years Experience", icon: <Award size={22} /> },
    { val: "50K+", ar: "عميل سعيد", en: "Happy Clients", icon: <Users size={22} /> },
    { val: "200+", ar: "سيارة في الأسطول", en: "Cars in Fleet", icon: <Car size={22} /> },
    { val: "24/7", ar: "دعم فني متواصل", en: "Support Available", icon: <Headphones size={22} /> },
  ];

  const values = [
    { ar: "الشفافية في التسعير", en: "Transparent Pricing", desc: { ar: "لا رسوم خفية — السعر اللي تشوفه هو اللي تدفعه", en: "No hidden fees — the price you see is what you pay" }, icon: <Target size={20} /> },
    { ar: "تأمين شامل", en: "Full Insurance", desc: { ar: "جميع سياراتنا مؤمنة تأمين شامل لراحة بالك", en: "All cars fully insured for your peace of mind" }, icon: <Shield size={20} /> },
    { ar: "صيانة دورية", en: "Regular Maintenance", desc: { ar: "فحص شامل قبل كل رحلة لضمان سلامتك", en: "Full inspection before every trip for your safety" }, icon: <Settings size={20} /> },
    { ar: "مساعدة على الطريق", en: "Roadside Assistance", desc: { ar: "فريق إنقاذ متاح 24/7 في أي مكان في مصر", en: "Rescue team available 24/7 anywhere in Egypt" }, icon: <Phone size={20} /> },
  ];

  return (
    <section id="about" style={{ background: BG2, padding:PAD }}>
      <div style={sectionPad}>
        {/* Header */}
        <div style={{  marginBottom: 60 }}>
          <span style={{
            display: "inline-flex",gap: 8,
            fontSize: 13, fontWeight: 700, color: GREEN,
            background: `${GREEN}10`, padding: "6px 18px", borderRadius: 20,
            marginBottom: 14,
          }}>
            <Info size={14} />
            {t("من نحن", "About Us")}
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.6rem)", fontWeight: 900, color: TXT, fontFamily: heading, marginBottom: 14 }}>
            {t("شريكك الموثوق في كل رحلة", "Your Trusted Partner for Every Journey")}
          </h2>
          <p style={{ fontSize: 16, color: TXT2, lineHeight: 1.8}}>
            {t(
              "منذ أكثر من 10 سنوات، نساعد المسافرين في مصر على اكتشاف أجمل الوجهات بأفضل السيارات وأسهل تجربة حجز ممكنة.",
              "For over 10 years, we've been helping travelers in Egypt discover the most beautiful destinations with the best cars and simplest booking experience."
            )}
          </p>
        </div>

        {/* Two-column: Image + Values */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 60, alignItems: "center" }}>
          {/* Image side */}
          <div style={{ position: "relative", borderRadius: 24, overflow: "hidden" }}>
            <img src={IMG.team} alt="" style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: 24 }} />
            <div style={{
              position: "absolute", bottom: 20, left: 20, right: 20,
              background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
              borderRadius: 16, padding: "18px 24px",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BadgeCheck size={24} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: TXT, fontFamily: heading }}>{t("شركة مرخصة ومعتمدة", "Licensed & Certified")}</div>
                <div style={{ fontSize: 13, color: TXT3 }}>{t("معتمدة من هيئة السياحة المصرية", "Certified by Egyptian Tourism Authority")}</div>
              </div>
            </div>
          </div>

          {/* Values grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {values.map((v, i) => (
              <div key={i} style={{
                background: CARD_BG, borderRadius: 20, padding: "24px 20px",
                border: `1px solid ${BORDER}`, transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: `${GREEN}10`, color: GREEN,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 14,
                }}>{v.icon}</div>
                <h4 style={{ fontSize: 15, fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 6 }}>
                  {t(v.ar, v.en)}
                </h4>
                <p style={{ fontSize: 13, color: TXT3, lineHeight: 1.6 }}>{t(v.desc.ar, v.desc.en)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20,
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              textAlign: "center", padding: "28px 16px", borderRadius: 20,
              background: CARD_BG, border: `1px solid ${BORDER}`,
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 16, margin: "0 auto 14px",
                background: `${GREEN}10`, color: GREEN,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: GREEN, fontFamily: heading }}>{s.val}</div>
              <div style={{ fontSize: 13, color: TXT3, marginTop: 4 }}>{t(s.ar, s.en)}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}