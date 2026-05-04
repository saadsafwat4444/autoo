import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { PAD } from "@/app/themes/theme7/page";
import { useFonts, BG } from "@/app/themes/theme8/page";
import { DK2, pad, AMB, W, TX, BD, TX3, TX2 } from "@/app/themes/theme8/page";
import { O, OL, CAR_FEATURES, OD, EXTRA_IMGS, OBG, T8BookingModal } from "@/app/themes/theme8/page";
import { ArrowLeft, ArrowRight, Car, Star, Users, Settings, Fuel, Eye, X, Calendar } from "lucide-react";
import { useState } from "react";

export default function CarShowcase() {
  const { t, isRTL } = useAppContext();
  const { h, b } = useFonts();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [filter, setFilter] = useState("all");
  const [bookingCar, setBookingCar] = useState<number | null>(null);
  const [detailCar, setDetailCar] = useState<number | null>(null);
  const [detailImg, setDetailImg] = useState(0);
  const bookCar = bookingCar !== null ? cars.find(c => c.id === bookingCar) || null : null;
  const dCar = detailCar !== null ? cars.find(c => c.id === detailCar) || null : null;

  const categories = [
    { id: "all", ar: "الكل", en: "All" },
    { id: "sedan", ar: "سيدان", en: "Sedan" },
    { id: "suv", ar: "دفع رباعي", en: "SUV" },
    { id: "luxury", ar: "فاخرة", en: "Luxury" },
  ];

  const filteredCars = filter === "all" ? cars.slice(0, 8) : cars.filter(c => {
    if (filter === "sedan") return c.category === "economy";
    if (filter === "suv") return c.category === "suv";
    if (filter === "luxury") return c.category === "luxury" || c.category === "sports";
    return true;
  }).slice(0, 8);

  return (
    <section id="fleet" style={{ padding: PAD, background: DK2, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${O}08 0%, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ ...pad, position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, color: OL, marginBottom: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <Car size={15} /> {t("أسطولنا", "Our Fleet")}
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: "#fff", fontFamily: h, margin: 0 }}>
              {t("استكشف سياراتنا", "Explore Our Cars")}
            </h2>
          </div>
          <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 4 }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setFilter(cat.id)} style={{
                padding: "10px 20px", borderRadius: 10,
                background: filter === cat.id ? O : "transparent",
                color: filter === cat.id ? "#fff" : "rgba(255,255,255,0.5)",
                border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: h,
                transition: "all 0.25s",
              }}>
                {t(cat.ar, cat.en)}
              </button>
            ))}
          </div>
        </div>

        {/* Cars horizontal scroll */}
        <div style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 20, scrollSnapType: "x mandatory" }} className="t8-noscroll">
          {filteredCars.map((cr, i) => {
            const feats = CAR_FEATURES[cr.category] || CAR_FEATURES.economy;
            return (
              <div key={cr.id} style={{
                flex: "0 0 300px", scrollSnapAlign: "start",
                borderRadius: 22, overflow: "hidden",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                transition: "all 0.35s",
                animation: `t8fi ${0.3 + i * 0.1}s ease-out`,
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.borderColor = `${O}40`; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
                <div style={{ position: "relative" }}>
                  <img src={cr.image} alt="" style={{ width: "100%", height: 180, objectFit: "cover" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 50, background: "linear-gradient(transparent, rgba(0,0,0,0.4))" }} />
                  <div style={{ position: "absolute", top: 10, [isRTL ? "left" : "right"]: 10, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", borderRadius: 8, padding: "4px 10px", display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: AMB }}>
                    <Star size={11} fill={AMB} color={AMB} /> {cr.rating}
                  </div>
                  <div style={{ position: "absolute", top: 10, [isRTL ? "right" : "left"]: 10, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", borderRadius: 8, padding: "4px 10px", fontSize: 10, fontWeight: 700, color: "#fff" }}>
                    {cr.year}
                  </div>
                </div>
                <div style={{ padding: "16px 18px 18px" }}>
                  <h4 style={{ fontSize: 15, fontWeight: 800, color: "#fff", fontFamily: h, marginBottom: 8 }}>
                    {t(cr.name.ar, cr.name.en)}
                  </h4>
                  <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 4 }}><Users size={11} /> {cr.seats}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 4 }}><Settings size={11} /> {t(cr.transmission.ar, cr.transmission.en)}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 4 }}><Fuel size={11} /> {t(cr.fuel.ar, cr.fuel.en)}</span>
                  </div>
                  {/* Quick features preview */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
                    {feats.slice(0, 3).map((f, fi) => (
                      <span key={fi} style={{ fontSize: 9, color: OL, background: `${O}12`, borderRadius: 6, padding: "3px 8px", display: "inline-flex", alignItems: "center", gap: 3 }}>
                        {f.icon} {t(f.ar, f.en)}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ fontSize: 20, fontWeight: 900, color: O, fontFamily: h }}>{cr.pricePerDay}</span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginInlineStart: 4 }}>{t("ج.م/يوم", "EGP/day")}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => { setDetailCar(cr.id); setDetailImg(0); }} style={{
                        padding: "9px 12px", borderRadius: 10,
                        background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)",
                        fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center",
                        transition: "background 0.2s",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}>
                        <Eye size={14} />
                      </button>
                      <button onClick={() => setBookingCar(cr.id)} style={{
                        padding: "9px 18px", borderRadius: 10,
                        background: O, color: "#fff", border: "none",
                        fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: h,
                        display: "flex", alignItems: "center", gap: 5,
                        transition: "background 0.2s",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = OD; }}
                        onMouseLeave={e => { e.currentTarget.style.background = O; }}>
                        {t("احجز", "Book")} <Arrow size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Car Detail Modal */}
      {dCar && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9990, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setDetailCar(null)}>
          <div style={{ background: W, borderRadius: 28, width: "100%", maxWidth: 780, maxHeight: "92vh", overflow: "auto", boxShadow: "0 30px 80px rgba(0,0,0,0.2)", animation: "t8pop 0.3s" }} onClick={e => e.stopPropagation()}>
            {/* Gallery */}
            <div style={{ position: "relative", height: 340 }}>
              {(() => {
                const imgs = [dCar.image, EXTRA_IMGS[1], EXTRA_IMGS[2], EXTRA_IMGS[3]].filter(Boolean);
                return <img src={imgs[detailImg % imgs.length]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "28px 28px 0 0" }} />;
              })()}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5))", borderRadius: "28px 28px 0 0" }} />
              <button onClick={() => setDetailCar(null)} style={{ position: "absolute", top: 16, [isRTL ? "left" : "right"]: 16, width: 40, height: 40, borderRadius: "50%", background: W, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} color={TX} /></button>
              <div style={{ position: "absolute", bottom: 20, left: 24, right: 24 }}>
                <h2 style={{ fontSize: 26, fontWeight: 900, color: "#fff", fontFamily: h }}>{t(dCar.name.ar, dCar.name.en)}</h2>
                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                  <span style={{ background: O, color: "#fff", borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>{dCar.year}</span>
                  <span style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)", color: "#fff", borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    <Star size={11} fill={AMB} color={AMB} /> {dCar.rating} ({dCar.reviews})
                  </span>
                </div>
              </div>
              {/* Thumbnail dots */}
              <div style={{ position: "absolute", bottom: 20, [isRTL ? "left" : "right"]: 24, display: "flex", gap: 6 }}>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} onClick={(e) => { e.stopPropagation(); setDetailImg(i); }} style={{
                    width: detailImg === i ? 24 : 10, height: 10, borderRadius: 5,
                    background: detailImg === i ? O : "rgba(255,255,255,0.4)",
                    cursor: "pointer", transition: "all 0.2s",
                  }} />
                ))}
              </div>
            </div>

            <div style={{ padding: "28px 28px 32px" }}>
              {/* Specs row */}
              <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
                {[
                  { icon: <Users size={16} />, val: `${dCar.seats}`, label: t("مقاعد", "Seats") },
                  { icon: <Settings size={16} />, val: t(dCar.transmission.ar, dCar.transmission.en), label: t("ناقل الحركة", "Transmission") },
                  { icon: <Fuel size={16} />, val: t(dCar.fuel.ar, dCar.fuel.en), label: t("الوقود", "Fuel") },
                  { icon: <Calendar size={16} />, val: `${dCar.year}`, label: t("سنة الصنع", "Year") },
                ].map((sp, i) => (
                  <div key={i} style={{ flex: "1 1 120px", background: BG, borderRadius: 14, padding: "14px 16px", border: `1px solid ${BD}`, display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: OBG, color: O, display: "flex", alignItems: "center", justifyContent: "center" }}>{sp.icon}</div>
                    <div>
                      <div style={{ fontSize: 11, color: TX3 }}>{sp.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: TX }}>{sp.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <h4 style={{ fontSize: 16, fontWeight: 800, color: TX, fontFamily: h, marginBottom: 14 }}>{t("المميزات", "Features")}</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 28 }}>
                {(CAR_FEATURES[dCar.category] || CAR_FEATURES.economy).map((f, fi) => (
                  <div key={fi} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: BG, borderRadius: 12, border: `1px solid ${BD}` }}>
                    <span style={{ color: O }}>{f.icon}</span>
                    <span style={{ fontSize: 13, color: TX2, fontWeight: 600 }}>{t(f.ar, f.en)}</span>
                  </div>
                ))}
              </div>

              {/* Price + Book */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: OBG, borderRadius: 16, padding: "18px 22px", border: `1px solid ${O}15` }}>
                <div>
                  <div style={{ fontSize: 12, color: TX3 }}>{t("السعر اليومي", "Daily Price")}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontSize: 28, fontWeight: 900, color: O, fontFamily: h }}>{dCar.pricePerDay}</span>
                    <span style={{ fontSize: 13, color: TX3 }}>{t("ج.م/يوم", "EGP/day")}</span>
                  </div>
                </div>
                <button onClick={() => { setDetailCar(null); setBookingCar(dCar.id); }} style={{
                  padding: "15px 36px", borderRadius: 14,
                  background: O, color: "#fff", border: "none",
                  fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: h,
                  display: "flex", alignItems: "center", gap: 8,
                  boxShadow: "0 6px 24px rgba(249,115,22,0.25)",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = OD; }}
                  onMouseLeave={e => { e.currentTarget.style.background = O; }}>
                  {t("احجز الآن", "Book Now")} <Arrow size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {bookCar && <T8BookingModal car={bookCar} onClose={() => setBookingCar(null)} isRTL={isRTL} t={t} h={h} b={b} />}
    </section>
  );
}