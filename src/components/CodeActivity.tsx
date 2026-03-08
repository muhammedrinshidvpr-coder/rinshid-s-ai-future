import { useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Generate simulated contribution data for 52 weeks x 7 days
const generateContributions = () => {
  const data: number[] = [];
  for (let i = 0; i < 364; i++) {
    const rand = Math.random();
    if (rand < 0.15) data.push(0);
    else if (rand < 0.4) data.push(Math.floor(Math.random() * 3) + 1);
    else if (rand < 0.7) data.push(Math.floor(Math.random() * 5) + 3);
    else if (rand < 0.9) data.push(Math.floor(Math.random() * 6) + 6);
    else data.push(Math.floor(Math.random() * 8) + 10);
  }
  return data;
};

const getColor = (count: number) => {
  if (count === 0) return 'hsla(217, 33%, 14%, 0.6)';
  if (count <= 2) return 'hsla(192, 91%, 42%, 0.25)';
  if (count <= 5) return 'hsla(192, 91%, 42%, 0.5)';
  if (count <= 9) return 'hsla(199, 89%, 48%, 0.75)';
  return 'hsla(192, 91%, 50%, 1)';
};

const AnimatedCounter = ({ target, label, suffix = '' }: { target: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <motion.div
      className="text-center"
      onViewportEnter={() => {
        if (hasAnimated) return;
        setHasAnimated(true);
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
      }}
      viewport={{ once: true }}
    >
      <span className="text-3xl md:text-4xl font-display font-bold gradient-text">
        {count.toLocaleString()}{suffix}
      </span>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </motion.div>
  );
};

const CodeActivity = () => {
  const contributions = useMemo(generateContributions, []);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; count: number } | null>(null);

  // Reshape into weeks (columns of 7)
  const weeks: number[][] = [];
  for (let w = 0; w < 52; w++) {
    weeks.push(contributions.slice(w * 7, w * 7 + 7));
  }

  return (
    <section className="section-padding relative z-10" id="activity">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-3">
            <span className="gradient-text">Code Activity & Contributions</span>
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-10">
            A data-driven snapshot of building consistency.
          </p>

          <div
            className="max-w-5xl mx-auto rounded-2xl border border-white/[0.08] p-6 md:p-8"
            style={{ background: 'hsla(222, 47%, 6%, 0.8)', backdropFilter: 'blur(20px)' }}
          >
            {/* Graph + Stats */}
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Contribution Graph */}
              <div className="flex-1 w-full relative overflow-x-auto">
                <div className="flex gap-[3px] min-w-[640px]" onMouseLeave={() => setTooltip(null)}>
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((count, di) => (
                        <motion.div
                          key={di}
                          className="w-[11px] h-[11px] rounded-sm cursor-pointer"
                          style={{ background: getColor(count) }}
                          whileHover={{ scale: 1.8, zIndex: 10 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                          onMouseEnter={(e) => {
                            const rect = (e.target as HTMLElement).getBoundingClientRect();
                            setTooltip({ x: rect.left + rect.width / 2, y: rect.top, count });
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-2 mt-4 text-[10px] text-muted-foreground">
                  <span>Less</span>
                  {[0, 2, 5, 9, 12].map((v, i) => (
                    <div key={i} className="w-[11px] h-[11px] rounded-sm" style={{ background: getColor(v) }} />
                  ))}
                  <span>More</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex lg:flex-col gap-8 lg:gap-6 shrink-0">
                <AnimatedCounter target={42} label="Repositories Built" suffix="+" />
                <AnimatedCounter target={24500} label="Lines of Code" suffix="+" />
                <AnimatedCounter target={404} label="Coffee Consumed" suffix=" ☕" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating tooltip (portal-style) */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-1.5 rounded-lg text-xs font-mono border border-white/[0.1]"
          style={{
            left: tooltip.x,
            top: tooltip.y - 36,
            transform: 'translateX(-50%)',
            background: 'hsla(222, 47%, 8%, 0.95)',
            backdropFilter: 'blur(12px)',
            color: 'hsl(192, 91%, 60%)',
          }}
        >
          {tooltip.count} contribution{tooltip.count !== 1 ? 's' : ''}
        </div>
      )}
    </section>
  );
};

export default CodeActivity;
