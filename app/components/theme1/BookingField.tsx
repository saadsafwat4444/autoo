import { useAppContext } from "@/app/contexts/AppContext";
import { MID_GRAY } from "@/app/themes/theme1/page";

export default function BookingField({
  id, labelAr, labelEn, value, onChange, type = "text",
  errors, setErrors, accent, ff,
}: {
  id: string; labelAr: string; labelEn: string;
  value: string; onChange: (v: string) => void; type?: string;
  errors: Record<string, boolean>;
  setErrors: (fn: (p: Record<string,boolean>) => Record<string,boolean>) => void;
  accent: string; ff: string;
}) {
  const { t } = useAppContext();
  const hasErr = !!errors[id];
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: MID_GRAY, marginBottom: 5, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {t(labelAr, labelEn)}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => { onChange(e.target.value); if (hasErr) setErrors(p => ({ ...p, [id]: false })); }}
        style={{ width: "100%", padding: "11px 13px", border: `1.5px solid ${hasErr ? "#EF4444" : "#E5E7EB"}`, outline: "none", fontSize: 14, fontFamily: ff, boxSizing: "border-box" as const, borderRadius: 8, background: "#FAFAFA" }}
        onFocus={e => { e.target.style.borderColor = accent; e.target.style.background = "#fff"; }}
        onBlur={e => { if (!hasErr) e.target.style.borderColor = "#E5E7EB"; e.target.style.background = "#FAFAFA"; }}
      />
      {hasErr && <p style={{ margin: "3px 0 0", fontSize: 11, color: "#EF4444" }}>{t(`${labelAr} غير صحيح`, `${labelEn} is invalid`)}</p>}
    </div>
  );
}