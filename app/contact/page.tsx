import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact AKHTAR DEV for premium web development projects."
};

export default function ContactPage() {
  return (
    <main className="pt-32">
      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Tell me what needs to feel premium."
              description="Share the platform, goals, timeline, and business context. The best projects start with a clear outcome and a sharp sense of taste."
            />
            <div className="mt-10 grid gap-3">
              {[
                { icon: Mail, label: "Email", value: "hello@akhtardev.com" },
                { icon: MessageCircle, label: "Availability", value: "Selective new builds" },
                { icon: MapPin, label: "Base", value: "Dhaka, serving global clients" }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 rounded-[8px] border border-white/10 bg-white/[0.03] p-4">
                  <item.icon className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted">{item.label}</p>
                    <p className="font-semibold text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-64 rounded-[8px] border border-white/10 bg-[linear-gradient(135deg,rgba(149,191,71,0.16),rgba(255,255,255,0.03)),url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" aria-label="Map style location preview" />
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
