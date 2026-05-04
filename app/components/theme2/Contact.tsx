import { useAppContext } from "@/app/contexts/AppContext";
import { faqs } from "@/app/data/carDate";
import { BG, BG3, GOLD, GOLD_D, PAD, SEC_BTN, SEC_BTN_BRD, SEC_BTN_TXT, SectionLabel, TXT, TXT_DIM, useFonts } from "@/app/themes/theme2/page";
import { Check, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const { t, lang } = useAppContext();
  const { heading, body, isAr } = useFonts();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactSent, setContactSent] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 18px", background: BG3,
    border: `1px solid ${GOLD}25`, color: TXT, fontSize: 14,
    outline: "none", boxSizing: "border-box", fontFamily: body,
    transition: "border-color 0.3s",
  };

  return (
    <section id="elite-contact" style={{ background: BG, padding:PAD, borderTop: `1px solid ${GOLD}12` }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
        {/* Contact Form */}
        <div>
          <SectionLabel>{t("تواصل معنا", "CONTACT US")}</SectionLabel>
          <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "#fff", margin: "16px 0 36px", fontFamily: heading }}>
            {t("احجز تجربة VIP", "Book a VIP Experience")}
          </h2>

          {contactSent ? (
            <div style={{ textAlign: "center", padding: "48px 24px", background: BG3, border: `1px solid ${GOLD}25` }}>
              <div style={{ width: 72, height: 72, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <Check size={32} color={BG} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: GOLD, margin: "0 0 10px", fontFamily: heading }}>
                {t("تم الإرسال بنجاح!", "Message Sent Successfully!")}
              </h3>
              <p style={{ margin: "0 0 24px", fontSize: 14, color: TXT_DIM, lineHeight: 1.7 }}>
                {t("شكراً لتواصلك معنا. فريقنا سيرد عليك في أقرب وقت.", "Thank you for reaching out. Our team will respond shortly.")}
              </p>
              <button
                onClick={() => setContactSent(false)}
                style={{
                  padding: "12px 28px", border: `1px solid ${SEC_BTN_BRD}`, background: SEC_BTN,
                  color: SEC_BTN_TXT, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: body,
                  letterSpacing: "0.08em", transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${GOLD}28`; e.currentTarget.style.color = GOLD; }}
                onMouseLeave={e => { e.currentTarget.style.background = SEC_BTN; e.currentTarget.style.color = SEC_BTN_TXT; }}
              >
                {t("إرسال رسالة أخرى", "Send Another Message")}
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 10, color: GOLD, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>
                    {t("الاسم الكامل", "FULL NAME")}
                  </label>
                  <input style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = GOLD}
                    onBlur={e => e.currentTarget.style.borderColor = `${GOLD}25`} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, color: GOLD, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>
                    {t("رقم الهاتف", "PHONE")}
                  </label>
                  <input style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = GOLD}
                    onBlur={e => e.currentTarget.style.borderColor = `${GOLD}25`} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10, color: GOLD, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>
                  {t("البريد الإلكتروني", "EMAIL")}
                </label>
                <input type="email" style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = GOLD}
                  onBlur={e => e.currentTarget.style.borderColor = `${GOLD}25`} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10, color: GOLD, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>
                  {t("الرسالة", "MESSAGE")}
                </label>
                <textarea rows={5} style={{ ...inputStyle, resize: "none" }}
                  onFocus={e => e.currentTarget.style.borderColor = GOLD}
                  onBlur={e => e.currentTarget.style.borderColor = `${GOLD}25`} />
              </div>
              <button
                onClick={() => setContactSent(true)}
                style={{
                  padding: "15px",
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
                  color: BG, border: "none", fontWeight: 700, fontSize: 14,
                  cursor: "pointer", letterSpacing: "0.1em", fontFamily: body,
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 6px 24px ${GOLD}40`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = ""}
              >
                {t("إرسال", "SEND MESSAGE")}
              </button>
            </div>
          )}
        </div>

        {/* FAQ */}
        <div>
          <SectionLabel>{t("الأسئلة الشائعة", "FAQ")}</SectionLabel>
          <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "#fff", margin: "16px 0 36px", fontFamily: heading }}>
            {t("إجابات سريعة", "Quick Answers")}
          </h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${GOLD}15`, overflow: "hidden" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%", padding: "20px 0", background: "transparent",
                  border: "none", cursor: "pointer", display: "flex",
                  justifyContent: "space-between", alignItems: "center", fontFamily: body,
                }}
              >
                <span style={{ fontSize: 14, color: openFaq === i ? GOLD : TXT, fontWeight: 600, transition: "color 0.3s", textAlign: isAr ? "right" : "left" }}>
                  {t(faq.q.ar, faq.q.en)}
                </span>
                <div style={{
                  width: 28, height: 28, border: `1px solid ${openFaq === i ? GOLD : GOLD + "30"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s", background: openFaq === i ? `${GOLD}10` : "transparent",
                  flexShrink: 0,
                }}>
                  {openFaq === i ? <ChevronUp size={14} color={GOLD} /> : <ChevronDown size={14} color={GOLD} />}
                </div>
              </button>
              <div style={{
                maxHeight: openFaq === i ? 120 : 0,
                overflow: "hidden", transition: "max-height 0.35s ease",
              }}>
                <p style={{ margin: "0 0 16px", fontSize: 13, color: TXT_DIM, lineHeight: 1.8 }}>
                  {t(faq.a.ar, faq.a.en)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}