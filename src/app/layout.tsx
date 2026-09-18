import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "8x Studio",
    template: "%s · 8x Studio",
  },
  description:
    "Generate and edit images with Nano Banana (Gemini). A Higgsfield-inspired creative studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body { margin: 0; min-height: 100%; background: #0a0a0a; color: #fafafa; }
              ul { list-style: none; margin: 0; padding: 0; }
              a { color: inherit; }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
