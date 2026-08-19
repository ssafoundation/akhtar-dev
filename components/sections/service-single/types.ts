export type HeroMetric = {
  label?: string;
  value?: string;
};

export type HeroSection = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primary_text?: string;
  primary_url?: string;
  secondary_text?: string;
  secondary_url?: string;
  visual_enabled?: number | boolean | string | null;
  visual_label?: string;
  visual_code?: string[];
  metrics?: HeroMetric[];
};

export type ValueStripItem = {
  icon?: string;
  label?: string;
};

export type ContentItem = {
  icon?: string;
  title?: string;
  label?: string;
  description?: string;
  desc?: string;
  text?: string;
  name?: string;
  url?: string;
};

export type ProcessStep = {
  number?: string;
  icon?: string;
  title?: string;
  description?: string;
};

export type TechnologyItem = {
  name?: string;
  label?: string;
  icon?: string;
  url?: string;
};

export type FAQItem = {
  question?: string;
  answer?: string;
};

export type EnabledSection = {
  enabled?: number | boolean | string | null;
};

export type ServiceSections = {
  hero?: HeroSection;

  value_strip?: EnabledSection & {
    items?: ValueStripItem[];
  };

  capabilities?: EnabledSection & {
    eyebrow?: string;
    title?: string;
    description?: string;
    items?: ContentItem[];
  };

  development?: EnabledSection & {
    eyebrow?: string;
    title?: string;
    description?: string;
    items?: ContentItem[];
  };

  why_us?: EnabledSection & {
    eyebrow?: string;
    title?: string;
    description?: string;
    items?: ContentItem[];
  };

  technology_stack?: EnabledSection & {
    eyebrow?: string;
    title?: string;
    items?: TechnologyItem[];
  };

  process?: EnabledSection & {
    eyebrow?: string;
    title?: string;
    description?: string;
    steps?: ProcessStep[];
  };

  project_types?: EnabledSection & {
    eyebrow?: string;
    title?: string;
    items?: ContentItem[];
  };

  faq?: EnabledSection & {
    eyebrow?: string;
    title?: string;
    items?: FAQItem[];
  };

  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
  };
};

export type ServiceResponse = {
  id: number;
  slug: string;
  title: string;
  description?: string;
  subtitle?: string;
  icon?: string;
  featured?: boolean;
  image?: {
    url?: string;
    width?: number;
    height?: number;
    alt?: string;
  } | null;
  order?: number;
  sections?: ServiceSections;
};
