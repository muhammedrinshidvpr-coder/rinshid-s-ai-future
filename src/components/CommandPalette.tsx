import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FolderOpen, Brain, Github, Mail, Sun, Command } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  action: () => void;
  keywords: string[];
}

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { toast } = useToast();

  const actions: QuickAction[] = useMemo(() => [
    {
      id: 'projects',
      label: 'Navigate to Projects',
      icon: FolderOpen,
      keywords: ['projects', 'work', 'portfolio', 'navigate'],
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
    },
    {
      id: 'ai-agent',
      label: 'View AI Agent Deep-Dive',
      icon: Brain,
      keywords: ['ai', 'agent', 'deep', 'dive', 'sales'],
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
    },
    {
      id: 'github',
      label: 'Open GitHub Profile',
      icon: Github,
      keywords: ['github', 'git', 'code', 'profile', 'repo'],
      action: () => {
        window.open('https://github.com/rinshid', '_blank');
        setIsOpen(false);
      },
    },
    {
      id: 'email',
      label: 'Copy Email Address',
      icon: Mail,
      keywords: ['email', 'mail', 'contact', 'copy'],
      action: () => {
        navigator.clipboard.writeText('rinshid@example.com');
        toast({ title: 'Email copied to clipboard!' });
        setIsOpen(false);
      },
    },
    {
      id: 'toggle-grid',
      label: 'Toggle Dark/Light Grid',
      icon: Sun,
      keywords: ['toggle', 'dark', 'light', 'grid', 'theme'],
      action: () => {
        document.documentElement.classList.toggle('light');
        setIsOpen(false);
      },
    },
  ], [toast]);

  const filtered = useMemo(() => {
    if (!query) return actions;
    const q = query.toLowerCase();
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.keywords.some((k) => k.includes(q))
    );
  }, [query, actions]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery('');
      }
      if (e.key === 'Escape') setIsOpen(false);
    },
    []
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().includes('MAC');

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.4 }}
        onClick={() => { setIsOpen(true); setQuery(''); }}
        className="fixed top-5 right-5 z-50 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-muted-foreground border border-border/40 backdrop-blur-xl bg-card/30 hover:bg-card/50 hover:text-foreground transition-all duration-200 shadow-lg shadow-black/20"
      >
        <Search size={14} />
        <span className="opacity-70">Search / Commands</span>
        <kbd className="ml-1 px-1.5 py-0.5 rounded-md bg-muted/40 border border-border/30 text-[10px] font-mono">
          {isMac ? '⌘' : 'Ctrl+'}K
        </kbd>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/60 backdrop-blur-md" />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg mx-4 rounded-2xl border border-border/40 bg-card/80 backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border/30">
                <Search size={18} className="text-muted-foreground shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none caret-accent"
                />
                <kbd className="px-1.5 py-0.5 rounded-md bg-muted/30 border border-border/20 text-[10px] text-muted-foreground font-mono">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="py-2 max-h-[300px] overflow-y-auto">
                {filtered.length === 0 ? (
                  <p className="px-5 py-8 text-center text-sm text-muted-foreground/60">
                    No results found.
                  </p>
                ) : (
                  <div className="px-2">
                    <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                      Quick Actions
                    </p>
                    {filtered.map((action) => (
                      <button
                        key={action.id}
                        onClick={action.action}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground/80 hover:bg-accent/10 hover:text-foreground transition-colors duration-150 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <action.icon size={15} className="text-accent" />
                        </div>
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
