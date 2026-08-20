import type { Metadata } from "next";

import { PageVisual } from "@/components/sections/page-visual";
import { siteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy",

  description:
    "Read the Privacy Policy for AKHTAR LABS, including how submitted information, contact details, and basic analytics data are handled.",

  alternates: {
    canonical: `${siteUrl}/privacy`,
  },

  openGraph: {
    title: "Privacy Policy | AKHTAR LABS",

    description:
      "Learn how AKHTAR LABS handles information submitted through contact forms and direct communication.",

    url: `${siteUrl}/privacy`,

    siteName: "AKHTAR LABS",

    type: "website",
  },

  twitter: {
    card: "summary",

    title: "Privacy Policy | AKHTAR LABS",

    description:
      "Learn how AKHTAR LABS handles submitted information and basic analytics data.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="pt-32">
      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.95fr_0.75fr] lg:items-center">
          {/* PRIVACY CONTENT */}
          <article className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              Privacy
            </p>

            <h1 className="headline text-5xl font-semibold">Privacy Policy</h1>

            <div className="mt-8 space-y-6 text-base leading-8 text-muted">
              <p>
                AKHTAR LABS collects only the information you choose to share
                through contact forms or direct communication, such as your
                name, email address, project details, and budget range.
              </p>

              <p>
                This information is used to respond to inquiries, prepare
                project recommendations, and manage client communication. It is
                not sold, rented, or shared with unrelated third parties.
              </p>

              <p>
                Basic analytics may be used to understand site performance,
                traffic sources, and content effectiveness. Analytics are
                configured to support product decisions, not invasive tracking.
              </p>

              <p>
                You can request correction or deletion of your submitted
                information by emailing{" "}
                <a
                  href="mailto:hello@akhtardev.com"
                  className="text-accent underline underline-offset-4 transition hover:text-white"
                >
                  hello@akhtardev.com
                </a>
                .
              </p>
            </div>
          </article>

          {/* VISUAL */}
          <PageVisual variant="privacy" />
        </div>
      </section>
    </main>
  );
}
