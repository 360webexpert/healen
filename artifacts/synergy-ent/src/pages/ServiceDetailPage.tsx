import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { SiteLayout } from "../components/SiteLayout";
import { getServiceBySlug, servicesContent } from "../data/servicesContent";

const categoryColor = {
  sleep: { bg: "#1D3A5F", accent: "#E7FFD9", light: "#BBDBED" },
  ent: { bg: "#0F2840", accent: "#E7FFD9", light: "#BBDBED" },
};

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

  const colors = categoryColor[service.category];

  const related = servicesContent
    .filter((s) => s.slug !== slug && s.category === service.category)
    .slice(0, 3);

  return (
    <SiteLayout>
      {/* Hero */}
      <div
        className="relative overflow-hidden pt-24 pb-16 px-6 md:px-12"
        style={{ background: `linear-gradient(135deg, ${colors.bg} 0%, #2A5080 100%)` }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #809EB1 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: colors.light }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-8 font-medium">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-white/70 transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70">{service.title}</span>
          </nav>

          {/* Category badge */}
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: colors.accent }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: colors.accent }}>
              {service.category === "sleep" ? "Sleep Medicine" : "Otolaryngology"}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-4xl md:text-5xl lg:text-6xl font-['Inter'] text-white leading-tight mb-4"
          >
            {service.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-white/50 text-lg font-light mb-8"
          >
            {service.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="text-white/75 text-base md:text-lg font-light leading-relaxed max-w-2xl"
          >
            {service.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="flex flex-col sm:flex-row gap-3 mt-10"
          >
            <a
              href="https://healow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all hover:brightness-110"
              style={{ background: colors.accent, color: "#1D3A5F" }}
            >
              Book a Consultation <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+12014534540"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
              style={{ border: "1.5px solid rgba(255,255,255,0.25)" }}
            >
              Call (201) 453-4540
            </a>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-14">
            {service.sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <h2 className="text-xl md:text-2xl font-['Inter'] font-semibold text-[#1D3A5F] mb-4 pb-3 border-b border-[#BBDBED]/60">
                  {section.heading}
                </h2>

                {section.body && (
                  <p className="text-[#1D3A5F]/65 font-light leading-relaxed mb-4 text-base">
                    {section.body}
                  </p>
                )}

                {section.items && section.items.length > 0 && (
                  <ul className="space-y-3">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-[#809EB1] mt-1 shrink-0" />
                        <span className="text-[#1D3A5F]/65 font-light leading-relaxed text-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* When to Seek Help */}
      <section className="py-16 md:py-20 px-6 md:px-12" style={{ background: "#F5F9FC" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1D3A5F]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#1D3A5F]/50">
                When to Seek Evaluation
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-['Inter'] text-[#1D3A5F] mb-8">
              Consider reaching out if any of these sound familiar
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.whenToSeek.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white rounded-2xl px-5 py-4"
                  style={{ border: "1px solid rgba(29,58,95,0.08)", boxShadow: "0 2px 12px rgba(29,58,95,0.05)" }}
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(29,58,95,0.07)" }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1D3A5F]" />
                  </div>
                  <span className="text-[#1D3A5F]/70 text-sm font-light leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 md:py-20 px-6 md:px-12"
        style={{ background: `linear-gradient(135deg, ${colors.bg} 0%, #2A5080 100%)` }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">
              Synergy ENT & Wellness — Paramus, NJ
            </p>
            <h2 className="text-3xl md:text-4xl font-['Inter'] text-white mb-4 leading-tight">
              Ready to find out what's going on?
            </h2>
            <p className="text-white/55 font-light mb-8 max-w-xl mx-auto leading-relaxed">
              Dr. Scheid takes the time to understand the full picture. Schedule a consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://healow.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-all hover:brightness-110"
                style={{ background: colors.accent, color: "#1D3A5F" }}
              >
                Book an Appointment <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+12014534540"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
                style={{ border: "1.5px solid rgba(255,255,255,0.25)" }}
              >
                Call (201) 453-4540
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section className="bg-white py-16 md:py-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1D3A5F]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#1D3A5F]/50">
                Related Services
              </span>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{ border: "1px solid rgba(29,58,95,0.10)", boxShadow: "0 2px 12px rgba(29,58,95,0.05)" }}
                >
                  <p className="text-[#809EB1] text-xs font-semibold uppercase tracking-widest mb-2">
                    {s.category === "sleep" ? "Sleep Medicine" : "ENT"}
                  </p>
                  <h3 className="text-[#1D3A5F] font-semibold text-base mb-1 group-hover:text-[#2A5080] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-[#1D3A5F]/45 text-sm font-light leading-snug line-clamp-2">
                    {s.subtitle}
                  </p>
                  <div className="flex items-center gap-1 mt-4 text-[#809EB1] text-xs font-semibold group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-[#1D3A5F] text-sm font-semibold border-b-2 border-[#1D3A5F]/30 pb-0.5 hover:border-[#1D3A5F] transition-colors"
              >
                View All Services <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
