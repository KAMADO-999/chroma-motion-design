
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "AuthKit",
      description: "The world's best login box, powered by WorkOS + Radix.",
      image: "/lovable-uploads/3e330e33-0964-477b-9581-05b9e92467e3.png",
      tech: ["React", "WorkOS", "Radix UI"],
      github: "#",
      live: "#"
    },
    {
      title: "Animated Portfolio",
      description: "Step-by-step tutorial for creating animated portfolio websites.",
      image: "/lovable-uploads/6b17ed67-7444-473b-b84a-191d0930fc3f.png",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "#",
      live: "#"
    },
    {
      title: "Web Animation Tools",
      description: "Top web animation tools - Learn by doing with interactive examples.",
      image: "/lovable-uploads/9aa52dfc-4168-4817-9452-73732e5246b5.png",
      tech: ["React", "GSAP", "Three.js"],
      github: "#",
      live: "#"
    },
    {
      title: "Gaming Website",
      description: "Create stunning gaming websites with modern web technologies.",
      image: "/lovable-uploads/6ba3a40d-53dd-45bd-9dd1-56e4575e15c7.png",
      tech: ["React", "Three.js", "WebGL"],
      github: "#",
      live: "#"
    },
    {
      title: "3D Portfolio",
      description: "Create immersive 3D portfolio experiences with interactive elements.",
      image: "/lovable-uploads/eda94029-8f32-4deb-9c2e-6a5d0d466fe8.png",
      tech: ["Three.js", "React", "GSAP"],
      github: "#",
      live: "#"
    },
    {
      title: "Gaming UI Design",
      description: "Next-level gaming UI design with smooth animations and effects.",
      image: "/lovable-uploads/147c7149-260f-4595-bdf4-0a2d5e811996.png",
      tech: ["CSS", "JavaScript", "GSAP"],
      github: "#",
      live: "#"
    }
  ];

  useEffect(() => {
    gsap.fromTo(titleRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%"
      }
    });

    gsap.fromTo(".project-card", {
      opacity: 0,
      y: 100,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 70%"
      }
    });

    // Card hover animations
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(card.querySelector('.card-glow'), {
          opacity: 1,
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(card.querySelector('.card-glow'), {
          opacity: 0,
          duration: 0.3
        });
      });
    });
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
          Featured <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
        </h2>

        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="project-card group relative">
              {/* Card glow effect */}
              <div className="card-glow absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur opacity-0 transition-opacity duration-300"></div>
              
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-slate-400 mb-4 line-clamp-2">{project.description}</p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 text-xs bg-slate-700/50 text-slate-300 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a 
                      href={project.github}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all duration-300 text-sm"
                    >
                      <Github size={16} />
                      Code
                    </a>
                    <a 
                      href={project.live}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-400 rounded-lg transition-all duration-300 text-sm"
                    >
                      <ExternalLink size={16} />
                      Live
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
