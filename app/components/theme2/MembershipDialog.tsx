import React from "react";
import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts, BG3, GOLD, TXT, ffBody, BG2, TXT_DIM, BG4, GOLD_D, BG, SEC_BTN_BRD, SEC_BTN, SEC_BTN_TXT } from "@/app/themes/theme2/page";
import { Gem, X, Crown, Users, Plane, Shield, Sparkles, Check, CreditCard, FileCheck, Copy, Lock } from "lucide-react";
import { useState } from "react";

export default function MembershipDialog({ planName, planPrice, onClose }: { planName: string; planPrice: string; onClose: () => void }) {
  const { t, lang } = useAppContext();
  const { heading, body, isAr } = useFonts();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [idNum, setIdNum] = useState("");
  const [payMethod, setPayMethod] = useState(0);
  const [duration, setDuration] = useState("monthly");
  const [addOns, setAddOns] = useState<number[]>([]);

  const refNum = `EM-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  const stepLabels = [
    t("تفاصيل العضوية", "Membership Details"),
    t("الإضافات", "Add-ons"),
    t("البيانات الشخصية", "Personal Info"),
    t("طريقة الدفع", "Payment"),
    t("المراجعة", "Review"),
    t("التأكيد", "Confirmation"),
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 16px", background: BG3,
    border: `1px solid ${GOLD}30`, color: TXT, fontSize: 14,
    outline: "none", boxSizing: "border-box", fontFamily: body,
    transition: "border-color 0.3s",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 10, color: GOLD, letterSpacing: "0.15em",
    marginBottom: 8, fontWeight: 600, fontFamily: ffBody,
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: body }}>
      <div style={{ background: BG2, width: "min(600px,95vw)", maxHeight: "92vh", overflow: "auto", border: `1px solid ${GOLD}30`, padding: "40px 36px", position: "relative" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Gem size={18} color={GOLD} />
            <span style={{ fontSize: 10, color: GOLD, letterSpacing: "0.2em", fontWeight: 600 }}>{planName} {t("عضوية", "MEMBERSHIP")}</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: TXT_DIM, transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = GOLD}
            onMouseLeave={e => e.currentTarget.style.color = TXT_DIM}>
            <X size={20} />
          </button>
        </div>
        <h2 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: heading }}>
          {t("اشتراك عضوية", "Membership Subscription")} — {planName}
        </h2>

        {/* Step indicator */}
        {step < 6 && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
              {[1,2,3,4,5,6].map(s => (
                <div key={s} style={{ flex: 1, height: 2, background: s <= step ? GOLD : BG4, transition: "background 0.3s" }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, color: GOLD, letterSpacing: "0.08em" }}>{stepLabels[step-1]}</span>
              <span style={{ fontSize: 11, color: TXT_DIM }}>{step}/6</span>
            </div>
          </div>
        )}

        {/* Step 1: Membership Details */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}20`, padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 56, height: 56, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Crown size={24} color={BG} />
              </div>
              <div>
                <h4 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#fff" }}>{planName}</h4>
                <span style={{ fontSize: 22, fontWeight: 900, color: GOLD }}>{planPrice} {t("جنيه", "EGP")}</span>
                <span style={{ fontSize: 12, color: TXT_DIM }}> / {t("شهرياً", "month")}</span>
              </div>
            </div>
            <div>
              <label style={labelStyle}>{t("مدة الاشتراك", "SUBSCRIPTION DURATION")}</label>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { v: "monthly", ar: "شهري", en: "Monthly" },
                  { v: "quarterly", ar: "ربع سنوي", en: "Quarterly" },
                  { v: "yearly", ar: "سنوي", en: "Yearly" },
                ].map(d => (
                  <button key={d.v}
                    onClick={() => setDuration(d.v)}
                    style={{
                      flex: 1, padding: "12px", fontSize: 13, fontWeight: 600,
                      background: duration === d.v ? `${GOLD}15` : BG3,
                      border: `1px solid ${duration === d.v ? GOLD : GOLD + "25"}`,
                      color: duration === d.v ? GOLD : TXT_DIM, cursor: "pointer", fontFamily: body,
                      transition: "all 0.25s",
                    }}>
                    {t(d.ar, d.en)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={labelStyle}>{t("تاريخ البدء المفضل", "PREFERRED START DATE")}</label>
              <input type="date" defaultValue="2026-04-15" style={inputStyle} />
            </div>
          </div>
        )}

        {/* Step 2: Add-ons */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ color: TXT_DIM, fontSize: 13, margin: "0 0 8px" }}>{t("اختر الإضافات لعضويتك:", "Choose add-ons for your membership:")}</p>
            {[
              { ar: "سائق خاص مع كل رحلة", en: "Private Chauffeur Every Trip", price: 3000, icon: Users },
              { ar: "استقبال مطار VIP شهرياً", en: "Monthly VIP Airport Pickup", price: 2000, icon: Plane },
              { ar: "تأمين شامل بريميوم", en: "Premium Full Insurance", price: 1500, icon: Shield },
              { ar: "كونسيرج شخصي 24/7", en: "24/7 Personal Concierge", price: 4000, icon: Sparkles },
            ].map((addon, i) => {
              const selected = addOns.includes(i);
              return (
                <div key={i} onClick={() => setAddOns(selected ? addOns.filter(x => x !== i) : [...addOns, i])}
                  style={{ padding: "18px 20px", background: selected ? `${GOLD}10` : BG3, border: `1px solid ${selected ? GOLD : GOLD + "25"}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, transition: "all 0.25s" }}>
                  <div style={{ width: 20, height: 20, border: `1.5px solid ${selected ? GOLD : GOLD + "50"}`, display: "flex", alignItems: "center", justifyContent: "center", background: selected ? GOLD : "transparent" }}>
                    {selected && <Check size={12} color={BG} />}
                  </div>
                  <addon.icon size={18} color={selected ? GOLD : TXT_DIM} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 14, color: selected ? "#fff" : TXT, fontWeight: 600 }}>{t(addon.ar, addon.en)}</span>
                  </div>
                  <span style={{ fontSize: 13, color: GOLD, fontWeight: 700 }}>+{addon.price.toLocaleString()} {t("ج/ش", "EGP/m")}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Step 3: Personal Info */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div><label style={labelStyle}>{t("الاسم الكامل", "FULL NAME")}</label><input value={name} onChange={e => setName(e.target.value)} style={inputStyle} /></div>
              <div><label style={labelStyle}>{t("رقم الهاتف", "PHONE")}</label><input value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} /></div>
            </div>
            <div><label style={labelStyle}>{t("البريد الإلكتروني", "EMAIL")}</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>{t("رقم الهوية / جواز السفر", "ID / PASSPORT NUMBER")}</label><input value={idNum} onChange={e => setIdNum(e.target.value)} style={inputStyle} /></div>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { ar: "بطاقة ائتمانية", en: "Credit Card", icon: CreditCard },
              { ar: "نقداً", en: "Cash", icon: FileCheck },
              { ar: "تحويل بنكي", en: "Bank Transfer", icon: Lock },
            ].map((m, i) => (
              <div key={i} onClick={() => setPayMethod(i)}
                style={{ padding: "18px 20px", background: payMethod === i ? `${GOLD}10` : BG3, border: `1px solid ${payMethod === i ? GOLD : GOLD + "25"}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, transition: "all 0.25s" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${payMethod === i ? GOLD : GOLD + "50"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {payMethod === i && <div style={{ width: 10, height: 10, borderRadius: "50%", background: GOLD }} />}
                </div>
                {React.createElement(m.icon as React.ComponentType<any>, { size: 18, color: payMethod === i ? GOLD : TXT_DIM })}
                <span style={{ fontSize: 14, color: payMethod === i ? "#fff" : TXT, fontWeight: 600 }}>{t(m.ar, m.en)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", gap: 16, padding: 18, background: BG3, border: `1px solid ${GOLD}20` }}>
              <div style={{ width: 60, height: 60, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Crown size={24} color={BG} />
              </div>
              <div>
                <h4 style={{ margin: "0 0 4px", fontSize: 16, color: "#fff", fontWeight: 700 }}>{planName} {t("عضوية", "Membership")}</h4>
                <span style={{ fontSize: 12, color: TXT_DIM }}>{planPrice} {t("جنيه/شهرياً", "EGP/month")}</span>
              </div>
            </div>
            {[
              [t("المدة", "Duration"), t(duration === "monthly" ? "شهري" : duration === "quarterly" ? "ربع سنوي" : "سنوي", duration === "monthly" ? "Monthly" : duration === "quarterly" ? "Quarterly" : "Yearly")],
              [t("الإضافات", "Add-ons"), addOns.length > 0 ? `${addOns.length} ${t("إضافة", "items")}` : t("لا يوجد", "None")],
              [t("الدفع", "Payment"), [t("بطاقة ائتمانية","Credit Card"), t("نقداً","Cash"), t("تحويل بنكي","Bank Transfer")][payMethod]],
            ].map(([k, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${GOLD}12` }}>
                <span style={{ fontSize: 13, color: TXT_DIM }}>{k}</span>
                <span style={{ fontSize: 13, color: TXT, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ background: `${GOLD}10`, border: `1px solid ${GOLD}30`, padding: 20, marginTop: 8, textAlign: "center" }}>
              <span style={{ fontSize: 12, color: TXT_DIM, letterSpacing: "0.1em" }}>{t("الإجمالي الشهري", "MONTHLY TOTAL")}</span>
              <p style={{ margin: "8px 0 0", fontSize: 32, fontWeight: 900, color: GOLD, fontFamily: heading }}>{planPrice} {t("جنيه", "EGP")}</p>
            </div>
          </div>
        )}

        {/* Step 6: Confirmation */}
        {step === 6 && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 80, height: 80, margin: "0 auto 24px", background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check size={36} color={BG} />
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: GOLD, margin: "0 0 8px", fontFamily: heading }}>
              {t("تم تفعيل العضوية بنجاح!", "Membership Activated!")}
            </h3>
            <p style={{ color: TXT_DIM, fontSize: 14, marginBottom: 24 }}>
              {t("مرحباً بك في عائلة النخبة. فريقنا سيتواصل معك.", "Welcome to the Elite family. Our team will contact you.")}
            </p>
            <div style={{ background: BG3, border: `1px solid ${GOLD}25`, padding: "16px 24px", display: "inline-flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 11, color: TXT_DIM, letterSpacing: "0.1em" }}>{t("رقم العضوية", "REF")}</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: GOLD, letterSpacing: "0.08em" }}>{refNum}</span>
              <button onClick={() => navigator.clipboard?.writeText(refNum)} style={{ background: "none", border: "none", cursor: "pointer", color: GOLD }}>
                <Copy size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
          {step > 1 && step < 6 && (
            <button onClick={() => setStep(s => s - 1)} style={{
              flex: 1, padding: "14px", border: `1px solid ${SEC_BTN_BRD}`, background: SEC_BTN,
              color: SEC_BTN_TXT, fontWeight: 600, cursor: "pointer", fontFamily: body, fontSize: 13,
              letterSpacing: "0.06em", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = `${GOLD}28`; e.currentTarget.style.color = GOLD; }}
              onMouseLeave={e => { e.currentTarget.style.background = SEC_BTN; e.currentTarget.style.color = SEC_BTN_TXT; }}>
              {t("السابق", "BACK")}
            </button>
          )}
          {step < 5 ? (
            <button onClick={() => setStep(s => s + 1)} style={{
              flex: 2, padding: "14px", background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
              color: BG, border: "none", fontWeight: 700, cursor: "pointer",
              fontFamily: body, fontSize: 13, letterSpacing: "0.08em", transition: "box-shadow 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 16px ${GOLD}40`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = ""}>
              {t("التالي", "NEXT")}
            </button>
          ) : step === 5 ? (
            <button onClick={() => setStep(6)} style={{
              flex: 2, padding: "14px", background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
              color: BG, border: "none", fontWeight: 700, cursor: "pointer",
              fontFamily: body, fontSize: 13, letterSpacing: "0.08em",
            }}>
              {t("تأكيد الاشتراك", "CONFIRM MEMBERSHIP")}
            </button>
          ) : (
            <button onClick={onClose} style={{
              flex: 1, padding: "14px", background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
              color: BG, border: "none", fontWeight: 700, cursor: "pointer",
              fontFamily: body, fontSize: 13, letterSpacing: "0.08em",
            }}>
              {t("إغلاق", "CLOSE")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
