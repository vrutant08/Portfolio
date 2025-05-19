import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const projects = [
    {
      title: "BookSphere",
      description: "Online MERN Stack Bookstore Application",
      details: "A full-stack online bookstore platform using the MERN stack with Firebase and JWT for authentication and data storage. Integrated features for user authentication, book catalog browsing, cart management, and secure checkout process.",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      imageAlt: "BookSphere Online Bookstore Application",
      badge: "Full Stack",
      tags: ["React.js", "MongoDB", "Express.js", "Node.js", "Firebase", "JWT"]
    }
  ];

  // Animate project card when in view
  useEffect(() => {
    if (isInView && projectRef.current) {
      // Staggered animation for project elements
      const tl = gsap.timeline();
      
      // Project image reveal
      tl.fromTo(
        '.project-image-container',
        { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        { 
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', 
          duration: 1,
          ease: 'power3.inOut'
        }
      )
      
      // Badge and title reveal
      .fromTo(
        '.project-badge',
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          ease: 'back.out(1.7)'
        },
        '-=0.3'
      )
      .fromTo(
        '.project-title',
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          ease: 'power3.out'
        },
        '-=0.4'
      )
      
      // Details reveal
      .fromTo(
        '.project-details',
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          ease: 'power3.out'
        },
        '-=0.3'
      )
      
      // Tags reveal with stagger
      .fromTo(
        '.project-tag',
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.4,
          stagger: 0.05,
          ease: 'back.out(1.7)'
        },
        '-=0.2'
      )
      
      // Button reveal
      .fromTo(
        '.project-button',
        { y: 10, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5,
          ease: 'power3.out'
        },
        '-=0.2'
      );
      
      // Collaboration section
      gsap.fromTo(
        '.collab-section',
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: 'power3.out',
          delay: 1
        }
      );
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-20 bg-background relative overflow-hidden" id="projects">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-secondary/30 to-transparent -z-10"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className={`section-transition ${isInView ? 'visible' : ''}`}>
          <div className="mb-10 relative inline-block">
            <h2 className="section-heading text-white">
              <span className="relative z-20">Projects</span>
            </h2>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-primary animate-pulse"></div>
            <div className="absolute -bottom-2 left-0 w-2/5 h-1 bg-white opacity-70"></div>
          </div>
          <p className="text-muted-foreground max-w-3xl mt-6 mb-16">
            Showcasing innovative solutions and technical expertise through practical, real-world applications.
            <span className="inline-block ml-2 animate-pulse">|</span>
          </p>
        </div>
        
        <div ref={projectRef} className="mb-20">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 project-card section-transition rounded-md ${isInView ? 'visible' : ''}`}
            >
              <div className="lg:col-span-7 lg:order-1 order-2">
                <div className="project-image-container relative overflow-hidden rounded-lg shadow-2xl shadow-primary/10 border border-primary/20 h-full transform hover:scale-[1.01] transition-transform duration-500">
                  <img 
                    src={project.image} 
                    alt={project.imageAlt} 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent/20 flex flex-col justify-end">
                    <div className="p-8">
                      <span className="project-badge px-4 py-2 bg-primary text-white text-sm font-medium rounded-md inline-block mb-4">
                        {project.badge}
                      </span>
                      <h3 className="project-title text-3xl font-bold text-white mb-3">{project.title}</h3>
                      <p className="text-white/90 mb-2 max-w-2xl">{project.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-5 lg:order-2 order-1 flex flex-col justify-center">
                <div className="bg-card/30 backdrop-blur-sm p-8 rounded-lg border border-muted shadow-lg relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary/70"></div>
                  <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary/70"></div>
                  
                  <h3 className="text-2xl font-bold mb-6 text-foreground">Project Overview</h3>
                  <p className="project-details text-muted-foreground mb-8">{project.details}</p>
                  
                  <h4 className="text-sm font-bold mb-4 text-primary">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="project-tag px-3 py-1.5 bg-muted/50 text-foreground/90 rounded-md text-sm border border-muted/80 hover:border-primary/30 hover:bg-muted/70 transition-colors"
                        style={{ transitionDelay: `${tagIndex * 50}ms` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto">
                    <a 
                      href="#contact" 
                      className="project-button inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary font-medium rounded-md hover:bg-primary hover:text-white transition-all relative overflow-hidden group"
                    >
                      <span className="relative z-10">View Project</span>
                      <i className="ri-github-line relative z-10"></i>
                      <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`collab-section text-center mt-16 section-transition ${isInView ? 'visible' : ''}`}>
          <div className="p-8 border border-primary/20 rounded-lg bg-gradient-to-br from-muted/30 to-black/40 backdrop-blur-sm max-w-3xl mx-auto relative shadow-xl shadow-primary/5 group overflow-hidden">
            {/* Decorative accent */}
            <div className="absolute -top-3 -right-3 w-24 h-24 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-top-right"></div>
            
            <h3 className="text-2xl font-bold mb-4 text-white">Ready to Collaborate?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              I'm always interested in working on new and challenging projects. If you have an idea or a project in mind, let's discuss how we can bring it to life.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-white hover:text-primary transition-all duration-300 relative group overflow-hidden transform hover:scale-105"
            >
              <span className="relative z-10">Let's Work Together</span>
              <i className="ri-arrow-right-line relative z-10 group-hover:translate-x-1 transition-transform"></i>
              <span className="absolute bottom-0 left-0 w-full h-0 bg-white group-hover:h-full transition-all duration-300 -z-0"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
