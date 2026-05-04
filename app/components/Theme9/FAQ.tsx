import { useAppContext } from "@/app/contexts/AppContext";
import { BG, pad, PNK, TX, TX2, useFonts, V, W } from "@/app/themes/theme9/page";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

 export default function FAQ() {
  const { t } = useAppContext();
  const { h } = useFonts();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: { ar: "كيف أختار شخصيتي في القيادة؟", en: "How do I choose my driving personality?" }, a: { ar: "فكّر في أكتر حاجة مهمة ليك: السرعة؟ الراحة؟ الفخامة؟ المرح؟ واختار الشخصية اللي بتعبّر عنك.", en: "Think about what matters most: speed? comfort? luxury? fun? Pick the personality that expresses you." } },
    { q: { ar: "هل السيارات فعلاً بتتكلم؟", en: "Do the cars really talk?" }, a: { ar: "الكلام ده تعبير عن شخصية كل سيارة ومميزاتها. بنوصفها بطريقة ممتعة عشان تحس بالارتباط.", en: "The speech represents each car's personality and features. We describe them in a fun way to build a connection." } },
    { q: { ar: "ما هي المستندات المطلوبة؟", en: "What documents are required?" }, a: { ar: "بطاقة هوية سارية، رخصة قيادة، وإثبات عنوان.", en: "A valid ID, driving license, and proof of address." } },
    { q: { ar: "هل يمكنني تغيير الشخصية بعد الحجز؟", en: "Can I change personality after booking?" }, a: { ar: "طبعاً! ممكن تغيّر السيارة قبل 24 ساعة من الموعد.", en: "Of course! You can change the car up to 24 hours before pickup." } },
    { q: { ar: "هل التأمين مشمول؟", en: "Is insurance included?" }, a: { ar: "نعم، تأمين شامل مع كل سيارة.", en: "Yes, comprehensive insurance with every car." } },
  ];

  return (
    <section style={{ padding: "80px 0", background: W }}>
      <div style={{ ...pad, maxWidth: 720 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: TX, fontFamily: h }}>
            {t("أسئلة شائعة", "Common Questions")}
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} onClick={() => setOpenIdx(isOpen ? null : i)} style={{
                borderRadius: 20, overflow: "hidden", cursor: "pointer",
                background: isOpen ? `linear-gradient(135deg, ${V}08, ${PNK}05)` : BG,
                border: `1.5px solid ${isOpen ? `${V}25` : "transparent"}`,
                transition: "all 0.3s",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 10,
                      background: isOpen ? V : `${V}12`,
                      color: isOpen ? W : V,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 800, transition: "all 0.3s",
                    }}>{i + 1}</div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: TX, fontFamily: h }}>{t(faq.q.ar, faq.q.en)}</span>
                  </div>
                  <ChevronDown size={16} color={V} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
                </div>
                {isOpen && (
                  <div style={{ padding: "0 24px 18px 64px", animation: "t9fi 0.25s" }}>
                    <p style={{ fontSize: 13, color: TX2, lineHeight: 1.85, margin: 0 }}>{t(faq.a.ar, faq.a.en)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}