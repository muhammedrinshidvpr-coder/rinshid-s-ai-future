import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { ArrowUpRight, Sparkles, Cpu, X, ExternalLink, Github, Radio, Wifi, Database, Server, Shield, Globe, Zap, Signal, Bot } from 'lucide-react';
import TiltCard from './TiltCard';
import SalesAgentModal from './SalesAgentModal';
import CampusTradeModal from './CampusTradeModal';
import campusTradeHero from '@/assets/campustrade-hero.png';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  longDescription?: string;
  techStack?: { name: string; icon: any }[];
  features?: string[];
  status: 'live' | 'coming-soon';
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: 'resilience-net',
    title: 'ResilienceNet',
    category: 'Disaster Communication',
    description: 'A real-world disaster communication system designed to maintain connectivity when traditional infrastructure fails.',
    longDescription: 'ResilienceNet is a decentralized, mesh-network-based communication platform built for disaster scenarios. It enables communities to maintain critical communications when cellular towers, internet infrastructure, and power grids are compromised. The system leverages edge computing, peer-to-peer protocols, and AI-driven message prioritization to ensure life-saving information reaches those who need it most.',
    tags: ['Mesh Network', 'IoT', 'AI', 'Emergency'],
    techStack: [
      { name: 'Python', icon: Cpu },
      { name: 'WebRTC', icon: Wifi },
      { name: 'MQTT', icon: Signal },
      { name: 'PostgreSQL', icon: Database },
      { name: 'Edge Computing', icon: Server },
      { name: 'Encryption', icon: Shield },
      { name: 'React', icon: Globe },
      { name: 'Real-time AI', icon: Zap },
    ],
    features: [
      'Decentralized mesh networking for zero-infrastructure communication',
      'AI-powered message triage and priority routing',
      'End-to-end encrypted P2P messaging',
      'Offline-first architecture with sync-on-connect',
      'Low-bandwidth optimized data transmission',
      'Community alert broadcasting system',
    ],
    status: 'live',
    github: '#',
    demo: '#',
  },
  {
    id: 'ai-sales-agent',
    title: 'Autonomous AI Outbound Sales Agent',
    category: 'AI Automation',
    description: 'A fully autonomous AI agent that researches companies, scrapes value propositions, and generates hyper-personalized cold emails to CEOs — zero human intervention.',
    tags: ['n8n', 'Google Gemini', 'Docker', 'Automation'],
    status: 'live' as const,
  },
  {
    id: 'campustrade',
    title: 'CampusTrade: TKM E-commerce',
    category: 'Featured Venture',
    description: 'A specialized platform enabling TKM students to safely buy and sell campus gear, electronics, and support student brands — built for the Kollam college community.',
    tags: ['Full-Stack', 'E-commerce', 'TKM Certified', 'Vercel'],
    status: 'live' as const,
  },
];

// AI Processing loader for coming soon cards
const AILoader = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 120" preserveAspectRatio="none">
      {[20, 40, 60, 80, 100].map((y) => (
        <motion.line key={`h-${y}`} x1="0" y1={y} x2="200" y2={y} stroke="hsl(192, 91%, 42%)" strokeWidth="0.3"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: y * 0.01, ease: 'easeInOut' }} />
      ))}
      {[25, 50, 75, 100, 125, 150, 175].map((x) => (
        <motion.line key={`v-${x}`} x1={x} y1="0" x2={x} y2="120" stroke="hsl(192, 91%, 42%)" strokeWidth="0.3"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: [0, 0.4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: x * 0.005, ease: 'easeInOut' }} />
      ))}
    </svg>
    <div className="relative">
      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -inset-6 rounded-full border border-accent/30" />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center" style={{ boxShadow: '0 0 25px hsl(192 91% 42% / 0.2)' }}>
        <Cpu className="w-7 h-7 text-accent" />
      </motion.div>
    </div>
    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-4 left-0 right-0 text-center">
      <span className="text-[10px] font-mono text-accent/60 tracking-wider uppercase">Processing...</span>
    </motion.div>
  </div>
);

// ResilienceNet hero visual
const ResilienceNetVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    {/* Animated network nodes */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 180" preserveAspectRatio="xMidYMid meet">
      {/* Connection lines */}
      {[
        [150, 90, 80, 50], [150, 90, 220, 50], [150, 90, 60, 130],
        [150, 90, 240, 130], [80, 50, 220, 50], [60, 130, 240, 130],
        [80, 50, 60, 130], [220, 50, 240, 130],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="hsl(192, 91%, 42%)" strokeWidth="0.5" opacity="0.3"
          initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1], opacity: [0, 0.4, 0.2] }}
          transition={{ duration: 2, delay: i * 0.15, repeat: Infinity, repeatDelay: 3 }} />
      ))}
      {/* Data pulse along lines */}
      {[
        [150, 90, 80, 50], [150, 90, 220, 50], [150, 90, 240, 130],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.circle key={`pulse-${i}`} r="2" fill="hsl(192, 91%, 55%)"
          animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, delay: 1 + i * 0.8, repeat: Infinity, repeatDelay: 4 }} />
      ))}
      {/* Nodes */}
      {[
        [150, 90, 10], [80, 50, 6], [220, 50, 6], [60, 130, 6], [240, 130, 6],
      ].map(([cx, cy, r], i) => (
        <g key={`node-${i}`}>
          <motion.circle cx={cx} cy={cy} r={Number(r) + 3} fill="none" stroke="hsl(192, 91%, 42%)" strokeWidth="0.5"
            animate={{ r: [Number(r) + 3, Number(r) + 8, Number(r) + 3], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }} />
          <circle cx={cx} cy={cy} r={r} fill="hsl(192, 91%, 42%)" opacity={i === 0 ? 0.6 : 0.3} />
          <circle cx={cx} cy={cy} r={Number(r) * 0.5} fill="hsl(192, 91%, 60%)" opacity="0.8" />
        </g>
      ))}
    </svg>
    {/* Center label */}
    <div className="relative z-10 text-center">
      <Radio className="w-8 h-8 text-accent mx-auto mb-1" />
      <span className="text-[10px] font-mono text-accent/70 tracking-wider uppercase">Mesh Active</span>
    </div>
  </div>
);

// Expanded project modal
const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
    onClick={onClose}
  >
    {/* Backdrop */}
    <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

    {/* Modal */}
    <motion.div
      initial={{ scale: 0.9, y: 30, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.95, y: 20, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/[0.08]"
      style={{
        background: 'hsla(222, 47%, 6%, 0.95)',
        backdropFilter: 'blur(40px)',
      }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(192, 91%, 42%)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/[0.1] transition-all duration-200"
      >
        <X size={18} />
      </button>

      {/* Header area with network visual */}
      <div className="relative h-48 md:h-56 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.05] to-transparent" />
        <ResilienceNetVisual />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[hsla(222,47%,6%,0.95)] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-6 md:p-10">
        {/* Title */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0" style={{ boxShadow: '0 0 20px hsl(192 91% 42% / 0.15)' }}>
            <Radio className="w-7 h-7 text-accent" />
          </div>
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">{project.title}</h2>
            <p className="text-accent text-sm font-medium">{project.category}</p>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-8">{project.longDescription}</p>

        {/* Architecture diagram mock */}
        <div className="mb-8">
          <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            System Architecture
          </h3>
          <div className="rounded-2xl border border-white/[0.06] p-6 bg-white/[0.02]">
            <div className="grid grid-cols-3 gap-4">
              {/* Client layer */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
                <div className="text-[10px] text-accent/60 font-mono uppercase tracking-wider mb-3">Client Layer</div>
                <div className="space-y-2">
                  {['Mobile App', 'Web Dashboard', 'IoT Nodes'].map((item) => (
                    <div key={item} className="px-3 py-2 rounded-lg bg-accent/[0.06] border border-accent/15 text-xs text-foreground/80 font-mono">{item}</div>
                  ))}
                </div>
              </motion.div>
              {/* Processing layer */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="text-center">
                <div className="text-[10px] text-accent/60 font-mono uppercase tracking-wider mb-3">Processing</div>
                <div className="space-y-2">
                  {['Mesh Router', 'AI Triage Engine', 'Edge Compute'].map((item) => (
                    <div key={item} className="px-3 py-2 rounded-lg bg-accent/[0.06] border border-accent/15 text-xs text-foreground/80 font-mono">{item}</div>
                  ))}
                </div>
                {/* Connection arrows */}
                <div className="flex justify-center gap-4 my-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }} className="w-0.5 h-4 bg-accent/30" />
                  ))}
                </div>
              </motion.div>
              {/* Data layer */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-center">
                <div className="text-[10px] text-accent/60 font-mono uppercase tracking-wider mb-3">Data Layer</div>
                <div className="space-y-2">
                  {['PostgreSQL', 'MQTT Broker', 'Encrypted Store'].map((item) => (
                    <div key={item} className="px-3 py-2 rounded-lg bg-accent/[0.06] border border-accent/15 text-xs text-foreground/80 font-mono">{item}</div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Tech stack floating nodes */}
        <div className="mb-8">
          <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-3">
            {project.techStack?.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.06, type: 'spring', stiffness: 200 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-accent/30 hover:bg-accent/[0.05] transition-colors duration-200"
                >
                  <Icon className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-foreground/80">{tech.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Key features */}
        <div className="mb-8">
          <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            Key Features
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {project.features?.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
              >
                <Zap className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.a
            href={project.demo}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-accent-foreground overflow-hidden group"
          >
            <div className="absolute inset-0 bg-accent rounded-full" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
              background: 'linear-gradient(105deg, transparent 30%, hsla(0,0%,100%,0.2) 45%, hsla(0,0%,100%,0.35) 50%, hsla(0,0%,100%,0.2) 55%, transparent 70%)',
              animation: 'shimmerOnce 1.5s ease-out',
            }} />
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 30px hsl(192 91% 42% / 0.4)' }} />
            <ExternalLink className="w-5 h-5 relative z-10" />
            <span className="relative z-10">View Demo</span>
          </motion.a>
          <motion.a
            href={project.github}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-foreground border border-white/[0.1] hover:border-accent/30 hover:text-accent transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            <span>View Code</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const [showSalesAgent, setShowSalesAgent] = useState(false);

  const handleClose = useCallback(() => setExpandedProject(null), []);

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-widest mb-4">Portfolio</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg">Innovative solutions that are shaping the future of AI and automation.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * index, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <TiltCard tiltIntensity={14}>
                <button
                  onClick={() => {
                    if (project.id === 'ai-sales-agent') setShowSalesAgent(true);
                    else if (project.status === 'live') setExpandedProject(project);
                  }}
                  className="w-full text-left cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-secondary/50 to-accent/[0.03]">
                    {project.id === 'ai-sales-agent' ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }} transition={{ duration: 3, repeat: Infinity }} className="absolute w-24 h-24 rounded-full border border-accent/20" />
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center" style={{ boxShadow: '0 0 30px hsl(192 91% 42% / 0.2)' }}>
                          <Bot className="w-8 h-8 text-accent" />
                        </motion.div>
                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-3 text-center">
                          <span className="text-[10px] font-mono text-accent/60 tracking-wider uppercase">Deep Dive →</span>
                        </motion.div>
                      </div>
                    ) : (
                      <ResilienceNetVisual />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-semibold text-lg text-foreground">{project.title}</h3>
                      <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4 text-accent" />
                      </div>
                    </div>
                    <p className="text-accent text-xs font-medium mb-2">{project.category}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20">{tag}</span>
                      ))}
                    </div>
                  </div>
                </button>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">More projects coming soon. Stay tuned!</p>
          <a href="#contact" className="inline-flex items-center gap-2 text-accent font-medium hover:underline">
            Let's collaborate <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </div>

      {/* Expanded modals */}
      <AnimatePresence>
        {expandedProject && <ProjectModal project={expandedProject} onClose={handleClose} />}
        {showSalesAgent && <SalesAgentModal onClose={() => setShowSalesAgent(false)} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
