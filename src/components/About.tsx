import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Rocket, GraduationCap, Lightbulb, Users, Brain, Code2, Cog, Sparkles, Bot, FileCode, Globe, Workflow } from 'lucide-react';
import BentoCard from './BentoCard';
import aboutImage from '@/assets/rinshid-about.webp';
import cosmiqLogo from '@/assets/cosmiq-logo.jpg';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-widest mb-4">About Me</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5">
            Passionate About Shaping the Future of AI
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A Computer Science Engineering student, AI developer, and entrepreneur dedicated to making artificial intelligence accessible and impactful.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-auto">

          {/* Photo card - tall, spans 1 col */}
          <BentoCard className="md:row-span-2" delay={0.1} isInView={isInView}>
            <div className="relative w-full h-full min-h-[280px] md:min-h-0 -m-6 md:-m-7">
              <img
                src={aboutImage}
                alt="Muhammed Rinshid VP"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent rounded-2xl" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3">
                  <img src={cosmiqLogo} alt="CosmIQ" className="w-10 h-10 rounded-lg object-cover border border-white/10" />
                  <div>
                    <p className="text-foreground font-semibold text-sm">Muhammed Rinshid VP</p>
                    <p className="text-accent text-xs font-medium">Founder at CosmIQ</p>
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Founder & CGO - wide */}
          <BentoCard icon={Rocket} iconLabel="Role" className="md:col-span-2" delay={0.15} isInView={isInView}>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">Founder & Chief Growth Officer</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Leading <strong className="text-foreground">CosmIQ</strong> to deliver AI solutions, software development, and business automation that helps organizations thrive in the digital age.
            </p>
          </BentoCard>

          {/* AI Developer */}
          <BentoCard icon={Brain} iconLabel="Expertise" delay={0.2} isInView={isInView}>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">AI Developer</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Building intelligent automation systems and cutting-edge AI solutions.
            </p>
          </BentoCard>

          {/* Educator */}
          <BentoCard icon={GraduationCap} iconLabel="Mission" delay={0.25} isInView={isInView}>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">Educator</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering the next generation with future-ready skills in AI and technology.
            </p>
          </BentoCard>

          {/* CS Student */}
          <BentoCard icon={Lightbulb} iconLabel="Background" delay={0.3} isInView={isInView}>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">CS Engineering</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Student with a passion for innovation and real-world problem solving.
            </p>
          </BentoCard>

          {/* Mission statement - wide */}
          <BentoCard icon={Users} iconLabel="Vision" className="md:col-span-2" delay={0.35} isInView={isInView}>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">Bridging AI & Real-World Impact</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              My mission is to bridge the gap between cutting-edge AI technology and real-world applications — helping students gain future-ready skills and enabling businesses to harness the power of intelligent automation.
            </p>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default About;
