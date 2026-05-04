"use client"

 

import { createContext, useContext, useEffect, useState } from "react";
import { WBooking } from "@/app/types/car";


export type ThemeId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
 

export const THEME_ACCENTS: Record<ThemeId, { primary: string; hover: string; label: string; secondary?: string }> = {
  1: { primary: "#4F46E5", hover: "#4338CA", label: "Deep Indigo",  secondary: "#7C3AED" },
  2: { primary: "#C9A84C", hover: "#A07830", label: "Luxury Gold" },
  3: { primary: "#C62839", hover: "#A21F2E", label: "Racing Crimson" },
  4: { primary: "#2563EB", hover: "#1D4ED8", label: "Clean Minimal" },
  5: { primary: "#06B6D4", hover: "#0891B2", label: "Smart AI", secondary: "#4F46E5" },
  6: { primary: "#15803D", hover: "#166534", label: "Road Adventure", secondary: "#65A30D" },
  7: { primary: "#7C3AED", hover: "#6D28D9", label: "City Life", secondary: "#1F2937" },
  8: { primary: "#F97316", hover: "#EA580C", label: "Situation Solver", secondary: "#1F2937" },
  9: { primary: "#8B5CF6", hover: "#7C3AED", label: "Car Personality", secondary: "#1F2937" },
};
type Language = "ar" | "en";
type DNPage = "cars" | "home" | "about" | "contact";
 type AppContextType={
    theme:ThemeId,
    setTheme:(theme:ThemeId) => void,
    accent: string;
  lang: Language;
  setLang: (l: Language) => void;
  t: (ar: string, en: string) => string;
  isRTL: boolean;
  bookings: WBooking[];
  addBooking: (booking: WBooking) => void;
  dnPage: DNPage | null;
  setDNPage: (page: DNPage | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);


export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeId>(1);
     const [lang, setLang] = useState<Language>("ar");
  const [bookings, setBookings] = useState<WBooking[]>([]);
  const [dnPage, setDNPage] = useState<DNPage | null>(null);
  const isRTL = lang === "ar";
  const t = (ar: string, en: string) => {
  return lang === "ar" ? ar : en;
};

const addBooking = (booking: WBooking) => {
  setBookings(prev => [...prev, booking]);
};

useEffect(() => {
  if (typeof document !== "undefined") {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }
}, [lang, isRTL]);
    
    return (
     <AppContext.Provider value={{ theme, setTheme, accent: THEME_ACCENTS[theme].primary, lang, setLang, t, isRTL, bookings, addBooking, dnPage, setDNPage }}>
      {children}
     </AppContext.Provider>
    );
};
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
