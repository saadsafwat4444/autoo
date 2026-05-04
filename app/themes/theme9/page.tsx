"use client"
import { useAppContext } from "@/app/contexts/AppContext";
import { CSSProperties, ReactNode, useState } from "react";
import { blogPosts, cars } from "@/app/data/carDate";
import { Rocket, Briefcase, Heart, Coffee, PartyPopper, ArrowLeft, ArrowRight, Check, X, Wallet, CreditCard, Banknote, Contact, Clock, Calendar } from "lucide-react";
import FAQ from "@/app/components/theme1/FAQ";
import Footer from "@/app/components/Theme9/Footer";
import Hero from "@/app/components/Theme9/Hero";
import Offers from "@/app/components/Theme9/Offers";
import Testimonials from "@/app/components/Theme9/Testimonials";
import Cars from "@/app/components/Theme9/Cars";
import Articles from "@/app/components/Theme9/Articles";
import Nav from "@/app/components/Theme9/Navbar";
import Personalities from "@/app/components/Theme9/Personalities";

export const V = "#8B5CF6";  // violet main
export const VD = "#7C3AED";  // violet dark
export const VL = "#A78BFA";  // violet light
export const VBG = "#F5F3FF"; // violet bg
export const DK = "#1F2937";

export const BG = "#F8FAFC";
export const W = "#FFFFFF";
export const TX = "#111827";
export const TX2 = "#4B5563";
export const TX3 = "#9CA3AF";
export const BD = "#E5E7EB";
export const GRN = "#10B981";
export const PNK = "#EC4899";
export const AMB = "#F59E0B";
export const SKY = "#0EA5E9";
export const RSE = "#F43F5E";
export const PAD = "50px 130px";

export const IMG = {
  heroNeon: "https://images.unsplash.com/photo-1769674154615-0cd4f99f9945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBuaWdodCUyMGNpdHklMjBuZW9ufGVufDF8fHx8MTc3Mzc0MDY4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  friends: "https://images.unsplash.com/photo-1614723053181-e44fcdfec0a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHlvdW5nJTIwcGVvcGxlJTIwZHJpdmluZyUyMGNvbnZlcnRpYmxlfGVufDF8fHx8MTc3Mzc0MDY4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  family: "https://images.unsplash.com/photo-1758219944472-745f682c70f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjByb2FkJTIwdHJpcCUyMFNVViUyMG1vdW50YWlufGVufDF8fHx8MTc3Mzc0MDY4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  fleet: "https://images.unsplash.com/photo-1772440503427-fe71cec89d9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBmbGVldCUyMHBhcmtpbmclMjBsb3QlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc3Mzc0MDY4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  biz: "https://images.unsplash.com/photo-1740485863233-032dff964d0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMHN1aXQlMjBjYXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczNzQwNjg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  heroCar: "https://images.unsplash.com/photo-1674404902071-571d8b9525bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBzcG9ydHMlMjBjYXIlMjBzaWRlJTIwdmlldyUyMGRyYW1hdGljJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzczNzQxNTY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

export const useFonts = () => {
  const { lang } = useAppContext();
  return {
    h: lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif",
    b: lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif",
  };
};

export const pad: CSSProperties = { maxWidth: 1180, margin: "0 auto", padding: "0 24px" };

// ─── PERSONALITY TYPES ───────────────────────────────────────────────────
export interface Personality {
  id: string;
  ar: string; en: string;
  descAr: string; descEn: string;
  quoteAr: string; quoteEn: string;
  icon: ReactNode;
  color: string;
  gradient: string;
  carIds: number[];
}

export const PERSONALITIES: Personality[] = [
  {
    id: "adventurer", ar: "المغامر", en: "The Adventurer",
    descAr: "يحب السرعة والإثارة والتجارب الجديدة", descEn: "Loves speed, thrill, and new experiences",
    quoteAr: "أنا السيارة اللي هتخليك تحس بالحرية", quoteEn: "I'm the car that'll make you feel free",
    icon: <Rocket size={24} />, color: RSE, gradient: "linear-gradient(135deg, #F43F5E 0%, #FB7185 100%)",
    carIds: [4, 1, 7],
  },
  {
    id: "professional", ar: "العملي", en: "The Professional",
    descAr: "للأعمال والاجتماعات والمظهر الراقي", descEn: "For business, meetings, and a premium look",
    quoteAr: "أنا هوصّلك وانت في أحسن حالك", quoteEn: "I'll get you there looking your best",
    icon: <Briefcase size={24} />, color: SKY, gradient: "linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)",
    carIds: [2, 6, 10],
  },
  {
    id: "family", ar: "العائلي", en: "The Family One",
    descAr: "مساحة واسعة وأمان وراحة للجميع", descEn: "Spacious, safe, and comfortable for everyone",
    quoteAr: "أنا هضمّلك كل العيلة في رحلة ممتعة", quoteEn: "I'll keep the whole family comfy and happy",
    icon: <Heart size={24} />, color: GRN, gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
    carIds: [3, 9, 12],
  },
  {
    id: "chill", ar: "الهادئ", en: "The Chill One",
    descAr: "للمشاوير الهادية والاستمتاع بالطريق", descEn: "For relaxed drives and enjoying the journey",
    quoteAr: "مفيش استعجال... خلّينا نستمتع بالطريق", quoteEn: "No rush... let's enjoy the ride",
    icon: <Coffee size={24} />, color: AMB, gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
    carIds: [5, 8, 11],
  },
  {
    id: "social", ar: "الاجتماعي", en: "The Social One",
    descAr: "للخروجات والسهرات وأحلى الأوقات", descEn: "For outings, nights out, and the best times",
    quoteAr: "يلّا نطلع ونفرّح نفسنا!", quoteEn: "Let's go out and have some fun!",
    icon: <PartyPopper size={24} />, color: PNK, gradient: "linear-gradient(135deg, #EC4899 0%, #F472B6 100%)",
    carIds: [4, 2, 1],
  },
];

// ─── CAR SPEECH BUBBLES PER PERSONALITY ──────────────────────────────────
export const CAR_QUOTES: Record<number, { ar: string; en: string }> = {
  1: { ar: "أنا أنيقة وسريعة... جاهزة ننطلق؟", en: "I'm elegant and fast... ready to go?" },
  2: { ar: "أنا هوصّلك بأناقة ما تتخيلهاش", en: "I'll take you there in unimaginable style" },
  3: { ar: "أنا واسعة ومريحة... الكل هيكون مبسوط", en: "I'm spacious and comfy... everyone will be happy" },
  4: { ar: "أنا سريعة... ومش بحب الزحمة", en: "I'm fast... and I don't like traffic" },
  5: { ar: "أنا هادية وذكية... واقتصادية كمان", en: "I'm quiet and smart... and fuel-efficient too" },
  6: { ar: "أنا الفخامة بذاتها... تعال جرّب", en: "I AM luxury itself... come try me" },
  7: { ar: "أنا أنيقة ورياضية... هتحبني", en: "I'm elegant and sporty... you'll love me" },
  8: { ar: "أنا عملية واقتصادية... وبوصّلك في أمان", en: "I'm practical and efficient... and I'll get you there safely" },
  9: { ar: "أنا قوية ومتينة... جاهزة لأي مغامرة", en: "I'm strong and solid... ready for any adventure" },
  10: { ar: "أنا ملكة الطريق... بس هادية", en: "I'm the queen of the road... but gentle" },
  11: { ar: "أنا اقتصادية ومريحة... ومفيش ضغط", en: "I'm economical and comfy... zero stress" },
  12: { ar: "أنا عائلية بامتياز... كلنا هنكون مبسوطين", en: "I'm the ultimate family car... we'll all be happy" },
};

 const ARTICLE_BODIES: Record<number, { ar: string[]; en: string[] }> = {
  1: {
    ar: [
      "اختيار السيارة المناسبة لرحلتك هو أول خطوة لتجربة قيادة ممتعة وآمنة. سواء كنت مسافر لوحدك أو مع العائلة، المسافة والطريق بيحددوا نوع السيارة المطلوبة.",
      "لو رحلتك طويلة على الطريق الصحراوي، سيارة SUV هتكون الاختيار الأمثل عشان الراحة والأمان. أما لو رحلة قصيرة في المدينة، سيارة اقتصادية هتوفرلك في البنزين وسهلة في الركن.",
      "عدد الركاب عامل مهم جداً. لو معاك عيلة كبيرة، اختار سيارة 7 راكب زي لاند كروزر أو باترول. لو لوحدك أو مع شخص واحد، سيارة سيدان فاخرة هتكون أنسب.",
      "الميزانية كمان بتلعب دور. حدد ميزانيتك اليومية وقارن بين السيارات المتاحة. أحياناً إيجار سيارة أغلى شوية بيوفر عليك في الراحة والاستهلاك.",
    ],
    en: [
      "Choosing the right car for your trip is the first step to an enjoyable and safe driving experience. Whether you're traveling alone or with family, the distance and route determine the type of car you need.",
      "For long desert highway trips, an SUV is the ideal choice for comfort and safety. For short city trips, an economy car saves on fuel and is easy to park.",
      "The number of passengers is very important. If you have a large family, choose a 7-seater like the Land Cruiser or Patrol. If you're alone or with one person, a luxury sedan is more suitable.",
      "Budget also plays a role. Set your daily budget and compare available cars. Sometimes renting a slightly more expensive car saves you on comfort and fuel consumption.",
    ],
  },
  2: {
    ar: [
      "اشتراك VIP في خدمة تأجير السيارات بيوفرلك مزايا حصرية مش متاحة للعملاء العاديين. من أول الأسعار المخفضة لحد التوصيل المجاني والترقية التلقائية.",
      "مع اشتراك VIP، بتحصل على خصم يوصل لـ 40% على كل الحجوزات. ده معناه إنك لو بتأجر سيارة بشكل متكرر، هتوفر آلاف الجنيهات سنوياً.",
      "من المزايا الحصرية كمان: أولوية في الحجز وقت المواسم، تأمين شامل مجاني، ودعم فني على مدار الساعة مع خط مباشر مخصص ليك.",
      "الاشتراك بيبدأ من 500 جنيه شهرياً بس، وبيتجدد تلقائي. تقدر تلغيه في أي وقت بدون رسوم إضافية. جرّب شهر مجاني الآن واكتشف الفرق.",
    ],
    en: [
      "A VIP subscription to our car rental service gives you exclusive benefits not available to regular customers. From discounted prices to free delivery and automatic upgrades.",
      "With a VIP subscription, you get up to 40% off all bookings. This means if you rent frequently, you'll save thousands annually.",
      "Other exclusive benefits include: priority booking during peak seasons, free comprehensive insurance, and 24/7 support with a dedicated hotline just for you.",
      "Subscriptions start from just 500 EGP per month and auto-renew. You can cancel anytime without extra fees. Try a free month now and discover the difference.",
    ],
  },
  3: {
    ar: [
      "مصر فيها طرق وأماكن رائعة تستحق إنك تكتشفها بسيارتك. من الساحل الشمالي بشواطئه الكريستالية لحد أسوان والأقصر بمعابدهم الأثرية.",
      "رحلة الساحل الشمالي من القاهرة بتاخد حوالي 3 ساعات. الطريق ممتاز وبتقدر تستمتع بمنظر البحر طول الرحلة. أنسب سيارة للرحلة دي هي SUV متوسطة.",
      "لو بتحب المغامرة، رحلة سيناء من القاهرة للغردقة عبر طريق عين السخنة تجربة لا تُنسى. الطريق الصحراوي محتاج سيارة قوية ومريحة.",
      "نصيحتنا: اختار سيارة مريحة للرحلات الطويلة، خد معاك مياه كافية، واتأكد من ضغط الكاوتش قبل السفر. واستمتع بكل لحظة في الطريق!",
    ],
    en: [
      "Egypt has amazing roads and places worth discovering by car. From the North Coast with its crystal beaches to Aswan and Luxor with their ancient temples.",
      "The North Coast trip from Cairo takes about 3 hours. The road is excellent and you can enjoy sea views throughout. A mid-size SUV is the best car for this trip.",
      "If you love adventure, a Sinai trip from Cairo to Hurghada via Ain Sokhna road is an unforgettable experience. The desert road needs a strong and comfortable car.",
      "Our tip: choose a comfortable car for long trips, bring enough water, check tire pressure before traveling, and enjoy every moment on the road!",
    ],
  },
};

 
function ArticleModal({ article, onClose }: { article: typeof blogPosts[0]; onClose: () => void }) {
  const { t, isRTL } = useAppContext();
  const { h } = useFonts();
   const body = ARTICLE_BODIES[article.id] || ARTICLE_BODIES[1];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: W, borderRadius: 28, width: "100%", maxWidth: 680, maxHeight: "90vh", overflow: "auto", animation: "t9pop 0.3s" }}>
        {/* Hero image */}
        <div style={{ position: "relative", height: 260 }}>
          <img src={article.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "28px 28px 0 0" }} />
          <button onClick={onClose} style={{ position: "absolute", top: 16, [isRTL ? "left" : "right"]: 16, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", border: "none", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} color={W} /></button>
          <div style={{ position: "absolute", bottom: 16, [isRTL ? "right" : "left"]: 20 }}>
            <span style={{ background: V, borderRadius: 8, padding: "5px 14px", fontSize: 11, fontWeight: 700, color: W }}>{t(article.category.ar, article.category.en)}</span>
          </div>
        </div>
        {/* Content */}
        <div style={{ padding: "28px 32px 36px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: TX, fontFamily: h, lineHeight: 1.5, marginBottom: 16 }}>{t(article.title.ar, article.title.en)}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${BD}` }}>
            <span style={{ fontSize: 12, color: TX3, display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} /> {t(article.readTime.ar, article.readTime.en)}</span>
            <span style={{ fontSize: 12, color: TX3, display: "flex", alignItems: "center", gap: 4 }}><Calendar size={12} /> {article.date}</span>
            <span style={{ fontSize: 12, color: V, fontWeight: 600 }}>{t(article.author.ar, article.author.en)}</span>
          </div>
          {(isRTL ? body.ar : body.en).map((para, i) => (
            <p key={i} style={{ fontSize: 15, color: TX2, lineHeight: 2, marginBottom: 16 }}>{para}</p>
          ))}
          <button onClick={onClose} style={{ marginTop: 8, padding: "14px 28px", borderRadius: 14, background: V, color: W, border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: h }}>
            {t("رجوع للمقالات", "Back to Articles")}
          </button>
        </div>
      </div>
    </div>
  );
}
// ─── BOOKING MODAL ───────────────────────────────────────────────────────
  function BookingModal({ car, onClose }: { car: typeof cars[0]; onClose: () => void }) {
  const { t, isRTL } = useAppContext();
  const { h } = useFonts();
  const [step, setStep] = useState(1);
  const [days, setDays] = useState(3);
  const [payMethod, setPayMethod] = useState<string>("full");
  const [done, setDone] = useState(false);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const total = car.pricePerDay * days;

  if (done) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
        <div onClick={e => e.stopPropagation()} style={{ background: W, borderRadius: 32, padding: "48px 40px", textAlign: "center", maxWidth: 440, width: "100%", animation: "t9pop 0.4s" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: `${GRN}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Check size={32} color={GRN} />
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: TX, fontFamily: h, marginBottom: 10 }}>{t("تم الحجز بنجاح!", "Booking Confirmed!")}</h3>
          {/* Speech bubble from car */}
          <div style={{ background: VBG, borderRadius: 20, borderBottomLeftRadius: 4, padding: "14px 20px", margin: "16px auto", maxWidth: 320, position: "relative" }}>
            <p style={{ fontSize: 14, color: V, fontWeight: 600, margin: 0, fontStyle: "italic" }}>
              {t("انا مستنيك! هنقضي وقت حلو مع بعض", "I'm waiting for you! We'll have a great time together")}
            </p>
          </div>
          <p style={{ fontSize: 13, color: TX3 }}>{t("رقم الحجز:", "Booking #:")} <strong style={{ color: V }}>CP-{Math.floor(10000 + Math.random() * 90000)}</strong></p>
          <button onClick={onClose} style={{ marginTop: 20, padding: "14px 36px", borderRadius: 16, background: V, color: W, border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: h }}>
            {t("رجوع للشخصيات", "Back to Personalities")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: W, borderRadius: 28, width: "100%", maxWidth: 520, overflow: "hidden", animation: "t9pop 0.3s" }}>
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, ${V} 0%, ${VD} 100%)`, padding: "24px 28px", color: W, position: "relative" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, [isRTL ? "left" : "right"]: 16, background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} color={W} /></button>
          <h3 style={{ fontSize: 18, fontWeight: 800, fontFamily: h, marginBottom: 4 }}>{t(car.name.ar, car.name.en)}</h3>
          <div style={{ fontSize: 13, opacity: 0.8 }}>{t("احجزني الآن!", "Book me now!")}</div>
          {/* Steps */}
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ flex: 1, height: 4, borderRadius: 4, background: step >= s ? W : "rgba(255,255,255,0.3)", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>

        <div style={{ padding: "24px 28px 28px" }}>
          {step === 1 && (
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: TX, fontFamily: h, marginBottom: 16 }}>{t("اختر التاريخ والمدة", "Choose Date & Duration")}</h4>
              <input type="date" defaultValue="2026-03-20" style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `1.5px solid ${BD}`, fontSize: 14, marginBottom: 12, outline: "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 13, color: TX2, fontWeight: 600 }}>{t("المدة:", "Duration:")}</span>
                {[1, 3, 7, 14, 30].map(d => (
                  <button key={d} onClick={() => setDays(d)} style={{ padding: "8px 16px", borderRadius: 12, background: days === d ? V : BG, color: days === d ? W : TX2, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
                    {d} {t("يوم", d === 1 ? "day" : "days")}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 20, padding: "16px", borderRadius: 16, background: VBG, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: TX2 }}>{t("الإجمالي", "Total")}</span>
                <span style={{ fontSize: 20, fontWeight: 900, color: V, fontFamily: h }}>{total.toLocaleString()} {t("ج.م", "EGP")}</span>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: TX, fontFamily: h, marginBottom: 16 }}>{t("طريقة الدفع", "Payment Method")}</h4>
              {[
                { id: "full", ar: "دفع كامل", en: "Full Payment", icon: <Wallet size={18} />, desc: { ar: "ادفع المبلغ كامل الآن", en: "Pay the full amount now" } },
                { id: "card", ar: "بطاقة بنكية", en: "Credit Card", icon: <CreditCard size={18} />, desc: { ar: "فيزا / ماستركارد", en: "Visa / Mastercard" } },
                { id: "installment", ar: "تقسيط", en: "Installments", icon: <Banknote size={18} />, desc: { ar: "حتى 6 دفعات", en: "Up to 6 payments" } },
              ].map(pm => (
                <div key={pm.id} onClick={() => setPayMethod(pm.id)} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "16px", borderRadius: 16,
                  border: `2px solid ${payMethod === pm.id ? V : BD}`, marginBottom: 10, cursor: "pointer",
                  background: payMethod === pm.id ? VBG : W, transition: "all 0.2s",
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: payMethod === pm.id ? `${V}15` : BG, display: "flex", alignItems: "center", justifyContent: "center", color: payMethod === pm.id ? V : TX3 }}>{pm.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: TX }}>{t(pm.ar, pm.en)}</div>
                    <div style={{ fontSize: 12, color: TX3 }}>{t(pm.desc.ar, pm.desc.en)}</div>
                  </div>
                  {payMethod === pm.id && <Check size={18} color={V} />}
                </div>
              ))}
            </div>
          )}
          {step === 3 && (
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: TX, fontFamily: h, marginBottom: 16 }}>{t("بياناتك", "Your Details")}</h4>
              <input placeholder={t("الاسم الكامل", "Full Name")} style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `1.5px solid ${BD}`, fontSize: 14, marginBottom: 10, outline: "none" }} />
              <input placeholder={t("رقم الهاتف", "Phone Number")} style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `1.5px solid ${BD}`, fontSize: 14, marginBottom: 10, outline: "none" }} />
              <input placeholder={t("البريد الإلكتروني", "Email")} style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `1.5px solid ${BD}`, fontSize: 14, outline: "none" }} />
            </div>
          )}
          {/* Nav buttons */}
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} style={{ padding: "14px 24px", borderRadius: 14, background: BG, color: TX2, border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: h }}>
                {t("رجوع", "Back")}
              </button>
            )}
            <button onClick={() => step < 3 ? setStep(step + 1) : setDone(true)} style={{
              flex: 1, padding: "14px", borderRadius: 14, background: V, color: W, border: "none",
              fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: h,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              {step < 3 ? t("التالي", "Next") : t("نبدأ الرحلة!", "Start the Ride!")} <Arrow size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function Theme9() {
  const { isRTL } = useAppContext();
  const [activePersonality, setActivePersonality] = useState<Personality | null>(null);
  const [bookingCar, setBookingCar] = useState<typeof cars[0] | null>(null);
  const [openArticle, setOpenArticle] = useState<typeof blogPosts[0] | null>(null);

  return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{ fontFamily: "'Inter', 'Cairo', sans-serif" }}>
      <style>{`
        @keyframes t9pop { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes t9fi { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes t9float0 { 0%,100% { transform: rotate(3deg) translateY(0); } 50% { transform: rotate(3deg) translateY(-12px); } }
        @keyframes t9float1 { 0%,100% { transform: rotate(-2deg) translateY(0); } 50% { transform: rotate(-2deg) translateY(-10px); } }
        @keyframes t9float2 { 0%,100% { transform: rotate(1deg) translateY(0); } 50% { transform: rotate(1deg) translateY(-14px); } }
        @keyframes t9float3 { 0%,100% { transform: rotate(-3deg) translateY(0); } 50% { transform: rotate(-3deg) translateY(-8px); } }
      `}</style>
      <Nav />
      <Hero />
      <Personalities onSelect={p => { setActivePersonality(p); setTimeout(() => document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" }), 100); }} />
      <Cars activePersonality={activePersonality} onBook={setBookingCar} />
      <Offers onBook={setBookingCar} />
      <Testimonials />
      <Articles onOpenArticle={setOpenArticle} />
      <Contact />
      <FAQ />
      <Footer />
      {bookingCar && <BookingModal car={bookingCar} onClose={() => setBookingCar(null)} />}
      {openArticle && <ArticleModal article={openArticle} onClose={() => setOpenArticle(null)} />}
    </div>
  );
}