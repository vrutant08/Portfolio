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
          <div className="mb-16">
            <h2 className="section-heading">Technical Skills</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
          {/* Glowing orb background effect */}
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/10 rounded-full filter blur-[100px] -z-10"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-primary/5 rounded-full filter blur-[80px] -z-10"></div>
          
          <div className={`section-transition ${isInView ? 'visible' : ''}`}>
            <div className="mb-10">
              <h3 className="skill-category">Programming & Data Structures</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.programming.map((skill, index) => (
                  <div 
                    key={index} 
                    className="skill-tag group"
                  >
                    <i className={`${skill.icon} mr-2 group-hover:text-white transition-colors`}></i>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="skill-category">Web Development</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.web.map((skill, index) => (
                  <div 
                    key={index} 
                    className="skill-tag group"
                  >
                    <i className={`${skill.icon} mr-2 group-hover:text-white transition-colors`}></i>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className={`section-transition ${isInView ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
            <div className="mb-10">
              <h3 className="skill-category">Design Tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.design.map((skill, index) => (
                  <div 
                    key={index} 
                    className="skill-tag group"
                  >
                    <i className={`${skill.icon} mr-2 group-hover:text-white transition-colors`}></i>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="skill-category">Office & Data Entry Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.office.map((skill, index) => (
                  <div 
                    key={index} 
                    className="skill-tag group"
                  >
                    <i className={`${skill.icon} mr-2 group-hover:text-white transition-colors`}></i>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className={`mt-16 section-transition ${isInView ? 'visible' : ''}`}>
          <div ref={skillsCanvasRef} className="h-64 rounded-md border border-muted overflow-hidden relative">
            {/* The Three.js animation will render here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
