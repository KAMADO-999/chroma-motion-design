
import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>();

  // Use native CSS transforms for better performance
  const moveCursor = useCallback((e: MouseEvent) => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const cursor = cursorRef.current;
      const cursorDot = cursorDotRef.current;

      if (!cursor || !cursorDot) return;

      // Use native CSS transform for instant movement
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    // Set initial position
    cursor.style.transform = 'translate(-50%, -50%)';
    cursorDot.style.transform = 'translate(-50%, -50%)';

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handleClickableEnter = () => {
      gsap.to(cursor, {
        scale: 2,
        duration: 0.2,
        ease: "power2.out"
      });
      gsap.to(cursorDot, {
        scale: 0.5,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handleClickableLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    // Add event listeners with passive for better performance
    document.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Add hover effects for clickable elements
    const clickableElements = document.querySelectorAll('button, a, [role="button"]');
    clickableElements.forEach(el => {
      el.addEventListener('mouseenter', handleClickableEnter, { passive: true });
      el.addEventListener('mouseleave', handleClickableLeave, { passive: true });
    });

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      clickableElements.forEach(el => {
        el.removeEventListener('mouseenter', handleClickableEnter);
        el.removeEventListener('mouseleave', handleClickableLeave);
      });
    };
  }, [moveCursor]);

  return (
    <>
      {/* Main cursor ring */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-400/50 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ 
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
          backdropFilter: 'blur(2px)',
          willChange: 'transform',
          contain: 'layout style paint'
        }}
      />
      
      {/* Cursor dot */}
      <div 
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999]"
        style={{ 
          boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)',
          willChange: 'transform',
          contain: 'layout style paint'
        }}
      />
    </>
  );
};

export default CustomCursor;
