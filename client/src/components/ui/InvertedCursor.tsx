import { useEffect, useState, useRef } from 'react';

const InvertedCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to create and add the custom cursor to the DOM
    const setupCustomCursor = () => {
      // Create main inverted cursor element
      const cursorElement = document.createElement('div');
      cursorElement.id = 'inverted-cursor';
      cursorElement.style.position = 'fixed';
      cursorElement.style.width = '24px';
      cursorElement.style.height = '24px';
      cursorElement.style.borderRadius = '50%';
      cursorElement.style.pointerEvents = 'none';
      cursorElement.style.zIndex = '9999';
      cursorElement.style.mixBlendMode = 'difference';
      cursorElement.style.backgroundColor = 'white';
      cursorElement.style.transform = 'translate(-50%, -50%)';
      cursorElement.style.opacity = '0';
      cursorElement.style.transition = 'width 0.3s, height 0.3s, opacity 0.3s';
      
      // Append to body
      document.body.appendChild(cursorElement);
      
      // Store reference
      if (cursorRef) cursorRef.current = cursorElement;
      
      // Create dot cursor for regular use
      const dotElement = document.createElement('div');
      dotElement.id = 'cursor-dot';
      dotElement.style.position = 'fixed';
      dotElement.style.width = '8px';
      dotElement.style.height = '8px';
      dotElement.style.borderRadius = '50%';
      dotElement.style.backgroundColor = 'hsl(var(--primary))';
      dotElement.style.opacity = '0.7';
      dotElement.style.pointerEvents = 'none';
      dotElement.style.zIndex = '9998';
      dotElement.style.transform = 'translate(-50%, -50%)';
      dotElement.style.transition = 'opacity 0.3s';
      
      // Append to body
      document.body.appendChild(dotElement);
      
      // Store reference
      if (rippleRef) rippleRef.current = dotElement;
      
      return {
        cursor: cursorElement,
        dot: dotElement
      };
    };
    
    // Create ripple effect at cursor position
    const createRipple = (x: number, y: number) => {
      const ripple = document.createElement('div');
      ripple.style.position = 'fixed';
      ripple.style.top = `${y}px`;
      ripple.style.left = `${x}px`;
      ripple.style.width = '30px';
      ripple.style.height = '30px';
      ripple.style.borderRadius = '50%';
      ripple.style.backgroundColor = 'hsla(var(--primary), 0.2)';
      ripple.style.transform = 'translate(-50%, -50%) scale(0)';
      ripple.style.pointerEvents = 'none';
      ripple.style.zIndex = '9990';
      document.body.appendChild(ripple);
      
      // Animate the ripple
      const animation = ripple.animate(
        [
          { transform: 'translate(-50%, -50%) scale(0)', opacity: 0.8 },
          { transform: 'translate(-50%, -50%) scale(3)', opacity: 0 }
        ],
        {
          duration: 800,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
        }
      );
      
      // Remove the ripple element when animation completes
      animation.onfinish = () => {
        if (ripple && ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      };
    };
    
    // Setup cursor elements
    const { cursor, dot } = setupCustomCursor();
    
    // Function to handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Position both cursors
      if (cursor) {
        cursor.style.left = `${clientX}px`;
        cursor.style.top = `${clientY}px`;
      }
      
      if (dot) {
        dot.style.left = `${clientX}px`;
        dot.style.top = `${clientY}px`;
      }
      
      // Check if cursor is over an image
      const element = document.elementFromPoint(clientX, clientY);
      const isOverImg = element?.tagName === 'IMG' || 
                      element?.closest('img') !== null;
      
      // Apply effects based on what we're hovering over
      if (isOverImg) {
        // Larger inverted cursor over images
        if (cursor) {
          cursor.style.width = '40px';
          cursor.style.height = '40px';
          cursor.style.opacity = '1';
        }
        if (dot) {
          dot.style.opacity = '0';
        }
        
        // Create ripple effect when first moving over an image
        const lastTarget = cursor.dataset.lastTarget || '';
        if (lastTarget !== 'image') {
          createRipple(clientX, clientY);
          cursor.dataset.lastTarget = 'image';
        }
      } else {
        // Regular cursor elsewhere
        if (cursor) {
          cursor.style.width = '24px';
          cursor.style.height = '24px';
          cursor.style.opacity = '0.3';
        }
        if (dot) {
          dot.style.opacity = '0.7';
        }
        cursor.dataset.lastTarget = '';
      }
    };
    
    // Handle mouse enter/leave
    const handleMouseEnter = () => {
      if (cursor) cursor.style.opacity = '0.3';
      if (dot) dot.style.opacity = '0.7';
    };
    
    const handleMouseLeave = () => {
      if (cursor) cursor.style.opacity = '0';
      if (dot) dot.style.opacity = '0';
    };
    
    // Apply effects on buttons, links, etc.
    const handleElementMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.classList.contains('hero-button') ||
        target.closest('button') || 
        target.closest('a')
      ) {
        if (cursor) {
          cursor.style.width = '32px';
          cursor.style.height = '32px';
          cursor.style.opacity = '0.5';
        }
        
        // Create ripple
        createRipple(e.clientX, e.clientY);
      }
    };
    
    // Handle click effects
    const handleMouseClick = (e: MouseEvent) => {
      createRipple(e.clientX, e.clientY);
    };
    
    // Check for touch devices
    const isTouchDevice = 'ontouchstart' in window || 
                        navigator.maxTouchPoints > 0 || 
                        (navigator as any).msMaxTouchPoints > 0;

    if (!isTouchDevice) {
      // Only add cursor on non-touch devices
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mousedown', handleMouseClick);
      document.addEventListener('mouseover', handleElementMouseEnter);
    }

    // Cleanup
    return () => {
      if (cursor && document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
      
      if (dot && document.body.contains(dot)) {
        document.body.removeChild(dot);
      }

      if (!isTouchDevice) {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mousedown', handleMouseClick);
        document.removeEventListener('mouseover', handleElementMouseEnter);
      }
    };
  }, []);

  return null;
};

export default InvertedCursor;