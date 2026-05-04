import Theme1 from "./themes/theme1/page";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import ThemeRenderer from "./components/ThemeRenderer";

export default function Home() {
  return (
    <div>
      <ThemeRenderer />
      <ThemeSwitcher />
    </div>
  );
}