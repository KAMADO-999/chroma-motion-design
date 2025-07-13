
import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(".mobile-menu", {
        x: 0,
        duration: 0.5,
        ease: "power3.out"
      });
      gsap.to(".mobile-menu-item", {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.1,
        delay: 0.2
      });
    }
  }, [isOpen]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/80 backdrop-blur-md border-b border-slate-800' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AS
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-300 hover:text-cyan-400 transition-colors relative group"
                >
                  {item.name}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed top-0 right-0 h-full w-80 bg-slate-900/95 backdrop-blur-md z-50 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 md:hidden`}>
        <div className="p-8 pt-20">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className="mobile-menu-item block text-2xl text-slate-300 hover:text-cyan-400 mb-6 opacity-0 translate-y-4"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          
          <div className="flex space-x-6 mt-12">
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
              <Github size={24} />
            </a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
