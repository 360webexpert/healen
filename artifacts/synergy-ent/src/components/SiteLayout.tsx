import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Mail, Phone, MapPin, Globe, Share2, AtSign, Rss, ChevronRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "New Patient", href: "/new-patient" },
  { label: "Contact", href: "/contact" },
];

function SiteNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <>
      <nav
        className="fixed w-full z-50 px-6 md:px-10 py-4"
        style={{
          background: "rgba(15, 40, 64, 0.96)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/images/logo-white-orig.png"
              alt="Synergy ENT & Wellness"
              className="h-10 w-auto max-w-[220px] object-contain"
              style={{ mixBlendMode: "screen" }}
            />
          </Link>

          <div className="hidden lg:flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-2 py-1.5 gap-1">
            {navLinks.map((item) => {
              const active = location === item.href || (item.href !== "/" && location.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    active
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              href="/new-patient"
              className="rounded-full px-5 py-2.5 text-white text-sm font-semibold transition-all hover:bg-white/10"
              style={{ border: "1.5px solid rgba(255,255,255,0.35)" }}
            >
              New Patient
            </Link>
            <a
              href="https://healow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E7FFD9] rounded-full px-5 py-2.5 text-[#1D3A5F] text-sm font-semibold hover:brightness-110 transition-all"
            >
              Book Appointment
            </a>
          </div>

          <Link href="/" className="lg:hidden flex items-center">
            <img
              src="/images/logo-white-orig.png"
              alt="Synergy ENT & Wellness"
              className="h-9 w-auto max-w-[160px] object-contain"
              style={{ mixBlendMode: "screen" }}
            />
          </Link>
          <button
            className="lg:hidden bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2.5 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 transition-transform duration-500 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "linear-gradient(135deg, #0F2840 0%, #1D3A5F 100%)",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white text-2xl font-['Inter']"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://healow.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 bg-[#E7FFD9] text-[#1D3A5F] px-8 py-4 rounded-full font-semibold text-base hover:brightness-110 transition-all"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-[#1D3A5F] text-white/55">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="relative max-w-7xl mx-auto px-8 md:px-14 pt-14 pb-8 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img
              src="/images/logo-white-orig.png"
              alt="Synergy ENT & Wellness"
              className="h-10 w-auto max-w-[200px] object-contain"
              style={{ mixBlendMode: "screen" }}
            />
            <p className="text-sm leading-relaxed">
              Board-certified ENT and sleep medicine care — so you can feel like yourself again.
            </p>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-[#BBDBED] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Patient Resources</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "New Patient Info", href: "/new-patient" },
                { label: "Book Appointment", href: "https://healow.com" },
                { label: "Insurance Info", href: "/new-patient" },
                { label: "Contact Us", href: "/contact" },
              ].map((l) => (
                <li key={l.label} className="relative inline-block md:block">
                  <Link href={l.href} className="hover:text-[#BBDBED] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail size={16} className="text-[#BBDBED] shrink-0" />
                <a href="mailto:Info@synergyentwellness.com" className="hover:text-[#BBDBED] transition-colors">
                  Info@synergyentwellness.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={16} className="text-[#BBDBED] shrink-0" />
                <a href="tel:+12014534540" className="hover:text-[#BBDBED] transition-colors">
                  (201) 453-4540
                </a>
              </li>
              <li className="flex items-start justify-center md:justify-start gap-3">
                <MapPin size={16} className="text-[#BBDBED] shrink-0 mt-0.5" />
                <span>37 West Century Road, Suite 104<br />Paramus, NJ 07652</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-t border-white/10" />

        <div className="flex flex-col items-center md:flex-row md:justify-between py-6 text-sm text-white/40 gap-4">
          <div className="flex gap-5">
            {[Globe, Share2, AtSign, Rss, Mail].map((Icon, i) => (
              <a key={i} href="#" className="hover:text-[#BBDBED] transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p>© {new Date().getFullYear()} Synergy ENT &amp; Wellness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb: string;
}

export function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: 280,
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(10,25,50,0.85) 0%, rgba(29,58,95,0.78) 60%, rgba(15,40,64,0.85) 100%)",
        }}
      />
      <div className="relative z-10 text-center px-6 py-20 pt-28">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Link href="/" className="text-[#BBDBED]/70 text-sm hover:text-[#BBDBED] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#BBDBED]/40" />
          <span className="text-[#BBDBED] text-sm">{breadcrumb}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-['Inter'] text-white leading-tight">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[#1D3A5F] font-['Inter',sans-serif] selection:bg-[#809EB1] selection:text-[#1D3A5F]">
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />

      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{
          background: "linear-gradient(135deg, #0F2840 0%, #1D3A5F 100%)",
          padding: "12px 16px",
          paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
          boxShadow: "0 -8px 32px rgba(10,20,40,0.35)",
        }}
      >
        <div className="flex items-center gap-3">
          <a
            href="https://healow.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center rounded-full border border-white/60 py-3.5 text-white text-[13px] font-semibold uppercase tracking-widest transition-all active:scale-95"
            style={{ letterSpacing: "0.12em" }}
          >
            Book Appointment
          </a>
          <a
            href="tel:2014534540"
            className="flex items-center justify-center gap-2 rounded-full py-3.5 px-5 text-[13px] font-semibold uppercase tracking-widest transition-all active:scale-95"
            style={{ background: "#E7FFD9", color: "#1D3A5F", letterSpacing: "0.12em", flexShrink: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3.5 2h3l1.5 3.5-1.75 1.75a9.5 9.5 0 0 0 4.5 4.5L12.5 10l3.5 1.5v3A1.5 1.5 0 0 1 14.5 16C7.596 16 2 10.404 2 3.5A1.5 1.5 0 0 1 3.5 2z" fill="#1D3A5F" />
            </svg>
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
