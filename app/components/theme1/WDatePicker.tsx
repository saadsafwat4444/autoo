interface WDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  accent: string;
  ff: string;
}

export default function WDatePicker({ value, onChange, label, accent, ff }: WDatePickerProps) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block", fontFamily: ff }}>
        {label}
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "11px 13px",
          border: "1.5px solid #E5E7EB",
          outline: "none",
          fontSize: 14,
          fontFamily: ff,
          borderRadius: 8,
          background: "#FAFAFA",
          cursor: "pointer",
          transition: "border-color 0.2s"
        }}
        onFocus={(e) => e.target.style.borderColor = accent}
        onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
      />
    </div>
  );
}
