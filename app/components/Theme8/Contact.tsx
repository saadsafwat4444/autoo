import { useAppContext } from "@/app/contexts/AppContext";
import { PAD } from "@/app/themes/theme7/page";
import { useFonts, BG2 } from "@/app/themes/theme8/page";
import { INP, pad, W, BD, GRN, TX, TX3, TX2 } from "@/app/themes/theme8/page";
import { O, OD, SITUATIONS, OBG } from "@/app/themes/theme8/page";
import { Check, Send, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const { t, isRTL } = useAppContext();
  const { h, b } = useFonts();
  const [sent, setSent] = useState(false);
  const inp = INP(b);

  return (
    <section id="contact" style={{ padding: PAD, background: BG2 }}>
      <div style={pad}>
        <div style={{
          display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 0,
          background: W, borderRadius: 24, overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.04)", border: `1px solid ${BD}`,
        }}>
          {/* Left: Form */}
          <div style={{ padding: "44px 36px" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "50px 0", animation: "t8pop 0.3s" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 20px", background: `${GRN}10`, display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={36} color={GRN} /></div>
                <h4 style={{ fontSize: 20, fontWeight: 900, color: TX, fontFamily: h, marginBottom: 6 }}>{t("تم إرسال رسالتك بنجاح", "Message Sent Successfully")}</h4>
                <p style={{ fontSize: 13, color: TX3, marginBottom: 24, lineHeight: 1.7 }}>{t("سيقوم فريقنا بالتواصل معك ومساعدتك في اختيار السيارة المناسبة", "Our team will contact you and help you choose the right car")}</p>
                <button onClick={() => setSent(false)} style={{ padding: "13px 32px", borderRadius: 12, background: O, color: "#fff", border: "none", fontWeight: 700, cursor: "pointer", fontFamily: h, transition: "background 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = OD; }}
                  onMouseLeave={e => { e.currentTarget.style.background = O; }}>
                  {t("العودة للرئيسية", "Back to Home")}
                </button>
              </div>
            ) : (
              <>
                <h4 style={{ fontSize: 22, fontWeight: 900, color: TX, fontFamily: h, marginBottom: 6 }}>{t("هل تحتاج مساعدة في اختيار السيارة؟", "Need Help Choosing a Car?")}</h4>
                <p style={{ fontSize: 13, color: TX3, marginBottom: 28, lineHeight: 1.7 }}>{t("أرسل لن�� وسنختار لك السيارة الأنسب لموقفك", "Send us a message and we'll find the best car for your situation")}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("الاسم", "Name")}</label><input style={inp} placeholder={t("محمد", "Mohammed")} /></div>
                  <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("الهاتف", "Phone")}</label><input type="tel" style={inp} placeholder="+20 1XX" /></div>
                </div>
                <div style={{ marginBottom: 12 }}><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("الإيميل", "Email")}</label><input type="email" style={inp} placeholder="you@email.com" /></div>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("موقفك", "Your Situation")}</label>
                  <select style={{ ...inp, appearance: "none" as const }}>
                    <option>{t("اختر موقفك...", "Choose your situation...")}</option>
                    {SITUATIONS.map(s => <option key={s.id}>{t(s.ar, s.en)}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("الرسالة", "Message")}</label>
                  <textarea rows={4} style={{ ...inp, resize: "none" as const }} placeholder={t("اكتب رسالتك...", "Write your message...")} />
                </div>
                <button onClick={() => setSent(true)} style={{
                  width: "100%", padding: "16px", borderRadius: 12,
                  background: O, color: "#fff", border: "none",
                  fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: h,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = OD; }}
                  onMouseLeave={e => { e.currentTarget.style.background = O; }}>
                  <Send size={17} /> {t("إرسال الرسالة", "Send Message")}
                </button>
              </>
            )}
          </div>

          {/* Right: Chat-style helper */}
          <div style={{ padding: "44px 36px", background: `linear-gradient(180deg, ${OBG}, ${W})`, display: "flex", flexDirection: "column" }}>
            {/* Header with circle icon */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: O, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MessageCircle size={24} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: TX, fontFamily: h }}>{t("نحن هنا نساعدك", "We're Here to Help")}</div>
                <div style={{ fontSize: 12, color: GRN, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: GRN }} />
                  {t("متصل الآن", "Online Now")}
                </div>
              </div>
            </div>

            {/* Chat bubbles */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
              <div style={{
                background: "#F3F4F6", borderRadius: "18px 18px 18px 6px",
                padding: "15px 20px", maxWidth: "92%",
                fontSize: 14, color: TX, lineHeight: 1.75,
              }}>
                {t("هل تحتاج مساعدة في اختيار السيارة المناسبة لموقفك؟", "Need help choosing the right car for your situation?")}
              </div>
              <div style={{
                background: "#F3F4F6", borderRadius: "18px 18px 18px 6px",
                padding: "15px 20px", maxWidth: "80%",
                fontSize: 14, color: TX, lineHeight: 1.75,
              }}>
                {t("أرسل لنا رسالة وسنساعدك فوراً", "Send us a message and we'll help right away")}
              </div>
            </div>

            {/* Contact info at bottom */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: <Phone size={16} />, val: "+20 100 000 0000" },
                { icon: <Mail size={16} />, val: "help@solveit.eg" },
                { icon: <MapPin size={16} />, val: t("القاهرة، مصر", "Cairo, Egypt") },
              ].map((c, ci) => (
                <div key={ci} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: TX2 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: OBG, color: O, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.icon}</div>
                  <span style={{ fontWeight: 600 }}>{c.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
