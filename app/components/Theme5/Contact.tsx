import { useAppContext } from "@/app/contexts/AppContext";
import { useFonts, BG, TXT, PAD } from "@/app/themes/theme5/page";
import { GREEN, TXT3, BORDER, TXT2 } from "@/app/themes/theme5/page";
import { CYAN, INDIGO_L, GridBG, BORDER2, INDIGO, GLOW_CYAN } from "@/app/themes/theme5/page";
import { Phone, Mail, MapPin, MessageCircle, Bot, Sparkles, Zap, Clock, Brain, Send, Shield, Wifi, Activity } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const { t, isRTL } = useAppContext();
  const { heading, body } = useFonts();
  const [phase, setPhase] = useState<"idle" | "typing" | "sent">("idle");
  const [activeChannel, setActiveChannel] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [chatMessages, setChatMessages] = useState<{ from: "bot" | "user"; text: string }[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const channels = [
    { icon: <Phone size={22} />, label: { ar: "اتصل بنا", en: "Call Us" }, val: "+20 100 000 0000", color: CYAN, desc: { ar: "متاح 24/7", en: "Available 24/7" } },
    { icon: <Mail size={22} />, label: { ar: "البريد", en: "Email" }, val: "hello@smartai.eg", color: INDIGO_L, desc: { ar: "رد خلال ساعة", en: "Reply within 1hr" } },
    { icon: <MapPin size={22} />, label: { ar: "الموقع", en: "Location" }, val: t("التجمع الخامس", "5th Settlement"), color: GREEN, desc: { ar: "القاهرة، مصر", en: "Cairo, Egypt" } },
    { icon: <MessageCircle size={22} />, label: { ar: "واتساب", en: "WhatsApp" }, val: "+20 100 000 0000", color: "#25D366", desc: { ar: "رد فوري", en: "Instant reply" } },
  ];

  const steps = [
    { q: { ar: "مرحباً! أنا المساعد الذكي \u{1F916} ما اسمك؟", en: "Hello! I'm the AI assistant \u{1F916} What's your name?" }, field: "name" as const },
    { q: { ar: "أهلاً! ما بريدك الإلكتروني للتواصل؟", en: "Nice! What's your email?" }, field: "email" as const },
    { q: { ar: "ممتاز! اكتب رسالتك وهنوصلها للفريق فوراً \u26A1", en: "Great! Type your message and we'll deliver it instantly \u26A1" }, field: "message" as const },
  ];

  const startChat = () => {
    setPhase("typing");
    setCurrentStep(0);
    setChatMessages([{ from: "bot", text: t(steps[0].q.ar, steps[0].q.en) }]);
  };

  const handleChatSend = () => {
    const step = steps[currentStep];
    const val = formData[step.field];
    if (!val.trim()) return;
    const newMsgs = [...chatMessages, { from: "user" as const, text: val }];
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1;
      const botReply = t(steps[next].q.ar, steps[next].q.en);
      newMsgs.push({ from: "bot" as const, text: step.field === "name" ? `${t("أهلاً", "Hi")} ${val}! ${botReply}` : botReply });
      setChatMessages(newMsgs);
      setCurrentStep(next);
    } else {
      newMsgs.push({ from: "bot" as const, text: t("تم إرسال رسالتك بنجاح! \u2705 سنرد عليك قريباً جداً \u{1F680}", "Message sent successfully! \u2705 We'll get back to you very soon \u{1F680}") });
      setChatMessages(newMsgs);
      setPhase("sent");
    }
  };

  const resetChat = () => {
    setPhase("idle");
    setChatMessages([]);
    setCurrentStep(0);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" style={{ position: "relative", background: BG, padding: PAD, overflow: "hidden" }}>
      <GridBG />
      <div style={{ position: "absolute", top: "20%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.08), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "8%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,70,229,0.08), transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ marginBottom: 60 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(6,182,212,0.08)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(6,182,212,0.15)",
            borderRadius: 30, padding: "8px 22px", marginBottom: 20,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: GREEN, boxShadow: `0 0 10px ${GREEN}`, animation: "heroPulse 2s infinite" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: CYAN, letterSpacing: 0.5 }}>{t("قنوات الاتصال نشطة", "Communication Channels Active")}</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 900, color: TXT, fontFamily: heading, marginBottom: 12 }}>
            {t("مركز التواصل الذكي", "Smart Communication Hub")}
          </h2>
          <p style={{ color: TXT3, fontSize: 16, maxWidth: 550, lineHeight: 1.7 }}>
            {t("تواصل معنا بالطريقة اللي تناسبك — أو خلّي المساعد الذكي يوجّهك", "Reach out your way — or let our AI assistant guide you")}
          </p>
        </div>

        {/* Main Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 32, alignItems: "start" }}>
          {/* Left: Channel Nodes */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {channels.map((ch, i) => (
              <div key={i} onClick={() => setActiveChannel(i)} style={{
                position: "relative",
                background: activeChannel === i ? `linear-gradient(135deg, ${ch.color}12, ${ch.color}06)` : "rgba(15,23,42,0.5)",
                backdropFilter: "blur(16px)", borderRadius: 20, padding: "22px 20px",
                border: `1.5px solid ${activeChannel === i ? ch.color + "40" : BORDER}`,
                cursor: "pointer", transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: activeChannel === i ? `0 0 30px ${ch.color}15, 0 8px 32px rgba(0,0,0,0.2)` : "none",
                transform: activeChannel === i ? "scale(1.02)" : "scale(1)",
              }}
                onMouseEnter={e => { if (activeChannel !== i) { e.currentTarget.style.borderColor = ch.color + "25"; e.currentTarget.style.transform = "translateX(4px)"; } }}
                onMouseLeave={e => { if (activeChannel !== i) { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "scale(1)"; } }}>
                {activeChannel === i && (
                  <div style={{
                    position: "absolute", top: 16, bottom: 16,
                    [isRTL ? "right" : "left"]: 0, width: 3, borderRadius: 4,
                    background: `linear-gradient(180deg, ${ch.color}, ${ch.color}50)`,
                    boxShadow: `0 0 12px ${ch.color}60`,
                  }} />
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                    background: `linear-gradient(135deg, ${ch.color}20, ${ch.color}08)`,
                    border: `1px solid ${ch.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center", color: ch.color,
                    boxShadow: activeChannel === i ? `0 0 20px ${ch.color}20` : "none", transition: "all 0.3s",
                  }}>{ch.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: TXT, fontFamily: heading, marginBottom: 3 }}>{t(ch.label.ar, ch.label.en)}</div>
                    <div style={{ fontSize: 13, color: activeChannel === i ? ch.color : TXT3, fontWeight: 600, transition: "color 0.3s" }}>{ch.val}</div>
                    <div style={{ fontSize: 11, color: TXT3, marginTop: 2 }}>{t(ch.desc.ar, ch.desc.en)}</div>
                  </div>
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: activeChannel === i ? ch.color : BORDER2,
                    boxShadow: activeChannel === i ? `0 0 8px ${ch.color}` : "none", transition: "all 0.3s",
                  }} />
                </div>
              </div>
            ))}
            {/* Social row */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 8 }}>
              {[{ name: "Twitter", color: "#1DA1F2" }, { name: "Instagram", color: "#E4405F" }, { name: "LinkedIn", color: "#0A66C2" }].map((s, i) => (
                <div key={i} style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: "rgba(15,23,42,0.6)", backdropFilter: "blur(12px)",
                  border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.25s", fontSize: 12, fontWeight: 800, color: TXT3,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + "50"; e.currentTarget.style.color = s.color; e.currentTarget.style.boxShadow = `0 0 16px ${s.color}20`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TXT3; e.currentTarget.style.boxShadow = "none"; }}>
                  {s.name.charAt(0)}
                </div>
              ))}
            </div>
          </div>

          {/* Right: AI Chat Terminal */}
          <div style={{
            background: "rgba(15,23,42,0.6)", backdropFilter: "blur(24px)",
            borderRadius: 28, overflow: "hidden", border: `1.5px solid ${BORDER}`,
            boxShadow: "0 20px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}>
            {/* Terminal Header */}
            <div style={{
              padding: "16px 24px",
              background: "linear-gradient(135deg, rgba(6,182,212,0.06), rgba(79,70,229,0.06))",
              borderBottom: `1px solid ${BORDER}`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: GREEN }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: TXT2, fontFamily: heading, letterSpacing: 0.5 }}>SmartAI Terminal</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Activity size={14} color={GREEN} />
                <span style={{ fontSize: 11, color: GREEN, fontWeight: 600 }}>{t("متصل", "Connected")}</span>
              </div>
            </div>

            {/* Chat Area */}
            <div style={{ padding: "24px", minHeight: 380, display: "flex", flexDirection: "column" }}>
              {phase === "idle" ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 24 }}>
                  <div style={{ position: "relative" }}>
                    <div style={{
                      width: 90, height: 90, borderRadius: 28,
                      background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 0 50px rgba(6,182,212,0.3), 0 0 100px rgba(6,182,212,0.1)",
                      animation: "heroPulse 3s ease-in-out infinite",
                    }}>
                      <Bot size={42} color="#fff" />
                    </div>
                    <div style={{
                      position: "absolute", inset: -8, borderRadius: 32,
                      border: "2px solid rgba(6,182,212,0.2)",
                      animation: "heroPing 2.5s ease-out infinite",
                    }} />
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: TXT, fontFamily: heading }}>
                      {t("المساعد الذكي جاهز", "AI Assistant Ready")}
                    </h3>
                    <p style={{ margin: 0, fontSize: 14, color: TXT3, lineHeight: 1.7, maxWidth: 380 }}>
                      {t("ابدأ محادثة سريعة مع المساعد الذكي وهيوصل رسالتك مباشرة للفريق", "Start a quick chat with our AI and your message goes straight to the team")}
                    </p>
                  </div>
                  <button onClick={startChat} style={{
                    padding: "14px 40px", borderRadius: 16,
                    background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
                    color: "#fff", border: "none", fontWeight: 700, fontSize: 15,
                    cursor: "pointer", fontFamily: heading, display: "flex", alignItems: "center", gap: 10,
                    boxShadow: "0 0 30px rgba(6,182,212,0.3), 0 8px 30px rgba(0,0,0,0.2)", transition: "all 0.3s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(6,182,212,0.4), 0 12px 40px rgba(0,0,0,0.3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 0 30px rgba(6,182,212,0.3), 0 8px 30px rgba(0,0,0,0.2)"; }}>
                    <Sparkles size={18} />
                    {t("ابدأ المحادثة", "Start Conversation")}
                  </button>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
                    {[
                      { ar: "رد فوري", en: "Instant Reply", icon: <Zap size={12} /> },
                      { ar: "24/7", en: "24/7", icon: <Clock size={12} /> },
                      { ar: "ذكاء اصطناعي", en: "AI Powered", icon: <Brain size={12} /> },
                    ].map((tag, i) => (
                      <span key={i} style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        padding: "5px 14px", borderRadius: 20,
                        background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.1)",
                        fontSize: 11, color: TXT3, fontWeight: 600,
                      }}>
                        <span style={{ color: CYAN }}>{tag.icon}</span>
                        {t(tag.ar, tag.en)}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div style={{
                    flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14,
                    marginBottom: 20, maxHeight: 320, scrollbarWidth: "thin", scrollbarColor: `${BORDER2} transparent`,
                  }}>
                    {chatMessages.map((msg, i) => (
                      <div key={i} style={{
                        display: "flex", gap: 10,
                        flexDirection: isRTL ? "row-reverse" : "row",
                        justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                      }}>
                        {msg.from === "bot" && (
                          <div style={{
                            width: 34, height: 34, borderRadius: 12, flexShrink: 0,
                            background: `linear-gradient(135deg, ${CYAN}25, ${INDIGO}15)`,
                            border: `1px solid ${CYAN}20`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <Bot size={16} color={CYAN} />
                          </div>
                        )}
                        <div style={{
                          maxWidth: "75%", padding: "12px 18px", borderRadius: 18,
                          background: msg.from === "bot" ? "rgba(6,182,212,0.08)" : `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
                          border: msg.from === "bot" ? "1px solid rgba(6,182,212,0.12)" : "none",
                          color: msg.from === "bot" ? TXT2 : "#fff",
                          fontSize: 14, lineHeight: 1.6, fontFamily: body,
                          borderBottomLeftRadius: msg.from === "bot" ? 4 : 18,
                          borderBottomRightRadius: msg.from === "user" ? 4 : 18,
                        }}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  {phase === "typing" ? (
                    <div style={{
                      display: "flex", gap: 10, alignItems: "center",
                      background: BG, borderRadius: 16, padding: "6px 6px 6px 18px",
                      border: `1.5px solid ${BORDER2}`, transition: "border-color 0.2s",
                    }}>
                      <input
                        value={formData[steps[currentStep].field]}
                        onChange={e => setFormData({ ...formData, [steps[currentStep].field]: e.target.value })}
                        onKeyDown={e => e.key === "Enter" && handleChatSend()}
                        placeholder={t(
                          currentStep === 0 ? "اكتب اسمك..." : currentStep === 1 ? "بريدك الإلكتروني..." : "رسالتك...",
                          currentStep === 0 ? "Your name..." : currentStep === 1 ? "Your email..." : "Your message..."
                        )}
                        style={{
                          flex: 1, background: "transparent", border: "none", outline: "none",
                          color: TXT, fontSize: 14, fontFamily: body, padding: "10px 0",
                        }}
                      />
                      <button onClick={handleChatSend} style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
                        border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 0 16px rgba(6,182,212,0.3)", transition: "all 0.2s", flexShrink: 0,
                      }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
                        <Send size={18} color="#fff" style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                      <button onClick={resetChat} style={{
                        padding: "12px 30px", borderRadius: 14,
                        background: "transparent", border: `1.5px solid ${BORDER2}`,
                        color: TXT2, fontWeight: 600, fontSize: 14,
                        cursor: "pointer", fontFamily: heading, transition: "all 0.2s",
                        display: "flex", alignItems: "center", gap: 8,
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = CYAN; e.currentTarget.style.color = CYAN; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER2; e.currentTarget.style.color = TXT2; }}>
                        <MessageCircle size={16} />
                        {t("محادثة جديدة", "New Conversation")}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Terminal footer */}
            <div style={{
              padding: "12px 24px", borderTop: `1px solid ${BORDER}`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "rgba(2,6,23,0.3)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Shield size={13} color={CYAN} />
                <span style={{ fontSize: 11, color: TXT3 }}>{t("مشفّر بالكامل", "End-to-end encrypted")}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Wifi size={13} color={GREEN} />
                <span style={{ fontSize: 11, color: TXT3 }}>
                  {t("وقت الاستجابة:", "Response time:")} <span style={{ color: GREEN, fontWeight: 700 }}>&lt; 1h</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div style={{
          marginTop: 56,
          background: `linear-gradient(135deg, ${CYAN}08, ${INDIGO}08)`,
          backdropFilter: "blur(16px)", borderRadius: 24, padding: "32px 40px",
          border: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20,
        }}>
          <div>
            <h4 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 800, color: TXT, fontFamily: heading }}>
              {t("محتاج مساعدة فورية؟", "Need Immediate Help?")}
            </h4>
            <p style={{ margin: 0, fontSize: 14, color: TXT3 }}>
              {t("فريقنا متاح دلوقتي — اتصل مباشرة أو ابعت واتساب", "Our team is available now — call directly or send a WhatsApp")}
            </p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{
              padding: "12px 28px", borderRadius: 14,
              background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
              color: "#fff", border: "none", fontWeight: 700, fontSize: 14,
              cursor: "pointer", fontFamily: heading, display: "flex", alignItems: "center", gap: 8,
              boxShadow: GLOW_CYAN, transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
              <Phone size={16} />
              {t("اتصل الآن", "Call Now")}
            </button>
            <button style={{
              padding: "12px 28px", borderRadius: 14,
              background: "rgba(37,211,102,0.1)", border: "1.5px solid rgba(37,211,102,0.3)",
              color: "#25D366", fontWeight: 700, fontSize: 14,
              cursor: "pointer", fontFamily: heading, display: "flex", alignItems: "center", gap: 8,
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(37,211,102,0.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(37,211,102,0.1)"; e.currentTarget.style.transform = ""; }}>
              <MessageCircle size={16} />
              {t("واتساب", "WhatsApp")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}