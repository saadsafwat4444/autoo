import { useAppContext } from "@/app/contexts/AppContext";
import { cars } from "@/app/data/carDate";
import { PAD } from "@/app/themes/theme7/page";
import { useFonts, BG } from "@/app/themes/theme8/page";
import { W, pad, TX, TX3, BD, AMB } from "@/app/themes/theme8/page";
import { SITUATIONS, O, OD, T8BookingModal } from "@/app/themes/theme8/page";
import { ArrowLeft, ArrowRight, HelpCircle, Check, Car, ThumbsUp, Users, Fuel, Star } from "lucide-react";
import { useState } from "react";

export default function Situations() {
  const { t, isRTL } = useAppContext();
  const { h, b } = useFonts();
  const [activeSit, setActiveSit] = useState<string | null>(null);
  const [bookingCar, setBookingCar] = useState<number | null>(null);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const sit = activeSit ? SITUATIONS.find(s => s.id === activeSit) : null;
  const bookCar = bookingCar !== null ? cars.find(c => c.id === bookingCar) || null : null;

  return (
    <section id="situations" style={{ padding: PAD, background: W }}>
      <div style={pad}>
        {/* Section header */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, color: O, marginBottom: 14, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <HelpCircle size={15} />
            {t("ما الموقف الذي تمر به؟", "What's Your Situation?")}
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: TX, fontFamily: h, marginBottom: 10 }}>
            {t("اختر موقفك وسنعرض لك الحل", "Pick Your Situation, We'll Show the Solution")}
          </h2>
          <p style={{ fontSize: 15, color: TX3, maxWidth: 520}}>
            {t("لا تحتاج تبحث في عشرات السيارات — اختر موقفك فقط", "No need to browse dozens of cars — just pick your situation")}
          </p>
        </div>

        {/* Situation cards — Image-based */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 50 }}>
          {SITUATIONS.map((s) => {
            const isActive = activeSit === s.id;
            return (
              <div key={s.id} onClick={() => setActiveSit(isActive ? null : s.id)}
                style={{
                  position: "relative", borderRadius: 20, overflow: "hidden",
                  height: 220, cursor: "pointer",
                  border: isActive ? `3px solid ${s.color}` : `3px solid transparent`,
                  transition: "all 0.35s ease",
                  boxShadow: isActive ? `0 12px 40px ${s.color}20` : "0 2px 12px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.transform = "translateY(-6px)"; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.transform = ""; }}>
                {/* Image */}
                <img src={s.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} />
                {/* Overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: isActive
                    ? `linear-gradient(180deg, ${s.color}30 0%, ${s.color}DD 100%)`
                    : "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%)",
                  transition: "all 0.35s",
                }} />
                {/* Content */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 22px" }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: 42, height: 42, borderRadius: 12,
                    background: isActive ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.15)",
                    color: "#fff", marginBottom: 10,
                    backdropFilter: "blur(6px)",
                  }}>{s.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: "#fff", fontFamily: h, marginBottom: 4 }}>
                    {t(s.ar, s.en)}
                  </h3>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>
                    {t(s.desc.ar, s.desc.en)}
                  </p>
                  {isActive && (
                    <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 5, color: "#fff", fontSize: 12, fontWeight: 700, background: "rgba(255,255,255,0.2)", padding: "5px 14px", borderRadius: 20, backdropFilter: "blur(6px)" }}>
                      <Check size={13} /> {t("تم الاختيار", "Selected")}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ═══ SOLUTION PANEL ═══ */}
        {sit && (
          <div style={{ animation: "t8slideUp 0.5s ease-out" }}>
            {/* Why section */}
            <div style={{
              borderRadius: 24, overflow: "hidden", marginBottom: 32,
              border: `1px solid ${BD}`, background: W,
            }}>
              {/* Top accent bar */}
              <div style={{ height: 4, background: sit.color }} />
              <div style={{ padding: "28px 32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: `${sit.color}10`, color: sit.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {sit.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: TX, fontFamily: h, marginBottom: 2 }}>
                      {t("لماذا هذه السيارات مناسبة لك؟", "Why Are These Cars Right for You?")}
                    </h3>
                    <p style={{ fontSize: 13, color: TX3, margin: 0 }}>{t(sit.desc.ar, sit.desc.en)}</p>
                  </div>
                </div>

                {/* Reason cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 32 }}>
                  {sit.why.map((w, wi) => (
                    <div key={wi} style={{
                      display: "flex", alignItems: "flex-start", gap: 12,
                      background: BG, borderRadius: 16, padding: "18px 18px",
                      border: `1px solid ${BD}`,
                    }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                        background: `${sit.color}10`, color: sit.color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>{w.icon}</div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: TX, lineHeight: 1.6, paddingTop: 2 }}>{t(w.ar, w.en)}</span>
                    </div>
                  ))}
                </div>

                {/* Recommended cars */}
                <h4 style={{ fontSize: 16, fontWeight: 800, color: TX, fontFamily: h, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                  <Car size={18} color={sit.color} />
                  {t("السيارات المقترحة لهذا الموقف", "Recommended Cars for This Situation")}
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                  {sit.cars.map((ci) => {
                    const cr = cars[ci - 1];
                    if (!cr) return null;
                    return (
                      <div key={cr.id} style={{
                        borderRadius: 18, overflow: "hidden", background: W,
                        border: `1.5px solid ${BD}`, transition: "all 0.3s",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 12px 36px rgba(0,0,0,0.06)`; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
                        <div style={{ position: "relative" }}>
                          <img src={cr.image} alt="" style={{ width: "100%", height: 155, objectFit: "cover" }} />
                          <div style={{
                            position: "absolute", top: 10, [isRTL ? "left" : "right"]: 10,
                            background: sit.color, color: "#fff",
                            padding: "4px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700,
                            display: "flex", alignItems: "center", gap: 4,
                          }}>
                            <ThumbsUp size={11} /> {t("مناسبة", "Great Fit")}
                          </div>
                        </div>
                        <div style={{ padding: "16px 18px" }}>
                          <h5 style={{ fontSize: 15, fontWeight: 800, color: TX, fontFamily: h, marginBottom: 8 }}>{t(cr.name.ar, cr.name.en)}</h5>
                          <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
                            <span style={{ fontSize: 11, color: TX3, display: "flex", alignItems: "center", gap: 4 }}><Users size={12} /> {cr.seats} {t("مقاعد", "seats")}</span>
                            <span style={{ fontSize: 11, color: TX3, display: "flex", alignItems: "center", gap: 4 }}><Fuel size={12} /> {t(cr.fuel.ar, cr.fuel.en)}</span>
                            <span style={{ fontSize: 11, color: TX3, display: "flex", alignItems: "center", gap: 4 }}><Star size={12} fill={AMB} color={AMB} /> {cr.rating}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div>
                              <span style={{ fontSize: 20, fontWeight: 900, color: O, fontFamily: h }}>{cr.pricePerDay}</span>
                              <span style={{ fontSize: 11, color: TX3 }}> {t("ج.م/يوم", "EGP/day")}</span>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); setBookingCar(cr.id); }} style={{
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
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Booking Modal */}
      {bookCar && <T8BookingModal car={bookCar} onClose={() => setBookingCar(null)} isRTL={isRTL} t={t} h={h} b={b} />}
    </section>
  );
}