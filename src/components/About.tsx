import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, GraduationCap, Lightbulb, Users } from 'lucide-react';
import aboutImage from '@/assets/rinshid-about.webp';
import cosmiqLogo from '@/assets/cosmiq-logo.jpg';

const highlights = [
  {
    icon: Rocket,
    title: 'Founder & CGO',
    description: 'Leading CosmIQ to revolutionize AI solutions',
  },
  {
    icon: GraduationCap,
    title: 'CS Engineering',
    description: 'Student with a passion for innovation',
  },
  {
    icon: Lightbulb,
    title: 'AI Developer',
    description: 'Building intelligent automation systems',
  },
  {
    icon: Users,
    title: 'Educator',
    description: 'Empowering the next generation',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <motion.div
              className="relative w-full max-w-md mx-auto"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Background Decoration */}
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-primary/5 rounded-3xl transition-opacity duration-500" />
              
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg transition-shadow duration-500 hover:shadow-2xl">
                <img
                  src={aboutImage}
                  alt="Muhammed Rinshid VP"
                  className="w-full h-auto aspect-square object-cover"
                />
              </div>

              {/* CosmIQ Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl shadow-lg flex items-center gap-3"
              >
                <img
                  src={cosmiqLogo}
                  alt="CosmIQ"
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <p className="text-xs text-muted-foreground">Founder at</p>
                  <p className="text-base font-semibold text-foreground">CosmIQ</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
              About Me
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Passionate About Shaping the Future of AI
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                I'm <strong className="text-foreground">Muhammed Rinshid VP</strong>, a Computer Science Engineering student, AI developer, and entrepreneur dedicated to making artificial intelligence accessible and impactful.
              </p>
              <p>
                As the Founder and Chief Growth Officer of <strong className="text-foreground">CosmIQ</strong>, I lead a team focused on delivering AI solutions, software development, and business automation that helps organizations thrive in the digital age.
              </p>
              <p>
                My mission is to bridge the gap between cutting-edge AI technology and real-world applications, helping students gain future-ready skills and enabling businesses to harness the power of intelligent automation.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
