
import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>();

  // Throttle mousemove with requestAnimationFrame for better performance
  const moveCursor = useCallback((e: MouseEvent) => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const cursor = cursorRef.current;
      const cursorDot = cursorDotRef.current;

      if (!cursor || !cursorDot) return;

      // Use faster GSAP settings for smoother movement
      gsap.set(cursor, {
        x: e.clientX,
        y: e.clientY,
      });

      gsap.set(cursorDot, {
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    // Set initial GPU acceleration
    gsap.set([cursor, cursorDot], {
      force3D: true,
      transformOrigin: "center center"
    });

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

    // Add event listeners
    document.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover effects for clickable elements
    const clickableElements = document.querySelectorAll('button, a, [role="button"]');
    clickableElements.forEach(el => {
      el.addEventListener('mouseenter', handleClickableEnter);
      el.addEventListener('mouseleave', handleClickableLeave);
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
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
          backdropFilter: 'blur(2px)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: 1000
        }}
      />
      
      {/* Cursor dot */}
      <div 
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999]"
        style={{ 
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: 1000
        }}
      />
    </>
  );
};

export default CustomCursor;
