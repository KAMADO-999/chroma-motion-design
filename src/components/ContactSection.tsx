
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Github, Linkedin, Twitter, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    gsap.fromTo(".contact-title", {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%"
      }
    });

    gsap.fromTo(formRef.current?.children, {
      opacity: 0,
      x: -50
    }, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 80%"
      }
    });

    gsap.fromTo(socialRef.current?.children, {
      opacity: 0,
      scale: 0
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: socialRef.current,
        start: "top 80%"
      }
    });

    // Social icons hover animations
    const socialIcons = socialRef.current?.querySelectorAll('.social-icon');
    socialIcons?.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          scale: 1.2,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit button animation
    const submitBtn = e.currentTarget.querySelector('.submit-btn');
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    // Handle form submission here
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:aditya@example.com', label: 'Email' }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="contact-title text-4xl md:text-5xl font-bold text-center text-white mb-16">
          Get In <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="submit-btn group w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Send Message
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Let's Connect</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Have a project in mind or just want to say hello? Drop me a message 
                and I'll get back to you as soon as possible.
              </p>
            </div>

            {/* Social Icons */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
              <div ref={socialRef} className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="social-icon group p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl hover:border-cyan-400/50 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon 
                      size={24} 
                      className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" 
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-cyan-400" size={20} />
                <span className="text-slate-300">aditya@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
