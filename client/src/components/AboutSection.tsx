import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { useRef } from "react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className={`section-transition ${isInView ? 'visible' : ''}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold">About Me</h2>
            <div className="w-20 h-1 bg-accent mx-auto mt-4"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`section-transition ${isInView ? 'visible' : ''}`}>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Modern workspace with computer and coding environment" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <span className="px-3 py-1 bg-accent text-white text-sm font-medium rounded-full">Developer</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`section-transition ${isInView ? 'visible' : ''}`}>
            <h3 className="text-2xl font-montserrat font-bold mb-4">
              Software Developer with a passion for creating efficient solutions
            </h3>
            <p className="mb-4">
              Specializing in crafting efficient software solutions using modern tech like 
              <span className="text-accent font-medium"> React.js, Next.js, GSAP animations, Database Management and Native HTML5 stack</span>.
            </p>
            <p className="mb-6">
              Beyond development, I bring high-precision support skills to the table; advanced Microsoft Excel, real-world experience with Busy Accounting Software, Tally ERP, and a 120 WPM typing speed.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-medium mb-2">Education</h4>
                <p>Diploma in Information Technology</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Location</h4>
                <p>Vadodara, Gujarat, India</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Email</h4>
                <p className="truncate">vrutantpanchal1454@gmail.com</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">LinkedIn</h4>
                <p className="truncate">linkedin.com/in/vrutantpanchal</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Software Dev</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Web Dev</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Data Entry</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Problem Solver</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Classical Music</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
