 
 
"use client"
import { useAppContext } from "../contexts/AppContext";
import Theme1 from "../themes/theme1/page";
import Theme2 from "../themes/theme2/page";
import Theme3 from "../themes/theme3/page";
import Theme4 from "../themes/theme4/page";
import Theme5 from "../themes/theme5/page";
import Theme6 from "../themes/theme6/page";
import Theme7 from "../themes/theme7/page";
import Theme8 from "../themes/theme8/page";
import Theme9 from "../themes/theme9/page";

export default function ThemeRenderer() {
  const { theme } = useAppContext();

  if (theme === 2) return <Theme2 />;
  if (theme === 3) return <Theme3 />;
  if (theme === 4) return <Theme4 />;
  if (theme === 5) return <Theme5 />;
  if (theme === 6) return <Theme6 />;
  if (theme === 7) return <Theme7 />;
  if (theme === 8) return <Theme8 />;
  if (theme === 9) return <Theme9 />;
  return <Theme1 />;
}