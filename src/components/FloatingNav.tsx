import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Zap, Award, FolderOpen, Mail, Menu, X } from 'lucide-react';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'skills', icon: Zap, label: 'Skills' },
  { id: 'certifications', icon: Award, label: 'Certs' },
  { id: 'projects', icon: FolderOpen, label: 'Projects' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback((id: string) => {
    setIsExpanded(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop: Floating side dock */}
      <motion.nav
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2 glass-nav rounded-2xl p-2"
      >
        {navItems.map(({ id, icon: Icon, label }) => {
          const isActive = activeSection === id;
          return (
            <motion.button
              key={id}
              onClick={() => handleClick(id)}
              className={`relative group flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-accent/20 text-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 rounded-xl bg-accent/15 border border-accent/30"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon size={18} className="relative z-10" />
              {/* Tooltip */}
              <div className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {label}
              </div>
            </motion.button>
          );
        })}
      </motion.nav>

      {/* Mobile: Bottom floating bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="mx-4 mb-2 glass-nav rounded-2xl p-3"
            >
              <div className="grid grid-cols-3 gap-2">
                {navItems.map(({ id, icon: Icon, label }) => {
                  const isActive = activeSection === id;
                  return (
                    <button
                      key={id}
                      onClick={() => handleClick(id)}
                      className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-accent/20 text-accent'
                          : 'text-muted-foreground active:bg-secondary/50'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-[10px] font-medium">{label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center pb-6 pt-2"
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="glass-nav w-14 h-14 rounded-full flex items-center justify-center text-foreground shadow-lg shadow-black/30 active:scale-95 transition-transform"
            aria-label="Toggle navigation"
          >
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default FloatingNav;
