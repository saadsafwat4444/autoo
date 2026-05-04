import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts, TXT, BG, PAD } from "@/app/themes/theme6/page";
import { BORDER, IMG, GREEN, TXT3, TXT2 } from "@/app/themes/theme6/page";
import { CARD_BG, sectionPad } from "@/app/themes/theme6/page";
import { Phone, Mail, MapPin, Check, Send } from "lucide-react";
import { useState, CSSProperties } from "react";

export default function Contact() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [sent, setSent] = useState(false);

  const inputStyle: CSSProperties = {
    width: "100%", padding: "14px 16px", borderRadius: 14,
    border: `1.5px solid ${BORDER}`, fontSize: 14, outline: "none",
    boxSizing: "border-box", fontFamily: body, color: TXT,
    background: CARD_BG, transition: "all 0.2s",
  };

  return (
    <section id="contact" style={{ background: BG, padding: PAD }}>
      <div style={sectionPad}>
        <div style={{
          background: CARD_BG, borderRadius: 32, overflow: "hidden",
          border: `1px solid ${BORDER}`, boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
          display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 500,
        }}>
          {/* Left: Image + Info */}
          <div style={{ position: "relative" }}>
            <img src={IMG.suv} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(21,128,61,0.3) 0%, rgba(21,128,61,0.7) 100%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 40 }}>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: "#fff", fontFamily: heading, marginBottom: 12 }}>
                {t("خلّينا نساعدك تخطط لرحلتك", "Let Us Help Plan Your Trip")}
              </h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: 28 }}>
                {t("فريقنا متخصص في تنظيم أفضل رحلات السيارات في مصر", "Our team specializes in organizing the best road trips in Egypt")}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { icon: <Phone size={18} />, val: "+20 100 000 0000" },
                  { icon: <Mail size={18} />, val: "trips@roadtrip.eg" },
                  { icon: <MapPin size={18} />, val: t("التجمع الخامس، القاهرة", "5th Settlement, Cairo") },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, color: "#fff" }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 12,
                      background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>{c.icon}</div>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{c.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {sent ? (
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%", margin: "0 auto 24px",
                  background: `${GREEN}12`, border: `2px solid ${GREEN}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Check size={40} color={GREEN} />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 8 }}>
                  {t("تم إرسال رسالتك!", "Message Sent!")}
                </h3>
                <p style={{ color: TXT3, fontSize: 14, marginBottom: 6, lineHeight: 1.7 }}>
                  {t("سيساعدك فريقنا في التخطيط لرحلتك", "Our team will help you plan your trip")}
                </p>
                <p style={{ color: TXT3, fontSize: 13, marginBottom: 28 }}>
                  {t("رحلة سعيدة!", "Happy travels!")}
                </p>
                <button onClick={() => setSent(false)} style={{
                  padding: "12px 32px", borderRadius: 14, background: GREEN,
                  color: "#fff", border: "none", fontWeight: 700, cursor: "pointer", fontFamily: heading,
                }}>
                  {t("رسالة جديدة", "New Message")}
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 6 }}>
                  {t("هل تحتاج مساعدة في التخطيط لرحلتك؟", "Need Help Planning Your Trip?")}
                </h3>
                <p style={{ fontSize: 14, color: TXT3, marginBottom: 28, lineHeight: 1.7 }}>
                  {t("أرسل لنا تفاصيل رحلتك وسنقترح لك أفضل خطة", "Send us your trip details and we'll suggest the best plan")}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 13, color: TXT2, fontWeight: 600, marginBottom: 7 }}>{t("الاسم", "Name")}</label>
                    <input placeholder={t("اسمك", "Your name")} style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor = GREEN; }}
                      onBlur={e => { e.currentTarget.style.borderColor = BORDER; }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 13, color: TXT2, fontWeight: 600, marginBottom: 7 }}>{t("البريد", "Email")}</label>
                    <input placeholder="you@email.com" style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor = GREEN; }}
                      onBlur={e => { e.currentTarget.style.borderColor = BORDER; }} />
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 13, color: TXT2, fontWeight: 600, marginBottom: 7 }}>{t("الهاتف", "Phone")}</label>
                  <input placeholder={t("رقم هاتفك", "Your phone")} style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = GREEN; }}
                    onBlur={e => { e.currentTarget.style.borderColor = BORDER; }} />
                </div>
                <div style={{ marginBottom: 22 }}>
                  <label style={{ display: "block", fontSize: 13, color: TXT2, fontWeight: 600, marginBottom: 7 }}>{t("أخبرنا عن رحلتك", "Tell Us About Your Trip")}</label>
                  <textarea rows={4} placeholder={t("الوجهة، عدد الأيام، عدد الأشخاص...", "Destination, days, number of people...")}
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={e => { e.currentTarget.style.borderColor = GREEN; }}
                    onBlur={e => { e.currentTarget.style.borderColor = BORDER; }} />
                </div>
                <button onClick={() => setSent(true)} style={{
                  width: "100%", padding: "15px", borderRadius: 14,
                  background: GREEN, color: "#fff", border: "none",
                  fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: heading,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  boxShadow: "0 8px 30px rgba(21,128,61,0.25)", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#166534"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = GREEN; e.currentTarget.style.transform = ""; }}>
                  <Send size={17} />
                  {t("إرسال الرسالة", "Send Message")}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}