import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: string;
}

const milestones: Milestone[] = [
  {
    year: '2023',
    title: 'Founded CosmIQ Academy',
    description: 'Launched an AI-first learning platform to make cutting-edge technology education accessible to students across India.',
    icon: '🚀',
  },
  {
    year: '2023',
    title: 'Launched Aied Academy',
    description: 'Created a specialized initiative focused on AI-powered education tools, bridging the gap between traditional learning and intelligent tutoring.',
    icon: '🎓',
  },
  {
    year: '2024',
    title: 'AI Poster Making Challenge',
    description: 'Organized a creative competition challenging students to use AI tools for poster design — fostering innovation and digital literacy.',
    icon: '🏆',
  },
];

// Text decode effect hook
const useDecodeText = (text: string, isActive: boolean, speed = 30) => {
  const [decoded, setDecoded] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

  useEffect(() => {
    if (!isActive) {
      setDecoded('');
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDecoded(
        text
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' ';
            if (idx < iteration) return text[idx];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      iteration += 1;
      if (iteration > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [isActive, text, speed]);

  return isActive ? decoded || text : '';
};

const TimelineNode = ({ milestone, index, totalNodes }: { milestone: Milestone; index: number; totalNodes: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isLeft = index % 2 === 0;
  const decodedTitle = useDecodeText(milestone.title, isInView, 25);
  const decodedDesc = useDecodeText(milestone.description, isInView, 8);

  return (
    <div ref={ref} className="relative flex items-center justify-center py-12 md:py-20">
      {/* Center node */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-20"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
      >
        {/* Radial glow */}
        <motion.div
          className="absolute inset-0 -m-6 rounded-full"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: [0, 0.6, 0.3] } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          style={{
            background: 'radial-gradient(circle, hsl(192 91% 42% / 0.4) 0%, transparent 70%)',
            width: '60px',
            height: '60px',
            left: '-18px',
            top: '-18px',
          }}
        />
        {/* Node circle */}
        <div className="w-6 h-6 rounded-full border-2 border-accent bg-background flex items-center justify-center relative">
          <motion.div
            className="w-2.5 h-2.5 rounded-full bg-accent"
            animate={isInView ? { boxShadow: ['0 0 0px hsl(192 91% 42%)', '0 0 12px hsl(192 91% 42%)', '0 0 6px hsl(192 91% 42%)'] } : {}}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          />
        </div>
      </motion.div>

      {/* Content card */}
      <div className={`w-full flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} justify-center`}>
        <motion.div
          className={`w-full md:w-[calc(50%-3rem)] glass-card rounded-2xl p-6 md:p-7 relative overflow-hidden ${
            isLeft ? 'md:mr-auto' : 'md:ml-auto'
          }`}
          initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 10 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Scan line */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            <motion.div
              className="absolute left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, hsl(192 91% 42% / 0.3), transparent)' }}
              animate={isInView ? { top: ['0%', '100%'] } : {}}
              transition={{ duration: 2, delay: 0.5, ease: 'linear' }}
            />
          </motion.div>

          {/* Year badge */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{milestone.icon}</span>
            <span className="text-accent font-mono text-xs font-semibold tracking-wider px-2.5 py-1 rounded-full border border-accent/30 bg-accent/10">
              {milestone.year}
            </span>
          </div>

          {/* Decoded title */}
          <h3 className="font-display font-bold text-lg md:text-xl text-foreground mb-2 font-mono tracking-tight">
            {decodedTitle}
          </h3>

          {/* Decoded description */}
          <p className="text-muted-foreground text-sm leading-relaxed font-mono">
            {decodedDesc}
          </p>

          {/* Corner glow */}
          <motion.div
            className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, hsl(192 91% 42% / 0.08) 0%, transparent 70%)' }}
            animate={isInView ? { scale: [0.8, 1.2, 1] } : {}}
            transition={{ duration: 1.5, delay: 0.4 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

const VentureTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), {
    stiffness: 80,
    damping: 30,
  });

  return (
    <section id="timeline" className="section-padding relative overflow-hidden" ref={sectionRef}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-widest mb-4">
            Venture & Impact
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5">
            Milestones That <span className="gradient-text">Define the Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Key moments where vision met execution — building platforms, empowering students, and shaping the future of AI education.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* SVG fiber optic line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block">
            {/* Base line (dim) */}
            <div className="absolute inset-0 w-px bg-border/30" />
            {/* Animated glow line */}
            <motion.div
              className="absolute top-0 left-0 w-px origin-top"
              style={{
                height: lineHeight.get ? undefined : '0%',
                background: 'linear-gradient(180deg, hsl(192 91% 42%) 0%, hsl(172 66% 50%) 60%, transparent 100%)',
                boxShadow: '0 0 8px hsl(192 91% 42% / 0.5), 0 0 20px hsl(192 91% 42% / 0.2)',
              }}
            >
              <motion.div
                className="w-px bg-accent"
                style={{
                  height: lineHeight.get
                    ? undefined
                    : '0%',
                }}
              />
            </motion.div>
            {/* Use a more reliable approach */}
            <motion.div
              className="absolute top-0 left-0 w-px origin-top"
              style={{
                height: useTransform(lineHeight, (v) => `${v}%`),
                background: 'linear-gradient(180deg, hsl(192 91% 42%) 0%, hsl(172 66% 50%) 60%, transparent 100%)',
                boxShadow: '0 0 8px hsl(192 91% 42% / 0.5), 0 0 20px hsl(192 91% 42% / 0.2)',
              }}
            />

            {/* Traveling pulse */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-1 h-8 rounded-full"
              style={{
                top: useTransform(lineHeight, (v) => `${v}%`),
                background: 'linear-gradient(180deg, transparent, hsl(192 91% 42%), transparent)',
                filter: 'blur(1px)',
              }}
            />
          </div>

          {/* Mobile line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px md:hidden bg-border/20" />

          {/* Nodes */}
          {milestones.map((milestone, i) => (
            <TimelineNode key={i} milestone={milestone} index={i} totalNodes={milestones.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VentureTimeline;
