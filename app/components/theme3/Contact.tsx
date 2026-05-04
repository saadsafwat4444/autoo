import { useAppContext } from "@/app/contexts/AppContext";
import { faqs } from "@/app/data/carDate";
import { useFonts, BG2, BG3, TXT, TXT_DIM, BG4, PAD } from "@/app/themes/theme3/page";
import { RED, SpeedLines, SectionBadge, TXT_MUTED, RACE_IMG, RED_D, RED_L } from "@/app/themes/theme3/page";
import { Phone, Mail, MapPin, Clock, Check, ArrowRight, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "info">("form");

  const contactInfo = [
    { icon: <Phone size={20} />, label: { ar: "اتصل بنا", en: "CALL US" }, value: "+20 100 000 0000" },
    { icon: <Mail size={20} />, label: { ar: "راسلنا", en: "EMAIL US" }, value: "hello@speedx.eg" },
    { icon: <MapPin size={20} />, label: { ar: "زُرنا", en: "VISIT US" }, value: { ar: "القاهرة، مصر — التجمع الخامس", en: "Cairo, Egypt — 5th Settlement" } },
    { icon: <Clock size={20} />, label: { ar: "ساعات العمل", en: "WORKING HOURS" }, value: { ar: "يومياً 9 ص - 11 م", en: "Daily 9 AM - 11 PM" } },
  ];

  return (
    <section style={{
      position: "relative", overflow: "hidden",
      background: `linear-gradient(165deg, ${BG2} 0%, ${BG3} 40%, ${BG2} 100%)`,
       
    }}>
      {/* Top diagonal divider with red accent */}
      <div style={{ width: "100%", height: 5, background: `linear-gradient(90deg, ${RED}, ${RED}60, transparent 50%, ${RED}60, ${RED})` }} />

      {/* Subtle carbon fiber pattern bg */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.02,
        backgroundImage: `repeating-conic-gradient(${TXT} 0% 25%, transparent 0% 50%)`,
        backgroundSize: "12px 12px",
      }} />

      {/* ─── CONTACT SECTION ─── */}
      <div style={{ position: "relative", padding: PAD}}>
        <SpeedLines side={isRTL ? "right" : "left"} />

        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px" }}>
          {/* Section header — centered */}
          <div style={{ marginBottom: 56 }}>
            <SectionBadge>{t("تواصل معنا", "CONTACT US")}</SectionBadge>
            <h2 style={{
              fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: TXT,
              fontFamily: heading, margin: "8px 0 10px",
            }}>
              {t("نقطة الانطلاق", "YOUR PIT STOP")}
            </h2>
            <p style={{ color: TXT_MUTED, fontSize: 15, fontFamily: body, maxWidth: 500 }}>
              {t("تواصل معنا وخلّنا نجهّز لك تجربة قيادة لا تُنسى", "Reach out and let us prepare your unforgettable driving experience")}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 40, alignItems: "start" }}>
            {/* Left: Contact info cards + image */}
            <div>
              {/* Track aerial image */}
              <div style={{
                borderRadius: 8, overflow: "hidden", marginBottom: 20, position: "relative",
                height: 180, border: `1px solid ${TXT}10`,
              }}>
                <img src={RACE_IMG.trackAerial} alt="" style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  filter: "brightness(0.5) saturate(1.2)",
                }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(to top, ${BG2}, transparent)`,
                }} />
                <div style={{ position: "absolute", bottom: 16, left: 20, right: 20, zIndex: 2 }}>
                  <p style={{ margin: 0, fontSize: 18, fontWeight: 900, color: TXT, fontFamily: heading }}>
                    SPEED<span style={{ color: RED }}>X</span> <span style={{ fontSize: 11, color: TXT_MUTED, letterSpacing: "0.1em" }}>HQ</span>
                  </p>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: TXT_DIM }}>{t("مقرنا — القاهرة", "Our Base — Cairo")}</p>
                </div>
              </div>

              {/* Contact cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {contactInfo.map((c, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 16,
                    background: BG4, borderRadius: 6, padding: "16px 18px",
                    border: `1px solid ${TXT}08`,
                    transition: "all 0.3s", cursor: "default",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${RED}30`; e.currentTarget.style.background = `${RED}08`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${TXT}08`; e.currentTarget.style.background = BG4; }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 6,
                      background: `${RED}12`, border: `1px solid ${RED}25`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: RED, flexShrink: 0,
                    }}>
                      {c.icon}
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: RED, letterSpacing: "0.15em", fontFamily: heading }}>
                        {t(c.label.ar, c.label.en)}
                      </p>
                      <p style={{ margin: "3px 0 0", fontSize: 14, fontWeight: 500, color: TXT_DIM, fontFamily: body }}>
                        {typeof c.value === "string" ? c.value : t(c.value.ar, c.value.en)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form card */}
            <div style={{
              background: BG4, borderRadius: 10, overflow: "hidden",
              border: `1px solid ${TXT}08`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.3)`,
            }}>
              {/* Form header with red stripe */}
              <div style={{
                background: `linear-gradient(135deg, ${RED}, ${RED_D})`,
                padding: "24px 32px", position: "relative",
                clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
              }}>
                <div style={{
                  position: "absolute", inset: 0, opacity: 0.08,
                  backgroundImage: `repeating-linear-gradient(45deg, transparent 0px, transparent 10px, #fff 10px, #fff 11px)`,
                }} />
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#fff", fontFamily: heading, letterSpacing: "0.05em", position: "relative" }}>
                  {t("أرسل لنا رسالة", "SEND A MESSAGE")}
                </h3>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: body, position: "relative" }}>
                  {t("سنرد عليك خلال ساعة واحدة", "We'll respond within 1 hour")}
                </p>
              </div>

              <div style={{ padding: "28px 32px 32px" }}>
                {sent ? (
                  <div style={{ textAlign: "center", padding: "32px 0" }}>
                    <div style={{
                      width: 70, height: 70, borderRadius: "50%", background: "rgba(34,197,94,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 20px", border: "2px solid rgba(34,197,94,0.4)",
                    }}>
                      <Check size={32} color="#22C55E" />
                    </div>
                    <h3 style={{ color: TXT, fontSize: 22, fontWeight: 900, fontFamily: heading, marginBottom: 8 }}>{t("تم إرسال رسالتك!", "MESSAGE SENT!")}</h3>
                    <p style={{ color: TXT_MUTED, fontSize: 14, fontFamily: body, marginBottom: 20 }}>{t("فريقنا سيتواصل معك قريباً", "Our team will reach out shortly")}</p>
                    <button onClick={() => setSent(false)} style={{
                      padding: "12px 28px", background: RED, color: "#fff", border: "none",
                      fontWeight: 800, cursor: "pointer", fontFamily: heading, fontSize: 12,
                      letterSpacing: "0.1em", borderRadius: 4,
                    }}>{t("إرسال رسالة أخرى", "SEND ANOTHER")}</button>
                  </div>
                ) : (
                  <>
                    {/* Two columns for name & email */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      {[
                        { label: t("الاسم", "NAME"), placeholder: t("اكتب اسمك", "Your name") },
                        { label: t("البريد", "EMAIL"), placeholder: t("بريدك الإلكتروني", "your@email.com") },
                      ].map((f, i) => (
                        <div key={i}>
                          <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: TXT_MUTED, marginBottom: 6, letterSpacing: "0.12em", fontFamily: heading }}>{f.label}</label>
                          <input placeholder={f.placeholder} style={{
                            width: "100%", padding: "12px 14px", borderRadius: 5, background: BG2,
                            border: `1px solid ${TXT}12`, fontSize: 14, outline: "none",
                            boxSizing: "border-box", fontFamily: body, color: TXT, transition: "border-color 0.2s",
                          }}
                            onFocus={e => { e.currentTarget.style.borderColor = RED; }}
                            onBlur={e => { e.currentTarget.style.borderColor = `${TXT}12`; }} />
                        </div>
                      ))}
                    </div>

                    {/* Phone */}
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: TXT_MUTED, marginBottom: 6, letterSpacing: "0.12em", fontFamily: heading }}>{t("الهاتف", "PHONE")}</label>
                      <input placeholder={t("رقم هاتفك", "Your phone number")} style={{
                        width: "100%", padding: "12px 14px", borderRadius: 5, background: BG2,
                        border: `1px solid ${TXT}12`, fontSize: 14, outline: "none",
                        boxSizing: "border-box", fontFamily: body, color: TXT, transition: "border-color 0.2s",
                      }}
                        onFocus={e => { e.currentTarget.style.borderColor = RED; }}
                        onBlur={e => { e.currentTarget.style.borderColor = `${TXT}12`; }} />
                    </div>

                    {/* Subject select */}
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: TXT_MUTED, marginBottom: 6, letterSpacing: "0.12em", fontFamily: heading }}>{t("الموضوع", "SUBJECT")}</label>
                      <select style={{
                        width: "100%", padding: "12px 14px", borderRadius: 5, background: BG2,
                        border: `1px solid ${TXT}12`, fontSize: 14, outline: "none",
                        fontFamily: body, color: TXT_DIM, cursor: "pointer", appearance: "none",
                      }}>
                        <option>{t("حجز سيارة رياضية", "Sports Car Booking")}</option>
                        <option>{t("تجربة الحلبة", "Track Experience")}</option>
                        <option>{t("استفسار عام", "General Inquiry")}</option>
                        <option>{t("عضوية Racing", "Racing Membership")}</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div style={{ marginBottom: 20 }}>
                      <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: TXT_MUTED, marginBottom: 6, letterSpacing: "0.12em", fontFamily: heading }}>{t("الرسالة", "MESSAGE")}</label>
                      <textarea rows={4} placeholder={t("اكتب رسالتك هنا...", "Type your message here...")} style={{
                        width: "100%", padding: "12px 14px", borderRadius: 5, background: BG2,
                        border: `1px solid ${TXT}12`, fontSize: 14, outline: "none",
                        resize: "none", boxSizing: "border-box", fontFamily: body, color: TXT, transition: "border-color 0.2s",
                      }}
                        onFocus={e => { e.currentTarget.style.borderColor = RED; }}
                        onBlur={e => { e.currentTarget.style.borderColor = `${TXT}12`; }} />
                    </div>

                    {/* Submit */}
                    <button onClick={() => setSent(true)} style={{
                      width: "100%", padding: "15px", background: RED, color: "#fff",
                      border: "none", fontWeight: 800, fontSize: 14, cursor: "pointer",
                      fontFamily: heading, letterSpacing: "0.1em",
                      clipPath: "polygon(0 0, 100% 0, 99% 100%, 1% 100%)",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      transition: "all 0.3s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = RED_L; }}
                      onMouseLeave={e => { e.currentTarget.style.background = RED; }}>
                      <ArrowRight size={16} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
                      {t("إرسال الرسالة", "SEND MESSAGE")}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FAQ SECTION ─── */}
      <div style={{
        position: "relative", padding: PAD,
        borderTop: `1px solid ${TXT}06`,
      }}>
        {/* Diagonal red accent */}
        <div style={{
          position: "absolute", top: 0, [isRTL ? "left" : "right"]: 0,
          width: 300, height: "100%", opacity: 0.03,
          background: `linear-gradient(${isRTL ? "to right" : "to left"}, ${RED}, transparent)`,
        }} />

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ marginBottom: 48 }}>
            <SectionBadge>{t("أسئلة شائعة", "FAQ")}</SectionBadge>
            <h2 style={{
              fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 900, color: TXT,
              fontFamily: heading, margin: "8px 0 10px",
            }}>
              {t("أسئلة متكررة", "FREQUENTLY ASKED")}
            </h2>
            <p style={{ color: TXT_MUTED, fontSize: 14, fontFamily: body }}>
              {t("كل اللي محتاج تعرفه عن تجربة SpeedX", "Everything you need to know about the SpeedX experience")}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{
                borderRadius: 8, overflow: "hidden",
                background: openFaq === i ? `${RED}08` : BG4,
                border: `1px solid ${openFaq === i ? RED + "35" : TXT + "08"}`,
                transition: "all 0.3s",
              }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: "100%", padding: "18px 22px", background: "transparent", border: "none",
                  cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
                  gap: 16, fontFamily: body,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    {/* Number indicator */}
                    <span style={{
                      width: 30, height: 30, borderRadius: 4,
                      background: openFaq === i ? RED : `${TXT}10`,
                      color: openFaq === i ? "#fff" : TXT_MUTED,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 800, fontFamily: heading, flexShrink: 0,
                      transition: "all 0.3s",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{
                      fontSize: 15, fontWeight: 600,
                      color: openFaq === i ? TXT : TXT_DIM,
                      textAlign: "start", transition: "color 0.3s",
                    }}>
                      {t(faq.q.ar, faq.q.en)}
                    </span>
                  </div>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: openFaq === i ? `${RED}20` : `${TXT}08`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, transition: "all 0.3s",
                  }}>
                    {openFaq === i ? <ChevronUp size={15} color={RED} /> : <ChevronDown size={15} color={TXT_MUTED} />}
                  </div>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 22px 20px", display: "flex", gap: 14 }}>
                    <div style={{ width: 30, flexShrink: 0 }} /> {/* Spacer to align with text */}
                    <p style={{
                      margin: 0, fontSize: 14, color: TXT_MUTED, lineHeight: 1.8,
                      fontFamily: body, borderTop: `1px solid ${RED}20`, paddingTop: 14,
                    }}>
                      {t(faq.a.ar, faq.a.en)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still have questions CTA */}
          <div style={{
            marginTop: 40, textAlign: "center", padding: "28px", borderRadius: 8,
            background: `linear-gradient(135deg, ${RED}10, ${RED}05)`,
            border: `1px dashed ${RED}30`,
          }}>
            <p style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: TXT, fontFamily: body }}>
              {t("لسه عندك أسئلة؟", "Still have questions?")}
            </p>
            <button style={{
              padding: "11px 28px", background: RED, color: "#fff", border: "none",
              fontWeight: 800, fontSize: 12, cursor: "pointer", fontFamily: heading,
              letterSpacing: "0.1em", borderRadius: 4,
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              <Phone size={14} />
              {t("اتصل بنا مباشرة", "CALL US DIRECTLY")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}