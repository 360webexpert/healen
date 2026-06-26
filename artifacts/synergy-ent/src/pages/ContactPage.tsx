import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink, ArrowRight } from "lucide-react";
import { SiteLayout, PageHero } from "../components/SiteLayout";
import { GravityFormEmbed } from "../components/GravityFormEmbed";
import { isExternalUrl, type ButtonLink, wpData } from "../wp";

const infoCards = [
  {
    icon: MapPin,
    label: "Post Address",
    lines: ["37 West Century Road, Suite 104", "Paramus, NJ 07652"],
    link: { url: "https://maps.google.com/?q=37+West+Century+Road+Suite+104+Paramus+NJ+07652", label: "Get Directions" },
  },
  {
    icon: Phone,
    label: "Contact Phone",
    lines: [wpData().phone ?? "201-453-4540"],
    link: { url: `tel:${(wpData().phone ?? "+12014534540").replace(/[^0-9+]/g, "")}`, label: "Call Now" },
  },
  {
    icon: Mail,
    label: "E-mail Address",
    lines: [wpData().email ?? "Info@synergyentwellness.com"],
    link: { url: `mailto:${wpData().email ?? "Info@synergyentwellness.com"}`, label: "Send Email" },
  },
  {
    icon: Clock,
    label: "Hours of Operation",
    lines: [
      "Mon: 8:00am - 4:30pm",
      "Tue: 8:00am - 4:30pm",
      "Wed: 8:00am - 4:30pm",
      "Thu: 8:00am - 4:30pm",
      "Fri: 8:00am - 12:00pm",
      "Closed for lunch M-Thu, 12pm-1pm",
    ],
    link: null,
  },
];

function InlineLink({ link, className, children }: { link?: ButtonLink; className: string; children?: React.ReactNode }) {
  if (!link?.url) {
    return null;
  }

  const external = isExternalUrl(link.url);
  const specialProtocol = /^(tel|mailto):/i.test(link.url);
  const target = link.target || (external && !specialProtocol ? "_blank" : undefined);

  return (
    <a href={link.url} target={target} rel={target ? "noopener noreferrer" : undefined} className={className}>
      {children ?? link.label}
    </a>
  );
}

export function ContactPage() {
  const content = wpData().content?.contact;
  const contactCards = [
    {
      ...infoCards[0],
      label: content?.addressLabel ?? infoCards[0].label,
      lines: (wpData().footer?.address ?? "37 West Century Road, Suite 104\nParamus, NJ 07652").split(/\r?\n/).filter(Boolean),
      link: content?.directionsLink ?? { label: "Get Directions", url: infoCards[0].link?.url ?? "#" },
    },
    {
      ...infoCards[1],
      label: content?.phoneLabel ?? infoCards[1].label,
      lines: [wpData().phone ?? "201-453-4540"],
      link: content?.phoneLink ?? { label: "Call Now", url: `tel:${(wpData().phone ?? "+12014534540").replace(/[^0-9+]/g, "")}` },
    },
    {
      ...infoCards[2],
      label: content?.emailLabel ?? infoCards[2].label,
      lines: [wpData().email ?? "Info@synergyentwellness.com"],
      link: content?.emailLink ?? { label: "Send Email", url: `mailto:${wpData().email ?? "Info@synergyentwellness.com"}` },
    },
    {
      ...infoCards[3],
      label: content?.hoursLabel ?? infoCards[3].label,
      lines: content?.hoursLines?.length ? content.hoursLines : infoCards[3].lines,
    },
  ];

  return (
    <SiteLayout>
      <div className="healen-contact-page">
        <PageHero
          title={content?.heroTitle ?? "Contact Us"}
          subtitle={content?.heroSubtitle ?? "Our team is ready to help. Reach out with any questions."}
          breadcrumb={content?.heroBreadcrumb ?? "Contact Us"}
        />

        {/* Main content */}
        <section className="bg-white py-20 md:py-28 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_420px] gap-14 items-start">
            {/* Left - contact form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1D3A5F]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#1D3A5F]/50">{content?.formEyebrow ?? "Send a Message"}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-['Inter'] text-[#1D3A5F] mb-2">{content?.heading ?? "Get In Touch"}</h2>
              <p className="text-[#1D3A5F]/55 font-light mb-8 leading-relaxed">
                {content?.intro ?? "Please use the form below to share your questions or feedback. A member of our team will get back to you promptly."}
              </p>

              <GravityFormEmbed html={content?.formShortcodeHtml || wpData().forms?.contact} />
            </motion.div>

            {/* Right - info cards */}
            <div className="flex flex-col gap-4">
              {contactCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="rounded-[20px] p-6 flex gap-4"
                    style={{ border: "1px solid rgba(29,58,95,0.1)", boxShadow: "0 2px 12px rgba(29,58,95,0.05)" }}
                  >
                    <div
                      className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
                      style={{ background: "#1D3A5F15" }}
                    >
                      <Icon className="w-5 h-5 text-[#1D3A5F]" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <p className="text-[#1D3A5F]/40 text-xs font-semibold uppercase tracking-wider">{card.label}</p>
                      {card.lines.map((line, lineIndex) => (
                        <p key={line} className={`text-[#1D3A5F] text-sm ${lineIndex === 0 ? "font-semibold" : "font-light text-[#1D3A5F]/70"}`}>{line}</p>
                      ))}
                      {card.link?.url && (
                        <InlineLink
                          link={card.link}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#809EB1] hover:text-[#1D3A5F] transition-colors mt-1"
                        >
                          {card.link.label}
                          {isExternalUrl(card.link.url) ? <ExternalLink className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                        </InlineLink>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Google Maps embed */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="rounded-[20px] overflow-hidden"
                style={{ height: 200, border: "1px solid rgba(29,58,95,0.1)" }}
              >
                <iframe
                  title="Synergy ENT & Wellness location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={content?.mapEmbed ?? "https://maps.google.com/maps?q=37+West+Century+Road+Suite+104+Paramus+NJ+07652&output=embed"}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Book CTA band */}
        <section className="bg-[#1D3A5F] py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[#BBDBED] text-xs uppercase tracking-widest font-semibold mb-1">{content?.ctaEyebrow ?? "Ready to see Dr. Scheid?"}</p>
              <h2 className="text-2xl font-['Inter'] text-white">{content?.ctaHeading ?? "Book your appointment online - it only takes a minute."}</h2>
            </div>
            <InlineLink
              link={content?.ctaButton ?? { label: "Book Online", url: wpData().bookingUrl ?? "https://healow.com" }}
              className="shrink-0 inline-flex items-center gap-2 bg-[#E7FFD9] text-[#1D3A5F] px-7 py-3.5 rounded-full font-semibold hover:brightness-110 transition-all"
            >
              {content?.ctaButton?.label ?? "Book Online"} <ArrowRight className="w-4 h-4" />
            </InlineLink>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
