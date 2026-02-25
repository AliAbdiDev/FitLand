export type SportProduct = {
  id: string;
  imageSrc: string;
  title: string;
  minSize: string;
  maxSize: string;
  price: string;
  discountedPrice: string | null;
  numberActiveStars: string;
  classNameColorProducts: string[];
  brand: string;
  sportType: string;
  colors: string[];
  availableSizes: string[];
  priceValue: number;
  originalPriceValue: number;
  salesCount: number;
  visitCount: number;
  createdAt: string;
};

export type ShopProductQuery = {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  color?: string;
  size?: string;
  brands?: string;
};

const toPriceLabel = (value: number) => value.toLocaleString("en-US");

const createProduct = (
  product: Omit<SportProduct, "price" | "discountedPrice">
): SportProduct => ({
  ...product,
  price: toPriceLabel(product.priceValue),
  discountedPrice:
    product.originalPriceValue > product.priceValue
      ? toPriceLabel(product.originalPriceValue)
      : null,
});

export const mockSportProducts: SportProduct[] = [
  createProduct({
    id: "1",
    imageSrc: "/image/borwn-showse.png",
    title: "کفش رانینگ نایکی مدل پگاسوس تریل ۵",
    minSize: "S",
    maxSize: "XL",
    numberActiveStars: "5",
    classNameColorProducts: ["bg-emerald-500", "bg-zinc-200", "bg-black"],
    brand: "Nike",
    sportType: "Running",
    colors: ["emerald"],
    availableSizes: ["S", "M", "L", "XL"],
    priceValue: 940,
    originalPriceValue: 1180,
    salesCount: 720,
    visitCount: 4200,
    createdAt: "2026-01-18",
  }),
  createProduct({
    id: "2",
    imageSrc: "/image/borwn-showse.png",
    title: "تیشرت ورزشی آدیداس مدل آدیزیرو اسپرینت",
    minSize: "S",
    maxSize: "XXL",
    numberActiveStars: "4",
    classNameColorProducts: ["bg-blue-500", "bg-zinc-100"],
    brand: "Adidas",
    sportType: "Running",
    colors: ["blue"],
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    priceValue: 210,
    originalPriceValue: 260,
    salesCount: 540,
    visitCount: 3100,
    createdAt: "2025-11-03",
  }),
  createProduct({
    id: "3",
    imageSrc: "/image/borwn-showse.png",
    title: "شلوارک ورزشی آندر آرمور مدل هیت‌گیر",
    minSize: "M",
    maxSize: "XXL",
    numberActiveStars: "4",
    classNameColorProducts: ["bg-red-500", "bg-zinc-800"],
    brand: "Under Armour",
    sportType: "Training",
    colors: ["red"],
    availableSizes: ["M", "L", "XL", "XXL"],
    priceValue: 180,
    originalPriceValue: 180,
    salesCount: 390,
    visitCount: 1800,
    createdAt: "2025-08-12",
  }),
  createProduct({
    id: "4",
    imageSrc: "/image/borwn-showse.png",
    title: "کوله ورزشی پوما مدل کورت پرو",
    minSize: "S",
    maxSize: "L",
    numberActiveStars: "3",
    classNameColorProducts: ["bg-indigo-500", "bg-zinc-200"],
    brand: "Puma",
    sportType: "Basketball",
    colors: ["indigo"],
    availableSizes: ["S", "M", "L"],
    priceValue: 320,
    originalPriceValue: 430,
    salesCount: 260,
    visitCount: 2500,
    createdAt: "2026-02-01",
  }),
  createProduct({
    id: "5",
    imageSrc: "/image/borwn-showse.png",
    title: "کفش رانینگ آسیکس مدل ژل کایانو ۳۱",
    minSize: "M",
    maxSize: "XL",
    numberActiveStars: "5",
    classNameColorProducts: ["bg-orange-500", "bg-zinc-100", "bg-blue-900"],
    brand: "Asics",
    sportType: "Running",
    colors: ["orange", "blue"],
    availableSizes: ["M", "L", "XL"],
    priceValue: 1090,
    originalPriceValue: 1240,
    salesCount: 610,
    visitCount: 5300,
    createdAt: "2025-12-22",
  }),
  createProduct({
    id: "6",
    imageSrc: "/image/borwn-showse.png",
    title: "دستکش تمرین ریباک مدل نانو",
    minSize: "S",
    maxSize: "XL",
    numberActiveStars: "4",
    classNameColorProducts: ["bg-pink-500", "bg-zinc-200"],
    brand: "Reebok",
    sportType: "Training",
    colors: ["pink"],
    availableSizes: ["S", "M", "L", "XL"],
    priceValue: 120,
    originalPriceValue: 160,
    salesCount: 180,
    visitCount: 900,
    createdAt: "2026-02-10",
  }),
  createProduct({
    id: "7",
    imageSrc: "/image/borwn-showse.png",
    title: "کاپشن گرم‌کن نیوبالانس تیمی",
    minSize: "M",
    maxSize: "XXL",
    numberActiveStars: "4",
    classNameColorProducts: ["bg-amber-500", "bg-zinc-700"],
    brand: "New Balance",
    sportType: "Football",
    colors: ["amber"],
    availableSizes: ["M", "L", "XL", "XXL"],
    priceValue: 540,
    originalPriceValue: 690,
    salesCount: 330,
    visitCount: 2200,
    createdAt: "2025-10-15",
  }),
  createProduct({
    id: "8",
    imageSrc: "/image/borwn-showse.png",
    title: "شلوار ورزشی نایکی مدل دری‌فیت آکادمی",
    minSize: "S",
    maxSize: "XL",
    numberActiveStars: "5",
    classNameColorProducts: ["bg-blue-500", "bg-zinc-800"],
    brand: "Nike",
    sportType: "Football",
    colors: ["blue"],
    availableSizes: ["S", "M", "L", "XL"],
    priceValue: 430,
    originalPriceValue: 520,
    salesCount: 800,
    visitCount: 6100,
    createdAt: "2026-02-16",
  }),
  createProduct({
    id: "9",
    imageSrc: "/image/borwn-showse.png",
    title: "قمقمه ورزشی آدیداس ۱ لیتری",
    minSize: "S",
    maxSize: "M",
    numberActiveStars: "3",
    classNameColorProducts: ["bg-red-500", "bg-blue-500"],
    brand: "Adidas",
    sportType: "Training",
    colors: ["red", "blue"],
    availableSizes: ["S", "M"],
    priceValue: 75,
    originalPriceValue: 95,
    salesCount: 950,
    visitCount: 7400,
    createdAt: "2025-07-06",
  }),
  createProduct({
    id: "10",
    imageSrc: "/image/borwn-showse.png",
    title: "زانوبند میزانو مدل ویو مومنتوم",
    minSize: "S",
    maxSize: "L",
    numberActiveStars: "4",
    classNameColorProducts: ["bg-indigo-500", "bg-pink-500"],
    brand: "Mizuno",
    sportType: "Volleyball",
    colors: ["indigo", "pink"],
    availableSizes: ["S", "M", "L"],
    priceValue: 165,
    originalPriceValue: 210,
    salesCount: 210,
    visitCount: 1300,
    createdAt: "2026-01-28",
  }),
];

const getSafeNumber = (value: string | undefined) => {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const normalizeText = (value: string) => value.trim().toLowerCase();

export function getVisibleSportProducts(query: ShopProductQuery = {}) {
  const minPrice = getSafeNumber(query.minPrice);
  const maxPrice = getSafeNumber(query.maxPrice);
  const selectedColor = normalizeText(query.color ?? "");
  const selectedSize = normalizeText(query.size ?? "");
  const selectedBrands = (query.brands ?? "")
    .split(",")
    .map((brand) => normalizeText(brand))
    .filter(Boolean);

  let products = [...mockSportProducts];

  if (typeof minPrice === "number") {
    products = products.filter((product) => product.priceValue >= minPrice);
  }

  if (typeof maxPrice === "number") {
    products = products.filter((product) => product.priceValue <= maxPrice);
  }

  if (selectedColor) {
    products = products.filter((product) =>
      product.colors.some((color) => normalizeText(color) === selectedColor)
    );
  }

  if (selectedSize) {
    products = products.filter((product) =>
      product.availableSizes.some((size) => normalizeText(size) === selectedSize)
    );
  }

  if (selectedBrands.length > 0) {
    products = products.filter((product) =>
      selectedBrands.includes(normalizeText(product.brand))
    );
  }

  switch (query.category) {
    case "cheapest":
      products.sort((a, b) => a.priceValue - b.priceValue);
      break;
    case "most-expensive":
      products.sort((a, b) => b.priceValue - a.priceValue);
      break;
    case "best-seller":
      products.sort((a, b) => b.salesCount - a.salesCount);
      break;
    case "newest":
      products.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case "most-visited":
      products.sort((a, b) => b.visitCount - a.visitCount);
      break;
    default:
      break;
  }

  return products;
}
