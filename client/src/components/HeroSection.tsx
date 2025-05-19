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
      <div ref={sceneRef} className="absolute inset-0 pointer-events-none z-0"></div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className={`section-transition ${isInView ? 'visible' : ''}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold mb-4">
              <span className="block">I'm Vrutant</span>
              <span className="block mt-2 text-accent h-16">
                <Typewriter 
                  text={roles[currentRoleIndex]} 
                  delay={100} 
                  key={currentRoleIndex}
                />
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg">
              Fueled by a passion for technology and problem-solving, I craft efficient software solutions using modern tech like React.js, Next.js, GSAP animations, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact"
                className="px-6 py-3 bg-accent text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Get in Touch
              </a>
              <a 
                href="#projects"
                className="px-6 py-3 border border-accent text-accent font-medium rounded-md hover:bg-accent hover:text-white transition-colors"
              >
                View Projects
              </a>
            </div>
          </div>
          <div className={`relative section-transition ${isInView ? 'visible' : ''} flex justify-center`}>
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1544717305-996b815c338c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Professional portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 md:bottom-0 md:right-0 bg-white shadow-lg rounded-lg py-2 px-4 flex items-center gap-2">
              <span className="block w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-medium">Available for work</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-accent text-2xl">
            <i className="ri-arrow-down-line"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
