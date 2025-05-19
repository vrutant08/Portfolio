import { useEffect, useRef } from 'react';

const InvertedCursor = () => {
  const trailPointsRef = useRef<Array<{x: number, y: number, age: number}>>([]);
  const isMouseDownRef = useRef(false);
  
  useEffect(() => {
    // Create cursor elements
    const cursor = document.createElement('div');
    const canvas = document.createElement('canvas');
    
    // Setup cursor
    cursor.id = 'cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '15px';
    cursor.style.height = '15px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'hsla(var(--primary), 0.8)';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.opacity = '1';
    cursor.style.boxShadow = '0 0 10px hsla(var(--primary), 0.5)';
    document.body.appendChild(cursor);
    
    // Set up canvas for trail
    canvas.id = 'cursor-trail';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9998';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set up animation
    let lastX = -100, lastY = -100;
    let lastTimestamp = 0;
    
    // Draw trail function
    function drawTrail() {
      if (!ctx) return;
      
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Decay trail points over time
      const currentTime = Date.now();
      trailPointsRef.current = trailPointsRef.current
        .map(point => ({ ...point, age: point.age + 16 }))
        .filter(point => point.age < 1000); // Remove points older than 1 second
      
      // Draw trail if there are points
      if (trailPointsRef.current.length > 1) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Draw each segment of the trail
        for (let i = 1; i < trailPointsRef.current.length; i++) {
          const point = trailPointsRef.current[i];
          const prevPoint = trailPointsRef.current[i - 1];
          
          // Calculate opacity based on age
          const opacity = Math.max(0, 1 - point.age / 1000);
          
          // Set up gradient between points
          const gradient = ctx.createLinearGradient(
            prevPoint.x, prevPoint.y, point.x, point.y
          );
          
          // Different gradients for different effects
          if (isMouseDownRef.current) {
            // Red gradient for click-and-drag
            gradient.addColorStop(0, `rgba(255, 0, 0, ${opacity * 0.8})`);
            gradient.addColorStop(1, `rgba(180, 0, 0, ${opacity * 0.6})`);
          } else {
            // Red-orange gradient for regular trail
            gradient.addColorStop(0, `rgba(255, 30, 30, ${opacity * 0.6})`);
            gradient.addColorStop(1, `rgba(220, 30, 30, ${opacity * 0.4})`);
          }
          
          // Draw the line segment
          ctx.beginPath();
          ctx.strokeStyle = gradient;
          
          // Thinner lines for normal movement, thicker for click-and-drag
          ctx.lineWidth = isMouseDownRef.current ? 6 : 3;
          
          ctx.moveTo(prevPoint.x, prevPoint.y);
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
        }
      }
      
      // Request next frame
      requestAnimationFrame(drawTrail);
    }
    
    // Start animation
    drawTrail();
    
    // Handle mouse movement
    function handleMouseMove(e: MouseEvent) {
      const { clientX, clientY } = e;
      
      // Update cursor position
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
      
      // Add trail point if mouse has moved enough or if mouse is down
      const distance = Math.hypot(clientX - lastX, clientY - lastY);
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTimestamp;
      
      if (distance > 5 || isMouseDownRef.current) {
        if (timeDiff > (isMouseDownRef.current ? 5 : 20)) { // More points when dragging
          trailPointsRef.current.push({ x: clientX, y: clientY, age: 0 });
          lastX = clientX;
          lastY = clientY;
          lastTimestamp = currentTime;
        }
      }
      
      // Adapt cursor appearance based on what's under it
      const element = document.elementFromPoint(clientX, clientY);
      if (
        element?.tagName === 'BUTTON' || 
        element?.tagName === 'A' || 
        element?.classList.contains('hero-button') ||
        element?.closest('button') || 
        element?.closest('a')
      ) {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'hsla(var(--primary), 1)';
      } else {
        cursor.style.width = '15px';
        cursor.style.height = '15px';
        cursor.style.backgroundColor = 'hsla(var(--primary), 0.8)';
      }
    }
    
    // Handle mouse events
    function handleMouseEnter() {
      cursor.style.opacity = '1';
    }
    
    function handleMouseLeave() {
      cursor.style.opacity = '0';
    }
    
    // Handle mouse click
    function handleMouseDown(e: MouseEvent) {
      isMouseDownRef.current = true;
      
      // Create burst of points for click effect
      const { clientX, clientY } = e;
      
      // Clear existing trail and add fresh burst
      trailPointsRef.current = [];
      
      // Add burst effect - multiple points in a circle
      const burstRadius = 20;
      const numPoints = 8;
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const x = clientX + Math.cos(angle) * burstRadius;
        const y = clientY + Math.sin(angle) * burstRadius;
        trailPointsRef.current.push({ x, y, age: 0 });
      }
      
      // Add center point
      trailPointsRef.current.push({ x: clientX, y: clientY, age: 0 });
      
      cursor.style.width = '25px';
      cursor.style.height = '25px';
      cursor.style.backgroundColor = 'hsla(var(--primary), 1)';
    }
    
    function handleMouseUp() {
      isMouseDownRef.current = false;
      
      cursor.style.width = '15px';
      cursor.style.height = '15px';
      cursor.style.backgroundColor = 'hsla(var(--primary), 0.8)';
    }
    
    // Handle window resize
    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    // Check for touch device
    const isTouchDevice = 'ontouchstart' in window || 
                        navigator.maxTouchPoints > 0 || 
                        (navigator as any).msMaxTouchPoints > 0;
    
    // Only add effects on non-touch devices
    if (!isTouchDevice) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('resize', handleResize);
      
      // Hide default cursor
      document.body.style.cursor = 'none';
      
      // Add cursor visibility to clickable elements
      const styleTag = document.createElement('style');
      styleTag.innerHTML = `
        a:hover, button:hover, .hero-button:hover { 
          cursor: none !important;
        }
      `;
      document.head.appendChild(styleTag);
    }
    
    // Cleanup
    return () => {
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
      
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
      
      document.body.style.cursor = '';
      
      if (!isTouchDevice) {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return null;
};

export default InvertedCursor;