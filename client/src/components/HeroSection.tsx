import { useEffect, useRef, useState } from 'react';
import Typewriter from '@/components/ui/typewriter';
import { createHeroScene } from '@/lib/three-utils';
import useIntersectionObserver from '@/hooks/use-intersection-observer';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
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

  useEffect(() => {
    if (isInView) {
      // Animation for role switching
      const roleInterval = setInterval(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }, 4000); // Change role every 4 seconds

      return () => {
        clearInterval(roleInterval);
      };
    }
  }, [isInView, roles.length]);

  return (
    <section
      ref={heroRef} 
      className="min-h-screen flex items-center pt-20 pb-10 relative overflow-hidden" 
      id="hero"
    >
      <div ref={sceneRef} className="absolute inset-0 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <div className={`md:col-span-3 section-transition ${isInView ? 'visible' : ''}`}>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
              <span className="block text-foreground">I'm</span>
              <span className="block text-primary">Vrutant Panchal</span>
              <span className="block mt-4 h-16 text-foreground/80">
                <Typewriter 
                  text={roles[currentRoleIndex]} 
                  delay={100} 
                  key={currentRoleIndex}
                />
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-xl text-muted-foreground">
              Fueled by a passion for technology and problem-solving, I craft efficient software solutions with modern tech like React.js, Next.js, GSAP animations, and database management.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact"
                className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
              >
                Get in Touch
              </a>
              <a 
                href="#projects"
                className="px-6 py-3 border border-primary text-primary font-medium rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                View Projects
              </a>
            </div>
          </div>
          <div className={`md:col-span-2 section-transition ${isInView ? 'visible' : ''} flex justify-center md:justify-end`}>
            <div className="relative rounded-md overflow-hidden border border-muted">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent mix-blend-overlay z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1544717305-996b815c338c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Professional portrait" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent z-20">
                <div className="inline-flex items-center gap-2 bg-secondary text-foreground py-1.5 px-3 rounded-full text-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span>Available for work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-primary text-2xl">
            <i className="ri-arrow-down-line"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
