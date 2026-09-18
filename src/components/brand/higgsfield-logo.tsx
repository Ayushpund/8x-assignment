import { cn } from "@/lib/utils";

/** Higgsfield mark — fixed pixel size so layout stays sane if CSS fails to load */
export function HiggsfieldLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={32}
      height={32}
      className={cn("block shrink-0", className)}
      style={{ width: 32, height: 32, maxWidth: 32, maxHeight: 32 }}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 4c-4.5 0-8 3.2-8 8.5 0 2.8 1.4 5.2 3.5 6.7-2.8 1.2-4.8 3.9-4.8 7.1 0 4.3 3.5 7.7 8 7.7s8-3.4 8-7.7c0-3.2-2-5.9-4.8-7.1 2.1-1.5 3.5-3.9 3.5-6.7C24 7.2 20.5 4 16 4Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M12 14.5c1.8-1.2 4.2-1.2 6 0M12 19.5c1.8 1.2 4.2 1.2 6 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
