import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { useFonts, BG, TXT, BG2, BG3 } from "@/app/themes/theme4/page";
import { BORDER, TXT3, BLUE, BLUE_BG, TXT2, NEUTRAL, GREEN } from "@/app/themes/theme4/page";
import { X, Check } from "lucide-react";
import { useState } from "react";

export default function BookingDialog({ car, onClose, subLabel }: { car: typeof cars[0]; onClose: () => void; subLabel?: string }) {
  const { t } = useAppContext();
  const { heading, body } = useFonts();
  const [step, setStep] = useState(1);
  const [days, setDays] = useState(3);
  const [durationType, setDurationType] = useState("daily");
  const [payMethod, setPayMethod] = useState("full");
  const [installment, setInstallment] = useState(0);
  const total = car.pricePerDay * days;

  const installPlans = [
    { ar: "دفعتان — 50% الآن + 50% لاحقاً", en: "2 Payments — 50% now + 50% later", pct: 50 },
    { ar: "3 دفعات — 35% الآن + الباقي", en: "3 Payments — 35% now + rest", pct: 35 },
    { ar: "6 دفعات — 20% الآن + الباقي", en: "6 Payments — 20% now + rest", pct: 20 },
  ];

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: BG, borderRadius: 20, width: "min(520px, 95vw)", maxHeight: "90vh", overflow: "auto" }}>
        {/* Header */}
        <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: TXT, fontFamily: heading }}>
            {subLabel || t("حجز السيارة", "Book Car")}
          </h3>
          <button onClick={onClose} style={{ background: BG2, border: "none", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X size={16} color={TXT3} />
          </button>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", padding: "16px 24px", gap: 8 }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: s <= step ? BLUE : BG2,
                color: s <= step ? "#fff" : TXT3,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, transition: "all 0.3s",
              }}>{s}</div>
              <div style={{ height: 3, width: "100%", borderRadius: 2, background: s <= step ? BLUE : BG3 }} />
            </div>
          ))}
        </div>

        {/* Car info */}
        <div style={{ margin: "0 24px 16px", background: BG2, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 14 }}>
          <img src={car.image} alt="" style={{ width: 60, height: 44, objectFit: "cover", borderRadius: 8 }} />
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 700, color: TXT, fontSize: 14, fontFamily: heading }}>{t(car.name.ar, car.name.en)}</p>
            <p style={{ margin: 0, color: TXT3, fontSize: 13 }}>{car.pricePerDay} {t("جنيه/يوم", "EGP/day")}</p>
          </div>
        </div>

        <div style={{ padding: "0 24px 24px" }}>
          {step === 1 && (
            <div>
              <p style={{ fontWeight: 700, color: TXT, marginBottom: 14, fontSize: 15, fontFamily: heading }}>{t("اختيار التاريخ والمدة", "Select Date & Duration")}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: TXT3, fontWeight: 500, marginBottom: 6 }}>{t("تاريخ الاستلام", "Pickup Date")}</label>
                  <input type="date" style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1.5px solid ${BORDER}`, fontSize: 14, outline: "none", boxSizing: "border-box", color: TXT, background: BG }}
                    onFocus={e => (e.currentTarget.style.borderColor = BLUE)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: TXT3, fontWeight: 500, marginBottom: 6 }}>{t("تاريخ الإرجاع", "Return Date")}</label>
                  <input type="date" style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1.5px solid ${BORDER}`, fontSize: 14, outline: "none", boxSizing: "border-box", color: TXT, background: BG }}
                    onFocus={e => (e.currentTarget.style.borderColor = BLUE)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {[
                  { id: "daily", ar: "يومي", en: "Daily" },
                  { id: "weekly", ar: "أسبوعي", en: "Weekly" },
                  { id: "monthly", ar: "شهري", en: "Monthly" },
                ].map(d => (
                  <button key={d.id} onClick={() => setDurationType(d.id)} style={{
                    flex: 1, padding: "10px", borderRadius: 8,
                    border: `1.5px solid ${durationType === d.id ? BLUE : BORDER}`,
                    background: durationType === d.id ? BLUE_BG : BG,
                    color: durationType === d.id ? BLUE : TXT3,
                    fontWeight: 600, cursor: "pointer", fontSize: 13, fontFamily: heading,
                  }}>{t(d.ar, d.en)}</button>
                ))}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: TXT2 }}>{t("عدد الأيام", "Days")}</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: BLUE, fontFamily: heading }}>{days}</span>
                </div>
                <input type="range" min={1} max={30} value={days} onChange={e => setDays(Number(e.target.value))}
                  style={{ width: "100%", accentColor: BLUE }} />
              </div>
              <div style={{ background: BLUE_BG, borderRadius: 12, padding: "16px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, color: TXT3 }}>{t("الإجمالي", "Total")}</span>
                  <span style={{ fontSize: 24, fontWeight: 800, color: TXT, fontFamily: heading }}>{total.toLocaleString()} <span style={{ fontSize: 13, fontWeight: 500, color: TXT3 }}>{t("جنيه", "EGP")}</span></span>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p style={{ fontWeight: 700, color: TXT, marginBottom: 14, fontSize: 15, fontFamily: heading }}>{t("طريقة الد��ع", "Payment Method")}</p>
              {[
                ["full", t("الدفع الكامل", "Pay Full"), t("ادفع المبلغ كاملاً الآن", "Pay the full amount now")],
                ["installment", t("التقسيط", "Installments"), t("قسّط المبلغ على دفعات", "Split into payments")],
              ].map(([v, label, desc]) => (
                <div key={v} onClick={() => setPayMethod(v)} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "16px",
                  borderRadius: 12, border: `1.5px solid ${payMethod === v ? BLUE : BORDER}`,
                  background: payMethod === v ? BLUE_BG : BG,
                  marginBottom: 10, cursor: "pointer", transition: "all 0.2s",
                }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${payMethod === v ? BLUE : NEUTRAL}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {payMethod === v && <div style={{ width: 12, height: 12, borderRadius: "50%", background: BLUE }} />}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, color: TXT, fontSize: 14 }}>{label}</p>
                    <p style={{ margin: 0, fontSize: 13, color: TXT3 }}>{desc}</p>
                  </div>
                </div>
              ))}
              {payMethod === "installment" && (
                <div style={{ marginTop: 14 }}>
                  {installPlans.map((plan, i) => (
                    <div key={i} onClick={() => setInstallment(i)} style={{
                      padding: "14px 16px", borderRadius: 10,
                      border: `1.5px solid ${installment === i ? BLUE : BORDER}`,
                      background: installment === i ? BLUE_BG : BG,
                      marginBottom: 8, cursor: "pointer",
                    }}>
                      <p style={{ margin: 0, fontWeight: 600, color: TXT, fontSize: 13 }}>{t(plan.ar, plan.en)}</p>
                      <p style={{ margin: "4px 0 0", fontSize: 12, color: BLUE, fontWeight: 600 }}>
                        {t("الدفعة الأولى:", "First payment:")} {Math.round(total * plan.pct / 100).toLocaleString()} {t("جنيه", "EGP")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%", background: "#DCFCE7",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px",
              }}>
                <Check size={36} color={GREEN} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: TXT, marginBottom: 6, fontFamily: heading }}>{t("تم الحجز بنجاح", "Booking Confirmed")}</h3>
              <p style={{ color: TXT3, fontSize: 14, marginBottom: 20 }}>{t("سنتواصل معك قريباً لتأكيد التفاصيل", "We'll contact you shortly to confirm details")}</p>
              <div style={{ background: BG2, borderRadius: 12, padding: "16px", textAlign: "start" }}>
                {[
                  [t("رقم الحجز", "Booking #"), `CD-${Math.floor(Math.random() * 90000 + 10000)}`],
                  [t("السيارة", "Car"), t(car.name.ar, car.name.en)],
                  [t("المدة", "Duration"), `${days} ${t("أيام", "days")}`],
                  [t("الإجمالي", "Total"), `${total.toLocaleString()} ${t("جنيه", "EGP")}`],
                ].map(([k, v], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? `1px solid ${BORDER}` : "none" }}>
                    <span style={{ fontSize: 13, color: TXT3 }}>{k}</span>
                    <span style={{ fontSize: 13, color: TXT, fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            {step > 1 && step < 3 && (
              <button onClick={() => setStep(s => s - 1)} style={{
                flex: 1, padding: "12px", borderRadius: 10,
                border: `1.5px solid ${BORDER}`, background: BG, color: TXT2,
                fontWeight: 600, cursor: "pointer", fontFamily: heading, fontSize: 14,
              }}>{t("رجوع", "Back")}</button>
            )}
            {step < 3 ? (
              <button onClick={() => setStep(s => s + 1)} style={{
                flex: 2, padding: "13px", borderRadius: 10, background: BLUE, color: "#fff",
                border: "none", fontWeight: 700, cursor: "pointer", fontFamily: heading, fontSize: 14,
                boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
              }}>
                {step === 2 ? t("تأكيد الحجز", "Confirm Booking") : t("التالي", "Next")}
              </button>
            ) : (
              <button onClick={onClose} style={{
                flex: 1, padding: "13px", borderRadius: 10, background: BLUE, color: "#fff",
                border: "none", fontWeight: 700, cursor: "pointer", fontFamily: heading, fontSize: 14,
              }}>{t("عرض حجوزاتي", "My Bookings")}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}