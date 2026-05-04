import { cars } from "@/app/data/carDate";
import { BG2, BG } from "@/app/themes/theme2/page";
import { INP, W, TX, P, AMB, BD, TX3, GRN, TX2 } from "@/app/themes/theme7/page";
import { ShieldCheck, Radio, Baby, UserCheck, X, Star, Users, Settings, Fuel, BadgeCheck, ArrowLeft, ArrowRight, Calendar, MapPinned, IdCard, Package, Check, Wallet, CreditCard, CircleDollarSign, Banknote, Smartphone, Shield, FileText } from "lucide-react";
import { useState } from "react";

export default function BookingModal({ car, onClose, isRTL, t, h, b, mode = "car", planName }: {
  car: typeof cars[0] | null; onClose: () => void; isRTL: boolean;
  t: (ar: string, en: string) => string; h: string; b: string;
  mode?: "car" | "sub"; planName?: string;
}) {
  const [step, setStep] = useState(0);
  const [payType, setPayType] = useState<"full" | "installment">("full");
  const [payMethod, setPayMethod] = useState("card");
  const [instMonths, setInstMonths] = useState(3);
  const [durationType, setDurationType] = useState(0);
  const [extras, setExtras] = useState<string[]>([]);
  const inp = INP(b);

  const toggleExtra = (id: string) => setExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const steps = mode === "car"
    ? [
      { ar: "التفاصيل", en: "Details" },
      { ar: "التاريخ والموقع", en: "Date & Location" },
      { ar: "البيانات الشخصية", en: "Personal Info" },
      { ar: "الإضافات", en: "Add-ons" },
      { ar: "الدفع", en: "Payment" },
      { ar: "التأكيد", en: "Confirmation" },
    ]
    : [
      { ar: "تفاصيل الباقة", en: "Plan Details" },
      { ar: "البيانات الشخصية", en: "Personal Info" },
      { ar: "الدفع", en: "Payment" },
      { ar: "التأكيد", en: "Confirmation" },
    ];

  const price = car ? car.pricePerDay : 0;
  const extrasData = [
    { id: "insurance", ar: "تأمين شامل", en: "Full Insurance", price: 50, icon: <ShieldCheck size={18} /> },
    { id: "gps", ar: "نظام GPS", en: "GPS System", price: 25, icon: <Radio size={18} /> },
    { id: "child", ar: "كرسي أطفال", en: "Child Seat", price: 30, icon: <Baby size={18} /> },
    { id: "driver", ar: "سائق خاص", en: "Private Driver", price: 200, icon: <UserCheck size={18} /> },
  ];
  const extrasTotal = extrasData.filter(e => extras.includes(e.id)).reduce((s, e) => s + e.price, 0);
  const totalDaily = price + extrasTotal;
  const monthlyInst = instMonths > 0 ? Math.ceil((totalDaily * 30) / instMonths) : 0;

  if (!car && mode === "car") return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9990,
      background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, animation: "t7fi 0.3s",
    }} onClick={onClose}>
      <div style={{
        background: W, borderRadius: 28, width: "100%", maxWidth: 900,
        maxHeight: "92vh", overflow: "auto", boxShadow: "0 30px 100px rgba(0,0,0,0.25)",
      }} onClick={e => e.stopPropagation()}>

        {/* Modal Hero */}
        {mode === "car" && car && (
          <div style={{ position: "relative", height: 220 }}>
            <img src={car.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "28px 28px 0 0" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 20%, rgba(17,24,39,0.8))", borderRadius: "28px 28px 0 0" }} />
            <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X size={18} color={TX} />
            </button>
            <div style={{ position: "absolute", bottom: 20, left: 28, right: 28, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", fontFamily: h }}>{t(car.name.ar, car.name.en)}</h2>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ background: `${P}`, color: "#fff", padding: "5px 14px", borderRadius: 30, fontSize: 11, fontWeight: 700 }}>{car.year}</span>
                <span style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "#fff", padding: "5px 14px", borderRadius: 30, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  <Star size={11} fill={AMB} color={AMB} /> {car.rating}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Sub header */}
        {mode === "sub" && (
          <div style={{ padding: "24px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: TX, fontFamily: h }}>{t("اشتراك باقة", "Subscribe to Plan")} {planName}</h2>
            <button onClick={onClose} style={{ width: 38, height: 38, borderRadius: "50%", background: BG2, border: `1px solid ${BD}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} color={TX3} /></button>
          </div>
        )}

        {/* Step indicators */}
        <div style={{ padding: "18px 28px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div onClick={() => { if (i <= step) setStep(i); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: i <= step ? "pointer" : "default" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: i <= step ? P : BG2,
                  color: i <= step ? "#fff" : TX3,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, transition: "all 0.3s",
                  boxShadow: i === step ? `0 3px 12px ${P}30` : "none",
                }}>{i + 1}</div>
                <span style={{ fontSize: 10, fontWeight: 600, color: i <= step ? P : TX3, marginTop: 5, fontFamily: h, whiteSpace: "nowrap" }}>{t(s.ar, s.en)}</span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: mode === "car" ? 40 : 60, height: 2, background: i < step ? P : BD, margin: "0 3px", marginBottom: 18, borderRadius: 2, transition: "all 0.3s" }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ padding: "20px 28px 28px" }}>

          {/* ═══ CAR MODE STEPS ═══ */}
          {mode === "car" && step === 0 && car && (
            <div style={{ animation: "t7fi 0.3s" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
                {[
                  { ar: "المقاعد", en: "Seats", val: car.seats, icon: <Users size={16} /> },
                  { ar: "ناقل الحركة", en: "Trans.", val: t(car.transmission.ar, car.transmission.en), icon: <Settings size={16} /> },
                  { ar: "الوقود", en: "Fuel", val: t(car.fuel.ar, car.fuel.en), icon: <Fuel size={16} /> },
                  { ar: "التقييم", en: "Rating", val: car.rating, icon: <Star size={16} /> },
                ].map((sp, si) => (
                  <div key={si} style={{ background: BG, borderRadius: 14, padding: "16px 12px", textAlign: "center", border: `1px solid ${BD}` }}>
                    <div style={{ color: P, marginBottom: 6, display: "flex", justifyContent: "center" }}>{sp.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: TX, fontFamily: h }}>{sp.val}</div>
                    <div style={{ fontSize: 10, color: TX3 }}>{t(sp.ar, sp.en)}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderRadius: 16, background: `${P}04`, border: `1.5px solid ${P}12`, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 11, color: TX3, marginBottom: 3 }}>{t("السعر اليومي", "Daily Price")}</div>
                  <span style={{ fontSize: 28, fontWeight: 900, color: P, fontFamily: h }}>{car.pricePerDay}</span>
                  <span style={{ fontSize: 13, color: TX3 }}> {t("ج.م / يوم", "EGP / day")}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, color: GRN, fontSize: 12, fontWeight: 700, background: `${GRN}10`, padding: "6px 14px", borderRadius: 30 }}>
                  <BadgeCheck size={14} /> {t("متاحة", "Available")}
                </div>
              </div>
              <button onClick={() => setStep(1)} style={{ width: "100%", padding: "14px", borderRadius: 14, background: P, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: h, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {t("ابدأ الحجز", "Start Booking")} {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </button>
            </div>
          )}

          {mode === "car" && step === 1 && (
            <div style={{ animation: "t7fi 0.3s" }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: TX, fontFamily: h, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><Calendar size={18} color={P} />{t("التاريخ والموقع", "Date & Location")}</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("تاريخ الاستلام", "Pickup Date")} *</label><input type="date" style={inp} /></div>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("تاريخ الإرجاع", "Return Date")} *</label><input type="date" style={inp} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("وقت الاستلام", "Pickup Time")}</label><input type="time" style={inp} /></div>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("وقت الإرجاع", "Return Time")}</label><input type="time" style={inp} /></div>
              </div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("المدة", "Duration")}</label>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {[{ ar: "يومي", en: "Daily" }, { ar: "أسبوعي", en: "Weekly" }, { ar: "شهري", en: "Monthly" }].map((d, di) => (
                  <button key={di} onClick={() => setDurationType(di)} style={{
                    flex: 1, padding: "11px", borderRadius: 12,
                    background: durationType === di ? P : W, color: durationType === di ? "#fff" : TX2,
                    border: durationType === di ? "none" : `1.5px solid ${BD}`,
                    fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: h,
                  }}>{t(d.ar, d.en)}</button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 5 }}><MapPinned size={12} style={{ display: "inline", marginRight: 4 }} />{t("موقع الاستلام", "Pickup Location")} *</label>
                  <select style={{ ...inp, appearance: "none" as const }}>
                    <option>{t("وسط البلد - القاهرة", "Downtown - Cairo")}</option>
                    <option>{t("مدينة نصر", "Nasr City")}</option>
                    <option>{t("المعادي", "Maadi")}</option>
                    <option>{t("الشيخ زايد", "Sheikh Zayed")}</option>
                    <option>{t("مطار القاهرة", "Cairo Airport")}</option>
                  </select>
                </div>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 5 }}><MapPinned size={12} style={{ display: "inline", marginRight: 4 }} />{t("موقع الإرجاع", "Return Location")}</label>
                  <select style={{ ...inp, appearance: "none" as const }}>
                    <option>{t("نفس موقع الاستلام", "Same as pickup")}</option>
                    <option>{t("وسط البلد - القاهرة", "Downtown - Cairo")}</option>
                    <option>{t("مدينة نصر", "Nasr City")}</option>
                    <option>{t("مطار القاهرة", "Cairo Airport")}</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(0)} style={{ flex: 1, padding: "13px", borderRadius: 14, background: "transparent", color: TX2, border: `1.5px solid ${BD}`, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: h }}>{t("رجوع", "Back")}</button>
                <button onClick={() => setStep(2)} style={{ flex: 2, padding: "13px", borderRadius: 14, background: P, color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: h, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  {t("التالي", "Next")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                </button>
              </div>
            </div>
          )}

          {/* Personal Info — shared for car step 2 and sub step 1 */}
          {((mode === "car" && step === 2) || (mode === "sub" && step === 1)) && (
            <div style={{ animation: "t7fi 0.3s" }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: TX, fontFamily: h, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><IdCard size={18} color={P} />{t("البيانات الشخصية", "Personal Information")}</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("الاسم الأول", "First Name")} *</label><input style={inp} placeholder={t("محمد", "Mohammed")} /></div>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("اسم العائلة", "Last Name")} *</label><input style={inp} placeholder={t("أحمد", "Ahmed")} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("رقم الهاتف", "Phone Number")} *</label><input type="tel" style={inp} placeholder="+20 1XX XXX XXXX" /></div>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("البريد الإلكتروني", "Email")} *</label><input type="email" style={inp} placeholder="you@email.com" /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("الرقم القومي", "National ID")} *</label><input style={inp} placeholder={t("XXXXXXXXXXXXXX", "XXXXXXXXXXXXXX")} /></div>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("رقم رخصة القيادة", "License Number")} *</label><input style={inp} placeholder={t("XXXXXXXXXX", "XXXXXXXXXX")} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 12 }}>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("العنوان", "Address")}</label><input style={inp} placeholder={t("شارع ...", "Street ...")} /></div>
                <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("المدينة", "City")}</label>
                  <select style={{ ...inp, appearance: "none" as const }}>
                    <option>{t("القاهرة", "Cairo")}</option>
                    <option>{t("الإسكندرية", "Alexandria")}</option>
                    <option>{t("الجيزة", "Giza")}</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("ملاحظات إضافية", "Additional Notes")}</label>
                <textarea rows={2} style={{ ...inp, resize: "none" as const }} placeholder={t("أي طلبات خاصة...", "Any special requests...")} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(step - 1)} style={{ flex: 1, padding: "13px", borderRadius: 14, background: "transparent", color: TX2, border: `1.5px solid ${BD}`, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: h }}>{t("رجوع", "Back")}</button>
                <button onClick={() => setStep(step + 1)} style={{ flex: 2, padding: "13px", borderRadius: 14, background: P, color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: h, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  {t("التالي", "Next")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                </button>
              </div>
            </div>
          )}

          {/* Add-ons — car step 3 only */}
          {mode === "car" && step === 3 && (
            <div style={{ animation: "t7fi 0.3s" }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: TX, fontFamily: h, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><Package size={18} color={P} />{t("الإضافات", "Add-ons")}</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                {extrasData.map(ex => {
                  const sel = extras.includes(ex.id);
                  return (
                    <div key={ex.id} onClick={() => toggleExtra(ex.id)} style={{
                      padding: 16, borderRadius: 16, cursor: "pointer",
                      background: sel ? `${P}06` : W,
                      border: `2px solid ${sel ? P : BD}`,
                      display: "flex", alignItems: "center", gap: 14, transition: "all 0.2s",
                    }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: sel ? `${P}12` : BG, color: sel ? P : TX3, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>{ex.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: TX, fontFamily: h }}>{t(ex.ar, ex.en)}</div>
                        <div style={{ fontSize: 12, color: P, fontWeight: 600 }}>+{ex.price} {t("ج.م/يوم", "EGP/day")}</div>
                      </div>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: sel ? P : BD, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {sel && <Check size={14} color="#fff" />}
                      </div>
                    </div>
                  );
                })}
              </div>
              {extras.length > 0 && (
                <div style={{ padding: "14px 18px", borderRadius: 14, background: `${P}04`, border: `1px solid ${P}12`, marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: TX2 }}>{t("إجمالي الإضافات", "Extras Total")}</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: P, fontFamily: h }}>+{extrasTotal} {t("ج.م/يوم", "EGP/day")}</span>
                </div>
              )}
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, padding: "13px", borderRadius: 14, background: "transparent", color: TX2, border: `1.5px solid ${BD}`, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: h }}>{t("رجوع", "Back")}</button>
                <button onClick={() => setStep(4)} style={{ flex: 2, padding: "13px", borderRadius: 14, background: P, color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: h, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  {t("التالي: الدفع", "Next: Payment")} {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                </button>
              </div>
            </div>
          )}

          {/* Payment — car step 4, sub step 2 */}
          {((mode === "car" && step === 4) || (mode === "sub" && step === 2)) && (
            <div style={{ animation: "t7fi 0.3s" }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: TX, fontFamily: h, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><Wallet size={18} color={P} />{t("الدفع", "Payment")}</h4>

              {/* Full vs Installment toggle */}
              <div style={{ display: "flex", gap: 8, marginBottom: 20, background: BG2, borderRadius: 14, padding: 4 }}>
                <button onClick={() => setPayType("full")} style={{
                  flex: 1, padding: "12px", borderRadius: 10,
                  background: payType === "full" ? W : "transparent",
                  color: payType === "full" ? P : TX2,
                  border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: h,
                  boxShadow: payType === "full" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}>
                  <CreditCard size={15} /> {t("دفع كامل", "Full Payment")}
                </button>
                <button onClick={() => setPayType("installment")} style={{
                  flex: 1, padding: "12px", borderRadius: 10,
                  background: payType === "installment" ? W : "transparent",
                  color: payType === "installment" ? P : TX2,
                  border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: h,
                  boxShadow: payType === "installment" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}>
                  <CircleDollarSign size={15} /> {t("تقسيط", "Installments")}
                </button>
              </div>

              {payType === "full" && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 18 }}>
                    {[
                      { id: "card", ar: "بطاقة ائتمان", en: "Credit Card", icon: <CreditCard size={18} /> },
                      { id: "cash", ar: "كاش عند الاستلام", en: "Cash on Pickup", icon: <Banknote size={18} /> },
                      { id: "wallet", ar: "محفظة إلكترونية", en: "E-Wallet", icon: <Smartphone size={18} /> },
                    ].map(pm => (
                      <div key={pm.id} onClick={() => setPayMethod(pm.id)} style={{
                        padding: 14, borderRadius: 14, cursor: "pointer", textAlign: "center",
                        background: payMethod === pm.id ? `${P}06` : W,
                        border: `2px solid ${payMethod === pm.id ? P : BD}`,
                        transition: "all 0.2s",
                      }}>
                        <div style={{ color: payMethod === pm.id ? P : TX3, marginBottom: 6, display: "flex", justifyContent: "center" }}>{pm.icon}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: TX, fontFamily: h }}>{t(pm.ar, pm.en)}</div>
                      </div>
                    ))}
                  </div>
                  {payMethod === "card" && (
                    <div style={{ background: BG, borderRadius: 14, padding: 16, marginBottom: 18, border: `1px solid ${BD}` }}>
                      <div style={{ marginBottom: 10 }}><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("رقم البطاقة", "Card Number")}</label><input placeholder="XXXX  XXXX  XXXX  XXXX" style={{ ...inp, background: W }} /></div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                        <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("الصلاحية", "Expiry")}</label><input placeholder="MM/YY" style={{ ...inp, background: W }} /></div>
                        <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: TX2, marginBottom: 5 }}>CVV</label><input placeholder="***" type="password" style={{ ...inp, background: W }} /></div>
                        <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("اسم حامل البطاقة", "Cardholder")}</label><input placeholder={t("الاسم", "Name")} style={{ ...inp, background: W }} /></div>
                      </div>
                    </div>
                  )}
                  {payMethod === "wallet" && (
                    <div style={{ background: BG, borderRadius: 14, padding: 16, marginBottom: 18, border: `1px solid ${BD}` }}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: TX2, marginBottom: 5 }}>{t("رقم المحفظة", "Wallet Number")}</label>
                      <input type="tel" placeholder="+20 1XX XXX XXXX" style={{ ...inp, background: W }} />
                    </div>
                  )}
                </>
              )}

              {payType === "installment" && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 18 }}>
                    {[3, 6, 12].map(m => (
                      <div key={m} onClick={() => setInstMonths(m)} style={{
                        padding: 16, borderRadius: 14, cursor: "pointer", textAlign: "center",
                        background: instMonths === m ? `${P}06` : W,
                        border: `2px solid ${instMonths === m ? P : BD}`,
                        transition: "all 0.2s",
                      }}>
                        <div style={{ fontSize: 22, fontWeight: 900, color: instMonths === m ? P : TX, fontFamily: h }}>{m}</div>
                        <div style={{ fontSize: 12, color: TX2 }}>{t("شهر", "months")}</div>
                        <div style={{ fontSize: 11, color: GRN, fontWeight: 700, marginTop: 4 }}>{t("0% فوائد", "0% interest")}</div>
                      </div>
                    ))}
                  </div>
                  {/* Installment breakdown */}
                  <div style={{ background: BG, borderRadius: 14, padding: 16, marginBottom: 18, border: `1px solid ${BD}` }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: TX, fontFamily: h, marginBottom: 12 }}>{t("تفاصيل التقسيط", "Installment Breakdown")}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${BD}` }}>
                      <span style={{ fontSize: 12, color: TX3 }}>{t("الإجمالي (30 يوم)", "Total (30 days)")}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: TX }}>{(totalDaily * 30).toLocaleString()} {t("ج.م", "EGP")}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${BD}` }}>
                      <span style={{ fontSize: 12, color: TX3 }}>{t("الدفعة الأولى (الآن)", "First Payment (now)")}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: P }}>{monthlyInst.toLocaleString()} {t("ج.م", "EGP")}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${BD}` }}>
                      <span style={{ fontSize: 12, color: TX3 }}>{t("الدفعات المتبقية", "Remaining Payments")}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: TX }}>{instMonths - 1} × {monthlyInst.toLocaleString()} {t("ج.م", "EGP")}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                      <span style={{ fontSize: 12, color: TX3 }}>{t("الفوائد", "Interest")}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: GRN }}>0%</span>
                    </div>
                  </div>
                  {/* Card info for installments */}
                  <div style={{ background: BG, borderRadius: 14, padding: 16, marginBottom: 18, border: `1px solid ${BD}` }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: TX2, marginBottom: 10 }}>{t("بيانات البطاقة للتقسيط", "Card Details for Installments")}</div>
                    <div style={{ marginBottom: 10 }}><input placeholder="XXXX  XXXX  XXXX  XXXX" style={{ ...inp, background: W }} /></div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                      <input placeholder="MM/YY" style={{ ...inp, background: W }} />
                      <input placeholder="CVV" type="password" style={{ ...inp, background: W }} />
                      <input placeholder={t("الاسم", "Name")} style={{ ...inp, background: W }} />
                    </div>
                  </div>
                </>
              )}

              {/* Summary box */}
              <div style={{ padding: "14px 18px", borderRadius: 14, background: `${P}04`, border: `1px solid ${P}12`, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: TX3 }}>{mode === "car" ? t("السيارة", "Car") : t("الباقة", "Plan")}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: TX }}>{mode === "car" && car ? t(car.name.ar, car.name.en) : planName}</span>
                </div>
                {mode === "car" && extras.length > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: TX3 }}>{t("الإضافات", "Add-ons")}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: TX }}>+{extrasTotal} {t("ج.م/يوم", "EGP/day")}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: `1px solid ${BD}`, marginTop: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: TX }}>{t("الإجمالي", "Total")}</span>
                  <span style={{ fontSize: 18, fontWeight: 900, color: P, fontFamily: h }}>
                    {payType === "installment" ? `${monthlyInst.toLocaleString()} ${t("ج.م/شهر", "EGP/mo")}` : `${totalDaily} ${t("ج.م/يوم", "EGP/day")}`}
                  </span>
                </div>
              </div>

              <label style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 18, cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ accentColor: P, marginTop: 3, width: 15, height: 15 }} />
                <span style={{ fontSize: 12, color: TX2, lineHeight: 1.6 }}>{t("أوافق على الشروط والأحكام وسياسة الإلغاء والاسترداد", "I agree to terms, conditions, cancellation and refund policy")}</span>
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(step - 1)} style={{ flex: 1, padding: "13px", borderRadius: 14, background: "transparent", color: TX2, border: `1.5px solid ${BD}`, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: h }}>{t("رجوع", "Back")}</button>
                <button onClick={() => setStep(step + 1)} style={{ flex: 2, padding: "13px", borderRadius: 14, background: P, color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: h, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Shield size={15} /> {t("تأكيد ودفع", "Confirm & Pay")}
                </button>
              </div>
            </div>
          )}

          {/* Confirmation — car step 5, sub step 3 */}
          {((mode === "car" && step === 5) || (mode === "sub" && step === 3)) && (
            <div style={{ animation: "t7fi 0.3s", textAlign: "center", padding: "16px 0" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 20px", background: `${GRN}12`, border: `3px solid ${GRN}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={40} color={GRN} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: TX, fontFamily: h, marginBottom: 6 }}>{t("تم الحجز بنجاح!", "Booking Confirmed!")}</h3>
              <p style={{ fontSize: 13, color: TX3, marginBottom: 24 }}>{t("ستصلك رسالة تأكيد على بريدك الإلكتروني ورقم هاتفك", "A confirmation will be sent to your email and phone")}</p>
              <div style={{ background: BG, borderRadius: 16, padding: 18, marginBottom: 20, border: `1px solid ${BD}`, textAlign: isRTL ? "right" : "left" }}>
                {[
                  { ar: mode === "car" ? "السيارة" : "الباقة", en: mode === "car" ? "Car" : "Plan", val: mode === "car" && car ? t(car.name.ar, car.name.en) : (planName || "") },
                  { ar: "رقم الحجز", en: "Booking #", val: "#CD-" + Math.floor(10000 + Math.random() * 90000) },
                  { ar: "طريقة الدفع", en: "Payment", val: payType === "installment" ? t(`تقسيط ${instMonths} شهر`, `${instMonths} month installments`) : t("دفع كامل", "Full Payment") },
                  { ar: "الإجمالي", en: "Total", val: payType === "installment" ? `${monthlyInst.toLocaleString()} ${t("ج.م/شهر", "EGP/mo")}` : `${totalDaily} ${t("ج.م/يوم", "EGP/day")}` },
                  { ar: "الحالة", en: "Status", val: t("مؤكد ✓", "Confirmed ✓") },
                ].map((item, ii) => (
                  <div key={ii} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: ii < 4 ? `1px solid ${BD}` : "none" }}>
                    <span style={{ fontSize: 12, color: TX3 }}>{t(item.ar, item.en)}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: ii === 4 ? GRN : TX }}>{item.val}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button style={{ padding: "12px 28px", borderRadius: 30, background: BG2, color: TX2, border: `1px solid ${BD}`, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: h, display: "flex", alignItems: "center", gap: 6 }}>
                  <FileText size={14} /> {t("تحميل الإيصال", "Download Receipt")}
                </button>
                <button onClick={onClose} style={{ padding: "12px 28px", borderRadius: 30, background: P, color: "#fff", border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: h }}>
                  {t("تم", "Done")}
                </button>
              </div>
            </div>
          )}

          {/* Sub mode: step 0 = plan details */}
          {mode === "sub" && step === 0 && (
            <div style={{ animation: "t7fi 0.3s", textAlign: "center", padding: "10px 0" }}>
              <div style={{ width: 60, height: 60, borderRadius: 18, background: `${P}08`, color: P, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}><Package size={28} /></div>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: TX, fontFamily: h, marginBottom: 6 }}>{t("باقة", "Plan")} {planName}</h3>
              <p style={{ fontSize: 13, color: TX3, marginBottom: 24 }}>{t("أكمل بياناتك لتفعيل الاشتراك", "Complete your info to activate subscription")}</p>
              <button onClick={() => setStep(1)} style={{ padding: "14px 40px", borderRadius: 14, background: P, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: h, display: "inline-flex", alignItems: "center", gap: 8 }}>
                {t("ابدأ الاشتراك", "Start Subscription")} {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}