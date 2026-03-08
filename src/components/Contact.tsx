import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { Mail, MessageCircle, ArrowUpRight, Copy, Check } from 'lucide-react';
import SocialLinks from './SocialLinks';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText('rinshidrazaq@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = 'rinshidrazaq@gmail.com';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      {/* Top fade-in from content */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-transparent pointer-events-none" />

      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-widest mb-4">Get In Touch</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Let's Build Something Amazing Together</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Whether you're looking to implement AI solutions, automate your business, or just want to connect — I'd love to hear from you.</p>
          </motion.div>

          {/* Command Modules */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {/* Email Module */}
            <a
              href="mailto:rinshidrazaq@gmail.com"
              className="group relative rounded-2xl overflow-hidden border border-white/[0.08] transition-all duration-500 hover:border-accent/40"
              style={{
                background: 'hsla(222, 47%, 8%, 0.7)',
                backdropFilter: 'blur(30px)',
              }}
            >
              {/* Hover bg shift */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Scan line */}
              <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div
                  className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent"
                  animate={{ top: ['0%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              <div className="relative p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center transition-all duration-500 group-hover:bg-accent/20 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_hsl(192_91%_42%/0.2)]">
                    <Mail className="w-7 h-7 text-accent" />
                  </div>
                  <motion.div
                    className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-accent/30 transition-all duration-300"
                  >
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.div>
                </div>

                <h3 className="font-display font-semibold text-xl text-foreground mb-1">Email Me</h3>
                <p className="text-muted-foreground text-sm mb-4">Drop me a message for inquiries and collaborations</p>

                {/* Email address with copy */}
                <div className="flex items-center gap-2">
                  <code className="text-accent text-sm font-mono">rinshidrazaq@gmail.com</code>
                  <button
                    onClick={handleCopy}
                    className="relative w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center hover:bg-accent/10 hover:border-accent/30 transition-all duration-200"
                    aria-label="Copy email"
                  >
                    <motion.div
                      key={copied ? 'check' : 'copy'}
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </motion.div>
                  </button>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-green-400 font-medium"
                    >
                      Copied!
                    </motion.span>
                  )}
                </div>
              </div>

              {/* Bottom status bar */}
              <div className="px-6 md:px-8 py-3 border-t border-white/[0.04] flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-muted-foreground/60 font-mono uppercase tracking-wider">Available for collaboration</span>
              </div>
            </a>

            {/* WhatsApp Module */}
            <a
              href="https://wa.me/919847594827"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden border border-white/[0.08] transition-all duration-500 hover:border-accent/40"
              style={{
                background: 'hsla(222, 47%, 8%, 0.7)',
                backdropFilter: 'blur(30px)',
              }}
            >
              {/* Hover bg shift */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Scan line */}
              <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div
                  className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent"
                  animate={{ top: ['0%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
                />
              </div>

              <div className="relative p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center transition-all duration-500 group-hover:bg-accent/20 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_hsl(192_91%_42%/0.2)]">
                    <MessageCircle className="w-7 h-7 text-accent" />
                  </div>
                  <motion.div
                    className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-accent/30 transition-all duration-300"
                  >
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.div>
                </div>

                <h3 className="font-display font-semibold text-xl text-foreground mb-1">WhatsApp</h3>
                <p className="text-muted-foreground text-sm mb-4">Quick chat for instant responses</p>

                <div className="flex items-center gap-2">
                  <code className="text-accent text-sm font-mono">+91 98475 94827</code>
                </div>
              </div>

              {/* Bottom status bar */}
              <div className="px-6 md:px-8 py-3 border-t border-white/[0.04] flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-muted-foreground/60 font-mono uppercase tracking-wider">Online · Instant reply</span>
              </div>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center"
          >
            <p className="text-muted-foreground text-sm mb-5">Or connect with me on social media</p>
            <SocialLinks />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into footer */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </section>
  );
};

export default Contact;
