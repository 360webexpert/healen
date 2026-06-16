import { Router, Route, Switch } from "wouter";
import { LandingPage } from "./pages/LandingPage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { NewPatientPage } from "./pages/NewPatientPage";
import { ContactPage } from "./pages/ContactPage";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
  return (
    <Router base={base}>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/services" component={ServicesPage} />
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
