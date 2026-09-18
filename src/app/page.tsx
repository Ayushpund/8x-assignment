import { PageShell } from "@/components/layout/page-shell";
import { HeroTopCards } from "@/components/landing/hero-top-cards";
import { SignupDiscountBand } from "@/components/landing/signup-discount-band";
import { HomePromoRow } from "@/components/landing/home-promo-row";
import { McpSection } from "@/components/landing/mcp-section";
import { CreditsToast } from "@/components/landing/credits-toast";
import { CommunitySection } from "@/components/landing/community-section";
import { VfxSection } from "@/components/landing/vfx-section";
import { GenjutsuSection } from "@/components/landing/genjutsu-section";
import { GenjutsuGallerySection } from "@/components/landing/genjutsu-gallery-section";
import { SeedanceSection } from "@/components/landing/seedance-section";
import { SupercomputerHero } from "@/components/landing/supercomputer-hero";
import { GptImageSection } from "@/components/landing/gpt-image-section";
import { ShowcaseGrid } from "@/components/landing/showcase-grid";

/** Media-rich home — section order matches https://higgsfield.ai/ */
export default function HomePage() {
  return (
    <PageShell variant="marketing">
      <div className="mx-auto max-w-[1600px] space-y-4 px-3 py-4 sm:px-4 sm:py-5">
        <HeroTopCards />
        <SignupDiscountBand />
        <HomePromoRow />
      </div>

      <div className="my-1 sm:my-3">
        <McpSection />
      </div>

      <div className="mx-auto max-w-[1600px] space-y-10 px-3 pb-10 sm:px-4 sm:pb-12">
        <VfxSection />
        <GenjutsuSection />
        <GenjutsuGallerySection />
        <SeedanceSection />
        <CommunitySection />
        <SupercomputerHero />
        <GptImageSection />
        <ShowcaseGrid />
      </div>

      <CreditsToast />
    </PageShell>
  );
}
