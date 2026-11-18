import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import { Theme } from "@astryxdesign/core/theme";
import { themes, defaultThemeSlug } from "../astryx-themes";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your notion, built | Notiune",
  description:
    "A studio of three that designs, writes and builds websites, brands and software for small businesses. You own all of it. We reply within hours.",
  openGraph: {
    type: "website",
    siteName: "Notiune",
    title: "Your notion, built | Notiune",
    description:
      "Websites, brands and software for small businesses, designed, written and built from scratch by a studio of three.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${schibsted.variable} h-full`}>
      <body className="min-h-full bg-[#F1F0EC] font-sans text-[#121212] antialiased">
        <Theme theme={themes[defaultThemeSlug]}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[#121212] focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-[#F1F0EC]"
          >
            Skip to content
          </a>
          {children}
        </Theme>
      </body>
    </html>
  );
}
