import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ShieldCheck, Globe, Server, Rocket, Store, Users, Package } from 'lucide-react';
import campusTradeHero from '@/assets/campustrade-hero.png';

interface CampusTradeModalProps {
  onClose: () => void;
}

const LIVE_URL = 'https://campustrade-cosmiq.vercel.app/';

const techBadges = [
  { label: 'Full-Stack E-commerce', icon: Store },
  { label: 'TKM Certified', icon: ShieldCheck },
  { label: 'Vercel Deployment', icon: Rocket },
  { label: 'Student Marketplace', icon: Users },
  { label: 'Secure Transactions', icon: Package },
];

const architectureLayers = [
  {
    title: 'Frontend Layer',
    items: ['React SPA', 'Responsive UI', 'Real-time Search'],
  },
  {
    title: 'Application Logic',
    items: ['Auth Service', 'Listing Engine', 'Brand Manager'],
  },
  {
    title: 'Data & Infra',
    items: ['Database', 'CDN / Assets', 'Vercel Edge'],
  },
];

const CampusTradeModal = ({ onClose }: CampusTradeModalProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
    onClick={onClose}
  >
    <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

    <motion.div
      initial={{ scale: 0.9, y: 30, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.95, y: 20, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/[0.08]"
      style={{
        background: 'hsla(222, 47%, 6%, 0.95)',
        backdropFilter: 'blur(40px)',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/[0.1] transition-all duration-200"
      >
        <X size={18} />
      </button>

      {/* Dual panel */}
      <div className="grid md:grid-cols-2 gap-0">
        {/* Left — Architecture */}
        <div className="p-6 md:p-10 border-b md:border-b-0 md:border-r border-white/[0.06]">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center"
              style={{ boxShadow: '0 0 20px hsl(192 91% 42% / 0.15)' }}
            >
              <Server className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">System Architecture</h3>
              <span className="text-xs text-accent font-medium">Conceptual Overview</span>
            </div>
          </div>

          <div className="space-y-4">
            {architectureLayers.map((layer, li) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + li * 0.12 }}
                className="rounded-2xl border border-white/[0.06] p-4 bg-white/[0.02]"
              >
                <div className="text-[10px] text-accent/60 font-mono uppercase tracking-wider mb-3">
                  {layer.title}
                </div>
                <div className="space-y-2">
                  {layer.items.map((item) => (
                    <div
                      key={item}
                      className="px-3 py-2 rounded-lg bg-accent/[0.06] border border-accent/15 text-xs text-foreground/80 font-mono"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connection pulses */}
          <div className="flex justify-center gap-4 my-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                className="w-0.5 h-6 bg-accent/30 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Right — Hero + CTA */}
        <div className="p-6 md:p-10 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center"
              style={{ boxShadow: '0 0 20px hsl(192 91% 42% / 0.15)' }}
            >
              <Globe className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">CampusTrade</h3>
              <span className="text-xs text-accent font-medium">TKM E-commerce Platform</span>
            </div>
          </div>

          {/* Laptop render */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl overflow-hidden border border-white/[0.08] mb-6"
            style={{ boxShadow: '0 8px 40px hsl(192 91% 42% / 0.08)' }}
          >
            <img
              src={campusTradeHero}
              alt="CampusTrade TKM Marketplace"
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Verified seal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center gap-2 mb-6 px-4 py-2.5 rounded-xl bg-accent/[0.06] border border-accent/20 w-fit"
          >
            <ShieldCheck className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold text-accent">Verified TKM Project</span>
          </motion.div>

          {/* CTA button */}
          <motion.a
            href={LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="relative group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-accent-foreground overflow-hidden mb-6 w-fit"
          >
            {/* Glow pulse */}
            <motion.div
              className="absolute -inset-0.5 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 15px hsl(192 91% 42% / 0.3)',
                  '0 0 30px hsl(192 91% 42% / 0.5)',
                  '0 0 15px hsl(192 91% 42% / 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="absolute inset-0 bg-accent rounded-full" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
              style={{
                background:
                  'linear-gradient(105deg, transparent 30%, hsla(0,0%,100%,0.2) 45%, hsla(0,0%,100%,0.35) 50%, hsla(0,0%,100%,0.2) 55%, transparent 70%)',
              }}
            />
            <Rocket className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Launch Live TKM Marketplace</span>
            <ArrowRight className="w-5 h-5 relative z-10" />
          </motion.a>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            A specialized platform enabling TKM students to safely buy and sell campus gear, electronics,
            and support student brands, built specifically for the Kollam college community.
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2">
            {techBadges.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.06, type: 'spring', stiffness: 200 }}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-accent/30 hover:bg-accent/[0.05] transition-colors duration-200"
                >
                  <Icon className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs font-medium text-foreground/80">{badge.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default CampusTradeModal;
