import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Clock, Tag, Cpu, Brain, Workflow, GraduationCap, Server, Zap } from 'lucide-react';

const articles = [
  {
    title: 'Orchestrating Autonomous Agents with n8n',
    excerpt: 'A deep dive into building self-healing, multi-agent pipelines that coordinate across APIs, databases, and LLMs without human intervention.',
    tag: 'System Architecture',
    readTime: '5 min read',
    icon: Workflow,
    accent: 'hsl(192, 91%, 42%)',
    size: 'tall',
  },
  {
    title: 'The Future of AI in Education',
    excerpt: 'How adaptive learning models and real-time feedback loops are reshaping classrooms and making personalized education scalable.',
    tag: 'AI Research',
    readTime: '7 min read',
    icon: GraduationCap,
    accent: 'hsl(172, 66%, 50%)',
    size: 'normal',
  },
  {
    title: 'Building Resilient Microservices with Edge Functions',
    excerpt: 'Patterns for deploying serverless functions that self-recover, auto-scale, and maintain sub-100ms latency globally.',
    tag: 'Infrastructure',
    readTime: '4 min read',
    icon: Server,
    accent: 'hsl(199, 89%, 48%)',
    size: 'normal',
  },
  {
    title: 'RAG Pipelines: From Prototype to Production',
    excerpt: 'Lessons from deploying retrieval-augmented generation at scale — chunking strategies, embedding models, and vector store optimization.',
    tag: 'Machine Learning',
    readTime: '8 min read',
    icon: Brain,
    accent: 'hsl(192, 91%, 42%)',
    size: 'tall',
  },
  {
    title: 'Real-Time Data Streams with WebSockets',
    excerpt: 'Architecting bidirectional communication for live dashboards, collaborative tools, and IoT sensor networks.',
    tag: 'System Design',
    readTime: '6 min read',
    icon: Zap,
    accent: 'hsl(172, 66%, 50%)',
    size: 'normal',
  },
  {
    title: 'Prompt Engineering as Software Design',
    excerpt: 'Treating prompts as composable, testable modules — version control, A/B testing, and chain-of-thought patterns for production AI.',
    tag: 'AI Engineering',
    readTime: '5 min read',
    icon: Cpu,
    accent: 'hsl(199, 89%, 48%)',
    size: 'normal',
  },
];

const GlitchText = ({ text, isHovered }: { text: string; isHovered: boolean }) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
  const [display, setDisplay] = useState(text);

  const startGlitch = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (i < iteration) return text[i];
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      iteration += 1.5;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, 25);
  };

  return (
    <span
      onMouseEnter={startGlitch}
      className="font-display font-semibold"
    >
      {isHovered ? display : text}
    </span>
  );
};

const InsightCard = ({ article, index }: { article: typeof articles[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = article.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl border border-white/[0.06] overflow-hidden cursor-pointer ${
        article.size === 'tall' ? 'row-span-2' : ''
      }`}
      style={{
        background: 'hsla(222, 47%, 7%, 0.7)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Glow border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? `inset 0 0 0 1px ${article.accent}44, 0 0 30px -10px ${article.accent}33`
            : 'inset 0 0 0 1px transparent, 0 0 0px 0px transparent',
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${article.accent}15`, border: `1px solid ${article.accent}25` }}
          >
            <Icon size={18} style={{ color: article.accent }} />
          </div>
          <motion.div
            animate={{ x: isHovered ? 0 : 8, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ArrowRight size={18} style={{ color: article.accent }} />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-base md:text-lg text-foreground mb-2 leading-snug">
          <GlitchText text={article.title} isHovered={isHovered} />
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground/60">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {article.readTime}
          </span>
          <span
            className="flex items-center gap-1 px-2 py-0.5 rounded-full"
            style={{ background: `${article.accent}12`, color: article.accent, border: `1px solid ${article.accent}20` }}
          >
            <Tag size={9} />
            {article.tag}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const TechnicalInsights = () => {
  return (
    <section className="section-padding relative z-10 overflow-hidden" id="insights">
      {/* Faint topo / wireframe mesh background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topoGrid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="30" fill="none" stroke="hsl(192, 91%, 42%)" strokeWidth="0.5" />
              <circle cx="40" cy="40" r="20" fill="none" stroke="hsl(192, 91%, 42%)" strokeWidth="0.3" />
              <circle cx="40" cy="40" r="10" fill="none" stroke="hsl(192, 91%, 42%)" strokeWidth="0.2" />
              <line x1="0" y1="40" x2="80" y2="40" stroke="hsl(192, 91%, 42%)" strokeWidth="0.15" />
              <line x1="40" y1="0" x2="40" y2="80" stroke="hsl(192, 91%, 42%)" strokeWidth="0.15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topoGrid)" />
        </svg>
      </div>

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3 font-mono">
            Digital Garden
          </p>
          <h2 className="text-2xl md:text-4xl font-display font-bold mb-3">
            <span className="gradient-text">Technical Insights & Architecture</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Deep dives into systems, architectures, and the future of intelligent software.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {articles.map((article, i) => (
            <InsightCard key={i} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalInsights;
