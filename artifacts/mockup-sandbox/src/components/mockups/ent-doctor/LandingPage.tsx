import React, { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Ear, Stethoscope, Droplets, Mic2, Star, CheckCircle, MapPin, Phone, Mail } from "lucide-react";

export function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF5EF] text-[#020202] font-['Inter',sans-serif] selection:bg-[#E4FF60] selection:text-[#020202] overflow-x-hidden">
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
      `}</style>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#020202]/90 backdrop-blur-md py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <a href="#" className="text-2xl font-['DM_Serif_Display'] tracking-wide text-white">
              ClearPath<span className="text-[#E4FF60]">.</span>
            </a>
            <div className="hidden lg:flex items-center gap-8">
              {["Home", "Services", "About", "Team", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white/80 hover:text-white text-sm uppercase tracking-wider font-medium transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <button className="bg-[#E4FF60] text-[#020202] px-6 py-3 rounded-[50px] font-semibold text-sm uppercase tracking-wide hover:bg-[#d4f04b] transition-colors flex items-center gap-2">
              Book Appointment <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button 
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[#020202] z-40 transition-transform duration-500 ease-in-out lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {["Home", "Services", "About", "Team", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white text-2xl font-['DM_Serif_Display']"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="mt-8 bg-[#E4FF60] text-[#020202] px-8 py-4 rounded-[50px] font-semibold text-lg flex items-center gap-2">
            Book Appointment <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/__mockup/images/ent-hero.png" 
            alt="ENT Doctor Consultation" 
            className="w-full h-full object-cover object-center animate-ken-burns opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/60 via-transparent to-[#020202]"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 mt-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-['DM_Serif_Display'] text-white leading-[1.1] max-w-5xl mx-auto mb-6">
            Expert Care for <br/>
            <span className="italic text-white/90">Ear, Nose & Throat</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light">
            Comprehensive diagnostic and surgical solutions from board-certified specialists dedicated to your respiratory and sensory health.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full sm:w-auto bg-[#E4FF60] text-[#020202] px-8 py-4 rounded-[50px] font-semibold uppercase tracking-wide hover:bg-[#d4f04b] transition-colors flex items-center justify-center gap-2">
              Book Appointment <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto border border-white text-white px-8 py-4 rounded-[50px] font-semibold uppercase tracking-wide hover:bg-white hover:text-[#020202] transition-colors">
              Learn More
            </button>
          </div>
        </div>

        <div className="absolute -bottom-16 md:-bottom-32 left-0 right-0 flex justify-center w-full pointer-events-none z-10">
          <h2 className="text-[#E4FF60] text-[150px] md:text-[280px] lg:text-[400px] font-['DM_Serif_Display'] leading-none opacity-90 select-none">
            ENT
          </h2>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="bg-[#020202] border-y border-white/10 py-4 overflow-hidden relative z-20">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {[
                "20+ Years Experience",
                "Board Certified",
                "ENT Specialists",
                "Advanced Surgery",
                "5-Star Rated"
              ].map((badge, j) => (
                <div key={j} className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-[#E4FF60] fill-[#E4FF60]" />
                  <span className="text-[#E4FF60] uppercase tracking-widest text-sm font-semibold">{badge}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#020202]"></div>
              <span className="uppercase tracking-widest text-sm font-semibold">Our Specialties</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-['DM_Serif_Display'] leading-tight mb-8">
              Advanced care for your vital senses.
            </h2>
            <p className="text-lg text-black/60 mb-8 font-light">
              We employ state-of-the-art diagnostic tools and minimally invasive techniques to treat a wide spectrum of otolaryngological conditions.
            </p>
            <button className="flex items-center gap-2 font-semibold border-b-2 border-[#020202] pb-1 hover:text-[#020202]/60 hover:border-[#020202]/60 transition-colors">
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
                className="bg-white p-8 rounded-[20px] border border-[#020202]/5 hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md group"
              >
                <div className="w-16 h-16 rounded-full bg-[#FAF5EF] flex items-center justify-center text-[#020202] mb-6 group-hover:bg-[#E4FF60] group-hover:scale-110 transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-['DM_Serif_Display'] mb-3">{service.title}</h3>
                <p className="text-black/60 font-light leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About/Stats Section */}
      <section id="about" className="bg-[#020202] text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative">
              <div className="aspect-[3/4] rounded-[20px] overflow-hidden">
                <img 
                  src="/__mockup/images/ent-about.png" 
                  alt="Dr. Headshot" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-[#E4FF60] text-[#020202] p-8 rounded-[20px] hidden md:block">
                <h3 className="text-4xl font-['DM_Serif_Display'] mb-1">Dr. Robert Chen</h3>
                <p className="font-medium">Lead Surgeon, MD, FACS</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#E4FF60]"></div>
                <span className="uppercase tracking-widest text-sm font-semibold text-[#E4FF60]">About Practice</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-['DM_Serif_Display'] leading-tight mb-8">
                Precision medicine with a human touch.
              </h2>
              
              <p className="text-lg text-white/70 mb-12 font-light leading-relaxed">
                ClearPath ENT was founded on a simple principle: every patient deserves specialized care tailored to their unique anatomy and lifestyle. We combine decades of surgical expertise with the latest minimally invasive technologies to ensure faster recovery and better outcomes.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-12">
                {[
                  { value: "2,000+", label: "Patients Served" },
                  { value: "98%", label: "Satisfaction" },
                  { value: "20+", label: "Years Experience" },
                  { value: "4", label: "Clinic Locations" }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-4xl md:text-5xl font-['DM_Serif_Display'] text-[#E4FF60] mb-2">{stat.value}</div>
                    <div className="text-sm uppercase tracking-wider text-white/60 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              <button className="bg-white text-[#020202] px-8 py-4 rounded-[50px] font-semibold uppercase tracking-wide hover:bg-gray-200 transition-colors flex items-center gap-2">
                Meet The Team <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-['DM_Serif_Display'] mb-6">Your Path to Relief</h2>
          <p className="text-lg text-black/60 font-light">We've streamlined our clinical process to provide swift, accurate diagnoses and effective treatment plans.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-[#020202]/10 z-0"></div>
          
          {[
            { num: "01", title: "Consultation", desc: "Initial evaluation of symptoms and medical history." },
            { num: "02", title: "Diagnosis", desc: "Advanced imaging and scoping to pinpoint the issue." },
            { num: "03", title: "Treatment Plan", desc: "Customized medical or surgical approach." },
            { num: "04", title: "Follow-up", desc: "Ongoing care to ensure complete recovery." }
          ].map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white border border-[#020202]/10 flex items-center justify-center text-3xl font-['DM_Serif_Display'] text-[#020202] mb-6 shadow-sm">
                {step.num}
              </div>
              <h3 className="text-xl font-['DM_Serif_Display'] mb-3">{step.title}</h3>
              <p className="text-black/60 font-light">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#020202] py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#E4FF60]"></div>
                <span className="uppercase tracking-widest text-sm font-semibold text-[#E4FF60]">Patient Stories</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-['DM_Serif_Display'] text-white max-w-xl">
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
                    <Star key={j} className="w-5 h-5 text-[#E4FF60] fill-[#E4FF60]" />
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

      {/* CTA Banner */}
      <section className="bg-[#E4FF60] py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-['DM_Serif_Display'] text-[#020202] mb-8">
            Ready to Breathe Easier?
          </h2>
          <p className="text-xl text-[#020202]/70 mb-10 max-w-2xl mx-auto">
            Schedule a consultation today and take the first step toward better sensory and respiratory health.
          </p>
          <button className="bg-[#020202] text-white px-10 py-5 rounded-[50px] font-semibold text-lg uppercase tracking-wide hover:bg-[#020202]/80 transition-colors inline-flex items-center gap-3">
            Book Your Consultation <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020202] text-white pt-24 pb-8 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <a href="#" className="text-3xl font-['DM_Serif_Display'] tracking-wide text-white block mb-6">
                ClearPath<span className="text-[#E4FF60]">.</span>
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
                    <a href="#" className="text-white/60 hover:text-[#E4FF60] transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 uppercase tracking-wider text-white/90">Services</h4>
              <ul className="space-y-4">
                {["Hearing & Balance", "Sinus & Allergy", "Voice & Swallowing", "Pediatric ENT", "Facial Plastics"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/60 hover:text-[#E4FF60] transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 uppercase tracking-wider text-white/90">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-white/60">
                  <MapPin className="w-5 h-5 shrink-0 text-[#E4FF60]" />
                  <span>1450 Medical Plaza Way<br/>Suite 300<br/>San Francisco, CA 94102</span>
                </li>
                <li className="flex items-center gap-3 text-white/60">
                  <Phone className="w-5 h-5 shrink-0 text-[#E4FF60]" />
                  <span>(415) 555-0198</span>
                </li>
                <li className="flex items-center gap-3 text-white/60">
                  <Mail className="w-5 h-5 shrink-0 text-[#E4FF60]" />
                  <span>care@clearpathent.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
            <p>© {new Date().getFullYear()} ClearPath ENT. All rights reserved.</p>
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
