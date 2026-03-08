import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  // Greetings
  'hello|hi|hey|greetings|howdy': `Hey there! 👋 I'm Rinshid's AI assistant. I can tell you about his **skills**, **experience**, **projects**, **rates**, or how to **contact** him. What would you like to know?`,

  // Skills
  'skill|expertise|what.*do|capable|tech|stack': `Rinshid's core expertise includes:\n\n• **AI & Prompt Engineering** — Advanced LLM interaction & prompt design\n• **AI Automation Systems** — End-to-end business workflow automation\n• **Python & Pandas** — Data handling, analysis & automation scripts\n• **Web Development** — HTML, CSS, Bootstrap, React\n• **Software Development** — Full-stack application building\n• **AI Education** — Teaching complex tech in simple ways\n\nHe's certified by **IIT Madras** in Advanced Prompt Engineering.`,

  // Experience
  'experience|background|work|career|history|journey': `Rinshid is a **Computer Science Engineering student** and the **Founder & Chief Growth Officer of CosmIQ**.\n\nHe leads a team focused on delivering:\n• AI solutions & consulting\n• Software development\n• Business automation\n\nHis mission is bridging the gap between cutting-edge AI technology and real-world applications.`,

  // CosmIQ
  'cosmiq|company|startup|founded|business': `**CosmIQ** is Rinshid's company where he serves as Founder & CGO.\n\nCosmIQ specializes in:\n• AI-powered solutions\n• Software development\n• Business automation\n• Digital transformation consulting\n\nThe company helps organizations thrive in the digital age through intelligent automation.`,

  // Projects
  'project|portfolio|built|created|work.*on': `Rinshid is currently building several exciting projects:\n\n🚀 **AI Automation Platform** — Streamlining business workflows with AI\n📚 **Smart Learning System** — Personalized AI-powered education\n📊 **Business Analytics Suite** — Predictive analytics & insights\n\nThese are currently in development. Stay tuned for launches!`,

  // Rates / Pricing
  'rate|price|cost|charge|budget|fee|how much|pricing|quote': `For project-specific rates and quotes, it's best to discuss directly with Rinshid.\n\nYou can reach him via:\n• 📧 **Email:** rinshidrazaq@gmail.com\n• 💬 **WhatsApp:** +91 98475 94827\n\nHe offers competitive rates for AI consulting, automation solutions, and development projects.`,

  // Contact
  'contact|reach|email|phone|whatsapp|connect|hire': `You can reach Rinshid through:\n\n• 📧 **Email:** rinshidrazaq@gmail.com\n• 💬 **WhatsApp:** +91 98475 94827\n• 🔗 **LinkedIn:** linkedin.com/in/rinshidrazaq\n• 🐙 **GitHub:** github.com/muhammedrinshidvpr-coder\n• 🎥 **YouTube:** @RinshidRazaq\n\nHe's usually available for quick responses on WhatsApp!`,

  // Education
  'education|study|college|degree|certif|learn|course': `**Education & Certifications:**\n\n🎓 **Computer Science Engineering** — Currently pursuing\n📜 **Advanced Prompt Engineering** — IIT Madras (IITM Pravartak)\n📜 **Classroom of Tomorrow: Using AI & ChatGPT** — Udemy\n\nRinshid is also an **educator** who teaches AI concepts and future-ready skills.`,

  // AI specific
  'ai|artificial intelligence|machine learning|llm|gpt|prompt': `Rinshid is deeply passionate about AI!\n\n• He's an **IIT Madras certified** Prompt Engineer\n• Builds **AI automation systems** for businesses\n• Develops **AI-powered platforms** and tools\n• **Educates** students and professionals about AI\n• Works with **LLMs, GPT models, and automation pipelines**\n\nHe's focused on making AI accessible and impactful for everyone.`,

  // Who is
  'who.*rinshid|about.*him|tell.*about|who.*you|introduce': `**Muhammed Rinshid VP** is a multifaceted tech professional:\n\n• 🚀 **Founder & CGO** of CosmIQ\n• 🧠 **AI Developer** building intelligent systems\n• 🎓 **CS Engineering Student** with a passion for innovation\n• 👨‍🏫 **Educator** empowering the next generation\n\nHis mission: Bridge the gap between cutting-edge AI and real-world applications.`,
};

const DEFAULT_RESPONSE = `Great question! While I may not have the specific answer, here's what I can help with:\n\n• **Skills & expertise**\n• **Experience & background**\n• **Projects & portfolio**\n• **Rates & pricing**\n• **How to contact Rinshid**\n\nTry asking about any of these topics! Or reach out directly at **rinshidrazaq@gmail.com** 📧`;

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [pattern, response] of Object.entries(KNOWLEDGE_BASE)) {
    const regex = new RegExp(pattern, 'i');
    if (regex.test(lower)) return response;
  }
  return DEFAULT_RESPONSE;
}

const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-4 py-3">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full bg-accent/60"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hey! 👋 I'm Rinshid's AI assistant.\n\nAsk me about his **skills**, **experience**, **projects**, **rates**, or anything else!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const response = getResponse(trimmed);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, delay);
  }, [input]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <>
      {/* Background blur overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 backdrop-blur-sm bg-background/30"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-24 right-4 md:right-8 z-50 w-[calc(100vw-2rem)] max-w-[400px] rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl"
            style={{
              background: 'hsla(222, 47%, 6%, 0.85)',
              backdropFilter: 'blur(40px) saturate(150%)',
              WebkitBackdropFilter: 'blur(40px) saturate(150%)',
              maxHeight: 'calc(100vh - 160px)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Talk to my AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-muted-foreground font-mono">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/[0.1] transition-all duration-200"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[350px] md:h-[400px] overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'assistant'
                      ? 'bg-accent/10 border border-accent/20'
                      : 'bg-white/[0.05] border border-white/[0.1]'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <Bot className="w-4 h-4 text-accent" />
                    ) : (
                      <User className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === 'assistant'
                      ? 'bg-white/[0.04] border border-white/[0.06] text-foreground/90 rounded-tl-md'
                      : 'bg-accent/15 border border-accent/20 text-foreground rounded-tr-md'
                  }`}>
                    {msg.content.split(/(\*\*.*?\*\*)/).map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
                      }
                      return <span key={i}>{part}</span>;
                    })}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-tl-md">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 focus-within:border-accent/30 transition-colors duration-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about skills, rates, projects..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent hover:bg-accent/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Send size={14} />
                </button>
              </div>
              <p className="text-[9px] text-muted-foreground/40 text-center mt-2 font-mono">AI responses are pre-programmed • For real inquiries, use Contact</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 15 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:right-8 z-50 group"
        aria-label="Open AI chat"
      >
        {/* Pulse rings */}
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-accent/20"
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute inset-0 rounded-full bg-accent/15"
        />

        <div
          className="relative w-14 h-14 rounded-full flex items-center justify-center border border-accent/30 transition-all duration-300 group-hover:border-accent/50"
          style={{
            background: 'linear-gradient(135deg, hsla(222, 47%, 10%, 0.9), hsla(192, 91%, 42%, 0.15))',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 25px hsl(192 91% 42% / 0.2), 0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-6 h-6 text-accent" />
              </motion.div>
            ) : (
              <motion.div
                key="spark"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Sparkles className="w-6 h-6 text-accent" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </>
  );
};

export default AIChatWidget;
