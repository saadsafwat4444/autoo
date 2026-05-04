"use client";

import { useAppContext } from "@/app/contexts/AppContext";
import { Car as CarIcon, ChevronRight, Filter, Star, Users, Zap, Fuel, Eye, ArrowRight } from "lucide-react";
import { cars } from "@/app/data/carDate";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CarDetailsDialog from "./CarDetailsDialog";
import BookingDialog from "./BookingDialog";
import { DARK } from "@/app/themes/theme1/page";
 
export default function WAllCars() {
  const { t, lang, accent } = useAppContext();
  const router = useRouter();
  const ff   = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isAr = lang === "ar";

  const categories = [
    { key: "all",     ar: "الكل",      en: "All" },
    { key: "luxury",  ar: "فاخر",      en: "Luxury" },
    { key: "suv",     ar: "SUV",       en: "SUV" },
    { key: "economy", ar: "اقتصادي",   en: "Economy" },
    { key: "sports",  ar: "رياضي",     en: "Sports" },
  ];

  const sortOptions = [
    { key: "default",   ar: "الافتراضي",       en: "Default" },
    { key: "price_asc", ar: "السعر: الأقل أولاً", en: "Price: Low to High" },
    { key: "price_desc",ar: "السعر: الأعلى أولاً", en: "Price: High to Low" },
    { key: "rating",    ar: "التقييم",          en: "Rating" },
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSort, setActiveSort] = useState("default");
  const [search, setSearch] = useState("");
  const [detailsCar, setDetailsCar] = useState<{ car: typeof cars[0]; img: string } | null>(null);
  const [bookingCar, setBookingCar] = useState<typeof cars[0] | null>(null);

  const catLabel = (c: typeof cars[0]) =>
    t(
      c.category === "luxury" ? "فاخر" : c.category === "sports" ? "رياضي" : c.category === "suv" ? "SUV" : "اقتصادي",
      c.category === "luxury" ? "Luxury" : c.category === "sports" ? "Sports" : c.category === "suv" ? "SUV" : "Economy"
    );

  let filtered = cars.filter(c =>
    (activeCategory === "all" || c.category === activeCategory) &&
    (search.trim() === "" || t(c.name.ar, c.name.en).toLowerCase().includes(search.toLowerCase()))
  );

  if (activeSort === "price_asc")  filtered = [...filtered].sort((a, b) => a.pricePerDay - b.pricePerDay);
  if (activeSort === "price_desc") filtered = [...filtered].sort((a, b) => b.pricePerDay - a.pricePerDay);
  if (activeSort === "rating")     filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div style={{ minHeight: "100vh", background: "#F5F7FB", fontFamily: ff, direction: isAr ? "rtl" : "ltr" }}>

      {/* Page Hero */}
      <div style={{ background: DARK, padding: "120px 48px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, flexDirection: isAr ? "row-reverse" : "row" }}>
            <button onClick={() => router.push("/")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 13, fontFamily: ff, padding: 0, fontWeight: 500 }}>
              {t("الرئيسية", "Home")}
            </button>
            <ChevronRight size={12} color="rgba(255,255,255,0.25)" style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
            <span style={{ color: accent, fontSize: 13, fontWeight: 600 }}>{t("السيارات", "Cars")}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 24, height: 2, background: accent, borderRadius: 2 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              {t("الأسطول الكامل", "Full Fleet")}
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", margin: 0, lineHeight: 1 }}>
            {t("جميع السيارات.", "All Cars.")}
          </h1>
          <p style={{ margin: "16px 0 0", fontSize: 16, color: "rgba(255,255,255,0.45)", maxWidth: 480 }}>
            {t(`${cars.length} سيارة متاحة للإيجار الفوري`, `${cars.length} cars available for immediate rental`)}
          </p>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div style={{ position: "sticky", top: 66, zIndex: 50, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>

          {/* Category pills */}
          <div style={{ display: "flex", gap: 6 }}>
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  padding: "7px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: ff,
                  transition: "all 0.18s",
                  background: activeCategory === cat.key ? accent : "transparent",
                  color: activeCategory === cat.key ? "#fff" : "#374151",
                  border: activeCategory === cat.key ? `1.5px solid ${accent}` : "1.5px solid rgba(0,0,0,0.12)",
                }}
              >
                {t(cat.ar, cat.en)}
              </button>
            ))}
          </div>

          {/* Search + Sort */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <Filter size={14} color="#9CA3AF" style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", [isAr ? "right" : "left"]: 11 }} />
              <input
                placeholder={t("ابحث عن سيارة...", "Search a car...")}
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  padding: isAr ? "8px 34px 8px 14px" : "8px 14px 8px 34px",
                  border: "1.5px solid rgba(0,0,0,0.12)", borderRadius: 10, fontSize: 13, fontFamily: ff,
                  outline: "none", background: "#fff", color: "#111", width: 200,
                  direction: isAr ? "rtl" : "ltr",
                }}
              />
            </div>
            <select
              value={activeSort}
              onChange={e => setActiveSort(e.target.value)}
              style={{ padding: "8px 14px", border: "1.5px solid rgba(0,0,0,0.12)", borderRadius: 10, fontSize: 13, fontFamily: ff, background: "#fff", color: "#374151", cursor: "pointer", outline: "none" }}
            >
              {sortOptions.map(o => (
                <option key={o.key} value={o.key}>{t(o.ar, o.en)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 48px 96px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "96px 0", color: "#9CA3AF" }}>
            <CarIcon size={48} color="#D1D5DB" style={{ marginBottom: 16 }} />
            <p style={{ fontSize: 18, fontWeight: 700, color: "#374151" }}>{t("لا توجد سيارات تطابق البحث", "No cars match your search")}</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>{t("جرب تغيير الفلتر أو الكلمة المفتاحية", "Try changing the filter or search term")}</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
            {filtered.map(car => (
              <div
                key={car.id}
                style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(0,0,0,0.07)", transition: "transform 0.25s, box-shadow 0.25s", cursor: "default" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
              >
                {/* Image */}
                <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                  <img
                    src={car.image} alt={t(car.name.ar, car.name.en)}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", display: "block" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "")}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)" }} />
                  {/* Category badge */}
                  <div style={{ position: "absolute", top: 14, [isAr ? "right" : "left"]: 14, background: accent, padding: "4px 12px", borderRadius: 20 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase" }}>{catLabel(car)}</span>
                  </div>
                  {/* Rating badge */}
                  <div style={{ position: "absolute", bottom: 14, [isAr ? "left" : "right"]: 14, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", padding: "5px 10px", borderRadius: 8, display: "flex", alignItems: "center", gap: 4 }}>
                    <Star size={11} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{car.rating}</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>({car.reviews})</span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "20px 22px 22px", textAlign: isAr ? "right" : "left" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexDirection: isAr ? "row-reverse" : "row" }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#111", letterSpacing: "-0.02em" }}>
                        {t(car.name.ar, car.name.en)}
                      </h3>
                      <span style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500 }}>{car.year}</span>
                    </div>
                    <div style={{ textAlign: isAr ? "left" : "right" }}>
                      <p style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#111", letterSpacing: "-0.03em", lineHeight: 1 }}>
                        {car.pricePerDay.toLocaleString()}
                      </p>
                      <span style={{ fontSize: 11, color: "#9CA3AF" }}>{t("جنيه/يوم", "EGP/day")}</span>
                    </div>
                  </div>

                  {/* Specs chips */}
                  <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap", flexDirection: isAr ? "row-reverse" : "row" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#6B7280", background: "#F3F4F6", padding: "4px 10px", borderRadius: 6 }}>
                      <Users size={11} />{car.seats} {t("مقاعد", "seats")}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#6B7280", background: "#F3F4F6", padding: "4px 10px", borderRadius: 6 }}>
                      {car.fuel.en === "Electric" ? <Zap size={11} /> : <Fuel size={11} />}{t(car.fuel.ar, car.fuel.en)}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#6B7280", background: "#F3F4F6", padding: "4px 10px", borderRadius: 6 }}>
                      <CarIcon size={11} />{t(car.transmission.ar, car.transmission.en)}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: "flex", gap: 8, flexDirection: isAr ? "row-reverse" : "row" }}>
                    <button
                      onClick={() => setDetailsCar({ car, img: car.image })}
                      style={{ flex: 1, padding: "10px 0", border: `1.5px solid rgba(0,0,0,0.12)`, background: "transparent", color: "#374151", fontWeight: 700, cursor: "pointer", fontSize: 12, fontFamily: ff, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "all 0.2s", borderRadius: 10 }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)"; e.currentTarget.style.color = "#374151"; }}
                    >
                      <Eye size={13} />{t("التفاصيل", "Details")}
                    </button>
                    <button
                      onClick={() => setBookingCar(car)}
                      style={{ flex: 1, padding: "10px 0", border: "none", background: accent, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 12, fontFamily: ff, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, borderRadius: 10, transition: "opacity 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
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
        )}
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
    </div>
  );
}