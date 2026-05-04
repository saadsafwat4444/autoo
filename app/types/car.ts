export interface Car {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  year: number;
  seats: number;
  fuel: {
    ar: string;
    en: string;
  };
  transmission: {
    ar: string;
    en: string;
  };
  rating: number;
  reviews: number;
  pricePerDay: number;
  category: "luxury" | "sports" | "suv" | "economy";
  image: string;
  features?: {
    ar: string;
    en: string;
  }[];
}

export interface WBooking {
  ref: string;
  carNameAr: string;
  carNameEn: string;
  carImage: string;
  pricePerDay: number;
  days: number;
  addonsTotal: number;
  total: number;
  startDate: string;
  endDate: string;
  pickupAr: string;
  pickupEn: string;
  addons: string[];
  renterName: string;
  renterPhone: string;
  renterEmail: string;
  payment: "cash" | "card" | "wallet";
  status: "active" | "completed" | "cancelled";
  createdAt: string;
}
