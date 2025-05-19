import { useRef } from "react";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const projects = [
    {
      title: "BookSphere",
      description: "Online MERN Stack Bookstore Application",
      details: "A full-stack online bookstore platform using the MERN stack with Firebase and JWT for authentication and data storage.",
      image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      imageAlt: "BookSphere MERN Stack Application",
      badge: "MERN Stack",
      tags: ["React.js", "MongoDB", "Express.js", "Node.js", "Firebase"]
    },
    {
      title: "CodeFest 2024 Achievement",
      description: "Secured 7th Rank in CodeFest 2024",
      details: "Demonstrated exceptional problem-solving and programming skills in a competitive national coding competition.",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      imageAlt: "CodeFest 2024 Project",
      badge: "Problem Solving",
      tags: ["Algorithms", "Data Structures", "Problem Solving", "C++"]
    },
    {
      title: "Sales & Data Reporting",
      description: "Advanced Excel Reporting System",
      details: "Created Excel-based sales reports with formulas and pivot tables for effective data visualization and business insights.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Data Entry and Reporting System",
      badge: "Data Management",
      tags: ["Microsoft Excel", "Data Analysis", "Pivot Tables", "Reporting"]
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white" id="projects">
      <div className="container mx-auto px-4">
        <div className={`section-transition ${isInView ? 'visible' : ''}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold">Featured Projects</h2>
            <div className="w-20 h-1 bg-accent mx-auto mt-4"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl shadow-lg overflow-hidden project-card section-transition ${isInView ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.imageAlt} 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-4">
                    <span className="px-2 py-1 bg-accent text-white text-xs font-medium rounded-full">{project.badge}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-montserrat font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <p className="text-sm mb-4">{project.details}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-gray-100 rounded-full text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`text-center mt-12 section-transition ${isInView ? 'visible' : ''}`}>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Interested in collaboration?
            <i className="ri-arrow-right-line"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
