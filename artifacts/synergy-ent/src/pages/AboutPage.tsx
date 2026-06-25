import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { SiteLayout, PageHero } from "../components/SiteLayout";
import { Link } from "wouter";

const credentials = [
  { label: "Board Certifications", items: [
    "Diplomate – American Board of Otolaryngology",
    "Diplomate – American Board of Sleep Medicine",
    "Fellow – American Academy of Pediatrics",
  ]},
  { label: "Education & Training", items: [
    "Dartmouth College (Undergraduate)",
    "Rush Medical College, MD — Alpha Omega Alpha Honor Society",
    "Thomas Jefferson University Hospital — General Surgery Internship & Otolaryngology Residency",
    "St. Christopher's Hospital for Children — Pediatric Otolaryngology Fellowship",
  ]},
];

const approachCards = [
  {
    icon: "🔍",
    title: "Root-Cause Focused",
    body: "Rather than treating symptoms in isolation, Dr. Scheid evaluates the full picture — how breathing, sleep, allergies, and inflammation interact.",
  },
  {
    icon: "🕐",
    title: "Unrushed Appointments",
    body: "Every visit is unhurried by design. You'll have time to explain your concerns, ask questions, and truly understand your options.",
  },
  {
    icon: "🤝",
    title: "Personalized Plans",
    body: "No two patients are alike. Treatment plans are built around your specific symptoms, history, and goals — not a one-size-fits-all protocol.",
  },
  {
    icon: "🧠",
    title: "Dual Specialization",
    body: "As both an ENT and sleep medicine physician, Dr. Scheid can address the nose-throat-airway-sleep connection in a single practice.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function AboutPage() {
  return (
    <SiteLayout>
      <PageHero title="About Dr. Scheid" breadcrumb="About Us" />

      {/* Bio section */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[420px_1fr] gap-16 items-start">

          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-[24px] overflow-hidden shadow-2xl">
              <img
                src="/images/dr-scheid-new.jpg"
                alt="Dr. Sara Scheid"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Floating name card */}
            <div
              className="absolute bottom-5 right-5 p-5 rounded-[16px] text-[#1D3A5F]"
              style={{
                background: "rgba(220,237,248,0.88)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.85)",
                boxShadow: "0 4px 32px rgba(29,58,95,0.18)",
              }}
            >
              <h3 className="text-xl font-['Inter'] mb-0.5">Dr. Sara Scheid</h3>
              <p className="text-sm font-medium text-[#1D3A5F]/70">Otolaryngologist &amp; Sleep Specialist</p>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-2 h-2 rounded-full bg-[#E7FFD9] border border-[#1D3A5F]/20" />
                <span className="text-xs text-[#1D3A5F]/60 font-medium">Accepting New Patients</span>
              </div>
            </div>

            {/* Experience badge */}
            <div
              className="absolute -top-4 -left-4 w-20 h-20 rounded-full flex flex-col items-center justify-center text-white shadow-lg"
              style={{ background: "#1D3A5F" }}
            >
              <span className="text-2xl font-bold leading-none">20+</span>
              <span className="text-[9px] uppercase tracking-wider text-white/70 leading-tight text-center">Years<br/>Exp.</span>
            </div>
          </motion.div>

          {/* Text column */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1D3A5F]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#1D3A5F]/50">Meet the Doctor</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-['Inter'] text-[#1D3A5F] leading-tight mb-6">
                Care That Takes You Seriously.
              </h2>
            </motion.div>

            {[
              "Dr. Sara Scheid is a board-certified ENT and sleep medicine physician in Paramus, NJ, specializing in thoughtful evaluation of breathing, sleep, and airway-related concerns. She helps patients with nasal obstruction, chronic congestion, allergies, snoring, sleep apnea, CPAP intolerance, mouth breathing, throat clearing, reflux-related throat symptoms, and complex ENT/sleep issues that have not improved with standard treatment.",
              "As both an otolaryngologist and sleep medicine physician, Dr. Scheid is able to look beyond a single symptom and evaluate how the nose, throat, airway, sleep quality, allergies, reflux, and inflammation may be connected. Her approach is careful, educational, and personalized, with a focus on helping patients understand their symptoms and make confident decisions about next steps.",
              "At Synergy ENT & Wellness, patients receive unrushed, patient-driven care designed to provide solutions to help you breathe better, sleep better, and gain control of your health.",
            ].map((para, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-[#1D3A5F]/65 leading-relaxed font-light"
              >
                {para}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#1D3A5F] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-[#0F2840] transition-colors"
              >
                Book an Appointment <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[#1D3A5F]/30 text-[#1D3A5F] px-7 py-3.5 rounded-full font-semibold hover:bg-[#1D3A5F]/5 transition-colors"
              >
                Contact the Office
              </Link>
            </motion.div>

            {/* Credentials */}
            <div className="mt-4 flex flex-col gap-8 border-t border-[#1D3A5F]/10 pt-8">
              {credentials.map((group, gi) => (
                <motion.div
                  key={gi}
                  custom={gi}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <p className="text-[#809EB1] text-xs font-semibold uppercase tracking-widest mb-3">{group.label}</p>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#1D3A5F]/65 font-light leading-snug">
                        <CheckCircle className="w-4 h-4 text-[#809EB1] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              <motion.div
                custom={2}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <p className="text-[#809EB1] text-xs font-semibold uppercase tracking-widest mb-3">Outside the Office</p>
                <p className="text-sm text-[#1D3A5F]/65 font-light leading-relaxed">
                  Dr. Scheid is happily married and a proud mother of two college-aged children and two dogs. In her free time she enjoys hiking, skiing, reading, and spending time with her family.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Cards */}
      <section className="bg-[#1D3A5F] py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E7FFD9]" />
              <span className="text-[#BBDBED] text-xs font-semibold uppercase tracking-widest">Our Philosophy</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-['Inter'] text-white">The Synergy Difference</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {approachCards.map((card, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-[20px] p-7 flex flex-col gap-4"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span className="text-3xl">{card.icon}</span>
                <h3 className="text-white font-semibold text-lg leading-snug">{card.title}</h3>
                <p className="text-white/55 text-sm font-light leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#BBDBED] py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-['Inter'] text-[#1D3A5F] mb-4">Ready to get started?</h2>
          <p className="text-[#1D3A5F]/65 mb-8 text-lg font-light">
            New patients are welcome. Book an appointment or reach out with any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#1D3A5F] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0F2840] transition-colors text-base"
            >
              Book an Appointment <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#1D3A5F]/40 text-[#1D3A5F] px-8 py-4 rounded-full font-semibold hover:bg-[#1D3A5F]/8 transition-colors text-base"
            >
              Contact the Office
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
