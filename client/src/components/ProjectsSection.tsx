import { useRef } from "react";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const projects = [
    {
      title: "BookSphere",
      description: "Online MERN Stack Bookstore Application",
      details: "A full-stack online bookstore platform using the MERN stack with Firebase and JWT for authentication and data storage. Integrated features for user authentication, book catalog browsing, cart management, and secure checkout process.",
      image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      imageAlt: "BookSphere MERN Stack Application",
      badge: "Full Stack",
      tags: ["React.js", "MongoDB", "Express.js", "Node.js", "Firebase", "JWT"]
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-background" id="projects">
      <div className="container mx-auto px-4">
        <div className={`section-transition ${isInView ? 'visible' : ''}`}>
          <div className="mb-16">
            <h2 className="section-heading">Projects</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`lg:col-span-5 grid grid-cols-1 lg:grid-cols-2 gap-8 project-card section-transition p-0 rounded-md ${isInView ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-md border border-muted h-full">
                <img 
                  src={project.image} 
                  alt={project.imageAlt} 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/20 flex flex-col justify-end">
                  <div className="p-6">
                    <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-md inline-block mb-3">
                      {project.badge}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/80 mb-2">{project.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-card rounded-md border border-muted flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground mb-6">{project.details}</p>
                  
                  <h4 className="text-sm font-bold mb-3 text-primary">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto">
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-medium rounded-md hover:bg-primary hover:text-white transition-colors"
                  >
                    <i className="ri-github-line"></i> GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`text-center mt-12 section-transition ${isInView ? 'visible' : ''}`}>
          <div className="p-6 border border-muted rounded-md bg-card/50 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-3 text-foreground">Ready to Collaborate?</h3>
            <p className="text-muted-foreground mb-4">
              I'm always interested in working on new and challenging projects. If you have an idea or a project in mind, let's discuss how we can bring it to life.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Contact Me
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
