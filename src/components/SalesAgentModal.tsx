import { motion } from 'framer-motion';
import { X, Container, Cpu, Sparkles, FileSpreadsheet, Code2, Brain, Github } from 'lucide-react';
import deepDiveImg from '@/assets/ai-sales-agent-deepdive.png';

const techStack = [
  { name: 'n8n (Self-Hosted via Docker)', icon: Cpu },
  { name: 'Docker', icon: Container },
  { name: 'Google Gemini 1.5 Pro', icon: Sparkles },
  { name: 'Python (Data Handling)', icon: Code2 },
  { name: 'Google Sheets', icon: FileSpreadsheet },
  { name: 'Prompt Engineering', icon: Brain },
];

const GITHUB_REPO_URL = 'https://github.com/rinshidkp/autonomous-ai-sales-agent';

const SalesAgentModal = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
    onClick={onClose}
  >
    <div className="absolute inset-0 bg-background/85 backdrop-blur-xl" />

    <motion.div
      initial={{ scale: 0.88, y: 40, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.94, y: 20, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/[0.08]"
      style={{ background: 'hsla(222, 47%, 6%, 0.96)', backdropFilter: 'blur(40px)' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sales-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(192, 91%, 42%)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sales-grid)" />
        </svg>
      </div>

      {/* Close */}
      <button onClick={onClose} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/[0.1] transition-all">
        <X size={18} />
      </button>

      {/* Header */}
      <div className="relative px-6 md:px-10 pt-8 pb-4">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-xl md:text-3xl font-bold text-foreground tracking-tight uppercase text-center"
        >
          Project Deep-Dive:{' '}
          <span className="text-accent">Autonomous AI Outbound Sales Agent</span>
        </motion.h2>
      </div>

      {/* Main visual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="px-6 md:px-10 pb-2"
      >
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]" style={{ boxShadow: '0 0 60px hsl(192 91% 42% / 0.08)' }}>
          <img src={deepDiveImg} alt="Autonomous AI Outbound Sales Agent - Conceptual Architecture and n8n Workflow" className="w-full h-auto" />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsla(192, 91%, 42%, 0.015) 2px, hsla(192, 91%, 42%, 0.015) 4px)',
          }} />
        </div>
      </motion.div>

      {/* Descriptions row */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="px-6 md:px-10 py-4 grid md:grid-cols-2 gap-6"
      >
        <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <h3 className="font-display font-semibold text-sm text-accent uppercase tracking-wider mb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            Conceptual Architecture
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The AI Engine autonomously researches target companies, scrapes core value propositions from websites, and generates hyper-personalized cold emails to CEOs — all without human intervention.
          </p>
        </div>
        <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <h3 className="font-display font-semibold text-sm text-accent uppercase tracking-wider mb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            Functional Implementation
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Built on a self-hosted n8n instance via Docker. Orchestration handles research, content generation, and email dispatch. Intelligence powered by Google Gemini 1.5 Pro with real-time execution logs.
          </p>
        </div>
      </motion.div>

      {/* Data stream connector line */}
      <div className="flex justify-center py-2">
        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-transparent via-accent/40 to-transparent"
        />
      </div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="px-6 md:px-10 pb-4"
      >
        <h3 className="font-display font-semibold text-sm text-foreground text-center mb-4 uppercase tracking-wider">Tech Stack</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.06, type: 'spring', stiffness: 200 }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-accent/30 hover:bg-accent/[0.05] transition-colors"
              >
                <Icon className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium text-foreground/80 whitespace-nowrap">{tech.name}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="px-6 md:px-10 pb-8 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        {/* View Code on GitHub */}
        <motion.a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="relative group inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden cursor-pointer"
          style={{
            background: 'hsla(222, 47%, 8%, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid hsl(192, 91%, 42%, 0.35)',
            boxShadow: '0 0 20px hsl(192 91% 42% / 0.12), inset 0 1px 0 hsla(0,0%,100%,0.05)',
          }}
        >
          {/* Hover glow intensification */}
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
            style={{
              boxShadow: '0 0 30px hsl(192 91% 42% / 0.35), 0 0 60px hsl(192 91% 42% / 0.15), inset 0 0 20px hsl(192 91% 42% / 0.06)',
              border: '1px solid hsl(192, 91%, 55%, 0.6)',
            }}
          />
          {/* Shimmer sweep on hover */}
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(105deg, transparent 35%, hsla(192, 91%, 60%, 0.08) 45%, hsla(192, 91%, 60%, 0.15) 50%, hsla(192, 91%, 60%, 0.08) 55%, transparent 65%)',
              backgroundSize: '250% 100%',
              animation: 'shimmerSweep 2s ease-in-out infinite',
            }}
          />
          <Github className="w-5 h-5 text-accent relative z-10 group-hover:drop-shadow-[0_0_6px_hsl(192,91%,42%,0.6)] transition-all duration-300" />
          <span className="relative z-10 text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-accent transition-colors duration-300">
            View Code on GitHub
          </span>
        </motion.a>

        {/* Explore Architecture */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative group px-8 py-4 rounded-full font-semibold text-accent-foreground overflow-hidden"
        >
          <div className="absolute inset-0 bg-accent rounded-full" />
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 40px hsl(192 91% 42% / 0.5), 0 0 80px hsl(192 91% 42% / 0.2)' }} />
          <span className="relative z-10 text-sm uppercase tracking-widest font-bold">Explore Architecture & Impact</span>
        </motion.button>
      </motion.div>
    </motion.div>

    {/* Shimmer keyframes */}
    <style>{`
      @keyframes shimmerSweep {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  </motion.div>
);

export default SalesAgentModal;
