import { useEffect, useState, useRef } from 'react';
import type { FC } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: FC<IntroAnimationProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const fullTextRef = useRef<HTMLDivElement>(null);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const fullText = "Welcome to Vrutant Panchal's Portfolio";
  
  // Load GSAP dynamically
  useEffect(() => {
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      setGsapLoaded(true);
    });
  }, []);

  // Typewriter effect for the main text
  useEffect(() => {
    if (!showTypewriter) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
          // Keep the text visible longer before fading out
        setTimeout(() => {
          if (fullTextRef.current && gsapLoaded) {
            import('gsap').then(({ gsap }) => {
              gsap.to(fullTextRef.current, {
                opacity: 0,
                y: -30,
                duration: 1,
                delay: 1, // Extra delay for visibility
                ease: 'power3.inOut',
                onComplete: () => {
                  // Begin exit animation after text is complete
                  startExitAnimation();
                }
              });
            });
          }
        }, 2000); // Stay for 2 seconds before starting exit
      }
    }, 80); // Typing speed

    return () => clearInterval(typingInterval);
  }, [showTypewriter]);
  // Initial animation sequence
  useEffect(() => {
    if (!containerRef.current || !gsapLoaded) return;

    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline();

      // Create a more dramatic opening animation
      gsap.set('.intro-content', { opacity: 0 });
      gsap.set('.left-split', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.right-split', { scaleX: 0, transformOrigin: 'right' });
      gsap.set('.circle-reveal', { scale: 0 });

      // Start animation sequence
      tl.to('.left-split', { scaleX: 1, duration: 1.2, ease: 'power3.inOut' })
        .to('.right-split', { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, "<")
        .to('.circle-reveal', { scale: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)' })
        .to('.intro-content', { opacity: 1, duration: 1 })
        .call(() => {
          // Start the typewriter animation
          setShowTypewriter(true);
        });

      return () => {
        tl.kill();
      };
    });
  }, []);
  // Function to handle the exit animation
  const startExitAnimation = () => {
    if (!gsapLoaded) return;
    
    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete(); // Call the parent's onComplete to end the intro
        }
      });

      tl.to('.circle-reveal', { scale: 1.2, opacity: 0, duration: 1, ease: 'power3.out' })
        .to('.left-split', { scaleX: 0, duration: 1, ease: 'power3.in' }, "-=0.7")
        .to('.right-split', { scaleX: 0, duration: 1, ease: 'power3.in' }, "<");
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="intro-container fixed inset-0 flex items-center justify-center bg-black overflow-hidden z-50"
    >
      {/* Split panels */}
      <div className="left-split absolute top-0 left-0 h-full w-1/2 bg-primary"></div>
      <div className="right-split absolute top-0 right-0 h-full w-1/2 bg-primary"></div>
      
      {/* Center circle with gradient */}
      <div className="circle-reveal w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-br from-black via-black to-primary/40 flex items-center justify-center relative z-10">
        <div className="absolute inset-0 rounded-full flex items-center justify-center">
          {/* Animated geometric shapes */}
          <div className="absolute w-24 h-24 border-2 border-primary/50 rounded-full animate-ping opacity-20"></div>
          <div className="absolute w-36 h-36 border border-white/20 rounded-full animate-pulse"></div>
          
          {/* Content container */}
          <div className="intro-content w-full h-full flex items-center justify-center">
            {showTypewriter && (
              <div ref={fullTextRef} className="px-8 text-center">
                <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white">
                  {typedText}
                  <span className="inline-block w-[3px] h-8 bg-primary ml-1 animate-pulse"></span>
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
