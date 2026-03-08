import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalProps {
  code: string;
  title: string;
  language: string;
}

const Terminal = ({ code, title, language }: TerminalProps) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset and start typing
    setDisplayedCode('');
    setIsTyping(true);

    if (intervalRef.current) clearInterval(intervalRef.current);

    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i < code.length) {
        setDisplayedCode(code.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 18);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [code]);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl" style={{
      background: 'hsla(222, 47%, 5%, 0.9)',
      backdropFilter: 'blur(20px)',
    }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-muted-foreground font-mono">{title}</span>
        </div>
        <span className="text-[10px] text-muted-foreground/50 font-mono">{language}</span>
      </div>

      {/* Code area */}
      <div className="p-5 min-h-[200px] md:min-h-[260px] font-mono text-sm leading-relaxed overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.pre
            key={code}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="whitespace-pre-wrap text-foreground/90"
          >
            <code>
              {displayedCode}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="text-accent"
                >
                  ▊
                </motion.span>
              )}
            </code>
          </motion.pre>
        </AnimatePresence>
      </div>

      {/* Status bar */}
      <div className="px-4 py-2 border-t border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isTyping ? 'bg-accent animate-pulse' : 'bg-green-500'}`} />
          <span className="text-[10px] text-muted-foreground font-mono">
            {isTyping ? 'compiling...' : 'ready'}
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground/50 font-mono">rinshid@cosmiq</span>
      </div>
    </div>
  );
};

export default Terminal;
