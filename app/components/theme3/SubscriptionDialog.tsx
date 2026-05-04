import { useAppContext } from "@/app/contexts/AppContext";
import { BG2, BG3, GOLD, TXT, TXT_DIM, useFonts } from "@/app/themes/theme2/page";
import { RED, TXT_MUTED } from "@/app/themes/theme3/page";
import { Trophy, X, Check } from "lucide-react";
import { useState } from "react";

export default function SubscriptionDialog({ plan, onClose }: { plan: any; onClose: () => void }) {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [step, setStep] = useState(1);
  const [payMethod, setPayMethod] = useState("full");
  const [installment, setInstallment] = useState(0);
  const price = parseInt(plan.price.en.replace(/,/g, ""));

  const installPlans = [
    { ar: "دفعتان — 50% الآن + 50% بعد شهر", en: "2 Payments — 50% now + 50% in 1 month", pct: 50 },
    { ar: "3 دفعات — 35% الآن + الباقي على دفعتين", en: "3 Payments — 35% now + rest in 2", pct: 35 },
    { ar: "6 دفعات — 20% الآن + الباقي على 5 أشهر", en: "6 Payments — 20% now + rest in 5", pct: 20 },
  ];

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: body }}>
      <div onClick={e => e.stopPropagation()} style={{ background: BG2, borderRadius: 4, width: "min(540px, 95vw)", maxHeight: "90vh", overflow: "auto", border: `1px solid ${RED}30` }}>
        {/* Header */}
        <div style={{ padding: "24px 28px 16px", borderBottom: `1px solid ${TXT}08`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, background: RED, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Trophy size={16} color="#fff" />
            </div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: TXT, fontFamily: heading, letterSpacing: "0.05em" }}>{t("اشتراك العضوية", "MEMBERSHIP")}</h3>
          </div>
          <button onClick={onClose} style={{ background: BG3, border: "none", borderRadius: 4, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X size={16} color={TXT_DIM} />
          </button>
        </div>

        {/* Step indicators */}
        <div style={{ display: "flex", padding: "16px 28px", gap: 8 }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= step ? RED : `${TXT}15`, transition: "all 0.4s" }} />
          ))}
        </div>

        {/* Plan info */}
        <div style={{ margin: "0 28px 20px", background: BG3, borderRadius: 4, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", borderLeft: `3px solid ${RED}` }}>
          <div>
            <p style={{ margin: 0, fontWeight: 800, color: TXT, fontSize: 14, fontFamily: heading }}>{t(plan.name.ar, plan.name.en)}</p>
            <p style={{ margin: 0, color: TXT_MUTED, fontSize: 12, fontFamily: body }}>{t(`خصم ${plan.discount} على كل الحجوزات`, `${plan.discount} off all bookings`)}</p>
          </div>
          <p style={{ margin: 0, color: GOLD, fontSize: 16, fontWeight: 800, fontFamily: heading }}>{t(plan.price.ar, plan.price.en)} {t("جنيه/شهر", "EGP/mo")}</p>
        </div>

        <div style={{ padding: "0 28px 28px" }}>
          {/* Step 1: Confirm plan */}
          {step === 1 && (
            <div>
              <p style={{ fontWeight: 800, color: TXT, marginBottom: 16, fontSize: 14, fontFamily: heading, letterSpacing: "0.05em" }}>{t("تأكيد بيانات العضوية", "CONFIRM MEMBERSHIP")}</p>
              {[
                { label: t("الاسم", "NAME"), placeholder: t("اكتب اسمك", "Your name") },
                { label: t("البريد الإلكتروني", "EMAIL"), placeholder: t("بريدك الإلكتروني", "your@email.com") },
                { label: t("رقم الهاتف", "PHONE"), placeholder: t("رقم هاتفك", "Your phone number") },
              ].map((f, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: TXT_MUTED, marginBottom: 6, letterSpacing: "0.12em", fontFamily: heading }}>{f.label}</label>
                  <input placeholder={f.placeholder} style={{
                    width: "100%", padding: "12px 14px", borderRadius: 4, background: BG3,
                    border: `1px solid ${TXT}12`, fontSize: 14, outline: "none",
                    boxSizing: "border-box", fontFamily: body, color: TXT, transition: "border-color 0.2s",
                  }}
                    onFocus={e => { e.currentTarget.style.borderColor = RED; }}
                    onBlur={e => { e.currentTarget.style.borderColor = `${TXT}12`; }} />
                </div>
              ))}
              <div style={{ background: `${RED}10`, borderRadius: 4, padding: "16px 18px", borderLeft: `3px solid ${RED}`, marginTop: 8 }}>
                <p style={{ margin: 0, fontSize: 11, color: TXT_MUTED, fontWeight: 600, letterSpacing: "0.1em", fontFamily: heading }}>{t("الإجمالي الشهري", "MONTHLY TOTAL")}</p>
                <p style={{ margin: "4px 0 0", fontSize: 28, fontWeight: 900, color: GOLD, fontFamily: heading }}>{t(plan.price.ar, plan.price.en)} <span style={{ fontSize: 14, color: TXT_DIM }}>{t("جنيه/شهر", "EGP/mo")}</span></p>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div>
              <p style={{ fontWeight: 800, color: TXT, marginBottom: 16, fontSize: 14, fontFamily: heading, letterSpacing: "0.05em" }}>{t("طريقة الدفع", "PAYMENT METHOD")}</p>
              {[
                ["full", t("الدفع الكامل", "Pay Full"), t("ادفع المبلغ كاملاً الآن", "Pay the full amount now")],
                ["installment", t("التقسيط", "Installments"), t("قسّط المبلغ على دفعات", "Split into payments")],
              ].map(([v, label, desc]) => (
                <div key={v} onClick={() => setPayMethod(v)} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "16px 18px",
                  borderRadius: 4, border: `1px solid ${payMethod === v ? RED : TXT + "15"}`,
                  background: payMethod === v ? `${RED}10` : "transparent",
                  marginBottom: 10, cursor: "pointer", transition: "all 0.2s",
                }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${payMethod === v ? RED : TXT_MUTED}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {payMethod === v && <div style={{ width: 10, height: 10, borderRadius: "50%", background: RED }} />}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, color: TXT, fontSize: 14 }}>{label}</p>
                    <p style={{ margin: 0, fontSize: 12, color: TXT_MUTED }}>{desc}</p>
                  </div>
                </div>
              ))}
              {payMethod === "installment" && (
                <div style={{ marginTop: 16 }}>
                  <p style={{ fontWeight: 700, color: TXT_DIM, marginBottom: 10, fontSize: 13 }}>{t("اختر خطة التقسيط:", "Choose installment plan:")}</p>
                  {installPlans.map((ip, i) => (
                    <div key={i} onClick={() => setInstallment(i)} style={{
                      padding: "14px 16px", borderRadius: 4,
                      border: `1px solid ${installment === i ? RED : TXT + "15"}`,
                      background: installment === i ? `${RED}08` : "transparent",
                      marginBottom: 8, cursor: "pointer",
                    }}>
                      <p style={{ margin: 0, fontWeight: 600, color: TXT, fontSize: 13 }}>{t(ip.ar, ip.en)}</p>
                      <p style={{ margin: "4px 0 0", fontSize: 12, color: RED, fontWeight: 700 }}>
                        {t("الدفعة الأولى:", "First payment:")} {Math.round(price * ip.pct / 100).toLocaleString()} {t("جنيه", "EGP")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%", background: "rgba(34,197,94,0.12)",
                border: "3px solid #22C55E", display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px",
              }}>
                <Check size={40} color="#22C55E" />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: GOLD, marginBottom: 8, fontFamily: heading }}>{t("تم الاشتراك بنجاح!", "SUBSCRIPTION CONFIRMED!")}</h3>
              <p style={{ color: TXT_DIM, fontSize: 14, marginBottom: 20, fontFamily: body }}>{t("مرحباً بك في عائلة SpeedX Racing! سنتواصل معك قريباً.", "Welcome to the SpeedX Racing family! We'll contact you shortly.")}</p>
              <div style={{ background: BG3, borderRadius: 4, padding: "16px", textAlign: "start" }}>
                {[
                  [t("رقم العضوية", "Member #"), `SPX-M${Math.floor(Math.random() * 90000 + 10000)}`],
                  [t("الباقة", "Plan"), t(plan.name.ar, plan.name.en)],
                  [t("الخصم", "Discount"), plan.discount],
                  [t("الاشتراك الشهري", "Monthly"), `${t(plan.price.ar, plan.price.en)} ${t("جنيه", "EGP")}`],
                ].map(([k, v], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? `1px solid ${TXT}08` : "none" }}>
                    <span style={{ fontSize: 13, color: TXT_MUTED }}>{k}</span>
                    <span style={{ fontSize: 13, color: TXT, fontWeight: 700 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            {step > 1 && step < 3 && (
              <button onClick={() => setStep(s => s - 1)} style={{
                flex: 1, padding: "12px", borderRadius: 4,
                border: `1px solid ${TXT}20`, background: "transparent", color: TXT,
                fontWeight: 700, cursor: "pointer", fontFamily: heading, fontSize: 12, letterSpacing: "0.08em",
              }}>{t("رجوع", "BACK")}</button>
            )}
            {step < 3 ? (
              <button onClick={() => setStep(s => s + 1)} style={{
                flex: 2, padding: "13px", borderRadius: 4, background: RED, color: "#fff",
                border: "none", fontWeight: 800, cursor: "pointer", fontFamily: heading,
                fontSize: 13, letterSpacing: "0.08em",
              }}>
                {step === 2 ? t("تأكيد الاشتراك", "CONFIRM SUBSCRIPTION") : t("التالي", "NEXT")}
              </button>
            ) : (
              <button onClick={onClose} style={{
                flex: 1, padding: "13px", borderRadius: 4, background: RED, color: "#fff",
                border: "none", fontWeight: 800, cursor: "pointer", fontFamily: heading,
                fontSize: 13, letterSpacing: "0.08em",
              }}>{t("تم", "DONE")}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}