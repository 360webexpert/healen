import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink, ArrowRight, CheckCircle, ChevronDown, Calendar } from "lucide-react";
import { SiteLayout, PageHero } from "../components/SiteLayout";

const infoCards = [
  {
    icon: MapPin,
    label: "Post Address",
    lines: ["37 West Century Road, Suite 104", "Paramus, NJ 07652"],
    link: { href: "https://maps.google.com/?q=37+West+Century+Road+Suite+104+Paramus+NJ+07652", label: "Get Directions" },
  },
  {
    icon: Phone,
    label: "Contact Phone",
    lines: ["201-453-4540"],
    link: { href: "tel:+12014534540", label: "Call Now" },
  },
  {
    icon: Mail,
    label: "E-mail Address",
    lines: ["Info@synergyentwellness.com"],
    link: { href: "mailto:Info@synergyentwellness.com", label: "Send Email" },
  },
  {
    icon: Clock,
    label: "Hours of Operation",
    lines: [
      "Mon: 8:00am – 4:30pm",
      "Tue: 8:00am – 4:30pm",
      "Wed: 8:00am – 4:30pm",
      "Thu: 8:00am – 4:30pm",
      "Fri: 8:00am – 12:00pm",
      "Closed for lunch M–Thu, 12pm–1pm",
    ],
    link: null,
  },
];

const INSURANCE_OPTIONS = [
  "Aetna", "Blue Cross Blue Shield", "Cigna", "UnitedHealthcare",
  "Humana", "Medicare", "Medicaid", "Oxford", "Empire BCBS",
  "Horizon BCBS", "Oscar Health", "Out-of-pocket / Self-pay", "Other",
];

type FormState = {
  firstName: string; lastName: string; phone: string;
  email: string; insurance: string; message: string;
};
const empty: FormState = { firstName: "", lastName: "", phone: "", email: "", insurance: "", message: "" };

export function ContactPage() {
  const [form, setForm] = useState<FormState>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.insurance) e.insurance = "Required";
    if (!form.message.trim()) e.message = "Required";
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
    setForm(empty);
    setErrors({});
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = ev.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(er => { const n = { ...er }; delete n[name as keyof FormState]; return n; });
  };

  const inputBase = "w-full rounded-xl px-4 py-3.5 text-sm text-[#1D3A5F] placeholder-[#1D3A5F]/35 font-light outline-none transition-all duration-200 focus:ring-2 focus:ring-[#1D3A5F]/20 border";
  const inputCls = (key: keyof FormState) =>
    inputBase + (errors[key] ? " ring-2 ring-red-400/60 bg-red-50/40 border-red-300" : " bg-white border-[#1D3A5F]/12 focus:bg-white");

  return (
    <SiteLayout>
      <PageHero title="Contact Us" subtitle="Our team is ready to help. Reach out with any questions." breadcrumb="Contact Us" />

      {/* Main content */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_420px] gap-14 items-start">

          {/* Left — contact form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1D3A5F]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#1D3A5F]/50">Send a Message</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-['Inter'] text-[#1D3A5F] mb-2">Get In Touch</h2>
            <p className="text-[#1D3A5F]/55 font-light mb-8 leading-relaxed">
              Please use the form below to share your questions or feedback. A member of our team will get back to you promptly.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-[20px] p-10 text-center flex flex-col items-center gap-4"
                style={{ background: "rgba(231,255,217,0.35)", border: "1.5px solid rgba(29,58,95,0.1)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(231,255,217,0.6)", border: "2px solid rgba(29,58,95,0.12)" }}
                >
                  <CheckCircle className="w-8 h-8 text-[#1D3A5F]" />
                </div>
                <h3 className="text-2xl font-['Inter'] text-[#1D3A5F] font-semibold">Request Received!</h3>
                <p className="text-[#1D3A5F]/60 font-light max-w-xs leading-relaxed">
                  Thank you, {form.firstName || "there"}. Our team will be in touch within one business day to confirm your appointment.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm text-[#809EB1] underline hover:text-[#1D3A5F] transition-colors"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-[#809EB1]" />
                  <p className="text-[#1D3A5F] font-semibold text-sm">Tell us about yourself</p>
                </div>

                {/* First + Last Name */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1D3A5F]/60 uppercase tracking-wider mb-1.5">
                      First Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="firstName" type="text" value={form.firstName}
                      onChange={handleChange} placeholder="Sara"
                      className={inputCls("firstName")}
                    />
                    {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1D3A5F]/60 uppercase tracking-wider mb-1.5">
                      Last Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="lastName" type="text" value={form.lastName}
                      onChange={handleChange} placeholder="Scheid"
                      className={inputCls("lastName")}
                    />
                    {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Phone + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1D3A5F]/60 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      name="phone" type="tel" value={form.phone}
                      onChange={handleChange} placeholder="(201) 000-0000"
                      className={inputCls("phone")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1D3A5F]/60 uppercase tracking-wider mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="email" type="email" value={form.email}
                      onChange={handleChange} placeholder="you@email.com"
                      className={inputCls("email")}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Insurance Carrier */}
                <div>
                  <label className="block text-xs font-semibold text-[#1D3A5F]/60 uppercase tracking-wider mb-1.5">
                    Insurance Carrier <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="insurance" value={form.insurance}
                      onChange={handleChange}
                      className={inputCls("insurance") + " appearance-none pr-10 cursor-pointer"}
                    >
                      <option value="">Select your insurance carrier…</option>
                      {INSURANCE_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#809EB1] pointer-events-none" />
                  </div>
                  {errors.insurance && <p className="text-red-400 text-xs mt-1">{errors.insurance}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#1D3A5F]/60 uppercase tracking-wider mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message" value={form.message}
                    onChange={handleChange} rows={4}
                    placeholder="How can we help? Tell us about your symptoms or concerns…"
                    className={inputCls("message") + " resize-none"}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                <p className="text-[#1D3A5F]/35 text-xs font-light">
                  Fields marked <span className="text-red-400">*</span> are required
                </p>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 rounded-xl py-4 text-sm font-semibold text-[#1D3A5F] hover:brightness-110 transition-all shadow-md shadow-[#E7FFD9]/30"
                  style={{ background: "#E7FFD9" }}
                >
                  <Calendar className="w-4 h-4" />
                  Send Appointment Request
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[#1D3A5F]/30 text-xs text-center font-light">
                  We'll confirm your appointment within one business day.
                </p>
              </form>
            )}
          </motion.div>

          {/* Right — info cards */}
          <div className="flex flex-col gap-4">
            {infoCards.map((card, i) => {
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
                    {card.lines.map((l, li) => (
                      <p key={li} className={`text-[#1D3A5F] text-sm ${li === 0 ? "font-semibold" : "font-light text-[#1D3A5F]/70"}`}>{l}</p>
                    ))}
                    {card.link && (
                      <a
                        href={card.link.href}
                        target={card.link.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#809EB1] hover:text-[#1D3A5F] transition-colors mt-1"
                      >
                        {card.link.label}
                        {card.link.href.startsWith("http") ? <ExternalLink className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                      </a>
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
                src="https://maps.google.com/maps?q=37+West+Century+Road+Suite+104+Paramus+NJ+07652&output=embed"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Book CTA band */}
      <section className="bg-[#1D3A5F] py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#BBDBED] text-xs uppercase tracking-widest font-semibold mb-1">Ready to see Dr. Scheid?</p>
            <h2 className="text-2xl font-['Inter'] text-white">Book your appointment online — it only takes a minute.</h2>
          </div>
          <a
            href="/#book"
            className="shrink-0 inline-flex items-center gap-2 bg-[#E7FFD9] text-[#1D3A5F] px-7 py-3.5 rounded-full font-semibold hover:brightness-110 transition-all"
          >
            Book Online <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
