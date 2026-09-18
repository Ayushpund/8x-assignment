import Link from "next/link";
import { SUITE_FOOTER_COLUMNS } from "@/lib/suite-footer-links";

function FooterBlockColumn({ blocks }: { blocks: (typeof SUITE_FOOTER_COLUMNS)[0]["blocks"] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block) => (
        <div key={block.heading}>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-black/45">
            {block.heading}
          </p>
          <ul className="space-y-1.5">
            {block.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[13px] font-medium text-black/85 transition hover:text-black"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function SuiteFooter() {
  return (
    <footer className="w-full bg-brand text-black">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_repeat(5,minmax(0,1fr))] lg:gap-6 lg:px-8 lg:py-14">
        <div className="lg:pr-4">
          <p className="text-[2rem] font-black uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-[2.65rem]">
            AI-Native
            <br />
            Creative Suite
          </p>
        </div>
        {SUITE_FOOTER_COLUMNS.map((col, i) => (
          <FooterBlockColumn key={i} blocks={col.blocks} />
        ))}
      </div>
    </footer>
  );
}
