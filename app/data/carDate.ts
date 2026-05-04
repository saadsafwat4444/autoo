import { Car } from "@/app/types/car";



export const IMAGES = {

  fleet: "https://images.unsplash.com/photo-1620492948585-c97e18c173dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",

  bmwNight: "https://images.unsplash.com/photo-1759705859717-085bdf70a582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCTVclMjA1JTIwc2VyaWVzJTIwZGFyayUyMHNlZGFufGVufDF8fHx8MTc3MzMxNDUzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",

  mercedesBlack: "https://images.unsplash.com/photo-1770364276113-6d77f1c85730?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZXJjZWRlcyUyMEUlMjBjbGFzcyUyMGJsYWNrJTIwbHV4dXJ5fGVufDF8fHx8MTc3MzMxNDUzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",

  suvWhite: "https://images.unsplash.com/photo-1772389192167-b427bc7c1e40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3lvdGElMjBMYW5kJTIwQ3J1aXNlciUyMHdoaXRlJTIwU1VWfGVufDF8fHx8MTc3MzMxNDUzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",

  porscheRed: "https://images.unsplash.com/photo-1770890910261-909917038f55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQb3JzY2hlJTIwQm94c3RlciUyMHJlZCUyMHNwb3J0cyUyMGNhcnxlbnwxfHx8fDE3NzMzMTQ1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",

  carHighway: "https://images.unsplash.com/photo-1466875603152-be5267bd180e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",

  luxuryShowroom: "https://images.unsplash.com/photo-1637665301512-6d6682b06edf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",

  bentleyBlack: "https://images.unsplash.com/photo-1604486426042-b52f064a6079?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCZW50bGV5JTIwQmVudGF5Z2ElMjBibGFjayUyMGx1eHVyeSUyMFNVVnxlbnwxfHx8fDE3NzMzMTQ1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",

  teslaWhite: "https://images.unsplash.com/photo-1610470832703-95d40c3fad55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUZXNsYSUyME1vZGVsJTIwMyUyMHdoaXRlJTIwZWxlY3RyaWN8ZW58MXx8fHwxNzczMzE0NTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",

  cityDriving: "https://images.unsplash.com/photo-1716068072348-64c2b7181161?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3lvdGElMjBIaWdobGFuZGVyJTIwZGFyayUyMFNVVnxlbnwxfHx8fDE3NzMzMTY3NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",

  manDriving: "https://images.unsplash.com/photo-1758521961632-24056f441db8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",

  womanKeys: "https://images.unsplash.com/photo-1613893316557-2fb6efbc317d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",

  audiA6: "https://images.unsplash.com/photo-1695444923771-6ae89911b1ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBdWRpJTIwQTYlMjBzaWx2ZXIlMjBzZWRhbnxlbnwxfHx8fDE3NzMzMTY3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",

  toyotaCamry: "https://images.unsplash.com/photo-1689182441262-64e78e223584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3lvdGElMjBDYW1yeSUyMHdoaXRlJTIwbmV3fGVufDF8fHx8MTc3MzMxNjc0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",

  nissanPatrol: "https://images.unsplash.com/photo-1766321076645-b4257d0cf571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",

  rangeRover: "https://images.unsplash.com/photo-1758545241974-ea76f6e8edfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSYW5nZSUyMFJvdmVyJTIwYmxhY2slMjBwcmVtaXVtfGVufDF8fHx8MTc3MzMxNjc0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",

  hyundaiFrontera: "https://images.unsplash.com/photo-1742159646839-576fc18bae59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIeXVuZGFpJTIwU29uYXRhJTIwbW9kZXJuJTIwc2VkYW58ZW58MXx8fHwxNzczMzE2NzQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",

};





export const cars: Car[] = [

  {

    id: 1,

    name: { ar: "BMW الفئة الخامسة", en: "BMW 5 Series" },

    year: 2024,

    seats: 5,

    transmission: { ar: "أوتوماتيك", en: "Automatic" },

    fuel: { ar: "بنزين", en: "Gasoline" },

    category: "luxury",

    pricePerDay: 1200,

    rating: 4.8,

    reviews: 120,

    image: IMAGES.bmwNight,

  },

  {

    id: 2,

    name: { ar: "مرسيدس E-Class", en: "Mercedes E-Class" },

    year: 2024,

    seats: 5,

    transmission: { ar: "أوتوماتيك", en: "Automatic" },

    fuel: { ar: "بنزين", en: "Gasoline" },

    category: "luxury",

    pricePerDay: 1500,

    rating: 4.9,

    reviews: 98,

    image: IMAGES.mercedesBlack,

  },

  {

    id: 3,

    name: { ar: "تويوتا لاند كروزر", en: "Toyota Land Cruiser" },

    year: 2023,

    seats: 7,

    transmission: { ar: "أوتوماتيك", en: "Automatic" },

    fuel: { ar: "بنزين", en: "Gasoline" },

    category: "suv",

    pricePerDay: 900,

    rating: 4.7,

    reviews: 210,

    image: IMAGES.suvWhite,

  },

  {

    id: 4,

    name: { ar: "بورش بوكستر", en: "Porsche Boxster" },

    year: 2024,

    seats: 2,

    transmission: { ar: "أوتوماتيك", en: "Automatic" },

    fuel: { ar: "بنزين", en: "Gasoline" },

    category: "sports",

    pricePerDay: 2000,

    rating: 5.0,

    reviews: 45,

    image: IMAGES.porscheRed,

  },

  {

    id: 5,

    name: { ar: "تسلا موديل 3", en: "Tesla Model 3" },

    year: 2024,

    seats: 5,

    transmission: { ar: "أوتوماتيك", en: "Automatic" },

    fuel: { ar: "كهرباء", en: "Electric" },

    category: "economy",

    pricePerDay: 800,

    rating: 4.6,

    reviews: 175,

    image: IMAGES.teslaWhite,

  },

  {

    id: 6,

    name: { ar: "بنتلي بنتاياجا", en: "Bentley Bentayga" },

    year: 2024,

    seats: 5,

    transmission: { ar: "أوتوماتيك", en: "Automatic" },

    fuel: { ar: "بنزين", en: "Gasoline" },

    category: "luxury",

    pricePerDay: 3500,

    rating: 5.0,

    reviews: 32,

    image: IMAGES.bentleyBlack,

  },

  {

    id: 7,

    name: { ar: "أودي A6", en: "Audi A6" },

    year: 2024,

    seats: 5,

    transmission: { ar: "أوتوماتيك", en: "Automatic" },

    fuel: { ar: "بنزين", en: "Gasoline" },

    category: "luxury",

    pricePerDay: 1100,

    rating: 4.7,

    reviews: 88,

    image: IMAGES.audiA6,

  },

  {

    id: 8,

    name: { ar: "تويوتا كامري", en: "Toyota Camry" },

    year: 2024,

    seats: 5,

    transmission: { ar: "أوتوماتيك", en: "Automatic" },

    fuel: { ar: "بنزين", en: "Gasoline" },

    category: "economy",

    pricePerDay: 550,

    rating: 4.5,

    reviews: 302,

    image: IMAGES.toyotaCamry,

  },

  {

    id: 9,

    name: { ar: "نيسان باترول", en: "Nissan Patrol" },

    year: 2023,

    seats: 8,

    transmission: { ar: "أوتوماتيك", en: "Automatic" },

    fuel: { ar: "بنزين", en: "Gasoline" },

    category: "suv",

    pricePerDay: 1050,

    rating: 4.8,

    reviews: 140,

    image: IMAGES.nissanPatrol,

  },

  {

    id: 10,

    name: { ar: "رينج روفر فوج", en: "Range Rover Vogue" },

    year: 2024,

    seats: 5,

    transmission: { ar: "أوتوماتيك", en: "Automatic" },

    fuel: { ar: "بنزين", en: "Gasoline" },

    category: "luxury",

    pricePerDay: 2800,

    rating: 4.9,

    reviews: 56,

    image: IMAGES.rangeRover,

  },

  {

    id: 11,

    name: { ar: "هيونداي سوناتا", en: "Hyundai Sonata" },

    year: 2024,

    seats: 5,

    transmission: { ar: "أوتوماتيك", en: "Automatic" },

    fuel: { ar: "بنزين", en: "Gasoline" },

    category: "economy",

    pricePerDay: 420,

    rating: 4.4,

    reviews: 256,

    image: IMAGES.hyundaiFrontera,

  },

  {

    id: 12,

    name: { ar: "تويوتا هايلاندر", en: "Toyota Highlander" },

    year: 2023,

    seats: 7,

    transmission: { ar: "أوتوماتيك", en: "Automatic" },

    fuel: { ar: "بنزين", en: "Gasoline" },

    category: "suv",

    pricePerDay: 750,

    rating: 4.6,

    reviews: 183,

    image: IMAGES.cityDriving,

  },

];



export const testimonials = [

  {

    id: 1,

    name: { ar: "أحمد محمد", en: "Ahmed Mohamed" },

    role: { ar: "رجل أعمال", en: "Businessman" },

    rating: 5,

    comment: {

      ar: "خدمة رائعة جداً! استلمت السيارة في الوقت المحدد وكانت نظيفة تماماً. سأتعامل معكم دائماً.",

      en: "Excellent service! The car was delivered on time and perfectly clean. I'll always choose you.",

    },

    avatar: IMAGES.manDriving,

  },

  {

    id: 2,

    name: { ar: "سارة أحمد", en: "Sara Ahmed" },

    role: { ar: "طالبة دكتوراه", en: "PhD Student" },

    rating: 5,

    comment: {

      ar: "تجربة ممتازة من أول حجز لآخر لحظة. السعر مناسب والسيارة فاخرة. شكراً جزيلاً!",

      en: "Amazing experience from booking to return. Great price and luxurious car. Thank you!",

    },

    avatar: IMAGES.womanKeys,

  },

  {

    id: 3,

    name: { ar: "خالد العمري", en: "Khaled Al-Omari" },

    role: { ar: "مهندس", en: "Engineer" },

    rating: 4,

    comment: {

      ar: "سهولة الحجز عبر الموقع جعلت تجربتي رائعة. أنصح الجميع بالتعامل مع هذه الشركة.",

      en: "The easy online booking made my experience wonderful. I recommend everyone to use this company.",

    },

    avatar: IMAGES.cityDriving,

  },

];



export const blogPosts = [
  {
    id: 1,
    title: { ar: "كيف تختار السيارة المناسبة لرحلتك", en: "How to Choose the Right Car for Your Trip" },
    excerpt: { ar: "دليل شامل لاختيار السيارة المثالية بناءً على وجهتك وعدد الركاب وميزانيتك.", en: "A comprehensive guide to picking the perfect car based on your destination, passengers, and budget." },
    category: { ar: "نصائح", en: "Tips" },
    readTime: { ar: "5 دقائق", en: "5 min" },
    author: { ar: "فريق DriveNow", en: "DriveNow Team" },
    image: IMAGES.carHighway,
    date: "2026-03-01",
  },
  {
    id: 2,
    title: { ar: "مزايا اشتراك VIP في تأجير السيارات", en: "Benefits of VIP Car Rental Subscription" },
    excerpt: { ar: "اكتشف كيف يوفر لك اشتراك VIP توفيراً كبيراً في التكلفة مع امتيازات حصرية لا مثيل لها.", en: "Discover how a VIP subscription saves you significantly while unlocking exclusive perks." },
    category: { ar: "اشتراكات", en: "Subscriptions" },
    readTime: { ar: "4 دقائق", en: "4 min" },
    author: { ar: "سارة الحسين", en: "Sara Al-Hussein" },
    image: IMAGES.luxuryShowroom,
    date: "2026-02-20",
  },
  {
    id: 3,
    title: { ar: "أفضل وجهات السياحة بالسيارة في مصر", en: "Best Road Trip Destinations in Egypt" },
    excerpt: { ar: "من الساحل الشمالي إلى الأقصر، تعرف على أجمل الطرق التي يمكنك استكشافها بسيارتك المستأجرة.", en: "From the North Coast to Luxor, discover the most scenic routes to explore in your rental car." },
    category: { ar: "سياحة", en: "Travel" },
    readTime: { ar: "7 دقائق", en: "7 min" },
    author: { ar: "أحمد طارق", en: "Ahmed Tarek" },
    image: IMAGES.suvWhite,
    date: "2026-02-10",
  },
  {
    id: 4,
    title: { ar: "نصائح صيانة السيارة خلال فترة الإيجار", en: "Car Maintenance Tips During Your Rental" },
    excerpt: { ar: "تعرف على أهم الأشياء التي يجب فحصها قبل وأثناء رحلتك لضمان سلامة كاملة.", en: "Learn the key things to check before and during your trip to ensure complete safety." },
    category: { ar: "أمان", en: "Safety" },
    readTime: { ar: "6 دقائق", en: "6 min" },
    author: { ar: "محمد الشامي", en: "Mohamed Al-Shami" },
    image: "https://images.unsplash.com/photo-1770656505784-3fad3cd41fcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2026-02-01",
  },
  {
    id: 5,
    title: { ar: "رحلة عائلية مثالية: السيارة المناسبة", en: "The Perfect Family Road Trip: Choosing the Right Vehicle" },
    excerpt: { ar: "خطط لأفضل رحلة عائلية مع اختيار سيارة تناسب عدد أفراد الأسرة وتوفر الراحة لجميعهم.", en: "Plan the ultimate family road trip with a vehicle that fits everyone comfortably and safely." },
    category: { ar: "عائلي", en: "Family" },
    readTime: { ar: "8 دقائق", en: "8 min" },
    author: { ar: "منى إبراهيم", en: "Mona Ibrahim" },
    image: "https://images.unsplash.com/photo-1761047321481-abbdcfb7ff00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2026-01-25",
  },
  {
    id: 6,
    title: { ar: "مستقبل السيارات الكهربائية في التأجير", en: "The Future of Electric Cars in Rental Services" },
    excerpt: { ar: "كيف تُغيّر السيارات الكهربائية صناعة التأجير وما الذي يجب أن تعرفه قبل استئجار سيارة كهربائية.", en: "How EVs are transforming the rental industry and what you need to know before renting one." },
    category: { ar: "تقنية", en: "Technology" },
    readTime: { ar: "5 دقائق", en: "5 min" },
    author: { ar: "كريم سعيد", en: "Karim Saeed" },
    image: "https://images.unsplash.com/photo-1763543020294-b1a2da6ec325?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2026-01-15",
  },
  {
    id: 7,
    title: { ar: "دليل التأمين الشامل لتأجير السيارات", en: "Complete Insurance Guide for Car Rentals" },
    excerpt: { ar: "كل ما تحتاج معرفته عن أنواع التأمين وكيف تحمي نفسك أثناء استئجار السيارة.", en: "Everything you need to know about insurance types and how to protect yourself when renting." },
    category: { ar: "نصائح", en: "Tips" },
    readTime: { ar: "9 دقائق", en: "9 min" },
    author: { ar: "فريق DriveNow", en: "DriveNow Team" },
    image: "https://images.unsplash.com/photo-1664034502680-a84a6e394718?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2026-01-05",
  },
  {
    id: 8,
    title: { ar: "تجربة قيادة السيارات الفاخرة: هل تستحق؟", en: "Luxury Car Driving Experience: Is It Worth It?" },
    excerpt: { ar: "نأخذك في جولة داخل أفخم السيارات المتاحة للإيجار ونقيّم تجربة القيادة الفعلية.", en: "We take you inside the most luxurious rental cars and evaluate the real driving experience." },
    category: { ar: "مراجعات", en: "Reviews" },
    readTime: { ar: "10 دقائق", en: "10 min" },
    author: { ar: "ياسر العلي", en: "Yasser Al-Ali" },
    image: "https://images.unsplash.com/photo-1609465397944-be1ce3ebda61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "2025-12-28",
  },
];

export const services = [
  { icon: "🚗", ar: "تأجير يومي", en: "Daily Rental", descAr: "سيارات متاحة على مدار اليوم", descEn: "Cars available around the clock" },
  { icon: "📅", ar: "تأجير شهري", en: "Monthly Rental", descAr: "أفضل سعر للمدى الطويل", descEn: "Best long-term pricing" },
  { icon: "👨‍✈️", ar: "تأجير مع سائق", en: "Chauffeur Service", descAr: "سائق محترف ومرخص", descEn: "Professional licensed driver" },
  { icon: "✈️", ar: "خدمة المطار", en: "Airport Service", descAr: "استلام وتسليم في المطار", descEn: "Airport pickup & drop-off" },
  { icon: "💍", ar: "المناسبات", en: "Special Occasions", descAr: "سيارات للأفراح والمناسبات", descEn: "Cars for weddings & events" },
  { icon: "🏢", ar: "الشركات", en: "Corporate", descAr: "باقات مخصصة للشركات", descEn: "Custom corporate packages" },
];

export const faqs = [
  { q: { ar: "هل يمكن إلغاء الحجز؟", en: "Can I cancel my booking?" }, a: { ar: "نعم، يمكن إلغاء الحجز قبل 24 ساعة مجاناً.", en: "Yes, you can cancel for free up to 24 hours before pickup." } },
  { q: { ar: "ما هي مستندات التأجير المطلوبة؟", en: "What documents are required?" }, a: { ar: "رخصة قيادة سارية + بطاقة هوية وطنية + بطاقة ائتمانية.", en: "Valid driver's license + national ID + credit card." } },
  { q: { ar: "هل يشمل السعر التأمين؟", en: "Does the price include insurance?" }, a: { ar: "نعم، جميع سياراتنا مؤمن عليها تأميناً شاملاً.", en: "Yes, all our cars have full comprehensive insurance." } },
  { q: { ar: "هل يمكنني تمديد مدة الإيجار؟", en: "Can I extend the rental period?" }, a: { ar: "نعم، تواصل معنا قبل 12 ساعة من موعد الإرجاع.", en: "Yes, contact us 12 hours before the return date." } },
  { q: { ar: "ما هو الحد الأدنى لسن التأجير؟", en: "What is the minimum age to rent?" }, a: { ar: "يجب أن يكون عمر المستأجر 21 سنة على الأقل.", en: "The renter must be at least 21 years old." } },
];