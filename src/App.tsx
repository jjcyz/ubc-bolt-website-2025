import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import Partners from './sections/Partners';
import Events from './sections/Events';
import Newsletter from './sections/Newsletter';
import Team from './sections/Team';
import Footer from './sections/Footer';

// Lazy load page components for better performance
const TeamPage = lazy(() => import('./pages/TeamPage'));
const FirstBytePage = lazy(() => import('./pages/FirstBytePage'));
const BoltConnectPage = lazy(() => import('./pages/BoltConnectPage'));
const BoltCircuitPage = lazy(() => import('./pages/BoltCircuitPage'));
const BoltBootcampPage = lazy(() => import('./pages/BoltBootcampPage'));

// Home page component
function HomePage() {
  return (
    <>
      {/* Hero section with navbar overlay */}
      <Hero />

      {/* About section */}
      <About />

      {/* Partners section */}
      <Partners />

      {/* Events section */}
      <Events />

      {/* Newsletter section */}
      <Newsletter />

      {/* Team section */}
      <Team />

      {/* Footer */}
      <Footer />
    </>
  );
}

// Loading component for suspense fallback
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#614ea5] to-[#493b7b] flex items-center justify-center">
      <div className="text-white font-inter text-xl">Loading...</div>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/events/first-byte" element={<FirstBytePage />} />
        <Route path="/events/bolt-connect" element={<BoltConnectPage />} />
        <Route path="/events/bolt-circuit" element={<BoltCircuitPage />} />
        <Route path="/events/bolt-bootcamp" element={<BoltBootcampPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
