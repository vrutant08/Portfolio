import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { createHeroScene } from '@/lib/three-utils';
import useIntersectionObserver from '@/hooks/use-intersection-observer';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const isInView = useIntersectionObserver(heroRef, { threshold: 0.1 });

  const roles = [
    'Software Developer',
    'Web Developer',
    'Data Entry Specialist',
    'Problem Solver'
  ];

  useEffect(() => {
    // Initialize Three.js scene
    if (sceneRef.current) {
      const { cleanup } = createHeroScene(sceneRef.current);
      
      return () => {
        cleanup();
      };
    }
  }, []);

  // Basic animation sequence
  useEffect(() => {
    // Simple fade-in animations with GSAP
    const elements = [
      '.hero-title',
      '.hero-subtitle',
      '.hero-role',
      '.hero-text',
      '.hero-button',
      '.hero-image'
    ];
    
    elements.forEach((selector, index) => {
      gsap.fromTo(
        selector,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          delay: index * 0.2,
          ease: 'power3.out' 
        }
      );
    });
  }, []);

  // Role typing animation
  useEffect(() => {
    if (isInView) {
      // Start with empty role
      setDisplayedRole('');
      
      // Animate the current role with typewriter effect
      const currentRole = roles[currentRoleIndex];
      let currentIndex = 0;
      let typingInterval: NodeJS.Timeout;
      
      const typeCharacter = () => {
        if (currentIndex < currentRole.length) {
          setDisplayedRole(prev => prev + currentRole[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          
          // Wait before switching to next role
          setTimeout(() => {
            // Create backspace animation
            const backspaceInterval = setInterval(() => {
              setDisplayedRole(prev => prev.slice(0, -1));
              if (displayedRole.length <= 1) {
                clearInterval(backspaceInterval);
                
                // Move to next role after backspacing
                setTimeout(() => {
                  setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
                }, 300);
              }
            }, 50);
          }, 2000);
        }
      };
      
      typingInterval = setInterval(typeCharacter, 100);
      
      return () => {
        clearInterval(typingInterval);
      };
    }
  }, [currentRoleIndex, isInView, roles, displayedRole]);

  return (
    <section
      ref={heroRef} 
      className="min-h-screen flex items-center pt-20 pb-10 relative overflow-hidden" 
      id="hero"
    >
      <div ref={sceneRef} className="absolute inset-0 z-0 opacity-70"></div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background z-0"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-background to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <div className={`md:col-span-3 section-transition ${isInView ? 'visible' : ''}`}>
            <h1 className="font-bold mb-6 relative">
              <span className="hero-title block text-4xl md:text-6xl text-foreground">I'm</span>
              <div className="relative inline-block">
                <span className="hero-subtitle block text-5xl md:text-7xl lg:text-8xl text-primary mt-2 mb-4 relative">
                  Vrutant Panchal
                </span>
                <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary"></div>
              </div>
              <div ref={roleRef} className="hero-role block mt-8 h-16 text-foreground/90 text-3xl md:text-4xl">
                <span>{displayedRole}</span>
                <span className="inline-block w-[3px] h-8 bg-primary ml-1 animate-pulse"></span>
              </div>
            </h1>
            <p className="hero-text text-lg md:text-xl mb-8 max-w-xl text-muted-foreground">
              Fueled by a passion for technology and problem-solving, I craft efficient software solutions with modern tech like React.js, Next.js, GSAP animations, and database management.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact"
                className="hero-button px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-all relative group overflow-hidden"
              >
                <span className="relative z-10">Get in Touch</span>
                <span className="absolute inset-0 bg-white opacity-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
              </a>
              <a 
                href="#projects"
                className="hero-button px-6 py-3 border border-primary text-primary font-medium rounded-md hover:text-primary-foreground transition-all relative group overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transform scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-300 ease-out -z-0"></span>
              </a>
            </div>
          </div>
          <div className={`md:col-span-2 section-transition hero-image ${isInView ? 'visible' : ''} flex justify-center md:justify-end`}>
            <div className="relative rounded-md overflow-hidden border border-primary/20 shadow-lg shadow-primary/10 group transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent mix-blend-overlay z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1544717305-996b815c338c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Professional portrait" 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-white py-2 px-4 rounded-full text-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span>Available for work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a 
            href="#about" 
            className="text-white text-2xl w-10 h-10 flex items-center justify-center bg-primary/20 backdrop-blur-sm rounded-full border border-primary/40 hover:bg-primary/30 transition-colors"
          >
            <i className="ri-arrow-down-line"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
