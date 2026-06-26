import { wpData } from "../wp";

export type ServiceSection = {
  heading: string;
  body?: string;
  items?: string[];
};

export type ServiceData = {
  slug: string;
  title: string;
  subtitle: string;
  category: "sleep" | "ent";
  intro: string;
  phone?: string;
  sections: ServiceSection[];
  quickFacts: string[];
  whenToSeek: string[];
  breadcrumbHomeLabel?: string;
  breadcrumbServicesLabel?: string;
  categoryLabel?: string;
  primaryButton?: {
    label?: string;
    url?: string;
    target?: string;
  };
  whenToSeekHeading?: string;
  quickNote?: string;
  progressSteps?: string[];
  sidebarHeading?: string;
  sidebarText?: string;
  sidebarItems?: string[];
  contactHeading?: string;
  contactButton?: {
    label?: string;
    url?: string;
    target?: string;
  };
  seekEyebrow?: string;
  seekHeading?: string;
  ctaEyebrow?: string;
  ctaHeading?: string;
  ctaText?: string;
  ctaPrimaryButton?: {
    label?: string;
    url?: string;
    target?: string;
  };
  ctaSecondaryLabel?: string;
  relatedEyebrow?: string;
  relatedHeading?: string;
  relatedViewAllLabel?: string;
  relatedItemLabel?: string;
  relatedSleepLabel?: string;
  relatedEntLabel?: string;
  permalink?: string;
};

export const servicesContent = (): ServiceData[] => wpData().services ?? [];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesContent().find((service) => service.slug === slug);
}
