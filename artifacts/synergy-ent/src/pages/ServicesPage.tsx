import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteLayout, PageHero } from "../components/SiteLayout";
import { Link } from "wouter";

const sleepServices = [
  { icon: "🌙", title: "Sleep Apnea", slug: "sleep-apnea", body: "Evaluation and treatment for obstructive sleep apnea. From diagnosis to therapy selection, we guide you through every step." },
  { icon: "💨", title: "Snoring", slug: "snoring", body: "Comprehensive snoring evaluation to rule out airway problems, anatomic contributors, and sleep-disordered breathing." },
  { icon: "⚙️", title: "CPAP Troubleshooting", slug: "cpap", body: "Still tired on CPAP? We help optimize therapy — mask fit, pressure settings, and alternatives like oral appliance therapy." },
  { icon: "🕐", title: "Circadian Rhythm Disorders", slug: "circadian-rhythm", body: "Diagnosis and management of internal clock disruptions including delayed sleep phase and shift work disorder." },
  { icon: "😴", title: "Insomnia", slug: "insomnia", body: "Evidence-based insomnia evaluation, including assessment for underlying airway, medical, or behavioral contributors." },
  { icon: "🧠", title: "Hypersomnia & Fatigue", slug: "hypersomnia", body: "Workup for excessive daytime sleepiness, narcolepsy, idiopathic hypersomnia, and other causes of persistent fatigue." },
];

const entServices = [
  { icon: "👃", title: "Nasal Obstruction", slug: "nasal-obstruction", body: "Evaluation of blocked breathing due to deviated septum, enlarged turbinates, nasal valve collapse, or chronic inflammation." },
  { icon: "💧", title: "Chronic Sinusitis", slug: "sinusitis", body: "Thorough workup for recurrent sinus infections, polyps, and pressure — including in-office endoscopy and imaging review." },
  { icon: "🌿", title: "Allergies", slug: "allergies", body: "Testing and treatment for environmental and seasonal allergies contributing to congestion, post-nasal drip, and throat symptoms." },
  { icon: "🦻", title: "Ear Conditions", slug: "ear-conditions", body: "Evaluation of ear infections, hearing loss, tinnitus, dizziness, and Eustachian tube dysfunction in adults and children." },
  { icon: "🗣️", title: "Throat & Voice", slug: "throat-voice", body: "Assessment of hoarseness, chronic throat clearing, globus sensation, reflux-related throat symptoms, and voice changes." },
  { icon: "👶", title: "Pediatric ENT", slug: "pediatric-ent", body: "Expert pediatric otolaryngology care for children with ear infections, tonsil/adenoid issues, and airway concerns." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function ServiceCard({ icon, title, slug, body, index, dark = false }: { icon: string; title: string; slug: string; body: string; index: number; dark?: boolean }) {
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
      <Link href={`/services/${slug}`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 mt-auto pt-2"
        style={{ color: dark ? "#E7FFD9" : hovered ? "#E7FFD9" : "#809EB1" }}>
        Learn More <ArrowRight className="w-3 h-3" />
      </Link>
    </motion.div>
  );
}

export function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero title="Our Services" subtitle="Comprehensive ENT and sleep medicine care under one roof." breadcrumb="Services" />

      {/* Sleep Care */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1D3A5F]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#1D3A5F]/50">Sleep Medicine</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-['Inter'] text-[#1D3A5F]">Sleep Care Services</h2>
            <p className="mt-3 text-[#1D3A5F]/55 max-w-2xl font-light leading-relaxed">
              Dr. Scheid is board-certified in sleep medicine with expertise in the full spectrum of sleep disorders — from apnea and snoring to insomnia and circadian disruption.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sleepServices.map((s, i) => <ServiceCard key={i} {...s} index={i} />)}
          </div>
        </div>
      </section>

      {/* Divider banner */}
      <div className="bg-[#BBDBED] py-14 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#1D3A5F]/50 text-xs uppercase tracking-widest font-semibold mb-1">Did You Know?</p>
            <p className="text-[#1D3A5F] text-xl font-['Inter'] leading-snug max-w-xl">
              Many sleep problems have a nasal or airway component. Dr. Scheid evaluates both specialties together — so nothing gets missed.
            </p>
          </div>
          <a
            href="/#book"
            className="shrink-0 inline-flex items-center gap-2 bg-[#1D3A5F] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-[#0F2840] transition-colors"
          >
            Book a Consultation <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* ENT Care */}
      <section className="bg-[#1D3A5F] py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E7FFD9]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#BBDBED]/70">Otolaryngology</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-['Inter'] text-white">ENT Services</h2>
            <p className="mt-3 text-white/50 max-w-2xl font-light leading-relaxed">
              From ear infections to nasal surgery, Dr. Scheid provides comprehensive otolaryngology care for adults and children in the Paramus, NJ area.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {entServices.map((s, i) => <ServiceCard key={i} {...s} index={i} dark />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-['Inter'] text-[#1D3A5F] mb-4">Not sure where to start?</h2>
          <p className="text-[#1D3A5F]/60 mb-8 font-light leading-relaxed">
            Call our office or book a consultation — Dr. Scheid will help determine which evaluation is right for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/#book"
              className="inline-flex items-center justify-center gap-2 bg-[#1D3A5F] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0F2840] transition-colors"
            >
              Book an Appointment <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+12014534540"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#1D3A5F]/30 text-[#1D3A5F] px-8 py-4 rounded-full font-semibold hover:bg-[#1D3A5F]/5 transition-colors"
            >
              Call (201) 453-4540
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
