import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-dot', 'fixed', 'w-6', 'h-6', 'rounded-full', 'bg-primary', 'transform', '-translate-x-1/2', '-translate-y-1/2', 'pointer-events-none', 'z-[1000]');
    cursor.style.opacity = '0';
    cursor.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(cursor);

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power2.out'
      });

      if (!isVisible) {
        setIsVisible(true);
        cursor.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      cursor.style.opacity = '0';
    };

    // Check for touch devices
    const isTouchDevice = 'ontouchstart' in window || 
                          navigator.maxTouchPoints > 0 || 
                          (navigator as any).msMaxTouchPoints > 0;

    if (!isTouchDevice) {
      // Only add cursor on non-touch devices
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (cursor && document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }

      if (!isTouchDevice) {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isVisible]);

  // This component doesn't render anything directly
  return null;
};

export default CustomCursor;
