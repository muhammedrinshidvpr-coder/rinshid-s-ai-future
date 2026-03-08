import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'green';
  text: string;
}

const COMMANDS: Record<string, () => TerminalLine[]> = {
  help: () => [
    { type: 'output', text: 'Available commands:' },
    { type: 'green', text: '  whoami     - Learn about Rinshid' },
    { type: 'green', text: '  skills     - View technical skills' },
    { type: 'green', text: '  projects   - List featured projects' },
    { type: 'green', text: '  clear      - Clear the terminal' },
  ],
  whoami: () => [
    { type: 'output', text: '╔══════════════════════════════════════════════╗' },
    { type: 'green', text: '║  Muhammed Rinshid VP                         ║' },
    { type: 'output', text: '║  AI Builder · Educator · Automation Expert   ║' },
    { type: 'output', text: '║                                              ║' },
    { type: 'output', text: '║  Mission: Building intelligent systems that  ║' },
    { type: 'output', text: '║  empower humans and automate the impossible. ║' },
    { type: 'output', text: '║  Founder @ CosmIQ Studios.                   ║' },
    { type: 'output', text: '╚══════════════════════════════════════════════╝' },
  ],
  skills: () => [
    { type: 'output', text: 'Technical Proficiencies:' },
    { type: 'green', text: '  ► AI/ML      — LangChain, CrewAI, HuggingFace' },
    { type: 'green', text: '  ► Frontend   — React, TypeScript, Tailwind' },
    { type: 'green', text: '  ► Backend    — Python, Node.js, Supabase' },
    { type: 'green', text: '  ► DevOps     — Vercel, Docker, Git' },
    { type: 'green', text: '  ► Automation — n8n, Make, Zapier' },
  ],
  projects: () => [
    { type: 'output', text: 'Featured Projects:' },
    { type: 'green', text: '  [01]  CosmIQ Studios    — AI Solutions Agency' },
    { type: 'green', text: '  [02]  ResilienceNet     — AI Disaster Response' },
    { type: 'green', text: '  [03]  CampusTrade       — TKM E-commerce Platform' },
  ],
};

const InteractiveTerminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'green', text: "admin@rinshid-portfolio:~$ type 'help' to see available commands" },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const inputLine: TerminalLine = { type: 'input', text: `admin@rinshid-portfolio:~$ ${cmd}` };

    if (trimmed === 'clear') {
      setLines([]);
      return;
    }

    const handler = COMMANDS[trimmed];
    if (handler) {
      setLines(prev => [...prev, inputLine, ...handler()]);
    } else {
      setLines(prev => [...prev, inputLine, { type: 'error', text: `bash: ${trimmed}: command not found. Type 'help' for available commands.` }]);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <section className="section-padding relative z-10" id="terminal">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-3">
            <span className="gradient-text">Developer Terminal</span>
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-10">
            Explore my portfolio through the command line.
          </p>

          <div
            className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl"
            style={{ background: 'hsla(222, 47%, 5%, 0.85)', backdropFilter: 'blur(24px)' }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Mac title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: 'hsl(0, 70%, 55%)' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: 'hsl(45, 80%, 55%)' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: 'hsl(120, 55%, 45%)' }} />
              </div>
              <span className="flex-1 text-center text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
                rinshid@cosmiq — bash
              </span>
            </div>

            {/* Terminal body */}
            <div
              className="p-4 md:p-5 min-h-[260px] max-h-[400px] overflow-y-auto"
              style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
            >
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`text-sm leading-relaxed whitespace-pre-wrap ${
                    line.type === 'input' ? 'text-muted-foreground' :
                    line.type === 'error' ? 'text-destructive' :
                    line.type === 'green' ? 'text-accent' :
                    'text-foreground/80'
                  }`}
                >
                  {line.text}
                </div>
              ))}

              {/* Input line */}
              <div className="flex items-center text-sm mt-1">
                <span className="text-accent">admin@rinshid-portfolio:~$&nbsp;</span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="w-full bg-transparent outline-none text-foreground/90 caret-transparent"
                    style={{ fontFamily: 'inherit' }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {/* Blinking cursor */}
                  <motion.span
                    className="absolute top-0 text-accent pointer-events-none"
                    style={{ left: `${input.length}ch` }}
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    ▊
                  </motion.span>
                </div>
              </div>
              <div ref={bottomRef} />
            </div>

            {/* Status bar */}
            <div className="px-4 py-2 border-t border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  session active
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground/50" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                bash 5.2.0
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveTerminal;
