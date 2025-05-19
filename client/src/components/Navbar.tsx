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

  // Navigation links for both desktop and mobile menus
  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#education", label: "Education" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-sm border-b border-muted' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-bold flex items-center">
          <span className="text-primary">VP</span>
          <span className="text-foreground">.</span>
        </a>
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href} 
              className="font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <button 
          className="md:hidden text-2xl text-foreground" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line`}></i>
        </button>
      </div>
      <div 
        id="mobileMenu"
        className="md:hidden bg-card absolute w-full left-0 top-full shadow-md transform -translate-y-full opacity-0 transition-all duration-300 border-b border-muted"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {navLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href} 
              className="font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-muted last:border-b-0" 
              onClick={handleMenuItemClick}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
