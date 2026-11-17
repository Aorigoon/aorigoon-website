import type { Metadata } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// Preview URL — the canonical moves to the custom domain when it lands.
const siteUrl = "https://aorigoon-website.aorigoon.workers.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Aorigoon — Apps and small AI models, built from scratch",
  description:
    "Aorigoon is a small studio that designs and builds apps and trains small AI models from scratch for the real world.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Aorigoon",
    title: "Aorigoon — Apps and small AI models, built from scratch",
    description:
      "Aorigoon is a small studio that designs and builds apps and trains small AI models from scratch for the real world.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aorigoon — Apps and small AI models, built from scratch",
    description:
      "Aorigoon is a small studio that designs and builds apps and trains small AI models from scratch for the real world.",
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aorigoon",
  url: siteUrl,
  email: "hello@aorigoon.com",
  description:
    "Aorigoon is a small studio that designs and builds apps and trains small AI models from scratch for the real world.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} h-full`}
    >
      <body className="min-h-full bg-background font-sans text-primary antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
