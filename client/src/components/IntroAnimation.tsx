import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const introTexts = [
    "Welcome",
    "to",
    "Vrutant Panchal's",
    "Portfolio"
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // Final animation before completing
        gsap.to('.intro-container', {
          opacity: 0,
          duration: 1,
          ease: 'power3.inOut',
          onComplete
        });
      }
    });

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
        // Start the text animation sequence
        animateNextText();
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const animateNextText = () => {
    if (currentTextIndex >= introTexts.length) {
      return;
    }

    const textElement = document.createElement('div');
    textElement.className = `text-reveal text-${currentTextIndex} opacity-0 absolute`;
    textElement.innerHTML = `<span class="text-3xl md:text-7xl font-bold ${currentTextIndex === 2 ? 'text-primary' : 'text-white'}">${introTexts[currentTextIndex]}</span>`;
    
    if (textRef.current) {
      textRef.current.appendChild(textElement);

      // Animate in the current text
      gsap.fromTo(
        textElement,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          onComplete: () => {
            // After a pause, animate out and show next text
            setTimeout(() => {
              gsap.to(textElement, {
                y: -40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.in',
                onComplete: () => {
                  setCurrentTextIndex(prev => prev + 1);
                  
                  // Continue with next text or finish
                  if (currentTextIndex < introTexts.length - 1) {
                    animateNextText();
                  }
                }
              });
            }, 800);
          }
        }
      );
    }
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
            <div ref={textRef} className="text-container relative h-20 flex items-center justify-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
