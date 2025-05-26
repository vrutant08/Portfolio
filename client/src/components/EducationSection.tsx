import { useRef, useEffect, useState } from "react";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

const EducationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const [gsapLoaded, setGsapLoaded] = useState(false);

  // Load GSAP
  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      setGsapLoaded(true);
    });
  }, []);

  // Animate timeline when in view
  useEffect(() => {
    if (!isInView || !timelineRef.current || !gsapLoaded) return;

    import('gsap').then(({ gsap }) => {
      // Vertical timeline line animation
      gsap.fromTo(
        '.timeline-line',
        { height: 0 },
        { height: '100%', duration: 1.5, ease: 'power3.inOut' }
      );
      
      // Animate timeline nodes and content with stagger
      gsap.fromTo(
        '.timeline-node',
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.4,
          ease: 'back.out(1.7)',
          delay: 0.2
        }
      );
      
      // Animate content blocks with stagger
      gsap.fromTo(
        '.timeline-content',
        { x: -30, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.7, 
          stagger: 0.4,
          ease: 'power3.out',
          delay: 0.4
        }
      );
    });
  }, [isInView, gsapLoaded]);

  // Animate certification cards when in view
  useEffect(() => {
    if (isInView) {
      gsap.fromTo(
        '.cert-card',
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.7, 
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.8
        }
      );
      
      // Music highlight animation
      gsap.fromTo(
        '.music-highlight',
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.7,
          ease: 'power3.out',
          delay: 1.4
        }
      );
    }
  }, [isInView]);

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
    <section ref={sectionRef} className="py-20 bg-secondary relative overflow-hidden" id="education">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-[50px] -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className={`section-transition ${isInView ? 'visible' : ''}`}>
          <div className="mb-10 relative inline-block">
            <h2 className="section-heading text-white">
              <span className="relative z-20">Education & Certifications</span>
            </h2>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-primary animate-pulse"></div>
            <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-white opacity-70"></div>
          </div>
          <p className="text-muted-foreground max-w-3xl mt-6 mb-16">
            Educational background and professional certifications showcasing academic excellence and diverse skill set.
            <span className="inline-block ml-2 animate-pulse">|</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education Timeline */}
          <div className={`relative section-transition ${isInView ? 'visible' : ''}`}>
            <div className="p-6 md:p-8 bg-card rounded-md border border-muted shadow-lg shadow-primary/5 h-full">
              <h3 className="text-2xl font-bold mb-8 text-primary inline-block relative group">
                Education
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </h3>
              
              <div ref={timelineRef} className="relative pl-8 mt-12">
                {/* Vertical timeline line */}
                <div className="timeline-line absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-primary via-primary/50 to-primary/20"></div>
                
                <div className="space-y-16">
                  {education.map((item, index) => (
                    <div key={index} className="relative">
                      {/* Timeline node */}
                      <div className="timeline-node absolute left-0 top-0 w-5 h-5 -ml-2.5 rounded-full bg-primary flex items-center justify-center transform">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                      </div>
                      
                      {/* Timeline content */}
                      <div className="timeline-content mb-4">
                        <div className="bg-muted/20 backdrop-blur-sm p-5 rounded-md border border-primary/10 hover:border-primary/30 transition-all duration-300 transform hover:translate-x-1">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xl font-bold text-foreground">{item.title}</h4>
                            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                              {item.period}
                            </span>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">
                            <i className="ri-building-line mr-2 text-primary/80"></i>
                            {item.institution}, {item.location}
                          </p>
                          
                          {item.achievements.length > 0 && (
                            <div className="mt-4 space-y-3">
                              <h5 className="text-sm font-bold text-primary flex items-center gap-2">
                                <i className="ri-trophy-fill"></i>
                                <span>Achievements</span>
                              </h5>
                              <ul className="space-y-3">
                                {item.achievements.map((achievement, i) => (
                                  <li key={i} className="text-muted-foreground text-sm pl-4 border-l-2 border-primary/30 hover:border-primary transition-colors">
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Certifications */}
          <div className={`section-transition ${isInView ? 'visible' : ''}`}>
            <div className="p-6 md:p-8 bg-card rounded-md border border-muted shadow-lg shadow-primary/5 h-full">
              <h3 className="text-2xl font-bold mb-8 text-primary inline-block relative group">
                Certifications
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </h3>
              
              <div className="grid gap-6">
                {certifications.map((cert, index) => (
                  <div 
                    key={index} 
                    className="cert-card flex items-start gap-4 p-4 rounded-md border border-muted bg-muted/20 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-md bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                      <i className={`${cert.icon} text-2xl`}></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{cert.title}</h4>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Classical Music interest highlight */}
              <div className="music-highlight mt-12 p-6 border border-primary/20 rounded-md bg-gradient-to-br from-muted/30 to-background/10 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <i className="ri-music-2-line text-xl"></i>
                  </div>
                  <h4 className="text-lg font-bold text-white">Classical Music Interest</h4>
                </div>
                <p className="text-muted-foreground">
                  Passionate about classical music, with a Visharada degree (7th Grade) showcasing proficiency in piano performance and music theory. This background enhances creative problem-solving and attention to detail in technical work.
                </p>
                <div className="mt-4 flex items-center justify-end">
                  <div className="flex space-x-1">
                    <span className="inline-block w-2 h-6 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></span>
                    <span className="inline-block w-2 h-4 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '100ms' }}></span>
                    <span className="inline-block w-2 h-8 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></span>
                    <span className="inline-block w-2 h-5 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></span>
                    <span className="inline-block w-2 h-7 bg-primary/70 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;