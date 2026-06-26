import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Menu, X, ArrowRight, Ear, Stethoscope, Droplets, Mic2, Star, CheckCircle, MapPin, Phone, Mail, Zap, Play, TrendingUp, Activity, Search, ShoppingBag, Cross, ChevronDown, Globe, Share2, AtSign, Rss, Calendar } from "lucide-react";
import { GravityFormEmbed } from "../components/GravityFormEmbed";
import { asset, navItems, normalizeInternalPath, sitePath, wpData, type ButtonLink } from "../wp";

const specialties = [
  { icon: "🦻", label: "Hearing & Balance", link: { label: "Hearing & Balance", url: "/" } },
  { icon: "💧", label: "Sinusitis & Allergy", link: { label: "Sinusitis & Allergy", url: "/" } },
  { icon: "🩺", label: "Nasal Surgery", link: { label: "Nasal Surgery", url: "/" }, active: true },
  { icon: "🗣️", label: "Throat & Voice", link: { label: "Throat & Voice", url: "/" } },
  { icon: "🌙", label: "Sleep & Airway", link: { label: "Sleep & Airway", url: "/" } },
];

// Tick marks arranged in a semicircle on left and right, with gap at sides for the lists
function RadialTicks({ count = 60, radius = 340 }: { count?: number; radius?: number }) {
  const ticks = [];
  // Draw ticks from ~30deg to ~150deg (bottom arc) and 210deg to 330deg (top arc) — leaving gaps at 9 and 3 o'clock
  const gaps = [[75, 105], [255, 285]]; // degrees to skip (left/right list areas)
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 360;
    const inGap = gaps.some(([a, b]) => angle >= a && angle <= b);
    if (inGap) continue;
    const rad = (angle * Math.PI) / 180;
    const x1 = 50 + ((radius - 26) / radius) * 50 * Math.cos(rad);
    const y1 = 50 + ((radius - 26) / radius) * 50 * Math.sin(rad);
    const x2 = 50 + (radius / radius) * 50 * Math.cos(rad);
    const y2 = 50 + (radius / radius) * 50 * Math.sin(rad);
    ticks.push(
      <line
        key={i}
        x1={`${x1}%`} y1={`${y1}%`}
        x2={`${x2}%`} y2={`${y2}%`}
        stroke="#1D3A5F"
        strokeWidth={i % 5 === 0 ? "0.7" : "0.35"}
        strokeOpacity={i % 5 === 0 ? "0.25" : "0.12"}
      />
    );
  }
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      {ticks}
    </svg>
  );
}

function RadialSelectorSection({
  heading = "A Practice Built Around You",
  intro = "Synergy ENT & Wellness is led by Dr. Sara C. Scheid, MD - one of the few physicians in New Jersey board-certified in both Otolaryngology and Sleep Medicine.",
  items = specialties,
  button,
}: {
  heading?: string;
  intro?: string;
  items?: Array<{ icon?: string; label?: string; link?: ButtonLink; active?: boolean }>;
  button?: ButtonLink;
}) {
  const [activeIdx, setActiveIdx] = useState(2);
  const [rotation, setRotation] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-cycle every 2.5 s
  useEffect(() => {
    const id = setInterval(() => setActiveIdx(i => (i + 1) % items.length), 2500);
    return () => clearInterval(id);
  }, [items.length]);

  // Scroll-driven ring rotation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      setRotation(scrolled * 0.06);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance visibility via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white relative overflow-hidden py-32 md:py-48">
      {/* Radial ticks — rotates on scroll */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="relative w-[700px] h-[700px] max-w-full"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <RadialTicks count={80} radius={340} />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8 min-h-[420px]">

        {/* Left — specialty list — slides in from left */}
        <div
          className="hidden md:flex flex-col gap-3 w-52 shrink-0"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-36px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
          }}
        >
          {items.map((s, i) => {
            const dist = Math.abs(i - activeIdx);
            const opacity = dist === 0 ? 1 : dist === 1 ? 0.5 : 0.2;
            const scale = dist === 0 ? 1 : 0.95;
            return (
              <ActionLink
                key={i}
                link={s.link}
                onMouseEnter={() => setActiveIdx(i)}
                onFocus={() => setActiveIdx(i)}
                className="flex items-center gap-2.5 text-left transition-all duration-500 group"
                style={{ opacity, transform: `scale(${scale})` }}
              >
                {dist === 0 ? (
                  <div className="w-5 h-5 rounded-full bg-[#1D3A5F] flex items-center justify-center shrink-0">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="white"><polygon points="2,1 7,4 2,7"/></svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-[#1D3A5F]/30 shrink-0" />
                )}
                <span className={`text-sm font-medium ${dist === 0 ? "text-[#1D3A5F]" : "text-[#1D3A5F]/50"}`}>
                  {s.label}
                </span>
              </ActionLink>
            );
          })}
        </div>

        {/* Center — fades up */}
        <div
          className="flex-1 flex flex-col items-center text-center px-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.8s ease 0.25s, transform 0.8s cubic-bezier(0.34,1.2,0.64,1) 0.25s",
          }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Inter'] text-[#1D3A5F] leading-[1.1] mb-5 max-w-lg">
            {heading.split(" ").slice(0, -2).join(" ")}<br />
            <span className="italic">{heading.split(" ").slice(-2).join(" ")}</span>
          </h2>
          <p className="text-[#1D3A5F]/55 text-base md:text-lg mb-8 max-w-sm font-light leading-relaxed">
            {intro}
          </p>
          <ActionLink link={button} className="bg-[#E7FFD9] text-[#1D3A5F] px-8 py-3.5 rounded-full text-sm font-semibold hover:brightness-110 transition-all inline-flex justify-center">
            {button?.label ?? "Meet Dr. Scheid"} →
          </ActionLink>
        </div>

        {/* Right — insurance logos — slides in from right */}
        <div
          className="hidden md:flex flex-col gap-2.5 w-56 shrink-0"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(36px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
          }}
        >

          {[
            { src: asset("images/logo-horizon.png"), alt: "Horizon Blue Cross Blue Shield", h: 22 },
            { src: asset("images/logo-cigna.png"),   alt: "Cigna Healthcare",              h: 36 },
            { src: asset("images/logo-aetna.png"),   alt: "Aetna",                        h: 18 },
          ].map(({ src, alt, h }, i) => {
            const logoActive = activeIdx % 4;
            const dist = Math.abs(i - logoActive);
            const itemOpacity = dist === 0 ? 1 : dist === 1 ? 0.45 : 0.18;
            const itemScale = dist === 0 ? 1 : 0.95;
            return (
              <button
                key={alt}
                onClick={() => setActiveIdx(i)}
                className="flex items-center justify-center rounded-xl px-4 py-3 w-full transition-all duration-500"
                style={{
                  background: "none",
                  border: "none",
                  minHeight: 52,
                  opacity: visible ? itemOpacity : 0,
                  transform: visible
                    ? `translateX(0) scale(${itemScale})`
                    : `translateX(24px) scale(${itemScale})`,
                  transition: `opacity 0.5s ease ${0.15 + i * 0.08}s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.15 + i * 0.08}s`,
                }}
              >
                <img
                  src={src}
                  alt={alt}
                  style={{
                    height: h,
                    width: "auto",
                    maxWidth: "100%",
                    objectFit: "contain",
                    filter: "brightness(0) saturate(100%) invert(18%) sepia(40%) saturate(600%) hue-rotate(190deg) brightness(80%)",
                    opacity: dist === 0 ? 0.85 : 0.55,
                    transition: "opacity 0.4s ease",
                  }}
                />
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}

function splitHeroTitle(title: string) {
  const lines = title.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

  if (lines.length > 1) {
    return {
      lines: lines.slice(0, -1),
      highlight: lines.at(-1) ?? "",
    };
  }

  const singleLine = lines[0] ?? title.trim();
  const highlightMatch = singleLine.match(/\bwith\s+CPAP\??\s*$/i);

  if (!highlightMatch?.index) {
    return {
      lines: [],
      highlight: singleLine,
    };
  }

  return {
    lines: [singleLine.slice(0, highlightMatch.index).trim()],
    highlight: highlightMatch[0].trim(),
  };
}

function renderCalloutText(text: string) {
  const parts = text.split(/("[^"]+"|“[^”]+”)/g);

  return parts.map((part, index) => {
    const isQuoted = /^("[^"]+"|“[^”]+”)$/u.test(part);

    return isQuoted ? (
      <span key={`${part}-${index}`} className="italic text-[#809EB1]">
        {part}
      </span>
    ) : (
      <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
    );
  });
}

function useCountUp(target: number, duration = 1400, started = false) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);
  useEffect(() => {
    if (!started || hasRun.current) return;
    hasRun.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);
  return count;
}

function StatNumber({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const count = useCountUp(target, 1600, started);
  const formatted = target >= 1000 ? count.toLocaleString() : count;
  return <>{formatted}{suffix}</>;
}

function ActionLink({
  link,
  className,
  children,
  ...props
}: {
  link?: ButtonLink;
  className: string;
  children?: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const url = link?.url ?? "#";
  const label = children ?? link?.label;

  if (isExternalLink(url) || link?.target || url.includes("#")) {
    return <a href={url} target={link?.target || undefined} rel={link?.target ? "noopener noreferrer" : undefined} className={className} {...props}>{label}</a>;
  }

  return <Link href={normalizeInternalPath(url)} className={className} {...props}>{label}</Link>;
}

function AboutSection({
  heading = "Care That Takes You Seriously.",
  image = asset("images/dr-scheid-about.png"),
  imageAlt = "Dr. Sara Scheid",
  eyebrow = "Meet Dr. Scheid",
  doctorName = "Dr. Sara Scheid",
  doctorTitle = "Otolaryngologist & Sleep Specialist",
  body = [
    "Dr. Sara Scheid is a board-certified ENT and sleep medicine physician in Paramus, NJ, specializing in thoughtful evaluation of breathing, sleep, and airway-related concerns. She helps patients with nasal obstruction, chronic congestion, allergies, snoring, sleep apnea, CPAP intolerance, mouth breathing, throat clearing, reflux-related throat symptoms, and complex ENT/sleep issues that have not improved with standard treatment.",
    "As both an otolaryngologist and sleep medicine physician, Dr. Scheid is able to look beyond a single symptom and evaluate how the nose, throat, airway, sleep quality, allergies, reflux, and inflammation may be connected. Her approach is careful, educational, and personalized, with a focus on helping patients understand their symptoms and make confident decisions about next steps.",
    "At Synergy ENT & Wellness, patients receive unrushed, patient-driven care designed to provide solutions to help you breathe better, sleep better, and gain control of your health.",
  ],
  button,
  outsideHeading = "Outside the Office",
  outsideText = "Dr. Scheid is happily married and a proud mother of two college-aged children and two dogs. In her free time she enjoys hiking, skiing, reading, and spending time with her family.",
  credentials = [],
}: {
  heading?: string;
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  doctorName?: string;
  doctorTitle?: string;
  body?: string[];
  button?: ButtonLink;
  outsideHeading?: string;
  outsideText?: string;
  credentials?: Array<{ title?: string; items?: string[] }>;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // progress 0 when section top hits bottom of viewport, 1 when section top is at 30% of viewport
      const raw = 1 - rect.top / (windowH * 0.7);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger count-up once stats scroll into view
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const mx = lerp(48, 0, progress);
  const radius = lerp(32, 0, progress);
  const py = lerp(56, 80, progress);
  const px = lerp(40, 64, progress);

  return (
    <section ref={sectionRef} id="about" className="bg-white overflow-hidden" style={{ paddingTop: 64, paddingBottom: 64 }}>
      {/* Scroll-expand card */}
      <div
        className="text-white shadow-2xl relative"
        style={{
          marginLeft: mx,
          marginRight: mx,
          borderRadius: radius,
          paddingTop: py,
          paddingBottom: py,
          paddingLeft: px,
          paddingRight: px,
          transition: "border-radius 0.05s linear",
          overflow: "hidden",
          backgroundImage: `url('${asset("images/about-bg.jpg")}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(15,40,64,0.68) 0%, rgba(29,58,95,0.62) 60%, rgba(15,40,64,0.70) 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[#E7FFD9] font-semibold text-sm">—</span>
              <span className="uppercase tracking-widest text-sm font-semibold text-[#E7FFD9]">{eyebrow}</span>
            </div>
            <div className="aspect-[3/4] rounded-[20px] overflow-hidden relative">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-full object-cover object-top"
              />
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(160deg, rgba(10,20,40,0.18) 0%, rgba(10,20,40,0.04) 45%, rgba(10,20,40,0.22) 100%)",
                }}
              />
            </div>
            <div
              className="absolute bottom-3 right-3 p-3 md:-bottom-8 md:-right-8 md:p-8 rounded-[16px] md:rounded-[20px] text-[#1D3A5F] z-10"
              style={{
                background: "rgba(220, 237, 248, 0.82)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.85)",
                boxShadow: "0 4px 32px rgba(29,58,95,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <h3 className="text-base md:text-4xl font-['Inter'] mb-0.5 md:mb-1">{doctorName}</h3>
              <p className="font-medium text-xs md:text-base">{doctorTitle}</p>
            </div>
          </div>

          <div className="relative">
            {/* Decorative background square */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: "-32px",
                right: "-32px",
                bottom: "-32px",
                left: "-24px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            />
            <h2 className="relative z-10 text-2xl md:text-3xl font-['Inter'] leading-tight mb-6">
              {heading}
            </h2>
            {body.map((paragraph) => (
              <p key={paragraph} className="relative z-10 text-sm text-white/70 mb-5 font-light leading-relaxed">
                {paragraph}
              </p>
            ))}
            <ActionLink link={button} className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all inline-flex items-center gap-2">
              {button?.label ?? "Learn More About Dr. Scheid"} <ArrowRight className="w-4 h-4" />
            </ActionLink>

            {/* Credential sections */}
            <div className="relative z-10 mt-10 flex flex-col gap-7 border-t border-white/10 pt-8">

              {(credentials.length ? credentials : [
                {
                  title: "Board Certifications",
                  items: [
                    "Diplomate - American Board of Otolaryngology",
                    "Diplomate - American Board of Sleep Medicine",
                    "Fellow - American Academy of Pediatrics",
                  ],
                },
                {
                  title: "Education & Training",
                  items: [
                    "Dartmouth College (Undergraduate)",
                    "Rush Medical College, MD - Alpha Omega Alpha",
                    "Thomas Jefferson University Hospital (General Surgery Internship; Otolaryngology Residency)",
                    "St. Christopher's Hospital for Children (Pediatric Otolaryngology Fellowship)",
                  ],
                },
              ]).map((group) => (
                <div key={group.title}>
                  <p className="text-[#BBDBED] text-xs font-semibold uppercase tracking-widest mb-3">{group.title}</p>
                  <ul className="flex flex-col gap-1.5">
                    {(group.items ?? []).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/70 font-light leading-snug">
                      <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-[#E7FFD9]/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              ))}

              {/* Outside the Office */}
              <div>
                <p className="text-[#BBDBED] text-xs font-semibold uppercase tracking-widest mb-3">{outsideHeading}</p>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  {outsideText}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const defaultTestimonials = [
  {
    quote: "Dr. Scheid has been an enormous asset to my family for over ten years. Her skill and expertise is unparalleled — she goes above and beyond in every way.",
    name: "Long-Term Patient",
    procedure: "ENT & Sleep Care",
    initials: "LP",
    color: "#1D3A5F",
  },
  {
    quote: "She fixed my sinus problem that had been bothering me for years. I can't say enough good things about her and her staff.",
    name: "Sinus Patient",
    procedure: "Sinus Care",
    initials: "SP",
    color: "#809EB1",
  },
  {
    quote: "Dr. Scheid and her team worked so hard to make sure I was taken care of. I will be a patient here for life.",
    name: "Satisfied Patient",
    procedure: "ENT Care",
    initials: "SA",
    color: "#BBDBED",
  },
  {
    quote: "She is everything you want in a doctor. Caring, knowledgeable, and she truly loves what she does.",
    name: "Sleep Medicine Patient",
    procedure: "Sleep Medicine",
    initials: "SM",
    color: "#2A5080",
  },
];

function TestimonialsCarousel({
  eyebrow = "Testimonials",
  heading = "What Our Patients Say",
  items = defaultTestimonials,
}: {
  eyebrow?: string;
  heading?: string;
  items?: Array<{ quote?: string; name?: string; procedure?: string; initials?: string; color?: string }>;
}) {
  const [active, setActive] = useState(0);
  const testimonials = items.length ? items : defaultTestimonials;
  const count = testimonials.length;
  const prev = () => setActive(i => (i - 1 + count) % count);
  const next = () => setActive(i => (i + 1) % count);

  // Layout: 3-col grid — indices relative to active
  const cardOrder = [
    (active - 1 + count) % count,
    active,
    (active + 1) % count,
    (active + 2) % count,
    (active - 2 + count) % count,
    (active + 3) % count,
  ];

  return (
    <section className="relative bg-white py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      {/* Wave particle texture */}
      <img
        src={asset("images/wave-bg.jpg")}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ mixBlendMode: "multiply", opacity: 0.15 }}
      />
      {/* Section header */}
      <div className="relative z-10 max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-[#1D3A5F]" />
          <span className="text-[#1D3A5F] text-xs font-semibold uppercase tracking-widest">{eyebrow}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1D3A5F] leading-tight">{heading}</h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Quote */}
        <div className="max-w-3xl mx-auto">
          {/* Large quote mark */}
          <div className="text-[80px] leading-none text-[#1D3A5F] font-serif mb-4" style={{ fontFamily: "Georgia, serif" }}>"</div>

          <p className="text-2xl md:text-3xl font-['Inter'] text-[#1D3A5F] leading-snug mb-10 transition-all duration-500">
            {testimonials[active].quote}
          </p>

          <div className="flex items-center gap-3 mb-10">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: testimonials[active].color }}
            >
              {testimonials[active].initials}
            </div>
            <span className="text-[#1D3A5F] font-medium">{testimonials[active].name}</span>
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-[#1D3A5F]/20 flex items-center justify-center hover:bg-[#1D3A5F] hover:text-white hover:border-[#1D3A5F] transition-all group"
            >
              <ArrowRight className="w-4 h-4 rotate-180 text-[#1D3A5F] group-hover:text-white" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-[#1D3A5F]/20 flex items-center justify-center hover:bg-[#1D3A5F] hover:text-white hover:border-[#1D3A5F] transition-all group"
            >
              <ArrowRight className="w-4 h-4 text-[#1D3A5F] group-hover:text-white" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

function isExternalLink(url: string) {
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function FooterAnchor({ url, target, children }: { url: string; target?: string; children: React.ReactNode }) {
  if (isExternalLink(url) || target || url.includes("#")) {
    return <a href={url} target={target || undefined} rel={target ? "noopener noreferrer" : undefined} className="hover:text-[#BBDBED] transition-colors">{children}</a>;
  }

  return <Link href={normalizeInternalPath(url)} className="hover:text-[#BBDBED] transition-colors">{children}</Link>;
}

function socialIcon(icon?: string) {
  switch (icon) {
    case "share":
      return Share2;
    case "at":
      return AtSign;
    case "rss":
      return Rss;
    case "mail":
      return Mail;
    case "globe":
    default:
      return Globe;
  }
}

function SynergyTextHover() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPos, setMaskPos] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const cx = ((cursor.x - rect.left) / rect.width) * 100;
    const cy = ((cursor.y - rect.top) / rect.height) * 100;
    setMaskPos({ cx: `${cx}%`, cy: `${cy}%` });
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 800 160"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none cursor-pointer uppercase"
    >
      <defs>
        <linearGradient id="footerTextGradient" gradientUnits="userSpaceOnUse">
          {hovered && (
            <>
              <stop offset="0%"   stopColor="#BBDBED" />
              <stop offset="33%"  stopColor="#E7FFD9" />
              <stop offset="66%"  stopColor="#809EB1" />
              <stop offset="100%" stopColor="#BBDBED" />
            </>
          )}
        </linearGradient>
        <motion.radialGradient
          id="footerRevealMask"
          gradientUnits="userSpaceOnUse"
          r="18%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPos}
          transition={{ duration: 0, ease: "easeOut" }}
        >
          <stop offset="0%"   stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="footerTextMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#footerRevealMask)" />
        </mask>
      </defs>

      {/* Outline ghost (appears on hover) */}
      <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.5" fontSize="120" fontFamily="Inter, Helvetica, sans-serif" fontWeight="800"
        fill="transparent" stroke="rgba(187,219,237,0.12)"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}
      >
        SYNERGY
      </text>

      {/* Animated stroke draw-on */}
      <motion.text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.5" fontSize="120" fontFamily="Inter, Helvetica, sans-serif" fontWeight="800"
        fill="transparent" stroke="rgba(187,219,237,0.35)"
        initial={{ strokeDashoffset: 2000, strokeDasharray: 2000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 2000 }}
        transition={{ duration: 5, ease: "easeInOut" }}
      >
        SYNERGY
      </motion.text>

      {/* Hover gradient reveal */}
      <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.5" fontSize="120" fontFamily="Inter, Helvetica, sans-serif" fontWeight="800"
        fill="transparent" stroke="url(#footerTextGradient)"
        mask="url(#footerTextMask)"
      >
        SYNERGY
      </text>
    </svg>
  );
}

function BookingFormSection() {
  const homeContent = wpData().content?.home;
  const addressLines = (homeContent?.locationAddress ?? wpData().footer?.address ?? "37 West Century Rd, Suite 104\nParamus, NJ 07652").split(/\r?\n/).filter(Boolean);
  const formHtml = homeContent?.bookingFormShortcodeHtml || wpData().forms?.contact;

  return (
    <section
      id="book"
      className="relative overflow-hidden py-20 md:py-28 px-6 md:px-12"
      style={{ background: "linear-gradient(160deg, #EEF6FB 0%, #F8FBFD 60%, #EEF6FB 100%)" }}
    >
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #BBDBED 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start">
        <div className="lg:sticky lg:top-10">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1D3A5F]" />
            <span className="text-[#1D3A5F]/50 text-xs font-semibold uppercase tracking-widest">{homeContent?.bookingEyebrow ?? "Book Appointment"}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-['Inter'] text-[#1D3A5F] leading-tight mb-5">
            {(homeContent?.bookingHeading ?? "Request an Appointment").split(/\r?\n/).map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}
          </h2>
          <p className="text-[#1D3A5F]/55 font-light leading-relaxed mb-8 text-base">
            {homeContent?.bookingText ?? "Fill out the form and our team will be in touch within one business day to confirm your visit."}
          </p>
          <div className="space-y-4">
            <a href={`tel:${(wpData().phone ?? "+12014534540").replace(/[^0-9+]/g, "")}`} className="flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#1D3A5F] transition-colors" style={{ background: "rgba(29,58,95,0.08)" }}>
                <Phone className="w-4 h-4 text-[#1D3A5F] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-[#1D3A5F] font-semibold text-sm">{wpData().phone ?? "(201) 453-4540"}</p>
                <p className="text-[#1D3A5F]/40 text-xs font-light">{homeContent?.bookingPhoneLabel ?? "Call our office directly"}</p>
              </div>
            </a>
            <a href={`mailto:${wpData().email ?? "Info@synergyentwellness.com"}`} className="flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#1D3A5F] transition-colors" style={{ background: "rgba(29,58,95,0.08)" }}>
                <Mail className="w-4 h-4 text-[#1D3A5F] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-[#1D3A5F] font-semibold text-sm">{wpData().email ?? "Info@synergyentwellness.com"}</p>
                <p className="text-[#1D3A5F]/40 text-xs font-light">{homeContent?.bookingEmailLabel ?? "Email us any time"}</p>
              </div>
            </a>
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(29,58,95,0.08)" }}>
                <MapPin className="w-4 h-4 text-[#1D3A5F]" />
              </div>
              <div>
                <p className="text-[#1D3A5F] font-semibold text-sm">{addressLines[0] ?? "37 West Century Rd, Suite 104"}</p>
                <p className="text-[#1D3A5F]/40 text-xs font-light">{homeContent?.bookingAddressLabel ?? addressLines.slice(1).join(", ")}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 rounded-2xl px-5 py-4" style={{ background: "rgba(231,255,217,0.5)", border: "1px solid rgba(29,58,95,0.10)" }}>
            <p className="text-[#1D3A5F] text-sm font-semibold mb-1">{homeContent?.bookingNoticeHeading ?? "Out-of-network practice"}</p>
            <p className="text-[#1D3A5F]/55 text-xs font-light leading-relaxed">{homeContent?.bookingNoticeText ?? "We do not accept Medicare. Please contact your insurance to ask about out-of-network benefits before your visit."}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55 }}
          className="healen-booking-gform rounded-3xl p-8 md:p-10"
          style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", border: "1px solid rgba(29,58,95,0.10)", boxShadow: "0 8px 48px rgba(29,58,95,0.10)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-[#809EB1]" />
            <p className="text-[#1D3A5F] font-semibold text-sm">{homeContent?.bookingFormHeading ?? "Tell us about yourself"}</p>
          </div>
          <GravityFormEmbed html={formHtml} />
        </motion.div>
      </div>
    </section>
  );
}


export function LandingPage() {
  const [navOpacity, setNavOpacity] = useState(0);
  const [bentoProgress, setBentoProgress] = useState(0);
  const bentoRef = useRef<HTMLElement>(null);
  const [footerProgress, setFooterProgress] = useState(0);
  const footerRef = useRef<HTMLElement>(null);
  const [credBarProgress, setCredBarProgress] = useState(0);
  const credBarRef = useRef<HTMLDivElement>(null);
  const [whyCardsVisible, setWhyCardsVisible] = useState(false);
  const whyGridRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [ringOffset, setRingOffset] = useState(100.5);
  const [counterVal, setCounterVal] = useState(0);
  const navLinks = navItems();
  const portalLink = wpData().portalLink;
  const bookingLink = wpData().bookingLink ?? { url: wpData().bookingUrl ?? "https://healow.com", target: "_blank" };
  const footer = wpData().footer;
  const footerQuickLinks = footer?.quickLinks?.length ? footer.quickLinks.map((item) => ({
    label: item.label,
    href: item.url,
    target: item.target,
    external: isExternalLink(item.url),
  })) : navLinks;
  const footerResources = footer?.resources?.length ? footer.resources : [
    { label: "Request Appointment", url: bookingLink.url ?? "https://healow.com", target: bookingLink.target },
    { label: "Patient Portal", url: portalLink?.url ?? sitePath("/new-patient"), target: portalLink?.target },
    { label: "Insurance Info", url: "#insurance" },
  ];
  const footerSocialLinks = footer?.socialLinks?.length ? footer.socialLinks : [
    { label: "Email", url: `mailto:${wpData().email ?? "Info@synergyentwellness.com"}`, icon: "mail" },
  ];
  const homeContent = wpData().content?.home;
  const heroTitle = homeContent?.heroTitle ?? "Still congested, snoring,\ntired, or struggling\nwith CPAP?";
  const heroTitleParts = splitHeroTitle(heroTitle);
  const heroImage = homeContent?.heroImage ?? asset("images/hero-sleep.png");
  const credentialItems = homeContent?.credentials?.length ? homeContent.credentials : [
    { title: "Board Certified", text: "Otolaryngologist" },
    { title: "Sleep Medicine", text: "Certified Specialist" },
    { title: "20+ Years", text: "of Experience" },
    { title: "Accepting", text: "New Patients" },
  ];
  const credentialIcons = [
    <CheckCircle className="w-4 h-4" />,
    <Stethoscope className="w-4 h-4" />,
    <TrendingUp className="w-4 h-4" />,
    <Activity className="w-4 h-4" />,
  ];
  const specialtyItems = (homeContent?.specialties?.length ? homeContent.specialties : specialties).map((item, index) => ({
    icon: specialties[index]?.icon,
    label: item.label ?? specialties[index]?.label ?? "",
    link: item.link ?? specialties[index]?.link,
    active: specialties[index]?.active,
  }));
  const aboutBody = homeContent?.aboutBody?.length ? homeContent.aboutBody : [
    "Dr. Sara Scheid is a board-certified ENT and sleep medicine physician in Paramus, NJ, specializing in thoughtful evaluation of breathing, sleep, and airway-related concerns. She helps patients with nasal obstruction, chronic congestion, allergies, snoring, sleep apnea, CPAP intolerance, mouth breathing, throat clearing, reflux-related throat symptoms, and complex ENT/sleep issues that have not improved with standard treatment.",
    "As both an otolaryngologist and sleep medicine physician, Dr. Scheid is able to look beyond a single symptom and evaluate how the nose, throat, airway, sleep quality, allergies, reflux, and inflammation may be connected. Her approach is careful, educational, and personalized, with a focus on helping patients understand their symptoms and make confident decisions about next steps.",
    "At Synergy ENT & Wellness, patients receive unrushed, patient-driven care designed to provide solutions to help you breathe better, sleep better, and gain control of your health.",
  ];
  const serviceIcons = [
    <Stethoscope className="w-8 h-8" />,
    <Droplets className="w-8 h-8" />,
    <Activity className="w-8 h-8" />,
    <Search className="w-8 h-8" />,
    <Mic2 className="w-8 h-8" />,
    <Cross className="w-8 h-8" />,
  ];
  const homeServices = (homeContent?.services?.length ? homeContent.services : [
    { title: "Sleep Apnea, Snoring & CPAP Intolerance", text: "Evaluation for patients who continue to feel tired, congested, or frustrated despite CPAP or other sleep apnea treatment." },
    { title: "Nasal Obstruction & Chronic Congestion", text: "Assessment of nasal blockage, chronic congestion, sinus symptoms, mouth breathing, postnasal drip, allergies, and structural causes of poor nasal breathing." },
    { title: "ENT/Sleep Airway Evaluation", text: "A comprehensive look at how the nose, throat, airway, sleep quality, reflux, allergies, and inflammation may be connected." },
    { title: "Second Opinions", text: "For patients who have already tried treatment, had testing, or received recommendations but still do not have a clear answer." },
    { title: "Reflux & Throat Symptoms", text: "Evaluation of throat clearing, chronic cough, hoarseness, globus sensation, postnasal drip sensation, and reflux-related throat irritation." },
    { title: "Non-Surgical ENT & Sleep Care", text: "Thoughtful medical evaluation and management, with referral for surgical opinions when appropriate." },
  ]).map((service, index) => ({
    icon: serviceIcons[index] ?? <Stethoscope className="w-8 h-8" />,
    title: service.title ?? "",
    desc: service.text ?? "",
  }));
  const whyItems = (homeContent?.whyItems?.length ? homeContent.whyItems : [
    { title: "Patient-First Philosophy", text: "We take a holistic approach, searching for root causes and developing treatment plans tailored to your life." },
    { title: "Unrushed Appointments", text: "We moved away from corporate medicine to spend more time with you - listening, explaining, and partnering in your care." },
    { title: "Dual Board Certification", text: "Dual expertise in ENT and Sleep Medicine means comprehensive care for interconnected conditions under one roof." },
  ]).map((item, index) => ({
    icon: [<Cross className="w-5 h-5 text-[#BBDBED]" />, <Activity className="w-5 h-5 text-[#BBDBED]" />, <Stethoscope className="w-5 h-5 text-[#BBDBED]" />][index] ?? <CheckCircle className="w-5 h-5 text-[#BBDBED]" />,
    title: item.title ?? "",
    desc: item.text ?? "",
  }));
  const locationTags = (homeContent?.locationTags?.length ? homeContent.locationTags : [
    { label: "ENT" },
    { label: "Sleep Medicine" },
    { label: "Allergy" },
    { label: "Sinus Care" },
  ]).map((tag) => tag.label ?? "");

  useEffect(() => {
    const handleScroll = () => {
      setNavOpacity(Math.min(window.scrollY / 200, 1));
      if (bentoRef.current) {
        const rect = bentoRef.current.getBoundingClientRect();
        const raw = 1 - rect.top / (window.innerHeight * 0.75);
        setBentoProgress(Math.min(1, Math.max(0, raw)));
      }
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const raw = (window.innerHeight * 0.85 - rect.top) / (window.innerHeight * 0.65);
        const pageBottomReached = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
        setFooterProgress(pageBottomReached ? 1 : Math.min(1, Math.max(0, raw)));
      }
      if (credBarRef.current) {
        const rect = credBarRef.current.getBoundingClientRect();
        const raw = (window.innerHeight * 0.9 - rect.top) / (window.innerHeight * 0.5);
        setCredBarProgress(Math.min(1, Math.max(0, raw)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!whyGridRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setWhyCardsVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(whyGridRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setHeroReady(true);
      // Animate donut ring: dashoffset 100.5 → 16 over 1400ms cubic-ease-out
      const duration = 1400;
      const start = performance.now();
      const animRing = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setRingOffset(100.5 + (16 - 100.5) * ease);
        if (p < 1) requestAnimationFrame(animRing);
      };
      requestAnimationFrame(animRing);
      // Count up 0 → 98 over same duration
      let current = 0;
      const interval = setInterval(() => {
        current = Math.min(current + 2, 98);
        setCounterVal(current);
        if (current >= 98) clearInterval(interval);
      }, Math.round(duration / 49));
    }, 350);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#BBDBED] text-[#1D3A5F] font-['Inter',sans-serif] selection:bg-[#809EB1] selection:text-[#1D3A5F] overflow-x-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        .animate-ken-burns {
          animation: kenBurns 20s ease-out forwards;
        }
        @keyframes slideInTopRight {
          from { opacity: 0; transform: translate(32px, -32px) scale(0.92); }
          to   { opacity: 1; transform: translate(0, 0) scale(1); }
        }
        @keyframes slideInBottomLeft {
          from { opacity: 0; transform: translate(-32px, 32px) scale(0.92); }
          to   { opacity: 1; transform: translate(0, 0) scale(1); }
        }
        .card-top-right {
          opacity: 0;
        }
        .card-top-right.ready {
          animation: slideInTopRight 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s forwards;
        }
        .card-bottom-left {
          opacity: 0;
        }
        .card-bottom-left.ready {
          animation: slideInBottomLeft 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.65s forwards;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(48px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .why-card {
          opacity: 0;
          transform: translateY(56px) scale(0.95);
        }
        .why-card.visible {
          animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .why-card:nth-child(1).visible { animation-delay: 0ms; }
        .why-card:nth-child(2).visible { animation-delay: 160ms; }
        .why-card:nth-child(3).visible { animation-delay: 320ms; }
        .why-card:nth-child(4).visible { animation-delay: 480ms; }
        /* Icon pulse glow */
        @keyframes iconPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(187,219,237,0); transform: scale(1); }
          50% { box-shadow: 0 0 0 10px rgba(187,219,237,0.08), 0 0 24px 4px rgba(187,219,237,0.12); transform: scale(1.06); }
        }
        .why-icon-box {
          animation: iconPulse 3.6s ease-in-out infinite;
        }
        .why-card:nth-child(2) .why-icon-box { animation-delay: 1.2s; }
        .why-card:nth-child(3) .why-icon-box { animation-delay: 2.4s; }
        /* Beam sweep */
        @keyframes beamSweep {
          0%   { transform: translateX(-120%) skewX(-12deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(220%) skewX(-12deg); opacity: 0; }
        }
        .why-beam {
          pointer-events: none;
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .why-beam::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          left: 0;
          width: 30%;
          background: linear-gradient(90deg, transparent, rgba(187,219,237,0.07) 40%, rgba(187,219,237,0.13) 50%, rgba(187,219,237,0.07) 60%, transparent);
          animation: beamSweep 2.4s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
        }
        /* Ambient orb drift */
        @keyframes orbDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.12); }
        }
        @keyframes orbDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 20px) scale(0.92); }
        }
        .why-orb-1 { animation: orbDrift1 9s ease-in-out infinite; }
        .why-orb-2 { animation: orbDrift2 11s ease-in-out infinite 1.5s; }
        /* Connector line draw */
        @keyframes lineDraw {
          from { width: 0; opacity: 0; }
          to   { width: 100%; opacity: 1; }
        }
        .why-connector {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(187,219,237,0.2) 20%, rgba(187,219,237,0.35) 50%, rgba(187,219,237,0.2) 80%, transparent);
          width: 0; opacity: 0;
        }
        .why-connector.visible {
          animation: lineDraw 1s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
        }
        @keyframes rotateHead {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(360deg); }
        }
        .why-card-image {
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease;
          cursor: pointer;
        }
        .why-card-image:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 24px 56px rgba(29,58,95,0.28);
        }
        .why-card-image:hover img {
          transform: scale(1.05);
        }
        .why-card-image img {
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .why-card-article {
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
          cursor: pointer;
        }
        .why-card-article:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(29,58,95,0.15);
        }
        .why-card-article:hover .arrow-btn {
          background: #1D3A5F;
        }
        .why-card-article:hover .arrow-btn svg {
          color: white;
        }
        .arrow-btn {
          transition: background 0.3s ease;
        }
      `}</style>

      {/* Navigation — Medora glassmorphism style */}
      <nav
        className="fixed w-full z-50 px-6 md:px-10 py-4 transition-colors duration-100"
        style={{ top: 0, backgroundColor: `rgba(29, 58, 95, ${navOpacity})`, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="#" className="hidden lg:flex items-center shrink-0">
            <img src={asset("images/logo-white-orig.png")} alt="Synergy ENT & Wellness" className="h-12 w-auto max-w-[260px] object-contain" style={{ mixBlendMode: 'screen' }} />
          </a>

          {/* Center nav links pill */}
          <div className="hidden lg:flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-2 py-1.5 gap-1">
            {navLinks.map((item) => (
              item.external || item.href.includes("#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.target}
                  rel={item.target ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all text-white/70 hover:text-white hover:bg-white/10"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all text-white/70 hover:text-white hover:bg-white/10"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* Right group */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <a href={portalLink?.url ?? "#"} target={portalLink?.target} rel={portalLink?.target ? "noopener noreferrer" : undefined} className="rounded-full px-5 py-2.5 text-white text-sm font-semibold transition-all hover:bg-white/10" style={{ border: "1.5px solid rgba(255,255,255,0.35)" }}>
              Patient Portal
            </a>
            <a href={bookingLink.url ?? "https://healow.com"} target={bookingLink.target} rel={bookingLink.target ? "noopener noreferrer" : undefined} className="bg-[#E7FFD9] rounded-full px-5 py-2.5 text-[#1D3A5F] text-sm font-semibold hover:brightness-110 transition-all">
              Book Appointment
            </a>
          </div>

          {/* Mobile: logo + hamburger */}
          <a href="#" className="lg:hidden flex items-center">
            <img src={asset("images/logo-white-orig.png")} alt="Synergy ENT & Wellness" className="h-9 w-auto max-w-[180px] object-contain" style={{ mixBlendMode: 'screen' }} />
          </a>
          <button
            className="lg:hidden bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2.5 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 transition-transform duration-500 ease-in-out lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ backgroundImage: `url('${asset("images/hero-bg.jpg")}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {navLinks.map((item) =>
            item.external || item.href.includes("#") ? (
              <a key={item.label} href={item.href} target={item.target} rel={item.target ? "noopener noreferrer" : undefined} className="text-white text-2xl font-['Inter']" onClick={() => setMobileMenuOpen(false)}>{item.label}</a>
            ) : (
              <Link key={item.label} href={item.href} className="text-white text-2xl font-['Inter']" onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>
            )
          )}
          <a
            href={bookingLink.url ?? "https://healow.com"}
            target={bookingLink.target}
            rel={bookingLink.target ? "noopener noreferrer" : undefined}
            className="mt-6 bg-[#E7FFD9] text-[#1D3A5F] px-8 py-4 rounded-full font-semibold text-base hover:brightness-110 transition-all"
          >
            Book Appointment
          </a>
        </div>
      </div>

      {/* Hero Section — Medora style */}
      <section id="home" className="relative w-full overflow-hidden flex flex-col" style={{ backgroundImage: `url('${asset("images/hero-bg.jpg")}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(29,58,95,0.72) 0%, rgba(42,80,128,0.55) 50%, rgba(128,158,177,0.35) 100%)" }} />
        {/* Decorative dot-grid background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #809EB1 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        {/* Glow blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "#809EB1" }} />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#E7FFD9" }} />
        {/* NJ outline — decorative, behind doctor column */}
        <img
          src={asset("images/nj-outline.png")}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            top: '10%',
            left: '46%',
            width: '320px',
            opacity: 0.12,
            mixBlendMode: 'screen',
            transform: 'rotate(-4deg)',
          }}
        />

        {/* Main content */}
        <div className="relative z-20 flex-1 flex items-center max-w-7xl mx-auto w-full px-6 md:px-12 pt-24 pb-6">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-center w-full">

            {/* Left column — text */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-['Inter'] text-white leading-[1.1] mb-3">
                {heroTitleParts.lines.map((line) => (
                  <React.Fragment key={line}>{line}<br /></React.Fragment>
                ))}
                <span className="text-[#E7FFD9]" style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 700 }}>
                  {heroTitleParts.highlight || "with CPAP?"}
                </span>
              </h1>

              <p className="text-white/80 text-base font-medium mb-3 max-w-lg">
                {homeContent?.heroIntro ?? "Board-certified ENT and sleep medicine care - so you can feel like yourself again."}
              </p>

              <p className="healen-home-hero-body text-white/80 text-sm font-light leading-relaxed mb-4 max-w-lg">
                {homeContent?.heroBody ?? "Dr. Sara Scheid is a board-certified sleep medicine and otolaryngology physician helping patients understand why they cannot breathe or sleep well - and what to do next."}
              </p>

              <div className="flex flex-col items-stretch gap-3 w-full max-w-xs">
                <ActionLink link={homeContent?.heroButton} className="healen-home-hero-cta bg-[#E7FFD9] text-[#1D3A5F] px-7 py-4 rounded-full font-semibold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#E7FFD9]/80 w-full text-center">
                  {homeContent?.heroButton?.label ?? "Schedule a Consultation"}
                </ActionLink>
              </div>
            </div>

            {/* Right column — doctor + floating cards */}
            <div className="relative flex justify-center lg:justify-end items-end" style={{ minHeight: '460px' }}>

              {/* Hero sleep image */}
              <img
                src={heroImage}
                alt={homeContent?.heroImageAlt ?? "Restful sleep"}
                className="h-[560px] w-auto object-contain drop-shadow-2xl relative z-10 mx-auto"
                style={{ filter: "drop-shadow(0 30px 80px rgba(0,0,0,0.45))" }}
              />

            </div>
          </div>
        </div>

        {/* Gradient fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.6) 60%, white 100%)" }} />

      </section>

      {/* Credential bar — scroll-expand floating pill */}
      <div
        className="bg-white overflow-hidden"
        style={{
          paddingTop: `${(1 - credBarProgress) * 20}px`,
          paddingBottom: `${(1 - credBarProgress) * 20}px`,
        }}
      >
        <div
          ref={credBarRef}
          className="grid grid-cols-2 md:flex md:flex-row md:items-center md:justify-between px-8 py-5"
          style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: `${(1 - credBarProgress) * 24}px`,
            marginLeft: `${(1 - credBarProgress) * 48}px`,
            marginRight: `${(1 - credBarProgress) * 48}px`,
            boxShadow: credBarProgress < 1
              ? "0 8px 40px rgba(29,58,95,0.10), 0 1px 0 rgba(255,255,255,0.8) inset"
              : "none",
            border: `1px solid rgba(29,58,95,${(1 - credBarProgress) * 0.08})`,
            transition: "box-shadow 0.05s, border 0.05s",
          }}
        >
          {credentialItems.map((item, i, arr) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-3 justify-center md:flex-1 py-3 md:py-0">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(29,58,95,0.07)" }}>
                  <span className="text-[#1D3A5F]">{credentialIcons[i] ?? <CheckCircle className="w-4 h-4" />}</span>
                </div>
                <div>
                  <p className="text-[#1D3A5F] font-semibold text-sm leading-tight">{item.title}</p>
                  <p className="text-[#809EB1] text-xs leading-tight">{item.text}</p>
                </div>
              </div>
              {i < arr.length - 1 && (
                <div className="hidden md:block w-px h-8 bg-[#1D3A5F]/10 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Radial Selector Section */}
      <RadialSelectorSection
        heading={homeContent?.practiceHeading}
        intro={homeContent?.practiceIntro}
        items={specialtyItems}
        button={homeContent?.practiceButton}
      />

      {/* About/Stats Section */}
      <AboutSection
        heading={homeContent?.aboutHeading}
        image={homeContent?.aboutImage}
        imageAlt={homeContent?.aboutImageAlt}
        eyebrow={homeContent?.aboutEyebrow}
        doctorName={homeContent?.aboutDoctorName}
        doctorTitle={homeContent?.aboutDoctorTitle}
        body={aboutBody}
        button={homeContent?.aboutButton}
        outsideHeading={homeContent?.aboutOutsideHeading}
        outsideText={homeContent?.aboutOutsideText}
        credentials={homeContent?.aboutCredentials}
      />

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-12" style={{ background: "linear-gradient(to bottom, #ffffff 0%, #BBDBED 100%)" }}>
        <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#1D3A5F]"></div>
              <span className="uppercase tracking-widest text-sm font-semibold">{homeContent?.servicesEyebrow ?? "Services"}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-['Inter'] leading-tight mb-8">
              {homeContent?.servicesHeading ?? "Specialized Care for Every ENT & Sleep Need"}
            </h2>
            <p className="text-lg text-black/60 mb-8 font-light">
              {homeContent?.servicesIntro ?? "From ear infections to obstructive sleep apnea, we treat the full spectrum of ear, nose, throat, and sleep concerns."}
            </p>
            <ActionLink link={homeContent?.servicesButton} className="inline-flex items-center gap-2 font-semibold border-b-2 border-[#1D3A5F] pb-1 hover:text-[#1D3A5F]/60 hover:border-[#1D3A5F]/60 transition-colors">
              {homeContent?.servicesButton?.label ?? "View All Services"} <ArrowRight className="w-4 h-4" />
            </ActionLink>

          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {homeServices.map((service, i) => (
              <div 
                key={i} 
                className="bg-white p-8 rounded-[20px] border border-[#1D3A5F]/5 hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md group"
              >
                <div className="w-16 h-16 rounded-full bg-[#BBDBED] flex items-center justify-center text-[#1D3A5F] mb-6 group-hover:bg-[#809EB1] group-hover:scale-110 transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-['Inter'] mb-3">{service.title}</h3>
                <p className="text-black/60 font-light leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* Callout Statement */}
      <section className="bg-white px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-['Inter'] text-[#1D3A5F] leading-snug mb-6">
            {renderCalloutText(homeContent?.callout ?? 'You may have been told your sleep study is "treated," your sinuses are "fine," or your symptoms are "just allergies" — but you still cannot breathe or sleep well.')}
          </p>
          <p className="text-lg text-[#1D3A5F]/60 font-light leading-relaxed max-w-2xl mx-auto">
            {homeContent?.calloutSubtext ?? "A focused ENT/sleep airway evaluation can help connect the dots."}
          </p>
        </div>
      </section>

      {/* Bento Highlights Section */}
      <section ref={bentoRef} className="overflow-hidden" style={{ background: "#BBDBED", paddingTop: `${(1 - bentoProgress) * 64}px`, paddingBottom: `${(1 - bentoProgress) * 64}px` }}>
        {/* Floating card — expands to full-bleed on scroll */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #2A5080 0%, #1D3A5F 60%, #0F2840 100%)",
            borderRadius: `${(1 - bentoProgress) * 32}px`,
            boxShadow: bentoProgress < 1 ? "0 32px 80px rgba(15,40,64,0.45), 0 8px 24px rgba(15,40,64,0.25)" : "none",
            marginLeft: `${(1 - bentoProgress) * 48}px`,
            marginRight: `${(1 - bentoProgress) * 48}px`,
            padding: `${32 + bentoProgress * 16}px ${(1 - bentoProgress) * 40 + bentoProgress * 80}px`,
          }}
        >
          {/* Ambient drifting orbs */}
          <div className="why-orb-1 absolute pointer-events-none" style={{ top: "-20%", left: "10%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(187,219,237,0.14) 0%, transparent 70%)", filter: "blur(2px)" }} />
          <div className="why-orb-2 absolute pointer-events-none" style={{ bottom: "-30%", right: "5%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(187,219,237,0.10) 0%, transparent 70%)", filter: "blur(2px)" }} />

          {/* Beam sweep overlay */}
          {whyCardsVisible && <div className="why-beam" />}

          {/* Why Choose Us — 3-col feature strip inside the same card */}
          <div className="relative z-10">
            <div className="text-center mb-10">
              <p className="uppercase tracking-widest text-xs font-semibold text-[#BBDBED]/70 mb-3">{homeContent?.whyEyebrow ?? "Why Choose Us"}</p>
              <h2 className="text-3xl md:text-4xl font-['Inter'] text-white leading-tight">
                {homeContent?.whyHeading ?? "A Different Approach to ENT Care"}
              </h2>
            </div>

            {/* Connector line between cards */}
            <div className={`why-connector mx-auto mb-10 max-w-xl${whyCardsVisible ? " visible" : ""}`} />

            <div ref={whyGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {whyItems.map((item, i) => (
                <div
                  key={i}
                  className={`why-card flex flex-col items-center gap-4${whyCardsVisible ? " visible" : ""}`}
                  style={{ animationDelay: `${i * 160}ms` }}
                >
                  <div className="why-icon-box w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(187,219,237,0.12)", animationDelay: `${i * 1.2}s` }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base mb-1.5">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA buttons */}
            <div className="relative z-10 flex flex-col items-center gap-3 mt-12">
              <ActionLink link={homeContent?.whyPrimaryButton} className="bg-[#E7FFD9] text-[#1D3A5F] font-semibold text-sm px-6 py-2.5 rounded-full hover:brightness-110 transition-all shadow-lg w-48 text-center">
                {homeContent?.whyPrimaryButton?.label ?? "Get Started"}
              </ActionLink>
              <ActionLink link={homeContent?.whySecondaryButton} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium text-sm px-6 py-2.5 rounded-full hover:bg-white/20 transition-all w-48 text-center">
                {homeContent?.whySecondaryButton?.label ?? "Learn More"}
              </ActionLink>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials — Carousel */}
      <TestimonialsCarousel
        eyebrow={homeContent?.testimonialsEyebrow}
        heading={homeContent?.testimonialsHeading}
        items={homeContent?.testimonials}
      />

      {/* Photo Banner Card + Insurance Strip — unified card */}
      <section className="relative py-10 px-6 md:px-16 overflow-hidden" style={{ background: "#F5F5F3" }}>
        <img src={asset("images/ent-about-doctor-orig.png")} alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "50% 18%", filter: "blur(18px) saturate(1.2) brightness(0.9)", transform: "scale(1.08)" }} />
        <div className="absolute inset-0" style={{ background: "rgba(245,245,243,0.35)" }} />
        <motion.div
          className="relative overflow-hidden rounded-3xl"
          style={{ border: "1px solid rgba(187,219,237,0.18)", boxShadow: "0 8px 48px rgba(10,20,40,0.28), inset 0 1px 0 rgba(255,255,255,0.1)", background: "#0F2840" }}
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Left — insurance info */}
            <div className="flex flex-col justify-center px-10 py-8 gap-5 md:w-5/12 border-r border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E7FFD9]" />
                <span className="text-[#BBDBED] text-xs font-semibold uppercase tracking-widest">{homeContent?.insuranceEyebrow ?? "Insurance"}</span>
              </div>
              <p className="text-white text-lg font-semibold leading-snug">
                {homeContent?.insuranceHeading ?? "We work with most insurance plans."}
              </p>
              <p className="text-white/55 text-sm font-light leading-relaxed">
                {homeContent?.insuranceText ?? "Synergy ENT & Wellness is an out-of-network practice. We are happy to provide documentation to help you submit claims to your insurance carrier for potential reimbursement."}
              </p>
              <ActionLink link={homeContent?.insuranceContactLink} className="self-start text-[#E7FFD9] text-sm font-semibold inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                {homeContent?.insuranceContactLink?.label ?? "Questions about coverage? Contact us"} <ArrowRight className="w-3.5 h-3.5" />
              </ActionLink>
            </div>
            {/* Dot divider */}
            <div className="hidden md:flex flex-col items-center justify-center gap-1.5 px-4">
              {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#BBDBED]/30" />)}
            </div>
            {/* Right — banner content */}
            <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-10 md:flex-1">
              <p className="text-white text-2xl md:text-3xl font-bold leading-snug mb-5">
                {homeContent?.bannerHeading ?? "Synergy ENT addresses what traditional care overlooks. How you actually feel."}
              </p>
              <ActionLink link={homeContent?.bannerButton} className="self-start inline-flex items-center gap-2 bg-white text-[#1D3A5F] font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-[#E7FFD9] transition-all shadow-md">
                {homeContent?.bannerButton?.label ?? "Book my appointment"}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" stroke="#1D3A5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </ActionLink>
              <p className="mt-3 text-white/50 text-xs flex items-center gap-1.5 whitespace-nowrap">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0"><circle cx="7" cy="7" r="6.5" stroke="rgba(255,255,255,0.4)"/><path d="M4 7.5a3 3 0 0 0 6 0" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round"/><circle cx="7" cy="4.5" r="1" fill="rgba(255,255,255,0.5)"/></svg>
                {homeContent?.bannerNote ?? "Now accepting new patients in Paramus, NJ"}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-6 md:px-16" style={{ background: "#F5F5F3" }}>
        {/* Header */}
        <div className="mb-10">
          <p className="text-[#809EB1] text-xs font-semibold uppercase tracking-widest mb-2">{homeContent?.locationEyebrow ?? "Visit Us"}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1D3A5F]">{homeContent?.locationHeading ?? "Our Location"}</h2>
        </div>

        {/* Map + Card row */}
        <div className="flex flex-col md:flex-row gap-5" style={{ minHeight: 420 }}>

          {/* Map — left 2/3 */}
          <div className="flex-1 md:flex-[2] rounded-2xl overflow-hidden relative" style={{ minHeight: 360, boxShadow: "0 4px 32px rgba(29,58,95,0.10)" }}>
            <iframe
              title="Synergy ENT location map"
              src={homeContent?.locationMapEmbed ?? "https://www.openstreetmap.org/export/embed.html?bbox=-74.1810%2C40.8912%2C-73.9810%2C40.9912&layer=mapnik&marker=40.9512%2C-74.0710"}
              className="absolute inset-0 w-full h-full border-0"
              style={{ filter: "saturate(0.85) contrast(1.05)" }}
              loading="lazy"
            />
            {/* Pin overlay label */}
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5Z" fill="#1D3A5F"/><circle cx="8" cy="6" r="1.5" fill="white"/></svg>
              <span className="text-[#1D3A5F] text-xs font-semibold">{homeContent?.locationCity ?? "Paramus"}, {homeContent?.locationState ?? "NJ"}</span>
            </div>
          </div>

          {/* Location card — right 1/3 */}
          <div className="md:flex-1 rounded-2xl overflow-hidden flex flex-col" style={{ background: "#1D3A5F", boxShadow: "0 4px 32px rgba(29,58,95,0.18)" }}>
            {/* Card header */}
            <div className="px-8 pt-8 pb-5 border-b border-white/10">
              <p className="text-[#BBDBED] text-xs font-bold uppercase tracking-widest mb-1">{homeContent?.locationRegion ?? "New Jersey"}</p>
              <h3 className="text-white text-2xl font-bold mb-3">{homeContent?.locationCity ?? "Paramus"}</h3>
              <div className="flex items-start gap-2 text-white/70 text-sm mb-1.5">
                <svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1A4 4 0 0 1 11 5c0 2.667-4 8-4 8S3 7.667 3 5a4 4 0 0 1 4-4Z" fill="rgba(187,219,237,0.7)"/><circle cx="7" cy="5" r="1.5" fill="#1D3A5F"/></svg>
                <span>{(homeContent?.locationAddress ?? "37 West Century Road, Suite 104\nParamus, NJ 07652").split(/\r?\n/).map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <svg className="shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="2" stroke="rgba(187,219,237,0.7)" strokeWidth="1.2"/><path d="M5 2v2M9 2v2M2 6h10" stroke="rgba(187,219,237,0.7)" strokeWidth="1.2" strokeLinecap="round"/></svg>
                <span>{homeContent?.locationHours ?? "Mon - Fri: 9am - 5pm"}</span>
              </div>
            </div>

            {/* Specialty tags */}
            <div className="px-8 py-5 border-b border-white/10 flex flex-wrap gap-2">
              {locationTags.map(tag => (
                <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: "rgba(187,219,237,0.12)", color: "#BBDBED", border: "1px solid rgba(187,219,237,0.18)" }}>{tag}</span>
              ))}
            </div>

            {/* Phone */}
            <div className="px-8 py-5 border-b border-white/10">
              <p className="text-[#BBDBED] text-xs uppercase tracking-widest mb-1">{homeContent?.locationPhoneLabel ?? "Phone"}</p>
              <a href={`tel:${(wpData().phone ?? "+12014534540").replace(/[^0-9+]/g, "")}`} className="text-white font-semibold text-sm hover:text-[#E7FFD9] transition-colors">{wpData().phone ?? "(201) 453-4540"}</a>
            </div>

            {/* Action buttons */}
            <div className="px-8 py-6 mt-auto grid grid-cols-3 gap-3">
              {[
                { icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2a5 5 0 0 1 5 5c0 3.5-5 10-5 10S4 10.5 4 7a5 5 0 0 1 5-5Z" stroke="white" strokeWidth="1.4"/><circle cx="9" cy="7" r="1.8" stroke="white" strokeWidth="1.4"/></svg>, link: homeContent?.locationDirectionsLink, fallbackLabel: homeContent?.locationDirectionsLabel ?? "Directions" },
                { icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4a1 1 0 0 1 1-1h2l1.5 3.5-1.5 1c.8 1.5 2 2.7 3.5 3.5l1-1.5L15 11v2a1 1 0 0 1-1 1A10 10 0 0 1 4 5V4Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/></svg>, link: homeContent?.locationPhoneLink, fallbackLabel: homeContent?.locationCallLabel ?? "Call Now" },
                { icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="3" width="12" height="12" rx="2" stroke="white" strokeWidth="1.4"/><path d="M6 3v2M12 3v2M3 8h12" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></svg>, link: homeContent?.locationBookLink, fallbackLabel: homeContent?.locationBookLabel ?? "Book Now" },
              ].map(({ icon, link, fallbackLabel }) => (
                <ActionLink key={fallbackLabel} link={link} className="flex flex-col items-center gap-2 py-3 rounded-xl transition-all" 
                  onMouseOver={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                  onMouseOut={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" } as React.CSSProperties}>
                  {icon}
                  <span className="text-white/70 text-xs font-medium">{link?.label ?? fallbackLabel}</span>
                </ActionLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Book Appointment Form */}
      <BookingFormSection />

      {/* CTA Banner */}
      <section className="relative overflow-hidden py-0 px-0" style={{ background: "linear-gradient(135deg, #0F2840 0%, #1D3A5F 60%, #2A5080 100%)" }}>
        {/* Ambient glow */}
        <div className="absolute pointer-events-none" style={{ top: "10%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(187,219,237,0.10) 0%, transparent 70%)", filter: "blur(2px)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-0 items-end min-h-[480px]">

          {/* Left — text + buttons */}
          <div className="py-20 md:py-28 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Inter'] text-white leading-[1.1] mb-6">
              {homeContent?.ctaHeading ?? "Ready to Breathe Better"}<br />
              <span className="text-[#E7FFD9]" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>{homeContent?.ctaHighlight ?? "and Sleep Sounder?"}</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-lg font-light leading-relaxed">
              {homeContent?.ctaText ?? "New and returning patients are welcome. Reach out today to schedule your appointment with Dr. Scheid at our Paramus, NJ office."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ActionLink link={homeContent?.ctaPrimaryButton} className="bg-[#E7FFD9] text-[#1D3A5F] px-8 py-4 rounded-full font-semibold text-base hover:brightness-110 transition-all inline-flex items-center gap-2 shadow-lg justify-center">
                {homeContent?.ctaPrimaryButton?.label ?? "Request an Appointment"} <ArrowRight className="w-4 h-4" />
              </ActionLink>
              <ActionLink link={homeContent?.ctaSecondaryButton} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/20 transition-all inline-flex justify-center">
                {homeContent?.ctaSecondaryButton?.label ?? "Call Our Office"}
              </ActionLink>
            </div>
          </div>

          {/* Right — sleep image anchored to bottom */}
          <div className="relative flex items-end justify-center lg:justify-end h-full">
            <img
              src={homeContent?.ctaImage ?? asset("images/hero-sleep.png")}
              alt={homeContent?.ctaImageAlt ?? "Restful sleep"}
              className="w-auto object-contain select-none pointer-events-none"
              style={{
                maxHeight: 460,
                filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.5))",
              }}
            />
          </div>

        </div>
      </section>

      {/* Footer — scroll-expand floating card */}
      <footer
        ref={footerRef}
        className="relative overflow-hidden"
        style={{
          background: "#1D3A5F",
          borderRadius: `${(1 - footerProgress) * 32}px`,
          marginLeft: `${(1 - footerProgress) * 24}px`,
          marginRight: `${(1 - footerProgress) * 24}px`,
          marginBottom: `${(1 - footerProgress) * 24}px`,
          transition: "border-radius 0.05s, margin 0.05s",
        }}
      >
        {/* Subtle dot texture overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 pt-14 pb-0 text-center md:text-left">

          {/* 4-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 text-white/55">

            {/* Brand */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <img src={footer?.logo ?? asset("images/logo-white-orig.png")} alt={wpData().siteName ?? "Synergy ENT & Wellness"} className="h-10 w-auto max-w-[200px] object-contain" style={{ mixBlendMode: 'screen' }} />
              <p className="text-sm leading-relaxed">
                {footer?.text ?? "Board-certified ENT and sleep medicine care - so you can feel like yourself again."}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-6">{footer?.quickHeading ?? "Quick Links"}</h4>
              <ul className="space-y-3 text-sm">
                {footerQuickLinks.map((l) => (
                  <li key={l.label}>
                    {l.external || l.href.includes("#") ? (
                      <a href={l.href} target={l.target} rel={l.target ? "noopener noreferrer" : undefined} className="hover:text-[#BBDBED] transition-colors">{l.label}</a>
                    ) : (
                      <Link href={normalizeInternalPath(l.href)} className="hover:text-[#BBDBED] transition-colors">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Helpful Links */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-6">{footer?.resourceHeading ?? "Patient Resources"}</h4>
              <ul className="space-y-3 text-sm">
                {footerResources.map((l) => (
                  <li key={l.label} className="relative inline-block md:block">
                    <FooterAnchor url={l.url} target={l.target}>{l.label}</FooterAnchor>
                    {l.label.toLowerCase().includes("portal") && <span className="inline-block ml-2 w-2 h-2 rounded-full bg-[#BBDBED] animate-pulse align-middle" />}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-6">{footer?.contactHeading ?? "Contact Us"}</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <Mail size={16} className="text-[#BBDBED] shrink-0" />
                  <a href={`mailto:${wpData().email ?? "Info@synergyentwellness.com"}`} className="hover:text-[#BBDBED] transition-colors">{wpData().email ?? "Info@synergyentwellness.com"}</a>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <Phone size={16} className="text-[#BBDBED] shrink-0" />
                  <a href={`tel:${(wpData().phone ?? "+12014534540").replace(/[^0-9+]/g, "")}`} className="hover:text-[#BBDBED] transition-colors">{wpData().phone ?? "(201) 453-4540"}</a>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <MapPin size={16} className="text-[#BBDBED] shrink-0" />
                  <span>{(footer?.address ?? "37 West Century Road, Suite 104\nParamus, NJ 07652").split(/\r?\n/).map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-t border-white/10" />

          {/* Bottom bar */}
          <div className="flex flex-col items-center md:flex-row md:justify-between py-6 text-sm text-white/40 gap-4">
            <div className="flex gap-5">
              {footerSocialLinks.map((link) => {
                const Icon = socialIcon(link.icon);
                return <a key={link.url} href={link.url} aria-label={link.label || link.icon || "Social link"} className="hover:text-[#BBDBED] transition-colors"><Icon size={18} /></a>;
              })}
            </div>
            <p>{footer?.copyright ?? `© ${new Date().getFullYear()} ${wpData().siteName ?? "Synergy ENT & Wellness"}. All rights reserved.`}</p>
          </div>
        </div>

        {/* Large animated text */}
        <div className="hidden lg:block relative z-10 -mt-8" style={{ height: 220 }}>
          <SynergyTextHover />
        </div>
      </footer>

      {/* Mobile bottom floater — md:hidden */}
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
            href={bookingLink.url ?? "https://healow.com"}
            target={bookingLink.target}
            rel={bookingLink.target ? "noopener noreferrer" : undefined}
            className="flex-1 flex items-center justify-center rounded-full border border-white/60 py-3.5 text-white text-[13px] font-semibold uppercase tracking-widest transition-all active:scale-95"
            style={{ letterSpacing: "0.12em" }}
          >
            Book Appointment
          </a>
          <a
            href={`tel:${(wpData().phone ?? "+12014534540").replace(/[^0-9+]/g, "")}`}
            className="flex items-center justify-center gap-2 rounded-full py-3.5 px-5 text-[13px] font-semibold uppercase tracking-widest transition-all active:scale-95"
            style={{
              background: "#E7FFD9",
              color: "#1D3A5F",
              letterSpacing: "0.12em",
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3.5 2h3l1.5 3.5-1.75 1.75a9.5 9.5 0 0 0 4.5 4.5L12.5 10l3.5 1.5v3A1.5 1.5 0 0 1 14.5 16C7.596 16 2 10.404 2 3.5A1.5 1.5 0 0 1 3.5 2z" fill="#1D3A5F"/>
            </svg>
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
