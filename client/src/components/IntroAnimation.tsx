import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Typewriter from '@/components/ui/typewriter';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [showTypewriter, setShowTypewriter] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ 
      onComplete: () => {
        // Delay to let typewriter finish before completing
        setTimeout(onComplete, 1000);
      }
    });

    // Start animation sequence
    tl.to('.left-panel', { x: '0%', duration: 1, ease: 'power3.out' })
      .to('.right-panel', { x: '0%', duration: 1, ease: 'power3.out' }, "<")
      .call(() => setShowTypewriter(true))
      .to({}, { duration: 4 }) // Wait for typewriter to finish
      .to('.intro-text', { opacity: 0, duration: 1 })
      .to('.left-panel', { x: '-100%', duration: 1, ease: 'power3.in' })
      .to('.right-panel', { x: '100%', duration: 1, ease: 'power3.in' }, "<");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background overflow-hidden z-50">
      <div className="split-screen left-panel"></div>
      <div className="split-screen right-panel"></div>
      
      <div className="intro-text z-[999] flex justify-center items-center p-4 max-w-3xl mx-auto">
        {showTypewriter && (
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold text-white text-center">
            <Typewriter 
              text="Vrutant Panchal Welcomes to his portfolio" 
              delay={80}
              highlightedWords={['Welcomes']}
              highlightedClass="text-[#0066CC]"
            />
          </h1>
        )}
      </div>
    </div>
  );
};

export default IntroAnimation;
