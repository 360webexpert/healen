import { Router, Route, Switch } from "wouter";
import { LandingPage } from "./pages/LandingPage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { NewPatientPage } from "./pages/NewPatientPage";
import { ContactPage } from "./pages/ContactPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
  return (
    <Router base={base}>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/services/sleep-apnea">
          {() => <ServiceDetailPage slug="sleep-apnea" />}
        </Route>
        <Route path="/services/snoring">
          {() => <ServiceDetailPage slug="snoring" />}
        </Route>
        <Route path="/services/cpap">
          {() => <ServiceDetailPage slug="cpap" />}
        </Route>
        <Route path="/services/circadian-rhythm">
          {() => <ServiceDetailPage slug="circadian-rhythm" />}
        </Route>
        <Route path="/services/insomnia">
          {() => <ServiceDetailPage slug="insomnia" />}
        </Route>
        <Route path="/services/hypersomnia">
          {() => <ServiceDetailPage slug="hypersomnia" />}
        </Route>
        <Route path="/services/nasal-obstruction">
          {() => <ServiceDetailPage slug="nasal-obstruction" />}
        </Route>
        <Route path="/services/sinusitis">
          {() => <ServiceDetailPage slug="sinusitis" />}
        </Route>
        <Route path="/services/allergies">
          {() => <ServiceDetailPage slug="allergies" />}
        </Route>
        <Route path="/services/ear-conditions">
          {() => <ServiceDetailPage slug="ear-conditions" />}
        </Route>
        <Route path="/services/throat-voice">
          {() => <ServiceDetailPage slug="throat-voice" />}
        </Route>
        <Route path="/services/pediatric-ent">
          {() => <ServiceDetailPage slug="pediatric-ent" />}
        </Route>
        <Route path="/new-patient" component={NewPatientPage} />
        <Route path="/contact" component={ContactPage} />
        <Route>
          <div className="min-h-screen flex items-center justify-center bg-[#1D3A5F] text-white font-['Inter']">
            <div className="text-center">
              <p className="text-[#BBDBED] text-xs uppercase tracking-widest mb-3">404</p>
              <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
              <a href="/" className="text-[#E7FFD9] underline hover:opacity-80 transition-opacity">← Back to Home</a>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
