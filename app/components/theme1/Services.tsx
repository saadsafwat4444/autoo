"use client";

import { useAppContext } from "@/app/contexts/AppContext";
import { useState } from "react";
import { Car, Calendar, Users, Plane, Star, Building2, ArrowRight } from "lucide-react";
import { cars } from "@/app/data/carDate";
import { useRouter } from "next/navigation";
import { OFF_WHITE, PAD } from "@/app/themes/theme1/page";
import WBookingDialog from "./BookingDialog";

export default function Services() {
  const { t, lang, accent } = useAppContext();
  const router = useRouter();
  const ff   = lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif";
  const isAr = lang === "ar";
  const [hovered, setHovered] = useState<number | null>(null);

  const [svcBookingCar, setSvcBookingCar] = useState<any | null>(null);

  const services = [
    { Icon: Car,       num: "01", title: { ar: "تأجير يومي",    en: "Daily Rental"      }, desc: { ar: "سيارات متاحة طوال اليوم بأسعار مرنة وشفافة تماماً.",   en: "Cars around the clock with flexible, transparent pricing." }, 
    action: () => router.push("/cars") 
  },
    { Icon: Calendar,  num: "02", title: { ar: "تأجير شهري",    en: "Monthly Rental"    }, desc: { ar: "أفضل سعر طويل المدى مع امتيازات وخصومات إضافية.",        en: "Best long-term rate with exclusive perks and discounts." },
     action: () => router.push("/") 
     },
    { Icon: Users,     num: "03", title: { ar: "تأجير مع سائق", en: "Chauffeur Service" }, desc: { ar: "سائق محترف مدرَّب في خدمتك على مدار الساعة.",             en: "A trained professional driver at your service, 24/7." }, action: () => setSvcBookingCar(cars[0]) },
    { Icon: Plane,     num: "04", title: { ar: "خدمة المطار",   en: "Airport Transfer"  }, desc: { ar: "استلام وتسليم في الوقت المحدد دائماً من وإلى المطار.",    en: "Always on-time pick-up and drop-off at the airport." }, action: () => setSvcBookingCar(cars[0]) },
    { Icon: Star,      num: "05", title: { ar: "المناسبات",     en: "Events"            }, desc: { ar: "سيارات فاخرة تليق بأفراحك ومناسباتك الخاصة.",             en: "Luxury cars fit for your weddings and special occasions." }, action: () => router.push("/cars") },
    { Icon: Building2, num: "06", title: { ar: "الشركات",       en: "Corporate"         }, desc: { ar: "باقات مرنة مصممة للشركات وأساطيل العمل التجارية.",         en: "Flexible packages designed for companies and work fleets." }, action: () => router.push("/") },
  ];
  return (
    <section id="w-services" style={{ background: OFF_WHITE, fontFamily: ff, direction: isAr ? "rtl" : "ltr" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto",padding: PAD }}>

        {/* Header 2-col */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 56 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 24, height: 2, background: accent, borderRadius: 2 }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                {t("خدماتنا", "Our Services")}
              </span>
            </div>
            <h2 style={{ margin: 0, fontSize: "clamp(2.2rem,3.5vw,3.2rem)", fontWeight: 900, color: "#0A0A1A", letterSpacing: "-0.04em", lineHeight: 1.08 }}>
              {t("كل ما تحتاجه", "Everything you need")}
              <br />
              <span style={{ color: accent }}>{t("في مكان واحد.", "in one place.")}</span>
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: 15, color: "#6B7280", lineHeight: 1.8, maxWidth: 520 }}>
            {t(
              "من التأجير اليومي إلى العقود المؤسسية — نوفر حلول تنقل متكاملة لكل احتياجاتك.",
              "From daily rentals to corporate contracts — complete mobility solutions for every need."
            )}
          </p>
        </div>

        {/* Bento Grid 3×2 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {services.map((svc, i) => {
            const active = hovered === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => svc.action?.()}
                style={{
                  background: active ? `${accent}0A` : "#fff",
                  border: `1px solid ${active ? accent + "44" : "rgba(0,0,0,0.06)"}`,
                  borderRadius: 16, padding: "32px 28px",
                  display: "flex", flexDirection: "column", gap: 20,
                  cursor: "pointer",
                  transition: "background 0.3s, border-color 0.3s, transform 0.25s, box-shadow 0.25s",
                  transform: active ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: active ? `0 20px 48px ${accent}18` : "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ width: 48, height: 48, background: active ? accent : `${accent}12`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
                    <svc.Icon size={20} color={active ? "#fff" : accent} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: active ? accent : "rgba(0,0,0,0.15)", letterSpacing: "0.12em", fontFamily: "'Inter',sans-serif", transition: "color 0.3s" }}>
                    {svc.num}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: "#1A1A2E", letterSpacing: "-0.02em", lineHeight: 1.2, transition: "color 0.3s" }}>
                    {t(svc.title.ar, svc.title.en)}
                  </h3>
                  <p style={{ margin: 0, fontSize: 13, color: active ? "#4B5563" : "#9CA3AF", lineHeight: 1.65, transition: "color 0.3s" }}>
                    {t(svc.desc.ar, svc.desc.en)}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: active ? accent : "rgba(0,0,0,0.25)", transition: "color 0.3s", letterSpacing: "0.03em" }}>
                    {t("استكشف", "Explore")}
                  </span>
                  <ArrowRight size={13} color={active ? accent : "rgba(0,0,0,0.25)"} style={{ transform: isAr ? "scaleX(-1)" : "none" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {svcBookingCar && <WBookingDialog car={svcBookingCar} onClose={() => setSvcBookingCar(null)} />}
    </section>
  );
}
