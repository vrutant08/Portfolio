const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-montserrat font-semibold mb-4">Vrutant Panchal</h3>
            <p className="text-gray-400 mb-4">
              Software Developer specializing in crafting efficient solutions with modern technologies.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/vrutantpanchal" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="ri-linkedin-box-fill text-2xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="ri-github-fill text-2xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="ri-instagram-fill text-2xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-montserrat font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#skills" className="text-gray-400 hover:text-white transition-colors">Skills</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#experience" className="text-gray-400 hover:text-white transition-colors">Experience</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-montserrat font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <i className="ri-mail-line mt-1"></i>
                <span>vrutantpanchal1454@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-phone-line mt-1"></i>
                <span>+918141824437</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-map-pin-line mt-1"></i>
                <span>Vadodara, Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Vrutant Panchal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
