"use client";

import { X, Minus, Plus, ShieldCheck, Navigation, Users, Car as CarIcon, Star, Clock, Wallet, CreditCard, Phone, Calendar, MapPin, Lock, CheckCircle2, Check, Copy, ChevronRight } from "lucide-react";
import { Car, WBooking } from "@/app/types/car";
import { useAppContext } from "@/app/contexts/AppContext";
import { useState } from "react";
import WDatePicker from "./WDatePicker";
import WTimePicker from "./WTimePicker";
import BookingField from "./BookingField";

const DARK = "#111827";
const MID_GRAY = "#6B7280";

interface BookingDialogProps {
  car: Car;
  onClose: () => void;
}

export default function BookingDialog({ car, onClose }: BookingDialogProps) {
  const { t, lang, accent, addBooking } = useAppContext();
  const ff   = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isAr = lang === "ar";
  const TOTAL_STEPS = 6;
  const [step, setStep]     = useState(1);
  const [done, setDone]     = useState(false);
  const [copied, setCopied] = useState(false);

  // Step 1
  const [rentalType, setRentalType] = useState<"daily"|"weekly"|"monthly">("daily");
  const [days, setDays]             = useState(3);

  // Step 2
  const [startDate,  setStartDate]  = useState("");
  const [endDate,    setEndDate]    = useState("");
  const [startTime,  setStartTime]  = useState("10:00");
  const [endTime,    setEndTime]    = useState("10:00");
  const [pickup,     setPickup]     = useState("riyadh");
  const [sameReturn, setSameReturn] = useState(true);
  const [returnLoc,  setReturnLoc]  = useState("riyadh");

  // Step 3
  const ADDONS = [
    { id: "insurance", Icon: ShieldCheck, priceDay: 150, ar: "تأمين شامل",         en: "Full Insurance",       descAr: "تغطية كاملة ضد الحوادث والسرقة",  descEn: "Full accident & theft coverage" },
    { id: "gps",       Icon: Navigation,  priceDay: 30,  ar: "نظام GPS",           en: "GPS Navigation",       descAr: "خريطة ذكية داخل السيارة",            descEn: "Smart in-car navigation" },
    { id: "babyseat",  Icon: Users,       priceDay: 40,  ar: "مقعد أطفال",         en: "Child Seat",           descAr: "مقعد معتمد لسلامة أطفالك",          descEn: "Certified child safety seat" },
    { id: "driver",    Icon: CarIcon,     priceDay: 200, ar: "سائق خاص",            en: "Private Driver",       descAr: "سائق محترف مدرّب في خدمتك",         descEn: "Trained professional driver" },
    { id: "clean",     Icon: Star,        priceDay: 0,   ar: "تنظيف مجاني عند التسليم", en: "Free Cleaning on Return", descAr: "غسيل وتلميع كامل مجاناً",      descEn: "Full wash & polish at no cost" },
  ];
  const [addons, setAddons] = useState<Record<string,boolean>>({
    insurance: false, gps: false, babyseat: false, driver: false, clean: false,
  });
  const toggleAddon = (id: string) => setAddons(p => ({ ...p, [id]: !p[id] }));

  // Step 4
  const [name,       setName]       = useState("");
  const [phone,      setPhone]      = useState("");
  const [email,      setEmail]      = useState("");
  const [nationalId, setNationalId] = useState("");
  const [license,    setLicense]    = useState("");
  const [errors,     setErrors]     = useState<Record<string,boolean>>({});

  // Step 5
  const [payMethod, setPayMethod] = useState<"cash"|"card"|"wallet">("cash");
  const [cardNum,   setCardNum]   = useState("");
  const [cardExp,   setCardExp]   = useState("");
  const [cardCVV,   setCardCVV]   = useState("");
  const [cardErr,   setCardErr]   = useState<Record<string,boolean>>({});

  // Step 6 + ref
  const [agreed] = useState(true);
  const [refNum]  = useState(() => `DN-${Math.floor(100000 + Math.random() * 900000)}`);

  const locations = [
    { id: "riyadh",  ar: "الرياض",    en: "Riyadh"    },
    { id: "jeddah",  ar: "جدة",       en: "Jeddah"    },
    { id: "dammam",  ar: "الدمام",    en: "Dammam"    },
    { id: "makkah",  ar: "مكة",       en: "Makkah"    },
    { id: "madinah", ar: "المدينة",   en: "Madinah"   },
    { id: "airport", ar: "المطار",    en: "Airport"   },
  ];
  const pickupLabel = locations.find(l => l.id === pickup) ?? locations[0];
  const returnLabel = locations.find(l => l.id === returnLoc) ?? locations[0];

  // Pricing
  const addonPrices: Record<string,number> = { insurance: 150, gps: 30, babyseat: 40, driver: 200, clean: 0 };
  const addonsTotal = Object.entries(addons)
    .filter(([_, v]) => v)
    .reduce((sum, [k]) => sum + (addonPrices[k] * (k === "clean" ? 0 : days)), 0);
  const baseTotal   = car.pricePerDay * days;
  const grandTotal  = baseTotal + addonsTotal;

  const validateStep4 = () => {
    const errs: Record<string,boolean> = {};
    if (!name.trim())                            errs.name       = true;
    if (!phone.trim() || phone.length < 8)       errs.phone      = true;
    if (!email.trim() || !email.includes("@"))   errs.email      = true;
    if (!nationalId.trim())                      errs.nationalId = true;
    if (!license.trim())                         errs.license    = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep5 = () => {
    if (payMethod !== "card") return true;
    const errs: Record<string,boolean> = {};
    if (cardNum.replace(/\s/g,"").length < 16)   errs.cardNum = true;
    if (!cardExp.includes("/"))                  errs.cardExp = true;
    if (cardCVV.length < 3)                      errs.cardCVV = true;
    setCardErr(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 4 && !validateStep4()) return;
    if (step === 5 && !validateStep5()) return;
    if (step === TOTAL_STEPS) { handleConfirm(); return; }
    setStep(s => s + 1);
  };

  const handleConfirm = () => {
    const addonList = Object.entries(addons).filter(([_, v]) => v).map(([k]) => {
      const a = ADDONS.find(x => x.id === k);
      return a ? (isAr ? a.ar : a.en) : k;
    });
    const booking: WBooking = {
      ref: refNum,
      carNameAr: car.name.ar, carNameEn: car.name.en,
      carImage: car.image, pricePerDay: car.pricePerDay,
      days, addonsTotal, total: grandTotal,
      startDate, endDate,
      pickupAr: pickupLabel.ar, pickupEn: pickupLabel.en,
      addons: addonList,
      renterName: name, renterPhone: phone, renterEmail: email,
      payment: payMethod,
      status: "active",
      createdAt: new Date().toISOString(),
    };
    addBooking(booking);
    setDone(true);
  };

  const copyRef = () => {
    navigator.clipboard.writeText(refNum).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  };
   const F = (props: { id: string; labelAr: string; labelEn: string; value: string; onChange: (v:string)=>void; type?: string; errMap?: Record<string,boolean>; }) => {
    const isCardField = !!props.errMap;
    return (
      <BookingField
        id={props.id} labelAr={props.labelAr} labelEn={props.labelEn}
        value={props.value} onChange={props.onChange} type={props.type}
        errors={isCardField ? cardErr : errors}
        setErrors={isCardField ? setCardErr : setErrors}
        accent={accent} ff={ff}
      />
    );
  };

  const stepTitles = [
    { ar: "مدة الإيجار",          en: "Rental Duration"   },
    { ar: "التواريخ والموقع",      en: "Dates & Location"  },
    { ar: "الإضافات",              en: "Add-ons"           },
    { ar: "بيانات المستأجر",       en: "Renter Info"       },
    { ar: "طريقة الدفع",           en: "Payment Method"    },
    { ar: "مراجعة وتأكيد",         en: "Review & Confirm"  },
  ];
  
  return (
   <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.78)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff, padding: 8 }}>
      <div style={{ background: "#fff", width: "min(600px,96vw)", boxShadow: "0 48px 96px rgba(0,0,0,0.45)", borderRadius: 22, display: "flex", flexDirection: "column" }}>

        {/* ── Header ── */}
        {!done && (
          <div style={{ padding: "16px 24px 0", direction: isAr ? "rtl" : "ltr" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>{t("حجز جديد", "NEW BOOKING")}</span>
                </div>
                <h2 style={{ margin: 0, fontSize: 19, fontWeight: 900, color: DARK, letterSpacing: "-0.03em" }}>{t(stepTitles[step-1].ar, stepTitles[step-1].en)}</h2>
                <p style={{ margin: "3px 0 0", fontSize: 12, color: MID_GRAY }}>{t(car.name.ar, car.name.en)} · {car.pricePerDay.toLocaleString()} {t("ج.م/يوم","EGP/day")}</p>
              </div>
              <button onClick={onClose} style={{ background: "#F3F4F6", border: "none", cursor: "pointer", color: "#6B7280", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", flexShrink: 0 }}>
                <X size={16} />
              </button>
            </div>

            {/* Progress */}
            <div style={{ display: "flex", gap: 3, marginBottom: 6 }}>
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div key={i} style={{ flex: 1, height: 3, borderRadius: 3, background: i + 1 <= step ? accent : "#E5E7EB", transition: "background 0.35s" }} />
              ))}
            </div>
            <p style={{ fontSize: 10, color: MID_GRAY, margin: "0 0 24px", letterSpacing: "0.06em" }}>
              {t(`الخطوة ${step} من ${TOTAL_STEPS}`, `Step ${step} of ${TOTAL_STEPS}`)}
            </p>
          </div>
        )}

        {/* ── Body ── */}
        <div style={{ padding: done ? "0" : "0 32px", flex: 1 }}>

          {/* ── STEP 1: Duration ── */}
          {!done && step === 1 && (
            <div style={{ direction: isAr ? "rtl" : "ltr" }}>
              {/* Rental type tabs */}
              <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>{t("نوع الإيجار","Rental Type")}</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 24, background: "#F3F4F6", borderRadius: 10, padding: 4 }}>
                {([{ id:"daily",ar:"يومي",en:"Daily" },{ id:"weekly",ar:"أسبوعي",en:"Weekly" },{ id:"monthly",ar:"شهري",en:"Monthly" }] as const).map(rt => (
                  <button key={rt.id} onClick={() => { setRentalType(rt.id); if (rt.id === "weekly") setDays(7); if (rt.id === "monthly") setDays(30); if (rt.id === "daily") setDays(3); }}
                    style={{ flex: 1, padding: "9px 0", border: "none", background: rentalType === rt.id ? "#fff" : "transparent", color: rentalType === rt.id ? DARK : MID_GRAY, fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: ff, borderRadius: 7, boxShadow: rentalType === rt.id ? "0 2px 8px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s" }}>
                    {t(rt.ar, rt.en)}
                  </button>
                ))}
              </div>

              {/* Days stepper */}
              <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>{t("عدد الأيام","Number of Days")}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 6 }}>
                <button onClick={() => setDays(d => Math.max(1, d-1))} style={{ width: 40, height: 40, borderRadius: 10, border: `1.5px solid #E5E7EB`, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = accent} onMouseLeave={e => e.currentTarget.style.borderColor = "#E5E7EB"}>
                  <Minus size={16} color={DARK} />
                </button>
                <span style={{ fontSize: 28, fontWeight: 900, color: DARK, letterSpacing: "-0.04em", minWidth: 48, textAlign: "center" }}>{days}</span>
                <button onClick={() => setDays(d => Math.min(60, d+1))} style={{ width: 40, height: 40, borderRadius: 10, border: `1.5px solid #E5E7EB`, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = accent} onMouseLeave={e => e.currentTarget.style.borderColor = "#E5E7EB"}>
                  <Plus size={16} color={DARK} />
                </button>
                <input type="range" min={1} max={60} value={days} onChange={e => setDays(Number(e.target.value))} style={{ flex: 1, accentColor: accent }} />
              </div>
              <p style={{ margin: "0 0 20px", fontSize: 12, color: MID_GRAY }}>{t(`${days} يوم = ٪ سعر مميز`, `${days} days = competitive rate`)}</p>

              {/* Cost preview */}
              <div style={{ background: `${accent}08`, border: `1.5px solid ${accent}22`, borderRadius: 12, padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ margin: "0 0 2px", fontSize: 12, color: MID_GRAY }}>{t("التكلفة الأساسية","Base Cost")}</p>
                    <p style={{ margin: 0, fontSize: 12, color: MID_GRAY }}>{car.pricePerDay.toLocaleString()} × {days} {t("يوم","days")}</p>
                  </div>
                  <span style={{ fontSize: 24, fontWeight: 900, color: accent, letterSpacing: "-0.04em" }}>{baseTotal.toLocaleString()} <span style={{ fontSize: 12, fontWeight: 500 }}>{t("ج.م","EGP")}</span></span>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Dates & Location ── */}
          {!done && step === 2 && (
            <div style={{ direction: isAr ? "rtl" : "ltr" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>{t("تواريخ الإيجار","Rental Dates")}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <WDatePicker value={startDate} onChange={setStartDate} label={t("تاريخ الاستلام","Pickup Date")} accent={accent} ff={ff} />
                <WDatePicker value={endDate} onChange={setEndDate} label={t("تاريخ التسليم","Return Date")} accent={accent} ff={ff} />
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>{t("توقيت الاستلام والتسليم","Pickup & Return Time")}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <WTimePicker value={startTime} onChange={setStartTime} label={t("وقت الاستلام","Pickup Time")} accent={accent} ff={ff} />
                <WTimePicker value={endTime} onChange={setEndTime} label={t("وقت التسليم","Return Time")} accent={accent} ff={ff} />
              </div>

              <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>{t("موقع الاستلام","Pickup Location")}</p>
              <select value={pickup} onChange={e => setPickup(e.target.value)} style={{ width: "100%", padding: "11px 13px", border: "1.5px solid #E5E7EB", outline: "none", fontSize: 14, fontFamily: ff, borderRadius: 8, background: "#FAFAFA", marginBottom: 16, cursor: "pointer" }}>
                {locations.map(l => <option key={l.id} value={l.id}>{t(l.ar, l.en)}</option>)}
              </select>

              {/* Same return toggle */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: "#F9FAFB", borderRadius: 10, border: "1.5px solid #F3F4F6", marginBottom: 16 }}>
                <div onClick={() => setSameReturn(p => !p)} style={{ width: 42, height: 24, borderRadius: 12, background: sameReturn ? accent : "#D1D5DB", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                  <div style={{ position: "absolute", top: 2, left: sameReturn ? 20 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }} />
                </div>
                <span style={{ fontSize: 13, color: DARK, fontWeight: 600 }}>{t("التسليم في نفس موقع الاستلام","Return to same location")}</span>
              </div>

              {!sameReturn && (
                <>
                  <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>{t("موقع التسليم","Return Location")}</p>
                  <select value={returnLoc} onChange={e => setReturnLoc(e.target.value)} style={{ width: "100%", padding: "11px 13px", border: "1.5px solid #E5E7EB", outline: "none", fontSize: 14, fontFamily: ff, borderRadius: 8, background: "#FAFAFA", cursor: "pointer" }}>
                    {locations.map(l => <option key={l.id} value={l.id}>{t(l.ar, l.en)}</option>)}
                  </select>
                </>
              )}

              <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: `${accent}08`, border: `1px solid ${accent}22`, borderRadius: 8 }}>
                <Clock size={13} color={accent} />
                <span style={{ fontSize: 12, color: "#374151" }}>{t("يمكن تغيير التاريخ مجاناً قبل ٢٤ ساعة من الاستلام.","Free date change up to 24h before pickup.")}</span>
              </div>
            </div>
          )}

          {/* ── STEP 3: Add-ons ── */}
          {!done && step === 3 && (
            <div style={{ direction: isAr ? "rtl" : "ltr" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>{t("الإضافات الاختيارية","Optional Add-ons")}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {ADDONS.map(a => {
                  const on = addons[a.id];
                  return (
                    <div key={a.id} onClick={() => toggleAddon(a.id)}
                      style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, border: `1.5px solid ${on ? accent : "#E5E7EB"}`, background: on ? `${accent}06` : "#FAFAFA", cursor: "pointer", transition: "all 0.18s" }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: on ? accent : "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.18s" }}>
                        <a.Icon size={16} color={on ? "#fff" : MID_GRAY} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: DARK }}>{t(a.ar, a.en)}</p>
                        <p style={{ margin: "2px 0 0", fontSize: 12, color: MID_GRAY }}>{t(a.descAr, a.descEn)}</p>
                      </div>
                      <div style={{ textAlign: "end", flexShrink: 0 }}>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: a.priceDay === 0 ? "#10B981" : accent }}>
                          {a.priceDay === 0 ? t("مجاناً","Free") : `+${(a.priceDay * days).toLocaleString()} ${t("ج.م","EGP")}`}
                        </p>
                        {a.priceDay > 0 && <p style={{ margin: 0, fontSize: 10, color: MID_GRAY }}>{a.priceDay} {t("ج.م/يوم","EGP/day")}</p>}
                      </div>
                      <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${on ? accent : "#D1D5DB"}`, background: on ? accent : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.18s" }}>
                        {on && <Check size={11} color="#fff" />}
                      </div>
                    </div>
                  );
                })}
              </div>
              {addonsTotal > 0 && (
                <div style={{ background: `${accent}08`, border: `1.5px solid ${accent}22`, borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: MID_GRAY }}>{t("إجمالي الإضافات","Add-ons Total")}</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: accent }}>{addonsTotal.toLocaleString()} {t("ج.م","EGP")}</span>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 4: Renter Info ── */}
          {!done && step === 4 && (
            <div style={{ direction: isAr ? "rtl" : "ltr" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>{t("بيانات المستأجر","Renter Information")}</p>
              {F({ id:"name",       labelAr:"الاسم الكامل",       labelEn:"Full Name"        , value:name,       onChange:setName       })}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
                {F({ id:"phone",     labelAr:"رقم الجوال",         labelEn:"Phone Number"     , value:phone,      onChange:setPhone,      type:"tel"   })}
                {F({ id:"email",     labelAr:"البريد الإلكتروني",  labelEn:"Email Address"    , value:email,      onChange:setEmail,      type:"email" })}
                {F({ id:"nationalId",labelAr:"رقم الهوية الوطنية", labelEn:"National ID"      , value:nationalId, onChange:setNationalId })}
                {F({ id:"license",   labelAr:"رقم رخصة القيادة",   labelEn:"Driver's License" , value:license,    onChange:setLicense    })}
              </div>
            </div>
          )}

          {/* ── STEP 5: Payment ── */}
          {!done && step === 5 && (
            <div style={{ direction: isAr ? "rtl" : "ltr" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>{t("اختر طريقة الدفع","Choose Payment Method")}</p>

              {([
                { id: "cash",   Icon: Wallet,     ar: "الدفع عند الاستلام", en: "Cash on Delivery",  descAr: "ادفع نقداً عند استلام السيارة",    descEn: "Pay cash when you pick up the car" },
                { id: "card",   Icon: CreditCard, ar: "بطاقة ائتمان",       en: "Credit / Debit Card", descAr: "فيزا، ماستركارد أو مدى",          descEn: "Visa, Mastercard or Mada" },
                { id: "wallet", Icon: Phone,      ar: "محفظة رقمية",        en: "Digital Wallet",    descAr: "Apple Pay، STC Pay، أو Tabby",      descEn: "Apple Pay, STC Pay, or Tabby" },
              ] as const).map(pm => {
                const on = payMethod === pm.id;
                return (
                  <div key={pm.id} onClick={() => setPayMethod(pm.id)}
                    style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, border: `1.5px solid ${on ? accent : "#E5E7EB"}`, background: on ? `${accent}06` : "#FAFAFA", cursor: "pointer", transition: "all 0.18s", marginBottom: 8 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: on ? accent : "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.18s" }}>
                      <pm.Icon size={16} color={on ? "#fff" : MID_GRAY} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: DARK }}>{t(pm.ar, pm.en)}</p>
                      <p style={{ margin: "2px 0 0", fontSize: 12, color: MID_GRAY }}>{t(pm.descAr, pm.descEn)}</p>
                    </div>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${on ? accent : "#D1D5DB"}`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "border-color 0.18s" }}>
                      {on && <div style={{ width: 10, height: 10, borderRadius: "50%", background: accent }} />}
                    </div>
                  </div>
                );
              })}

              {payMethod === "card" && (
                <div style={{ marginTop: 16, padding: "18px 16px", background: "#F9FAFB", borderRadius: 12, border: "1.5px solid #E5E7EB" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>{t("بيانات البطاقة","Card Details")}</p>
                  {F({ id:"cardNum", labelAr:"رقم البطاقة",    labelEn:"Card Number",   value:cardNum, onChange:v => setCardNum(v.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim().slice(0,19)), errMap:cardErr })}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {F({ id:"cardExp", labelAr:"الصلاحية MM/YY", labelEn:"Expiry MM/YY", value:cardExp, onChange:v => { const d = v.replace(/\D/g,""); setCardExp(d.length > 2 ? d.slice(0,2)+"/"+d.slice(2,4) : d); }, errMap:cardErr })}
                    {F({ id:"cardCVV", labelAr:"رمز الأمان CVV",  labelEn:"CVV",          value:cardCVV, onChange:v => setCardCVV(v.replace(/\D/g,"").slice(0,3)), type:"password", errMap:cardErr })}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                    <Lock size={12} color={MID_GRAY} />
                    <span style={{ fontSize: 11, color: MID_GRAY }}>{t("بياناتك مشفرة بالكامل","Your data is fully encrypted")}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 6: Review & Confirm ── */}
          {!done && step === 6 && (
            <div style={{ direction: isAr ? "rtl" : "ltr" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>{t("ملخص الحجز الكامل","Complete Booking Summary")}</p>

              {/* Car row */}
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 18, padding: "14px 16px", background: "#F9FAFB", borderRadius: 12, border: "1.5px solid #F3F4F6" }}>
                <img src={car.image} alt="" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                <div>
                  <p style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 800, color: DARK }}>{t(car.name.ar, car.name.en)}</p>
                  <p style={{ margin: 0, fontSize: 12, color: MID_GRAY }}>{car.pricePerDay.toLocaleString()} {t("ج.م/يوم","EGP/day")} · {days} {t("يوم","days")}</p>
                </div>
              </div>

              {/* Summary rows */}
              {[
                { icon: <Calendar size={13}/>, label: { ar:"التواريخ", en:"Dates" },         value: startDate && endDate ? `${startDate} (${startTime}) → ${endDate} (${endTime})` : t("لم يحدد","Not set") },
                { icon: <MapPin size={13}/>,    label: { ar:"الاستلام", en:"Pickup" },        value: t(pickupLabel.ar, pickupLabel.en) },
                { icon: <Users size={13}/>,     label: { ar:"المستأجر", en:"Renter" },        value: name || "—" },
                { icon: <Phone size={13}/>,     label: { ar:"الجوال", en:"Phone" },           value: phone || "—" },
                { icon: <CreditCard size={13}/>,label: { ar:"الدفع", en:"Payment" },          value: payMethod === "cash" ? t("الدفع عند الاستلام","Cash on Delivery") : payMethod === "card" ? t("بطاقة ائتمان","Credit Card") : t("محفظة رقمية","Digital Wallet") },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #F3F4F6" }}>
                  <span style={{ color: accent, flexShrink: 0 }}>{row.icon}</span>
                  <span style={{ fontSize: 13, color: MID_GRAY, minWidth: 80 }}>{t(row.label.ar, row.label.en)}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: DARK, [isAr ? "marginRight" : "marginLeft"]: "auto", textAlign: "end" }}>{row.value}</span>
                </div>
              ))}

              {/* Add-ons selected */}
              {Object.values(addons).some(Boolean) && (
                <div style={{ padding: "10px 0", borderBottom: "1px solid #F3F4F6", display: "flex", gap: 10 }}>
                  <span style={{ color: accent, flexShrink: 0 }}><Star size={13} /></span>
                  <span style={{ fontSize: 13, color: MID_GRAY, minWidth: 80 }}>{t("الإضافات","Add-ons")}</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, [isAr ? "marginRight" : "marginLeft"]: "auto", justifyContent: "flex-end" }}>
                    {ADDONS.filter(a => addons[a.id]).map(a => (
                      <span key={a.id} style={{ fontSize: 11, padding: "2px 8px", background: `${accent}15`, color: accent, borderRadius: 4, fontWeight: 600 }}>{t(a.ar, a.en)}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Total */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0 4px", marginTop: 4 }}>
                <div>
                  <p style={{ margin: "0 0 2px", fontSize: 12, color: MID_GRAY }}>{t("الإجمالي الكامل","Grand Total")}</p>
                  {addonsTotal > 0 && <p style={{ margin: 0, fontSize: 11, color: MID_GRAY }}>{baseTotal.toLocaleString()} + {addonsTotal.toLocaleString()} {t("ج.م إضافات","EGP add-ons")}</p>}
                </div>
                <span style={{ fontSize: 26, fontWeight: 900, color: accent, letterSpacing: "-0.04em" }}>{grandTotal.toLocaleString()} <span style={{ fontSize: 13, fontWeight: 500 }}>{t("ج.م","EGP")}</span></span>
              </div>

              {/* Notice */}
              <div style={{ marginTop: 16, display: "flex", gap: 8, padding: "12px 14px", background: `${accent}08`, border: `1px solid ${accent}22`, borderRadius: 8 }}>
                <ShieldCheck size={14} color={accent} style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ margin: 0, fontSize: 12, color: "#374151", lineHeight: 1.6 }}>
                  {t("بالتأكيد تقر بأن جميع البيانات صحيحة وتوافق على الشروط والأحكام.", "By confirming, you certify all information is correct and agree to the terms.")}
                </p>
              </div>
            </div>
          )}

          {/* ── SUCCESS ── */}
          {done && (
            <div style={{ direction: isAr ? "rtl" : "ltr", padding: "0 20px" }}>
              <div style={{ textAlign: "center", padding: "28px 0 24px" }}>
                <div style={{ width: 72, height: 72, background: `${accent}15`, border: `2px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", borderRadius: "50%" }}>
                  <CheckCircle2 size={36} color={accent} />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: DARK, margin: "0 0 8px", letterSpacing: "-0.03em" }}>{t("تم تأكيد حجزك! 🎉","Booking Confirmed! 🎉")}</h3>
                <p style={{ fontSize: 14, color: MID_GRAY, margin: "0 0 24px", lineHeight: 1.7 }}>
                  {t("سيتواصل معك فريقنا خلال ٣٠ دقيقة لتأكيد كل التفاصيل.","Our team will contact you within 30 minutes to confirm all details.")}
                </p>

                {/* Booking ref */}
                <div style={{ background: "#F9FAFB", border: "1.5px solid #E5E7EB", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
                  <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase" }}>{t("رقم الحجز","Booking Reference")}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <span style={{ fontSize: 22, fontWeight: 900, color: accent, letterSpacing: "0.04em", fontFamily: "'Inter',sans-serif" }}>{refNum}</span>
                    <button onClick={copyRef} title={t("نسخ","Copy")} style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "#10B981" : MID_GRAY, padding: 4, display: "flex" }}>
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  {copied && <p style={{ margin: "4px 0 0", fontSize: 11, color: "#10B981" }}>{t("تم النسخ!","Copied!")}</p>}
                </div>

                {/* Key info */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
                  {[
                    { icon: <CarIcon size={13}/>, label: t("السيارة","Car"), value: t(car.name.ar, car.name.en) },
                    { icon: <Clock size={13}/>, label: t("المدة","Duration"), value: `${days} ${t("يوم","days")}` },
                    { icon: <MapPin size={13}/>, label: t("الاستلام","Pickup"), value: t(pickupLabel.ar, pickupLabel.en) },
                    { icon: <CreditCard size={13}/>, label: t("الإجمالي","Total"), value: `${grandTotal.toLocaleString()} ${t("ج.م","EGP")}` },
                  ].map((item, i) => (
                    <div key={i} style={{ textAlign: "start", background: "#F9FAFB", borderRadius: 8, padding: "10px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3, color: accent }}>{item.icon}<span style={{ fontSize: 10, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.08em", textTransform: "uppercase" }}>{item.label}</span></div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: DARK }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={onClose}
                  style={{ flex: 1, padding: "14px", background: accent, color: "#fff", border: "none", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: ff, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "opacity 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  <CheckCircle2 size={15} /> {t("تم بنجاح — إغلاق","Done — Close")}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer Buttons (not shown on success) ── */}
        {!done && (
          <div style={{ padding: "10px 32px 28px", display: "flex", gap: 10, borderTop: "1px solid #F3F4F6", direction: isAr ? "rtl" : "ltr" }}>
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)}
                style={{ flex: 1, padding: "12px", border: `1.5px solid #E5E7EB`, background: "#fff", color: DARK, fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: ff, borderRadius: 9, transition: "border-color 0.18s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = accent}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#E5E7EB"}>
                {t("السابق","Back")}
              </button>
            )}
            <button onClick={handleNext}
              style={{ flex: 2, padding: "12px", background: accent, color: "#fff", border: "none", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: ff, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              {step === TOTAL_STEPS ? <>{t("تأكيد الحجز","Confirm Booking")} <CheckCircle2 size={14} /></> : <>{t("التالي","Next")} <ChevronRight size={14} style={{ transform: isAr ? "scaleX(-1)" : "none" }} /></>}
            </button>
          </div>
        )}
      </div>
    </div>



  );
}