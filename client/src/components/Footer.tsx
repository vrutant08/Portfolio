const Footer = () => {
  return (
    <footer className="bg-black text-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="text-primary">VP</span>
              <span className="text-white ml-1">Portfolio</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Software Developer specializing in crafting efficient solutions with modern technologies like React.js, Next.js, GSAP animations and database management.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/vrutantpanchal" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-muted text-primary hover:bg-primary hover:text-white transition-all"
              >
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-muted text-primary hover:bg-primary hover:text-white transition-all"
              >
                <i className="ri-github-fill text-xl"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-muted text-primary hover:bg-primary hover:text-white transition-all"
              >
                <i className="ri-mail-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <i className="ri-arrow-right-s-line"></i>
                  <span>About Me</span>
                </a>
              </li>
              <li>
                <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <i className="ri-arrow-right-s-line"></i>
                  <span>Technical Skills</span>
                </a>
              </li>
              <li>
                <a href="#education" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <i className="ri-arrow-right-s-line"></i>
                  <span>Education & Certifications</span>
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <i className="ri-arrow-right-s-line"></i>
                  <span>Projects</span>
                </a>
              </li>
              <li>
                <a href="#experience" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <i className="ri-arrow-right-s-line"></i>
                  <span>Work Experience</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <i className="ri-arrow-right-s-line"></i>
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <i className="ri-mail-line text-primary mt-1"></i>
                <span className="text-muted-foreground">vrutantpanchal1454@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-phone-line text-primary mt-1"></i>
                <span className="text-muted-foreground">+918141824437</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-map-pin-line text-primary mt-1"></i>
                <span className="text-muted-foreground">Vadodara, Gujarat, India</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-linkedin-line text-primary mt-1"></i>
                <span className="text-muted-foreground">linkedin.com/in/vrutantpanchal</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-muted mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Vrutant Panchal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
