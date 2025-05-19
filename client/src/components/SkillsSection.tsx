import { useRef, useEffect } from "react";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { createSkillsScene } from "@/lib/three-utils";

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsCanvasRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  // Initialize skill bars animation
  useEffect(() => {
    if (isInView) {
      const skillBars = document.querySelectorAll('.skill-progress');
      skillBars.forEach(bar => {
        const width = (bar as HTMLElement).dataset.width || "0%";
        (bar as HTMLElement).style.transform = `scaleX(${parseInt(width) / 100})`;
      });
    }
  }, [isInView]);

  // Initialize Three.js scene
  useEffect(() => {
    if (skillsCanvasRef.current && isInView) {
      const { cleanup } = createSkillsScene(skillsCanvasRef.current);
      return () => {
        cleanup();
      };
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-100" id="skills">
      <div className="container mx-auto px-4">
        <div className={`section-transition ${isInView ? 'visible' : ''}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold">Technical Skills</h2>
            <div className="w-20 h-1 bg-accent mx-auto mt-4"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className={`section-transition ${isInView ? 'visible' : ''} relative`}>
            <div className="relative z-10">
              <h3 className="text-2xl font-montserrat font-semibold mb-6">Programming & Data Structures</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">C/C++</span>
                    <span>85%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="85%"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Java</span>
                    <span>75%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="75%"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Python</span>
                    <span>80%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="80%"></div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-montserrat font-semibold mb-6 mt-10">Web Development</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">React Stack (MERN)</span>
                    <span>90%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="90%"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Three.js</span>
                    <span>70%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="70%"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">HTML5 & CSS</span>
                    <span>95%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="95%"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl -z-10"></div>
          </div>
          
          <div className={`section-transition ${isInView ? 'visible' : ''}`}>
            <h3 className="text-2xl font-montserrat font-semibold mb-6">Design & Office Skills</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Video/Image Editing</span>
                  <span>80%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="80%"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Spline</span>
                  <span>75%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="75%"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Figma</span>
                  <span>85%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="85%"></div>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-montserrat font-semibold mb-6 mt-10">Office & Data Entry Skills</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">MS Office (Publisher, Excel)</span>
                  <span>95%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="95%"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Busy Accounting Software</span>
                  <span>85%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="85%"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Typing Speed (130-150 WPM)</span>
                  <span>98%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" data-width="98%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`mt-16 section-transition ${isInView ? 'visible' : ''}`}>
          <div ref={skillsCanvasRef} className="h-64 bg-white rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-lg font-medium text-center max-w-md px-4">
                Hover over this area to interact with the 3D skills visualization
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
