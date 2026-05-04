import { blogPosts, IMAGES } from "@/app/data/carDate";
import Navbar from "@/app/components/theme1/Navbar";
import AllCars from "@/app/components/theme1/AllCars";
import Footer from "@/app/components/theme1/Footer";

export default function CarsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <AllCars />
      <Footer />
    </div>
  );
}
