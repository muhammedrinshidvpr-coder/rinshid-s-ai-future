import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Sparkles, Bot, GraduationCap, Code2, FileCode, Globe, Cog, Workflow, Lightbulb } from 'lucide-react';

const skillCategories = [
  {
    title: 'Core Expertise',
    icon: Brain,
    color: 'from-accent/20 to-cyan-400/20',
    borderColor: 'border-accent/30',
    skills: [
      { name: 'AI & Prompt Engineering', icon: Sparkles },
      { name: 'AI Automation Systems', icon: Bot },
      { name: 'AI Education & Training', icon: GraduationCap },
    ],
  },
  {
    title: 'Technical Skills',
    icon: Code2,
    color: 'from-violet-500/20 to-purple-400/20',
    borderColor: 'border-violet-500/30',
    skills: [
      { name: 'Python (Pandas for data handling and automation)', icon: FileCode },
      { name: 'HTML, CSS, Bootstrap (responsive web development)', icon: Globe },
      { name: 'Software & Web Development', icon: Code2 },
    ],
  },
  {
    title: 'Applied Capabilities',
    icon: Cog,
    color: 'from-emerald-500/20 to-teal-400/20',
    borderColor: 'border-emerald-500/30',
    skills: [
      { name: 'Business Automation Solutions', icon: Cog },
      { name: 'Workflow Optimization', icon: Workflow },
      { name: 'Teaching complex technology in a simple way', icon: Lightbulb },
    ],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
            What I Do
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Skills I use to build AI solutions and educate future-ready learners.
          </p>
        </motion.div>

        {/* Skills Categories Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * categoryIndex, duration: 0.5 }}
              className="group"
            >
              <div className={`h-full p-6 md:p-8 rounded-2xl bg-card border ${category.borderColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    <category.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.15 * categoryIndex + 0.1 * skillIndex, duration: 0.4 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors duration-200"
                    >
                      <skill.icon className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/90 text-sm leading-relaxed">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
