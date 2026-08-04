import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { GsapEffects } from "@/components/animations/gsap-effects";
import { MotionProvider } from "@/components/animations/motion-provider";
import { MouseLight } from "@/components/animations/mouse-light";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AKHTAR DEV | Premium Full Stack Web Developer",
    template: "%s | AKHTAR DEV"
  },
  description:
    "Premium portfolio of MD. Akhtaruzzaman, a Full Stack, Shopify, WordPress, Wix, React, and Next.js developer.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "AKHTAR DEV | Premium Full Stack Web Developer",
    description:
      "High-end Shopify, WordPress, Wix, React, and Next.js development for brands that care about quality.",
    url: siteUrl,
    siteName: "AKHTAR DEV",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AKHTAR DEV",
    description: "Premium full stack web development portfolio."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "MD. Akhtaruzzaman",
    alternateName: "AKHTAR DEV",
    jobTitle: "Full Stack Web Developer",
    url: siteUrl,
    knowsAbout: ["Shopify", "WordPress", "Wix", "React", "Next.js", "TypeScript"]
  };

  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <MotionProvider>
          <MouseLight />
          <GsapEffects />
          <Navbar />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
