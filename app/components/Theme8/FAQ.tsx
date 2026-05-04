import { useAppContext } from "@/app/contexts/AppContext";
import { PAD } from "@/app/themes/theme7/page";
import { BD, BG, O, OBG, pad, TX, TX3, useFonts, W } from "@/app/themes/theme8/page";

export default function FAQ() {
  const { t } = useAppContext();
  const { h } = useFonts();

  const faqs = [
    { q: { ar: "ما هي المستندات المطلوبة؟", en: "What documents are required?" }, a: { ar: "بطاقة هوية سارية، رخصة قيادة، وإثبات عنوان حديث.", en: "A valid ID, driving license, and recent proof of address." } },
    { q: { ar: "هل يمكنني إلغاء الحجز؟", en: "Can I cancel my booking?" }, a: { ar: "نعم، قبل 24 ساعة استرداد كامل. خلال 24 ساعة رسوم 10%.", en: "Yes, full refund if 24h before. 10% fee within 24 hours." } },
    { q: { ar: "هل التأمين مشمول؟", en: "Is insurance included?" }, a: { ar: "نعم، تأمين شامل ضد الحوادث والسرقة مع كل سيارة.", en: "Yes, comprehensive cover for accidents and theft on all cars." } },
    { q: { ar: "التسليم في مكان مختلف؟", en: "Different drop-off location?" }, a: { ar: "داخل القاهرة الكبرى مجاناً. خارجها برسوم إضافية بسيطة.", en: "Free in Greater Cairo. Small fee for outside Cairo." } },
    { q: { ar: "ما طرق الدفع المتاحة؟", en: "Payment methods?" }, a: { ar: "نقدي، فيزا/ماستركارد، تحويل بنكي، وتقسيط حتى 12 شهر.", en: "Cash, Visa/Mastercard, bank transfer, and up to 12-month installments." } },
    { q: { ar: "أقل مدة إيجار؟", en: "Minimum rental period?" }, a: { ar: "يوم واحد. نوفر يومي وأسبوعي وشهري.", en: "One day. We offer daily, weekly, and monthly rentals." } },
  ];

  return (
    <section id="faq" style={{ padding: PAD, background: W }}>
      <div style={pad}>
        <div style={{ marginBottom: 44, maxWidth: 480 }}>
          <div style={{ width: 36, height: 3, borderRadius: 2, background: O, marginBottom: 16 }} />
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: TX, fontFamily: h, marginBottom: 8 }}>
            {t("أسئلة شائعة", "Common Questions")}
          </h2>
          <p style={{ fontSize: 14, color: TX3, lineHeight: 1.7, margin: 0 }}>
            {t("إجابات سريعة على أكثر الأسئلة اللي بتوصلنا.", "Quick answers to the questions we get asked most.")}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 32px" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                background: i % 2 === 0 ? OBG : BG,
                border: `1.5px solid ${i % 2 === 0 ? `${O}20` : BD}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 800, color: i % 2 === 0 ? O : TX3, fontFamily: h,
                marginTop: 2,
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: TX, fontFamily: h, marginBottom: 5, lineHeight: 1.4 }}>
                  {t(faq.q.ar, faq.q.en)}
                </h4>
                <p style={{ fontSize: 13, color: TX3, lineHeight: 1.75, margin: 0 }}>
                  {t(faq.a.ar, faq.a.en)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}