import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
  tiltIntensity?: number;
}

const TiltCard = ({ children, className = '', glareColor = 'rgba(255,255,255,0.15)', tiltIntensity = 12 }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 200, damping: 25 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [tiltIntensity, -tiltIntensity]);
  const rotateY = useTransform(smoothX, [0, 1], [-tiltIntensity, tiltIntensity]);

  // Glare position
  const glareX = useTransform(smoothX, [0, 1], [0, 100]);
  const glareY = useTransform(smoothY, [0, 1], [0, 100]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative group ${className}`}
    >
      {/* Card content */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08]" style={{
        background: 'hsla(222, 47%, 8%, 0.7)',
        backdropFilter: 'blur(30px)',
        transformStyle: 'preserve-3d',
      }}>
        {children}

        {/* Glare overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(ellipse 60% 60% at ${glareX}% ${glareY}%, ${glareColor}, transparent 70%)`,
          }}
        />
      </div>

      {/* Ambient shadow that moves with tilt */}
      <div
        className="absolute inset-0 rounded-2xl -z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: '0 20px 60px -15px hsl(192 91% 42% / 0.15), 0 10px 30px -10px rgba(0,0,0,0.4)',
        }}
      />
    </motion.div>
  );
};

export default TiltCard;
