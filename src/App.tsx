import './App.css'
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import PartnersBanner from './components/PartnersBanner/PartnersBanner';
import Events from './sections/Events/Events';
import EmailBanner from './components/EmailBanner/EmailBanner';
import Team from './sections/Team/Team';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      {/* Hero section with navbar overlay */}
      <Hero />

      {/* About section */}
      <About />

      {/* Partners section */}
      <PartnersBanner />

      {/* Events section */}
      <Events />

      {/* Newsletter section */}
      <EmailBanner />

      {/* Team section */}
      <Team />

      {/* Footer */}
      <Footer />
    </>
  )
}

export default App
