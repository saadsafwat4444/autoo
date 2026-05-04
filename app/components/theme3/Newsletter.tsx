import { useAppContext } from "@/app/contexts/AppContext";
import { BG, BG3, TXT, useFonts } from "@/app/themes/theme2/page";
import { TXT_MUTED, RED, PAD } from "@/app/themes/theme3/page";

export default function Newsletter() {
  const { t } = useAppContext();
  const { heading, body } = useFonts();

  return (
    <section style={{ background: BG3, padding: PAD, borderTop: `1px solid ${TXT}08`, borderBottom: `1px solid ${TXT}08` }}>
      <div style={{ maxWidth: 640, padding: "0 48px" }}>
        <h2 style={{ fontSize: "clamp(1.4rem,3vw,1.8rem)", fontWeight: 900, color: TXT, fontFamily: heading, marginBottom: 8 }}>{t("ابقَ على اطلاع", "STAY IN THE LOOP")}</h2>
        <p style={{ color: TXT_MUTED, fontSize: 14, marginBottom: 24, fontFamily: body }}>{t("اشترك واحصل على آخر عروض السيارات الرياضية", "Subscribe for the latest sports car deals")}</p>
        <div style={{ display: "flex", gap: 0 }}>
          <input placeholder={t("بريدك الإلكتروني", "Your email address")} style={{
            flex: 1, padding: "14px 18px", background: BG,
            borderTop: `1px solid ${TXT}15`, borderBottom: `1px solid ${TXT}15`,
            borderLeft: `1px solid ${TXT}15`, borderRight: "none",
            borderRadius: "4px 0 0 4px", fontSize: 14, outline: "none", fontFamily: body, color: TXT,
          }}
            onFocus={e => { e.currentTarget.style.borderTopColor = RED; e.currentTarget.style.borderBottomColor = RED; e.currentTarget.style.borderLeftColor = RED; }}
            onBlur={e => { e.currentTarget.style.borderTopColor = `${TXT}15`; e.currentTarget.style.borderBottomColor = `${TXT}15`; e.currentTarget.style.borderLeftColor = `${TXT}15`; }} />
          <button style={{
            padding: "14px 28px", background: RED, color: "#fff", border: "none",
            fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: heading,
            letterSpacing: "0.1em", borderRadius: "0 4px 4px 0",
          }}>{t("اشترك", "SUBSCRIBE")}</button>
        </div>
      </div>
    </section>
  );
}