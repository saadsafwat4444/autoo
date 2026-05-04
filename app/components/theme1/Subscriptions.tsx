"use client";

import { useAppContext } from "@/app/contexts/AppContext";
import { DARK, MID_GRAY, PAD } from "@/app/themes/theme1/page";
import { useState } from "react";
import { Car, Star, Mountain, Zap, Lock, Calendar, CreditCard, Wallet, Phone, User, Mail, Building2, ShieldCheck, CheckCircle2, Tag, Check, X, ChevronRight } from "lucide-react";
import WDatePicker from "./WDatePicker";

export function Subscriptions() {
  const { t, lang, accent } = useAppContext();
  const ff   = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isAr = lang === "ar";
  const [hovered, setHovered] = useState<number | null>(null);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [subDialog, setSubDialog] = useState<{ planKey: string; planName: string; price: string; billing: string; features: { ar: string; en: string }[] } | null>(null);
  const [subStep, setSubStep] = useState(1);
  const [subDone, setSubDone] = useState(false);
  const [subCarPref, setSubCarPref] = useState<"any"|"economy"|"luxury"|"suv"|"sports">("any");
  const [subStartDate, setSubStartDate] = useState("");
  const [subName, setSubName] = useState("");
  const [subPhone, setSubPhone] = useState("");
  const [subEmail, setSubEmail] = useState("");
  const [subNationalId, setSubNationalId] = useState("");
  const [subCompany, setSubCompany] = useState("");
  const [subErrors, setSubErrors] = useState<Record<string,boolean>>({});
  const [subPayMethod, setSubPayMethod] = useState<"cash"|"card"|"wallet">("card");
  const [subCardNum, setSubCardNum] = useState("");
  const [subCardExp, setSubCardExp] = useState("");
  const [subCardCVV, setSubCardCVV] = useState("");
  const [subCardErr, setSubCardErr] = useState<Record<string,boolean>>({});
  const [subRef] = useState(() => `SUB-${Math.floor(100000 + Math.random() * 900000)}`);

  const plans = [
    {
      key: "basic",
      nameAr: "أساسي",  nameEn: "Basic",
      badge: null,
      monthlyAr: "4,500", monthlyEn: "4,500",
      yearlyAr:  "3,800", yearlyEn:  "3,800",
      unit: { ar: "جنيه / شهر", en: "EGP / mo" },
      desc: { ar: "للاستخدام الفردي المنتظم", en: "For regular individual use" },
      features: [
        { ar: "8 رحلات شهرياً",          en: "8 trips per month" },
        { ar: "سيارات اقتصادية وعائلية", en: "Economy & family cars" },
        { ar: "تأمين شامل مشمول",        en: "Full insurance included" },
        { ar: "دعم هاتفي 24/7",           en: "24/7 phone support" },
        { ar: "خصم 10% على الإضافات",    en: "10% off on add-ons" },
      ],
      unavailable: [
        { ar: "سيارات فاخرة ورياضية",    en: "Luxury & sports cars" },
        { ar: "سائق مجاني",              en: "Free chauffeur" },
      ],
    },
    {
      key: "pro",
      nameAr: "برو",  nameEn: "Pro",
      badge: { ar: "الأكثر طلباً", en: "Most Popular" },
      monthlyAr: "8,900", monthlyEn: "8,900",
      yearlyAr:  "7,500", yearlyEn:  "7,500",
      unit: { ar: "جنيه / شهر", en: "EGP / mo" },
      desc: { ar: "للمستخدم المتقدم والمحترف", en: "For the advanced professional user" },
      features: [
        { ar: "20 رحلة شهرياً",            en: "20 trips per month" },
        { ar: "جميع الفئات مشمولة",        en: "All car categories included" },
        { ar: "تأمين شامل + تغطية إضافية", en: "Full insurance + extra coverage" },
        { ar: "دعم VIP 24/7",               en: "VIP 24/7 support" },
        { ar: "خصم 20% على الإضافات",      en: "20% off on add-ons" },
        { ar: "استلام وتوصيل مجاني",       en: "Free pickup & delivery" },
      ],
      unavailable: [
        { ar: "سائق مجاني",                en: "Free chauffeur" },
      ],
    },
    {
      key: "elite",
      nameAr: "إيليت", nameEn: "Elite",
      badge: null,
      monthlyAr: "18,000", monthlyEn: "18,000",
      yearlyAr:  "15,000", yearlyEn:  "15,000",
      unit: { ar: "جنيه / شهر", en: "EGP / mo" },
      desc: { ar: "تجربة لا محدودة بدون أي قيود", en: "Unlimited experience with no restrictions" },
      features: [
        { ar: "رحلات غير محدودة",           en: "Unlimited trips" },
        { ar: "أسطول فاخر كامل",            en: "Full luxury fleet" },
        { ar: "تأمين شامل ومميّز",           en: "Premium comprehensive insurance" },
        { ar: "مدير حساب مخصص",            en: "Dedicated account manager" },
        { ar: "خصم 30% على جميع الإضافات", en: "30% off all add-ons" },
        { ar: "استلام وتوصيل مجاني",        en: "Free pickup & delivery" },
        { ar: "سائق مجاني 8 مرات/شهر",     en: "Free chauffeur 8×/month" },
      ],
      unavailable: [],
    },
  ];

  return (
    <section id="w-pricing" style={{ background: "#fff", padding: PAD, fontFamily: ff, direction: isAr ? "rtl" : "ltr" }}>
      <style>{`.wsub-card { transition: transform 0.28s, box-shadow 0.28s; } .wsub-card:hover { transform: translateY(-6px); }`}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <div style={{   marginBottom: 56 }}>
          <div style={{ display: "flex", gap: 12,alignItems:"center",  marginBottom: 16 }}>
            <div style={{ width: 24, height: 2, background: accent, borderRadius: 2 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              {t("الباقات", "Plans")}
            </span>
            <div style={{ width: 24, height: 2, background: accent, borderRadius: 2 }} />
          </div>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900, color: DARK, letterSpacing: "-0.04em", margin: "0 0 12px", lineHeight: 1 }}>
            {t("اشترك. وفّر. انطلق.", "Subscribe. Save. Drive.")}
          </h2>
          <p style={{ fontSize: 16, color: MID_GRAY, margin: "0 0 32px" }}>
            {t("باقات شهرية مرنة تناسب كل أسلوب حياة", "Flexible monthly plans to match every lifestyle")}
          </p>

          {/* Billing toggle */}
          <div style={{ display: "inline-flex", background: "#F3F4F6", borderRadius: 12, padding: 4, gap: 4 }}>
            <button
              onClick={() => setBilling("monthly")}
              style={{
                padding: "8px 22px", borderRadius: 9, fontSize: 13, fontWeight: 700, border: "none",
                cursor: "pointer", fontFamily: ff, transition: "all 0.2s",
                background: billing === "monthly" ? "#fff" : "transparent",
                color: billing === "monthly" ? DARK : MID_GRAY,
                boxShadow: billing === "monthly" ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
              }}
            >{t("شهري", "Monthly")}</button>
            <button
              onClick={() => setBilling("yearly")}
              style={{
                padding: "8px 22px", borderRadius: 9, fontSize: 13, fontWeight: 700, border: "none",
                cursor: "pointer", fontFamily: ff, transition: "all 0.2s", display: "flex", alignItems: "center", gap: 7,
                background: billing === "yearly" ? "#fff" : "transparent",
                color: billing === "yearly" ? DARK : MID_GRAY,
                boxShadow: billing === "yearly" ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
              }}
            >
              {t("سنوي", "Yearly")}
              <span style={{ fontSize: 10, fontWeight: 800, background: accent, color: "#fff", padding: "2px 7px", borderRadius: 20 }}>
                {t("وفّر 15%", "Save 15%")}
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "start" }}>
          {plans.map((plan, i) => {
            const isPro = plan.key === "pro";
            const price = billing === "monthly"
              ? t(plan.monthlyAr, plan.monthlyEn)
              : t(plan.yearlyAr, plan.yearlyEn);
            return (
              <div
                key={plan.key}
                className="wsub-card"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative", borderRadius: 20, overflow: "hidden",
                  border: isPro ? `2px solid ${accent}` : "1.5px solid rgba(0,0,0,0.08)",
                  background: isPro ? `linear-gradient(135deg, ${DARK} 0%, #162D54 100%)` : "#FAFBFC",
                  boxShadow: isPro ? `0 8px 40px ${accent}22` : hovered === i ? "0 12px 36px rgba(0,0,0,0.08)" : "none",
                  padding: "36px 32px 32px",
                  textAlign: isAr ? "right" : "left",
                }}
              >
                {plan.badge && (
                  <div style={{ position: "absolute", top: 0, [isAr ? "left" : "right"]: 0 }}>
                    <div style={{ background: accent, color: "#fff", fontSize: 10, fontWeight: 800, padding: "6px 18px", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: isAr ? "20px 0 0 20px" : "0 20px 20px 0" }}>
                      {t(plan.badge.ar, plan.badge.en)}
                    </div>
                  </div>
                )}

                <div style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: isPro ? accent : MID_GRAY, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                    {t(plan.nameAr, plan.nameEn)}
                  </span>
                </div>
                <p style={{ margin: "0 0 24px", fontSize: 13, color: isPro ? "rgba(255,255,255,0.5)" : MID_GRAY }}>
                  {t(plan.desc.ar, plan.desc.en)}
                </p>

                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexDirection: isAr ? "row-reverse" : "row" }}>
                    <span style={{ fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 900, color: isPro ? "#fff" : DARK, letterSpacing: "-0.04em", lineHeight: 1 }}>
                      {price}
                    </span>
                    <span style={{ fontSize: 12, color: isPro ? "rgba(255,255,255,0.45)" : MID_GRAY, fontWeight: 500 }}>
                      {t(plan.unit.ar, plan.unit.en)}
                    </span>
                  </div>
                  {billing === "yearly" && (
                    <p style={{ margin: "6px 0 0", fontSize: 11, color: isPro ? "rgba(255,255,255,0.4)" : "#9CA3AF" }}>
                      {t("مُدفوع سنوياً", "Billed annually")}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSubDialog({ planKey: plan.key, planName: t(plan.nameAr, plan.nameEn), price, billing: t(billing === "monthly" ? "شهري" : "سنوي", billing === "monthly" ? "Monthly" : "Yearly"), features: plan.features });
                    setSubStep(1); setSubDone(false); setSubCarPref("any"); setSubStartDate(""); setSubName(""); setSubPhone(""); setSubEmail(""); setSubNationalId(""); setSubCompany(""); setSubErrors({}); setSubPayMethod("card"); setSubCardNum(""); setSubCardExp(""); setSubCardCVV(""); setSubCardErr({});
                  }}
                  style={{
                    width: "100%", padding: "13px 0", borderRadius: 11, fontSize: 14, fontWeight: 800,
                    cursor: "pointer", fontFamily: ff, marginBottom: 28, border: "none", transition: "opacity 0.2s",
                    background: isPro ? accent : "transparent",
                    color: isPro ? "#fff" : DARK,
                    boxShadow: isPro ? `0 4px 18px ${accent}44` : "none",
                    outline: isPro ? "none" : "1.5px solid rgba(0,0,0,0.15)",
                  }}
                  onMouseEnter={e => { if (!isPro) e.currentTarget.style.background = "#F3F4F6"; else e.currentTarget.style.opacity = "0.85"; }}
                  onMouseLeave={e => { if (!isPro) e.currentTarget.style.background = "transparent"; else e.currentTarget.style.opacity = "1"; }}
                >
                  {t("اشترك الآن", "Subscribe Now")}
                </button>

                <div style={{ height: 1, background: isPro ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)", marginBottom: 24 }} />

                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                  {plan.features.map((f, fi) => (
                    <li key={fi} style={{ display: "flex", alignItems: "center", gap: 10, flexDirection: isAr ? "row-reverse" : "row" }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: `${accent}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check size={10} color={accent} />
                      </span>
                      <span style={{ fontSize: 13, color: isPro ? "rgba(255,255,255,0.75)" : "#374151", fontWeight: 500 }}>
                        {t(f.ar, f.en)}
                      </span>
                    </li>
                  ))}
                  {plan.unavailable.map((f, fi) => (
                    <li key={`u${fi}`} style={{ display: "flex", alignItems: "center", gap: 10, flexDirection: isAr ? "row-reverse" : "row", opacity: 0.35 }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <X size={10} color={isPro ? "#fff" : "#9CA3AF"} />
                      </span>
                      <span style={{ fontSize: 13, color: isPro ? "rgba(255,255,255,0.5)" : "#9CA3AF", fontWeight: 500, textDecoration: "line-through" }}>
                        {t(f.ar, f.en)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p style={{ textAlign: "center", marginTop: 36, fontSize: 13, color: MID_GRAY }}>
          {t("جميع الباقات تشمل تأميناً شاملاً · يمكن الإلغاء في أي وقت · لا رسوم خفية", "All plans include full insurance · Cancel anytime · No hidden fees")}
        </p>
      </div>

      {/* Subscription Dialog — 4-step flow */}
      {subDialog && (() => {
        const SUB_STEPS = 4;
        const stepTitles = [
          { ar: "تفاصيل الباقة", en: "Plan Details" },
          { ar: "البيانات الشخصية", en: "Personal Info" },
          { ar: "طريقة الدفع", en: "Payment Method" },
          { ar: "مراجعة وتأكيد", en: "Review & Confirm" },
        ];
        const carPrefs = [
          { id: "any", ar: "أي فئة", en: "Any Category", Icon: Car },
          { id: "economy", ar: "اقتصادي", en: "Economy", Icon: Car },
          { id: "luxury", ar: "فاخر", en: "Luxury", Icon: Star },
          { id: "suv", ar: "SUV", en: "SUV", Icon: Mountain },
          { id: "sports", ar: "رياضي", en: "Sports", Icon: Zap },
        ] as const;

        const validateStep2 = () => {
          const e: Record<string,boolean> = {};
          if (!subName.trim()) e.subName = true;
          if (!subPhone.trim() || subPhone.length < 8) e.subPhone = true;
          if (!subEmail.trim() || !subEmail.includes("@")) e.subEmail = true;
          if (!subNationalId.trim()) e.subNationalId = true;
          setSubErrors(e);
          return Object.keys(e).length === 0;
        };
        const validateStep3 = () => {
          if (subPayMethod !== "card") return true;
          const e: Record<string,boolean> = {};
          if (subCardNum.replace(/\s/g,"").length < 16) e.subCardNum = true;
          if (!subCardExp.includes("/")) e.subCardExp = true;
          if (subCardCVV.length < 3) e.subCardCVV = true;
          setSubCardErr(e);
          return Object.keys(e).length === 0;
        };
        const handleSubNext = () => {
          if (subStep === 2 && !validateStep2()) return;
          if (subStep === 3 && !validateStep3()) return;
          if (subStep === SUB_STEPS) { setSubDone(true); return; }
          setSubStep(s => s + 1);
        };
        const prefLabel = carPrefs.find(c => c.id === subCarPref);

        return (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.78)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff, padding: 16 }}>
            <div style={{ background: "#fff", width: "min(560px,96vw)", maxHeight: "92vh", overflow: "auto", boxShadow: "0 48px 96px rgba(0,0,0,0.45)", borderRadius: 22, display: "flex", flexDirection: "column" }}>

              {/* Header */}
              {!subDone && (
                <div style={{ padding: "28px 32px 0", direction: isAr ? "rtl" : "ltr" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 10, fontWeight: 800, color: accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>{t("اشتراك جديد","NEW SUBSCRIPTION")}</span>
                      </div>
                      <h2 style={{ margin: 0, fontSize: 19, fontWeight: 900, color: DARK, letterSpacing: "-0.03em" }}>{t(stepTitles[subStep-1].ar, stepTitles[subStep-1].en)}</h2>
                      <p style={{ margin: "3px 0 0", fontSize: 12, color: MID_GRAY }}>{t("باقة","Plan")} {subDialog.planName} · {subDialog.price} {t("ج.م","EGP")} / {subDialog.billing}</p>
                    </div>
                    <button onClick={() => setSubDialog(null)} style={{ background: "#F3F4F6", border: "none", cursor: "pointer", color: "#6B7280", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", flexShrink: 0 }}>
                      <X size={16} />
                    </button>
                  </div>
                  <div style={{ display: "flex", gap: 3, marginBottom: 6 }}>
                    {Array.from({ length: SUB_STEPS }).map((_, i) => (
                      <div key={i} style={{ flex: 1, height: 3, borderRadius: 3, background: i + 1 <= subStep ? accent : "#E5E7EB", transition: "background 0.35s" }} />
                    ))}
                  </div>
                  <p style={{ fontSize: 10, color: MID_GRAY, margin: "0 0 24px", letterSpacing: "0.06em" }}>
                    {t(`الخطوة ${subStep} من ${SUB_STEPS}`, `Step ${subStep} of ${SUB_STEPS}`)}
                  </p>
                </div>
              )}

              {/* Body */}
              <div style={{ padding: subDone ? "0" : "0 32px", flex: 1 }}>

                {/* Step 1: Plan Details */}
                {!subDone && subStep === 1 && (
                  <div style={{ direction: isAr ? "rtl" : "ltr" }}>
                    {/* Plan features */}
                    <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>{t("مزايا الباقة","Plan Features")}</p>
                    <div style={{ background: "#F9FAFB", borderRadius: 12, border: "1.5px solid #F3F4F6", padding: "16px 18px", marginBottom: 20 }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {subDialog.features.map((f, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ width: 18, height: 18, borderRadius: "50%", background: `${accent}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <Check size={10} color={accent} />
                            </span>
                            <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{t(f.ar, f.en)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Car preference */}
                    <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>{t("فئة السيارة المفضلة","Preferred Car Category")}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, marginBottom: 20 }}>
                      {carPrefs.map(cp => {
                        const on = subCarPref === cp.id;
                        return (
                          <button key={cp.id} onClick={() => setSubCarPref(cp.id)}
                            style={{ padding: "12px 6px", border: `1.5px solid ${on ? accent : "#E5E7EB"}`, background: on ? `${accent}08` : "#FAFAFA", borderRadius: 10, cursor: "pointer", fontFamily: ff, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, transition: "all 0.18s" }}>
                            <cp.Icon size={16} color={on ? accent : MID_GRAY} />
                            <span style={{ fontSize: 10, fontWeight: on ? 700 : 500, color: on ? accent : DARK }}>{t(cp.ar, cp.en)}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Start date */}
                    <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>{t("تاريخ بدء الاشتراك","Subscription Start Date")}</p>
                    <WDatePicker value={subStartDate} onChange={setSubStartDate} label={t("تاريخ البدء","Start Date")} accent={accent} ff={ff} />

                    <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: `${accent}08`, border: `1px solid ${accent}22`, borderRadius: 8 }}>
                      <Calendar size={13} color={accent} />
                      <span style={{ fontSize: 12, color: "#374151" }}>{t("يمكن تغيير التاريخ مجاناً قبل بدء الاشتراك.","Free date change before subscription starts.")}</span>
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Info */}
                {!subDone && subStep === 2 && (
                  <div style={{ direction: isAr ? "rtl" : "ltr" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>{t("البيانات الشخصية","Personal Information")}</p>
                    {[
                      { id: "subName", label: t("الاسم الكامل","Full Name"), val: subName, set: setSubName, type: "text" },
                    ].map(f => (
                      <div key={f.id} style={{ marginBottom: 14 }}>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: subErrors[f.id] ? "#EF4444" : MID_GRAY, marginBottom: 5, letterSpacing: "0.1em", textTransform: "uppercase" }}>{f.label}</label>
                        <input type={f.type} value={f.val} onChange={e => { f.set(e.target.value); if (subErrors[f.id]) setSubErrors(p => ({ ...p, [f.id]: false })); }}
                          style={{ width: "100%", padding: "11px 13px", border: `1.5px solid ${subErrors[f.id] ? "#EF4444" : "#E5E7EB"}`, outline: "none", fontSize: 14, fontFamily: ff, boxSizing: "border-box" as const, borderRadius: 8, background: "#FAFAFA" }}
                          onFocus={e => e.target.style.borderColor = accent} onBlur={e => { if (!subErrors[f.id]) e.target.style.borderColor = "#E5E7EB"; }} />
                        {subErrors[f.id] && <p style={{ margin: "3px 0 0", fontSize: 11, color: "#EF4444" }}>{f.label} {t("مطلوب","is required")}</p>}
                      </div>
                    ))}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
                      {[
                        { id: "subPhone", label: t("رقم الجوال","Phone"), val: subPhone, set: setSubPhone, type: "tel" },
                        { id: "subEmail", label: t("البريد الإلكتروني","Email"), val: subEmail, set: setSubEmail, type: "email" },
                        { id: "subNationalId", label: t("رقم الهوية","National ID"), val: subNationalId, set: setSubNationalId, type: "text" },
                      ].map(f => (
                        <div key={f.id} style={{ marginBottom: 14 }}>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: subErrors[f.id] ? "#EF4444" : MID_GRAY, marginBottom: 5, letterSpacing: "0.1em", textTransform: "uppercase" }}>{f.label}</label>
                          <input type={f.type} value={f.val} onChange={e => { f.set(e.target.value); if (subErrors[f.id]) setSubErrors(p => ({ ...p, [f.id]: false })); }}
                            style={{ width: "100%", padding: "11px 13px", border: `1.5px solid ${subErrors[f.id] ? "#EF4444" : "#E5E7EB"}`, outline: "none", fontSize: 14, fontFamily: ff, boxSizing: "border-box" as const, borderRadius: 8, background: "#FAFAFA" }}
                            onFocus={e => e.target.style.borderColor = accent} onBlur={e => { if (!subErrors[f.id]) e.target.style.borderColor = "#E5E7EB"; }} />
                          {subErrors[f.id] && <p style={{ margin: "3px 0 0", fontSize: 11, color: "#EF4444" }}>{f.label} {t("مطلوب","is required")}</p>}
                        </div>
                      ))}
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: MID_GRAY, marginBottom: 5, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t("اسم الشركة (اختياري)","Company (Optional)")}</label>
                        <input type="text" value={subCompany} onChange={e => setSubCompany(e.target.value)}
                          style={{ width: "100%", padding: "11px 13px", border: "1.5px solid #E5E7EB", outline: "none", fontSize: 14, fontFamily: ff, boxSizing: "border-box" as const, borderRadius: 8, background: "#FAFAFA" }}
                          onFocus={e => e.target.style.borderColor = accent} onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {!subDone && subStep === 3 && (
                  <div style={{ direction: isAr ? "rtl" : "ltr" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>{t("اختر طريقة الدفع","Choose Payment Method")}</p>
                    {([
                      { id: "card", Icon: CreditCard, ar: "بطاقة ائتمان", en: "Credit / Debit Card", descAr: "فيزا، ماستركارد أو مدى", descEn: "Visa, Mastercard or Mada" },
                      { id: "cash", Icon: Wallet, ar: "تحويل بنكي", en: "Bank Transfer", descAr: "حوالة على الحساب البنكي", descEn: "Transfer to bank account" },
                      { id: "wallet", Icon: Phone, ar: "محفظة رقمية", en: "Digital Wallet", descAr: "Apple Pay، STC Pay، أو Tabby", descEn: "Apple Pay, STC Pay, or Tabby" },
                    ] as const).map(pm => {
                      const on = subPayMethod === pm.id;
                      return (
                        <div key={pm.id} onClick={() => setSubPayMethod(pm.id)}
                          style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, border: `1.5px solid ${on ? accent : "#E5E7EB"}`, background: on ? `${accent}06` : "#FAFAFA", cursor: "pointer", transition: "all 0.18s", marginBottom: 8 }}>
                          <div style={{ width: 38, height: 38, borderRadius: 10, background: on ? accent : "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.18s" }}>
                            <pm.Icon size={16} color={on ? "#fff" : MID_GRAY} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: DARK }}>{t(pm.ar, pm.en)}</p>
                            <p style={{ margin: "2px 0 0", fontSize: 12, color: MID_GRAY }}>{t(pm.descAr, pm.descEn)}</p>
                          </div>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${on ? accent : "#D1D5DB"}`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {on && <div style={{ width: 10, height: 10, borderRadius: "50%", background: accent }} />}
                          </div>
                        </div>
                      );
                    })}
                    {subPayMethod === "card" && (
                      <div style={{ marginTop: 16, padding: "18px 16px", background: "#F9FAFB", borderRadius: 12, border: "1.5px solid #E5E7EB" }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>{t("بيانات البطاقة","Card Details")}</p>
                        <div style={{ marginBottom: 12 }}>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: subCardErr.subCardNum ? "#EF4444" : MID_GRAY, marginBottom: 5 }}>{t("رقم البطاقة","Card Number")}</label>
                          <input value={subCardNum} onChange={e => { setSubCardNum(e.target.value.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim().slice(0,19)); if (subCardErr.subCardNum) setSubCardErr(p => ({...p, subCardNum: false})); }}
                            style={{ width: "100%", padding: "11px 13px", border: `1.5px solid ${subCardErr.subCardNum ? "#EF4444" : "#E5E7EB"}`, outline: "none", fontSize: 14, fontFamily: ff, boxSizing: "border-box" as const, borderRadius: 8, background: "#fff" }}
                            onFocus={e => e.target.style.borderColor = accent} onBlur={e => { if (!subCardErr.subCardNum) e.target.style.borderColor = "#E5E7EB"; }} />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: subCardErr.subCardExp ? "#EF4444" : MID_GRAY, marginBottom: 5 }}>{t("الصلاحية","Expiry")}</label>
                            <input value={subCardExp} onChange={e => { const d = e.target.value.replace(/\D/g,""); setSubCardExp(d.length > 2 ? d.slice(0,2)+"/"+d.slice(2,4) : d); if (subCardErr.subCardExp) setSubCardErr(p => ({...p, subCardExp: false})); }}
                              style={{ width: "100%", padding: "11px 13px", border: `1.5px solid ${subCardErr.subCardExp ? "#EF4444" : "#E5E7EB"}`, outline: "none", fontSize: 14, fontFamily: ff, boxSizing: "border-box" as const, borderRadius: 8, background: "#fff" }}
                              onFocus={e => e.target.style.borderColor = accent} onBlur={e => { if (!subCardErr.subCardExp) e.target.style.borderColor = "#E5E7EB"; }} />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: subCardErr.subCardCVV ? "#EF4444" : MID_GRAY, marginBottom: 5 }}>CVV</label>
                            <input type="password" value={subCardCVV} onChange={e => { setSubCardCVV(e.target.value.replace(/\D/g,"").slice(0,3)); if (subCardErr.subCardCVV) setSubCardErr(p => ({...p, subCardCVV: false})); }}
                              style={{ width: "100%", padding: "11px 13px", border: `1.5px solid ${subCardErr.subCardCVV ? "#EF4444" : "#E5E7EB"}`, outline: "none", fontSize: 14, fontFamily: ff, boxSizing: "border-box" as const, borderRadius: 8, background: "#fff" }}
                              onFocus={e => e.target.style.borderColor = accent} onBlur={e => { if (!subCardErr.subCardCVV) e.target.style.borderColor = "#E5E7EB"; }} />
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
                          <Lock size={12} color={MID_GRAY} />
                          <span style={{ fontSize: 11, color: MID_GRAY }}>{t("بياناتك مشفرة بالكامل","Your data is fully encrypted")}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Review */}
                {!subDone && subStep === 4 && (
                  <div style={{ direction: isAr ? "rtl" : "ltr" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>{t("ملخص الاشتراك","Subscription Summary")}</p>

                    <div style={{ background: `${accent}08`, border: `1.5px solid ${accent}22`, borderRadius: 12, padding: "18px 20px", marginBottom: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <p style={{ margin: "0 0 2px", fontSize: 16, fontWeight: 900, color: DARK }}>{t("باقة","Plan")} {subDialog.planName}</p>
                          <p style={{ margin: 0, fontSize: 12, color: MID_GRAY }}>{subDialog.billing}</p>
                        </div>
                        <span style={{ fontSize: 24, fontWeight: 900, color: accent, letterSpacing: "-0.04em" }}>{subDialog.price} <span style={{ fontSize: 12, fontWeight: 500 }}>{t("ج.م","EGP")}</span></span>
                      </div>
                    </div>

                    {[
                      { icon: <User size={13}/>, label: { ar:"المشترك", en:"Subscriber" }, value: subName || "—" },
                      { icon: <Phone size={13}/>, label: { ar:"الجوال", en:"Phone" }, value: subPhone || "—" },
                      { icon: <Mail size={13}/>, label: { ar:"البريد", en:"Email" }, value: subEmail || "—" },
                      { icon: <Car size={13}/>, label: { ar:"فئة السيارة", en:"Car Pref" }, value: prefLabel ? t(prefLabel.ar, prefLabel.en) : "—" },
                      { icon: <Calendar size={13}/>, label: { ar:"تاريخ البدء", en:"Start Date" }, value: subStartDate || t("لم يحدد","Not set") },
                      { icon: <CreditCard size={13}/>, label: { ar:"الدفع", en:"Payment" }, value: subPayMethod === "cash" ? t("تحويل بنكي","Bank Transfer") : subPayMethod === "card" ? t("بطاقة ائتمان","Credit Card") : t("محفظة رقمية","Digital Wallet") },
                      ...(subCompany ? [{ icon: <Building2 size={13}/>, label: { ar:"الشركة", en:"Company" }, value: subCompany }] : []),
                    ].map((row, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #F3F4F6" }}>
                        <span style={{ color: accent, flexShrink: 0 }}>{row.icon}</span>
                        <span style={{ fontSize: 13, color: MID_GRAY, minWidth: 80 }}>{t(row.label.ar, row.label.en)}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: DARK, [isAr ? "marginRight" : "marginLeft"]: "auto", textAlign: "end" }}>{row.value}</span>
                      </div>
                    ))}

                    <div style={{ marginTop: 16, display: "flex", gap: 8, padding: "12px 14px", background: `${accent}08`, border: `1px solid ${accent}22`, borderRadius: 8 }}>
                      <ShieldCheck size={14} color={accent} style={{ flexShrink: 0, marginTop: 1 }} />
                      <p style={{ margin: 0, fontSize: 12, color: "#374151", lineHeight: 1.6 }}>
                        {t("بالتأكيد تقر بأن جميع البيانات صحيحة وتوافق على شروط الاشتراك.","By confirming, you certify all information is correct and agree to subscription terms.")}
                      </p>
                    </div>
                  </div>
                )}

                {/* Success */}
                {subDone && (
                  <div style={{ direction: isAr ? "rtl" : "ltr", padding: "0 32px 32px" }}>
                    <div style={{ textAlign: "center", padding: "28px 0 24px" }}>
                      <div style={{ width: 72, height: 72, background: `${accent}15`, border: `2px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", borderRadius: "50%" }}>
                        <CheckCircle2 size={36} color={accent} />
                      </div>
                      <h3 style={{ fontSize: 22, fontWeight: 900, color: DARK, margin: "0 0 8px", letterSpacing: "-0.03em" }}>{t("تم الاشتراك بنجاح!","Subscribed Successfully!")}</h3>
                      <p style={{ fontSize: 14, color: MID_GRAY, margin: "0 0 20px", lineHeight: 1.7 }}>
                        {t(`تم اشتراكك في باقة ${subDialog.planName} بنجاح. سيتواصل معك فريقنا خلال ٢٤ ساعة.`, `You're now subscribed to the ${subDialog.planName} plan. Our team will contact you within 24 hours.`)}
                      </p>
                      <div style={{ background: "#F9FAFB", border: "1.5px solid #E5E7EB", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
                        <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.15em", textTransform: "uppercase" }}>{t("رقم الاشتراك","Subscription Reference")}</p>
                        <span style={{ fontSize: 22, fontWeight: 900, color: accent, letterSpacing: "0.04em", fontFamily: "'Inter',sans-serif" }}>{subRef}</span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
                        {[
                          { icon: <Tag size={13}/>, label: t("الباقة","Plan"), value: subDialog.planName },
                          { icon: <CreditCard size={13}/>, label: t("السعر","Price"), value: `${subDialog.price} ${t("ج.م","EGP")}` },
                          { icon: <Calendar size={13}/>, label: t("البدء","Start"), value: subStartDate || t("غير محدد","TBD") },
                          { icon: <Car size={13}/>, label: t("الفئة","Category"), value: prefLabel ? t(prefLabel.ar, prefLabel.en) : "—" },
                        ].map((item, i) => (
                          <div key={i} style={{ textAlign: "start", background: "#F9FAFB", borderRadius: 8, padding: "10px 12px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3, color: accent }}>{item.icon}<span style={{ fontSize: 10, fontWeight: 700, color: MID_GRAY, letterSpacing: "0.08em", textTransform: "uppercase" }}>{item.label}</span></div>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: DARK }}>{item.value}</p>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => setSubDialog(null)} style={{ padding: "14px 40px", background: accent, color: "#fff", border: "none", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: ff, borderRadius: 9, display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <CheckCircle2 size={15} /> {t("تم بنجاح — إغلاق","Done — Close")}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Buttons */}
              {!subDone && (
                <div style={{ padding: "20px 32px 28px", display: "flex", gap: 10, borderTop: "1px solid #F3F4F6", direction: isAr ? "rtl" : "ltr" }}>
                  {subStep > 1 ? (
                    <button onClick={() => setSubStep(s => s - 1)}
                      style={{ flex: 1, padding: "12px", border: "1.5px solid #E5E7EB", background: "#fff", color: DARK, fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: ff, borderRadius: 9, transition: "border-color 0.18s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = accent}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "#E5E7EB"}>
                      {t("السابق","Back")}
                    </button>
                  ) : (
                    <button onClick={() => setSubDialog(null)}
                      style={{ flex: 1, padding: "12px", border: "1.5px solid #E5E7EB", background: "#fff", color: DARK, fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: ff, borderRadius: 9 }}>
                      {t("إلغاء","Cancel")}
                    </button>
                  )}
                  <button onClick={handleSubNext}
                    style={{ flex: 2, padding: "12px", background: accent, color: "#fff", border: "none", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: ff, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    {subStep === SUB_STEPS ? <>{t("تأكيد الاشتراك","Confirm Subscription")} <CheckCircle2 size={14} /></> : <>{t("التالي","Next")} <ChevronRight size={14} style={{ transform: isAr ? "scaleX(-1)" : "none" }} /></>}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </section>
  );
}