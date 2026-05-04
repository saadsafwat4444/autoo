import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { BG, BG2, BG3, GOLD, GOLD_D, SEC_BTN, SEC_BTN_BRD, SEC_BTN_TXT, showECarDetail, showEPage, TXT, TXT_DIM, useFonts } from "@/app/themes/theme2/page";
import { Car } from "@/app/types/car";
import { Users, Settings, Fuel, Calendar, Star, Car as CarIcon, ChevronRight, Check, Crown, Shield, Phone } from "lucide-react";
import { useState } from "react";
import { GoldLine } from "./Hero";
import BookingDialog from "./BookingDialog";

export default function ECarDetail({ car }: { car: Car }) {
  const { t, lang } = useAppContext();
  const { heading, body, isAr } = useFonts();
  const [bookingCar, setBookingCar] = useState<Car| null>(null);

  const similarCars = cars.filter(c => c.id !== car.id && c.category === car.category).slice(0, 3);
  if (similarCars.length < 3) {
    const extra = cars.filter(c => c.id !== car.id && !similarCars.some(s => s.id === c.id)).slice(0, 3 - similarCars.length);
    similarCars.push(...extra);
  }

  const specs = [
    { icon: Users, ar: "المقاعد", en: "Seats", val: `${car.seats}` },
    { icon: Settings, ar: "ناقل الحركة", en: "Transmission", val: t(car.transmission.ar, car.transmission.en) },
    { icon: Fuel, ar: "الوقود", en: "Fuel Type", val: t(car.fuel.ar, car.fuel.en) },
    { icon: Calendar, ar: "سنة الصنع", en: "Year", val: car.year.toString() },
    { icon: Star, ar: "التقييم", en: "Rating", val: `${car.rating} (${car.reviews})` },
    { icon: CarIcon, ar: "الفئة", en: "Category", val: car.category.toUpperCase() },
  ];

  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: body }}>
      {/* Hero with image */}
      <div style={{ position: "relative", height: 500, overflow: "hidden" }}>
        <img src={car.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${BG} 0%, rgba(11,11,11,0.5) 40%, rgba(11,11,11,0.3) 100%)` }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 40px 52px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", width: "100%" }}>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <button onClick={() => showEPage("home")} style={{ background: "none", border: "none", cursor: "pointer", color: TXT_DIM, fontSize: 13, fontFamily: body, padding: 0 }}>
                {t("الرئيسية", "Home")}
              </button>
              <ChevronRight size={12} color={`${GOLD}40`} style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
              <span style={{ color: GOLD, fontSize: 13, fontWeight: 600 }}>{t(car.name.ar, car.name.en)}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ background: GOLD, color: BG, fontSize: 10, fontWeight: 800, padding: "4px 14px", letterSpacing: "0.12em" }}>
                {car.category.toUpperCase()}
              </span>
              <div style={{ display: "flex", gap: 3 }}>
                {Array.from({ length: Math.round(car.rating) }).map((_, i) => <Star key={i} size={13} fill={GOLD} color={GOLD} />)}
              </div>
              <span style={{ fontSize: 12, color: TXT_DIM }}>({car.reviews} {t("تقييم", "reviews")})</span>
            </div>
            <h1 style={{ fontSize: "clamp(2.2rem,4.5vw,3.5rem)", fontWeight: 700, color: "#fff", margin: "0 0 8px", fontFamily: heading }}>
              {t(car.name.ar, car.name.en)}
            </h1>
            <p style={{ fontSize: 20, color: GOLD, fontWeight: 800, margin: 0 }}>
              {car.pricePerDay.toLocaleString()} {t("جنيه / يوم", "EGP / day")}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "52px 40px 96px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48 }}>
          {/* Left: Details */}
          <div>
            {/* Description */}
            <div style={{ marginBottom: 40 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 16px", fontFamily: heading, display: "flex", alignItems: "center", gap: 10 }}>
                <GoldLine width={30} />
                {t("عن السيارة", "About This Car")}
              </h3>
              <p style={{ margin: 0, fontSize: 15, color: TXT_DIM, lineHeight: 1.9 }}>
                {t(
                  `${t(car.name.ar, car.name.en)} هي سيارة ${t(car.fuel.ar, car.fuel.en)} من فئة ${car.category === "luxury" ? "الفاخرة" : car.category === "suv" ? "الدفع الرباعي" : car.category === "sports" ? "الرياضية" : "الاقتصادية"} موديل ${car.year}. تتميز بناقل حركة ${t(car.transmission.ar, car.transmission.en)} و ${car.seats} مقاعد مريحة. مثالية لرحلات الأعمال والترفيه على حد سواء.`,
                  `The ${t(car.name.ar, car.name.en)} is a ${car.year} ${car.category} vehicle powered by ${t(car.fuel.ar, car.fuel.en).toLowerCase()} with ${t(car.transmission.ar, car.transmission.en).toLowerCase()} transmission and ${car.seats} comfortable seats. Perfect for both business and leisure trips.`
                )}
              </p>
            </div>

            {/* Specs Grid */}
            <div style={{ marginBottom: 40 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 20px", fontFamily: heading, display: "flex", alignItems: "center", gap: 10 }}>
                <GoldLine width={30} />
                {t("المواصفات", "Specifications")}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {specs.map((s, i) => (
                  <div key={i} style={{ background: BG3, border: `1px solid ${GOLD}12`, padding: "20px 18px", textAlign: "center" }}>
                    <s.icon size={22} color={GOLD} style={{ marginBottom: 10 }} />
                    <p style={{ margin: "0 0 4px", fontSize: 11, color: TXT_DIM, letterSpacing: "0.08em" }}>{t(s.ar, s.en)}</p>
                    <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#fff" }}>{s.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div style={{ marginBottom: 40 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 20px", fontFamily: heading, display: "flex", alignItems: "center", gap: 10 }}>
                <GoldLine width={30} />
                {t("المميزات", "Features")}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  t("تكييف أوتوماتيك", "Automatic Climate Control"),
                  t("نظام ملاحة GPS", "GPS Navigation"),
                  t("شاشة لمسية", "Touchscreen Display"),
                  t("بلوتوث", "Bluetooth Connectivity"),
                  t("كاميرا خلفية", "Rear Camera"),
                  t("مقاعد جلدية", "Leather Seats"),
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0" }}>
                    <div style={{ width: 20, height: 20, border: `1.5px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check size={11} color={GOLD} />
                    </div>
                    <span style={{ fontSize: 14, color: TXT }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking Sidebar */}
          <div>
            <div style={{ background: BG2, border: `1px solid ${GOLD}20`, padding: "32px 28px", position: "sticky", top: 100 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <Crown size={16} color={GOLD} />
                <span style={{ fontSize: 11, color: GOLD, letterSpacing: "0.15em", fontWeight: 700 }}>{t("احجز الآن", "BOOK NOW")}</span>
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 24 }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: GOLD, fontFamily: heading }}>{car.pricePerDay.toLocaleString()}</span>
                <span style={{ fontSize: 14, color: TXT_DIM }}>{t("جنيه / يوم", "EGP / day")}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                <div>
                  <label style={{ display: "block", fontSize: 10, color: GOLD, letterSpacing: "0.12em", marginBottom: 6, fontWeight: 600 }}>{t("تاريخ الاستلام", "PICKUP DATE")}</label>
                  <input type="date" defaultValue="2026-04-15" style={{ width: "100%", padding: "11px 14px", background: BG3, border: `1px solid ${GOLD}25`, color: TXT, fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: body }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, color: GOLD, letterSpacing: "0.12em", marginBottom: 6, fontWeight: 600 }}>{t("تاريخ الإرجاع", "RETURN DATE")}</label>
                  <input type="date" defaultValue="2026-04-18" style={{ width: "100%", padding: "11px 14px", background: BG3, border: `1px solid ${GOLD}25`, color: TXT, fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: body }} />
                </div>
              </div>

              <div style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}20`, padding: "14px 16px", marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: TXT_DIM }}>{t("3 أيام", "3 days")}</span>
                  <span style={{ fontSize: 13, color: TXT }}>{(car.pricePerDay * 3).toLocaleString()} {t("جنيه", "EGP")}</span>
                </div>
                <div style={{ height: 1, background: `${GOLD}15`, margin: "8px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: GOLD }}>{t("الإجمالي", "Total")}</span>
                  <span style={{ fontSize: 20, fontWeight: 900, color: GOLD }}>{(car.pricePerDay * 3).toLocaleString()} {t("جنيه", "EGP")}</span>
                </div>
              </div>

              <button
                onClick={() => setBookingCar(car)}
                style={{
                  width: "100%", padding: "15px",
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
                  color: BG, border: "none", fontWeight: 700, fontSize: 14,
                  cursor: "pointer", letterSpacing: "0.1em", fontFamily: body,
                  transition: "box-shadow 0.3s", marginBottom: 10,
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 6px 24px ${GOLD}40`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = ""}
              >
                {t("احجز الآن", "RESERVE NOW")}
              </button>

              <button
                onClick={() => showEPage("home")}
                style={{
                  width: "100%", padding: "13px", background: SEC_BTN,
                  border: `1px solid ${SEC_BTN_BRD}`, color: SEC_BTN_TXT,
                  fontWeight: 600, fontSize: 13, cursor: "pointer",
                  letterSpacing: "0.08em", fontFamily: body, transition: "all 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${GOLD}28`; e.currentTarget.style.color = GOLD; }}
                onMouseLeave={e => { e.currentTarget.style.background = SEC_BTN; e.currentTarget.style.color = SEC_BTN_TXT; }}
              >
                {t("العودة للتشكيلة", "BACK TO COLLECTION")}
              </button>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${GOLD}12` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <Shield size={14} color={GOLD} />
                  <span style={{ fontSize: 12, color: TXT_DIM }}>{t("تأمين شامل متاح", "Full insurance available")}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Phone size={14} color={GOLD} />
                  <span style={{ fontSize: 12, color: TXT_DIM }}>{t("دعم 24/7", "24/7 Support")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        <div style={{ marginTop: 72, borderTop: `1px solid ${GOLD}12`, paddingTop: 48 }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 24px", fontFamily: heading }}>
            {t("سيارات مشابهة", "Similar Cars")}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {similarCars.map(sc => (
              <div
                key={sc.id}
                onClick={() => { showECarDetail(sc); window.scrollTo({ top: 0 }); }}
                style={{ background: BG3, border: `1px solid ${GOLD}12`, cursor: "pointer", transition: "all 0.3s", overflow: "hidden" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}50`; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}12`; (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                <div style={{ height: 180, overflow: "hidden" }}>
                  <img src={sc.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)", transition: "transform 0.5s" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                    onMouseLeave={e => e.currentTarget.style.transform = ""} />
                </div>
                <div style={{ padding: "18px 20px" }}>
                  <h4 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: heading }}>{t(sc.name.ar, sc.name.en)}</h4>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: TXT_DIM }}>{sc.year} · {sc.seats} {t("مقاعد", "seats")}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: GOLD }}>{sc.pricePerDay.toLocaleString()} {t("ج/يوم", "EGP/d")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {bookingCar && <BookingDialog car={bookingCar} onClose={() => setBookingCar(null)} />}
    </div>
  );
}