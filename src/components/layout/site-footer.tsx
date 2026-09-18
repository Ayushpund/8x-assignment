import Link from "next/link";
import { SuiteFooter } from "@/components/layout/suite-footer";

const legalLinks = [
  { href: "/help", label: "Help center" },
  { href: "/cookies", label: "Cookie Notice" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

export function SiteFooter() {
  return (
    <footer className="mt-0">
      <SuiteFooter />
      <div className="border-t border-border-subtle bg-[#0a0a0a]">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Higgsfield-style creative suite
          </p>
          <ul className="flex flex-wrap gap-5">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
