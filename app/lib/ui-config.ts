import { useAppContext } from "../contexts/AppContext";

export function useUIConfig(accent: string) {
  const { lang,theme } = useAppContext();

  return {
    lang,
    accent,
    isRTL: lang === "ar",
    t: (ar: string, en: string) =>
      lang === "ar" ? ar : en,
    theme
  };
}