import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts, BG, PAD } from "@/app/themes/theme9/page";
import { pad, TX, TX2, TX3, W, BD, GRN } from "@/app/themes/theme7/page";
import { VBG, V } from "@/app/themes/theme9/page";
import { ArrowLeft, ArrowRight, HelpCircle, Phone, Mail, Check, Send } from "lucide-react";
import { useState } from "react";

function T9Contact() {
  const { t, isRTL } = useAppContext();
  const { h } = useFonts();
  const [sent, setSent] = useState(false);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="contact" style={{ padding:PAD, background: BG }}>
      <div style={pad}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          {/* Left: text */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 100, background: VBG, marginBottom: 20 }}>
              <HelpCircle size={14} color={V} />
              <span style={{ fontSize: 12, fontWeight: 700, color: V }}>{t("محتاج مساعدة؟", "Need Help?")}</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: TX, fontFamily: h, marginBottom: 14, lineHeight: 1.4 }}>
              {t("مش متأكد تختار إيه؟", "Not sure what to choose?")}
            </h2>
            <p style={{ fontSize: 15, color: TX2, lineHeight: 1.9, marginBottom: 28 }}>
              {t(
                "ابعتلنا رسالة وفريقنا هيساعدك تكتشف شخصيتك في القيادة ويرشحلك السيارة المناسبة.",
                "Send us a message and our team will help you discover your driving personality and recommend the perfect car."
              )}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: VBG, display: "flex", alignItems: "center", justifyContent: "center" }}><Phone size={16} color={V} /></div>
                <div><div style={{ fontSize: 12, color: TX3 }}>{t("اتصل بنا", "Call Us")}</div><div style={{ fontSize: 14, fontWeight: 700, color: TX, direction: "ltr" }}>+20 100 123 4567</div></div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: VBG, display: "flex", alignItems: "center", justifyContent: "center" }}><Mail size={16} color={V} /></div>
                <div><div style={{ fontSize: 12, color: TX3 }}>{t("راسلنا", "Email")}</div><div style={{ fontSize: 14, fontWeight: 700, color: TX }}>hello@drivenow.com</div></div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div style={{ background: W, borderRadius: 24, padding: "32px 28px", border: `1.5px solid ${BD}` }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: `${GRN}12`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <Check size={28} color={GRN} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: TX, fontFamily: h, marginBottom: 8 }}>{t("تم إرسال طلبك!", "Request Sent!")}</h3>
                <p style={{ fontSize: 14, color: TX3 }}>{t("سنرشح لك السيارة المناسبة لشخصيتك", "We'll recommend the perfect car for your personality")}</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: TX, fontFamily: h, marginBottom: 20 }}>{t("ساعدني أختار", "Help Me Choose")}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input placeholder={t("اسمك", "Your Name")} style={{ padding: "14px 16px", borderRadius: 14, border: `1.5px solid ${BD}`, fontSize: 14, outline: "none" }} />
                  <input placeholder={t("رقم الهاتف", "Phone")} style={{ padding: "14px 16px", borderRadius: 14, border: `1.5px solid ${BD}`, fontSize: 14, outline: "none" }} />
                  <textarea placeholder={t("قولنا عن نفسك... إيه أكتر حاجة بتحبها في القيادة؟", "Tell us about yourself... what do you love most about driving?")} rows={3} style={{ padding: "14px 16px", borderRadius: 14, border: `1.5px solid ${BD}`, fontSize: 14, resize: "none", outline: "none" }} />
                  <button onClick={() => setSent(true)} style={{
                    padding: "14px", borderRadius: 14, background: V, color: W, border: "none",
                    fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: h,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}>
                    {t("ساعدني أختار", "Help Me Choose")} <Send size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}