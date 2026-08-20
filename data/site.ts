import {
  Blocks,
  Code2,
  Gauge,
  Gem,
  Globe2,
  LayoutTemplate,
  MonitorSmartphone,
  PanelsTopLeft,
  ShoppingBag,
  Sparkles,
  WandSparkles,
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export const stats = [
  { value: 82, suffix: "+", label: "Premium builds shipped" },
  { value: 41, suffix: "+", label: "Five-star client reviews" },
  { value: 6, suffix: "+", label: "Years of delivery" },
  { value: 18, suffix: "+", label: "Countries served" },
];

export const services = [
  {
    title: "Shopify Development",
    description:
      "Conversion-focused storefronts, custom sections, Liquid architecture, app integrations, and refined buying experiences.",
    icon: ShoppingBag,
  },
  {
    title: "Landing Page Systems",
    description:
      "Premium launch pages with persuasive hierarchy, animation, forms, analytics, and rapid iteration baked in.",
    icon: Sparkles,
  },
  {
    title: "Theme Development",
    description:
      "Reusable theme foundations with clean schemas, merchant-friendly controls, and crisp responsive behavior.",
    icon: LayoutTemplate,
  },
  {
    title: "Performance Optimization",
    description:
      "Core Web Vitals audits, image strategy, bundle discipline, caching, and interaction polish for fast storefronts.",
    icon: Gauge,
  },
  {
    title: "WordPress & Wix",
    description:
      "Elegant business websites, CMS workflows, SEO foundations, and integrations that stay easy to maintain.",
    icon: Globe2,
  },
  {
    title: "React & Next.js",
    description:
      "Modern product interfaces, dashboards, and marketing systems using TypeScript, App Router, and motion.",
    icon: Code2,
  },
];

export const projects = [
  {
    slug: "velora-commerce",
    name: "Velora Commerce",
    type: "Luxury Shopify Store",
    year: "2026",
    summary:
      "A premium fashion storefront with editorial product storytelling, predictive search, and a refined mobile checkout path.",
    result: "38% higher add-to-cart rate",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=80",
    stack: ["Shopify", "Liquid", "GSAP", "Klaviyo"],
    services: ["Theme architecture", "Performance", "Conversion UX"],
  },
  {
    slug: "nexora-saas",
    name: "Nexora SaaS",
    type: "Next.js Marketing Platform",
    year: "2025",
    summary:
      "A high-trust SaaS website with modular content blocks, pricing experimentation, and a fast editorial workflow.",
    result: "2.4x demo request lift",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
    stack: ["Next.js", "TypeScript", "Framer Motion", "CMS"],
    services: ["Frontend engineering", "Design system", "SEO"],
  },
  {
    slug: "atelier-wp",
    name: "Atelier WP",
    type: "WordPress Experience",
    year: "2024",
    summary:
      "A quiet, luxurious WordPress site for an interior studio with case studies, lead capture, and art-directed pages.",
    result: "91 Lighthouse performance",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=80",
    stack: ["WordPress", "ACF", "Tailwind", "SEO"],
    services: ["Custom theme", "CMS modeling", "Analytics"],
  },
];

export const process = [
  {
    title: "Discover",
    description:
      "Clarify audience, offer, technical constraints, and the commercial outcome the site needs to produce.",
  },
  {
    title: "Design",
    description:
      "Shape a visual system with premium hierarchy, motion cues, reusable sections, and mobile-first flows.",
  },
  {
    title: "Build",
    description:
      "Engineer the experience with clean components, accessibility, performance budgets, and precise responsive behavior.",
  },
  {
    title: "Launch",
    description:
      "Test analytics, SEO, forms, deployment, Core Web Vitals, and post-launch refinements.",
  },
];

export const timeline = [
  {
    year: "2020",
    title: "Started Freelancing",
    description:
      "Built the foundation through business websites, landing pages, and client-facing delivery.",
  },
  {
    year: "2022",
    title: "Shopify Specialist",
    description:
      "Focused deeply on Shopify themes, Liquid, conversion UX, and merchant-friendly customization.",
  },
  {
    year: "2024",
    title: "Full Stack Developer",
    description:
      "Expanded into React, Next.js, TypeScript, API integrations, and higher-end product experiences.",
  },
  {
    year: "2026",
    title: "Premium eCommerce Engineer",
    description:
      "Designing polished digital storefronts and web systems for brands that care about taste and speed.",
  },
];

export const skills = [
  "React",
  "Next.js",
  "Shopify",
  "Liquid",
  "TypeScript",
  "WordPress",
  "GSAP",
  "Wix",
];

export const testimonials = [
  {
    quote:
      "Akhtar brought agency-level taste with the focus of a senior engineer. Our Shopify store finally feels like our brand.",
    name: "Maya Rahman",
    role: "Founder, Velora Studio",
  },
  {
    quote:
      "He caught the tiny details that usually get missed: motion timing, mobile spacing, checkout friction, and SEO basics.",
    name: "Oliver Bennett",
    role: "Growth Lead, Nexora",
  },
  {
    quote:
      "Fast, calm, precise. The site launched cleanly and our internal team can actually manage it without breaking things.",
    name: "Ariane Cole",
    role: "Director, Atelier House",
  },
];

export const faqs = [
  {
    question: "What type of projects are the best fit?",
    answer:
      "Premium Shopify stores, high-converting landing pages, WordPress/Wix business websites, and React or Next.js frontends.",
  },
  {
    question: "Can the content and images be replaced later?",
    answer:
      "Yes. The site is built around centralized content data and reusable components so the brand, copy, and case studies are easy to update.",
  },
  {
    question: "Do you handle performance and SEO?",
    answer:
      "Yes. Metadata, schema, sitemap, robots, semantic structure, responsive images, and performance-minded animation are included.",
  },
];

export const tech = [
  "Next.js",
  "React",
  "Shopify",
  "Liquid",
  "WordPress",
  "TypeScript",
  "GSAP",
  "Wix",
];

export const showcasePreviews = [
  {
    title: "Versos Eternos",
    subtitle: "Emotion-driven Shopify store for personalized music gifts",
    metric: "24–48h delivery",
    image: "/images/project-1.png",
    tags: ["Shopify", "Liquid", "Custom Sections", "Responsive", "Performance"],
  },
  {
    title: "Shopify Landing Page",
    subtitle: "Campaign page with product storytelling",
    metric: "2.1x campaign ROAS",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80",
    tags: ["Shopify", "GSAP", "Klaviyo"],
  },
  {
    title: "WordPress Website",
    subtitle: "Editorial CMS for a premium studio",
    metric: "91 performance score",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
    tags: ["WordPress", "ACF", "SEO"],
  },
  {
    title: "Wix Website",
    subtitle: "Service brand with booking flows",
    metric: "+54% qualified leads",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    tags: ["Wix", "Velo", "Automations"],
  },
  {
    title: "React / Next.js Dashboard",
    subtitle: "Operational product interface",
    metric: "42ms route transitions",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "Corporate Website",
    subtitle: "Trust-first business platform",
    metric: "3.4x inquiry quality",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    tags: ["Next.js", "Tailwind", "SEO"],
  },
];

export const showcaseBadges = [
  "Shopify",
  "React",
  "Next.js",
  "TypeScript",
  "WordPress",
  "Wix",
  "Tailwind CSS",

  "Liquid",
];

export const featureIcons = [
  Gem,
  PanelsTopLeft,
  Blocks,
  MonitorSmartphone,
  WandSparkles,
];
