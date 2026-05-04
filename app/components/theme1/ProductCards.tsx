"use client";

import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { useRef, useState } from "react";
import { ChevronDown, Star, Users, Zap, Fuel, Eye, ArrowRight } from "lucide-react";
 
import CarDetailsDialog from "./CarDetailsDialog";
import BookingDialog from "./BookingDialog";
import { DARK, GAP, PAD } from "@/app/themes/theme1/page";
import { useRouter } from "next/navigation";

export default function ProductCards() {
    const router = useRouter();
    const { t, lang, accent } = useAppContext();
  const ff    = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isAr  = lang === "ar";
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const [detailsCar, setDetailsCar] = useState<{ car: typeof cars[0]; img: string } | null>(null);
  const [bookingCar, setBookingCar] = useState<typeof cars[0] | null>(null);
 const slide = (dir: number) => {
    if (!sliderRef.current) return;
    const card = sliderRef.current.querySelector("[data-car-card]") as HTMLElement;
    if (!card) return;
    sliderRef.current.scrollBy({ left: dir * (card.offsetWidth + GAP), behavior: "smooth" });
  };

  return (
    <section style={{ background: `linear-gradient(180deg, #0A0A14 0%, ${DARK}F0 100%)`, padding: PAD, fontFamily: ff, direction: isAr ? "rtl" : "ltr" }}>
      <style>{`.drivenow-slider::-webkit-scrollbar{display:none}`}</style>

      {/* Header */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 24, height: 2, background: accent, borderRadius: 2 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              {t("الأسطول", "Fleet")}
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", margin: 0, lineHeight: 1 }}>
            {t("اختر فئتك.", "Choose your category.")}
          </h2>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <button
            onClick={() => slide(isAr ? 1 : -1)}
            style={{ width: 44, height: 44, border: `1.5px solid rgba(255,255,255,0.15)`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", borderRadius: 10 }}
            onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.borderColor = accent; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
          >
            <ChevronDown size={18} color="#fff" style={{ transform: isAr ? "rotate(-90deg)" : "rotate(90deg)", pointerEvents: "none" }} />
          </button>
          <button
            onClick={() => slide(isAr ? -1 : 1)}
            style={{ width: 44, height: 44, border: `1.5px solid rgba(255,255,255,0.15)`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", borderRadius: 10 }}
            onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.borderColor = accent; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
          >
            <ChevronDown size={18} color="#fff" style={{ transform: isAr ? "rotate(90deg)" : "rotate(-90deg)", pointerEvents: "none" }} />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="drivenow-slider"
        dir="ltr"
        style={{ display: "flex", gap: GAP, overflowX: "scroll", scrollSnapType: "x mandatory", scrollbarWidth: "none", padding: "0 48px 16px" }}
      >
        {(isAr ? [...cars].reverse() : cars).map((car) => (
          <div
            key={car.id}
            data-car-card=""
            dir={isAr ? "rtl" : "ltr"}
            style={{
              minWidth: "calc(25vw - 28px)", scrollSnapAlign: "start",
              background: "#12142A", borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.07)",
              display: "flex", flexDirection: "column", flexShrink: 0,
              overflow: "hidden", transition: "border-color 0.25s, transform 0.25s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${accent}55`; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            {/* Image */}
            <div style={{ height: 210, overflow: "hidden", position: "relative", flexShrink: 0 }}>
              <img
                src={car.image} alt={t(car.name.ar, car.name.en)}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.07)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", top: 12, [isAr ? "right" : "left"]: 12, background: accent, padding: "4px 11px", borderRadius: 6 }}>
                <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  {t(
                    car.category === "luxury" ? "فاخر" : car.category === "sports" ? "رياضي" : car.category === "suv" ? "SUV" : "اقتصادي",
                    car.category === "luxury" ? "Luxury" : car.category === "sports" ? "Sports" : car.category === "suv" ? "SUV" : "Economy"
                  )}
                </span>
              </div>
              <div style={{ position: "absolute", bottom: 12, [isAr ? "left" : "right"]: 12, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", padding: "4px 10px", borderRadius: 6, display: "flex", alignItems: "center", gap: 4 }}>
                <Star size={10} fill="#F59E0B" color="#F59E0B" />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{car.rating}</span>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "18px 18px 20px", display: "flex", flexDirection: "column", flex: 1, textAlign: isAr ? "right" : "left" }}>
              <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
                {t(car.name.ar, car.name.en)}
              </h3>
              <div style={{ display: "flex", flexDirection: isAr ? "row-reverse" : "row", gap: 6, marginBottom: "auto", flexWrap: "wrap" }}>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.07)", padding: "3px 8px", borderRadius: 6, display: "flex", alignItems: "center", gap: 3 }}>
                  <Users size={10} /> {car.seats} {t("مقاعد", "seats")}
                </span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.07)", padding: "3px 8px", borderRadius: 6, display: "flex", alignItems: "center", gap: 3 }}>
                  {car.fuel.en === "Electric" ? <Zap size={10} /> : <Fuel size={10} />}
                  {t(car.fuel.ar, car.fuel.en)}
                </span>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 13, marginTop: 13, marginBottom: 13 }}>
                <p style={{ margin: 0, fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>
                  {car.pricePerDay.toLocaleString()}
                  <span style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,255,255,0.4)" }}> {t("جنيه/يوم", "EGP/day")}</span>
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: isAr ? "row-reverse" : "row", gap: 6 }}>
                <button
                  onClick={() => setDetailsCar({ car, img: car.image })}
                  style={{ flex: 1, padding: "9px 0", border: `1.5px solid rgba(255,255,255,0.12)`, background: "transparent", color: "rgba(255,255,255,0.75)", fontWeight: 700, cursor: "pointer", fontSize: 11, fontFamily: ff, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "all 0.2s", borderRadius: 8 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                >
                  <Eye size={12} /> {t("التفاصيل", "Details")}
                </button>
                <button
                  onClick={() => setBookingCar(car)}
                  style={{ flex: 1, padding: "9px 0", border: "none", background: accent, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 11, fontFamily: ff, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, borderRadius: 8 }}
                >
                  {isAr
                    ? <><ArrowRight size={12} style={{ transform: "scaleX(-1)" }} />{t("احجز", "Book")}</>
                    : <>{t("احجز", "Book")} <ArrowRight size={12} /></>}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 44 }}>
        <button
          onClick={() => router.push("/cars")}
               
          style={{ padding: "13px 48px", border: `1.5px solid rgba(255,255,255,0.15)`, background: "transparent", color: "rgba(255,255,255,0.7)", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: ff, display: "flex", alignItems: "center", gap: 8, letterSpacing: "0.03em", transition: "all 0.25s", borderRadius: 10 }}
          onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
        >
          {isAr
            ? <><ArrowRight size={15} style={{ transform: "scaleX(-1)" }} />{t("عرض جميع السيارات", "View All Cars")}</>
            : <>{t("عرض جميع السيارات", "View All Cars")} <ArrowRight size={15} /></>}
        </button>
      </div>

      {detailsCar && (
        <CarDetailsDialog
          car={detailsCar.car}
          img={detailsCar.img}
          onClose={() => setDetailsCar(null)}
          onBook={() => { setBookingCar(detailsCar.car); setDetailsCar(null); }}
        />
      )}
      {bookingCar && <BookingDialog car={bookingCar} onClose={() => setBookingCar(null)} />}
    </section>
  );
}