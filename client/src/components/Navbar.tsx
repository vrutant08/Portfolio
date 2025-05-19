import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    const menu = document.getElementById('mobileMenu');
    if (menu) {
      if (!isMenuOpen) {
        gsap.to(menu, {
          y: '0%',
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.to(menu, {
          y: '-100%',
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        });
      }
    }
  };

  const handleMenuItemClick = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-montserrat font-bold flex items-center">
          <span className="text-primary">VP</span>
          <span className="text-accent">.</span>
        </a>
        <div className="hidden md:flex space-x-8">
          <a href="#about" className="font-medium hover:text-accent transition-colors">About</a>
          <a href="#skills" className="font-medium hover:text-accent transition-colors">Skills</a>
          <a href="#projects" className="font-medium hover:text-accent transition-colors">Projects</a>
          <a href="#experience" className="font-medium hover:text-accent transition-colors">Experience</a>
          <a href="#contact" className="font-medium hover:text-accent transition-colors">Contact</a>
        </div>
        <button 
          className="md:hidden text-2xl" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line`}></i>
        </button>
      </div>
      <div 
        id="mobileMenu"
        className="md:hidden bg-white absolute w-full left-0 top-full shadow-md transform -translate-y-full opacity-0 transition-all duration-300"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <a href="#about" className="font-medium hover:text-accent transition-colors py-2" onClick={handleMenuItemClick}>About</a>
          <a href="#skills" className="font-medium hover:text-accent transition-colors py-2" onClick={handleMenuItemClick}>Skills</a>
          <a href="#projects" className="font-medium hover:text-accent transition-colors py-2" onClick={handleMenuItemClick}>Projects</a>
          <a href="#experience" className="font-medium hover:text-accent transition-colors py-2" onClick={handleMenuItemClick}>Experience</a>
          <a href="#contact" className="font-medium hover:text-accent transition-colors py-2" onClick={handleMenuItemClick}>Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
