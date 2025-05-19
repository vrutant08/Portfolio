import { useRef } from "react";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const experiences = [
    {
      title: "Sales & Data Entry Reporting",
      company: "Maharastra Motors",
      location: "Vadodara, Gujarat",
      period: "2018 - Present",
      responsibilities: [
        "Managed product and sales data entry in Busy Accounting Software",
        "Maintained accurate CRM records and customer interaction logs",
        "Prepared Excel-based sales reports with formulas and pivot tables for business insights"
      ],
      achievements: [
        "Streamlined the sales reporting process, reducing report generation time by 30%",
        "Implemented Excel macros to automate routine data analysis tasks"
      ]
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-secondary" id="experience">
      <div className="container mx-auto px-4">
        <div className={`section-transition ${isInView ? 'visible' : ''}`}>
          <div className="mb-16">
            <h2 className="section-heading">Work Experience</h2>
          </div>
        </div>
        
        {experiences.map((experience, index) => (
          <div 
            key={index}
            className={`mb-16 last:mb-0 section-transition ${isInView ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="bg-card border border-muted rounded-md overflow-hidden">
              <div className="p-6 md:p-8 border-b border-muted">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{experience.title}</h3>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <i className="ri-building-line text-primary"></i>
                        {experience.company}
                      </span>
                      <span className="hidden md:inline-block">•</span>
                      <span className="flex items-center gap-1">
                        <i className="ri-map-pin-line text-primary"></i>
                        {experience.location}
                      </span>
                    </div>
                  </div>
                  <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-md text-sm font-medium">
                    <i className="ri-calendar-line mr-2"></i>
                    {experience.period}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
                <div>
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
                    <i className="ri-list-check"></i>
                    <span>Responsibilities</span>
                  </h4>
                  <ul className="space-y-3">
                    {experience.responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <i className="ri-arrow-right-circle-line text-primary mt-1 flex-shrink-0"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
                    <i className="ri-trophy-line"></i>
                    <span>Key Achievements</span>
                  </h4>
                  <ul className="space-y-3">
                    {experience.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <i className="ri-check-double-line text-primary mt-1 flex-shrink-0"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="p-6 md:p-8 bg-background/50 border-t border-muted">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
                  <i className="ri-tools-line"></i>
                  <span>Skills Applied</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm">Microsoft Excel</span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm">Data Entry</span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm">CRM</span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm">Busy Accounting</span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm">Reporting</span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm">Pivot Tables</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
