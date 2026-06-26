import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteLayout, PageHero } from "../components/SiteLayout";
import { Link } from "wouter";
import { isExternalUrl, normalizeInternalPath, type ButtonLink, wpData } from "../wp";

const sleepServices = [
  { icon: "🌙", title: "Sleep Apnea", body: "Evaluation and treatment for obstructive sleep apnea. From diagnosis to therapy selection, we guide you through every step." },
  { icon: "💨", title: "Snoring", body: "Comprehensive snoring evaluation to rule out airway problems, anatomic contributors, and sleep-disordered breathing." },
  { icon: "⚙️", title: "CPAP Troubleshooting", body: "Still tired on CPAP? We help optimize therapy — mask fit, pressure settings, and alternatives like oral appliance therapy." },
  { icon: "🕐", title: "Circadian Rhythm Disorders", body: "Diagnosis and management of internal clock disruptions including delayed sleep phase and shift work disorder." },
  { icon: "😴", title: "Insomnia", body: "Evidence-based insomnia evaluation, including assessment for underlying airway, medical, or behavioral contributors." },
  { icon: "🧠", title: "Hypersomnia & Fatigue", body: "Workup for excessive daytime sleepiness, narcolepsy, idiopathic hypersomnia, and other causes of persistent fatigue." },
];

const entServices = [
  { icon: "👃", title: "Nasal Obstruction", body: "Evaluation of blocked breathing due to deviated septum, enlarged turbinates, nasal valve collapse, or chronic inflammation." },
  { icon: "💧", title: "Chronic Sinusitis", body: "Thorough workup for recurrent sinus infections, polyps, and pressure — including in-office endoscopy and imaging review." },
  { icon: "🌿", title: "Allergies", body: "Testing and treatment for environmental and seasonal allergies contributing to congestion, post-nasal drip, and throat symptoms." },
  { icon: "🦻", title: "Ear Conditions", body: "Evaluation of ear infections, hearing loss, tinnitus, dizziness, and Eustachian tube dysfunction in adults and children." },
  { icon: "🗣️", title: "Throat & Voice", body: "Assessment of hoarseness, chronic throat clearing, globus sensation, reflux-related throat symptoms, and voice changes." },
  { icon: "👶", title: "Pediatric ENT", body: "Expert pediatric otolaryngology care for children with ear infections, tonsil/adenoid issues, and airway concerns." },
];

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: easeOut },
  }),
};

const serviceBody = (service: { text?: string; body?: string }) => service.text ?? service.body ?? "";

function ActionLink({ link, className, children }: { link?: ButtonLink; className: string; children?: React.ReactNode }) {
  const url = link?.url ?? "/contact/";
  const label = children ?? link?.label ?? "Learn More";
  const external = isExternalUrl(url);
  const specialProtocol = /^(tel|mailto):/i.test(url);
  const target = link?.target || (external && !specialProtocol ? "_blank" : undefined);

  if (external) {
    return (
      <a href={url} target={target} rel={target ? "noopener noreferrer" : undefined} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={normalizeInternalPath(url)} target={target} className={className}>
      {label}
    </Link>
  );
}

function ServiceCard({ icon, title, body, index, link, dark = false }: { icon: string; title: string; body: string; index: number; link?: ButtonLink; dark?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-[20px] p-7 flex flex-col gap-4 transition-all duration-300"
      style={{
        background: dark
          ? hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"
          : hovered ? "#1D3A5F" : "white",
        border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(29,58,95,0.10)",
        boxShadow: hovered ? "0 20px 48px rgba(29,58,95,0.22)" : "0 2px 12px rgba(29,58,95,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <span className="text-3xl">{icon}</span>
      <h3 className="font-semibold text-lg leading-snug transition-colors duration-300"
        style={{ color: dark ? "white" : hovered ? "white" : "#1D3A5F" }}>
        {title}
      </h3>
      <p className="text-sm font-light leading-relaxed transition-colors duration-300 flex-1"
        style={{ color: dark ? "rgba(255,255,255,0.6)" : hovered ? "rgba(255,255,255,0.65)" : "rgba(29,58,95,0.6)" }}>
        {body}
      </p>
      <ActionLink
        link={link}
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 mt-auto pt-2"
      >
        <span style={{ color: dark ? "#E7FFD9" : hovered ? "#E7FFD9" : "#809EB1" }}>{link?.label ?? "Learn More"}</span>
        <ArrowRight className="w-3 h-3" style={{ color: dark ? "#E7FFD9" : hovered ? "#E7FFD9" : "#809EB1" }} />
      </ActionLink>
    </motion.div>
  );
}

export function ServicesPage() {
  const content = wpData().content?.services;
  const bookingLink = wpData().bookingLink ?? { url: wpData().bookingUrl ?? "https://healow.com", target: "_blank" };
  const sleepItems = (content?.sleep?.length ? content.sleep : sleepServices).map((service, index) => ({
    icon: service.icon ?? sleepServices[index]?.icon ?? "•",
    title: service.title ?? sleepServices[index]?.title ?? "",
    body: serviceBody(service),
    link: "link" in service ? service.link : undefined,
  }));
  const entItems = (content?.ent?.length ? content.ent : entServices).map((service, index) => ({
    icon: service.icon ?? entServices[index]?.icon ?? "•",
    title: service.title ?? entServices[index]?.title ?? "",
    body: serviceBody(service),
    link: "link" in service ? service.link : undefined,
  }));

  return (
    <SiteLayout>
      <PageHero
        title={content?.heroTitle ?? "Our Services"}
        subtitle={content?.heroSubtitle ?? "Comprehensive ENT and sleep medicine care under one roof."}
        breadcrumb={content?.heroBreadcrumb ?? "Services"}
      />

      {/* Sleep Care */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1D3A5F]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#1D3A5F]/50">{content?.sleepEyebrow ?? "Sleep Medicine"}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-['Inter'] text-[#1D3A5F]">{content?.sleepHeading ?? "Sleep Care Services"}</h2>
            <p className="mt-3 text-[#1D3A5F]/55 max-w-2xl font-light leading-relaxed">
              {content?.sleepIntro ?? "Dr. Scheid is board-certified in sleep medicine with expertise in the full spectrum of sleep disorders - from apnea and snoring to insomnia and circadian disruption."}
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sleepItems.map((s, i) => <ServiceCard key={i} {...s} index={i} />)}
          </div>
        </div>
      </section>

      {/* Divider banner */}
      <div className="bg-[#BBDBED] py-14 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#1D3A5F]/50 text-xs uppercase tracking-widest font-semibold mb-1">{content?.bannerEyebrow ?? "Did You Know?"}</p>
            <p className="text-[#1D3A5F] text-xl font-['Inter'] leading-snug max-w-xl">
              {content?.bannerText ?? "Many sleep problems have a nasal or airway component. Dr. Scheid evaluates both specialties together - so nothing gets missed."}
            </p>
          </div>
          <ActionLink
            link={content?.bannerButton ?? { label: "Book a Consultation", url: bookingLink.url, target: bookingLink.target }}
            className="shrink-0 inline-flex items-center gap-2 bg-[#1D3A5F] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-[#0F2840] transition-colors"
          >
            {content?.bannerButton?.label ?? "Book a Consultation"} <ArrowRight className="w-4 h-4" />
          </ActionLink>
        </div>
      </div>

      {/* ENT Care */}
      <section className="bg-[#1D3A5F] py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E7FFD9]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#BBDBED]/70">{content?.entEyebrow ?? "Otolaryngology"}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-['Inter'] text-white">{content?.entHeading ?? "ENT Services"}</h2>
            <p className="mt-3 text-white/50 max-w-2xl font-light leading-relaxed">
              {content?.entIntro ?? "From ear infections to nasal surgery, Dr. Scheid provides comprehensive otolaryngology care for adults and children in the Paramus, NJ area."}
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {entItems.map((s, i) => <ServiceCard key={i} {...s} index={i} dark />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-['Inter'] text-[#1D3A5F] mb-4">{content?.ctaHeading ?? "Not sure where to start?"}</h2>
          <p className="text-[#1D3A5F]/60 mb-8 font-light leading-relaxed">
            {content?.ctaText ?? "Call our office or book a consultation - Dr. Scheid will help determine which evaluation is right for you."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ActionLink
              link={content?.ctaPrimaryButton ?? { label: "Book an Appointment", url: bookingLink.url, target: bookingLink.target }}
              className="inline-flex items-center justify-center gap-2 bg-[#1D3A5F] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0F2840] transition-colors"
            >
              {content?.ctaPrimaryButton?.label ?? "Book an Appointment"} <ArrowRight className="w-4 h-4" />
            </ActionLink>
            <ActionLink
              link={content?.ctaSecondaryButton ?? { label: `Call ${wpData().phone ?? "(201) 453-4540"}`, url: `tel:${(wpData().phone ?? "+12014534540").replace(/[^0-9+]/g, "")}` }}
              className="inline-flex items-center justify-center gap-2 border-2 border-[#1D3A5F]/30 text-[#1D3A5F] px-8 py-4 rounded-full font-semibold hover:bg-[#1D3A5F]/5 transition-colors"
            >
              {content?.ctaSecondaryButton?.label ?? `Call ${wpData().phone ?? "(201) 453-4540"}`}
            </ActionLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
