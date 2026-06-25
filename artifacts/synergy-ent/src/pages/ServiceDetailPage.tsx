import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight, Phone, Calendar,
  Moon, Wind, Settings, Clock, Brain, Zap,
  Ear, Flower2, Stethoscope, Baby, Mic2, Activity,
  AlertCircle, Shield, Sparkles, ChevronDown,
} from "lucide-react";
import { Link } from "wouter";
import { SiteLayout } from "../components/SiteLayout";
import { getServiceBySlug, servicesContent, type ServiceData } from "../data/servicesContent";

const slugIcons: Record<string, React.ReactNode> = {
  "sleep-apnea":      <Moon className="w-7 h-7" />,
  "snoring":          <Wind className="w-7 h-7" />,
  "cpap":             <Settings className="w-7 h-7" />,
  "circadian-rhythm": <Clock className="w-7 h-7" />,
  "insomnia":         <Brain className="w-7 h-7" />,
  "hypersomnia":      <Zap className="w-7 h-7" />,
  "nasal-obstruction":<Activity className="w-7 h-7" />,
  "sinusitis":        <Sparkles className="w-7 h-7" />,
  "allergies":        <Flower2 className="w-7 h-7" />,
  "ear-conditions":   <Ear className="w-7 h-7" />,
  "throat-voice":     <Mic2 className="w-7 h-7" />,
  "pediatric-ent":    <Baby className="w-7 h-7" />,
};

const relatedIcons: Record<string, React.ReactNode> = {
  "sleep-apnea":      <Moon className="w-4 h-4" />,
  "snoring":          <Wind className="w-4 h-4" />,
  "cpap":             <Settings className="w-4 h-4" />,
  "circadian-rhythm": <Clock className="w-4 h-4" />,
  "insomnia":         <Brain className="w-4 h-4" />,
  "hypersomnia":      <Zap className="w-4 h-4" />,
  "nasal-obstruction":<Activity className="w-4 h-4" />,
  "sinusitis":        <Sparkles className="w-4 h-4" />,
  "allergies":        <Flower2 className="w-4 h-4" />,
  "ear-conditions":   <Ear className="w-4 h-4" />,
  "throat-voice":     <Mic2 className="w-4 h-4" />,
  "pediatric-ent":    <Baby className="w-4 h-4" />,
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-[#1D3A5F]/10 last:border-0"
      onClick={() => setOpen(!open)}
    >
      <button className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="text-[#1D3A5F] font-medium text-base">{q}</span>
        <ChevronDown
          className="w-4 h-4 text-[#809EB1] shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0px" }}
      >
        <p className="text-[#1D3A5F]/60 text-sm font-light leading-relaxed pb-5">{a}</p>
      </div>
    </div>
  );
}

function SectionCard({ section, index }: { section: ServiceData["sections"][number]; index: number }) {
  const hasItems = section.items && section.items.length > 0;
  const isTreatment = section.heading.toLowerCase().includes("treatment");
  const isSymptoms = section.heading.toLowerCase().includes("sign") || section.heading.toLowerCase().includes("symptom") || section.heading.toLowerCase().includes("feel");

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="relative"
    >
      {/* Section number + heading row */}
      <div className="flex items-start gap-5 mb-5">
        <div
          className="shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold"
          style={{ background: "rgba(29,58,95,0.07)", color: "#1D3A5F" }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="pt-1.5">
          <h2 className="text-xl md:text-2xl font-['Inter'] font-semibold text-[#1D3A5F] leading-snug">
            {section.heading}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="pl-[60px]">
        {section.body && (
          <p className="text-[#1D3A5F]/60 font-light leading-relaxed mb-5 text-base">
            {section.body}
          </p>
        )}

        {hasItems && (
          <div
            className={
              isTreatment
                ? "grid sm:grid-cols-2 gap-3"
                : isSymptoms
                ? "flex flex-wrap gap-2"
                : "space-y-2.5"
            }
          >
            {section.items!.map((item, j) => {
              if (isTreatment) {
                const [label, ...rest] = item.split(" — ");
                return (
                  <div
                    key={j}
                    className="rounded-2xl p-5"
                    style={{
                      background: "rgba(29,58,95,0.04)",
                      border: "1px solid rgba(29,58,95,0.08)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1D3A5F]" />
                      <p className="text-[#1D3A5F] font-semibold text-sm">{label}</p>
                    </div>
                    {rest.length > 0 && (
                      <p className="text-[#1D3A5F]/50 text-sm font-light leading-relaxed">
                        {rest.join(" — ")}
                      </p>
                    )}
                  </div>
                );
              }

              if (isSymptoms) {
                return (
                  <div
                    key={j}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      background: "rgba(187,219,237,0.35)",
                      color: "#1D3A5F",
                      border: "1px solid rgba(187,219,237,0.6)",
                    }}
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-[#809EB1]" />
                    {item}
                  </div>
                );
              }

              const [bold, ...rest] = item.split(" — ");
              const hasDash = item.includes(" — ");
              return (
                <div key={j} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(29,58,95,0.07)" }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1D3A5F]" />
                  </div>
                  <span className="text-[#1D3A5F]/65 font-light leading-relaxed text-base">
                    {hasDash ? (
                      <>
                        <span className="font-semibold text-[#1D3A5F]">{bold}</span>
                        {" — "}
                        {rest.join(" — ")}
                      </>
                    ) : item}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="mt-10 border-b border-[#1D3A5F]/8" />
    </motion.div>
  );
}

export function ServiceDetailPage({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <SiteLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-[#809EB1] text-sm mb-3">Service not found</p>
            <Link href="/services" className="text-[#1D3A5F] font-semibold underline">
              ← Back to Services
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const icon = slugIcons[slug] ?? <Stethoscope className="w-7 h-7" />;
  const isSleep = service.category === "sleep";

  const related = servicesContent
    .filter((s) => s.slug !== slug && s.category === service.category)
    .slice(0, 3);

  return (
    <SiteLayout>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0F2840 0%, #1D3A5F 55%, #2A5080 100%)" }}
      >
        {/* Decorative dots */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #BBDBED 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#BBDBED", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#809EB1" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/35 mb-10 font-medium flex-wrap">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-white/60 transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/60">{service.title}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_340px] gap-12 items-start">
            {/* Left — text */}
            <div>
              {/* Category chip */}
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
                style={{ background: "rgba(231,255,217,0.12)", color: "#E7FFD9", border: "1px solid rgba(231,255,217,0.2)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#E7FFD9]" />
                {isSleep ? "Sleep Medicine" : "Otolaryngology (ENT)"}
              </div>

              {/* Icon + Title */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.14)", color: "#BBDBED" }}
                >
                  {icon}
                </div>
                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-['Inter'] text-white leading-tight"
                >
                  {service.title}
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-[#BBDBED] text-lg font-light mb-6 italic"
              >
                {service.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.14 }}
                className="text-white/65 text-base md:text-lg font-light leading-relaxed max-w-2xl mb-10"
              >
                {service.intro}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.22 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold bg-[#E7FFD9] text-[#1D3A5F] hover:brightness-110 transition-all shadow-lg shadow-[#E7FFD9]/20"
                >
                  <Calendar className="w-4 h-4" />
                  Book a Consultation
                </a>
                <a
                  href="tel:+12014534540"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all"
                  style={{ border: "1.5px solid rgba(255,255,255,0.22)" }}
                >
                  <Phone className="w-4 h-4" />
                  (201) 453-4540
                </a>
              </motion.div>
            </div>

            {/* Right — quick-facts card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="rounded-3xl p-7 hidden lg:block"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(16px)",
              }}
            >
              <p className="text-[#BBDBED] text-xs font-semibold uppercase tracking-widest mb-5">
                When to Seek Help
              </p>
              <ul className="space-y-3.5">
                {service.whenToSeek.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(231,255,217,0.15)" }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E7FFD9]" />
                    </div>
                    <span className="text-white/65 text-sm font-light leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 pt-6 border-t border-white/10">
                <p className="text-white/35 text-xs font-light leading-relaxed">
                  Synergy ENT & Wellness · Paramus, NJ<br />
                  Accepting new patients
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Progress strip ─────────────────────────────────── */}
      <div className="bg-white border-b border-[#1D3A5F]/8">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-5 flex flex-wrap gap-6 items-center">
          {["Comprehensive Evaluation", "Evidence-Based Treatment", "Personalized Care Plan"].map((step, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "#1D3A5F", color: "white" }}
              >
                {i + 1}
              </div>
              <span className="text-[#1D3A5F] text-sm font-medium">{step}</span>
              {i < 2 && <ChevronRight className="w-4 h-4 text-[#809EB1]/50" />}
            </div>
          ))}
        </div>
      </div>

      {/* ── Main content ───────────────────────────────────── */}
      <div className="bg-white py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_280px] gap-16 items-start">

          {/* Sections */}
          <div className="space-y-10">
            {service.sections.map((section, i) => (
              <SectionCard key={i} section={section} index={i} />
            ))}
          </div>

          {/* Sticky sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-8 space-y-5">

              {/* Our Approach card */}
              <div
                className="rounded-3xl p-6"
                style={{ background: "linear-gradient(135deg, #1D3A5F 0%, #0F2840 100%)" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-4 h-4 text-[#E7FFD9]" />
                  <p className="text-[#BBDBED] text-xs font-semibold uppercase tracking-widest">Our Approach</p>
                </div>
                <p className="text-white text-sm font-light leading-relaxed mb-5">
                  Dr. Scheid takes a full-picture view of the airway — from nose to throat — so nothing gets missed. Every plan is built around your specific situation.
                </p>
                <div className="space-y-2">
                  {["Dual board-certified (ENT + Sleep)", "Unrushed, comprehensive appointments", "Accepting new patients in Paramus, NJ"].map((pt, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#E7FFD9] shrink-0 mt-0.5" />
                      <span className="text-white/55 text-xs font-light leading-snug">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact card */}
              <div
                className="rounded-3xl p-6"
                style={{ background: "#F5F9FC", border: "1px solid rgba(29,58,95,0.08)" }}
              >
                <p className="text-[#1D3A5F] font-semibold text-sm mb-4">Ready to get started?</p>
                <div className="space-y-2.5">
                  <a
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold bg-[#1D3A5F] text-white hover:bg-[#0F2840] transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Book Appointment
                  </a>
                  <a
                    href="tel:+12014534540"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-[#1D3A5F] hover:bg-[#1D3A5F]/5 transition-colors"
                    style={{ border: "1.5px solid rgba(29,58,95,0.18)" }}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    (201) 453-4540
                  </a>
                </div>
                <p className="text-[#809EB1] text-xs text-center mt-4 font-light">
                  37 West Century Rd, Suite 104<br />Paramus, NJ 07652
                </p>
              </div>

              {/* Category badge */}
              <div
                className="rounded-2xl px-5 py-4 flex items-center gap-3"
                style={{ background: isSleep ? "rgba(187,219,237,0.2)" : "rgba(231,255,217,0.18)", border: "1px solid rgba(29,58,95,0.08)" }}
              >
                <div className="text-[#1D3A5F]">{icon}</div>
                <div>
                  <p className="text-[#1D3A5F] font-semibold text-sm">{service.title}</p>
                  <p className="text-[#809EB1] text-xs font-light">{isSleep ? "Sleep Medicine" : "ENT / Otolaryngology"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── When to Seek Help ─────────────────────────────── */}
      <section
        className="py-16 md:py-20 px-6 md:px-12"
        style={{ background: "linear-gradient(to bottom, #EEF6FB 0%, #F8FBFD 100%)" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="w-4 h-4 text-[#809EB1]" />
              <span className="text-[#809EB1] text-xs font-semibold uppercase tracking-widest">
                When to Seek Evaluation
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-['Inter'] text-[#1D3A5F] mb-10">
              Consider reaching out if any of these sound familiar
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.whenToSeek.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-start gap-3.5 bg-white rounded-2xl px-5 py-5"
                  style={{
                    border: "1px solid rgba(29,58,95,0.08)",
                    boxShadow: "0 2px 16px rgba(29,58,95,0.05)",
                  }}
                >
                  <div
                    className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-0.5"
                    style={{ background: "rgba(29,58,95,0.07)" }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#1D3A5F]" />
                  </div>
                  <span className="text-[#1D3A5F]/70 text-sm font-light leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 md:py-24 px-6 md:px-12"
        style={{ background: "linear-gradient(135deg, #0F2840 0%, #1D3A5F 60%, #2A5080 100%)" }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #BBDBED 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#BBDBED", transform: "translate(30%, -30%)" }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ background: "rgba(231,255,217,0.12)", color: "#E7FFD9", border: "1px solid rgba(231,255,217,0.2)" }}
            >
              Synergy ENT & Wellness · Paramus, NJ
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-['Inter'] text-white mb-5 leading-tight">
              Ready to find out<br />what's going on?
            </h2>
            <p className="text-white/50 font-light mb-10 max-w-xl mx-auto leading-relaxed">
              Dr. Scheid takes the time to understand the full picture. Board-certified in both ENT and Sleep Medicine — so you get one focused evaluation, not a referral runaround.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold bg-[#E7FFD9] text-[#1D3A5F] hover:brightness-110 transition-all shadow-lg shadow-black/20"
              >
                <Calendar className="w-4 h-4" />
                Book an Appointment
              </a>
              <a
                href="tel:+12014534540"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-all"
                style={{ border: "1.5px solid rgba(255,255,255,0.22)" }}
              >
                <Phone className="w-4 h-4" />
                Call (201) 453-4540
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Related Services ──────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-white py-16 md:py-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1D3A5F]" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#1D3A5F]/45">Related</span>
                </div>
                <h2 className="text-2xl font-['Inter'] text-[#1D3A5F]">More {isSleep ? "Sleep" : "ENT"} Services</h2>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-[#1D3A5F] text-sm font-semibold border-b-2 border-[#1D3A5F]/20 pb-0.5 hover:border-[#1D3A5F] transition-colors"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group block rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#1D3A5F]/10"
                  style={{ border: "1px solid rgba(29,58,95,0.10)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-[#1D3A5F]"
                    style={{ background: "rgba(29,58,95,0.07)", color: "#1D3A5F" }}
                  >
                    <div className="group-hover:text-white transition-colors duration-300" style={{ color: "inherit" }}>
                      {relatedIcons[s.slug] ?? <Stethoscope className="w-4 h-4" />}
                    </div>
                  </div>
                  <p className="text-[#809EB1] text-xs font-semibold uppercase tracking-widest mb-1.5">
                    {s.category === "sleep" ? "Sleep Medicine" : "ENT"}
                  </p>
                  <h3 className="text-[#1D3A5F] font-semibold text-base mb-1.5 group-hover:text-[#2A5080] transition-colors leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-[#1D3A5F]/45 text-sm font-light leading-snug line-clamp-2 mb-4">
                    {s.subtitle}
                  </p>
                  <div className="inline-flex items-center gap-1 text-[#809EB1] text-xs font-semibold group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
