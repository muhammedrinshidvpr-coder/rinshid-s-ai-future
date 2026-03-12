import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

const NUM_NODES = 12;
const ORBIT_COLORS = [
  'hsl(192 91% 42%)',   // cyan
  'hsl(199 89% 48%)',   // electric blue
  'hsl(260 60% 55%)',   // deep violet
  'hsl(172 66% 50%)',   // teal
  'hsl(220 70% 50%)',   // blue
  'hsl(280 50% 45%)',   // purple
];

const NeuralPreloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'pulse' | 'ignition' | 'reveal'>('pulse');

  useEffect(() => {
    const duration = 2200;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(p);
      if (p < 100) requestAnimationFrame(tick);
      else {
        setPhase('ignition');
        setTimeout(() => setPhase('reveal'), 600);
        setTimeout(onComplete, 1200);
      }
    };
    requestAnimationFrame(tick);
  }, [onComplete]);

  const nodes = Array.from({ length: NUM_NODES }, (_, i) => {
    const angle = (i / NUM_NODES) * 360;
    const ring = i % 3;
    const radius = 40 + ring * 30;
    const color = ORBIT_COLORS[i % ORBIT_COLORS.length];
    const size = 4 + (ring === 0 ? 4 : ring === 1 ? 2 : 0);
    return { angle, radius, color, size, ring };
  });

  return (
    <AnimatePresence>
      {phase !== 'reveal' ? null : null}
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ background: '#030712' }}
        initial={{ opacity: 1 }}
        animate={phase === 'reveal' ? { opacity: 0, filter: 'blur(20px)' } : { opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        onAnimationComplete={() => { if (phase === 'reveal') onComplete(); }}
      >
        {/* Ambient glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 300, height: 300,
            background: 'radial-gradient(circle, hsla(192,91%,42%,0.15) 0%, hsla(260,60%,55%,0.08) 40%, transparent 70%)',
          }}
          animate={phase === 'pulse'
            ? { scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }
            : phase === 'ignition'
            ? { scale: [1, 0.6, 3], opacity: [0.8, 1, 0] }
            : {}
          }
          transition={phase === 'pulse'
            ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }
        />

        {/* Orbit rings */}
        {[40, 70, 100].map((r, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: r * 2, height: r * 2,
              borderColor: `hsla(192, 91%, 42%, ${0.08 + i * 0.03})`,
            }}
            animate={phase === 'ignition'
              ? { scale: [1, 0.5, 4], opacity: [0.3, 0.6, 0] }
              : { rotate: 360 }
            }
            transition={phase === 'ignition'
              ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
              : { duration: 8 + i * 4, repeat: Infinity, ease: 'linear' }
            }
          />
        ))}

        {/* Core orb */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 20, height: 20,
            background: 'radial-gradient(circle, hsl(192 91% 72%) 0%, hsl(192 91% 42%) 50%, hsl(260 60% 45%) 100%)',
            boxShadow: '0 0 30px 10px hsla(192,91%,42%,0.5), 0 0 60px 20px hsla(260,60%,55%,0.2)',
          }}
          animate={phase === 'pulse'
            ? { scale: [1, 1.4, 1], boxShadow: [
                '0 0 30px 10px hsla(192,91%,42%,0.4), 0 0 60px 20px hsla(260,60%,55%,0.15)',
                '0 0 50px 15px hsla(192,91%,42%,0.7), 0 0 80px 30px hsla(260,60%,55%,0.3)',
                '0 0 30px 10px hsla(192,91%,42%,0.4), 0 0 60px 20px hsla(260,60%,55%,0.15)',
              ] }
            : phase === 'ignition'
            ? { scale: [1.4, 0.3, 5], opacity: [1, 1, 0] }
            : {}
          }
          transition={phase === 'pulse'
            ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }
        />

        {/* Energy nodes */}
        {nodes.map((node, i) => {
          const rad = ((node.angle - 90) * Math.PI) / 180;
          const baseX = Math.cos(rad) * node.radius;
          const baseY = Math.sin(rad) * node.radius;
          const burstX = Math.cos(rad) * 500;
          const burstY = Math.sin(rad) * 500;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: node.size, height: node.size,
                background: node.color,
                boxShadow: `0 0 ${node.size * 3}px ${node.size}px ${node.color}40`,
              }}
              initial={{ x: baseX, y: baseY, opacity: 0.8 }}
              animate={phase === 'pulse'
                ? {
                    x: [baseX, baseX * 1.1, baseX],
                    y: [baseY, baseY * 1.1, baseY],
                    opacity: [0.6, 1, 0.6],
                    rotate: [0, 360],
                  }
                : phase === 'ignition'
                ? { x: burstX, y: burstY, opacity: 0, scale: 0.2 }
                : { x: baseX, y: baseY }
              }
              transition={phase === 'pulse'
                ? { duration: 2 + i * 0.15, repeat: Infinity, ease: 'easeInOut' }
                : { type: 'spring', stiffness: 80, damping: 12, delay: i * 0.02 }
              }
            />
          );
        })}

        {/* Text */}
        <motion.div
          className="absolute flex flex-col items-center"
          style={{ top: '60%' }}
          animate={phase === 'ignition' ? { opacity: 0, y: 10 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="text-xs md:text-sm tracking-[0.3em] uppercase font-mono"
            style={{ color: 'hsl(192 91% 42%)' }}
          >
            {phase === 'pulse'
              ? `Synthesizing Intelligence... ${progress}%`
              : 'SYSTEM ONLINE'}
          </motion.p>
          {/* Progress bar */}
          <div className="mt-3 w-40 h-[2px] rounded-full overflow-hidden" style={{ background: 'hsla(192,91%,42%,0.15)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, hsl(192 91% 42%), hsl(260 60% 55%))' }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.05 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NeuralPreloader;
