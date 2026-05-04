  "use client"

import { THEME_ACCENTS, ThemeId, useAppContext } from "../contexts/AppContext";

 
export function ThemeSwitcher() {
  const { theme, setTheme, isRTL } = useAppContext();

  return (
    <div style={{
      position: "fixed",
      bottom: 32,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      gap: 10,
      flexDirection: isRTL ? "row-reverse" : "row",
      background: "rgba(10,10,10,0.92)",
      backdropFilter: "blur(20px)",
      borderRadius: 100,
      padding: "10px 20px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      border: "1px solid rgba(255,255,255,0.08)",
    }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter',sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}>
        Theme
      </span>
      {([1, 2, 3, 4, 5, 6, 7, 8, 9] as ThemeId[]).map((id) => {
        const { primary, label } = THEME_ACCENTS[id];
        const active = theme === id;
        return (
          <button
            key={id}
            onClick={() => setTheme(id as any)}
            title={label}
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: primary,
              border: active ? "2.5px solid #fff" : "2.5px solid transparent",
              cursor: "pointer",
              outline: active ? `2px solid ${primary}` : "none",
              outlineOffset: 2,
              transition: "all 0.25s",
              transform: active ? "scale(1.25)" : "scale(1)",
            }}
          />
        );
      })}
      <span style={{
        fontSize: 10, fontWeight: 600,
        color: "rgba(255,255,255,0.5)",
        fontFamily: "'Inter',sans-serif",
        minWidth: 72, textAlign: "center",
        letterSpacing: "0.04em",
      }}>
        {THEME_ACCENTS[theme].label}
      </span>
    </div>
  );
}