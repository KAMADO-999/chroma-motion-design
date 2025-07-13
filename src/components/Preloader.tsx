
import { useEffect } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate progress bar
    tl.to(".progress-bar", {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
    })
    .to(".progress-text", {
      opacity: 1,
      y: 0,
      duration: 0.5,
    }, "-=2")
    .to(".logo-text", {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)",
    }, "-=2")
    .to(".preloader", {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      onComplete: () => {
        onComplete();
      }
    }, "+=0.5");
  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="logo-text text-4xl md:text-6xl font-bold text-white mb-8 opacity-0 scale-75">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            PORTFOLIO
          </span>
        </div>
        
        <div className="relative w-80 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="progress-bar absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full w-0"></div>
        </div>
        
        <div className="progress-text mt-4 text-slate-400 opacity-0 translate-y-4">
          Loading Experience...
        </div>
      </div>
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-3 h-3 bg-cyan-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-purple-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-blue-400 rounded-full opacity-30 animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default Preloader;
