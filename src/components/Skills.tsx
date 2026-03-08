import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Bot, GraduationCap, Code2, FileCode, Globe, Cog, Workflow, Lightbulb } from 'lucide-react';
import BentoCard from './BentoCard';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-widest mb-4">What I Do</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5">Skills & Expertise</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">Skills I use to build AI solutions and educate future-ready learners.</p>
        </motion.div>

        {/* Bento Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

          {/* Core Expertise - tall */}
          <BentoCard icon={Brain} iconLabel="Core" className="md:row-span-2" delay={0.1} isInView={isInView}>
            <h3 className="font-display font-semibold text-xl text-foreground mb-4">Core Expertise</h3>
            <div className="space-y-3 flex-1">
              {[
                { icon: Sparkles, name: 'AI & Prompt Engineering' },
                { icon: Bot, name: 'AI Automation Systems' },
                { icon: GraduationCap, name: 'AI Education & Training' },
              ].map((skill) => (
                <div key={skill.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] transition-colors duration-200 hover:border-accent/20">
                  <skill.icon className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground/90 text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Technical - wide */}
          <BentoCard icon={Code2} iconLabel="Technical" className="md:col-span-2" delay={0.15} isInView={isInView}>
            <h3 className="font-display font-semibold text-xl text-foreground mb-4">Technical Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: FileCode, name: 'Python & Pandas', sub: 'Data handling & automation' },
                { icon: Globe, name: 'Web Development', sub: 'HTML, CSS, Bootstrap' },
                { icon: Code2, name: 'Software Dev', sub: 'Full-stack applications' },
              ].map((skill) => (
                <div key={skill.name} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] transition-colors duration-200 hover:border-accent/20">
                  <skill.icon className="w-5 h-5 text-accent mb-2" />
                  <p className="text-foreground text-sm font-medium">{skill.name}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{skill.sub}</p>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Applied - wide */}
          <BentoCard icon={Cog} iconLabel="Applied" className="md:col-span-2" delay={0.2} isInView={isInView}>
            <h3 className="font-display font-semibold text-xl text-foreground mb-4">Applied Capabilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: Cog, name: 'Business Automation', sub: 'End-to-end solutions' },
                { icon: Workflow, name: 'Workflow Optimization', sub: 'Process efficiency' },
                { icon: Lightbulb, name: 'Tech Education', sub: 'Simplifying complexity' },
              ].map((skill) => (
                <div key={skill.name} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] transition-colors duration-200 hover:border-accent/20">
                  <skill.icon className="w-5 h-5 text-accent mb-2" />
                  <p className="text-foreground text-sm font-medium">{skill.name}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{skill.sub}</p>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default Skills;
