import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts, BG2, BG3, TXT, PAD } from "@/app/themes/theme3/page";
import { RED, SpeedLines, TXT_MUTED } from "@/app/themes/theme3/page";
import { Shield, Zap } from "lucide-react";

export function Trust() {
  const { t } = useAppContext();
  const { heading, body } = useFonts();
  const items = [
    { icon: <Shield size={28} />, ar: "سيارات رياضية أصلية", en: "Authentic Sports Cars", desc: { ar: "كل سياراتنا أصلية 100% مع صيانة دورية", en: "All our cars are 100% authentic with regular maintenance" } },
    { icon: <Zap size={28} />, ar: "حجز سريع خلال دقائق", en: "Book in Minutes", desc: { ar: "احجز سيارتك المفضلة في أقل من 3 دقائق", en: "Book your dream car in less than 3 minutes" } },
    { icon: <Shield size={28} />, ar: "تأمين شامل ضد كل المخاطر", en: "Full Risk Coverage", desc: { ar: "استمتع بالقيادة بدون قلق مع تأمين شامل", en: "Drive worry-free with comprehensive insurance" } },
  ];

  return (
    <section style={{ background: BG2, padding: PAD, position: "relative" }}>
      <SpeedLines side="right" />
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            background: BG3, borderRadius: 4, padding: "32px 28px",
            borderTop: `3px solid ${RED}`, position: "relative", overflow: "hidden",
            transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${RED}15`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ color: RED, marginBottom: 16 }}>{item.icon}</div>
            <h3 style={{ color: TXT, fontSize: 16, fontWeight: 700, marginBottom: 8, fontFamily: heading }}>{t(item.ar, item.en)}</h3>
            <p style={{ color: TXT_MUTED, fontSize: 14, lineHeight: 1.7, margin: 0, fontFamily: body }}>{t(item.desc.ar, item.desc.en)}</p>
            {/* Corner accent */}
            <div style={{ position: "absolute", top: 0, right: 0, width: 40, height: 40, background: `${RED}08`, clipPath: "polygon(100% 0, 100% 100%, 0 0)" }} />
          </div>
        ))}
      </div>
    </section>
  );
}