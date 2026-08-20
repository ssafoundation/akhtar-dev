import { MotionProvider } from "@/components/animations/motion-provider";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ThemeScript } from "@/components/theme/theme-script";
import { siteUrl } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

/**
 * =========================================================
 * GLOBAL SEO / HOMEPAGE SEO
 * =========================================================
 */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Shopify Developer & Full Stack Web Developer | AKHTAR LABS",
    template: "%s | AKHTAR LABS",
  },

  description:
    "AKHTAR LABS provides professional Shopify development, custom Shopify themes, WordPress, React, Next.js, and modern web development for businesses and digital brands.",

  authors: [
    {
      name: "MD. Akhtaruzzaman",
      url: siteUrl,
    },
  ],

  creator: "MD. Akhtaruzzaman",

  publisher: "AKHTAR LABS",

  /**
   * Canonical
   */
  alternates: {
    canonical: "/",
  },

  /**
   * Open Graph
   */
  openGraph: {
    title: "Shopify Developer & Full Stack Web Developer | AKHTAR LABS",

    description:
      "Professional Shopify, WordPress, React, Next.js, and full stack web development for businesses and digital brands.",

    url: siteUrl,

    siteName: "AKHTAR LABS",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AKHTAR LABS — Shopify & Full Stack Web Developer",
      },
    ],
  },

  /**
   * Twitter / X
   */
  twitter: {
    card: "summary_large_image",

    title: "Shopify Developer & Full Stack Web Developer | AKHTAR LABS",

    description:
      "Professional Shopify, WordPress, React, Next.js, and modern web development services.",

    images: ["/og-image.jpg"],
  },

  /**
   * Robots
   */
  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      "max-image-preview": "large",

      "max-snippet": -1,

      "max-video-preview": -1,
    },
  },

  /**
   * Icons
   */
  icons: {
    icon: "/favicon.png",
  },
};

/**
 * =========================================================
 * PERSON SCHEMA
 * =========================================================
 */

const personSchema = {
  "@context": "https://schema.org",

  "@type": "Person",

  name: "MD. Akhtaruzzaman",

  alternateName: "AKHTAR LABS",

  jobTitle: "Shopify & Full Stack Web Developer",

  url: siteUrl,

  knowsAbout: [
    "Shopify",
    "Shopify Theme Development",
    "Shopify App Development",
    "Shopify Page Builder Development",
    "WordPress",
    "WordPress Theme Development",
    "WordPress Plugin Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Full Stack Web Development",
    "Web Development",
    "eCommerce Development",
  ],

  /**
   * Add only your real public profiles here.
   *
   * Example:
   *
   * "https://www.linkedin.com/in/your-profile",
   * "https://github.com/your-profile",
   */

  sameAs: [
    // "https://www.linkedin.com/in/your-profile",
    // "https://github.com/your-profile",
  ],
};

/**
 * =========================================================
 * WEBSITE SCHEMA
 * =========================================================
 */

const websiteSchema = {
  "@context": "https://schema.org",

  "@type": "WebSite",

  name: "AKHTAR LABS",

  alternateName: "AKHTAR LABS",

  url: siteUrl,
};

/**
 * =========================================================
 * ROOT LAYOUT
 * =========================================================
 */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${space.variable}`}
    >
      <head>
        <ThemeScript />
      </head>

      <body className="font-sans antialiased">
        {/* =================================================
            PERSON STRUCTURED DATA
        ================================================= */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />

        {/* =================================================
            WEBSITE STRUCTURED DATA
        ================================================= */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        {/* =================================================
            SITE CONTENT
        ================================================= */}

        <MotionProvider>
          <Navbar />

          {children}

          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
