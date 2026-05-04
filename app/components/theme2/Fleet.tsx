import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { BG, BG3, GOLD, GOLD_D, SEC_BTN, SEC_BTN_BRD, SEC_BTN_TXT, SectionLabel, showECarDetail, TXT_DIM, PAD, useFonts } from "@/app/themes/theme2/page";
import { Star, Users, Settings, Fuel, Calendar } from "lucide-react";
import { useState } from "react";
import BookingDialog from "./BookingDialog";

  // ─── LUXURY FLEET ─────────────────────────────────────────────────────────────
export default function Fleet() {
  const { t } = useAppContext();
  const { heading, body, isAr } = useFonts();
  const [bookingCar, setBookingCar] = useState<typeof cars[0] | null>(null);
  const [filter, setFilter] = useState("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = filter === "all" ? cars : cars.filter(c => c.category === filter);
  const filters = [
    ["all", t("الكل", "All")],
    ["luxury", t("فاخر", "Luxury")],
    ["suv", "SUV"],
    ["sports", t("رياضي", "Sports")],
    ["economy", t("اقتصادي", "Economy")],
  ];

  return (
    <section id="elite-fleet" style={{ background: BG, padding: PAD }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px" }}>
        {/* Header */}
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", textAlign: "center", marginBottom: 60 }}>
          <div>
            <SectionLabel>{t("تشكيلتنا الفاخرة", "OUR LUXURY COLLECTION")}</SectionLabel>
            <h2 style={{ margin: "16px 0", fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 700, color: "#fff", fontFamily: heading }}>
              {t("اختر سيارتك المثالية", "Choose Your Perfect Car")}
            </h2>
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
            {filters.map(([v, l]) => (
              <button
                key={v}
                onClick={() => setFilter(v)}
                style={{
                  padding: "9px 22px", fontSize: 12, cursor: "pointer", fontFamily: body,
                  letterSpacing: "0.06em", fontWeight: 600, transition: "all 0.3s",
                  background: filter === v ? `linear-gradient(135deg, ${GOLD}, ${GOLD_D})` : SEC_BTN,
                  color: filter === v ? BG : SEC_BTN_TXT,
                  border: `1px solid ${filter === v ? "transparent" : SEC_BTN_BRD}`,
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {filtered.map(car => {
            const hovered = hoveredId === car.id;
            return (
              <div
                key={car.id}
                onMouseEnter={() => setHoveredId(car.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: BG3, border: `1px solid ${hovered ? GOLD + "60" : GOLD + "15"}`,
                  transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                  transform: hovered ? "translateY(-6px)" : "",
                  boxShadow: hovered ? `0 20px 50px ${GOLD}15` : "none",
                  overflow: "hidden",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
                  <img
                    src={car.image} alt=""
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      transition: "transform 0.6s, filter 0.6s",
                      transform: hovered ? "scale(1.08)" : "",
                      filter: hovered ? "brightness(0.9)" : "brightness(0.75)",
                    }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,11,11,0.85) 0%, rgba(11,11,11,0.2) 50%, transparent 100%)" }} />

                  {/* Price badge */}
                  <div style={{
                    position: "absolute", top: 16, [isAr ? "left" : "right"]: 16,
                    background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
                    padding: "6px 16px",
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: BG, letterSpacing: "0.02em" }}>
                      {car.pricePerDay.toLocaleString()} {t("ج/يوم", "EGP/d")}
                    </span>
                  </div>

                  {/* Rating */}
                  <div style={{ position: "absolute", bottom: 16, [isAr ? "right" : "left"]: 18, display: "flex", alignItems: "center", gap: 5 }}>
                    {Array.from({  length: Math.round(car.rating) }).map((_, i) => (
                      <Star key={i} size={12} fill={GOLD} color={GOLD} />
                    ))}
                    <span style={{ fontSize: 12, color: TXT_DIM, marginLeft: 4 }}>({car.reviews})</span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "22px 24px 26px" }}>
                  <h3 style={{ margin: "0 0 12px", fontSize: 19, fontWeight: 700, color: "#fff", fontFamily: heading }}>
                    {t(car.name.ar, car.name.en)}
                  </h3>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                    {[
                      { Icon: Users, val: `${car.seats} ${t("مقاعد", "Seats")}` },
                      { Icon: Settings, val: t(car.transmission.ar, car.transmission.en) },
                      { Icon: Fuel, val: t(car.fuel.ar, car.fuel.en) },
                      { Icon: Calendar, val: car.year.toString() },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <item.Icon size={14} color={GOLD} style={{ opacity: 0.6 }} />
                        <span style={{ fontSize: 12, color: TXT_DIM }}>{item.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => showECarDetail(car)}
                      style={{
                        flex: 1, padding: "11px", background: SEC_BTN,
                        border: `1px solid ${SEC_BTN_BRD}`, color: SEC_BTN_TXT,
                        fontSize: 12, cursor: "pointer", letterSpacing: "0.08em",
                        fontFamily: body, fontWeight: 600, transition: "all 0.25s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${GOLD}28`; e.currentTarget.style.color = GOLD; }}
                      onMouseLeave={e => { e.currentTarget.style.background = SEC_BTN; e.currentTarget.style.color = SEC_BTN_TXT; }}>
                      {t("التفاصيل", "DETAILS")}
                    </button>
                    <button
                      onClick={() => setBookingCar(car)}
                      style={{
                        flex: 1, padding: "11px",
                        background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
                        color: BG, border: "none", fontSize: 12, fontWeight: 700,
                        cursor: "pointer", letterSpacing: "0.08em", fontFamily: body,
                        transition: "box-shadow 0.25s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 16px ${GOLD}40`}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = ""}>
                      {t("احجز", "RESERVE")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {bookingCar && <BookingDialog car={bookingCar} onClose={() => setBookingCar(null)} />}
    </section>
  );
}