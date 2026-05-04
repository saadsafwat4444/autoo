import { useAppContext } from "@/app/contexts/AppContext";
import { BG, BG3, BG4, GOLD, GOLD_L, TXT, TXT_DIM, useFonts } from "@/app/themes/theme2/page";
import { sportsCars, SpeedLines, RED, SectionBadge, PAD } from "@/app/themes/theme3/page";
import { ChevronLeft, ChevronRight, Timer, Gauge, Zap, Users, Settings } from "lucide-react";
import { useRef, useState } from "react";
import CarDetail from "./CarDetails";
import BookingDialog from "./BookingDialog";

export default function Fleet() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [filter, setFilter] = useState("all");
  const [bookCar, setBookCar] = useState<typeof sportsCars[0] | null>(null);
  const [detailCar, setDetailCar] = useState<typeof sportsCars[0] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filters = [
    ["all", t("الكل", "ALL")],
    ["super", t("سوبر كار", "SUPERCAR")],
    ["hyper", t("هايبر كار", "HYPERCAR")],
    ["track", t("حلبات", "TRACK")],
  ];
  const filtered = filter === "all" ? sportsCars : sportsCars.filter(c => c.cat === filter);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section id="fleet-section" style={{ background: BG, padding: PAD, position: "relative" }}>
      <SpeedLines side="left" />
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <SectionBadge>{t("الأسطول", "THE FLEET")}</SectionBadge>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: TXT, fontFamily: heading, margin: "8px 0 0", letterSpacing: "0.02em" }}>
              {t("السيارات الرياضية", "SPORTS FLEET")}
            </h2>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {filters.map(([v, l]) => (
              <button key={v} onClick={() => setFilter(v)} style={{
                padding: "8px 20px", borderRadius: 4, fontFamily: heading,
                border: `1px solid ${filter === v ? RED : TXT + "20"}`,
                background: filter === v ? RED : "transparent",
                color: filter === v ? "#fff" : TXT_DIM,
                fontWeight: 700, cursor: "pointer", fontSize: 11, letterSpacing: "0.1em",
                transition: "all 0.2s",
              }}>{l}</button>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div style={{ position: "relative" }}>
          <button onClick={() => scroll(-1)} style={{
            position: "absolute", top: "50%", left: -16, transform: "translateY(-50%)", zIndex: 5,
            width: 44, height: 44, borderRadius: 4, background: RED, color: "#fff",
            border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><ChevronLeft size={20} /></button>
          <button onClick={() => scroll(1)} style={{
            position: "absolute", top: "50%", right: -16, transform: "translateY(-50%)", zIndex: 5,
            width: 44, height: 44, borderRadius: 4, background: RED, color: "#fff",
            border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><ChevronRight size={20} /></button>

          <div ref={scrollRef} style={{
            display: "flex", gap: 20, overflowX: "auto", scrollbarWidth: "none",
            padding: "8px 0 20px", scrollSnapType: "x mandatory",
          }}>
            {filtered.map(car => (
              <div key={car.id} style={{
                minWidth: 340, background: BG3, borderRadius: 4, overflow: "hidden",
                border: `1px solid ${TXT}08`, scrollSnapAlign: "start",
                transition: "all 0.3s", flexShrink: 0,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${RED}50`; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 20px 50px ${RED}15`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${TXT}08`; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
                {/* Image */}
                <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                  <img src={car.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.1)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,11,11,0.8) 0%, transparent 50%)" }} />
                  {/* Price tag */}
                  <div style={{ position: "absolute", top: 12, left: 12, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_L})`, borderRadius: 3, padding: "5px 12px" }}>
                    <span style={{ color: BG, fontSize: 12, fontWeight: 800, fontFamily: heading }}>{car.price.toLocaleString()} {t("جنيه", "EGP")}</span>
                  </div>
                  {/* 0-100 badge */}
                  <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", borderRadius: 3, padding: "4px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                    <Timer size={12} color={GOLD} />
                    <span style={{ color: TXT, fontSize: 13, fontWeight: 800, fontFamily: heading }}>0-100: {car.zero100}</span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "20px" }}>
                  <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 800, color: TXT, fontFamily: heading }}>{t(car.name.ar, car.name.en)}</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                    {[
                      { icon: <Gauge size={13} />, val: `${car.hp} HP` },
                      { icon: <Zap size={13} />, val: `${car.topSpeed} km/h` },
                      { icon: <Users size={13} />, val: `${car.seats} ${t("مقاعد", "seats")}` },
                      { icon: <Settings size={13} />, val: t(car.engine.ar, car.engine.en) },
                    ].map((item, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 6, background: BG4, borderRadius: 3, padding: "6px 10px" }}>
                        <span style={{ color: RED }}>{item.icon}</span>
                        <span style={{ fontSize: 11, color: TXT_DIM, fontWeight: 600 }}>{item.val}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setDetailCar(car)} style={{
                      flex: 1, padding: "10px", borderRadius: 4,
                      border: `1px solid ${RED}`, background: "transparent", color: RED,
                      fontWeight: 700, cursor: "pointer", fontSize: 12, fontFamily: heading, letterSpacing: "0.05em",
                    }}>{t("التفاصيل", "DETAILS")}</button>
                    <button onClick={() => setBookCar(car)} style={{
                      flex: 1, padding: "10px", borderRadius: 4,
                      background: RED, color: "#fff", border: "none",
                      fontWeight: 700, cursor: "pointer", fontSize: 12, fontFamily: heading, letterSpacing: "0.05em",
                    }}>{t("احجز الآن", "BOOK NOW")}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {bookCar && <BookingDialog car={bookCar} onClose={() => setBookCar(null)} />}
      {detailCar && <CarDetail car={detailCar} onClose={() => setDetailCar(null)} onBook={() => { setBookCar(detailCar); setDetailCar(null); }} />}
    </section>
  );
}