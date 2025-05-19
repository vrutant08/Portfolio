import { useEffect, useState } from 'react';

const InvertedCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isOverImage, setIsOverImage] = useState(false);

  useEffect(() => {
    const cursorElement = document.createElement('div');
    cursorElement.id = 'inverted-cursor';
    cursorElement.classList.add(
      'fixed', 
      'w-12', 
      'h-12', 
      'rounded-full', 
      'pointer-events-none', 
      'z-[9999]',
      'transition-transform',
      'duration-75',
      'backdrop-invert',
      'mix-blend-difference',
      'border',
      'border-white/30',
      'opacity-0'
    );
    document.body.appendChild(cursorElement);

    // Create ripple effect element
    const rippleElement = document.createElement('div');
    rippleElement.id = 'cursor-ripple';
    rippleElement.classList.add(
      'fixed', 
      'w-4', 
      'h-4', 
      'rounded-full', 
      'bg-primary/40',
      'pointer-events-none', 
      'z-[9998]',
      'transform',
      'scale-0',
      'transition-transform'
    );
    document.body.appendChild(rippleElement);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update the cursor position state
      setPosition({ x: clientX, y: clientY });
      
      // Update cursor element position without using state (for performance)
      cursorElement.style.transform = `translate(${clientX - 24}px, ${clientY - 24}px)`;
      rippleElement.style.transform = `translate(${clientX - 8}px, ${clientY - 8}px) scale(1)`;
      
      if (!isVisible) {
        setIsVisible(true);
        cursorElement.style.opacity = '1';
        rippleElement.style.opacity = '1';
      }
      
      // Check if cursor is over an image
      const element = document.elementFromPoint(clientX, clientY);
      const isOverImg = element?.tagName === 'IMG' || 
                      element?.classList.contains('portrait-image') ||
                      element?.closest('img') !== null;
      
      if (isOverImg !== isOverImage) {
        setIsOverImage(isOverImg);
        
        if (isOverImg) {
          cursorElement.classList.add('opacity-100', 'scale-125');
          cursorElement.classList.remove('opacity-70', 'scale-100');
          // Create ripple effect
          createRipple(clientX, clientY);
        } else {
          cursorElement.classList.remove('opacity-100', 'scale-125');
          cursorElement.classList.add('opacity-70', 'scale-100');
        }
      }
    };
    
    const createRipple = (x: number, y: number) => {
      const ripple = document.createElement('div');
      ripple.classList.add(
        'absolute', 
        'rounded-full', 
        'bg-primary/10',
        'pointer-events-none',
        'transform',
        'scale-0',
        'animate-ripple'
      );
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = '60px';
      ripple.style.height = '60px';
      ripple.style.marginLeft = '-30px';
      ripple.style.marginTop = '-30px';
      
      document.body.appendChild(ripple);
      
      // Remove the ripple after animation completes
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 1000);
    };

    // Show/hide cursor
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    // Check for touch devices
    const isTouchDevice = 'ontouchstart' in window || 
                          navigator.maxTouchPoints > 0 || 
                          (navigator as any).msMaxTouchPoints > 0;

    if (!isTouchDevice) {
      // Only add cursor on non-touch devices
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup
    return () => {
      if (cursorElement && document.body.contains(cursorElement)) {
        document.body.removeChild(cursorElement);
      }
      
      if (rippleElement && document.body.contains(rippleElement)) {
        document.body.removeChild(rippleElement);
      }

      if (!isTouchDevice) {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isVisible, isOverImage]);

  return null; // Component doesn't render anything visible directly
};

export default InvertedCursor;