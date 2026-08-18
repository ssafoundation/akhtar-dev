import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

type ContactCTA = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  primaryButton: {
    text: string;
    url: string;
  };
  secondaryButton: {
    text: string;
    url: string;
  };
};

export async function ContactCTA() {
  const settings = await apiFetch<ContactCTA>("/contact-cta");

  return (
    <section className="section-pad overflow-hidden">
      <div className="container-shell">
        <div
          className="
            premium-border
            overflow-hidden
            rounded-[8px]
            bg-elevated
            p-8
            text-foreground
            shadow-premium
            sm:p-12
            lg:p-16
          "
        >
          <div className="max-w-4xl">
            {/* Eyebrow */}
            {settings.eyebrow && (
              <p
                className="
                  mb-4
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-accent
                "
              >
                {settings.eyebrow}
              </p>
            )}

            {/* Heading */}
            {settings.heading && (
              <h2
                className="
                  headline
                  text-4xl
                  font-semibold
                  leading-[1.05]
                  tracking-tight
                  text-foreground
                  sm:text-6xl
                "
              >
                {settings.heading}
              </h2>
            )}

            {/* Subtitle */}
            {settings.subtitle && (
              <p
                className="
                  mt-6
                  max-w-2xl
                  text-lg
                  leading-8
                  text-muted-foreground
                "
              >
                {settings.subtitle}
              </p>
            )}

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {settings.primaryButton?.text && (
                <Button href={settings.primaryButton.url || "/contact"}>
                  {settings.primaryButton.text}
                </Button>
              )}

              {settings.secondaryButton?.text && (
                <Button
                  href={settings.secondaryButton.url || "/portfolio"}
                  variant="ghost"
                >
                  {settings.secondaryButton.text}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
