import { useRef } from "react";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const experiences = [
    {
      type: "work",
      title: "Sales & Data Entry Reporting",
      organization: "Maharastra Motors, Vadodara, Gujarat",
      period: "2018 - Present",
      icon: "ri-briefcase-line",
      points: [
        "Managed product and sales data entry in Busy Accounting Software. Maintained accurate CRM records and customer interaction logs.",
        "Prepared Excel-based sales reports with formulas and pivot tables for business insights."
      ]
    },
    {
      type: "education",
      title: "Diploma in Information Technology",
      organization: "Maharaja Sayajirao University (Polytechnic)",
      period: "2019 - 2022",
      icon: "ri-graduation-cap-line",
      points: [
        "Specialized in Information Technology with focus on programming and web development.",
        "CodeFest 2024 Achievement: Secured 7th Rank, demonstrating exceptional problem-solving skills."
      ]
    },
    {
      type: "education",
      title: "SSC (Secondary School Certificate)",
      organization: "Alembic Vidyalaya, Vadodara, Gujarat",
      period: "2018 - 2019",
      icon: "ri-graduation-cap-line",
      points: [
        "NTSTE 2021 Rank: Achieved in National Level Science Talent Search Examination, demonstrating exceptional mathematical reasoning.",
        "IMO 2021 Rank: Achieved Top 50 National Rank in the International Mathematics Olympiad."
      ]
    }
  ];

  const certifications = [
    {
      title: "Mexoxo 'Take the lead'",
      organization: "Certificate of Educational Program Hosted by KCornell University"
    },
    {
      title: "English (B2)",
      organization: "Language Proficiency Certification"
    },
    {
      title: "Classical Music \"Visharada\"",
      organization: "Degree of 7th Grade in Classical Music with Piano"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-100" id="experience">
      <div className="container mx-auto px-4">
        <div className={`section-transition ${isInView ? 'visible' : ''}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold">Work Experience</h2>
            <div className="w-20 h-1 bg-accent mx-auto mt-4"></div>
          </div>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-0.5 bg-accent/30"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((experience, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`${
                    experience.type === "education" && isEven 
                      ? "md:col-start-1" 
                      : experience.type === "work" && !isEven 
                        ? "md:col-start-1" 
                        : "md:col-start-2"
                  } section-transition ${isInView ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative bg-white p-6 rounded-xl shadow-lg">
                    <div className={`absolute top-1/2 ${
                      experience.type === "education" && isEven || experience.type === "work" && !isEven
                        ? "-right-3 md:-right-5"
                        : "-left-3 md:-left-5"
                    } transform -translate-y-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white`}>
                      <i className={experience.icon}></i>
                    </div>
                    <div className={experience.type === "education" && isEven || experience.type === "work" && !isEven ? "mr-2" : "ml-2"}>
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <h3 className="text-xl font-montserrat font-semibold">{experience.title}</h3>
                        <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">{experience.period}</span>
                      </div>
                      <h4 className="text-lg mb-3">{experience.organization}</h4>
                      <ul className="space-y-2 text-sm">
                        {experience.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-2">
                            <i className="ri-checkbox-circle-line text-accent mt-1 flex-shrink-0"></i>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Certifications */}
            <div className={`md:col-start-1 section-transition ${isInView ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
              <div className="relative bg-white p-6 rounded-xl shadow-lg">
                <div className="absolute top-1/2 -right-3 md:-right-5 transform -translate-y-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white">
                  <i className="ri-award-line"></i>
                </div>
                <div className="mr-2">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h3 className="text-xl font-montserrat font-semibold">Certifications</h3>
                  </div>
                  <ul className="space-y-4 text-sm">
                    {certifications.map((cert, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-line text-accent mt-1 flex-shrink-0"></i>
                        <div>
                          <span className="font-medium block">{cert.title}</span>
                          <span className="text-gray-600">{cert.organization}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
