import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Sparkles, Cpu } from 'lucide-react';
import TiltCard from './TiltCard';

const projects = [
  { title: 'AI Automation Platform', category: 'Coming Soon', description: 'An intelligent automation platform designed to streamline business workflows.', tags: ['AI', 'Automation', 'SaaS'] },
  { title: 'Smart Learning System', category: 'Coming Soon', description: 'Personalized AI-powered education platform for future-ready skill development.', tags: ['EdTech', 'ML', 'Platform'] },
  { title: 'Business Analytics Suite', category: 'Coming Soon', description: 'Data-driven insights and predictive analytics for informed decision making.', tags: ['Analytics', 'Dashboard', 'B2B'] },
];

// AI Processing loader for coming soon cards
const AILoader = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Animated wireframe grid */}
    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 120" preserveAspectRatio="none">
      {/* Horizontal lines */}
      {[20, 40, 60, 80, 100].map((y) => (
        <motion.line
          key={`h-${y}`}
          x1="0" y1={y} x2="200" y2={y}
          stroke="hsl(192, 91%, 42%)"
          strokeWidth="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: y * 0.01, ease: 'easeInOut' }}
        />
      ))}
      {/* Vertical lines */}
      {[25, 50, 75, 100, 125, 150, 175].map((x) => (
        <motion.line
          key={`v-${x}`}
          x1={x} y1="0" x2={x} y2="120"
          stroke="hsl(192, 91%, 42%)"
          strokeWidth="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: x * 0.005, ease: 'easeInOut' }}
        />
      ))}
    </svg>

    {/* Center pulse */}
    <div className="relative">
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-6 rounded-full border border-accent/30"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute -inset-3 rounded-full border border-accent/20"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center"
        style={{ boxShadow: '0 0 25px hsl(192 91% 42% / 0.2)' }}
      >
        <Cpu className="w-7 h-7 text-accent" />
      </motion.div>
    </div>

    {/* Status text */}
    <motion.div
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute bottom-4 left-0 right-0 text-center"
    >
      <span className="text-[10px] font-mono text-accent/60 tracking-wider uppercase">Processing...</span>
    </motion.div>
  </div>
);

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * index, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <TiltCard tiltIntensity={14}>
                {/* AI Loader area */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-secondary/50 to-accent/[0.03]">
                  <AILoader />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-semibold text-lg text-foreground">{project.title}</h3>
                    <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight className="w-4 h-4 text-accent" />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20">{tag}</span>
                    ))}
                  </div>
                </div>
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
    </section>
  );
};

export default Projects;
