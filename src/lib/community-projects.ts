import { higgsExploreImage } from "@/lib/higgs-media";

const img = (file: string) => higgsExploreImage(file, 800);

/** Community grid — one unique explore asset per project (higgsfield.ai titles) */
export const COMMUNITY_PROJECTS = [
  {
    title: "If you stop loving me, I'll die",
    author: "Higgsfield Studio · Public",
    image: img(
      "e88805fcb31442389587a2953675fd723ee8d4cb5a317e6280b5d1cca979e152-thumbnail.webp"
    ),
  },
  {
    title: "Cully Hill Boys",
    author: "Higgsfield Studio · Public",
    image: img(
      "5aaa4da5fe1aa5a2cc69996c8e9eddc019f68c36dae81c2c587ff5f3e4a87954-thumbnail.webp"
    ),
  },
  {
    title: "Red Flag",
    author: "Higgsfield Studio · Public",
    image: img(
      "847a08a539f44a715925a716c50f53f43d3073aeaa5a884921beb9394f810e04-thumbnail.webp"
    ),
  },
  {
    title: "Kok Boru",
    author: "Higgsfield Studio · Public",
    image: img(
      "74c63b88a889cb7f0f4389b8ae945592ff66d7cbcf41b48f9132fa341803a090-thumbnail.webp"
    ),
  },
  {
    title: "Adiliada",
    author: "Higgsfield Studio · Public",
    image: img(
      "aa642d35ed929d33feab8bbe4389d33ad8f65e384576ed6a25532e762c94bbd0-image.webp"
    ),
  },
  {
    title: "ONEIRIC",
    author: "Higgsfield Studio · Public",
    image: img(
      "52a6ceab9e44aa8dea42343c337a6b236690253920b4a2181b6c45cbb023ce49-image.webp"
    ),
  },
  {
    title: "ZEPHYR: Special",
    author: "Higgsfield Studio · Public",
    image: img(
      "5d978a3db6a8f758a02a658956c68d1bd43b82da96be75c83369d0bb33e48eb4-thumbnail.webp"
    ),
  },
  {
    title: "HELL GRIND",
    author: "Higgsfield Studio · Public",
    image: img(
      "1a6a226e8611b061e0b9f37ab843d6bd7bff420e46cfb72531375e9d5b2052b3-thumbnail.webp"
    ),
  },
] as const;
