const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-12 border-t border-white/[0.04]">
      <div className="container-custom text-center space-y-3">
        <h3 className="font-display font-semibold text-lg text-foreground">Muhammed Rinshid VP</h3>
        <p className="text-sm text-muted-foreground">AI Builder • Educator • Automation Specialist</p>
        <p className="text-xs text-muted-foreground/40 pt-2">© {currentYear} Muhammed Rinshid VP. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
