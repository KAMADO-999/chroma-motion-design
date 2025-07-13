
import { useEffect, useRef } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  useEffect(() => {
    // Simple smooth scroll behavior using CSS
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return <div>{children}</div>;
};

export default SmoothScroll;
