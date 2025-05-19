import { useRef } from "react";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

const EducationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const education = [
    {
      title: "Diploma in Information Technology",
      institution: "Maharaja Sayajirao University (Polytechnic)",
      period: "2019 - 2022",
      location: "Vadodara, Gujarat",
      achievements: ["CodeFest 2024 Achievement: Secured 7th Rank in CodeFest 2024, demonstrating proficiency in problem-solving and programming"]
    },
    {
      title: "SSC (Secondary School Certificate)",
      institution: "Alembic Vidyalaya",
      period: "2018 - 2019",
      location: "Vadodara, Gujarat",
      achievements: [
        "NTSTE 2021 Rank: Ranked in National Level Science Talent Search Examination (NTSTE) 2021, demonstrating exceptional mathematical reasoning",
        "IMO 2021 Rank: Achieved Top 50 National Rank in the International Mathematics Olympiad (IMO) 2021"
      ]
    }
  ];

  const certifications = [
    {
      title: "Mexoxo 'Take the lead'",
      issuer: "Certificate of Educational Program Hosted by KCornell University",
      icon: "ri-award-line"
    },
    {
      title: "English (B2)",
      issuer: "Language Proficiency Certification",
      icon: "ri-translate-2"
    },
    {
      title: "Classical Music \"Visharada\"",
      issuer: "Degree of 7th Grade in Classical Music with Piano",
      icon: "ri-music-line"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-secondary" id="education">
      <div className="container mx-auto px-4">
        <div className={`section-transition ${isInView ? 'visible' : ''}`}>
          <div className="mb-16">
            <h2 className="section-heading">Education & Certifications</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education */}
          <div className={`section-transition ${isInView ? 'visible' : ''}`}>
            <div className="p-6 bg-card rounded-md border border-muted">
              <h3 className="text-2xl font-bold mb-8 text-primary">Education</h3>
              
              <div className="space-y-12">
                {education.map((item, index) => (
                  <div key={index} className="relative pl-8 border-l border-primary/20">
                    <div className="absolute left-0 top-0 w-5 h-5 -ml-2.5 rounded-full bg-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-background"></div>
                    </div>
                    
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-md mb-2">
                        {item.period}
                      </span>
                      <h4 className="text-xl font-bold text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground">
                        {item.institution}, {item.location}
                      </p>
                    </div>
                    
                    {item.achievements.length > 0 && (
                      <div className="bg-background/50 p-4 rounded-md">
                        <h5 className="text-sm font-bold mb-2 text-primary">Achievements</h5>
                        <ul className="space-y-2">
                          {item.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                              <i className="ri-trophy-line text-primary mt-1 flex-shrink-0"></i>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Certifications */}
          <div className={`section-transition ${isInView ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
            <div className="p-6 bg-card rounded-md border border-muted">
              <h3 className="text-2xl font-bold mb-8 text-primary">Certifications</h3>
              
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-md bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <i className={`${cert.icon} text-xl`}></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">{cert.title}</h4>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Classical Music interest highlight */}
              <div className="mt-12 p-4 border border-primary/20 rounded-md bg-background/50">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
                  <i className="ri-music-2-line"></i>
                  <span>Classical Music Interest</span>
                </h4>
                <p className="text-muted-foreground">
                  Passionate about classical music, with a Visharada degree (7th Grade) showcasing proficiency in piano performance and music theory. This background enhances creative problem-solving and attention to detail in technical work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;