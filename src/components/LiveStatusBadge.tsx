import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_STRINGS = [
  'System Status: All Systems Operational',
  'Current Focus: Building AI Agents',
  'Currently Reading: The Pragmatic Programmer',
];

const LiveStatusBadge = () => {
  const [time, setTime] = useState('');
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setStatusIndex(i => (i + 1) % STATUS_STRINGS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="inline-flex flex-col items-start gap-1 px-4 py-2.5 rounded-full glass-card glow-border">
      <div className="flex items-center gap-2.5">
        {/* Pulsing green dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" style={{ boxShadow: '0 0 6px 2px hsla(160,84%,55%,0.5)' }} />
        </span>

        {/* IST Clock */}
        <span className="font-mono text-xs tracking-wider text-accent">{time}</span>
        <span className="text-[10px] text-muted-foreground font-medium">IST</span>
      </div>

      {/* Rotating status text */}
      <div className="h-3.5 overflow-hidden pl-[18px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={statusIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="block text-[10px] text-muted-foreground whitespace-nowrap"
          >
            {STATUS_STRINGS[statusIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveStatusBadge;
