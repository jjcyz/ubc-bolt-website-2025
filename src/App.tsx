import { Routes, Route } from 'react-router-dom';
import Hero from './sections/Hero';
import About from './sections/About';
import Partners from './sections/Partners';
import Events from './sections/Events';
import Newsletter from './sections/Newsletter';
import Team from './sections/Team';
import Footer from './sections/Footer';
import TeamPage from './pages/TeamPage';

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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/team" element={<TeamPage />} />
    </Routes>
  );
}

export default App;
