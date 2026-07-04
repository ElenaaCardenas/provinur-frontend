import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Locations from "../components/home/Locations";
import ContactCTA from '../components/home/ContactCTA';
import AboutSection from '../components/home/AboutSection';

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AboutSection />
      <Locations />
      <ContactCTA />
    </>
  );
}

export default Home;