import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts, BG2, PAD } from "@/app/themes/theme7/page";
import { INP, P, pad, BD, DK2, PD, PL, W, TX, TX3, TX2 } from "@/app/themes/theme7/page";
import { Headphones, Phone, Mail, MapPin, Check, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const { t, isRTL } = useAppContext();
  const { h, b } = useFonts();
  const [sent, setSent] = useState(false);
  const inp = INP(b);
  return (
    <section id="contact" style={{ padding: PAD, background: `linear-gradient(135deg, ${BG2} 0%, #EDE9FE 50%, ${BG2} 100%)`, position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `radial-gradient(${P} 1.5px, transparent 1.5px)`, backgroundSize: "24px 24px" }} />
      <div style={{ ...pad, position: "relative" }}>
        <div style={{ display: "flex", borderRadius: 32, overflow: "hidden", boxShadow: "0 24px 80px rgba(124,58,237,0.1)", border: `1px solid ${BD}` }}>
          <div style={{ width: 340, flexShrink: 0, background: `linear-gradient(180deg, ${DK2} 0%, ${PD} 100%)`, padding: "48px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}><Headphones size={20} color="#fff" /></div>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: h }}>{t("تواصل معنا", "Get in Touch")}</span>
              </div>
              <h3 style={{ fontSize: 28, fontWeight: 900, color: "#fff", fontFamily: h, lineHeight: 1.3, marginBottom: 16 }}>{t("نحن هنا لمساعدتك", "We're Here to Help")}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 40 }}>{t("فريقنا جاهز لمساعدتك في كل ما تحتاجه", "Our team is ready to assist you with anything")}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: <Phone size={16} />, val: "+20 100 000 0000", label: t("اتصل بنا", "Call Us") },
                { icon: <Mail size={16} />, val: "hello@citydrive.eg", label: t("راسلنا", "Email Us") },
                { icon: <MapPin size={16} />, val: t("وسط القاهرة", "Downtown Cairo"), label: t("زرنا", "Visit Us") },
              ].map((c, ci) => (
                <div key={ci} style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 12, background: "rgba(255,255,255,0.08)", color: PL, display: "flex", alignItems: "center", justifyContent: "center" }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>{c.label}</div>
                    <div style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, background: W, padding: "48px 44px" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "60px 0", animation: "t7fi 0.3s" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 24px", background: `${P}08`, display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={42} color={P} /></div>
                <h4 style={{ fontSize: 22, fontWeight: 900, color: TX, fontFamily: h, marginBottom: 8 }}>{t("تم الإرسال!", "Message Sent!")}</h4>
                <p style={{ fontSize: 14, color: TX3, marginBottom: 28 }}>{t("سنقوم بالرد قريباً", "We'll reply soon")}</p>
                <button onClick={() => setSent(false)} style={{ padding: "12px 32px", borderRadius: 30, background: P, color: "#fff", border: "none", fontWeight: 700, cursor: "pointer", fontFamily: h }}>{t("العودة", "Go Back")}</button>
              </div>
            ) : (
              <>
                <h4 style={{ fontSize: 22, fontWeight: 900, color: TX, fontFamily: h, marginBottom: 8 }}>{t("أرسل رسالتك", "Send Your Message")}</h4>
                <p style={{ fontSize: 13, color: TX3, marginBottom: 28 }}>{t("سنرد عليك في أقرب وقت", "We'll respond as soon as possible")}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("الاسم", "Name")}</label><input style={inp} placeholder={t("محمد", "Mohammed")} /></div>
                  <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("الهاتف", "Phone")}</label><input type="tel" style={inp} placeholder="+20 1XX" /></div>
                </div>
                <div style={{ marginBottom: 14 }}><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("الإيميل", "Email")}</label><input type="email" style={inp} placeholder="you@email.com" /></div>
                <div style={{ marginBottom: 28 }}><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 6 }}>{t("الرسالة", "Message")}</label><textarea rows={4} style={{ ...inp, resize: "none" as const }} placeholder={t("اكتب رسالتك...", "Write your message...")} /></div>
                <button onClick={() => setSent(true)} style={{ width: "100%", padding: "15px", borderRadius: 16, background: P, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: h, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <Send size={16} /> {t("إرسال", "Send")}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}