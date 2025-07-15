
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Download } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Hero animations - simplified for performance
    tl.fromTo(titleRef.current, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .fromTo(subtitleRef.current, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .fromTo(buttonRef.current?.children, {
      opacity: 0,
      y: 15
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "power2.out"
    }, "-=0.3")
    .fromTo(splineRef.current, {
      opacity: 0
    }, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6");

    // Simplified floating animation - less intensive
    gsap.to(".glow-orb", {
      y: -15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 1
    });
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Background Spline 3D Model - optimized loading */}
      <div ref={splineRef} className="absolute inset-0 w-full h-full z-0 opacity-80">
        <iframe 
          src='https://my.spline.design/orb-eT3a18hSR4lh38qXJtdfEcry/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="absolute inset-0 w-full h-full object-cover"
          style={{ border: 'none' }}
          loading="lazy"
        />
      </div>

      {/* Background orbs - reduced count for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="glow-orb absolute top-1/4 left-1/4 w-48 h-48 bg-cyan-500/8 rounded-full blur-3xl"></div>
        <div className="glow-orb absolute top-3/4 right-1/4 w-64 h-64 bg-purple-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          {/* Main Content */}
          <div className="space-y-8 max-w-4xl">
            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Aditya Srivastava
              </span>
              <br />
              <span className="text-slate-300">Web Developer</span>
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
            </p>
            
            <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                Hire Me
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group border border-slate-600 text-slate-300 px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300">
                Download CV
                <Download size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 z-20">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
