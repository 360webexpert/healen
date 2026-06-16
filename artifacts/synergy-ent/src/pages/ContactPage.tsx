import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink, ArrowRight, CheckCircle } from "lucide-react";
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

type FormState = { name: string; email: string; phone: string; message: string };
const empty: FormState = { name: "", email: "", phone: "", message: "" };

export function ContactPage() {
  const [form, setForm] = useState<FormState>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Please enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
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

  const field = (
    key: keyof FormState,
    label: string,
    type = "text",
    textarea = false,
  ) => {
    const base =
      "w-full px-4 py-3 rounded-[12px] text-sm text-[#1D3A5F] placeholder-[#1D3A5F]/30 outline-none transition-all";
    const style: React.CSSProperties = {
      background: "white",
      border: errors[key]
        ? "1.5px solid #e53e3e"
        : "1.5px solid rgba(29,58,95,0.15)",
      boxShadow: "0 1px 4px rgba(29,58,95,0.05)",
    };

    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#1D3A5F]/50">{label}</label>
        {textarea ? (
          <textarea
            rows={5}
            placeholder={label}
            value={form[key]}
            onChange={(e) => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: undefined })); }}
            className={base + " resize-none"}
            style={style}
          />
        ) : (
          <input
            type={type}
            placeholder={label}
            value={form[key]}
            onChange={(e) => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: undefined })); }}
            className={base}
            style={style}
          />
        )}
        {errors[key] && <p className="text-xs text-red-500">{errors[key]}</p>}
      </div>
    );
  };

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
                style={{ background: "#f0faf5", border: "1.5px solid rgba(29,58,95,0.1)" }}
              >
                <CheckCircle className="w-12 h-12 text-[#1D3A5F]" />
                <h3 className="text-2xl font-['Inter'] text-[#1D3A5F]">Message Sent!</h3>
                <p className="text-[#1D3A5F]/60 font-light">
                  Thank you for reaching out. We'll be in touch within one business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm text-[#809EB1] underline hover:text-[#1D3A5F] transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {field("name", "Full Name")}
                  {field("email", "Email Address", "email")}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {field("phone", "Phone Number", "tel")}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#1D3A5F]/50">Reason for Visit</label>
                    <select
                      className="w-full px-4 py-3 rounded-[12px] text-sm text-[#1D3A5F] outline-none"
                      style={{ background: "white", border: "1.5px solid rgba(29,58,95,0.15)", boxShadow: "0 1px 4px rgba(29,58,95,0.05)" }}
                    >
                      <option value="">Select a reason…</option>
                      <option>General Inquiry</option>
                      <option>Book an Appointment</option>
                      <option>Sleep Medicine / Sleep Apnea</option>
                      <option>ENT / Sinus / Allergy</option>
                      <option>Insurance Question</option>
                      <option>Referral</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                {field("message", "Message", "text", true)}
                <button
                  type="submit"
                  className="self-start inline-flex items-center gap-2 bg-[#1D3A5F] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0F2840] transition-colors mt-2"
                >
                  Send Message <ArrowRight className="w-4 h-4" />
                </button>
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
            href="https://healow.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-[#E7FFD9] text-[#1D3A5F] px-7 py-3.5 rounded-full font-semibold hover:brightness-110 transition-all"
          >
            Book Online <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
