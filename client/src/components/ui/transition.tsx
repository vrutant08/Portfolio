import { useEffect, useRef, type ReactNode } from 'react';

interface TransitionProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideIn' | 'scaleIn';
  duration?: number;
  delay?: number;
  className?: string;
}

export const Transition = ({
  children,
  animation = 'fadeIn',
  duration = 0.5,
  delay = 0,
  className = '',
}: TransitionProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Import GSAP dynamically only when needed
    import('gsap').then(({ gsap }) => {
      // Define animation properties based on the animation type
      const animations: Record<string, gsap.TweenVars> = {
        fadeIn: {
          opacity: 1,
          duration,
          delay,
        },
        slideIn: {
          x: 0,
          opacity: 1,
          duration,
          delay,
        },
        scaleIn: {
          scale: 1,
          opacity: 1,
          duration,
          delay,
        },
      };

      // Set initial state
      gsap.set(element, {
        opacity: 0,
        ...(animation === 'slideIn' && { x: -50 }),
        ...(animation === 'scaleIn' && { scale: 0.8 }),
      });

      // Run animation
      gsap.to(element, animations[animation]);
    });
  }, [animation, duration, delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};
