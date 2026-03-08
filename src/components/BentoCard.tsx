import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  icon?: LucideIcon;
  iconLabel?: string;
  delay?: number;
  isInView?: boolean;
}

const BentoCard = ({ children, className = '', icon: Icon, iconLabel, delay = 0, isInView = true }: BentoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className={`relative group rounded-2xl overflow-hidden ${className}`}
    >
      {/* Card background: translucent dark + heavy blur */}
      <div
        className="absolute inset-0 rounded-2xl border border-white/[0.08]"
        style={{
          background: 'hsla(222, 47%, 8%, 0.65)',
          backdropFilter: 'blur(40px) saturate(150%)',
          WebkitBackdropFilter: 'blur(40px) saturate(150%)',
        }}
      />

      {/* Mouse-following spotlight glow */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          x: springX,
          y: springY,
          width: 250,
          height: 250,
          marginLeft: -125,
          marginTop: -125,
          background: 'radial-gradient(circle, hsl(192 91% 42% / 0.15) 0%, transparent 70%)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Neon border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: '0 0 20px -5px hsl(192 91% 42% / 0.2), inset 0 0 20px -10px hsl(192 91% 42% / 0.1)',
          border: '1px solid hsl(192 91% 42% / 0.2)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-7 h-full flex flex-col">
        {/* Icon with 3D flip on hover */}
        {Icon && (
          <div className="mb-4">
            <motion.div
              animate={isHovered ? { rotateY: 360 } : { rotateY: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ perspective: 600 }}
              className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center"
            >
              <Icon className="w-6 h-6 text-accent" />
            </motion.div>
            {iconLabel && (
              <p className="text-xs text-accent font-medium mt-2 uppercase tracking-widest">{iconLabel}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
};

export default BentoCard;
