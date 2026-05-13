import auraRing from "@/assets/p-aura-ring.jpg";
import celestialHoops from "@/assets/p-celestial-hoops.jpg";
import eternalPendant from "@/assets/p-eternal-pendant.jpg";
import nomadCuff from "@/assets/p-nomad-cuff.jpg";
import emeraldRing from "@/assets/p-emerald-ring.jpg";
import tennisBracelet from "@/assets/p-tennis-bracelet.jpg";
import catRings from "@/assets/cat-rings.jpg";
import catEarrings from "@/assets/cat-earrings.jpg";
import catNecklaces from "@/assets/cat-necklaces.jpg";
import catBracelets from "@/assets/cat-bracelets.jpg";

export type Category = "rings" | "earrings" | "necklaces" | "bracelets";

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  material: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  description: string;
  details: string[];
  sizes?: string[];
  inStock: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  reviews: Review[];
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "aura-diamond-solitaire",
    name: "Aura Diamond Solitaire",
    category: "rings",
    material: "18KT Rose Gold",
    price: 2850,
    oldPrice: 3400,
    image: auraRing,
    images: [auraRing, emeraldRing, auraRing],
    rating: 4.9,
    reviewCount: 48,
    description:
      "A timeless solitaire crafted in 18KT rose gold with a hand-selected 0.5ct round brilliant diamond. Designed to be worn daily, treasured forever.",
    details: ["18KT Rose Gold", "0.5ct VS1 Diamond", "Conflict-free sourcing", "Lifetime craftsmanship"],
    sizes: ["4", "5", "6", "7", "8"],
    inStock: true,
    isNew: true,
    isTrending: true,
    reviews: [
      { id: "r1", user: "Eleanor V.", rating: 5, comment: "Even more beautiful in person — the rose gold is so warm.", date: "2 weeks ago" },
      { id: "r2", user: "Sophia K.", rating: 5, comment: "Engagement ring of dreams. Packaging was museum-grade.", date: "1 month ago" },
    ],
  },
  {
    id: "2",
    slug: "celestial-pearl-hoops",
    name: "Celestial Pearl Hoops",
    category: "earrings",
    material: "14KT Yellow Gold | Akoya Pearl",
    price: 1120,
    image: celestialHoops,
    images: [celestialHoops],
    rating: 4.8,
    reviewCount: 32,
    description:
      "Slim 14KT gold hoops dressed with hand-knotted akoya pearls. Light enough for every day, sculptural enough for the evening.",
    details: ["14KT Yellow Gold", "Cultured Akoya Pearls", "Hypoallergenic posts"],
    inStock: true,
    isTrending: true,
    reviews: [
      { id: "r1", user: "Mira T.", rating: 5, comment: "I wear them constantly — they catch the light perfectly.", date: "3 weeks ago" },
    ],
  },
  {
    id: "3",
    slug: "eternal-heart-pendant",
    name: "Eternal Heart Pendant",
    category: "necklaces",
    material: "18KT White Gold | Pavé",
    price: 890,
    image: eternalPendant,
    images: [eternalPendant],
    rating: 4.7,
    reviewCount: 56,
    description:
      "A polished heart pendant in 18KT white gold on a fine cable chain. Quietly romantic, endlessly wearable.",
    details: ["18KT White Gold", "Adjustable 16–18 in chain", "Hand-polished finish"],
    inStock: true,
    isNew: true,
    reviews: [
      { id: "r1", user: "Ana P.", rating: 5, comment: "Bought as a birthday gift — she hasn't taken it off.", date: "1 week ago" },
    ],
  },
  {
    id: "4",
    slug: "nomad-sculptural-cuff",
    name: "Nomad Sculptural Cuff",
    category: "bracelets",
    material: "Hand-forged 14KT Gold",
    price: 3450,
    image: nomadCuff,
    images: [nomadCuff],
    rating: 4.9,
    reviewCount: 21,
    description:
      "Hand-forged from a single billet of 14KT gold, the Nomad cuff is sculpted to feel weightless on the wrist.",
    details: ["14KT Solid Gold", "Hand-forged in Florence", "One size, gently adjustable"],
    inStock: true,
    isTrending: true,
    reviews: [
      { id: "r1", user: "Jules M.", rating: 5, comment: "Substantial without being heavy. A statement piece.", date: "2 months ago" },
    ],
  },
  {
    id: "5",
    slug: "verdant-emerald-ring",
    name: "Verdant Emerald Ring",
    category: "rings",
    material: "18KT Yellow Gold | Emerald",
    price: 5200,
    image: emeraldRing,
    images: [emeraldRing, auraRing],
    rating: 5.0,
    reviewCount: 14,
    description:
      "An emerald-cut Colombian emerald set in 18KT yellow gold with a delicate diamond halo. A modern heirloom.",
    details: ["18KT Yellow Gold", "2.1ct Colombian Emerald", "0.3ct Diamond Halo"],
    sizes: ["5", "6", "7", "8"],
    inStock: true,
    isNew: true,
    reviews: [],
  },
  {
    id: "6",
    slug: "luminous-tennis-bracelet",
    name: "Luminous Tennis Bracelet",
    category: "bracelets",
    material: "Platinum | 3ct Diamonds",
    price: 6800,
    oldPrice: 7400,
    image: tennisBracelet,
    images: [tennisBracelet],
    rating: 4.9,
    reviewCount: 38,
    description:
      "A continuous line of 3 carats of round brilliant diamonds set in polished platinum. The definitive tennis bracelet.",
    details: ["Platinum 950", "3ct Round Brilliant Diamonds", "Double-clasp security"],
    inStock: true,
    isTrending: true,
    reviews: [
      { id: "r1", user: "Camille R.", rating: 5, comment: "The light it throws is unreal. Worth every penny.", date: "5 days ago" },
    ],
  },
];

export const CATEGORIES: { id: Category; label: string; image: string }[] = [
  { id: "rings", label: "Rings", image: catRings },
  { id: "earrings", label: "Earrings", image: catEarrings },
  { id: "necklaces", label: "Necklaces", image: catNecklaces },
  { id: "bracelets", label: "Bracelets", image: catBracelets },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
