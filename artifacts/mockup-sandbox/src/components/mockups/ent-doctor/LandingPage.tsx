import React, { useEffect, useState, useRef } from "react";
import { Menu, X, ArrowRight, Ear, Stethoscope, Droplets, Mic2, Star, CheckCircle, MapPin, Phone, Mail, Zap, Play, TrendingUp, Activity, Search, ShoppingBag, Cross, ChevronDown } from "lucide-react";

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
    const x1 = 50 + ((radius - 14) / radius) * 50 * Math.cos(rad);
    const y1 = 50 + ((radius - 14) / radius) * 50 * Math.sin(rad);
    const x2 = 50 + (radius / radius) * 50 * Math.cos(rad);
    const y2 = 50 + (radius / radius) * 50 * Math.sin(rad);
    ticks.push(
      <line
        key={i}
        x1={`${x1}%`} y1={`${y1}%`}
        x2={`${x2}%`} y2={`${y2}%`}
        stroke="#16215B"
        strokeWidth={i % 5 === 0 ? "1.5" : "0.8"}
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

  // Auto-cycle every 2.5 s
  useEffect(() => {
    const id = setInterval(() => setActiveIdx(i => (i + 1) % specialties.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-[#E0EAF8] relative overflow-hidden py-16 md:py-24">
      {/* Radial ticks decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[700px] h-[700px] max-w-full">
          <RadialTicks count={80} radius={340} />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8 min-h-[420px]">

        {/* Left — specialty list */}
        <div className="hidden md:flex flex-col gap-3 w-52 shrink-0">
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
                  <div className="w-5 h-5 rounded-full bg-[#16215B] flex items-center justify-center shrink-0">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="white"><polygon points="2,1 7,4 2,7"/></svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-[#16215B]/30 shrink-0" />
                )}
                <span className={`text-sm font-medium ${dist === 0 ? "text-[#16215B]" : "text-[#16215B]/50"}`}>
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Center — main content */}
        <div className="flex-1 flex flex-col items-center text-center px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Inter'] text-[#16215B] leading-[1.1] mb-5 max-w-lg">
            Care built around<br />
            <span className="italic">your ENT health</span>
          </h2>
          <p className="text-[#16215B]/55 text-base md:text-lg mb-8 max-w-sm font-light leading-relaxed">
            From ear infections to sinus surgery, our specialists provide calm, expert, personalised care.
          </p>
          <button className="bg-[#16215B] text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#16215B]/80 transition-colors">
            Schedule Now
          </button>
        </div>

        {/* Right — doctor list */}
        <div className="hidden md:flex flex-col gap-3 w-52 shrink-0 items-end">
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
                  <div className={`text-sm font-medium ${dist === 0 ? "text-[#16215B]" : "text-[#16215B]/50"}`}>{d.name}</div>
                  {dist === 0 && <div className="text-xs text-[#16215B]/40">{d.title}</div>}
                </div>
                <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  dist === 0
                    ? "bg-[#16215B] text-white ring-2 ring-[#16215B]/20 ring-offset-2"
                    : "bg-[#16215B]/10 text-[#16215B]/40"
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

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#E0EAF8] py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

        {/* Left — heading + contact card */}
        <div className="flex flex-col gap-10">
          {/* Label */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#16215B]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#16215B]/60">FAQs</span>
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-['Inter'] text-[#16215B] leading-[1.1] -mt-4">
            Frequently asked<br />questions
          </h2>

          {/* Still have questions? card */}
          <div className="relative rounded-[20px] overflow-hidden min-h-[200px] bg-[#16215B]">
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
                  <span className="text-[#F25929]">✦</span> Contact us
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right — accordion */}
        <div className="flex flex-col divide-y divide-[#16215B]/10">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`py-6 transition-colors ${isOpen ? "bg-white rounded-[20px] px-7 -mx-7 shadow-sm" : ""}`}>
                <button
                  className="w-full flex items-start justify-between gap-6 text-left group"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className={`text-lg font-['Inter'] leading-snug transition-colors ${isOpen ? "text-[#16215B]" : "text-[#16215B]/80 group-hover:text-[#16215B]"}`}>
                    {faq.q}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all mt-0.5 ${isOpen ? "border-[#16215B]/20 bg-[#16215B]/5" : "border-[#16215B]/20 bg-white"}`}>
                    {isOpen
                      ? <X className="w-3.5 h-3.5 text-[#16215B]" />
                      : <span className="text-[#16215B] text-lg leading-none -mt-px">+</span>
                    }
                  </div>
                </button>
                {isOpen && (
                  <p className="mt-4 text-[#16215B]/60 font-light leading-relaxed text-[15px]">
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

export function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [ringOffset, setRingOffset] = useState(100.5);
  const [counterVal, setCounterVal] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <div className="min-h-screen bg-[#E0EAF8] text-[#16215B] font-['Inter',sans-serif] selection:bg-[#F25929] selection:text-[#16215B] overflow-x-hidden">
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
      `}</style>

      {/* Navigation — Medora glassmorphism style */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-10 py-4">
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
            <button className="bg-[#F25929] rounded-full px-5 py-2.5 text-white text-sm font-semibold hover:bg-[#d94a1e] transition-colors">
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
          <button className="mt-6 bg-[#F25929] text-[#16215B] px-8 py-4 rounded-full font-semibold text-base">
            Book Appointment
          </button>
        </div>
      </div>

      {/* Hero Section — Medora style */}
      <section id="home" className="relative min-h-screen w-full overflow-hidden flex flex-col" style={{ backgroundImage: "url('/__mockup/images/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(22,33,91,0.72) 0%, rgba(31,41,156,0.55) 50%, rgba(3,115,255,0.35) 100%)" }} />
        {/* Decorative dot-grid background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #F25929 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        {/* Glow blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "#F25929" }} />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#30D1FF" }} />
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
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
                <Zap className="w-4 h-4 text-[#F25929]" />
                <span className="text-white/90 text-sm font-medium">Board Certified ENT Specialists</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-['Inter'] text-white leading-[1.1] mb-6">
                Expert ENT Care<br />
                <span className="text-[#30D1FF]" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 700 }}>Starts Here.</span>
              </h1>

              <p className="text-white/70 text-lg font-light leading-relaxed mb-10 max-w-lg">
                Synergy ENT & Wellness is a precision-focused otolaryngology practice delivering advanced diagnostic and surgical solutions for ear, nose, and throat conditions.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button className="bg-[#30D1FF] text-white px-7 py-4 rounded-[50px] font-bold text-sm uppercase tracking-wide hover:bg-[#1ab8e8] transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-[#30D1FF]/20">
                  Book a Free Consultation
                </button>
                <button className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
                  <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                  </div>
                  <span className="font-medium text-sm">Watch a Demo</span>
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
                  <TrendingUp className="w-3.5 h-3.5 text-[#F25929]" />
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
                  <Activity className="w-4 h-4 text-[#F25929]" />
                  <span className="text-white text-xs font-semibold">Recovery Rate</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="relative w-16 h-16 shrink-0">
                    <svg viewBox="0 0 44 44" className="w-16 h-16 -rotate-90">
                      <circle cx="22" cy="22" r="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
                      <circle
                        cx="22" cy="22" r="16" fill="none"
                        stroke="#F25929" strokeWidth="4"
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
                      <div className="w-2 h-2 rounded-full bg-[#F25929] shrink-0" />
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
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, transparent 0%, #E0EAF8 100%)" }} />

      </section>

      {/* Radial Selector Section */}
      <RadialSelectorSection />

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#16215B]"></div>
              <span className="uppercase tracking-widest text-sm font-semibold">Our Specialties</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-['Inter'] leading-tight mb-8">
              Advanced care for your vital senses.
            </h2>
            <p className="text-lg text-black/60 mb-8 font-light">
              We employ state-of-the-art diagnostic tools and minimally invasive techniques to treat a wide spectrum of otolaryngological conditions.
            </p>
            <button className="flex items-center gap-2 font-semibold border-b-2 border-[#16215B] pb-1 hover:text-[#16215B]/60 hover:border-[#16215B]/60 transition-colors">
              View all services <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: <Ear className="w-8 h-8" />,
                title: "Hearing & Balance",
                desc: "Comprehensive audiometry, tinnitus management, and vertigo treatments."
              },
              {
                icon: <Droplets className="w-8 h-8" />,
                title: "Sinusitis Treatment",
                desc: "Endoscopic sinus surgery and balloon sinuplasty for chronic sufferers."
              },
              {
                icon: <Stethoscope className="w-8 h-8" />,
                title: "Nasal Surgery",
                desc: "Septoplasty and rhinoplasty to improve breathing and function."
              },
              {
                icon: <Mic2 className="w-8 h-8" />,
                title: "Throat & Voice",
                desc: "Laryngology services for voice disorders, swallowing issues, and reflux."
              }
            ].map((service, i) => (
              <div 
                key={i} 
                className="bg-white p-8 rounded-[20px] border border-[#16215B]/5 hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md group"
              >
                <div className="w-16 h-16 rounded-full bg-[#E0EAF8] flex items-center justify-center text-[#16215B] mb-6 group-hover:bg-[#F25929] group-hover:scale-110 transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-['Inter'] mb-3">{service.title}</h3>
                <p className="text-black/60 font-light leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About/Stats Section */}
      <section id="about" className="bg-[#16215B] text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative">
              <div className="aspect-[3/4] rounded-[20px] overflow-hidden">
                <img 
                  src="/__mockup/images/ent-about-doctor-orig.png?v=1" 
                  alt="Dr. Headshot" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-[#F25929] text-[#16215B] p-8 rounded-[20px] hidden md:block">
                <h3 className="text-4xl font-['Inter'] mb-1">Dr. Robert Chen</h3>
                <p className="font-medium">Lead Surgeon, MD, FACS</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#F25929]"></div>
                <span className="uppercase tracking-widest text-sm font-semibold text-[#F25929]">About Practice</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Inter'] leading-tight mb-8">
                Precision medicine with a human touch.
              </h2>
              
              <p className="text-lg text-white/70 mb-12 font-light leading-relaxed">
                Synergy ENT & Wellness was founded on a simple principle: every patient deserves specialized care tailored to their unique anatomy and lifestyle. We combine decades of surgical expertise with the latest minimally invasive technologies to ensure faster recovery and better outcomes.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-12">
                {[
                  { value: "2,000+", label: "Patients Served" },
                  { value: "98%", label: "Satisfaction" },
                  { value: "20+", label: "Years Experience" },
                  { value: "4", label: "Clinic Locations" }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-4xl md:text-5xl font-['Inter'] text-[#F25929] mb-2">{stat.value}</div>
                    <div className="text-sm uppercase tracking-wider text-white/60 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              <button className="bg-white text-[#16215B] px-8 py-4 rounded-[50px] font-semibold uppercase tracking-wide hover:bg-gray-200 transition-colors flex items-center gap-2">
                Meet The Team <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-['Inter'] mb-6">Your Path to Relief</h2>
          <p className="text-lg text-black/60 font-light">We've streamlined our clinical process to provide swift, accurate diagnoses and effective treatment plans.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-[#16215B]/10 z-0"></div>
          
          {[
            { num: "01", title: "Consultation", desc: "Initial evaluation of symptoms and medical history." },
            { num: "02", title: "Diagnosis", desc: "Advanced imaging and scoping to pinpoint the issue." },
            { num: "03", title: "Treatment Plan", desc: "Customized medical or surgical approach." },
            { num: "04", title: "Follow-up", desc: "Ongoing care to ensure complete recovery." }
          ].map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white border border-[#16215B]/10 flex items-center justify-center text-3xl font-['Inter'] text-[#16215B] mb-6 shadow-sm">
                {step.num}
              </div>
              <h3 className="text-xl font-['Inter'] mb-3">{step.title}</h3>
              <p className="text-black/60 font-light">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#16215B] py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#F25929]"></div>
                <span className="uppercase tracking-widest text-sm font-semibold text-[#F25929]">Patient Stories</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-['Inter'] text-white max-w-xl">
                Life-changing results, in their own words.
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "After years of chronic sinus infections, the balloon sinuplasty completely changed my life. I can finally breathe freely. Dr. Chen is phenomenal.",
                name: "Sarah Jenkins",
                procedure: "Sinus Surgery"
              },
              {
                quote: "The audiology team was incredibly patient with my mother. The new hearing aids were fitted perfectly on the first try.",
                name: "Michael Torres",
                procedure: "Hearing Assessment"
              },
              {
                quote: "Professional, efficient, and deeply caring. The recovery from my tonsillectomy was exactly as they explained it would be.",
                name: "David Park",
                procedure: "Throat Surgery"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-[20px] p-8 hover:bg-white/10 transition-colors">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-[#F25929] fill-[#F25929]" />
                  ))}
                </div>
                <p className="text-lg text-white/90 mb-8 font-light leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-white/50 text-sm">{testimonial.procedure}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />

      {/* CTA Banner */}
      <section className="bg-[#F25929] py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-['Inter'] text-[#16215B] mb-8">
            Ready to Breathe Easier?
          </h2>
          <p className="text-xl text-[#16215B]/70 mb-10 max-w-2xl mx-auto">
            Schedule a consultation today and take the first step toward better sensory and respiratory health.
          </p>
          <button className="bg-[#16215B] text-white px-10 py-5 rounded-[50px] font-semibold text-lg uppercase tracking-wide hover:bg-[#16215B]/80 transition-colors inline-flex items-center gap-3">
            Book Your Consultation <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#16215B] text-white pt-24 pb-8 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <a href="#" className="block mb-6">
                <img src="/__mockup/images/logo-white-orig.png" alt="Synergy ENT & Wellness" className="h-10 w-auto max-w-[220px] object-contain" style={{ mixBlendMode: 'screen' }} />
              </a>
              <p className="text-white/60 font-light mb-8 max-w-sm">
                Premium ENT specialty care focused on precision, expertise, and patient comfort.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 uppercase tracking-wider text-white/90">Quick Links</h4>
              <ul className="space-y-4">
                {["Home", "About Us", "Our Services", "Meet the Team", "Patient Portal"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/60 hover:text-[#F25929] transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 uppercase tracking-wider text-white/90">Services</h4>
              <ul className="space-y-4">
                {["Hearing & Balance", "Sinus & Allergy", "Voice & Swallowing", "Pediatric ENT", "Facial Plastics"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/60 hover:text-[#F25929] transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 uppercase tracking-wider text-white/90">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-white/60">
                  <MapPin className="w-5 h-5 shrink-0 text-[#F25929]" />
                  <span>1450 Medical Plaza Way<br/>Suite 300<br/>San Francisco, CA 94102</span>
                </li>
                <li className="flex items-center gap-3 text-white/60">
                  <Phone className="w-5 h-5 shrink-0 text-[#F25929]" />
                  <span>(415) 555-0198</span>
                </li>
                <li className="flex items-center gap-3 text-white/60">
                  <Mail className="w-5 h-5 shrink-0 text-[#F25929]" />
                  <span>care@clearpathent.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
            <p>© {new Date().getFullYear()} Synergy ENT & Wellness. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
