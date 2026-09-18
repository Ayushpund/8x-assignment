export type ApiModel = {
  id: string;
  name: string;
  type: "Image" | "Video";
  price: string;
  oldPrice?: string;
  badge?: "20% OFF" | "TOP";
  thumbnail: string;
  href: string;
};

export const API_MODELS: ApiModel[] = [
  {
    id: "marketing-studio",
    name: "Marketing Studio Image",
    type: "Image",
    price: "$ 0.0129 / image",
    oldPrice: "0.0162 / image",
    badge: "20% OFF",
    thumbnail:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80",
    href: "/create?template=marble-product",
  },
  {
    id: "nano-banana",
    name: "Nano Banana Pro",
    type: "Image",
    price: "$ 0.009 / image",
    badge: "TOP",
    thumbnail:
      "https://images.unsplash.com/photo-1685909726692-257f202494b9?w=600&q=80",
    href: "/image",
  },
  {
    id: "seedance",
    name: "Seedance 2.5",
    type: "Video",
    price: "$ 0.04 / sec",
    badge: "TOP",
    thumbnail:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80",
    href: "/video",
  },
  {
    id: "gpt-image",
    name: "GPT Image 2.5 Sunburst",
    type: "Image",
    price: "$ 0.011 / image",
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    href: "/create",
  },
  {
    id: "genjutsu-v",
    name: "Genjutsu Video",
    type: "Video",
    price: "$ 0.05 / sec",
    thumbnail:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
    href: "/genjutsu",
  },
  {
    id: "cinema",
    name: "Cinema Studio 4.0",
    type: "Image",
    price: "$ 0.014 / image",
    thumbnail:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80",
    href: "/cinema-studio",
  },
];
