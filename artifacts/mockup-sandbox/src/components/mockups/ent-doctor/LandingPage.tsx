import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight, Ear, Stethoscope, Droplets, Mic2, Star, CheckCircle, MapPin, Phone, Mail, Zap, Play, TrendingUp, Activity, Search, ShoppingBag, Cross, ChevronDown, Globe, Share2, AtSign, Rss } from "lucide-react";

const specialties = [
  { icon: "🦻", label: "Hearing & Balance" },
  { icon: "💧", label: "Sinusitis & Allergy" },
  { icon: "🩺", label: "Nasal Surgery", active: true },
  { icon: "🗣️", label: "Throat & Voice" },
  { icon: "👶", label: "Pediatric ENT" },
];

const doctors = [
  { name: "Dr. Robert Chen", title: "Lead Surgeon" },
  { name: "Dr. Sarah Park", title: "Audiologist" },
  { name: "Dr. Alin Torres", title: "Rhinologist", active: true },
  { name: "Dr. James Wilson", title: "Laryngologist" },
  { name: "Dr. Emily Nguyen", title: "Pediatric ENT" },
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

function RadialSelectorSection() {
  const [activeIdx, setActiveIdx] = useState(2);
  const [rotation, setRotation] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-cycle every 2.5 s
  useEffect(() => {
    const id = setInterval(() => setActiveIdx(i => (i + 1) % specialties.length), 2500);
    return () => clearInterval(id);
  }, []);

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
          {specialties.map((s, i) => {
            const dist = Math.abs(i - activeIdx);
            const opacity = dist === 0 ? 1 : dist === 1 ? 0.5 : 0.2;
            const scale = dist === 0 ? 1 : 0.95;
            return (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
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
              </button>
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
            A Practice Built<br />
            <span className="italic">Around You</span>
          </h2>
          <p className="text-[#1D3A5F]/55 text-base md:text-lg mb-8 max-w-sm font-light leading-relaxed">
            Synergy ENT & Wellness is led by Dr. Sara C. Scheid, MD — one of the few physicians in New Jersey board-certified in both Otolaryngology and Sleep Medicine.
          </p>
          <button className="bg-[#E7FFD9] text-[#1D3A5F] px-8 py-3.5 rounded-full text-sm font-semibold hover:brightness-110 transition-all">
            Meet Dr. Scheid →
          </button>
        </div>

        {/* Right — doctor list — slides in from right */}
        <div
          className="hidden md:flex flex-col gap-3 w-52 shrink-0 items-end"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(36px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
          }}
        >
          {doctors.map((d, i) => {
            const dist = Math.abs(i - activeIdx);
            const opacity = dist === 0 ? 1 : dist === 1 ? 0.5 : 0.2;
            const scale = dist === 0 ? 1 : 0.95;
            return (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className="flex items-center gap-2.5 text-right transition-all duration-500"
                style={{ opacity, transform: `scale(${scale})` }}
              >
                <div className="text-right">
                  <div className={`text-sm font-medium ${dist === 0 ? "text-[#1D3A5F]" : "text-[#1D3A5F]/50"}`}>{d.name}</div>
                  {dist === 0 && <div className="text-xs text-[#1D3A5F]/40">{d.title}</div>}
                </div>
                <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  dist === 0
                    ? "bg-[#1D3A5F] text-white ring-2 ring-[#1D3A5F]/20 ring-offset-2"
                    : "bg-[#1D3A5F]/10 text-[#1D3A5F]/40"
                }`}>
                  {d.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}

const faqs = [
  {
    q: "What conditions do ENT specialists treat?",
    a: "Our ENT specialists treat a wide range of conditions including chronic sinusitis, hearing loss, tinnitus, sleep apnea, voice disorders, thyroid issues, nasal polyps, and ear infections — in both adults and children."
  },
  {
    q: "How do I know if I need a referral to see an ENT?",
    a: "While many insurers allow direct ENT appointments, a referral from your primary care physician can help. If you experience recurring ear infections, persistent sinus issues, hearing changes, or breathing difficulties, it's time to see a specialist."
  },
  {
    q: "Are ENT procedures painful?",
    a: "Most diagnostic procedures are minimally uncomfortable and performed in-office with local anesthesia if needed. Surgical procedures use appropriate anesthesia and our team provides detailed aftercare instructions to ensure a smooth recovery."
  },
  {
    q: "What should I expect at my first visit?",
    a: "Your first visit includes a thorough review of your medical history, a physical examination of your ears, nose, and throat, and any necessary in-office diagnostic tests. We'll discuss findings with you and outline a personalized treatment plan."
  },
  {
    q: "Do you offer minimally invasive surgical options?",
    a: "Yes. We specialize in balloon sinuplasty, functional endoscopic sinus surgery (FESS), and other minimally invasive procedures that offer shorter recovery times and less discomfort compared to traditional surgery."
  },
];

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

function AboutSection() {
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
        className="bg-[#1D3A5F] text-white shadow-2xl"
        style={{
          marginLeft: mx,
          marginRight: mx,
          borderRadius: radius,
          paddingTop: py,
          paddingBottom: py,
          paddingLeft: px,
          paddingRight: px,
          transition: "border-radius 0.05s linear",
          overflow: "visible",
        }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative">
            <div className="aspect-[3/4] rounded-[20px] overflow-hidden relative">
              <img
                src="/__mockup/images/ent-about-doctor-orig.png?v=1"
                alt="Dr. Headshot"
                className="w-full h-full object-cover object-top"
              />
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(160deg, rgba(10,20,40,0.55) 0%, rgba(10,20,40,0.15) 45%, rgba(10,20,40,0.6) 100%)",
                }}
              />
            </div>
            <div
              className="absolute -bottom-8 -right-8 p-8 rounded-[20px] hidden md:block text-[#1D3A5F] z-10"
              style={{
                background: "rgba(187, 219, 237, 0.45)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.5)",
                boxShadow: "0 4px 24px rgba(29,58,95,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              <h3 className="text-4xl font-['Inter'] mb-1">Dr. Scheid</h3>
              <p className="font-medium">Otolaryngologist & Sleep Specialist</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#E7FFD9] font-semibold text-sm">—</span>
              <span className="uppercase tracking-widest text-sm font-semibold text-[#E7FFD9]">Meet Dr Scheid.</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-['Inter'] leading-tight mb-6">
              Focused on Excellence in ENT and Sleep Medicine.
            </h2>
            <p className="text-sm text-white/70 mb-5 font-light leading-relaxed">
              Dr. Sara Scheid is a board-certified Otolaryngologist (ENT) and Sleep Medicine specialist serving patients throughout the Paramus, NJ area.
            </p>
            <p className="text-sm text-white/70 mb-10 font-light leading-relaxed">
              With expertise spanning ear, nose, and throat disorders, chronic sinusitis, hearing concerns, and obstructive sleep apnea, Dr. Scheid brings a comprehensive, patient-first approach to every visit. She is committed to providing care that combines clinical precision with genuine compassion.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              {[
                { target: 2000, suffix: "+", label: "Patients Served" },
                { target: 98,   suffix: "%", label: "Satisfaction" },
                { target: 20,   suffix: "+", label: "Years Experience" },
                { target: 4,    suffix: "",  label: "Clinic Locations" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl md:text-5xl font-['Inter'] text-[#E7FFD9] mb-2">
                    <StatNumber target={stat.target} suffix={stat.suffix} started={statsStarted} />
                  </div>
                  <div className="text-sm uppercase tracking-wider text-white/60 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all flex items-center gap-2">
              Meet The Team <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
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

function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
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
        src="/__mockup/images/wave-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ mixBlendMode: "multiply", opacity: 0.15 }}
      />
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-16 items-center">

        {/* Left — avatar card grid */}
        <div className="grid grid-cols-3 gap-3">
          {cardOrder.map((idx, pos) => {
            const t = testimonials[idx];
            const isActive = idx === active;
            return (
              <button
                key={pos}
                onClick={() => setActive(idx)}
                className={`rounded-2xl aspect-square flex items-end p-3 transition-all duration-300 ${
                  isActive
                    ? "ring-2 ring-[#1D3A5F] scale-105 shadow-lg"
                    : "opacity-40 hover:opacity-70"
                }`}
                style={{ background: t.color }}
              >
                <span className={`text-xs font-semibold ${isActive ? "text-white" : "text-white/80"}`}>
                  {t.procedure}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right — quote */}
        <div>
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

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#BBDBED] py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

        {/* Left — heading + contact card */}
        <div className="flex flex-col gap-10">
          {/* Label */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1D3A5F]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#1D3A5F]/60">FAQs</span>
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-['Inter'] text-[#1D3A5F] leading-[1.1] -mt-4">
            Frequently asked<br />questions
          </h2>

          {/* Still have questions? card */}
          <div className="relative rounded-[20px] overflow-hidden min-h-[200px] bg-[#1D3A5F]">
            <img
              src="/__mockup/images/ent-about-doctor-orig.png?v=1"
              alt="Doctor ready to help"
              className="absolute inset-0 w-full h-full object-cover object-top opacity-50"
            />
            <div className="relative z-10 p-8 flex flex-col justify-end h-full min-h-[200px]">
              <div className="mt-auto">
                <h3 className="text-white font-['Inter'] text-2xl mb-2">Still have questions?</h3>
                <p className="text-white/70 text-sm mb-6 max-w-xs">Our team is here to help. Get in touch for personalized answers.</p>
                <button className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-white/25 transition-colors">
                  <span className="text-[#809EB1]">✦</span> Contact us
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right — accordion */}
        <div className="flex flex-col divide-y divide-[#1D3A5F]/10">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`py-6 transition-colors ${isOpen ? "bg-white rounded-[20px] px-7 -mx-7 shadow-sm" : ""}`}>
                <button
                  className="w-full flex items-start justify-between gap-6 text-left group"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className={`text-lg font-['Inter'] leading-snug transition-colors ${isOpen ? "text-[#1D3A5F]" : "text-[#1D3A5F]/80 group-hover:text-[#1D3A5F]"}`}>
                    {faq.q}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all mt-0.5 ${isOpen ? "border-[#1D3A5F]/20 bg-[#1D3A5F]/5" : "border-[#1D3A5F]/20 bg-white"}`}>
                    {isOpen
                      ? <X className="w-3.5 h-3.5 text-[#1D3A5F]" />
                      : <span className="text-[#1D3A5F] text-lg leading-none -mt-px">+</span>
                    }
                  </div>
                </button>
                {isOpen && (
                  <p className="mt-4 text-[#1D3A5F]/60 font-light leading-relaxed text-[15px]">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
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
        setFooterProgress(Math.min(1, Math.max(0, raw)));
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
          transform: translateY(48px) scale(0.97);
        }
        .why-card.visible {
          animation: slideUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .why-card:nth-child(1).visible { animation-delay: 0ms; }
        .why-card:nth-child(2).visible { animation-delay: 100ms; }
        .why-card:nth-child(3).visible { animation-delay: 200ms; }
        .why-card:nth-child(4).visible { animation-delay: 300ms; }
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
        className="fixed top-0 w-full z-50 px-6 md:px-10 py-4 transition-colors duration-100"
        style={{
          backgroundColor: `rgba(29, 58, 95, ${navOpacity})`,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="#" className="hidden lg:flex items-center shrink-0">
            <img src="/__mockup/images/logo-white-orig.png" alt="Synergy ENT & Wellness" className="h-12 w-auto max-w-[260px] object-contain" style={{ mixBlendMode: 'screen' }} />
          </a>

          {/* Center nav links pill */}
          <div className="hidden lg:flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-2 py-1.5 gap-1">
            {[
              { label: "Home", active: true },
              { label: "Services", dropdown: true },
              { label: "About Us" },
              { label: "Treatments" },
              { label: "Blog" },
              { label: "Contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={`#${item.label.toLowerCase().replace(" ", "")}`}
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  item.active
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
                {item.dropdown && <ChevronDown className="w-3 h-3 opacity-60" />}
              </a>
            ))}
          </div>

          {/* Right group */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button className="bg-[#E7FFD9] rounded-full px-5 py-2.5 text-[#1D3A5F] text-sm font-semibold hover:brightness-110 transition-all">
              Book Appointment
            </button>
          </div>

          {/* Mobile: logo + hamburger */}
          <a href="#" className="lg:hidden flex items-center">
            <img src="/__mockup/images/logo-white-orig.png" alt="Synergy ENT & Wellness" className="h-9 w-auto max-w-[180px] object-contain" style={{ mixBlendMode: 'screen' }} />
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
      <div className={`fixed inset-0 z-40 transition-transform duration-500 ease-in-out lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ backgroundImage: "url('/__mockup/images/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {["Home", "Services", "About Us", "Treatments", "Blog", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white text-2xl font-['Inter']"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="mt-6 bg-[#E7FFD9] text-[#1D3A5F] px-8 py-4 rounded-full font-semibold text-base hover:brightness-110 transition-all">
            Book Appointment
          </button>
        </div>
      </div>

      {/* Hero Section — Medora style */}
      <section id="home" className="relative min-h-screen w-full overflow-hidden flex flex-col" style={{ backgroundImage: "url('/__mockup/images/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(29,58,95,0.72) 0%, rgba(42,80,128,0.55) 50%, rgba(128,158,177,0.35) 100%)" }} />
        {/* Decorative dot-grid background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #809EB1 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        {/* Glow blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "#809EB1" }} />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#E7FFD9" }} />
        {/* NJ outline — decorative, behind doctor column */}
        <img
          src="/__mockup/images/nj-outline.png"
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
        <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-6 md:px-12 pt-20 pb-12">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-center w-full">

            {/* Left column — text */}
            <div>
              {/* Badge */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  "Board-Certified: Otolaryngology & Sleep Medicine",
                  "25+ Years of Experience",
                  "Paramus, NJ",
                  "Accepting New Patients"
                ].map((item) => (
                  <div key={item} className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#E7FFD9] shrink-0" />
                    <span className="text-white/90 text-xs font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-['Inter'] text-white leading-[1.1] mb-4">
                Clear Breathing.<br />Restful Sleep.<br />
                <span className="text-[#E7FFD9]" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 700 }}>Total Wellness.</span>
              </h1>

              <p className="text-white/80 text-base font-medium mb-4 max-w-lg">
                Board-certified ENT and sleep medicine care — so you can feel like yourself again.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button className="bg-[#E7FFD9] text-[#1D3A5F] px-7 py-4 rounded-full font-semibold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#E7FFD9]/20">
                  Request an Appointment
                </button>
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-7 py-4 rounded-full font-semibold text-sm hover:bg-white/20 transition-all">
                  Explore Our Services
                </button>
              </div>
            </div>

            {/* Right column — doctor + floating cards */}
            <div className="relative flex justify-center lg:justify-end items-end" style={{ minHeight: '580px' }}>

              {/* Doctor image — tall, anchored to bottom, centred in column */}
              <img
                src="/__mockup/images/ent-hero-doctor.png?v=2"
                alt="ENT Doctor"
                className="h-[540px] w-auto object-contain drop-shadow-2xl relative z-10 mx-auto"
                style={{ filter: "drop-shadow(0 30px 80px rgba(0,0,0,0.45))" }}
              />

              {/* Floating card — Patient Overview (behind doctor's head) */}
              <div className={`card-top-right${heroReady ? " ready" : ""} absolute top-10 right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-64 shadow-xl z-[5]`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-xs font-semibold">Patient Overview</span>
                  <TrendingUp className="w-3.5 h-3.5 text-[#809EB1]" />
                </div>
                <svg viewBox="0 0 220 100" className="w-full" style={{ opacity: heroReady ? 1 : 0, transition: "opacity 0.8s ease 1s" }}>
                  {/* Y-axis labels */}
                  {[100, 75, 50, 25, 0].map((v, i) => (
                    <text key={v} x="16" y={8 + i * 19} textAnchor="end" fill="rgba(255,255,255,0.45)" fontSize="7">{v}</text>
                  ))}
                  {/* Grid lines */}
                  {[8, 27, 46, 65, 84].map((y, i) => (
                    <line key={i} x1="20" y1={y} x2="218" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                  ))}
                  {/* Line 1 — cyan (trending up) */}
                  <path
                    d="M 20,68 C 32,69 42,70 57,70 C 70,70 80,53 95,50 C 108,47 118,44 133,43 C 146,42 158,40 173,38 C 185,36 204,20 218,18"
                    fill="none" stroke="#4DD9E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  />
                  {/* Line 2 — yellow-green (flatter) */}
                  <path
                    d="M 20,57 C 32,61 42,62 57,63 C 70,64 80,59 95,60 C 108,61 118,55 133,54 C 146,53 158,61 173,62 C 185,63 204,54 218,55"
                    fill="none" stroke="#B8E04A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  />
                  {/* X-axis labels */}
                  {["Jan","Feb","Mar","Apr","May","Jun"].map((m, i) => (
                    <text key={m} x={20 + i * 39.6} y="96" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7">{m}</text>
                  ))}
                </svg>
              </div>

              {/* Floating card — Recovery Rate (bottom-left, at body level) */}
              <div className={`card-bottom-left${heroReady ? " ready" : ""} absolute bottom-8 left-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-52 shadow-xl z-20`}>
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-4 h-4 text-[#809EB1]" />
                  <span className="text-white text-xs font-semibold">Recovery Rate</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="relative w-16 h-16 shrink-0">
                    <svg viewBox="0 0 44 44" className="w-16 h-16 -rotate-90">
                      <circle cx="22" cy="22" r="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
                      <circle
                        cx="22" cy="22" r="16" fill="none"
                        stroke="#809EB1" strokeWidth="4"
                        strokeDasharray="100.5"
                        strokeDashoffset={ringOffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{counterVal}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#809EB1] shrink-0" />
                      <span className="text-white/70 text-[10px]">Satisfied</span>
                      <span className="text-white text-xs font-bold ml-auto">2k+</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-white/40 shrink-0" />
                      <span className="text-white/70 text-[10px]">Procedures</span>
                      <span className="text-white text-xs font-bold ml-auto">850</span>
                    </div>
                  </div>
                </div>
              </div>
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
          className="flex items-center justify-between gap-2 px-8 py-5"
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
          {[
            { icon: <CheckCircle className="w-4 h-4" />, title: "Board Certified", sub: "Otolaryngologist" },
            { icon: <Stethoscope className="w-4 h-4" />, title: "Sleep Medicine", sub: "Certified Specialist" },
            { icon: <TrendingUp className="w-4 h-4" />, title: "15+ Years", sub: "of Experience" },
            { icon: <Activity className="w-4 h-4" />, title: "Accepting", sub: "New Patients" },
          ].map((item, i, arr) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-3 flex-1 justify-center">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(29,58,95,0.07)" }}>
                  <span className="text-[#1D3A5F]">{item.icon}</span>
                </div>
                <div>
                  <p className="text-[#1D3A5F] font-semibold text-sm leading-tight">{item.title}</p>
                  <p className="text-[#809EB1] text-xs leading-tight">{item.sub}</p>
                </div>
              </div>
              {i < arr.length - 1 && <div className="w-px h-8 bg-[#1D3A5F]/10 shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Radial Selector Section */}
      <RadialSelectorSection />

      {/* About/Stats Section */}
      <AboutSection />

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-12" style={{ background: "linear-gradient(to bottom, #ffffff 0%, #BBDBED 100%)" }}>
        <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#1D3A5F]"></div>
              <span className="uppercase tracking-widest text-sm font-semibold">Our Specialties</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-['Inter'] leading-tight mb-8">
              Specialized Care for Every ENT & Sleep Need
            </h2>
            <p className="text-lg text-black/60 mb-8 font-light">
              From ear infections to obstructive sleep apnea, we treat the full spectrum of ear, nose, throat, and sleep concerns.
            </p>
            <button className="flex items-center gap-2 font-semibold border-b-2 border-[#1D3A5F] pb-1 hover:text-[#1D3A5F]/60 hover:border-[#1D3A5F]/60 transition-colors">
              View All Services <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: <Ear className="w-8 h-8" />,
                title: "Ear Care",
                desc: "Hearing loss, ear infections, earwax buildup, swimmer's ear, balance disorders, and more."
              },
              {
                icon: <Droplets className="w-8 h-8" />,
                title: "Nose & Sinus",
                desc: "Chronic sinusitis, nasal congestion, deviated septum, nasal polyps, and post-nasal drip."
              },
              {
                icon: <Mic2 className="w-8 h-8" />,
                title: "Throat & Voice",
                desc: "Sore throats, tonsil problems, hoarseness, voice disorders, and swallowing difficulties."
              },
              {
                icon: <Activity className="w-8 h-8" />,
                title: "Allergies",
                desc: "Allergy testing, immunotherapy, and management of environmental and seasonal allergies."
              },
              {
                icon: <Stethoscope className="w-8 h-8" />,
                title: "Sleep Medicine",
                desc: "Snoring, sleep apnea, obstructive sleep apnea (OSA), sleep studies, and CPAP alternatives."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Head & Neck",
                desc: "Thyroid and salivary gland concerns, neck masses, and general head and neck conditions."
              }
            ].map((service, i) => (
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
          {/* Soft radial glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(187,219,237,0.18) 0%, transparent 70%)" }} />

          {/* Top CTA buttons */}
          <div className="relative z-10 flex justify-center gap-3 mb-10">
            <button className="bg-[#E7FFD9] text-[#1D3A5F] font-semibold text-sm px-6 py-2.5 rounded-full hover:brightness-110 transition-all shadow-lg">
              Get Started
            </button>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium text-sm px-6 py-2.5 rounded-full hover:bg-white/20 transition-all">
              Learn More
            </button>
          </div>

          {/* Bento grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-4 items-start">

            {/* Left large card */}
            <div className="relative rounded-3xl overflow-hidden bg-[#0F2840] flex flex-col" style={{ minHeight: 420 }}>
              <div className="p-8 pb-4 flex-1">
                <h3 className="text-white text-2xl font-bold leading-tight mb-3">
                  Comprehensive ear, nose &amp; throat diagnostics to protect your health
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                  Whether you're managing chronic symptoms or seeking a second opinion, our specialists help you make informed ENT decisions.
                </p>
              </div>
              {/* Doctor image fills bottom */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src="/__mockup/images/ent-about-doctor-orig.png"
                  alt="ENT specialist"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(13,26,74,0.9) 0%, transparent 40%, rgba(13,26,74,0.5) 100%)" }} />
              </div>
              {/* Bottom CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <button className="w-full bg-[#E7FFD9] text-[#1D3A5F] text-xs font-semibold py-3 rounded-xl hover:brightness-110 transition-all">
                  Schedule Exam Now
                </button>
              </div>
            </div>

            {/* Right column — two stacked cards */}
            <div className="flex flex-col gap-4">

              {/* Right top card — photo background + headline */}
              <div className="relative rounded-3xl overflow-hidden bg-[#1a2d6b]" style={{ minHeight: 190 }}>
                <img
                  src="/__mockup/images/ent-about.png"
                  alt="ENT specialist care"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,18,64,0.78) 0%, rgba(10,18,64,0.35) 60%, rgba(10,18,64,0.1) 100%)" }} />
                <div className="relative z-10 p-7">
                  <span className="text-[#E7FFD9] text-xs font-semibold uppercase tracking-widest mb-3 block">Specialty Care</span>
                  <h4 className="text-white text-xl font-bold leading-snug">
                    Advanced sinus &amp; allergy treatment for lasting relief
                  </h4>
                </div>
              </div>

              {/* Right bottom card — bar chart */}
              <div className="relative rounded-3xl overflow-hidden bg-[#0F2840] p-6">
                <div className="flex items-end gap-1 h-20 mb-4">
                  {[30, 50, 40, 65, 55, 80, 60, 90, 75, 95, 70, 85, 65, 78, 88, 72, 82, 92, 68, 76].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        background: i >= 16 ? "#E7FFD9" : i >= 10 ? "rgba(128,158,177,0.5)" : "rgba(128,158,177,0.25)",
                        transition: "height 0.8s ease",
                      }}
                    />
                  ))}
                </div>
                <p className="text-white/55 text-xs leading-relaxed">
                  Hearing, balance, and sinus conditions affect millions — timely expert care leads to measurably better outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us — Bento Card Grid */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#F5F5F3]">
        <div className="max-w-7xl mx-auto">

          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-['Inter'] leading-tight max-w-sm">
              What sets Synergy ENT &amp; Wellness Apart
            </h2>
            <p className="text-black/50 font-light max-w-xs text-sm leading-relaxed">
              Dual-certified expertise, personalized care plans, and in-office procedures — all designed around you and your health.
            </p>
          </div>

          {/* 4-col bento grid */}
          <div ref={whyGridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">

            {/* Card 1 — tall image + Learn More */}
            <div className={`why-card why-card-image relative rounded-3xl overflow-hidden bg-[#BBDBED]${whyCardsVisible ? " visible" : ""}`} style={{ minHeight: 420 }}>
              <img
                src="/__mockup/images/ent-about.png"
                alt="ENT specialty care"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(29,58,95,0.1) 0%, rgba(29,58,95,0.7) 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
                <button className="bg-white text-[#1D3A5F] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#E7FFD9] transition-colors">
                  Learn More
                </button>
                <div className="w-9 h-9 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Card 2 — article/text card */}
            <div className={`why-card why-card-article rounded-3xl bg-white p-6 flex flex-col justify-between${whyCardsVisible ? " visible" : ""}`} style={{ minHeight: 420 }}>
              <div>
                <span className="text-xs font-semibold tracking-widest text-[#809EB1] uppercase">Blog / Article</span>
                <div className="mt-4 rounded-2xl overflow-hidden h-44">
                  <img
                    src="/__mockup/images/ent-about.png"
                    alt="ENT article"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-['Inter'] text-lg leading-snug mb-3 text-[#1D3A5F]">Dual Board Certification in ENT &amp; Sleep Medicine</h3>
                <div className="arrow-btn w-9 h-9 rounded-full bg-[#BBDBED] flex items-center justify-center ml-auto">
                  <ArrowRight className="w-4 h-4 text-[#1D3A5F]" />
                </div>
              </div>
            </div>

            {/* Card 3 — tall image */}
            <div className={`why-card why-card-image relative rounded-3xl overflow-hidden bg-[#1D3A5F]${whyCardsVisible ? " visible" : ""}`} style={{ minHeight: 420 }}>
              <img
                src="/__mockup/images/ent-about-doctor-orig.png"
                alt="Dr. Scheid"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(29,58,95,0.75) 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
                <button className="bg-white text-[#1D3A5F] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#E7FFD9] transition-colors">
                  Learn More
                </button>
                <div className="w-9 h-9 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Card 4 — article/text card */}
            <div className={`why-card why-card-article rounded-3xl bg-white p-6 flex flex-col justify-between${whyCardsVisible ? " visible" : ""}`} style={{ minHeight: 420 }}>
              <div>
                <span className="text-xs font-semibold tracking-widest text-[#809EB1] uppercase">Blog / Article</span>
                <div className="mt-4 rounded-2xl overflow-hidden h-44">
                  <img
                    src="/__mockup/images/ent-hero.png"
                    alt="ENT care article"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-['Inter'] text-lg leading-snug mb-3 text-[#1D3A5F]">In-Office Procedures &amp; Personalized Care Plans</h3>
                <div className="arrow-btn w-9 h-9 rounded-full bg-[#BBDBED] flex items-center justify-center ml-auto">
                  <ArrowRight className="w-4 h-4 text-[#1D3A5F]" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials — Carousel */}
      <TestimonialsCarousel />

      {/* FAQ Section */}
      <FaqSection />

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-[#809EB1] py-24 px-6 md:px-12">
        {/* Office background photo */}
        <img
          src="/__mockup/images/office-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{ opacity: 1 }}
        />
        {/* Very faint overlay for text legibility */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(255,255,255,0.15)" }} />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-['Inter'] text-[#1D3A5F] mb-8">
            Ready to Breathe Better and Sleep Sounder?
          </h2>
          <p className="text-xl text-[#1D3A5F]/70 mb-10 max-w-2xl mx-auto">
            New and returning patients are welcome. Reach out today to schedule your appointment with Dr. Scheid at our Paramus, NJ office.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#1D3A5F]/80 backdrop-blur-sm border border-[#1D3A5F]/40 text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-[#1D3A5F] transition-all inline-flex items-center gap-3">
              Request an Appointment <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-[#1D3A5F]/20 border border-[#1D3A5F]/30 text-[#1D3A5F] px-10 py-5 rounded-full font-semibold text-lg hover:bg-[#1D3A5F]/30 transition-all">
              Call Our Office
            </button>
          </div>
        </div>{/* end z-10 */}
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

        <div className="relative z-10 max-w-7xl mx-auto px-14 pt-14 pb-0">

          {/* 4-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 text-white/55">

            {/* Brand */}
            <div className="flex flex-col space-y-4">
              <img src="/__mockup/images/logo-white-orig.png" alt="Synergy ENT & Wellness" className="h-10 w-auto max-w-[200px] object-contain" style={{ mixBlendMode: 'screen' }} />
              <p className="text-sm leading-relaxed">
                Board-certified ENT and sleep medicine care — so you can feel like yourself again.
              </p>
            </div>

            {/* About Us */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-6">About Us</h4>
              <ul className="space-y-3 text-sm">
                {["Our Story", "Meet Dr. Scheid", "Our Team", "Careers"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-[#BBDBED] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Helpful Links */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-6">Helpful Links</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "FAQs" },
                  { label: "Request Appointment" },
                  { label: "Patient Portal", pulse: true },
                  { label: "Insurance Info" },
                ].map((l) => (
                  <li key={l.label} className="relative">
                    <a href="#" className="hover:text-[#BBDBED] transition-colors">{l.label}</a>
                    {l.pulse && <span className="absolute top-1 right-0 w-2 h-2 rounded-full bg-[#BBDBED] animate-pulse" />}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-[#BBDBED] shrink-0" />
                  <a href="mailto:care@synergyentwellness.com" className="hover:text-[#BBDBED] transition-colors">care@synergyentwellness.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-[#BBDBED] shrink-0" />
                  <a href="tel:+12015550198" className="hover:text-[#BBDBED] transition-colors">(201) 555-0198</a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#BBDBED] shrink-0" />
                  <span>Paramus, NJ</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-t border-white/10" />

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center py-6 text-sm text-white/40 gap-4">
            <div className="flex gap-5">
              {[Globe, Share2, AtSign, Rss, Mail].map((Icon, i) => (
                <a key={i} href="#" className="hover:text-[#BBDBED] transition-colors"><Icon size={18} /></a>
              ))}
            </div>
            <p>© {new Date().getFullYear()} Synergy ENT &amp; Wellness. All rights reserved.</p>
          </div>
        </div>

        {/* Large animated text */}
        <div className="hidden lg:block relative z-10 -mt-8" style={{ height: 220 }}>
          <SynergyTextHover />
        </div>
      </footer>
    </div>
  );
}
