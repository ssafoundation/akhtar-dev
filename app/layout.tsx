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
 * Global / Homepage SEO
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Shopify Developer & Full Stack Web Developer | AKHTAR DEV",
    template: "%s | AKHTAR DEV",
  },

  description:
    "AKHTAR DEV provides professional Shopify development, custom Shopify themes and apps, WordPress, React, Next.js, and modern web development for businesses and digital brands.",

  keywords: [
    "Shopify Developer",
    "Shopify Theme Developer",
    "Shopify App Developer",
    "Shopify Development",
    "Shopify Page Builder",
    "WordPress Developer",
    "React Developer",
    "Next.js Developer",
    "Full Stack Web Developer",
    "Web Developer",
    "Custom Website Development",
  ],

  authors: [
    {
      name: "MD. Akhtaruzzaman",
      url: siteUrl,
    },
  ],

  creator: "MD. Akhtaruzzaman",
  publisher: "AKHTAR DEV",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Shopify Developer & Full Stack Web Developer | AKHTAR DEV",

    description:
      "Professional Shopify, WordPress, React, Next.js, and full stack web development for businesses and digital brands.",

    url: siteUrl,

    siteName: "AKHTAR DEV",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AKHTAR DEV — Shopify & Full Stack Web Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Shopify Developer & Full Stack Web Developer | AKHTAR DEV",

    description:
      "Professional Shopify, WordPress, React, Next.js, and modern web development services.",

    images: ["/og-image.jpg"],
  },

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /**
   * Person Schema
   */
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",

    name: "MD. Akhtaruzzaman",

    alternateName: "AKHTAR DEV",

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
    ],
  };

  /**
   * Website Schema
   */
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",

    name: "AKHTAR DEV",

    alternateName: "Akhtar Dev",

    url: siteUrl,
  };

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
        {/* Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        <MotionProvider>
          <Navbar />

          {children}

          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
