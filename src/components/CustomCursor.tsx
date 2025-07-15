
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleClickableEnter = () => {
      gsap.to(cursor, {
        scale: 2,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(cursorDot, {
        scale: 0.5,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleClickableLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover effects for clickable elements
    const clickableElements = document.querySelectorAll('button, a, [role="button"]');
    clickableElements.forEach(el => {
      el.addEventListener('mouseenter', handleClickableEnter);
      el.addEventListener('mouseleave', handleClickableLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
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
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-400/50 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ 
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
          backdropFilter: 'blur(2px)'
        }}
      />
      
      {/* Cursor dot */}
      <div 
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999]"
        style={{ 
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)'
        }}
      />
    </>
  );
};

export default CustomCursor;
