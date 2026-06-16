import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Clipboard, Shield, Clock, CheckCircle } from "lucide-react";
import { SiteLayout, PageHero } from "../components/SiteLayout";
import { Link } from "wouter";

const cards = [
  {
    icon: FileText,
    color: "#1D3A5F",
    title: "Before Your Appointment",
    items: [
      "Complete the online registration form",
      "Gather your insurance information",
      "List all current medications",
      "Note any allergies you have",
      "Write down your symptoms and concerns",
      "Request records from prior providers if relevant",
    ],
  },
  {
    icon: Clipboard,
    color: "#809EB1",
    title: "What to Bring",
    items: [
      "Valid photo ID (driver's license or passport)",
      "Insurance cards (all applicable)",
      "Referral from your primary doctor (if required)",
      "List of current medications",
      "Previous medical records (if available)",
      "Sleep study results (if you have them)",
    ],
  },
  {
    icon: Shield,
    color: "#1D3A5F",
    title: "Insurance & Billing",
    items: [
      "We work with most major insurance plans",
      "Synergy ENT & Wellness is an out-of-network practice",
      "We provide documentation to assist with reimbursement",
      "No Medicare accepted at this time",
      "Payment is due at the time of service",
      "We can discuss billing questions prior to your visit",
    ],
  },
  {
    icon: Clock,
    color: "#809EB1",
    title: "Office Policies",
    items: [
      "Please arrive 15 minutes early for paperwork",
      "Bring a list of all medications and supplements",
      "24-hour notice required for cancellations",
      "Late arrivals may need to reschedule",
      "Children are welcome — please bring a guardian",
      "Questions? Call us at (201) 453-4540",
    ],
  },
];

const hours = [
  { day: "Monday", time: "8:00am – 4:30pm" },
  { day: "Tuesday", time: "8:00am – 4:30pm" },
  { day: "Wednesday", time: "8:00am – 4:30pm" },
  { day: "Thursday", time: "8:00am – 4:30pm" },
  { day: "Friday", time: "8:00am – 12:00pm" },
  { day: "Saturday", time: "Closed" },
  { day: "Sunday", time: "Closed" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function NewPatientPage() {
  return (
    <SiteLayout>
      <PageHero
        title="New Patient Information"
        subtitle="Everything you need to know before your first visit."
        breadcrumb="New Patient"
      />

      {/* Welcome banner */}
      <section className="bg-[#BBDBED] py-14 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1D3A5F]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1D3A5F]/60">Welcome</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-['Inter'] text-[#1D3A5F] mb-4">
            We're excited to welcome you as a new patient.
          </h2>
          <p className="text-[#1D3A5F]/65 font-light leading-relaxed max-w-2xl mx-auto">
            Please review the information below to prepare for your first visit. If you have any questions before coming in, our team is happy to help — just give us a call at (201) 453-4540.
          </p>
        </div>
      </section>

      {/* Info cards */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                  className="rounded-[24px] p-8 flex flex-col gap-5"
                  style={{
                    border: "1px solid rgba(29,58,95,0.10)",
                    boxShadow: "0 2px 16px rgba(29,58,95,0.06)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0"
                      style={{ background: card.color + "15" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                    <h3 className="text-xl font-['Inter'] text-[#1D3A5F]">{card.title}</h3>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#1D3A5F]/65 font-light">
                        <CheckCircle className="w-4 h-4 text-[#809EB1] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hours + insurance side by side */}
      <section className="bg-[#1D3A5F] py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E7FFD9]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#BBDBED]/70">Hours of Operation</span>
            </div>
            <div className="flex flex-col gap-2">
              {hours.map(({ day, time }) => (
                <div
                  key={day}
                  className="flex items-center justify-between py-3 border-b border-white/8"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <span className="text-white/70 text-sm font-medium">{day}</span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: time === "Closed" ? "rgba(255,255,255,0.3)" : "#BBDBED" }}
                  >
                    {time}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-white/40 text-xs font-light">
              Closed for lunch Monday – Thursday, 12:00pm – 1:00pm
            </p>
          </motion.div>

          {/* Insurance */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E7FFD9]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#BBDBED]/70">Insurance</span>
              </div>
              <h3 className="text-white text-2xl font-['Inter'] mb-4">
                We work with most insurance plans.
              </h3>
              <p className="text-white/55 font-light leading-relaxed mb-6">
                Synergy ENT & Wellness is an out-of-network practice. We are happy to provide documentation to help you submit claims to your insurance carrier for potential reimbursement. We do not currently accept Medicare.
              </p>
              <div
                className="rounded-[16px] p-6 flex flex-col gap-3"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <p className="text-[#BBDBED] text-sm font-semibold">Questions about coverage?</p>
                <p className="text-white/50 text-sm font-light">
                  Call us before your appointment and we'll help you understand your out-of-network benefits and what to expect.
                </p>
                <a
                  href="tel:+12014534540"
                  className="self-start inline-flex items-center gap-2 text-[#E7FFD9] text-sm font-semibold hover:opacity-80 transition-opacity"
                >
                  (201) 453-4540 <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#BBDBED] py-20 px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-['Inter'] text-[#1D3A5F] mb-4">Ready to book your first visit?</h2>
          <p className="text-[#1D3A5F]/65 mb-8 font-light">
            Dr. Scheid is currently accepting new patients. We look forward to meeting you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://healow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#1D3A5F] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0F2840] transition-colors"
            >
              Book an Appointment <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#1D3A5F]/40 text-[#1D3A5F] px-8 py-4 rounded-full font-semibold hover:bg-[#1D3A5F]/8 transition-colors"
            >
              Contact the Office
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
