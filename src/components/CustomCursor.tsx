
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    // Simple mouse move handler without RAF
    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    };

    const handleClickableEnter = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    };

    const handleClickableLeave = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    // Add event listeners
    document.addEventListener('mousemove', moveCursor, { passive: true });

    // Add hover effects for clickable elements
    const clickableElements = document.querySelectorAll('button, a, [role="button"]');
    clickableElements.forEach(el => {
      el.addEventListener('mouseenter', handleClickableEnter, { passive: true });
      el.addEventListener('mouseleave', handleClickableLeave, { passive: true });
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      
      clickableElements.forEach(el => {
        el.removeEventListener('mouseenter', handleClickableEnter);
        el.removeEventListener('mouseleave', handleClickableLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <div 
        ref={cursorRef}
        className="fixed w-8 h-8 border border-cyan-400/50 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-200 ease-out"
        style={{ 
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
          backdropFilter: 'blur(2px)'
        }}
      />
      
      {/* Cursor dot */}
      <div 
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] transition-transform duration-200 ease-out"
        style={{ 
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)'
        }}
      />
    </>
  );
};

export default CustomCursor;
