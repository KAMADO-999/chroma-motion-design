
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
    
    // Hero animations
    tl.fromTo(titleRef.current, {
      opacity: 0,
      y: 50,
      filter: "blur(10px)"
    }, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out"
    })
    .fromTo(subtitleRef.current, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .fromTo(buttonRef.current?.children, {
      opacity: 0,
      y: 20,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .fromTo(splineRef.current, {
      opacity: 0,
      x: 100
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8");

    // Floating orbs animation
    gsap.to(".glow-orb", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });

    // CTA button hover effect
    const ctaButton = buttonRef.current?.querySelector('.cta-button');
    if (ctaButton) {
      ctaButton.addEventListener('mouseenter', () => {
        gsap.to(ctaButton, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glow-orb absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="glow-orb absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="glow-orb absolute top-1/2 left-3/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl font-bold leading-tight"
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
              className="text-xl text-slate-400 max-w-lg leading-relaxed"
            >
              Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
            </p>
            
            <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4">
              <button className="cta-button group bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                Hire Me
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group border border-slate-600 text-slate-300 px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300">
                Download CV
                <Download size={20} />
              </button>
            </div>
          </div>

          {/* Right Content - Spline 3D */}
          <div ref={splineRef} className="relative w-full h-[600px] lg:h-[700px]">
            <iframe 
              src='https://my.spline.design/orb-eT3a18hSR4lh38qXJtdfEcry/' 
              frameBorder='0' 
              width='100%' 
              height='100%'
              className="absolute inset-0 w-full h-full object-cover"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
