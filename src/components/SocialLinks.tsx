import { Instagram, Linkedin, Github, Youtube, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/rinshidrazaq?igsh=MTFrOWF2cGJveDF1cw==', icon: Instagram },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/rinshidrazaq?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', icon: Linkedin },
  { name: 'WhatsApp', href: 'https://wa.me/919847594827', icon: MessageCircle },
  { name: 'GitHub', href: 'https://github.com/muhammedrinshidvpr-coder', icon: Github },
  { name: 'YouTube', href: 'https://www.youtube.com/@RinshidRazaq', icon: Youtube },
];

interface SocialLinksProps {
  className?: string;
}

const SocialLinks = ({ className = '' }: SocialLinksProps) => {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      {socialLinks.map((link, i) => (
        <motion.a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          whileHover={{ scale: 1.2, y: -3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="relative w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-colors duration-300 group"
        >
          {/* Glow ring on hover */}
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ boxShadow: '0 0 20px hsl(192 91% 42% / 0.25), 0 0 40px hsl(192 91% 42% / 0.1)' }}
          />
          <link.icon className="w-5 h-5 relative z-10" />
        </motion.a>
      ))}
    </div>
  );
};

export default SocialLinks;
