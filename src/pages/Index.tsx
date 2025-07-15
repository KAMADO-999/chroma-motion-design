
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import SmoothScroll from '../components/SmoothScroll';
import CustomCursor from '../components/CustomCursor';

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Preloader onComplete={handleLoadingComplete} />}
      
      <div className={`min-h-screen bg-slate-900 text-white transition-opacity duration-1000 cursor-none ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <CustomCursor />
        <SmoothScroll>
          <Navigation />
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </SmoothScroll>
      </div>
    </>
  );
};

export default Index;
