import { useRef, useEffect } from "react";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { createSkillsScene } from "@/lib/three-utils";

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsCanvasRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  // Initialize Three.js scene
  useEffect(() => {
    if (skillsCanvasRef.current && isInView) {
      const { cleanup } = createSkillsScene(skillsCanvasRef.current);
      return () => {
        cleanup();
      };
    }
  }, [isInView]);

  const skills = {
    programming: [
      { name: "C/C++", icon: "ri-code-s-slash-line" },
      { name: "Java", icon: "ri-cup-line" },
      { name: "Python", icon: "ri-code-box-line" },
      { name: "Data Structures & Algorithms", icon: "ri-brackets-line" }
    ],
    web: [
      { name: "React Stack (MERN)", icon: "ri-reactjs-line" },
      { name: "HTML5 & CSS", icon: "ri-html5-line" },
      { name: "JavaScript/TypeScript", icon: "ri-javascript-line" },
      { name: "Three.js", icon: "ri-3d-cube-line" },
      { name: "GSAP Animations", icon: "ri-animation-line" }
    ],
    design: [
      { name: "Video/Image Editing", icon: "ri-movie-line" },
      { name: "Spline", icon: "ri-shape-line" },
      { name: "Figma", icon: "ri-pen-nib-line" }
    ],
    office: [
      { name: "MS Office (Publisher, Excel)", icon: "ri-file-excel-line" },
      { name: "Busy Accounting Software", icon: "ri-bank-line" },
      { name: "Tally ERP", icon: "ri-calculator-line" },
      { name: "Typing Speed (130-150 WPM)", icon: "ri-keyboard-line" }
    ]
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background" id="skills">
      <div className="container mx-auto px-4">
        <div className={`section-transition ${isInView ? 'visible' : ''}`}>
          <div className="mb-10 relative inline-block">
            <h2 className="section-heading text-white">
              <span className="relative z-20">Technical Skills</span>
            </h2>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-primary animate-pulse"></div>
            <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-white opacity-70"></div>
          </div>
          <p className="text-muted-foreground max-w-3xl mt-6 mb-16">
            A dynamic blend of programming expertise, web development mastery, and practical professional skills.
            <span className="inline-block ml-2 animate-pulse">|</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
          {/* Ambient background effects */}
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/10 rounded-full filter blur-[100px] -z-10 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-primary/5 rounded-full filter blur-[80px] -z-10"></div>
          
          <div className={`section-transition ${isInView ? 'visible' : ''}`}>
            <div className="mb-16 relative group">
              <h3 className="skill-category group-hover:text-white transition-all duration-500">
                <span className="relative inline-block">
                  Programming & Data Structures
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500"></span>
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {skills.programming.map((skill, index) => (
                  <div 
                    key={index} 
                    className="skill-tag group transform hover:scale-105 transition-all"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <i className={`${skill.icon} mr-2 group-hover:text-white transition-colors`}></i>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative group">
              <h3 className="skill-category group-hover:text-white transition-all duration-500">
                <span className="relative inline-block">
                  Web Development
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500"></span>
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {skills.web.map((skill, index) => (
                  <div 
                    key={index} 
                    className="skill-tag group transform hover:scale-105 transition-all"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <i className={`${skill.icon} mr-2 group-hover:text-white transition-colors`}></i>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className={`section-transition ${isInView ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
            <div className="mb-16 relative group">
              <h3 className="skill-category group-hover:text-white transition-all duration-500">
                <span className="relative inline-block">
                  Design Tools
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500"></span>
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {skills.design.map((skill, index) => (
                  <div 
                    key={index} 
                    className="skill-tag group transform hover:scale-105 transition-all"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <i className={`${skill.icon} mr-2 group-hover:text-white transition-colors`}></i>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative group">
              <h3 className="skill-category group-hover:text-white transition-all duration-500">
                <span className="relative inline-block">
                  Office & Data Entry Skills
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500"></span>
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {skills.office.map((skill, index) => (
                  <div 
                    key={index} 
                    className="skill-tag group transform hover:scale-105 transition-all"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <i className={`${skill.icon} mr-2 group-hover:text-white transition-colors`}></i>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Visual representation of skills with 3D elements */}
        <div className={`mt-16 section-transition ${isInView ? 'visible' : ''}`}>
          <div ref={skillsCanvasRef} className="h-64 rounded-md border border-primary/20 overflow-hidden relative bg-gradient-to-r from-background via-muted to-background">
            {/* The Three.js animation will render here */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/5 to-transparent opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
