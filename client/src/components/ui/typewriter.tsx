import { useEffect, useState, useRef, FC } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
  highlightedWords?: string[];
  highlightedClass?: string;
}

const Typewriter: FC<TypewriterProps> = ({
  text,
  delay = 100,
  highlightedWords = [],
  highlightedClass = 'text-primary'
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (currentIndex < text.length) {
      timerRef.current = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
    } else {
      setIsComplete(true);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, delay, text]);

  // Highlight specific words if needed
  const highlightText = () => {
    if (highlightedWords.length === 0) return currentText;
    
    let displayText = currentText;
    
    highlightedWords.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      displayText = displayText.replace(regex, `<span class="${highlightedClass}">$1</span>`);
    });
    
    return displayText;
  };

  return (
    <span className="inline-block">
      <span 
        dangerouslySetInnerHTML={{ __html: highlightText() }} 
        className="whitespace-pre-wrap"
      />
      <span className={`typewriter-cursor h-full ml-[1px] ${isComplete ? 'opacity-0' : ''}`}></span>
    </span>
  );
};

export default Typewriter;
