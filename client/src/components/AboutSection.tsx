import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { useRef } from "react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-20 bg-secondary" id="about">
      <div className="container mx-auto px-4">
        <div className={`section-transition ${isInView ? 'visible' : ''}`}>
          <div className="mb-12">
            <h2 className="section-heading">About Me</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          <div className={`md:col-span-2 section-transition ${isInView ? 'visible' : ''}`}>
            <div className="relative rounded-md overflow-hidden border border-muted">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Modern workspace with computer and coding environment" 
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/90 text-primary-foreground rounded-md text-sm">Software Dev</span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm">Web Dev</span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm">Data Entry</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`md:col-span-3 section-transition ${isInView ? 'visible' : ''}`}>
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              Software Developer with a passion for creating efficient solutions
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Specializing in crafting efficient software solutions using modern tech like 
                <span className="text-primary font-medium"> React.js, Next.js, GSAP animations, Database Management and Native HTML5 stack</span>.
              </p>
              <p>
                Beyond development, I bring high-precision support skills to the table; advanced Microsoft Excel, real-world experience with Busy Accounting Software, Tally ERP, and a 120 WPM typing speed.
              </p>
            </div>
            
            <div className="mt-8 p-4 border border-muted rounded-md bg-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-primary font-medium mb-2 flex items-center gap-2">
                    <i className="ri-mail-line"></i>
                    <span>Email</span>
                  </h4>
                  <p className="text-muted-foreground">vrutantpanchal1454@gmail.com</p>
                </div>
                <div>
                  <h4 className="text-primary font-medium mb-2 flex items-center gap-2">
                    <i className="ri-linkedin-box-line"></i>
                    <span>LinkedIn</span>
                  </h4>
                  <p className="text-muted-foreground">linkedin.com/in/vrutantpanchal</p>
                </div>
                <div>
                  <h4 className="text-primary font-medium mb-2 flex items-center gap-2">
                    <i className="ri-map-pin-line"></i>
                    <span>Location</span>
                  </h4>
                  <p className="text-muted-foreground">Vadodara, Gujarat, India</p>
                </div>
                <div>
                  <h4 className="text-primary font-medium mb-2 flex items-center gap-2">
                    <i className="ri-phone-line"></i>
                    <span>Phone</span>
                  </h4>
                  <p className="text-muted-foreground">+918141824437</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
