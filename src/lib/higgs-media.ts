/** Higgsfield CDN proxy — same pattern as console.higgsfield.ai/explore */

const CDN_BASE =
  "https://d28lhcrx5qdowv.cloudfront.net/media/explore/media";

export function higgsExploreImage(filename: string, width = 800): string {
  const raw = `${CDN_BASE}/${filename}`;
  const params = new URLSearchParams({
    default: "1",
    output: "webp",
    url: raw,
    w: String(width),
    q: "85",
  });
  return `https://images.higgs.ai/?${params.toString()}`;
}

export const HIGGS_STATIC = {
  openApi: "https://open.higgsfield.ai/social/open-higgsfield.webp",
  productShots: higgsExploreImage(
    "7ff805cfc3c70a2ca923b1a9002b04e91f6d627dd4d302afe09797ae2e3ca44a-image.webp",
    1200
  ),
  seedance25: higgsExploreImage(
    "74c63b88a889cb7f0f4389b8ae945592ff66d7cbcf41b48f9132fa341803a090-thumbnail.webp",
    1200
  ),
  genjutsu: higgsExploreImage(
    "e88805fcb31442389587a2953675fd723ee8d4cb5a317e6280b5d1cca979e152-thumbnail.webp",
    1200
  ),
  marketingStudio: higgsExploreImage(
    "7ff805cfc3c70a2ca923b1a9002b04e91f6d627dd4d302afe09797ae2e3ca44a-image.webp",
    1200
  ),
  nanoBanana: higgsExploreImage(
    "52a6ceab9e44aa8dea42343c337a6b236690253920b4a2181b6c45cbb023ce49-image.webp",
    800
  ),
  landscapePromo: higgsExploreImage(
    "53532530183a9f3450c6af708c5f15a16e5267bcfabb5d439f517a038c9b3ab4-image.webp",
    1400
  ),
};
