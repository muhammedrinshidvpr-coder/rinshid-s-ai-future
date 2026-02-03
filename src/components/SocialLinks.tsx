import { Instagram, Linkedin, Github, Youtube, MessageCircle } from 'lucide-react';

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/rinshidrazaq?igsh=MTFrOWF2cGJveDF1cw==',
    icon: Instagram,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rinshidrazaq?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    icon: Linkedin,
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/919847594827',
    icon: MessageCircle,
  },
  {
    name: 'GitHub',
    href: '#',
    icon: Github,
  },
  {
    name: 'YouTube',
    href: '#',
    icon: Youtube,
  },
];

interface SocialLinksProps {
  className?: string;
}

const SocialLinks = ({ className = '' }: SocialLinksProps) => {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-muted-foreground transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-110"
        >
          <link.icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
