import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { PAD, WARM } from "@/app/themes/theme6/page";
import { useFonts, TXT, BG } from "@/app/themes/theme6/page";
import { GREEN, IMG, BORDER, TXT3, TXT2 } from "@/app/themes/theme6/page";
import { OLIVE, sectionPad, CARD_BG } from "@/app/themes/theme6/page";
import { Shield, Route, Headphones, Check, Thermometer, Package, Navigation, Baby, Eye, FileText, Tag, X, Clock, ArrowLeft, ArrowRight, Users, Fuel, Star, BadgeCheck, CreditCard, Banknote, Smartphone, CircleDollarSign, Phone, Map } from "lucide-react";
import { useState, CSSProperties } from "react";

export default function Offers() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [activeOffer, setActiveOffer] = useState<number | null>(null);
  const [offerStep, setOfferStep] = useState(0);
  const [offerPayMethod, setOfferPayMethod] = useState("card");

  const offers = [
    {
      ar: "عطلة نهاية الأسبوع", en: "Weekend Trip",
      discount: "25%", color: GREEN, img: IMG.suv,
      desc: { ar: "احجز من الخميس للسبت واحصل على خصم", en: "Book Thursday to Saturday and get a discount" },
      longDesc: { ar: "استمتع بعطلة نهاية أسبوع مميزة مع خصم 25% على جميع السيارات. العرض يشمل تأمين شامل وكيلومترات غير محدودة وخدمة الطريق على مدار الساعة.", en: "Enjoy an amazing weekend getaway with 25% off all cars. Includes comprehensive insurance, unlimited mileage, and 24/7 roadside assistance." },
      features: [
        { ar: "تأمين شامل مجاني", en: "Free comprehensive insurance", icon: <Shield size={16} /> },
        { ar: "كيلومترات غير محدودة", en: "Unlimited mileage", icon: <Route size={16} /> },
        { ar: "خدمة طريق 24/7", en: "24/7 roadside assistance", icon: <Headphones size={16} /> },
        { ar: "إلغاء مجاني قبل 48 ساعة", en: "Free cancellation 48h before", icon: <Check size={16} /> },
      ],
      price: { ar: "750 ج.م", en: "750 EGP" }, originalPrice: { ar: "1,000 ج.م", en: "1,000 EGP" },
      duration: { ar: "3 أيام", en: "3 days" }, recCars: [0, 2, 5],
    },
    {
      ar: "هروب صيفي", en: "Summer Escape",
      discount: "30%", color: WARM, img: IMG.beach,
      desc: { ar: "عروض خاصة لرحلات الصيف الطويلة", en: "Special deals for long summer trips" },
      longDesc: { ar: "اهرب من حر المدينة مع خصم 30% على رحلات الصيف الطويلة. سيارات مكيفة بالكامل مع cooler box مجاني وخريطة للشواطئ.", en: "Escape the city heat with 30% off long summer trips. Fully air-conditioned cars with a free cooler box and best beaches map." },
      features: [
        { ar: "سيارات مكيفة بالكامل", en: "Fully air-conditioned cars", icon: <Thermometer size={16} /> },
        { ar: "Cooler box مجاني", en: "Free cooler box", icon: <Package size={16} /> },
        { ar: "خريطة الشواطئ الأفضل", en: "Best beaches map", icon: <Map size={16} /> },
        { ar: "توصيل مجاني للفندق", en: "Free hotel delivery", icon: <Navigation size={16} /> },
      ],
      price: { ar: "2,100 ج.م", en: "2,100 EGP" }, originalPrice: { ar: "3,000 ج.م", en: "3,000 EGP" },
      duration: { ar: "أسبوع كامل", en: "Full week" }, recCars: [1, 3, 7],
    },
    {
      ar: "مغامرة عائلية", en: "Family Adventure",
      discount: "20%", color: OLIVE, img: IMG.family,
      desc: { ar: "خصم خاص للعائلات على سيارات SUV", en: "Special family discount on SUV vehicles" },
      longDesc: { ar: "خصم 20% حصري للعائلات على سيارات SUV الواسعة. كرسي أطفال مجاني ونظام ترفيه خلفي وخطة رحلة عائلية.", en: "Exclusive 20% family discount on spacious SUVs. Free child seat, rear entertainment, and custom family trip plan." },
      features: [
        { ar: "كرسي أطفال مجاني", en: "Free child seat", icon: <Baby size={16} /> },
        { ar: "نظام ترفيه خلفي", en: "Rear entertainment system", icon: <Eye size={16} /> },
        { ar: "خطة رحلة عائلية", en: "Family trip plan", icon: <FileText size={16} /> },
        { ar: "تأمين عائلي شامل", en: "Family comprehensive insurance", icon: <Shield size={16} /> },
      ],
      price: { ar: "1,600 ج.م", en: "1,600 EGP" }, originalPrice: { ar: "2,000 ج.م", en: "2,000 EGP" },
      duration: { ar: "4 أيام", en: "4 days" }, recCars: [4, 6, 8],
    },
  ];

  const activeOff = activeOffer !== null ? offers[activeOffer] : null;
  const closeOfferModal = () => { setActiveOffer(null); setOfferStep(0); setOfferPayMethod("card"); };
  const oInputSt: CSSProperties = { width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BORDER}`, fontSize: 14, color: TXT, background: BG, outline: "none", boxSizing: "border-box", fontFamily: body };

  return (
    <section id="offers" style={{ background: BG, padding: PAD}}>
      <div style={sectionPad}>
        <div style={{  marginBottom: 56 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 13, fontWeight: 700, color: GREEN,
            background: `${GREEN}10`, padding: "6px 18px", borderRadius: 20,
            marginBottom: 14,
          }}>
            <Tag size={14} />
            {t("عروض الرحلات", "Trip Offers")}
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, color: TXT, fontFamily: heading }}>
            {t("عروض خاصة لمغامرتك القادمة", "Special Deals for Your Next Adventure")}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
          {offers.map((o, i) => (
            <div key={i} style={{
              background: CARD_BG, borderRadius: 24, overflow: "hidden",
              border: `1px solid ${BORDER}`, transition: "all 0.35s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = `0 16px 50px ${o.color}15`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ position: "relative" }}>
                <img src={o.img} alt="" style={{ width: "100%", height: 200, objectFit: "cover" }} />
                <div style={{
                  position: "absolute", top: 16, right: 16,
                  background: o.color, color: "#fff",
                  padding: "8px 18px", borderRadius: 12,
                  fontSize: 18, fontWeight: 900, fontFamily: heading,
                }}>
                  {t("خصم", "OFF")} {o.discount}
                </div>
              </div>
              <div style={{ padding: "24px 22px" }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 8 }}>
                  {t(o.ar, o.en)}
                </h3>
                <p style={{ fontSize: 14, color: TXT3, lineHeight: 1.6, marginBottom: 20 }}>
                  {t(o.desc.ar, o.desc.en)}
                </p>
                <button onClick={() => { setActiveOffer(i); setOfferStep(0); }} style={{
                  width: "100%", padding: "13px", borderRadius: 14,
                  background: o.color, color: "#fff", border: "none",
                  fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: heading,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
                  <Tag size={16} />
                  {t("احجز العرض", "Book Offer")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ OFFER BOOKING MODAL ═══ */}
      {activeOff && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9990,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20, animation: "t6fadeIn 0.3s ease-out",
        }} onClick={closeOfferModal}>
          <div style={{
            background: CARD_BG, borderRadius: 28, width: "100%", maxWidth: 880,
            maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
          }} onClick={e => e.stopPropagation()}>
            {/* Hero */}
            <div style={{ position: "relative", height: 240 }}>
              <img src={activeOff.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "28px 28px 0 0" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.65) 100%)", borderRadius: "28px 28px 0 0" }} />
              <button onClick={closeOfferModal} style={{ position: "absolute", top: 16, right: 16, width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={20} color={TXT} />
              </button>
              <div style={{ position: "absolute", bottom: 20, left: 28, right: 28 }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <span style={{ background: activeOff.color, color: "#fff", padding: "6px 16px", borderRadius: 10, fontSize: 14, fontWeight: 800, fontFamily: heading }}>
                    {t("خصم", "OFF")} {activeOff.discount}
                  </span>
                  <span style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", color: "#fff", padding: "6px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
                    <Clock size={12} /> {t(activeOff.duration.ar, activeOff.duration.en)}
                  </span>
                </div>
                <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", fontFamily: heading }}>{t(activeOff.ar, activeOff.en)}</h2>
              </div>
            </div>

            {/* Step indicators */}
            <div style={{ padding: "18px 28px 0", display: "flex", gap: 8 }}>
              {[
                { ar: "تفاصيل العرض", en: "Offer Details" },
                { ar: "التاريخ والسيارة", en: "Date & Car" },
                { ar: "بياناتك", en: "Your Info" },
                { ar: "الدفع", en: "Payment" },
                { ar: "تأكيد", en: "Done" },
              ].map((s, i) => (
                <div key={i} style={{
                  flex: 1, textAlign: "center", padding: "10px 0",
                  borderBottom: `3px solid ${i <= offerStep ? activeOff.color : BORDER}`,
                  cursor: i <= offerStep ? "pointer" : "default", transition: "all 0.3s",
                }} onClick={() => { if (i <= offerStep) setOfferStep(i); }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: i <= offerStep ? activeOff.color : TXT3, fontFamily: heading }}>{t(s.ar, s.en)}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: "24px 28px 28px" }}>
              {/* Step 0: Offer Details */}
              {offerStep === 0 && (
                <div style={{ animation: "t6fadeIn 0.3s" }}>
                  <p style={{ fontSize: 15, color: TXT2, lineHeight: 1.85, marginBottom: 24 }}>{t(activeOff.longDesc.ar, activeOff.longDesc.en)}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 22px", borderRadius: 16, background: `${activeOff.color}06`, border: `1.5px solid ${activeOff.color}20`, marginBottom: 24 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: TXT3, marginBottom: 4 }}>{t("السعر بعد الخصم", "Price after discount")}</div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                        <span style={{ fontSize: 28, fontWeight: 900, color: activeOff.color, fontFamily: heading }}>{t(activeOff.price.ar, activeOff.price.en)}</span>
                        <span style={{ fontSize: 15, color: TXT3, textDecoration: "line-through" }}>{t(activeOff.originalPrice.ar, activeOff.originalPrice.en)}</span>
                      </div>
                    </div>
                    <div style={{ padding: "10px 18px", borderRadius: 12, background: activeOff.color, color: "#fff", fontSize: 13, fontWeight: 800, fontFamily: heading }}>{t("وفّر", "Save")} {activeOff.discount}</div>
                  </div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 14 }}>{t("مميزات العرض", "Offer Features")}</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
                    {activeOff.features.map((f, fi) => (
                      <div key={fi} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 14, background: BG, border: `1px solid ${BORDER}` }}>
                        <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, background: `${activeOff.color}12`, color: activeOff.color, display: "flex", alignItems: "center", justifyContent: "center" }}>{f.icon}</div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: TXT }}>{t(f.ar, f.en)}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setOfferStep(1)} style={{ width: "100%", padding: "14px", borderRadius: 14, background: activeOff.color, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: heading, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.1)"; }} onMouseLeave={e => { e.currentTarget.style.filter = ""; }}>
                    {t("اختر التاريخ والسيارة", "Choose Date & Car")} {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                  </button>
                </div>
              )}

              {/* Step 1: Date & Car */}
              {offerStep === 1 && (
                <div style={{ animation: "t6fadeIn 0.3s" }}>
                  <h4 style={{ fontSize: 17, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 20 }}>{t("اختر تاريخ الحجز", "Choose Booking Dates")}</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("تاريخ البداية", "Start Date")} *</label>
                      <input type="date" style={oInputSt} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("تاريخ النهاية", "End Date")} *</label>
                      <input type="date" style={oInputSt} />
                    </div>
                  </div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 14 }}>{t("اختر السيارة", "Choose Your Car")}</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                    {activeOff.recCars.map((ci, ri) => {
                      const car = cars[ci]; if (!car) return null;
                      return (
                        <div key={ri} style={{ display: "flex", alignItems: "center", gap: 14, padding: 14, borderRadius: 16, border: `1.5px solid ${ri === 0 ? activeOff.color : BORDER}`, background: ri === 0 ? `${activeOff.color}06` : CARD_BG, cursor: "pointer", transition: "all 0.2s", position: "relative" as const }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = activeOff.color; }} onMouseLeave={e => { if (ri !== 0) e.currentTarget.style.borderColor = BORDER; }}>
                          <img src={car.image} alt="" style={{ width: 90, height: 60, borderRadius: 12, objectFit: "cover" }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: TXT, fontFamily: heading }}>{t(car.name.ar, car.name.en)}</div>
                            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                              <span style={{ fontSize: 11, color: TXT3, display: "flex", alignItems: "center", gap: 4 }}><Users size={10} /> {car.seats}</span>
                              <span style={{ fontSize: 11, color: TXT3, display: "flex", alignItems: "center", gap: 4 }}><Fuel size={10} /> {t(car.fuel.ar, car.fuel.en)}</span>
                              <span style={{ fontSize: 11, color: TXT3, display: "flex", alignItems: "center", gap: 4 }}><Star size={10} fill="#F59E0B" color="#F59E0B" /> {car.rating}</span>
                            </div>
                          </div>
                          <div style={{ textAlign: isRTL ? "left" : "right" }}>
                            <div style={{ fontSize: 16, fontWeight: 900, color: activeOff.color, fontFamily: heading }}>{car.pricePerDay}</div>
                            <div style={{ fontSize: 10, color: TXT3 }}>{t("ج.م/يوم", "EGP/day")}</div>
                          </div>
                          {ri === 0 && <div style={{ padding: "3px 10px", borderRadius: 8, background: activeOff.color, color: "#fff", fontSize: 10, fontWeight: 700, position: "absolute", top: -8, [isRTL ? "left" : "right"]: 14 }}>{t("مقترح", "Suggested")}</div>}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setOfferStep(0)} style={{ flex: 1, padding: "13px", borderRadius: 14, background: "transparent", color: TXT2, border: `1.5px solid ${BORDER}`, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading }}>{t("رجوع", "Back")}</button>
                    <button onClick={() => setOfferStep(2)} style={{ flex: 2, padding: "13px", borderRadius: 14, background: activeOff.color, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: heading, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      {t("التالي: بياناتك", "Next: Your Info")} {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Personal Info */}
              {offerStep === 2 && (
                <div style={{ animation: "t6fadeIn 0.3s" }}>
                  <h4 style={{ fontSize: 18, fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 6 }}>{t("بياناتك الشخصية", "Personal Information")}</h4>
                  <p style={{ fontSize: 13, color: TXT3, marginBottom: 20 }}>{t("أدخل بياناتك لإتمام حجز العرض", "Enter your details to complete the offer booking")}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("الاسم الأول", "First Name")} *</label><input placeholder={t("محمد", "Mohammed")} style={oInputSt} /></div>
                    <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("اسم العائلة", "Last Name")} *</label><input placeholder={t("أحمد", "Ahmed")} style={oInputSt} /></div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("البريد الإلكتروني", "Email")} *</label><input type="email" placeholder="you@email.com" style={oInputSt} /></div>
                    <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("رقم الهاتف", "Phone")} *</label><input type="tel" placeholder="+20 1XX XXX XXXX" style={oInputSt} /></div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("رقم الهوية", "ID Number")} *</label><input placeholder={t("رقم البطاقة أو الجواز", "ID or Passport")} style={oInputSt} /></div>
                    <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("رخصة القيادة", "Driving License")} *</label><input placeholder={t("رقم الرخصة", "License No.")} style={oInputSt} /></div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("ملاحظات", "Notes")}</label>
                    <textarea rows={2} placeholder={t("أي ملاحظات خاصة...", "Any special notes...")} style={{ ...oInputSt, resize: "none" as const }} />
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setOfferStep(1)} style={{ flex: 1, padding: "13px", borderRadius: 14, background: "transparent", color: TXT2, border: `1.5px solid ${BORDER}`, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading }}>{t("رجوع", "Back")}</button>
                    <button onClick={() => setOfferStep(3)} style={{ flex: 2, padding: "13px", borderRadius: 14, background: activeOff.color, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: heading, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      {t("التالي: الدفع", "Next: Payment")} {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {offerStep === 3 && (
                <div style={{ animation: "t6fadeIn 0.3s" }}>
                  <h4 style={{ fontSize: 18, fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 6 }}>{t("طريقة الدفع", "Payment Method")}</h4>
                  <p style={{ fontSize: 13, color: TXT3, marginBottom: 20 }}>{t("اختر طريقة الدفع المفضلة", "Choose your preferred payment method")}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderRadius: 14, background: `${activeOff.color}06`, border: `1px solid ${activeOff.color}20`, marginBottom: 20 }}>
                    <div>
                      <div style={{ fontSize: 12, color: TXT3 }}>{t("المبلغ المطلوب", "Amount Due")}</div>
                      <div style={{ fontSize: 22, fontWeight: 900, color: activeOff.color, fontFamily: heading }}>{t(activeOff.price.ar, activeOff.price.en)}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: GREEN }}><BadgeCheck size={16} /> {t("خصم مطبق", "Discount Applied")}</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                    {[
                      { id: "card", ar: "بطاقة ائتمان", en: "Credit Card", icon: <CreditCard size={20} /> },
                      { id: "cash", ar: "كاش عند الاستلام", en: "Cash on Pickup", icon: <Banknote size={20} /> },
                      { id: "wallet", ar: "محفظة إلكترونية", en: "E-Wallet", icon: <Smartphone size={20} /> },
                      { id: "installments", ar: "تقسيط بدون فوائد", en: "0% Installments", icon: <CircleDollarSign size={20} /> },
                    ].map(pm => (
                      <div key={pm.id} onClick={() => setOfferPayMethod(pm.id)} style={{ padding: "14px", borderRadius: 14, cursor: "pointer", background: offerPayMethod === pm.id ? `${activeOff.color}06` : CARD_BG, border: `2px solid ${offerPayMethod === pm.id ? activeOff.color : BORDER}`, transition: "all 0.2s", display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 12, flexShrink: 0, background: offerPayMethod === pm.id ? `${activeOff.color}15` : BG, color: offerPayMethod === pm.id ? activeOff.color : TXT3, display: "flex", alignItems: "center", justifyContent: "center" }}>{pm.icon}</div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: TXT, fontFamily: heading }}>{t(pm.ar, pm.en)}</span>
                      </div>
                    ))}
                  </div>
                  {offerPayMethod === "card" && (
                    <div style={{ background: BG, borderRadius: 14, padding: 18, marginBottom: 20, border: `1px solid ${BORDER}` }}>
                      <div style={{ marginBottom: 12 }}><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("رقم البطاقة", "Card Number")}</label><input placeholder="XXXX  XXXX  XXXX  XXXX" style={{ ...oInputSt, background: CARD_BG }} /></div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                        <input placeholder="MM/YY" style={{ ...oInputSt, background: CARD_BG }} />
                        <input placeholder="CVV" type="password" style={{ ...oInputSt, background: CARD_BG }} />
                        <input placeholder={t("الاسم", "Name")} style={{ ...oInputSt, background: CARD_BG }} />
                      </div>
                    </div>
                  )}
                  {offerPayMethod === "wallet" && (
                    <div style={{ background: BG, borderRadius: 14, padding: 18, marginBottom: 20, border: `1px solid ${BORDER}` }}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("رقم المحفظة", "Wallet Number")}</label>
                      <input type="tel" placeholder="+20 1XX XXX XXXX" style={{ ...oInputSt, background: CARD_BG }} />
                    </div>
                  )}
                  {offerPayMethod === "installments" && (
                    <div style={{ background: BG, borderRadius: 14, padding: 18, marginBottom: 20, border: `1px solid ${BORDER}` }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
                        {[3, 6, 12].map(m => (
                          <div key={m} style={{ padding: 14, borderRadius: 12, textAlign: "center", cursor: "pointer", background: m === 3 ? `${activeOff.color}06` : CARD_BG, border: `1.5px solid ${m === 3 ? activeOff.color : BORDER}` }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: TXT }}>{m} {t("أشهر", "months")}</div>
                            <div style={{ fontSize: 11, color: activeOff.color, fontWeight: 700 }}>{t("0% فوائد", "0% interest")}</div>
                          </div>
                        ))}
                      </div>
                      <input placeholder="XXXX  XXXX  XXXX  XXXX" style={{ ...oInputSt, background: CARD_BG }} />
                    </div>
                  )}
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 22, cursor: "pointer" }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: activeOff.color, marginTop: 3, width: 15, height: 15 }} />
                    <span style={{ fontSize: 12, color: TXT2, lineHeight: 1.6 }}>{t("أوافق على شروط العرض وسياسة الإلغاء والخصوصية", "I agree to the offer terms, cancellation and privacy policies")}</span>
                  </label>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setOfferStep(2)} style={{ flex: 1, padding: "13px", borderRadius: 14, background: "transparent", color: TXT2, border: `1.5px solid ${BORDER}`, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading }}>{t("رجوع", "Back")}</button>
                    <button onClick={() => setOfferStep(4)} style={{ flex: 2, padding: "13px", borderRadius: 14, background: activeOff.color, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: heading, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: `0 6px 24px ${activeOff.color}30` }}>
                      <Shield size={16} /> {t("تأكيد ودفع", "Confirm & Pay")}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {offerStep === 4 && (
                <div style={{ animation: "t6fadeIn 0.3s", textAlign: "center", padding: "20px 0" }}>
                  <div style={{ width: 90, height: 90, borderRadius: "50%", margin: "0 auto 24px", background: `${activeOff.color}12`, border: `3px solid ${activeOff.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Check size={44} color={activeOff.color} />
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 900, color: TXT, fontFamily: heading, marginBottom: 8 }}>{t("تم حجز العرض بنجاح!", "Offer Booked Successfully!")}</h3>
                  <p style={{ fontSize: 15, color: TXT2, marginBottom: 6 }}>{t(activeOff.ar, activeOff.en)} — {t("خصم", "Discount")} {activeOff.discount} 🎉</p>
                  <p style={{ fontSize: 13, color: TXT3, marginBottom: 28 }}>{t("تفاصيل الحجز والدفع ستصل على بريدك وهاتفك", "Booking and payment details will be sent to your email and phone")}</p>
                  <div style={{ background: BG, borderRadius: 16, padding: 20, marginBottom: 24, border: `1px solid ${BORDER}`, textAlign: isRTL ? "right" : "left" }}>
                    {[
                      { ar: "العرض", en: "Offer", val: t(activeOff.ar, activeOff.en) },
                      { ar: "الخصم", en: "Discount", val: activeOff.discount },
                      { ar: "المبلغ", en: "Amount", val: t(activeOff.price.ar, activeOff.price.en) },
                      { ar: "طريقة الدفع", en: "Payment", val: offerPayMethod === "card" ? t("بطاقة ائتمان", "Credit Card") : offerPayMethod === "cash" ? t("كاش", "Cash") : offerPayMethod === "wallet" ? t("محفظة", "E-Wallet") : t("تقسيط", "Installments") },
                      { ar: "رقم الحجز", en: "Booking No.", val: "#OF-" + Math.floor(10000 + Math.random() * 90000) },
                    ].map((item, ii) => (
                      <div key={ii} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: ii < 4 ? `1px solid ${BORDER}` : "none" }}>
                        <span style={{ fontSize: 13, color: TXT3 }}>{t(item.ar, item.en)}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: TXT }}>{item.val}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={closeOfferModal} style={{ flex: 1, padding: "14px", borderRadius: 14, background: "transparent", color: TXT2, border: `1.5px solid ${BORDER}`, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading }}>{t("إغلاق", "Close")}</button>
                    <button onClick={() => { closeOfferModal(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} style={{ flex: 1, padding: "14px", borderRadius: 14, background: activeOff.color, color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <Phone size={16} /> {t("تواصل معنا", "Contact Us")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
