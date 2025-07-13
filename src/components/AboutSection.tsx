
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'HTML5', color: 'text-orange-400' },
    { name: 'CSS3', color: 'text-blue-400' },
    { name: 'JavaScript', color: 'text-yellow-400' },
    { name: 'React', color: 'text-cyan-400' },
    { name: 'GSAP', color: 'text-green-400' },
    { name: 'Three.js', color: 'text-purple-400' },
    { name: 'Node.js', color: 'text-green-500' },
    { name: 'MongoDB', color: 'text-green-600' }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    
    gsap.fromTo(section, {
      opacity: 0,
      filter: "blur(10px)"
    }, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.fromTo(imageRef.current, {
      x: -100,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 80%"
      }
    });

    gsap.fromTo(contentRef.current?.children, {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%"
      }
    });

    gsap.fromTo(skillsRef.current?.children, {
      scale: 0,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 80%"
      }
    });

    // Image hover animation
    const profileImage = imageRef.current;
    if (profileImage) {
      profileImage.addEventListener('mouseenter', () => {
        gsap.to(profileImage, {
          rotationY: 10,
          scale: 1.05,
          duration: 0.5,
          ease: "power2.out"
        });
      });
      
      profileImage.addEventListener('mouseleave', () => {
        gsap.to(profileImage, {
          rotationY: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-xl"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 rounded-full border border-slate-600 overflow-hidden">
                <div className="absolute inset-4 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                    AS
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Me</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                I'm a passionate full-stack developer with 5+ years of experience crafting digital experiences that inspire and engage. I specialize in modern web technologies and have a keen eye for design and user experience.
              </p>
              <p className="text-slate-400 text-lg leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>

            {/* Skills Grid */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Skills & Technologies</h3>
              <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="group p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 hover:bg-slate-800/70"
                  >
                    <div className={`text-center ${skill.color} font-semibold group-hover:scale-110 transition-transform duration-300`}>
                      {skill.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
