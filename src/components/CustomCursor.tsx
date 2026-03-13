import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringScale = useSpring(1, { stiffness: 400, damping: 25 });
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setIsMobile(mq.matches);
    if (mq.matches) return;

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, [role="button"], input, textarea, select, [data-clickable], .cursor-pointer');
      if (clickable) {
        setHovered(true);
        ringScale.set(2.2);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, [role="button"], input, textarea, select, [data-clickable], .cursor-pointer');
      if (clickable) {
        setHovered(false);
        ringScale.set(1);
      }
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [dotX, dotY, ringScale]);

  if (isMobile) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Dot */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        className="absolute top-0 left-0 w-2 h-2 rounded-full"
        aria-hidden
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'hsl(192 91% 55%)',
            boxShadow: '0 0 8px 2px hsla(192,91%,55%,0.6), 0 0 20px 4px hsla(192,91%,42%,0.3)',
          }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          scale: ringScale,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute top-0 left-0 w-10 h-10 rounded-full"
        aria-hidden
      >
        <div
          className="w-full h-full rounded-full transition-all duration-200"
          style={{
            border: `1.5px solid hsla(192,91%,55%,${hovered ? 0.15 : 0.35})`,
            background: hovered ? 'hsla(192,91%,55%,0.06)' : 'transparent',
            filter: hovered ? 'blur(4px)' : 'none',
            boxShadow: hovered ? '0 0 30px 8px hsla(192,91%,42%,0.15)' : 'none',
          }}
        />
      </motion.div>
    </div>
  );
};

export default CustomCursor;
