import { Mail, MapPin, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { apiFetch } from "@/lib/api";
import { siteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact | Shopify & Web Development | AKHTAR LABS",

  description:
    "Contact AKHTAR LABS for professional Shopify, WordPress, React, Next.js, and custom web development projects.",

  alternates: {
    canonical: `${siteUrl}/contact`,
  },

  openGraph: {
    title: "Contact | Shopify & Web Development | AKHTAR LABS",

    description:
      "Get in touch with AKHTAR LABS for Shopify, WordPress, React, Next.js, and custom web development projects.",

    url: `${siteUrl}/contact`,

    siteName: "AKHTAR LABS",

    type: "website",
  },

  twitter: {
    card: "summary",

    title: "Contact | AKHTAR LABS",

    description:
      "Contact AKHTAR LABS for professional Shopify and web development projects.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

type ContactInfo = {
  label: string;
  value: string;
  icon: "Mail" | "MessageCircle" | "MapPin";
};

type ContactMap = {
  type?: string;
  embedUrl?: string;
  title?: string;
};

type ContactPageData = {
  eyebrow: string;
  heading: string;
  description: string;

  contactInfo: ContactInfo[];

  map?: ContactMap | null;

  mapImage?: {
    url: string;
    alt?: string;
  } | null;
};

const iconMap = {
  Mail,
  MessageCircle,
  MapPin,
};

const fallbackData: ContactPageData = {
  eyebrow: "Contact",

  heading: "Tell me what needs to feel premium.",

  description:
    "Share the platform, goals, timeline, and business context. The best projects start with a clear outcome and a sharp sense of taste.",

  contactInfo: [
    {
      icon: "Mail",
      label: "Email",
      value: "hello@akhtardev.com",
    },
    {
      icon: "MessageCircle",
      label: "Availability",
      value: "Selective new builds",
    },
    {
      icon: "MapPin",
      label: "Base",
      value: "Dhaka, serving global clients",
    },
  ],

  map: {
    type: "google",
    embedUrl: "",
    title: "AKHTAR LABS location",
  },

  mapImage: null,
};

export default async function ContactPage() {
  let contact = fallbackData;

  try {
    const data = await apiFetch<ContactPageData>("/contact");

    if (data) {
      contact = {
        eyebrow: data.eyebrow || fallbackData.eyebrow,

        heading: data.heading || fallbackData.heading,

        description: data.description || fallbackData.description,

        contactInfo:
          Array.isArray(data.contactInfo) && data.contactInfo.length > 0
            ? data.contactInfo
            : fallbackData.contactInfo,

        map: data.map || fallbackData.map,

        mapImage: data.mapImage || fallbackData.mapImage,
      };
    }
  } catch (error) {
    console.error("Failed to load contact page:", error);
  }

  const mapEmbedUrl = contact.map?.embedUrl?.trim();

  return (
    <main className="pt-32">
      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* LEFT */}
          <div>
            <SectionHeading
              eyebrow={contact.eyebrow}
              title={contact.heading}
              description={contact.description}
            />

            {/* Contact Information */}
            {contact.contactInfo.length > 0 && (
              <div className="mt-10 grid gap-3">
                {contact.contactInfo.map((item, index) => {
                  const Icon = iconMap[item.icon] || MessageCircle;

                  return (
                    <div
                      key={`${item.label}-${index}`}
                      className="flex items-center gap-4 rounded-[8px] border border-white/10 bg-white/[0.03] p-4"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-accent" />

                      <div>
                        <p className="text-sm text-muted">{item.label}</p>

                        <p className="font-semibold text-white">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Google Map */}
            {mapEmbedUrl ? (
              <div className="mt-6 h-64 overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.03]">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title={
                    contact.map?.title || "AKHTAR LABS location on Google Maps"
                  }
                />
              </div>
            ) : contact.mapImage?.url ? (
              <div
                className="mt-6 h-64 rounded-[8px] border border-white/10 bg-cover bg-center"
                style={{
                  backgroundImage: `url("${contact.mapImage.url}")`,
                }}
                role="img"
                aria-label={
                  contact.mapImage.alt || "Map style location preview"
                }
              />
            ) : null}
          </div>

          {/* RIGHT */}
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
