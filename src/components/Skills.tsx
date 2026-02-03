import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Code, BarChart3, Zap, Cloud, Users } from 'lucide-react';

const skills = [
  {
    icon: Brain,
    title: 'Artificial Intelligence',
    description: 'Machine Learning, Deep Learning, Natural Language Processing, and Computer Vision solutions.',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: Code,
    title: 'Software Development',
    description: 'Full-stack development with modern frameworks and scalable architecture design.',
    color: 'from-violet-500/20 to-purple-500/20',
  },
  {
    icon: Zap,
    title: 'Business Automation',
    description: 'Workflow optimization, process automation, and intelligent system integration.',
    color: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Data-driven insights, predictive modeling, and visualization dashboards.',
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Cloud infrastructure, deployment pipelines, and scalable solutions.',
    color: 'from-sky-500/20 to-blue-500/20',
  },
  {
    icon: Users,
    title: 'AI Education',
    description: 'Training programs, workshops, and mentorship for future-ready skills.',
    color: 'from-rose-500/20 to-pink-500/20',
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
            What I Do
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-lg">
            Combining technical excellence with business acumen to deliver impactful AI solutions.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:shadow-lg hover:border-accent/30 hover:-translate-y-1">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <skill.icon className="w-7 h-7 text-foreground" />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {skill.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
