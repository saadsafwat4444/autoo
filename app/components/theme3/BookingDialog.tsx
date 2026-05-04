import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts, BG2, TXT, BG3, TXT_DIM, GOLD } from "@/app/themes/theme2/page";
import { sportsCars, RED, TXT_MUTED } from "@/app/themes/theme3/page";
import { Flag, X, Check } from "lucide-react";
import { useState } from "react";

export default function BookingDialog({ car, onClose }: { car: typeof sportsCars[0]; onClose: () => void }) {
  const { t } = useAppContext();
  const { heading, body } = useFonts();
  const [step, setStep] = useState(1);
  const [days, setDays] = useState(3);
  const [payMethod, setPayMethod] = useState("full");
  const [installment, setInstallment] = useState(0);
  const total = car.price * days;

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
              <Flag size={16} color="#fff" />
            </div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: TXT, fontFamily: heading, letterSpacing: "0.05em" }}>{t("حجز السيارة", "BOOK CAR")}</h3>
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

        {/* Car info */}
        <div style={{ margin: "0 28px 20px", background: BG3, borderRadius: 4, padding: "12px 16px", display: "flex", alignItems: "center", gap: 14, borderLeft: `3px solid ${RED}` }}>
          <img src={car.image} alt="" style={{ width: 64, height: 48, objectFit: "cover", borderRadius: 3 }} />
          <div>
            <p style={{ margin: 0, fontWeight: 800, color: TXT, fontSize: 14, fontFamily: heading }}>{t(car.name.ar, car.name.en)}</p>
            <p style={{ margin: 0, color: GOLD, fontSize: 13, fontWeight: 700 }}>{car.price.toLocaleString()} {t("جنيه/يوم", "EGP/day")}</p>
          </div>
        </div>

        <div style={{ padding: "0 28px 28px" }}>
          {/* Step 1: Date & Duration */}
          {step === 1 && (
            <div>
              <p style={{ fontWeight: 800, color: TXT, marginBottom: 16, fontSize: 14, fontFamily: heading, letterSpacing: "0.05em" }}>{t("اختر المدة", "SELECT DURATION")}</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {[
                  { ar: "يومي", en: "DAILY" }, { ar: "أسبوعي", en: "WEEKLY" }, { ar: "شهري", en: "MONTHLY" },
                ].map((l, i) => (
                  <button key={i} style={{
                    flex: 1, padding: "10px", borderRadius: 4,
                    border: `1px solid ${i === 0 ? RED : TXT + "20"}`,
                    background: i === 0 ? `${RED}15` : "transparent",
                    color: i === 0 ? RED : TXT_DIM, fontWeight: 700, cursor: "pointer",
                    fontSize: 11, fontFamily: heading, letterSpacing: "0.08em",
                  }}>{t(l.ar, l.en)}</button>
                ))}
              </div>
              <p style={{ fontWeight: 600, marginBottom: 10, fontSize: 14, color: TXT_DIM }}>
                {t("عدد الأيام:", "Days:")} <span style={{ color: GOLD, fontWeight: 900, fontSize: 18, fontFamily: heading }}>{days}</span>
              </p>
              <input type="range" min={1} max={30} value={days} onChange={e => setDays(Number(e.target.value))}
                style={{ width: "100%", accentColor: RED, marginBottom: 20 }} />
              <div style={{ background: `${RED}10`, borderRadius: 4, padding: "18px 20px", borderLeft: `3px solid ${RED}` }}>
                <p style={{ margin: 0, fontSize: 11, color: TXT_MUTED, fontWeight: 600, letterSpacing: "0.1em", fontFamily: heading }}>{t("الإجمالي", "TOTAL")}</p>
                <p style={{ margin: "4px 0 0", fontSize: 32, fontWeight: 900, color: GOLD, fontFamily: heading }}>{total.toLocaleString()} <span style={{ fontSize: 14, color: TXT_DIM }}>{t("جنيه", "EGP")}</span></p>
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
                  {installPlans.map((plan, i) => (
                    <div key={i} onClick={() => setInstallment(i)} style={{
                      padding: "14px 16px", borderRadius: 4,
                      border: `1px solid ${installment === i ? RED : TXT + "15"}`,
                      background: installment === i ? `${RED}08` : "transparent",
                      marginBottom: 8, cursor: "pointer",
                    }}>
                      <p style={{ margin: 0, fontWeight: 600, color: TXT, fontSize: 13 }}>{t(plan.ar, plan.en)}</p>
                      <p style={{ margin: "4px 0 0", fontSize: 12, color: RED, fontWeight: 700 }}>
                        {t("الدفعة الأولى:", "First payment:")} {Math.round(total * plan.pct / 100).toLocaleString()} {t("جنيه", "EGP")}
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
              <h3 style={{ fontSize: 22, fontWeight: 900, color: GOLD, marginBottom: 8, fontFamily: heading }}>{t("تم الحجز بنجاح!", "BOOKING CONFIRMED!")}</h3>
              <p style={{ color: TXT_DIM, fontSize: 14, marginBottom: 20, fontFamily: body }}>{t("سنتواصل معك قريباً لتأكيد كل التفاصيل.", "We'll contact you shortly to confirm all details.")}</p>
              <div style={{ background: BG3, borderRadius: 4, padding: "16px", textAlign: "start" }}>
                {[
                  [t("رقم الحجز", "Booking #"), `SPX-${Math.floor(Math.random() * 90000 + 10000)}`],
                  [t("السيارة", "Car"), t(car.name.ar, car.name.en)],
                  [t("المدة", "Duration"), `${days} ${t("أيام", "days")}`],
                  [t("الإجمالي", "Total"), `${total.toLocaleString()} ${t("جنيه", "EGP")}`],
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
                {step === 2 ? t("تأكيد الحجز", "CONFIRM BOOKING") : t("التالي", "NEXT")}
              </button>
            ) : (
              <button onClick={onClose} style={{
                flex: 1, padding: "13px", borderRadius: 4, background: RED, color: "#fff",
                border: "none", fontWeight: 800, cursor: "pointer", fontFamily: heading,
                fontSize: 13, letterSpacing: "0.08em",
              }}>{t("عرض حجوزاتي", "MY BOOKINGS")}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}