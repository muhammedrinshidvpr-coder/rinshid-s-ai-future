import cosmiqLogo from '@/assets/cosmiq-logo.jpg';
import SocialLinks from './SocialLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="#home" className="flex items-center gap-3">
              <img
                src={cosmiqLogo}
                alt="CosmIQ Logo"
                className="h-10 w-10 rounded-lg object-cover"
              />
              <span className="font-display font-semibold text-lg text-foreground">
                Rinshid VP
              </span>
            </a>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Muhammed Rinshid VP. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <SocialLinks />
        </div>

        {/* Bottom Text */}
        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground">
            Building the future with AI & Automation • Founder at{' '}
            <span className="text-accent font-medium">CosmIQ</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
