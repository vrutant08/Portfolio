import { useEffect, useRef } from 'react';

const InvertedCursor = () => {
  const rippleArrayRef = useRef<any[]>([]);

  useEffect(() => {
    // Create all DOM elements we need
    const cursor = document.createElement('div');
    const inverter = document.createElement('div');
    const canvas = document.createElement('canvas');
    
    // Setup canvas for ripple effect
    canvas.id = 'ripple-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9995';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Setup cursor ring
    cursor.id = 'cursor-ring';
    cursor.style.position = 'fixed';
    cursor.style.width = '30px';
    cursor.style.height = '30px';
    cursor.style.borderRadius = '50%';
    cursor.style.border = '2px solid white';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.opacity = '0.7';
    cursor.style.transition = 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease';
    
    // Setup inverter
    inverter.id = 'cursor-inverter';
    inverter.style.position = 'fixed';
    inverter.style.width = '40px';
    inverter.style.height = '40px';
    inverter.style.borderRadius = '50%';
    inverter.style.backgroundColor = 'white';
    inverter.style.mixBlendMode = 'difference';
    inverter.style.pointerEvents = 'none';
    inverter.style.zIndex = '9998';
    inverter.style.transform = 'translate(-50%, -50%)';
    inverter.style.opacity = '0';
    inverter.style.transition = 'opacity 0.2s ease';
    
    // Add elements to DOM
    document.body.appendChild(canvas);
    document.body.appendChild(cursor);
    document.body.appendChild(inverter);
    
    // Setup ripple rendering
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Ripple class definition
    class Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      color: string;
      lineWidth: number;
      speed: number;

      constructor(x: number, y: number, color: string = 'rgba(255, 0, 0, 0.3)', size: number = 1) {
        this.x = x;
        this.y = y;
        this.radius = 5 * size;
        this.maxRadius = Math.random() * 100 + 80; // Larger max size
        this.opacity = 0.8;
        this.color = color;
        this.lineWidth = Math.max(1, 5 * size); // Thicker lines for larger ripples
        this.speed = 2 + Math.random() * 2; // Random speed for more natural effect
      }

      update() {
        if (this.radius < this.maxRadius) {
          this.radius += this.speed;
          this.opacity -= 0.003;
          return true;
        }
        return false;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
    
    // Animation loop
    function animateRipples() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw ripples
      rippleArrayRef.current = rippleArrayRef.current.filter(ripple => {
        ripple.draw(ctx);
        return ripple.update();
      });
      
      requestAnimationFrame(animateRipples);
    }
    
    // Start animation
    animateRipples();
    
    // Function to create ripples
    function createRipple(x: number, y: number, isOverImage: boolean = false, size: number = 1) {
      const color = isOverImage 
        ? 'rgba(255, 0, 0, 0.3)' // Red for images
        : 'rgba(255, 255, 255, 0.2)'; // White for other elements
      
      rippleArrayRef.current.push(new Ripple(x, y, color, size));
    }
    
    // Track mouse movement
    function handleMouseMove(e: MouseEvent) {
      const { clientX, clientY } = e;
      
      // Update cursor position
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
      
      // Check if over an image
      const element = document.elementFromPoint(clientX, clientY);
      const isOverImg = element?.tagName === 'IMG' || element?.closest('img') !== null;
      
      if (isOverImg) {
        // Make inverter visible over images
        inverter.style.left = `${clientX}px`;
        inverter.style.top = `${clientY}px`;
        inverter.style.opacity = '1';
        
        // Modify cursor appearance
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursor.style.borderColor = 'red';
        
        // Create ripples over images
        createRipple(clientX, clientY, true);
      } else {
        // Hide inverter when not over images
        inverter.style.opacity = '0';
        
        // Restore cursor appearance
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursor.style.borderColor = 'white';
        
        // Occasionally create ripples during general movement
        if (Math.random() < 0.03) {
          createRipple(clientX, clientY, false, 0.5);
        }
      }
    }
    
    // Handle mouse events
    function handleMouseEnter() {
      cursor.style.opacity = '1';
    }
    
    function handleMouseLeave() {
      cursor.style.opacity = '0';
      inverter.style.opacity = '0';
    }
    
    // Handle interactive elements
    function handleElementMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.classList.contains('hero-button') ||
        target.closest('button') || 
        target.closest('a')
      ) {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        
        // Create ripples
        createRipple(e.clientX, e.clientY);
        setTimeout(() => createRipple(e.clientX + 10, e.clientY - 10), 100);
      }
    }
    
    // Handle clicks
    function handleMouseClick(e: MouseEvent) {
      // Create multiple ripples for dramatic effect
      createRipple(e.clientX, e.clientY, false, 2);
      setTimeout(() => createRipple(e.clientX - 10, e.clientY + 10, false, 1.5), 50);
      setTimeout(() => createRipple(e.clientX + 15, e.clientY - 5, false, 1.2), 100);
      setTimeout(() => createRipple(e.clientX, e.clientY, false, 1.8), 150);
    }
    
    // Handle window resize
    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    // Check if device supports touch
    const isTouchDevice = 'ontouchstart' in window || 
                        navigator.maxTouchPoints > 0 || 
                        (navigator as any).msMaxTouchPoints > 0;
    
    // Only add cursor effects on non-touch devices
    if (!isTouchDevice) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('click', handleMouseClick);
      document.addEventListener('mouseover', handleElementMouseOver);
      window.addEventListener('resize', handleResize);
    }
    
    // Cleanup function
    return () => {
      // Remove DOM elements
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
      
      if (document.body.contains(inverter)) {
        document.body.removeChild(inverter);
      }
      
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
      
      // Remove event listeners
      if (!isTouchDevice) {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('click', handleMouseClick);
        document.removeEventListener('mouseover', handleElementMouseOver);
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return null;
};

export default InvertedCursor;