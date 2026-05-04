import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { PAD, WARM } from "@/app/themes/theme6/page";
import { useFonts, BG2, TXT, BG } from "@/app/themes/theme6/page";
import { IMG, BORDER, TXT3, GREEN, TXT2 } from "@/app/themes/theme6/page";
import { sectionPad, CARD_BG } from "@/app/themes/theme6/page";
import { Waves, Star, Compass, MapPin, Building2, Route, Mountain, Tent, Sunrise, Navigation, Clock, X, Calendar, ArrowLeft, ArrowRight, Users, Fuel, CreditCard, Banknote, Smartphone, CircleDollarSign, Shield, Check } from "lucide-react";
import { useState } from "react";

export default function Destinations() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [bookingStep, setBookingStep] = useState(0); // 0=info, 1=dates, 2=car, 3=userInfo, 4=payment, 5=confirm
  const [tripPayMethod, setTripPayMethod] = useState("card");

  const destinations = [
    {
      ar: "عين السخنة", en: "Ain Sokhna", img: IMG.ainSokhna, dist: "130 km",
      time: { ar: "ساعتان", en: "2 hours" },
      desc: { ar: "شواطئ هادئة ومنتجعات فاخرة", en: "Calm beaches & luxury resorts" },
      longDesc: { ar: "استمتع بشواطئ البحر الأحمر الدافئة ومنتجعات عين السخنة الفاخرة. المكان المثالي لعطلة نهاية الأسبوع بعيداً عن صخب القاهرة.", en: "Enjoy the warm Red Sea beaches and luxury resorts of Ain Sokhna. The perfect weekend getaway from Cairo's hustle." },
      highlights: [
        { ar: "شواطئ خاصة", en: "Private Beaches", icon: <Waves size={16} /> },
        { ar: "منتجعات 5 نجوم", en: "5-Star Resorts", icon: <Star size={16} /> },
        { ar: "رياضات مائية", en: "Water Sports", icon: <Compass size={16} /> },
        { ar: "مطاعم بحرية", en: "Seafood Restaurants", icon: <MapPin size={16} /> },
      ],
      bestSeason: { ar: "أبريل - أكتوبر", en: "April - October" },
      recCars: [0, 2, 7], // indices in cars array
    },
    {
      ar: "سيوة", en: "Siwa Oasis", img: IMG.siwa, dist: "560 km",
      time: { ar: "7 ساعات", en: "7 hours" },
      desc: { ar: "واحة ساحرة في قلب الصحراء", en: "Magical oasis in the desert" },
      longDesc: { ar: "واحة سيوة هي جوهرة الصحراء الغربية. استكشف بحيرة الملح، معبد آمون، وعين كليوباترا في رحلة لن تنسى أبداً.", en: "Siwa Oasis is the jewel of the Western Desert. Explore the salt lake, Amun Temple, and Cleopatra's Spring in an unforgettable journey." },
      highlights: [
        { ar: "بحيرة الملح", en: "Salt Lake", icon: <Waves size={16} /> },
        { ar: "معبد آمون", en: "Amun Temple", icon: <Building2 size={16} /> },
        { ar: "عين كليوباترا", en: "Cleopatra's Spring", icon: <Compass size={16} /> },
        { ar: "سفاري صحراوية", en: "Desert Safari", icon: <Route size={16} /> },
      ],
      bestSeason: { ar: "أكتوبر - مارس", en: "October - March" },
      recCars: [2, 8, 11],
    },
    {
      ar: "دهب", en: "Dahab", img: IMG.dahab, dist: "520 km",
      time: { ar: "6 ساعات", en: "6 hours" },
      desc: { ar: "جنة الغوص والمغامرة", en: "Paradise for diving & adventure" },
      longDesc: { ar: "دهب هي عاصمة المغامرة في سيناء. غوص في Blue Hole الشهير، تسلق الجبال، أو استرخ على شواطئها الذهبية.", en: "Dahab is Sinai's adventure capital. Dive the famous Blue Hole, hike the mountains, or relax on its golden beaches." },
      highlights: [
        { ar: "Blue Hole", en: "Blue Hole", icon: <Waves size={16} /> },
        { ar: "تسلق جبال", en: "Mountain Hiking", icon: <Mountain size={16} /> },
        { ar: "ركوب أمواج", en: "Windsurfing", icon: <Compass size={16} /> },
        { ar: "مخيمات بدوية", en: "Bedouin Camps", icon: <Tent size={16} /> },
      ],
      bestSeason: { ar: "سبتمبر - مايو", en: "September - May" },
      recCars: [2, 8, 4],
    },
    {
      ar: "سانت كاترين", en: "St. Catherine", img: IMG.sinai, dist: "450 km",
      time: { ar: "5 ساعات", en: "5 hours" },
      desc: { ar: "جبال مهيبة وتاريخ عريق", en: "Majestic mountains & rich history" },
      longDesc: { ar: "اصعد أعلى قمة في مصر — جبل كاترين، وزُر الدير الأثري. تجربة روحانية وطبيعية فريدة من نوعها.", en: "Climb Egypt's highest peak — Mount Catherine, and visit the ancient monastery. A unique spiritual and natural experience." },
      highlights: [
        { ar: "جبل موسى", en: "Mount Sinai", icon: <Mountain size={16} /> },
        { ar: "الدير الأثري", en: "Ancient Monastery", icon: <Building2 size={16} /> },
        { ar: "شروق الشمس", en: "Sunrise View", icon: <Sunrise size={16} /> },
        { ar: "مسارات مشي", en: "Hiking Trails", icon: <Route size={16} /> },
      ],
      bestSeason: { ar: "مارس - نوفمبر", en: "March - November" },
      recCars: [2, 8, 11],
    },
  ];

  const active = activeIdx !== null ? destinations[activeIdx] : null;

  const closeExplore = () => { setActiveIdx(null); setBookingStep(0); setTripPayMethod("card"); };

  return (
    <section id="destinations" style={{ background: BG2, padding: PAD }}>
      <div style={sectionPad}>
        <div style={{  marginBottom: 56 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 13, fontWeight: 700, color: WARM,
            background: `${WARM}10`, padding: "6px 18px", borderRadius: 20,
            marginBottom: 14,
          }}>
            <MapPin size={14} />
            {t("وجهات مقترحة", "Suggested Destinations")}
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, color: TXT, fontFamily: heading, marginBottom: 10 }}>
            {t("أماكن قريبة تستحق الزيارة", "Nearby Places Worth Visiting")}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 20 }}>
          {destinations.map((d, i) => (
            <div key={i} style={{
              background: CARD_BG, borderRadius: 24, overflow: "hidden",
              border: `1px solid ${BORDER}`, transition: "all 0.35s",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 16px 50px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.04)"; }}>
              <div style={{ position: "relative" }}>
                <img src={d.img} alt="" style={{ width: "100%", height: 200, objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: 12, left: 12, right: 12, display: "flex", gap: 8 }}>
                  <span style={{
                    background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)",
                    padding: "5px 12px", borderRadius: 10, fontSize: 12, fontWeight: 700, color: TXT,
                    display: "flex", alignItems: "center", gap: 4,
                  }}>
                    <Navigation size={11} /> {d.dist}
                  </span>
                  <span style={{
                    background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)",
                    padding: "5px 12px", borderRadius: 10, fontSize: 12, fontWeight: 700, color: TXT,
                    display: "flex", alignItems: "center", gap: 4,
                  }}>
                    <Clock size={11} /> {t(d.time.ar, d.time.en)}
                  </span>
                </div>
              </div>
              <div style={{ padding: "20px 22px" }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 6 }}>
                  {t(d.ar, d.en)}
                </h3>
                <p style={{ fontSize: 13, color: TXT3, lineHeight: 1.6, marginBottom: 16 }}>
                  {t(d.desc.ar, d.desc.en)}
                </p>
                <button onClick={() => { setActiveIdx(i); setBookingStep(0); }} style={{
                  width: "100%", padding: "11px", borderRadius: 12,
                  background: "transparent", border: `1.5px solid ${GREEN}`,
                  color: GREEN, fontWeight: 700, fontSize: 14, cursor: "pointer",
                  fontFamily: heading, transition: "all 0.25s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = GREEN; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GREEN; }}>
                  <Route size={15} />
                  {t("استكشف الرحلة", "Explore Trip")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ───── EXPLORE DESTINATION MODAL ───── */}
      {active && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9990,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20, animation: "t6fadeIn 0.3s ease-out",
        }} onClick={closeExplore}>
          <div style={{
            background: CARD_BG, borderRadius: 28, width: "100%", maxWidth: 900,
            maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
          }} onClick={e => e.stopPropagation()}>
            {/* Hero image */}
            <div style={{ position: "relative", height: 280 }}>
              <img src={active.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "28px 28px 0 0" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)", borderRadius: "28px 28px 0 0" }} />
              <button onClick={closeExplore} style={{
                position: "absolute", top: 16, right: 16,
                width: 40, height: 40, borderRadius: 12,
                background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <X size={20} color={TXT} />
              </button>
              <div style={{ position: "absolute", bottom: 20, left: 28, right: 28 }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <span style={{
                    background: GREEN, color: "#fff",
                    padding: "5px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                    display: "flex", alignItems: "center", gap: 5,
                  }}>
                    <Navigation size={12} /> {active.dist}
                  </span>
                  <span style={{
                    background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", color: "#fff",
                    padding: "5px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                    display: "flex", alignItems: "center", gap: 5,
                  }}>
                    <Clock size={12} /> {t(active.time.ar, active.time.en)}
                  </span>
                  <span style={{
                    background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", color: "#fff",
                    padding: "5px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                    display: "flex", alignItems: "center", gap: 5,
                  }}>
                    <Calendar size={12} /> {t(active.bestSeason.ar, active.bestSeason.en)}
                  </span>
                </div>
                <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", fontFamily: heading }}>
                  {t(active.ar, active.en)}
                </h2>
              </div>
            </div>

            {/* Flow steps indicator */}
            <div style={{ padding: "20px 28px 0", display: "flex", gap: 8 }}>
              {[
                { ar: "عن الوجهة", en: "About" },
                { ar: "التاريخ", en: "Dates" },
                { ar: "السيارة", en: "Car" },
                { ar: "بياناتك", en: "Info" },
                { ar: "الدفع", en: "Pay" },
                { ar: "تأكيد", en: "Done" },
              ].map((step, i) => (
                <div key={i} style={{
                  flex: 1, textAlign: "center", padding: "10px 0",
                  borderBottom: `3px solid ${i <= bookingStep ? GREEN : BORDER}`,
                  cursor: i <= bookingStep ? "pointer" : "default",
                  transition: "all 0.3s",
                }} onClick={() => { if (i <= bookingStep) setBookingStep(i); }}>
                  <span style={{
                    fontSize: 12, fontWeight: 700,
                    color: i <= bookingStep ? GREEN : TXT3,
                    fontFamily: heading,
                  }}>
                    {t(step.ar, step.en)}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ padding: "24px 28px 28px" }}>
              {/* Step 0: About destination */}
              {bookingStep === 0 && (
                <div style={{ animation: "t6fadeIn 0.3s" }}>
                  <p style={{ fontSize: 15, color: TXT2, lineHeight: 1.8, marginBottom: 28 }}>
                    {t(active.longDesc.ar, active.longDesc.en)}
                  </p>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 16 }}>
                    {t("أبرز المعالم", "Highlights")}
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                    {active.highlights.map((h, hi) => (
                      <div key={hi} style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "14px 18px", borderRadius: 14,
                        background: BG, border: `1px solid ${BORDER}`,
                      }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: 10,
                          background: `${GREEN}12`, color: GREEN,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>{h.icon}</div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: TXT }}>{t(h.ar, h.en)}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setBookingStep(1)} style={{
                    width: "100%", padding: "14px", borderRadius: 14,
                    background: GREEN, color: "#fff", border: "none",
                    fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: heading,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#166534"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = GREEN; }}>
                    {t("خطط لرحلتك", "Plan Your Trip")}
                    {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                  </button>
                </div>
              )}

              {/* Step 1: Choose dates */}
              {bookingStep === 1 && (
                <div style={{ animation: "t6fadeIn 0.3s" }}>
                  <h4 style={{ fontSize: 17, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 20 }}>
                    {t("اختر تاريخ رحلتك", "Choose Your Trip Dates")}
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 8 }}>
                        {t("تاريخ الانطلاق", "Pickup Date")}
                      </label>
                      <input type="date" style={{
                        width: "100%", padding: "14px 16px", borderRadius: 14,
                        border: `1.5px solid ${BORDER}`, fontSize: 14, color: TXT,
                        background: BG, outline: "none", boxSizing: "border-box",
                      }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TXT2, marginBottom: 8 }}>
                        {t("تاريخ العودة", "Return Date")}
                      </label>
                      <input type="date" style={{
                        width: "100%", padding: "14px 16px", borderRadius: 14,
                        border: `1.5px solid ${BORDER}`, fontSize: 14, color: TXT,
                        background: BG, outline: "none", boxSizing: "border-box",
                      }} />
                    </div>
                  </div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 12 }}>
                    {t("مدة الرحلة", "Trip Duration")}
                  </h4>
                  <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
                    {[
                      { ar: "يوم واحد", en: "1 Day" },
                      { ar: "عطلة نهاية الأسبوع", en: "Weekend" },
                      { ar: "أسبوع كامل", en: "Full Week" },
                    ].map((dur, di) => (
                      <button key={di} style={{
                        flex: 1, padding: "12px", borderRadius: 12,
                        background: di === 1 ? GREEN : BG,
                        color: di === 1 ? "#fff" : TXT2,
                        border: `1.5px solid ${di === 1 ? GREEN : BORDER}`,
                        fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: heading,
                      }}>
                        {t(dur.ar, dur.en)}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setBookingStep(0)} style={{
                      flex: 1, padding: "14px", borderRadius: 14,
                      background: "transparent", color: TXT2, border: `1.5px solid ${BORDER}`,
                      fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading,
                    }}>
                      {t("رجوع", "Back")}
                    </button>
                    <button onClick={() => setBookingStep(2)} style={{
                      flex: 2, padding: "14px", borderRadius: 14,
                      background: GREEN, color: "#fff", border: "none",
                      fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: heading,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    }}>
                      {t("اختر السيارة", "Choose Car")}
                      {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Choose car */}
              {bookingStep === 2 && (
                <div style={{ animation: "t6fadeIn 0.3s" }}>
                  <h4 style={{ fontSize: 17, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 6 }}>
                    {t("اختر السيارة المناسبة", "Choose the Right Car")}
                  </h4>
                  <p style={{ fontSize: 13, color: TXT3, marginBottom: 20 }}>
                    {t("سيارات مقترحة لرحلتك إلى ", "Recommended cars for your trip to ")}{t(active.ar, active.en)}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                    {active.recCars.map((ci, ri) => {
                      const car = cars[ci];
                      if (!car) return null;
                      return (
                        <div key={ri} style={{
                          display: "flex", alignItems: "center", gap: 16,
                          padding: 14, borderRadius: 16, position: "relative" as const,
                          border: `1.5px solid ${ri === 0 ? GREEN : BORDER}`,
                          background: ri === 0 ? `${GREEN}06` : CARD_BG,
                          cursor: "pointer", transition: "all 0.2s",
                        }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = GREEN; }}
                          onMouseLeave={e => { if (ri !== 0) e.currentTarget.style.borderColor = BORDER; }}>
                          <img src={car.image} alt="" style={{ width: 100, height: 66, borderRadius: 12, objectFit: "cover" }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 15, fontWeight: 700, color: TXT, fontFamily: heading }}>{t(car.name.ar, car.name.en)}</div>
                            <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                              <span style={{ fontSize: 12, color: TXT3, display: "flex", alignItems: "center", gap: 4 }}><Users size={11} /> {car.seats}</span>
                              <span style={{ fontSize: 12, color: TXT3, display: "flex", alignItems: "center", gap: 4 }}><Fuel size={11} /> {t(car.fuel.ar, car.fuel.en)}</span>
                              <span style={{ fontSize: 12, color: TXT3, display: "flex", alignItems: "center", gap: 4 }}><Star size={11} fill="#F59E0B" color="#F59E0B" /> {car.rating}</span>
                            </div>
                          </div>
                          <div style={{ textAlign: isRTL ? "left" : "right" }}>
                            <div style={{ fontSize: 18, fontWeight: 900, color: GREEN, fontFamily: heading }}>{car.pricePerDay}</div>
                            <div style={{ fontSize: 11, color: TXT3 }}>{t("ج.م/يوم", "EGP/day")}</div>
                          </div>
                          {ri === 0 && (
                            <div style={{
                              padding: "4px 10px", borderRadius: 8,
                              background: GREEN, color: "#fff", fontSize: 10, fontWeight: 700,
                              position: "absolute", top: -8, right: 16,
                            }}>
                              {t("الأفضل", "Best")}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setBookingStep(1)} style={{
                      flex: 1, padding: "14px", borderRadius: 14,
                      background: "transparent", color: TXT2, border: `1.5px solid ${BORDER}`,
                      fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading,
                    }}>
                      {t("رجوع", "Back")}
                    </button>
                    <button onClick={() => setBookingStep(3)} style={{
                      flex: 2, padding: "14px", borderRadius: 14,
                      background: GREEN, color: "#fff", border: "none",
                      fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: heading,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    }}>
                      {t("التالي: بياناتك", "Next: Your Info")}
                      {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: User Info */}
              {bookingStep === 3 && (
                <div style={{ animation: "t6fadeIn 0.3s" }}>
                  <h4 style={{ fontSize: 18, fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 6 }}>
                    {t("بياناتك الشخصية", "Personal Information")}
                  </h4>
                  <p style={{ fontSize: 13, color: TXT3, marginBottom: 22 }}>
                    {t("أدخل بياناتك لإتمام حجز الرحلة", "Enter your details to complete the trip booking")}
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("الاسم الأول", "First Name")} *</label>
                      <input placeholder={t("محمد", "Mohammed")} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BORDER}`, fontSize: 14, color: TXT, background: BG, outline: "none", boxSizing: "border-box" as const }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("اسم العائلة", "Last Name")} *</label>
                      <input placeholder={t("أحمد", "Ahmed")} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BORDER}`, fontSize: 14, color: TXT, background: BG, outline: "none", boxSizing: "border-box" as const }} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("البريد الإلكتروني", "Email")} *</label>
                      <input type="email" placeholder="you@email.com" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BORDER}`, fontSize: 14, color: TXT, background: BG, outline: "none", boxSizing: "border-box" as const }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("رقم الهاتف", "Phone")} *</label>
                      <input type="tel" placeholder="+20 1XX XXX XXXX" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BORDER}`, fontSize: 14, color: TXT, background: BG, outline: "none", boxSizing: "border-box" as const }} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("رقم الهوية", "ID Number")} *</label>
                      <input placeholder={t("رقم البطاقة أو الجواز", "ID or Passport")} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BORDER}`, fontSize: 14, color: TXT, background: BG, outline: "none", boxSizing: "border-box" as const }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("رخصة القيادة", "Driving License")} *</label>
                      <input placeholder={t("رقم الرخصة", "License No.")} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BORDER}`, fontSize: 14, color: TXT, background: BG, outline: "none", boxSizing: "border-box" as const }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("عدد المسافرين", "Number of Travelers")}</label>
                    <select style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BORDER}`, fontSize: 14, color: TXT, background: BG, outline: "none", boxSizing: "border-box" as const, cursor: "pointer" }}>
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {t("مسافرين", "travelers")}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom: 22 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("ملاحظات خاصة", "Special Notes")}</label>
                    <textarea rows={2} placeholder={t("أي طلبات أو ملاحظات...", "Any requests or notes...")} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BORDER}`, fontSize: 14, color: TXT, background: BG, outline: "none", boxSizing: "border-box" as const, resize: "none" }} />
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setBookingStep(2)} style={{ flex: 1, padding: "13px", borderRadius: 14, background: "transparent", color: TXT2, border: `1.5px solid ${BORDER}`, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading }}>{t("رجوع", "Back")}</button>
                    <button onClick={() => setBookingStep(4)} style={{ flex: 2, padding: "13px", borderRadius: 14, background: GREEN, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: heading, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      {t("التالي: الدفع", "Next: Payment")} {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {bookingStep === 4 && (
                <div style={{ animation: "t6fadeIn 0.3s" }}>
                  <h4 style={{ fontSize: 18, fontWeight: 800, color: TXT, fontFamily: heading, marginBottom: 6 }}>
                    {t("طريقة الدفع", "Payment Method")}
                  </h4>
                  <p style={{ fontSize: 13, color: TXT3, marginBottom: 22 }}>
                    {t("اختر طريقة الدفع المناسبة لرحلتك", "Choose your preferred payment method for the trip")}
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                    {[
                      { id: "card", ar: "بطاقة ائتمان", en: "Credit Card", icon: <CreditCard size={20} /> },
                      { id: "cash", ar: "كاش عند الاستلام", en: "Cash on Pickup", icon: <Banknote size={20} /> },
                      { id: "wallet", ar: "محفظة إلكترونية", en: "E-Wallet", icon: <Smartphone size={20} /> },
                      { id: "installments", ar: "تقسيط بدون فوائد", en: "0% Installments", icon: <CircleDollarSign size={20} /> },
                    ].map(pm => (
                      <div key={pm.id} onClick={() => setTripPayMethod(pm.id)} style={{
                        padding: "14px", borderRadius: 14, cursor: "pointer",
                        background: tripPayMethod === pm.id ? `${GREEN}06` : CARD_BG,
                        border: `2px solid ${tripPayMethod === pm.id ? GREEN : BORDER}`,
                        transition: "all 0.2s", display: "flex", alignItems: "center", gap: 12,
                      }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                          background: tripPayMethod === pm.id ? `${GREEN}15` : BG,
                          color: tripPayMethod === pm.id ? GREEN : TXT3,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>{pm.icon}</div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: TXT, fontFamily: heading }}>{t(pm.ar, pm.en)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Card fields */}
                  {tripPayMethod === "card" && (
                    <div style={{ background: BG, borderRadius: 14, padding: 18, marginBottom: 20, border: `1px solid ${BORDER}` }}>
                      <div style={{ marginBottom: 12 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("رقم البطاقة", "Card Number")}</label>
                        <input placeholder="XXXX  XXXX  XXXX  XXXX" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BORDER}`, fontSize: 14, color: TXT, background: CARD_BG, outline: "none", boxSizing: "border-box" as const }} />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                        <input placeholder="MM/YY" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BORDER}`, fontSize: 14, color: TXT, background: CARD_BG, outline: "none", boxSizing: "border-box" as const }} />
                        <input placeholder="CVV" type="password" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BORDER}`, fontSize: 14, color: TXT, background: CARD_BG, outline: "none", boxSizing: "border-box" as const }} />
                        <input placeholder={t("الاسم", "Name")} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BORDER}`, fontSize: 14, color: TXT, background: CARD_BG, outline: "none", boxSizing: "border-box" as const }} />
                      </div>
                    </div>
                  )}

                  {tripPayMethod === "wallet" && (
                    <div style={{ background: BG, borderRadius: 14, padding: 18, marginBottom: 20, border: `1px solid ${BORDER}` }}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXT2, marginBottom: 6 }}>{t("رقم المحفظة", "Wallet Number")}</label>
                      <input type="tel" placeholder="+20 1XX XXX XXXX" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BORDER}`, fontSize: 14, color: TXT, background: CARD_BG, outline: "none", boxSizing: "border-box" as const }} />
                    </div>
                  )}

                  {tripPayMethod === "installments" && (
                    <div style={{ background: BG, borderRadius: 14, padding: 18, marginBottom: 20, border: `1px solid ${BORDER}` }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
                        {[3, 6, 12].map(m => (
                          <div key={m} style={{ padding: 14, borderRadius: 12, textAlign: "center", cursor: "pointer", background: m === 3 ? `${GREEN}06` : CARD_BG, border: `1.5px solid ${m === 3 ? GREEN : BORDER}` }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: TXT }}>{m} {t("أشهر", "months")}</div>
                            <div style={{ fontSize: 11, color: GREEN, fontWeight: 700 }}>{t("0% فوائد", "0% interest")}</div>
                          </div>
                        ))}
                      </div>
                      <input placeholder="XXXX  XXXX  XXXX  XXXX" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BORDER}`, fontSize: 14, color: TXT, background: CARD_BG, outline: "none", boxSizing: "border-box" as const }} />
                    </div>
                  )}

                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 22, cursor: "pointer" }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: GREEN, marginTop: 3, width: 15, height: 15 }} />
                    <span style={{ fontSize: 12, color: TXT2, lineHeight: 1.6 }}>
                      {t("أوافق على شروط الإيجار وسياسة الإلغاء والخصوصية", "I agree to the rental terms, cancellation and privacy policies")}
                    </span>
                  </label>

                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setBookingStep(3)} style={{ flex: 1, padding: "13px", borderRadius: 14, background: "transparent", color: TXT2, border: `1.5px solid ${BORDER}`, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading }}>{t("رجوع", "Back")}</button>
                    <button onClick={() => setBookingStep(5)} style={{ flex: 2, padding: "13px", borderRadius: 14, background: GREEN, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: heading, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 6px 24px rgba(21,128,61,0.3)" }}>
                      <Shield size={16} />
                      {t("تأكيد ودفع", "Confirm & Pay")}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Confirmation */}
              {bookingStep === 5 && (
                <div style={{ animation: "t6fadeIn 0.3s", textAlign: "center", padding: "20px 0" }}>
                  <div style={{
                    width: 90, height: 90, borderRadius: "50%", margin: "0 auto 24px",
                    background: `${GREEN}12`, border: `3px solid ${GREEN}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Check size={44} color={GREEN} />
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 900, color: TXT, fontFamily: heading, marginBottom: 8 }}>
                    {t("تم حجز رحلتك بنجاح!", "Your Trip is Booked!")}
                  </h3>
                  <p style={{ fontSize: 15, color: TXT2, marginBottom: 6 }}>
                    {t("رحلة سعيدة إلى ", "Happy travels to ")}{t(active.ar, active.en)} 🎉
                  </p>
                  <p style={{ fontSize: 13, color: TXT3, marginBottom: 28 }}>
                    {t("تفاصيل الحجز والدفع ستصل على بريدك وهاتفك", "Booking and payment details will be sent to your email and phone")}
                  </p>
                  <div style={{
                    background: BG, borderRadius: 16, padding: 20, marginBottom: 24,
                    border: `1px solid ${BORDER}`, textAlign: isRTL ? "right" : "left",
                  }}>
                    {[
                      { ar: "الوجهة", en: "Destination", val: t(active.ar, active.en) },
                      { ar: "المسافة", en: "Distance", val: active.dist },
                      { ar: "طريقة الدفع", en: "Payment", val: tripPayMethod === "card" ? t("بطاقة ائتمان", "Credit Card") : tripPayMethod === "cash" ? t("كاش", "Cash") : tripPayMethod === "wallet" ? t("محفظة", "E-Wallet") : t("تقسيط", "Installments") },
                      { ar: "رقم الحجز", en: "Booking No.", val: "#RT-" + Math.floor(10000 + Math.random() * 90000) },
                    ].map((item, ii) => (
                      <div key={ii} style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "10px 0",
                        borderBottom: ii < 3 ? `1px solid ${BORDER}` : "none",
                      }}>
                        <span style={{ fontSize: 13, color: TXT3 }}>{t(item.ar, item.en)}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: TXT }}>{item.val}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={closeExplore} style={{
                      flex: 1, padding: "14px", borderRadius: 14,
                      background: "transparent", color: TXT2, border: `1.5px solid ${BORDER}`,
                      fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading,
                    }}>
                      {t("العودة للرئيسية", "Back to Home")}
                    </button>
                    <button onClick={closeExplore} style={{
                      flex: 1, padding: "14px", borderRadius: 14,
                      background: GREEN, color: "#fff", border: "none",
                      fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: heading,
                    }}>
                      {t("تحميل الإيصال", "Download Receipt")}
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