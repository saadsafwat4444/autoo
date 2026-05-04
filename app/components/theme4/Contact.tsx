import { useAppContext } from "@/app/contexts/AppContext";
import { BG, BG2, PAD, TXT, useFonts } from "@/app/themes/theme4/page";
import { BORDER, BLUE, TXT3, BLUE_BG, IMG, TXT2, GREEN, BLUE_D } from "@/app/themes/theme4/page";
import { Car, Check, Clock, CreditCard, Mail, MapPin, Phone, Shield, Star, Zap } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [sent, setSent] = useState(false);
  const [activeTab, setActiveTab] = useState<"about" | "contact">("about");

  const inputStyle = {
    width: "100%", padding: "13px 16px", borderRadius: 12, border: `1.5px solid ${BORDER}`,
    fontSize: 14, outline: "none", boxSizing: "border-box" as const, fontFamily: body, color: TXT,
    background: BG, transition: "all 0.2s",
  };

  const aboutFeatures = [
    { icon: <Shield size={22} />, ar: "أمان وموثوقية", en: "Safety & Trust", desc: { ar: "جميع سياراتنا مؤمّنة تأميناً شاملاً ويتم فحصها دورياً", en: "All our cars are fully insured and regularly inspected" }, color: BLUE },
    { icon: <Clock size={22} />, ar: "خدمة على مدار الساعة", en: "24/7 Service", desc: { ar: "فريق دعم متاح دائماً لمساعدتك في أي وقت", en: "Our support team is always available to help you anytime" }, color: "#059669" },
    { icon: <Zap size={22} />, ar: "حجز فوري", en: "Instant Booking", desc: { ar: "احجز سيارتك في أقل من دقيقة بدون أي تعقيدات", en: "Book your car in under a minute with zero hassle" }, color: "#7C3AED" },
    { icon: <CreditCard size={22} />, ar: "أسعار شفافة", en: "Transparent Pricing", desc: { ar: "لا رسوم مخفية — السعر الذي تراه هو السعر الذي تدفعه", en: "No hidden fees — the price you see is the price you pay" }, color: "#F59E0B" },
  ];

  const contactInfo = [
    { icon: <Phone size={18} />, ar: "+20 100 000 0000", en: "+20 100 000 0000" },
    { icon: <Mail size={18} />, ar: "hello@cleandrive.eg", en: "hello@cleandrive.eg" },
    { icon: <MapPin size={18} />, ar: "القاهرة، مصر", en: "Cairo, Egypt" },
    { icon: <Clock size={18} />, ar: "السبت–الخميس، 9ص–9م", en: "Sat–Thu, 9AM–9PM" },
  ];

  const stats = [
    { val: "50+", ar: "سيارة في الأسطول", en: "Fleet Cars" },
    { val: "2500+", ar: "عميل سعيد", en: "Happy Clients" },
    { val: "4.8", ar: "تقييم متوسط", en: "Avg. Rating" },
    { val: "3", ar: "فروع في مصر", en: "Branches in Egypt" },
  ];

  return (
    <section id="contact" style={{ background: BG, padding: PAD }}>
      <div style={{ maxWidth: 1200, padding: "0 48px" }}>

        {/* Tab Switcher */}
        <div style={{ display: "flex", marginBottom: 52 }}>
          <div style={{ display: "inline-flex", background: BG2, borderRadius: 14, padding: 4, border: `1px solid ${BORDER}` }}>
            {[
              { id: "about" as const, ar: "من نحن", en: "About Us" },
              { id: "contact" as const, ar: "تواصل معنا", en: "Contact Us" },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                padding: "12px 32px", borderRadius: 10, border: "none",
                background: activeTab === tab.id ? BG : "transparent",
                color: activeTab === tab.id ? BLUE : TXT3,
                fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: heading,
                boxShadow: activeTab === tab.id ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                transition: "all 0.3s",
              }}>{t(tab.ar, tab.en)}</button>
            ))}
          </div>
        </div>

        {/* ═══ ABOUT US TAB ═══ */}
        {activeTab === "about" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", marginBottom: 64 }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: BLUE_BG, borderRadius: 20, padding: "6px 16px", marginBottom: 20 }}>
                  <Car size={14} color={BLUE} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: BLUE }}>CleanDrive</span>
                </div>
                <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 16, lineHeight: 1.35 }}>
                  {t("نوفّر لك تجربة تأجير", "We provide a rental experience")}
                  <br />
                  <span style={{ color: BLUE }}>{t("بسيطة وموثوقة", "that's simple & reliable")}</span>
                </h2>
                <p style={{ fontSize: 16, color: TXT3, lineHeight: 1.8, marginBottom: 28, fontFamily: body }}>
                  {t(
                    "تأسست CleanDrive بهدف واحد: جعل تأجير السيارات تجربة سلسة وممتعة. نؤمن أن الحصول على سيارة لا يجب أن يكون معقداً — لذلك بنينا منصة تجمع بين البساطة والجودة والشفافية.",
                    "CleanDrive was founded with one goal: making car rental a smooth and enjoyable experience. We believe getting a car shouldn't be complicated — so we built a platform that combines simplicity, quality, and transparency."
                  )}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {stats.map((s, i) => (
                    <div key={i} style={{ background: BG2, borderRadius: 14, padding: "16px 18px", border: `1px solid ${BORDER}` }}>
                      <div style={{ fontSize: 24, fontWeight: 800, color: BLUE, fontFamily: heading, marginBottom: 2 }}>{s.val}</div>
                      <div style={{ fontSize: 13, color: TXT3 }}>{t(s.ar, s.en)}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
                  <img src={IMG.city} alt="" style={{ width: "100%", height: 420, objectFit: "cover" }} />
                </div>
                <div style={{
                  position: "absolute", bottom: -16, [isRTL ? "right" : "left"]: -16,
                  background: BG, borderRadius: 14, padding: "14px 20px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.1)", border: `1px solid ${BORDER}`,
                  display: "flex", alignItems: "center", gap: 12,
                }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: BLUE_BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Star size={20} fill="#F59E0B" color="#F59E0B" />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: TXT }}>{t("تقييم 4.8 من 5", "4.8 out of 5 rating")}</p>
                    <p style={{ margin: 0, fontSize: 12, color: TXT3 }}>{t("بناءً على 2500+ تقييم", "Based on 2500+ reviews")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
              {aboutFeatures.map((f, i) => (
                <div key={i} style={{
                  background: BG, borderRadius: 16, padding: "28px 22px",
                  border: `1px solid ${BORDER}`, transition: "all 0.25s", cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = `${f.color}40`; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = BORDER; }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, background: `${f.color}10`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 16, color: f.color,
                  }}>{f.icon}</div>
                  <h4 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700, color: TXT, fontFamily: heading }}>{t(f.ar, f.en)}</h4>
                  <p style={{ margin: 0, fontSize: 13, color: TXT3, lineHeight: 1.7 }}>{t(f.desc.ar, f.desc.en)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ CONTACT TAB ═══ */}
        {activeTab === "contact" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40, alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 10 }}>
                {t("هل تحتاج مساعدة؟", "Need Help?")}
              </h2>
              <p style={{ color: TXT3, fontSize: 15, fontFamily: body, lineHeight: 1.7, marginBottom: 32 }}>
                {t("تواصل معنا وسنرد عليك في أقرب وقت. فريقنا جاهز لمساعدتك.", "Reach out and we'll respond shortly. Our team is ready to help.")}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {contactInfo.map((c, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    background: BG2, borderRadius: 14, padding: "16px 20px",
                    border: `1px solid ${BORDER}`, transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${BLUE}40`; e.currentTarget.style.background = BLUE_BG; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = BG2; }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: BLUE_BG, display: "flex", alignItems: "center", justifyContent: "center", color: BLUE, flexShrink: 0 }}>
                      {c.icon}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: TXT2, fontFamily: body }}>{t(c.ar, c.en)}</span>
                  </div>
                ))}
              </div>


            </div>

            <div style={{ background: BG, borderRadius: 22, padding: "32px", border: `1px solid ${BORDER}`, boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <Check size={34} color={GREEN} />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: TXT, marginBottom: 8, fontFamily: heading }}>{t("تم إرسال رسالتك بنجاح", "Message Sent Successfully")}</h3>
                  <p style={{ color: TXT3, fontSize: 14, marginBottom: 22 }}>{t("سنقوم بالرد عليك قريباً", "We'll respond to you soon")}</p>
                  <button onClick={() => setSent(false)} style={{
                    padding: "12px 28px", borderRadius: 10, background: BLUE, color: "#fff",
                    border: "none", fontWeight: 600, cursor: "pointer", fontFamily: heading, fontSize: 14,
                  }}>{t("إرسال رسالة أخرى", "Send Another")}</button>
                </div>
              ) : (
                <>
                  <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 700, color: TXT, fontFamily: heading }}>{t("أرسل لنا رسالة", "Send us a message")}</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    {[
                      { label: t("الاسم", "Name"), ph: t("اكتب اسمك", "Your name") },
                      { label: t("البريد الإلكتروني", "Email"), ph: t("بريدك الإلكتروني", "your@email.com") },
                    ].map((f, i) => (
                      <div key={i}>
                        <label style={{ display: "block", fontSize: 13, color: TXT2, fontWeight: 600, marginBottom: 7 }}>{f.label}</label>
                        <input placeholder={f.ph} style={inputStyle}
                          onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = `0 0 0 3px ${BLUE}12`; }}
                          onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = "none"; }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 13, color: TXT2, fontWeight: 600, marginBottom: 7 }}>{t("الهاتف", "Phone")}</label>
                    <input placeholder={t("رقم هاتفك", "Your phone number")} style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = `0 0 0 3px ${BLUE}12`; }}
                      onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 13, color: TXT2, fontWeight: 600, marginBottom: 7 }}>{t("الموضوع", "Subject")}</label>
                    <select style={{ ...inputStyle, cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: isRTL ? "16px center" : "calc(100% - 16px) center" }}
                      onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = `0 0 0 3px ${BLUE}12`; }}
                      onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = "none"; }}>
                      <option>{t("استفسار عام", "General Inquiry")}</option>
                      <option>{t("حجز سيارة", "Car Booking")}</option>
                      <option>{t("شكوى أو اقتراح", "Complaint / Suggestion")}</option>
                      <option>{t("تعاون تجاري", "Business Partnership")}</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: 22 }}>
                    <label style={{ display: "block", fontSize: 13, color: TXT2, fontWeight: 600, marginBottom: 7 }}>{t("الرسالة", "Message")}</label>
                    <textarea rows={4} placeholder={t("اكتب رسالتك هنا...", "Type your message...")} style={{ ...inputStyle, resize: "none" }}
                      onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = `0 0 0 3px ${BLUE}12`; }}
                      onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                  <button onClick={() => setSent(true)} style={{
                    width: "100%", padding: "14px", borderRadius: 12, background: BLUE, color: "#fff",
                    border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer",
                    fontFamily: heading, boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = BLUE_D; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = BLUE; e.currentTarget.style.transform = ""; }}>
                    <Mail size={16} />
                    {t("إرسال الرسالة", "Send Message")}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}