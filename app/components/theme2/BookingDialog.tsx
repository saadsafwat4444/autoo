import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { BG, BG2, BG3, BG4, ffBody, GOLD, GOLD_D, SEC_BTN, SEC_BTN_BRD, SEC_BTN_TXT, TXT, TXT_DIM, useFonts } from "@/app/themes/theme2/page";
import { Crown, X, Users, Plane, Shield, Sparkles, Check, CreditCard, FileCheck, Copy, Lock } from "lucide-react";
import { useState } from "react";

export default function BookingDialog({ car, onClose }: { car: typeof cars[0]; onClose: () => void }) {
  const { t, lang } = useAppContext();
  const { heading, body, isAr } = useFonts();
  const [step, setStep] = useState(1);
  const [days, setDays] = useState(3);
  const [startDate, setStartDate] = useState("2026-04-15");
  const [endDate, setEndDate] = useState("2026-04-18");
  const [pickupLoc, setPickupLoc] = useState("");
  const [returnLoc, setReturnLoc] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:00");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [idNum, setIdNum] = useState("");
  const [payMethod, setPayMethod] = useState(0);
  const [addOns, setAddOns] = useState<number[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const total = car.pricePerDay * days;
  const addOnPrices = [200, 500, 150, 300];
  const addOnTotal = addOns.reduce((s, i) => s + addOnPrices[i], 0) * days;

  const refNum = `EL-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  const stepLabels = [
    t("تفاصيل الرحلة", "Trip Details"),
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
      <div style={{
        background: BG2, width: "min(600px,95vw)", maxHeight: "92vh", overflow: "auto",
        border: `1px solid ${GOLD}30`, padding: "40px 36px", position: "relative",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Crown size={18} color={GOLD} />
            <span style={{ fontSize: 10, color: GOLD, letterSpacing: "0.2em", fontWeight: 600 }}>ÉLITE BOOKING</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: TXT_DIM, transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = GOLD}
            onMouseLeave={e => e.currentTarget.style.color = TXT_DIM}>
            <X size={20} />
          </button>
        </div>

        <h2 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: heading }}>
          {t(car.name.ar, car.name.en)}
        </h2>

        {/* Step indicator */}
        {!confirmed && (
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

        {/* Step 1: Trip Details */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={labelStyle}>{t("تاريخ الاستلام", "PICKUP DATE")}</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>{t("تاريخ الإرجاع", "RETURN DATE")}</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={inputStyle} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={labelStyle}>{t("وقت الاستلام", "PICKUP TIME")}</label>
                <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>{t("وقت الإرجاع", "RETURN TIME")}</label>
                <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>{t("مكان الاستلام", "PICKUP LOCATION")}</label>
              <input value={pickupLoc} onChange={e => setPickupLoc(e.target.value)} placeholder={t("فندق، مطار، عنوان...", "Hotel, Airport, Address...")} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>{t("مكان الإرجاع", "RETURN LOCATION")}</label>
              <input value={returnLoc} onChange={e => setReturnLoc(e.target.value)} placeholder={t("نفس المكان", "Same location")} style={inputStyle} />
            </div>
            {/* Price */}
            <div style={{ background: BG3, border: `1px solid ${GOLD}25`, padding: 22, marginTop: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: TXT_DIM }}>{t("سعر اليوم", "Daily Rate")}</span>
                <span style={{ fontSize: 13, color: TXT }}>{car.pricePerDay.toLocaleString()} {t("جنيه", "EGP")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: TXT_DIM }}>{t("عدد الأيام", "Days")}</span>
                <span style={{ fontSize: 13, color: TXT }}>{days}</span>
              </div>
              <div style={{ height: 1, background: `${GOLD}20`, margin: "10px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: GOLD }}>{t("الإجمالي", "Total")}</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: GOLD }}>{total.toLocaleString()} {t("جنيه", "EGP")}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Add-ons */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ color: TXT_DIM, fontSize: 13, margin: "0 0 8px" }}>{t("اختر الإضافات المناسبة لتجربتك:", "Choose add-ons for your experience:")}</p>
            {[
              { ar: "سائق خاص", en: "Private Chauffeur", price: 200, icon: Users },
              { ar: "استقبال مطار VIP", en: "VIP Airport Pickup", price: 500, icon: Plane },
              { ar: "تأمين شامل بريميوم", en: "Premium Full Insurance", price: 150, icon: Shield },
              { ar: "باقة WiFi + شاحن", en: "WiFi + Charger Pack", price: 300, icon: Sparkles },
            ].map((addon, i) => {
              const selected = addOns.includes(i);
              return (
                <div
                  key={i}
                  onClick={() => setAddOns(selected ? addOns.filter(x => x !== i) : [...addOns, i])}
                  style={{
                    padding: "18px 20px", background: selected ? `${GOLD}10` : BG3,
                    border: `1px solid ${selected ? GOLD : GOLD + "25"}`,
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
                    transition: "all 0.25s",
                  }}
                >
                  <div style={{
                    width: 20, height: 20, border: `1.5px solid ${selected ? GOLD : GOLD + "50"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: selected ? GOLD : "transparent",
                  }}>
                    {selected && <Check size={12} color={BG} />}
                  </div>
                  <addon.icon size={18} color={selected ? GOLD : TXT_DIM} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 14, color: selected ? "#fff" : TXT, fontWeight: 600 }}>{t(addon.ar, addon.en)}</span>
                  </div>
                  <span style={{ fontSize: 13, color: GOLD, fontWeight: 700 }}>+{addon.price} {t("جنيه/يوم", "EGP/d")}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Step 3: Personal Info */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={labelStyle}>{t("الاسم الكامل", "FULL NAME")}</label>
                <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>{t("رقم الهاتف", "PHONE")}</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>{t("البريد الإلكتروني", "EMAIL")}</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>{t("رقم الهوية / جواز السفر", "ID / PASSPORT NUMBER")}</label>
              <input value={idNum} onChange={e => setIdNum(e.target.value)} style={inputStyle} />
            </div>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { ar: "بطاقة ائتمانية", en: "Credit Card", icon: CreditCard },
              { ar: "نقداً عند الاستلام", en: "Cash on Pickup", icon: FileCheck },
              { ar: "تحويل بنكي", en: "Bank Transfer", icon: Lock },
            ].map((m, i) => (
              <div
                key={i}
                onClick={() => setPayMethod(i)}
                style={{
                  padding: "18px 20px", background: payMethod === i ? `${GOLD}10` : BG3,
                  border: `1px solid ${payMethod === i ? GOLD : GOLD + "25"}`,
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
                  transition: "all 0.25s",
                }}
              >
                <div style={{
                  width: 20, height: 20, borderRadius: "50%",
                  border: `2px solid ${payMethod === i ? GOLD : GOLD + "50"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {payMethod === i && <div style={{ width: 10, height: 10, borderRadius: "50%", background: GOLD }} />}
                </div>
                <m.icon  size={18} color={payMethod === i ? GOLD : TXT_DIM} />
                <span style={{ fontSize: 14, color: payMethod === i ? "#fff" : TXT, fontWeight: 600 }}>
                  {t(m.ar, m.en)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Car */}
            <div style={{ display: "flex", gap: 16, padding: 18, background: BG3, border: `1px solid ${GOLD}20` }}>
              <img src={car.image} alt="" style={{ width: 100, height: 70, objectFit: "cover" }} />
              <div>
                <h4 style={{ margin: "0 0 4px", fontSize: 16, color: "#fff", fontWeight: 700 }}>{t(car.name.ar, car.name.en)}</h4>
                <span style={{ fontSize: 12, color: TXT_DIM }}>{car.year} · {car.seats} {t("مقاعد", "seats")}</span>
              </div>
            </div>
            {/* Details */}
            {[
              [t("المدة", "Duration"), `${days} ${t("أيام", "days")}`],
              [t("الاستلام", "Pickup"), `${startDate} — ${startTime}`],
              [t("الإرجاع", "Return"), `${endDate} — ${endTime}`],
              [t("الإضافات", "Add-ons"), addOns.length > 0 ? `${addOns.length} ${t("إضافة", "items")}` : t("لا يوجد", "None")],
              [t("الدفع", "Payment"), [t("بطاقة ائتمانية","Credit Card"), t("نقداً","Cash"), t("تحويل بنكي","Bank Transfer")][payMethod]],
            ].map(([k, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${GOLD}12` }}>
                <span style={{ fontSize: 13, color: TXT_DIM }}>{k}</span>
                <span style={{ fontSize: 13, color: TXT, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            {/* Total */}
            <div style={{ background: `${GOLD}10`, border: `1px solid ${GOLD}30`, padding: 20, marginTop: 8, textAlign: "center" }}>
              <span style={{ fontSize: 12, color: TXT_DIM, letterSpacing: "0.1em" }}>{t("الإجمالي النهائي", "GRAND TOTAL")}</span>
              <p style={{ margin: "8px 0 0", fontSize: 32, fontWeight: 900, color: GOLD, fontFamily: heading }}>
                {(total + addOnTotal).toLocaleString()} {t("جنيه", "EGP")}
              </p>
            </div>
          </div>
        )}

        {/* Step 6: Confirmation */}
        {step === 6 && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{
              width: 80, height: 80, margin: "0 auto 24px",
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Check size={36} color={BG} />
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: GOLD, margin: "0 0 8px", fontFamily: heading }}>
              {t("تم الحجز بنجاح", "Reservation Confirmed")}
            </h3>
            <p style={{ color: TXT_DIM, fontSize: 14, marginBottom: 24 }}>
              {t("فريقنا سيتواصل معك لتأكيد التفاصيل.", "Our concierge team will contact you shortly.")}
            </p>
            <div style={{ background: BG3, border: `1px solid ${GOLD}25`, padding: "16px 24px", display: "inline-flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 11, color: TXT_DIM, letterSpacing: "0.1em" }}>{t("رقم الحجز", "REF")}</span>
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
              flex: 2, padding: "14px",
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
              color: BG, border: "none", fontWeight: 700, cursor: "pointer",
              fontFamily: body, fontSize: 13, letterSpacing: "0.08em",
              transition: "box-shadow 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 16px ${GOLD}40`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = ""}>
              {t("التالي", "NEXT")}
            </button>
          ) : step === 5 ? (
            <button onClick={() => setStep(6)} style={{
              flex: 2, padding: "14px",
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
              color: BG, border: "none", fontWeight: 700, cursor: "pointer",
              fontFamily: body, fontSize: 13, letterSpacing: "0.08em",
            }}>
              {t("تأكيد الحجز", "CONFIRM RESERVATION")}
            </button>
          ) : (
            <button onClick={onClose} style={{
              flex: 1, padding: "14px",
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
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