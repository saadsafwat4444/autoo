 

import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { BG, BORDER, CARD_BG, GREEN, PAD, sectionPad, TXT, TXT2, TXT3, useFonts, WARM } from "@/app/themes/theme6/page";
import { Car, Heart, Users, Settings, Fuel, Star, X, Calendar, Check, ArrowLeft, ArrowRight, Phone, CreditCard, Banknote, Smartphone, CircleDollarSign, Shield } from "lucide-react";
import { useState, CSSProperties } from "react";

// ═════════════════════════════════════════════════════════════════════════════
export default function Cars() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [filter, setFilter] = useState("all");
  const [selectedCar, setSelectedCar] = useState<typeof cars[0] | null>(null);
  const [bookStep, setBookStep] = useState(0); // 0=details, 1=dates, 2=info, 3=payment, 4=confirm
  const [payMethod, setPayMethod] = useState("card");
  const [insuranceType, setInsuranceType] = useState("basic");

  const categories = [
    { val: "all", ar: "الكل", en: "All" },
    { val: "suv", ar: "SUV", en: "SUV" },
    { val: "luxury", ar: "فاخرة", en: "Luxury" },
    { val: "economy", ar: "اقتصادية", en: "Economy" },
  ];

  const filtered = filter === "all" ? cars : cars.filter(c => c.category === filter);

  const closeCar = () => { setSelectedCar(null); setBookStep(0); setPayMethod("card"); setInsuranceType("basic"); };

  const inputStyle: CSSProperties = {
    width: "100%", padding: "13px 16px", borderRadius: 12,
    border: `1.5px solid ${BORDER}`, fontSize: 14, outline: "none",
    boxSizing: "border-box" as const, fontFamily: body, color: TXT,
    background: BG, transition: "all 0.2s",
  };

  const stepNames = [
    { ar: "التفاصيل", en: "Details" },
    { ar: "التواريخ", en: "Dates" },
    { ar: "بياناتك", en: "Your Info" },
    { ar: "الدفع", en: "Payment" },
    { ar: "تأكيد", en: "Confirm" },
  ];

  return (
    <section id="cars" style={{ background: BG, padding: PAD }}>
      <div style={sectionPad}>
        <div style={{  marginBottom: 24 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 13, fontWeight: 700, color: GREEN,
            background: `${GREEN}10`, padding: "6px 18px", borderRadius: 20,
            marginBottom: 14,
          }}>
            <Car size={14} />
            {t("أسطول السيارات", "Our Fleet")}
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, color: TXT, fontFamily: heading, marginBottom: 10 }}>
            {t("السيارات المناسبة لرحلتك", "The Right Car for Your Trip")}
          </h2>
        </div>

        <div style={{ display: "flex",gap: 10, marginBottom: 40, flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button key={cat.val} onClick={() => setFilter(cat.val)} style={{
              padding: "9px 22px", borderRadius: 12,
              background: filter === cat.val ? GREEN : CARD_BG,
              color: filter === cat.val ? "#fff" : TXT2,
              border: `1.5px solid ${filter === cat.val ? GREEN : BORDER}`,
              fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading,
              transition: "all 0.25s",
            }}>
              {t(cat.ar, cat.en)}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {filtered.slice(0, 8).map(car => (
            <div key={car.id} style={{
              background: CARD_BG, borderRadius: 20, overflow: "hidden",
              border: `1px solid ${BORDER}`, transition: "all 0.35s",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}>
              <div style={{ position: "relative" }}>
                <img src={car.image} alt="" style={{ width: "100%", height: 180, objectFit: "cover" }} />
                <div style={{
                  position: "absolute", top: 12, left: 12,
                  background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)",
                  padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, color: GREEN,
                }}>
                  {car.category.toUpperCase()}
                </div>
                <button style={{
                  position: "absolute", top: 12, right: 12,
                  width: 34, height: 34, borderRadius: 10,
                  background: "rgba(255,255,255,0.9)", border: "none",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Heart size={16} color={TXT3} />
                </button>
              </div>
              <div style={{ padding: "18px 20px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 10 }}>
                  {t(car.name.ar, car.name.en)}
                </h3>
                <div style={{ display: "flex", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
                  {[
                    { icon: <Users size={13} />, val: `${car.seats}` },
                    { icon: <Settings size={13} />, val: t(car.transmission.ar, car.transmission.en) },
                    { icon: <Fuel size={13} />, val: t(car.fuel.ar, car.fuel.en) },
                  ].map((spec, si) => (
                    <span key={si} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: TXT3, fontWeight: 500 }}>
                      {spec.icon} {spec.val}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: 20, fontWeight: 900, color: GREEN, fontFamily: heading }}>{car.pricePerDay}</span>
                    <span style={{ fontSize: 13, color: TXT3, marginLeft: 4, marginRight: 4 }}>{t("ج.م/يوم", "EGP/day")}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ fontSize: 13, fontWeight: 700, color: TXT }}>{car.rating}</span>
                  </div>
                </div>
                <button onClick={() => { setSelectedCar(car); setBookStep(0); }} style={{
                  width: "100%", marginTop: 14, padding: "11px", borderRadius: 12,
                  background: GREEN, color: "#fff", border: "none", fontWeight: 700,
                  fontSize: 14, cursor: "pointer", fontFamily: heading, transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#166534"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = GREEN; }}>
                  {t("عرض التفاصيل", "View Details")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ────── CAR DETAIL & BOOKING MODAL ────── */}
      {selectedCar && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9990,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 16, animation: "t6fadeIn 0.3s",
        }} onClick={closeCar}>
          <div style={{
            background: CARD_BG, borderRadius: 28, width: "100%", maxWidth: 960,
            maxHeight: "92vh", overflow: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
          }} onClick={e => e.stopPropagation()}>
            {/* Steps indicator */}
            <div style={{ padding: "20px 28px 0", display: "flex", gap: 6, borderBottom: `1px solid ${BORDER}`, paddingBottom: 16 }}>
              {stepNames.map((sn, i) => (
                <div key={i} style={{
                  flex: 1, textAlign: "center", padding: "8px 0",
                  borderBottom: `3px solid ${i <= bookStep ? GREEN : "transparent"}`,
                  cursor: i <= bookStep ? "pointer" : "default", transition: "all 0.3s",
                }} onClick={() => { if (i <= bookStep) setBookStep(i); }}>
                  <span style={{
                    fontSize: 12, fontWeight: 700,
                    color: i === bookStep ? GREEN : i < bookStep ? TXT : TXT3,
                    fontFamily: heading,
                  }}>{t(sn.ar, sn.en)}</span>
                </div>
              ))}
              <button onClick={closeCar} style={{
                width: 36, height: 36, borderRadius: 10, background: BG,
                border: `1px solid ${BORDER}`, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <X size={18} color={TXT3} />
              </button>
            </div>

            <div style={{ padding: "24px 28px 28px" }}>
              {/* Step 0: Car Details */}
              {bookStep === 0 && (
                <div style={{ animation: "t6fadeIn 0.3s" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 28 }}>
                    {/* Car image + gallery */}
                    <div>
                      <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 14, position: "relative" }}>
                        <img src={selectedCar.image} alt="" style={{ width: "100%", height: 300, objectFit: "cover" }} />
                        <div style={{
                          position: "absolute", top: 14, left: 14,
                          background: GREEN, color: "#fff", padding: "5px 14px",
                          borderRadius: 10, fontSize: 12, fontWeight: 700,
                        }}>{selectedCar.category.toUpperCase()}</div>
                      </div>
                    </div>
                    {/* Car info */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <Star size={16} fill="#F59E0B" color="#F59E0B" />
                        <span style={{ fontSize: 14, fontWeight: 700, color: TXT }}>{selectedCar.rating}</span>
                        <span style={{ fontSize: 12, color: TXT3 }}>({selectedCar.reviews} {t("تقييم", "reviews")})</span>
                      </div>
                      <h2 style={{ fontSize: 26, fontWeight: 900, color: TXT, fontFamily: heading, marginBottom: 4 }}>
                        {t(selectedCar.name.ar, selectedCar.name.en)}
                      </h2>
                      <p style={{ fontSize: 13, color: TXT3, marginBottom: 20 }}>{t("موديل", "Model")} {selectedCar.year}</p>

                      {/* Specs grid */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                        {[
                          { ar: "المقاعد", en: "Seats", val: `${selectedCar.seats}`, icon: <Users size={16} /> },
                          { ar: "ناقل الحركة", en: "Transmission", val: t(selectedCar.transmission.ar, selectedCar.transmission.en), icon: <Settings size={16} /> },
                          { ar: "الوقود", en: "Fuel", val: t(selectedCar.fuel.ar, selectedCar.fuel.en), icon: <Fuel size={16} /> },
                          { ar: "السنة", en: "Year", val: `${selectedCar.year}`, icon: <Calendar size={16} /> },
                        ].map((sp, si) => (
                          <div key={si} style={{
                            display: "flex", alignItems: "center", gap: 10,
                            padding: "12px 14px", borderRadius: 12,
                            background: BG, border: `1px solid ${BORDER}`,
                          }}>
                            <span style={{ color: GREEN }}>{sp.icon}</span>
                            <div>
                              <div style={{ fontSize: 11, color: TXT3 }}>{t(sp.ar, sp.en)}</div>
                              <div style={{ fontSize: 13, fontWeight: 700, color: TXT }}>{sp.val}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Features */}
                      <h4 style={{ fontSize: 14, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 10 }}>
                        {t("المميزات", "Features")}
                      </h4>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                        {[
                          { ar: "تكييف", en: "A/C" }, { ar: "بلوتوث", en: "Bluetooth" },
                          { ar: "كاميرا خلفية", en: "Rear Camera" }, { ar: "مثبت سرعة", en: "Cruise Control" },
                          { ar: "شاشة ملاحة", en: "GPS Nav" }, { ar: "USB شحن", en: "USB Charging" },
                        ].map((f, fi) => (
                          <span key={fi} style={{
                            padding: "6px 14px", borderRadius: 10,
                            background: `${GREEN}08`, color: GREEN,
                            fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4,
                          }}>
                            <Check size={12} /> {t(f.ar, f.en)}
                          </span>
                        ))}
                      </div>

                      {/* Price */}
                      <div style={{
                        background: `${GREEN}06`, borderRadius: 16, padding: "18px 20px",
                        border: `1.5px solid ${GREEN}20`, display: "flex", alignItems: "center", justifyContent: "space-between",
                      }}>
                        <div>
                          <div style={{ fontSize: 13, color: TXT3 }}>{t("سعر الإيجار اليومي", "Daily Rental Price")}</div>
                          <div style={{ fontSize: 28, fontWeight: 900, color: GREEN, fontFamily: heading }}>{selectedCar.pricePerDay} <span style={{ fontSize: 14, fontWeight: 500, color: TXT3 }}>{t("ج.م/يوم", "EGP/day")}</span></div>
                        </div>
                        <button onClick={() => setBookStep(1)} style={{
                          padding: "13px 28px", borderRadius: 14,
                          background: GREEN, color: "#fff", border: "none",
                          fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading,
                          display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
                        }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#166534"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = GREEN; }}>
                          {t("احجز الآن", "Book Now")}
                          {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Insurance options */}
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: TXT, fontFamily: heading, marginTop: 28, marginBottom: 14 }}>
                    {t("خيارات التأمين", "Insurance Options")}
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                    {[
                      { id: "basic", ar: "تأمين أساسي", en: "Basic", price: 0, desc: { ar: "تأمين ضد الغير", en: "Third party liability" } },
                      { id: "standard", ar: "تأمين شامل", en: "Standard", price: 150, desc: { ar: "شامل بخصم 5000 ج.م", en: "Full with 5000 EGP deductible" } },
                      { id: "premium", ar: "تأمين بريميوم", en: "Premium", price: 300, desc: { ar: "شامل بدون خصم + مساعدة طريق", en: "Full zero deductible + roadside assist" } },
                    ].map(ins => (
                      <div key={ins.id} onClick={() => setInsuranceType(ins.id)} style={{
                        padding: "18px 16px", borderRadius: 16, cursor: "pointer",
                        background: insuranceType === ins.id ? `${GREEN}06` : CARD_BG,
                        border: `2px solid ${insuranceType === ins.id ? GREEN : BORDER}`,
                        transition: "all 0.2s",
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: TXT, fontFamily: heading }}>{t(ins.ar, ins.en)}</span>
                          <span style={{
                            width: 20, height: 20, borderRadius: "50%",
                            border: `2px solid ${insuranceType === ins.id ? GREEN : BORDER}`,
                            background: insuranceType === ins.id ? GREEN : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            {insuranceType === ins.id && <Check size={12} color="#fff" />}
                          </span>
                        </div>
                        <p style={{ fontSize: 12, color: TXT3, lineHeight: 1.5, marginBottom: 8 }}>{t(ins.desc.ar, ins.desc.en)}</p>
                        <span style={{ fontSize: 14, fontWeight: 800, color: ins.price ? WARM : GREEN }}>
                          {ins.price ? `+${ins.price} ${t("ج.م/يوم", "EGP/day")}` : t("مجاناً", "Free")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Dates */}
              {bookStep === 1 && (
                <div style={{ animation: "t6fadeIn 0.3s" }}>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 6 }}>
                    {t("حدد تواريخ الإيجار", "Select Rental Dates")}
                  </h3>
                  <p style={{ fontSize: 14, color: TXT3, marginBottom: 28 }}>
                    {t("اختر تاريخ الاستلام والتسليم وموقع الاستلام", "Choose pickup and return dates and location")}
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 8 }}>{t("تاريخ الاستلام", "Pickup Date")}</label>
                      <input type="date" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 8 }}>{t("تاريخ التسليم", "Return Date")}</label>
                      <input type="date" style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 8 }}>{t("وقت الاستلام", "Pickup Time")}</label>
                      <input type="time" defaultValue="09:00" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 8 }}>{t("وقت التسليم", "Return Time")}</label>
                      <input type="time" defaultValue="18:00" style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 8 }}>{t("موقع الاستلام", "Pickup Location")}</label>
                    <select style={{ ...inputStyle, cursor: "pointer" }}>
                      <option>{t("مطار القاهرة الدولي", "Cairo International Airport")}</option>
                      <option>{t("فرع التجمع الخامس", "5th Settlement Branch")}</option>
                      <option>{t("فرع مدينة نصر", "Nasr City Branch")}</option>
                      <option>{t("فرع المعادي", "Maadi Branch")}</option>
                      <option>{t("توصيل لعنوانك (رسوم إضافية)", "Delivery to your address (extra fee)")}</option>
                    </select>
                  </div>

                  {/* Extras */}
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 12 }}>{t("إضافات اختيارية", "Optional Extras")}</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
                    {[
                      { ar: "كرسي أطفال", en: "Child Seat", price: 50 },
                      { ar: "GPS إضافي", en: "Extra GPS", price: 75 },
                      { ar: "سائق خاص", en: "Private Driver", price: 500 },
                      { ar: "WiFi متنقل", en: "Mobile WiFi", price: 100 },
                    ].map((ext, ei) => (
                      <label key={ei} style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "12px 16px", borderRadius: 12, cursor: "pointer",
                        background: BG, border: `1px solid ${BORDER}`, transition: "all 0.2s",
                      }}>
                        <input type="checkbox" style={{ accentColor: GREEN, width: 16, height: 16 }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: TXT }}>{t(ext.ar, ext.en)}</div>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: WARM }}>+{ext.price} {t("ج.م", "EGP")}</span>
                      </label>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setBookStep(0)} style={{ flex: 1, padding: "14px", borderRadius: 14, background: "transparent", color: TXT2, border: `1.5px solid ${BORDER}`, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading }}>{t("رجوع", "Back")}</button>
                    <button onClick={() => setBookStep(2)} style={{ flex: 2, padding: "14px", borderRadius: 14, background: GREEN, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: heading, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      {t("التالي: بياناتك", "Next: Your Info")} {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: User Info */}
              {bookStep === 2 && (
                <div style={{ animation: "t6fadeIn 0.3s" }}>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 6 }}>
                    {t("بياناتك الشخصية", "Personal Information")}
                  </h3>
                  <p style={{ fontSize: 14, color: TXT3, marginBottom: 28 }}>
                    {t("أدخل بياناتك لإتمام الحجز", "Enter your details to complete the booking")}
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 7 }}>{t("الاسم الأول", "First Name")} *</label>
                      <input placeholder={t("محمد", "Mohammed")} style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 7 }}>{t("اسم العائلة", "Last Name")} *</label>
                      <input placeholder={t("أحمد", "Ahmed")} style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 7 }}>{t("البريد الإلكتروني", "Email")} *</label>
                      <input type="email" placeholder="you@email.com" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 7 }}>{t("رقم الهاتف", "Phone")} *</label>
                      <input type="tel" placeholder="+20 1XX XXX XXXX" style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 7 }}>{t("رقم الهوية / جواز السفر", "ID / Passport No.")} *</label>
                      <input placeholder={t("رقم البطاقة أو جواز السفر", "ID or Passport number")} style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 7 }}>{t("رقم رخصة القيادة", "Driving License No.")} *</label>
                      <input placeholder={t("رقم الرخصة", "License number")} style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 7 }}>{t("العنوان", "Address")}</label>
                    <input placeholder={t("عنوانك بالتفصيل", "Your full address")} style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 7 }}>{t("ملاحظات إضافية", "Additional Notes")}</label>
                    <textarea rows={3} placeholder={t("أي ملاحظات خاصة بالحجز...", "Any special notes...")} style={{ ...inputStyle, resize: "none" }} />
                  </div>

                  {/* Emergency contact */}
                  <div style={{ background: `${WARM}08`, borderRadius: 14, padding: 18, marginBottom: 24, border: `1px solid ${WARM}20` }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: WARM, fontFamily: heading, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                      <Phone size={15} /> {t("جهة اتصال طوارئ", "Emergency Contact")}
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <input placeholder={t("اسم جهة الاتصال", "Contact name")} style={inputStyle} />
                      <input placeholder={t("رقم الهاتف", "Phone number")} style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setBookStep(1)} style={{ flex: 1, padding: "14px", borderRadius: 14, background: "transparent", color: TXT2, border: `1.5px solid ${BORDER}`, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading }}>{t("رجوع", "Back")}</button>
                    <button onClick={() => setBookStep(3)} style={{ flex: 2, padding: "14px", borderRadius: 14, background: GREEN, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: heading, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      {t("التالي: الدفع", "Next: Payment")} {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {bookStep === 3 && (
                <div style={{ animation: "t6fadeIn 0.3s" }}>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 6 }}>
                    {t("طريقة الدفع", "Payment Method")}
                  </h3>
                  <p style={{ fontSize: 14, color: TXT3, marginBottom: 28 }}>
                    {t("اختر طريقة الدفع المناسبة لك", "Choose your preferred payment method")}
                  </p>

                  {/* Order summary */}
                  <div style={{ background: BG, borderRadius: 16, padding: 20, marginBottom: 24, border: `1px solid ${BORDER}` }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 14 }}>{t("ملخص الطلب", "Order Summary")}</h4>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, paddingBottom: 16, borderBottom: `1px solid ${BORDER}` }}>
                      <img src={selectedCar.image} alt="" style={{ width: 80, height: 56, borderRadius: 10, objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: TXT }}>{t(selectedCar.name.ar, selectedCar.name.en)}</div>
                        <div style={{ fontSize: 12, color: TXT3 }}>{selectedCar.year} • {t(selectedCar.transmission.ar, selectedCar.transmission.en)}</div>
                      </div>
                    </div>
                    {[
                      { ar: "إيجار يومي", en: "Daily Rate", val: `${selectedCar.pricePerDay} ${t("ج.م", "EGP")}` },
                      { ar: "3 أيام", en: "3 Days", val: `${selectedCar.pricePerDay * 3} ${t("ج.م", "EGP")}` },
                      { ar: "تأمين", en: "Insurance", val: insuranceType === "basic" ? t("مجاني", "Free") : insuranceType === "standard" ? `450 ${t("ج.م", "EGP")}` : `900 ${t("ج.م", "EGP")}` },
                    ].map((row, ri) => (
                      <div key={ri} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 13 }}>
                        <span style={{ color: TXT3 }}>{t(row.ar, row.en)}</span>
                        <span style={{ fontWeight: 600, color: TXT }}>{row.val}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: `2px solid ${GREEN}`, marginTop: 10, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: TXT }}>{t("الإجمالي", "Total")}</span>
                      <span style={{ fontSize: 20, fontWeight: 900, color: GREEN, fontFamily: heading }}>
                        {selectedCar.pricePerDay * 3 + (insuranceType === "standard" ? 450 : insuranceType === "premium" ? 900 : 0)} {t("ج.م", "EGP")}
                      </span>
                    </div>
                  </div>

                  {/* Payment methods */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                    {[
                      { id: "card", ar: "بطاقة ائتمان", en: "Credit Card", icon: <CreditCard size={22} />, desc: { ar: "فيزا / ماستركارد", en: "Visa / Mastercard" } },
                      { id: "cash", ar: "كاش عند الاستلام", en: "Cash on Pickup", icon: <Banknote size={22} />, desc: { ar: "ادفع نقداً عند الاستلام", en: "Pay cash when you pick up" } },
                      { id: "wallet", ar: "محفظة إلكترونية", en: "E-Wallet", icon: <Smartphone size={22} />, desc: { ar: "فودافون كاش / اتصالات كاش", en: "Vodafone Cash / Etisalat Cash" } },
                      { id: "installments", ar: "تقسيط", en: "Installments", icon: <CircleDollarSign size={22} />, desc: { ar: "قسط على 3-12 شهر بدون فوائد", en: "Split into 3-12 months, 0% interest" } },
                    ].map(pm => (
                      <div key={pm.id} onClick={() => setPayMethod(pm.id)} style={{
                        padding: "18px", borderRadius: 16, cursor: "pointer",
                        background: payMethod === pm.id ? `${GREEN}06` : CARD_BG,
                        border: `2px solid ${payMethod === pm.id ? GREEN : BORDER}`,
                        transition: "all 0.2s", display: "flex", alignItems: "flex-start", gap: 14,
                      }}>
                        <div style={{
                          width: 46, height: 46, borderRadius: 14, flexShrink: 0,
                          background: payMethod === pm.id ? `${GREEN}15` : BG,
                          color: payMethod === pm.id ? GREEN : TXT3,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>{pm.icon}</div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: TXT, fontFamily: heading }}>{t(pm.ar, pm.en)}</div>
                          <div style={{ fontSize: 12, color: TXT3, marginTop: 2 }}>{t(pm.desc.ar, pm.desc.en)}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Card form */}
                  {payMethod === "card" && (
                    <div style={{ background: BG, borderRadius: 16, padding: 20, marginBottom: 24, border: `1px solid ${BORDER}` }}>
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 7 }}>{t("رقم البطاقة", "Card Number")}</label>
                        <input placeholder="XXXX  XXXX  XXXX  XXXX" style={inputStyle} />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                        <div>
                          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 7 }}>{t("تاريخ الانتهاء", "Expiry")}</label>
                          <input placeholder="MM/YY" style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 7 }}>CVV</label>
                          <input placeholder="***" type="password" style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 7 }}>{t("اسم حامل البطاقة", "Cardholder")}</label>
                          <input placeholder={t("الاسم على البطاقة", "Name on card")} style={inputStyle} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Installments */}
                  {payMethod === "installments" && (
                    <div style={{ background: BG, borderRadius: 16, padding: 20, marginBottom: 24, border: `1px solid ${BORDER}` }}>
                      <h4 style={{ fontSize: 14, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 14 }}>{t("اختر خطة التقسيط", "Choose Installment Plan")}</h4>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                        {[
                          { months: 3, label: { ar: "3 أشهر", en: "3 Months" } },
                          { months: 6, label: { ar: "6 أشهر", en: "6 Months" } },
                          { months: 12, label: { ar: "12 شهر", en: "12 Months" } },
                        ].map((plan, pi) => {
                          const total = selectedCar.pricePerDay * 3 + (insuranceType === "standard" ? 450 : insuranceType === "premium" ? 900 : 0);
                          const monthly = Math.ceil(total / plan.months);
                          return (
                            <div key={pi} style={{
                              padding: 16, borderRadius: 12, textAlign: "center", cursor: "pointer",
                              background: pi === 0 ? `${GREEN}06` : CARD_BG, border: `1.5px solid ${pi === 0 ? GREEN : BORDER}`,
                            }}>
                              <div style={{ fontSize: 14, fontWeight: 700, color: TXT, marginBottom: 4 }}>{t(plan.label.ar, plan.label.en)}</div>
                              <div style={{ fontSize: 18, fontWeight: 900, color: GREEN, fontFamily: heading }}>{monthly}</div>
                              <div style={{ fontSize: 11, color: TXT3 }}>{t("ج.م/شهر", "EGP/month")}</div>
                              <div style={{ fontSize: 10, color: GREEN, fontWeight: 700, marginTop: 4 }}>{t("0% فوائد", "0% interest")}</div>
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ marginTop: 14 }}>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 7 }}>{t("رقم البطاقة للتقسيط", "Card Number for Installments")}</label>
                        <input placeholder="XXXX  XXXX  XXXX  XXXX" style={inputStyle} />
                      </div>
                    </div>
                  )}

                  {/* Wallet */}
                  {payMethod === "wallet" && (
                    <div style={{ background: BG, borderRadius: 16, padding: 20, marginBottom: 24, border: `1px solid ${BORDER}` }}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 7 }}>{t("رقم المحفظة", "Wallet Number")}</label>
                      <input type="tel" placeholder="+20 1XX XXX XXXX" style={inputStyle} />
                      <p style={{ fontSize: 12, color: TXT3, marginTop: 8 }}>
                        {t("سيتم إرسال طلب دفع على رقمك", "A payment request will be sent to your number")}
                      </p>
                    </div>
                  )}

                  {/* Terms */}
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 24, cursor: "pointer" }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: GREEN, marginTop: 3, width: 16, height: 16 }} />
                    <span style={{ fontSize: 13, color: TXT2, lineHeight: 1.6 }}>
                      {t("أوافق على شروط وأحكام الإيجار وسياسة الإلغاء وسياسة الخصوصية", "I agree to the rental terms & conditions, cancellation policy and privacy policy")}
                    </span>
                  </label>

                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setBookStep(2)} style={{ flex: 1, padding: "14px", borderRadius: 14, background: "transparent", color: TXT2, border: `1.5px solid ${BORDER}`, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading }}>{t("رجوع", "Back")}</button>
                    <button onClick={() => setBookStep(4)} style={{ flex: 2, padding: "14px", borderRadius: 14, background: GREEN, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: heading, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 8px 30px rgba(21,128,61,0.3)" }}>
                      <Shield size={16} />
                      {t("تأكيد ودفع", "Confirm & Pay")}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {bookStep === 4 && (
                <div style={{ animation: "t6fadeIn 0.3s", textAlign: "center", padding: "30px 0" }}>
                  <div style={{
                    width: 100, height: 100, borderRadius: "50%", margin: "0 auto 24px",
                    background: `${GREEN}12`, border: `3px solid ${GREEN}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Check size={50} color={GREEN} />
                  </div>
                  <h3 style={{ fontSize: 26, fontWeight: 900, color: TXT, fontFamily: heading, marginBottom: 8 }}>
                    {t("تم الحجز بنجاح!", "Booking Confirmed!")}
                  </h3>
                  <p style={{ fontSize: 15, color: TXT2, marginBottom: 32 }}>
                    {t("شكراً لك! تم تأكيد حجزك وسيتم إرسال التفاصيل على بريدك الإلكتروني وهاتفك", "Thank you! Your booking is confirmed. Details will be sent to your email and phone.")}
                  </p>
                  <div style={{ background: BG, borderRadius: 16, padding: 24, marginBottom: 28, border: `1px solid ${BORDER}`, textAlign: isRTL ? "right" : "left", maxWidth: 500, margin: "0 auto 28px" }}>
                    {[
                      { ar: "السيارة", en: "Car", val: t(selectedCar.name.ar, selectedCar.name.en) },
                      { ar: "رقم الحجز", en: "Booking No.", val: "#RD-" + Math.floor(10000 + Math.random() * 90000) },
                      { ar: "التأمين", en: "Insurance", val: insuranceType === "basic" ? t("أساسي", "Basic") : insuranceType === "standard" ? t("شامل", "Standard") : t("بريميوم", "Premium") },
                      { ar: "طريقة الدفع", en: "Payment", val: payMethod === "card" ? t("بطاقة ائتمان", "Credit Card") : payMethod === "cash" ? t("كاش", "Cash") : payMethod === "wallet" ? t("محفظة", "E-Wallet") : t("تقسيط", "Installments") },
                      { ar: "الإجمالي", en: "Total", val: `${selectedCar.pricePerDay * 3 + (insuranceType === "standard" ? 450 : insuranceType === "premium" ? 900 : 0)} ${t("ج.م", "EGP")}` },
                    ].map((item, ii) => (
                      <div key={ii} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: ii < 4 ? `1px solid ${BORDER}` : "none" }}>
                        <span style={{ fontSize: 13, color: TXT3 }}>{t(item.ar, item.en)}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: ii === 4 ? GREEN : TXT }}>{item.val}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                    <button onClick={closeCar} style={{ padding: "14px 28px", borderRadius: 14, background: "transparent", color: TXT2, border: `1.5px solid ${BORDER}`, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading }}>
                      {t("العودة للسيارات", "Back to Cars")}
                    </button>
                    <button onClick={closeCar} style={{ padding: "14px 28px", borderRadius: 14, background: GREEN, color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading }}>
                      {t("تحميل الإيصال", "Download Receipt")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes t6fadeIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </section>
  );
}