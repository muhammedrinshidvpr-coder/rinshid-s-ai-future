import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const projects = [
  { title: 'AI Automation Platform', category: 'Coming Soon', description: 'An intelligent automation platform designed to streamline business workflows.', tags: ['AI', 'Automation', 'SaaS'] },
  { title: 'Smart Learning System', category: 'Coming Soon', description: 'Personalized AI-powered education platform for future-ready skill development.', tags: ['EdTech', 'ML', 'Platform'] },
  { title: 'Business Analytics Suite', category: 'Coming Soon', description: 'Data-driven insights and predictive analytics for informed decision making.', tags: ['Analytics', 'Dashboard', 'B2B'] },
];

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
              className="group"
              whileHover={{ y: -4 }}
            >
              <div className="h-full rounded-2xl bg-card border border-border/50 overflow-hidden transition-all duration-500 ease-out hover:shadow-xl hover:border-accent/30">
                <div className="relative h-48 bg-gradient-to-br from-secondary to-accent/5 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-10 h-10 text-accent/40 mx-auto mb-2" />
                    <span className="text-xs text-muted-foreground font-medium">{project.category}</span>
                  </div>
                  <div className="absolute inset-0 bg-accent/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                      <ArrowUpRight className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
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
