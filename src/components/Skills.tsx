import { useRef, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Sparkles, Bot, GraduationCap, Code2, FileCode, Globe, Cog, Workflow, Lightbulb } from 'lucide-react';
import Terminal from './Terminal';

const skillSnippets: Record<string, { code: string; title: string; language: string }> = {
  'AI & Prompt Engineering': {
    title: 'prompt_engine.py',
    language: 'python',
    code: `from cosmiq import PromptEngine

engine = PromptEngine(model="gpt-4o")
engine.set_system(
  "You are an expert AI assistant."
)

response = engine.generate(
  prompt="Analyze market trends",
  temperature=0.7,
  max_tokens=2048
)
print(response.insights)`,
  },
  'AI Automation Systems': {
    title: 'automation.py',
    language: 'python',
    code: `from cosmiq.auto import Pipeline

pipeline = Pipeline("business_flow")
pipeline.add_step("ingest", source="api")
pipeline.add_step("transform", fn=clean)
pipeline.add_step("analyze", model="v2")
pipeline.add_step("notify", channel="slack")

# Deploy & monitor
pipeline.deploy(schedule="*/30 * * * *")
print(f"Status: {pipeline.health()}")`,
  },
  'AI Education': {
    title: 'learn.py',
    language: 'python',
    code: `from cosmiq.edu import CourseBuilder

course = CourseBuilder("AI Fundamentals")
course.add_module("Neural Networks 101")
course.add_module("Prompt Engineering")
course.add_module("Building AI Agents")

course.set_assessment(type="project")
course.publish(platform="cosmiq_learn")
print("🎓 Course live!")`,
  },
  'Python': {
    title: 'data_pipeline.py',
    language: 'python',
    code: `import pandas as pd
from cosmiq.ml import predict

df = pd.read_csv("sales_2024.csv")
df["trend"] = df["revenue"].pct_change()
df["forecast"] = predict(
  df[["trend", "volume"]],
  model="xgboost_v3"
)

top = df.nlargest(5, "forecast")
print(top[["product", "forecast"]])`,
  },
  'Web Development': {
    title: 'app.tsx',
    language: 'tsx',
    code: `import { motion } from "framer-motion"

export const Hero = () => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="min-h-screen flex 
      items-center justify-center"
  >
    <h1 className="text-6xl font-bold
      gradient-text">
      Building the Future
    </h1>
  </motion.section>
)`,
  },
  'Software Dev': {
    title: 'server.ts',
    language: 'typescript',
    code: `import { serve } from "cosmiq/edge"
import { ai } from "cosmiq/ai"

serve.post("/api/analyze", async (req) => {
  const { data } = await req.json()
  
  const result = await ai.analyze({
    input: data,
    model: "cosmiq-v2",
    format: "structured"
  })

  return Response.json({
    status: "ok",
    insights: result
  })
})`,
  },
  'Business Automation': {
    title: 'workflow.py',
    language: 'python',
    code: `from cosmiq.biz import Workflow

wf = Workflow("client_onboarding")
wf.trigger(on="new_signup")
wf.step("verify_email", auto=True)
wf.step("create_workspace")
wf.step("assign_onboarding_agent")
wf.step("schedule_demo_call",
  delay="24h")

wf.activate()
print("✅ Workflow deployed")`,
  },
  'Workflow Optimization': {
    title: 'optimize.py',
    language: 'python',
    code: `from cosmiq.ops import Optimizer

opt = Optimizer("delivery_pipeline")
bottlenecks = opt.analyze()

for issue in bottlenecks:
  fix = opt.suggest_fix(issue)
  opt.apply(fix, test=True)
  print(f"Fixed: {issue.name}")

gain = opt.measure_improvement()
print(f"⚡ {gain}% faster")`,
  },
  'Tech Education': {
    title: 'teach.py',
    language: 'python',
    code: `from cosmiq.edu import Workshop

ws = Workshop("AI for Beginners")
ws.set_format("hands_on")
ws.add_demo("chatbot_from_scratch")
ws.add_demo("auto_email_responder")

ws.set_audience("students")
ws.schedule("2026-03-15", seats=50)
ws.publish()
print("📚 Workshop scheduled!")`,
  },
};

const allSkills = [
  { name: 'AI & Prompt Engineering', icon: Sparkles, ring: 1 },
  { name: 'AI Automation Systems', icon: Bot, ring: 1 },
  { name: 'AI Education', icon: GraduationCap, ring: 1 },
  { name: 'Python', icon: FileCode, ring: 2 },
  { name: 'Web Development', icon: Globe, ring: 2 },
  { name: 'Software Dev', icon: Code2, ring: 2 },
  { name: 'Business Automation', icon: Cog, ring: 3 },
  { name: 'Workflow Optimization', icon: Workflow, ring: 3 },
  { name: 'Tech Education', icon: Lightbulb, ring: 3 },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeSkill, setActiveSkill] = useState<string>('AI & Prompt Engineering');

  const snippet = useMemo(() => skillSnippets[activeSkill], [activeSkill]);

  // Orbit radii: md uses full, mobile not shown (grid instead)
  const orbitRadii = [90, 155, 215];
  const ringCounts = { 1: 3, 2: 3, 3: 3 };

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
          <p className="text-muted-foreground text-lg leading-relaxed">Tap a skill to see it come alive in the terminal.</p>
        </motion.div>

        {/* Mobile: Grid layout */}
        <div className="md:hidden space-y-6 mb-8">
          <div className="grid grid-cols-3 gap-3">
            {allSkills.map((skill, i) => {
              const isActive = activeSkill === skill.name;
              const Icon = skill.icon;
              return (
                <motion.button
                  key={skill.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  onClick={() => setActiveSkill(skill.name)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'border-accent/40 bg-accent/10'
                      : 'border-white/[0.08] bg-white/[0.03]'
                  }`}
                  style={{ backdropFilter: 'blur(12px)' }}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-muted-foreground'} transition-colors`} />
                  <span className={`text-[10px] font-medium text-center leading-tight ${isActive ? 'text-accent' : 'text-muted-foreground'} transition-colors`}>
                    {skill.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
          <Terminal code={snippet.code} title={snippet.title} language={snippet.language} />
        </div>

        {/* Desktop: Orbit + Terminal */}
        <div className="hidden md:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Orbit visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-[460px] h-[460px]">
              {/* Orbit rings */}
              {orbitRadii.map((r) => (
                <div
                  key={r}
                  className="absolute rounded-full border border-white/[0.04]"
                  style={{
                    width: r * 2,
                    height: r * 2,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}

              {/* Center brain icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center"
                  style={{ boxShadow: '0 0 30px hsl(192 91% 42% / 0.2)' }}
                >
                  <Brain className="w-10 h-10 text-accent" />
                </motion.div>
              </div>

              {/* Skill nodes */}
              {(() => {
                const indices = { 1: 0, 2: 0, 3: 0 };
                return allSkills.map((skill, i) => {
                  const ring = skill.ring as 1 | 2 | 3;
                  const ringIdx = indices[ring]++;
                  const total = ringCounts[ring];
                  const angle = (ringIdx / total) * 360;
                  const radius = orbitRadii[ring - 1];
                  const isActive = activeSkill === skill.name;
                  const Icon = skill.icon;

                  const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                  const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

                  return (
                    <motion.button
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.5, type: 'spring', stiffness: 200 }}
                      onClick={() => setActiveSkill(skill.name)}
                      onMouseEnter={() => setActiveSkill(skill.name)}
                      className="absolute z-20 group"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                      }}
                    >
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        {/* Glow */}
                        <div
                          className="absolute -inset-1 rounded-xl transition-opacity duration-300"
                          style={{
                            opacity: isActive ? 1 : 0,
                            background: 'linear-gradient(135deg, hsl(192 91% 42% / 0.4), hsl(172 66% 50% / 0.4))',
                            filter: 'blur(6px)',
                          }}
                        />
                        <div
                          className={`relative flex flex-col items-center gap-1 px-4 py-3 rounded-xl border transition-all duration-300 ${
                            isActive
                              ? 'border-accent/40 bg-accent/10'
                              : 'border-white/[0.08] bg-white/[0.03] hover:border-accent/20 hover:bg-accent/5'
                          }`}
                          style={{
                            backdropFilter: 'blur(12px)',
                            boxShadow: isActive ? '0 0 20px hsl(192 91% 42% / 0.15)' : 'none',
                          }}
                        >
                          <motion.div
                            animate={isActive ? { rotateY: 360 } : { rotateY: 0 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-muted-foreground'} transition-colors`} />
                          </motion.div>
                          <span className={`text-xs font-medium whitespace-nowrap ${isActive ? 'text-accent' : 'text-muted-foreground'} transition-colors`}>
                            {skill.name}
                          </span>
                        </div>
                      </motion.div>
                    </motion.button>
                  );
                });
              })()}
            </div>
          </motion.div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Terminal code={snippet.code} title={snippet.title} language={snippet.language} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
