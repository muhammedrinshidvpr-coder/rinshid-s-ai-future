import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import heroImage from '@/assets/rinshid-hero.png';
import LiveStatusBadge from '@/components/LiveStatusBadge';

// Decode/typewriter text animation
const DecodeText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let iteration = 0;
    const maxIterations = text.length;
    const interval = setInterval(() => {
      setDisplayText(
        text.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iteration) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      iteration += 0.5;
      if (iteration > maxIterations) {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [started, text]);

  return <>{displayText || '\u00A0'}</>;
};

// Magnetic button component
const MagneticButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * 0.3;
    const distY = (e.clientY - centerY) * 0.3;
    x.set(distX);
    y.set(distY);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold overflow-hidden group"
    >
      {/* Base bg */}
      <div className="absolute inset-0 bg-accent rounded-full" />
      {/* Sweeping light reflection */}
      <div
        className={`absolute inset-0 transition-transform duration-700 ease-out ${
          isHovered ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(105deg, transparent 30%, hsla(0,0%,100%,0.25) 45%, hsla(0,0%,100%,0.4) 50%, hsla(0,0%,100%,0.25) 55%, transparent 70%)',
        }}
      />
      {/* Glow on hover */}
      <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} style={{ boxShadow: '0 0 30px 5px hsl(192 91% 42% / 0.4), inset 0 0 20px hsl(192 91% 42% / 0.1)' }} />
      <span className="relative z-10 text-accent-foreground">{children}</span>
    </motion.a>
  );
};

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-10 relative overflow-hidden"
    >
      {/* Background glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-accent/[0.07] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 -left-40 w-[400px] h-[400px] bg-accent/[0.05] rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm font-medium mb-6"
            >
              <Sparkles size={16} />
              <span>Founder & CGO at CosmIQ</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance"
            >
              <span className="text-foreground">
                <DecodeText text="Building the" delay={400} />
              </span>
              <br />
              {/* Shimmer gradient text */}
              <span className="relative inline-block">
                <span
                  className="bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]"
                  style={{
                    backgroundImage: 'linear-gradient(105deg, hsl(192 91% 42%) 0%, hsl(172 66% 50%) 25%, hsl(199 89% 68%) 50%, hsl(172 66% 50%) 75%, hsl(192 91% 42%) 100%)',
                  }}
                >
                  <DecodeText text="Future" delay={800} />
                </span>
              </span>
              <br />
              <span className="text-foreground">
                <DecodeText text="with AI & Automation" delay={1200} />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Helping students and businesses become future-ready in the AI era through innovative solutions, education, and transformative technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <MagneticButton href="#contact">
                Work With Me
              </MagneticButton>
              <a
                href="#about"
                className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground rounded-full text-base font-semibold transition-all duration-300 hover:border-accent hover:text-accent"
              >
                Learn More
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex justify-center lg:justify-start mt-6"
            >
              <LiveStatusBadge />
            </motion.div>
          </motion.div>

          {/* Image with animated gradient border */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Animated gradient glow */}
              <div className="absolute -inset-[3px] rounded-3xl animate-border-glow opacity-70" style={{
                background: 'linear-gradient(var(--border-angle, 0deg), hsl(192 91% 42%), hsl(199 89% 68%), hsl(172 66% 50%), hsl(192 91% 42%))',
                filter: 'blur(8px)',
              }} />
              <div className="absolute -inset-[2px] rounded-3xl animate-border-glow" style={{
                background: 'linear-gradient(var(--border-angle, 0deg), hsl(192 91% 42%), hsl(199 89% 68%), hsl(172 66% 50%), hsl(192 91% 42%))',
              }} />

              {/* Image Container */}
              <div className="relative w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[480px] rounded-3xl overflow-hidden bg-background">
                <img
                  src={heroImage}
                  alt="Muhammed Rinshid VP"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-6 glass-card px-4 py-3 rounded-2xl shadow-lg glow-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">AI Developer</p>
                    <p className="text-sm font-semibold text-foreground">& Educator</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={20} className="text-accent/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
