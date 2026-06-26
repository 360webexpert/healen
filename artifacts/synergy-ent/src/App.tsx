import { Router, Route, Switch } from "wouter";
import { LandingPage } from "./pages/LandingPage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { NewPatientPage } from "./pages/NewPatientPage";
import { ContactPage } from "./pages/ContactPage";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { getServiceBySlug } from "./data/servicesContent";
import { sitePath, wpData } from "./wp";

const base = (wpData().basePath ?? import.meta.env.BASE_URL).replace(/\/$/, "");

function App() {
  return (
    <Router base={base}>
      <RouteEffects />
      <RouteTitle />
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/services/:slug">
          {(params) => <ServiceDetailPage slug={params.slug} />}
        </Route>
        <Route path="/new-patient" component={NewPatientPage} />
        <Route path="/contact" component={ContactPage} />
        <Route>
          <div className="min-h-screen flex items-center justify-center bg-[#1D3A5F] text-white font-['Inter']">
            <div className="text-center">
              <p className="text-[#BBDBED] text-xs uppercase tracking-widest mb-3">404</p>
              <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
              <a href={sitePath("/")} className="text-[#E7FFD9] underline hover:opacity-80 transition-opacity">← Back to Home</a>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

function RouteEffects() {
  const [location] = useLocation();

  useEffect(() => {
    const route = normalizeRoutePath(location);
    const pageClass = route === "/contact" ? "healen-contact-page" : "";

    document.body.classList.toggle("healen-contact-page", pageClass === "healen-contact-page");

    window.requestAnimationFrame(() => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target) {
          target.scrollIntoView({ block: "start" });
          return;
        }
      }

      window.scrollTo({ top: 0, left: 0 });
    });
  }, [location]);

  return null;
}

function RouteTitle() {
  const [location] = useLocation();

  useEffect(() => {
    const pageTitles = wpData().pageTitles;
    const normalizedLocation = normalizeRoutePath(location);
    const titles: Record<string, string> = {
      "/": pageTitles?.home ?? wpData().siteName ?? "Home",
      "/about": pageTitles?.about ?? "About Us",
      "/services": pageTitles?.services ?? "Services",
      "/new-patient": pageTitles?.["new-patient"] ?? "New Patient",
      "/contact": pageTitles?.contact ?? "Contact",
    };
    const serviceMatch = normalizedLocation.match(/^\/services\/([^/]+)$/);
    const serviceTitle = serviceMatch ? getServiceBySlug(serviceMatch[1])?.title : "";
    const routeTitle = decodeHtmlEntities(serviceTitle || titles[normalizedLocation] || document.title);
    if (routeTitle) {
      const tagline = decodeHtmlEntities(wpData().siteTagline ?? "");
      document.title = tagline ? `${routeTitle} - ${tagline}` : routeTitle;
    }
  }, [location]);

  return null;
}

function normalizeRoutePath(path: string) {
  const withoutQuery = path.split(/[?#]/)[0] || "/";
  const cleanBase = (wpData().basePath ?? "").replace(/\/$/, "");
  const withoutBase = cleanBase && withoutQuery.startsWith(cleanBase)
    ? withoutQuery.slice(cleanBase.length) || "/"
    : withoutQuery;
  const normalized = withoutBase.length > 1 ? withoutBase.replace(/\/$/, "") : withoutBase;

  return normalized || "/";
}

function decodeHtmlEntities(value: string) {
  const element = document.createElement("textarea");
  element.innerHTML = value;

  return element.value;
}

export default App;
