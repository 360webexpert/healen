export type HealenData = {
  basePath?: string;
  homeUrl?: string;
  assetUrl?: string;
  bookingUrl?: string;
  phone?: string;
  email?: string;
  menu?: Array<{
    label: string;
    url: string;
    target?: string;
  }>;
  footer?: {
    logo?: string;
    text?: string;
    address?: string;
    quickHeading?: string;
    resourceHeading?: string;
    contactHeading?: string;
    copyright?: string;
    quickLinks?: Array<{
      label: string;
      url: string;
      target?: string;
    }>;
    resources?: Array<{
      label: string;
      url: string;
      target?: string;
    }>;
    socialLinks?: Array<{
      label?: string;
      url: string;
      icon?: "globe" | "share" | "at" | "rss" | "mail" | string;
    }>;
  };
  pageTitles?: Record<string, string>;
  siteName?: string;
  siteTagline?: string;
  portalLink?: ButtonLink;
  services?: Array<{
    slug: string;
    title: string;
    subtitle: string;
    category: "sleep" | "ent";
    intro: string;
    phone?: string;
    sections: Array<{
      heading: string;
      body?: string;
      items?: string[];
    }>;
    quickFacts: string[];
    whenToSeek: string[];
    breadcrumbHomeLabel?: string;
    breadcrumbServicesLabel?: string;
    categoryLabel?: string;
    primaryButton?: ButtonLink;
    whenToSeekHeading?: string;
    quickNote?: string;
    progressSteps?: string[];
    sidebarHeading?: string;
    sidebarText?: string;
    sidebarItems?: string[];
    contactHeading?: string;
    contactButton?: ButtonLink;
    seekEyebrow?: string;
    seekHeading?: string;
    ctaEyebrow?: string;
    ctaHeading?: string;
    ctaText?: string;
    ctaPrimaryButton?: ButtonLink;
    ctaSecondaryLabel?: string;
    relatedEyebrow?: string;
    relatedHeading?: string;
    relatedViewAllLabel?: string;
    relatedItemLabel?: string;
    relatedSleepLabel?: string;
    relatedEntLabel?: string;
    permalink?: string;
  }>;
  forms?: {
    contact?: string;
    newPatient?: string;
  };
  content?: {
    home?: {
      heroTitle?: string;
      heroIntro?: string;
      heroBody?: string;
      heroImage?: string;
      heroImageAlt?: string;
      heroButton?: ButtonLink;
      credentials?: Array<{ title?: string; text?: string }>;
      specialties?: Array<{ label?: string; link?: ButtonLink }>;
      practiceHeading?: string;
      practiceIntro?: string;
      practiceButton?: ButtonLink;
      aboutEyebrow?: string;
      aboutHeading?: string;
      aboutImage?: string;
      aboutImageAlt?: string;
      aboutDoctorName?: string;
      aboutDoctorTitle?: string;
      aboutBody?: string[];
      aboutButton?: ButtonLink;
      aboutOutsideHeading?: string;
      aboutOutsideText?: string;
      aboutCredentials?: Array<{ title?: string; items?: string[] }>;
      servicesEyebrow?: string;
      servicesHeading?: string;
      servicesIntro?: string;
      servicesButton?: ButtonLink;
      services?: Array<{ title?: string; text?: string }>;
      callout?: string;
      calloutSubtext?: string;
      whyEyebrow?: string;
      whyHeading?: string;
      whyItems?: Array<{ title?: string; text?: string }>;
      whyPrimaryButton?: ButtonLink;
      whySecondaryButton?: ButtonLink;
      testimonialsEyebrow?: string;
      testimonialsHeading?: string;
      testimonials?: Array<{ quote?: string; name?: string; procedure?: string; initials?: string; color?: string }>;
      insuranceEyebrow?: string;
      insuranceHeading?: string;
      insuranceText?: string;
      insuranceContactLink?: ButtonLink;
      bannerHeading?: string;
      bannerButton?: ButtonLink;
      bannerNote?: string;
      locationEyebrow?: string;
      locationHeading?: string;
      locationRegion?: string;
      locationCity?: string;
      locationState?: string;
      locationAddress?: string;
      locationHours?: string;
      locationMapEmbed?: string;
      locationTags?: Array<{ label?: string }>;
      locationPhoneLabel?: string;
      locationDirectionsLabel?: string;
      locationCallLabel?: string;
      locationBookLabel?: string;
      locationDirectionsLink?: ButtonLink;
      locationPhoneLink?: ButtonLink;
      locationBookLink?: ButtonLink;
      bookingEyebrow?: string;
      bookingHeading?: string;
      bookingText?: string;
      bookingPhoneLabel?: string;
      bookingEmailLabel?: string;
      bookingAddressLabel?: string;
      bookingNoticeHeading?: string;
      bookingNoticeText?: string;
      bookingFormHeading?: string;
      bookingFormShortcodeHtml?: string;
      ctaHeading?: string;
      ctaHighlight?: string;
      ctaText?: string;
      ctaPrimaryButton?: ButtonLink;
      ctaSecondaryButton?: ButtonLink;
      ctaImage?: string;
      ctaImageAlt?: string;
    };
    about?: {
      heroTitle?: string;
      heroSubtitle?: string;
      heroBreadcrumb?: string;
      bioEyebrow?: string;
      heading?: string;
      doctorImage?: string;
      doctorImageAlt?: string;
      doctorName?: string;
      doctorTitle?: string;
      doctorBadge?: string;
      experienceNumber?: string;
      experienceLabel?: string;
      body?: string[];
      bioPrimaryButton?: ButtonLink;
      bioSecondaryButton?: ButtonLink;
      credentials?: Array<{ title?: string; items?: string[] }>;
      outsideHeading?: string;
      outsideText?: string;
      approachEyebrow?: string;
      approachHeading?: string;
      approach?: Array<{ icon?: string; title?: string; text?: string }>;
      ctaHeading?: string;
      ctaText?: string;
      ctaPrimaryButton?: ButtonLink;
      ctaSecondaryButton?: ButtonLink;
    };
    services?: {
      heroTitle?: string;
      heroSubtitle?: string;
      heroBreadcrumb?: string;
      sleepEyebrow?: string;
      sleepHeading?: string;
      sleepIntro?: string;
      sleep?: Array<{ icon?: string; title?: string; text?: string; link?: ButtonLink }>;
      bannerEyebrow?: string;
      bannerText?: string;
      bannerButton?: ButtonLink;
      entEyebrow?: string;
      entHeading?: string;
      entIntro?: string;
      ent?: Array<{ icon?: string; title?: string; text?: string; link?: ButtonLink }>;
      ctaHeading?: string;
      ctaText?: string;
      ctaPrimaryButton?: ButtonLink;
      ctaSecondaryButton?: ButtonLink;
    };
    newPatient?: {
      heroTitle?: string;
      heroSubtitle?: string;
      heroBreadcrumb?: string;
      welcomeEyebrow?: string;
      heading?: string;
      intro?: string;
      cards?: Array<{ icon?: string; color?: string; title?: string; items?: string[] }>;
      hours?: Array<{ day?: string; time?: string }>;
      hoursEyebrow?: string;
      hoursNote?: string;
      insuranceEyebrow?: string;
      insuranceHeading?: string;
      insurance?: string;
      coverageHeading?: string;
      coverageText?: string;
      coverageButton?: ButtonLink;
      ctaHeading?: string;
      ctaText?: string;
      ctaPrimaryButton?: ButtonLink;
      ctaSecondaryButton?: ButtonLink;
    };
    contact?: {
      heroTitle?: string;
      heroSubtitle?: string;
      heroBreadcrumb?: string;
      formEyebrow?: string;
      heading?: string;
      intro?: string;
      formShortcodeHtml?: string;
      mapEmbed?: string;
      addressLabel?: string;
      phoneLabel?: string;
      emailLabel?: string;
      hoursLabel?: string;
      hoursLines?: string[];
      directionsLink?: ButtonLink;
      phoneLink?: ButtonLink;
      emailLink?: ButtonLink;
      ctaEyebrow?: string;
      ctaHeading?: string;
      ctaButton?: ButtonLink;
    };
  };
};

export type ButtonLink = {
  label?: string;
  url?: string;
  target?: string;
};

export type NavItem = {
  label: string;
  href: string;
  target?: string;
  external: boolean;
};

declare global {
  interface Window {
    HealenData?: HealenData;
  }
}

export const wpData = (): HealenData => window.HealenData ?? {};

export const asset = (path: string) => {
  const base = wpData().assetUrl ?? `${import.meta.env.BASE_URL}`;
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

export const sitePath = (path: string) => {
  const base = wpData().basePath ?? "";
  const cleanBase = base.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanBase}${cleanPath}` || "/";
};

export const normalizeInternalPath = (url: string) => {
  const data = wpData();
  const basePath = data.basePath ?? "/";

  try {
    const parsed = new URL(url, window.location.origin);
    if (parsed.origin !== window.location.origin) {
      return url;
    }

    let pathname = parsed.pathname;
    const cleanBase = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;

    if (parsed.hash) {
      const baseRelativePath = cleanBase && pathname.startsWith(cleanBase)
        ? pathname.slice(cleanBase.length) || "/"
        : pathname;

      if (baseRelativePath === "/" || baseRelativePath === "") {
        return `${cleanBase || ""}/${parsed.search}${parsed.hash}`;
      }

      return `${cleanBase}${baseRelativePath}${parsed.search}${parsed.hash}`;
    }

    if (cleanBase && pathname.startsWith(cleanBase)) {
      pathname = pathname.slice(cleanBase.length) || "/";
    }

    return `${pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return url;
  }
};

export const isExternalUrl = (url: string) => {
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.origin !== window.location.origin;
  } catch {
    return false;
  }
};

export const navItems = (): NavItem[] => {
  const menu = wpData().menu;
  if (menu?.length) {
    return menu.map((item) => ({
      label: item.label,
      href: normalizeInternalPath(item.url),
      target: item.target,
      external: isExternalUrl(item.url),
    }));
  }

  return [
    { label: "Home", href: "/", external: false },
    { label: "Services", href: "/services", external: false },
    { label: "Dr. Scheid", href: "/about", external: false },
    { label: "Treatments", href: "/#services", external: false },
    { label: "New Patient", href: "/new-patient", external: false },
    { label: "Contact", href: "/contact", external: false },
  ];
};

export const pageTitle = (slug: string, fallback: string) => wpData().pageTitles?.[slug] ?? fallback;
