import { blogPosts, IMAGES } from "@/app/data/carDate";
import Navbar from "@/app/components/theme1/Navbar";
import Hero from "@/app/components/theme1/Hero";
import ProductCards from "@/app/components/theme1/ProductCards";
import Services from "@/app/components/theme1/Services";
import Statement from "@/app/components/theme1/Statement";
import { Subscriptions } from "@/app/components/theme1/Subscriptions";
import AIAssistant from "@/app/components/theme1/AIAssistant";
import About from "@/app/components/theme1/About";
import Safety from "@/app/components/theme1/Safety";
import Trusted from "@/app/components/theme1/Trusted";
import Insights from "@/app/components/theme1/Insights";
import CTA from "@/app/components/theme1/CTA";
import FAQ from "@/app/components/theme1/FAQ";
import Footer from "@/app/components/theme1/Footer";
 

export const DARK      = "#0D1F3C";
export const OFF_WHITE = "#F5F6FA";
export const MID_GRAY  = "#8B93A7";
export const GAP       = 16;
export const PAD       =  "50px 130px";

export const WARM      = "#F59E0B";

export const EXTRA = {
  heroFull:  "https://images.unsplash.com/photo-1764013290141-63b13e311906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZW50YWwlMjBmbGVldCUyMHBhcmtkZSUyMGNsZWFuJTIwc2hvd3Jvb218ZW58MXx8fHwxNzczMTMzNjUxfDA&ixlib=rb-4.1.0&q=80&w=1400",
  fleet:     "https://images.unsplash.com/photo-1620492948585-c97e18c173dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  interior:  "https://images.unsplash.com/photo-1760689036908-b37db1b784b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  carKeys:   "https://images.unsplash.com/photo-1710006548781-eff5670376fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  safety:    "https://images.unsplash.com/photo-1574083986258-cf073732e55c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  showroom:  "https://images.unsplash.com/photo-1755790972699-a0957b2de9c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400",
  manDrive:  IMAGES.manDriving,
  womanKeys: IMAGES.womanKeys,
};

// Server Component
export default function Theme1(){
  
    
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <Hero />
      <ProductCards />
      <Services />
      <Statement />
      <Subscriptions />
      <AIAssistant />
      <About />
      <Safety />
      <Trusted />
      <Insights />
      <CTA />
      <FAQ />
      <Footer />
    </div>
  );
}