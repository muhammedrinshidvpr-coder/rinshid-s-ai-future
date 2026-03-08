import { useEffect } from 'react';
import FloatingNav from '@/components/FloatingNav';
import AnimatedBackground from '@/components/AnimatedBackground';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import Projects from '@/components/Projects';
import VentureTimeline from '@/components/VentureTimeline';
import TechnicalInsights from '@/components/TechnicalInsights';
import Contact from '@/components/Contact';
import CodeActivity from '@/components/CodeActivity';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import Footer from '@/components/Footer';
import AIChatWidget from '@/components/AIChatWidget';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <FloatingNav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <VentureTimeline />
        <TechnicalInsights />
        <Contact />
        <CodeActivity />
        <InteractiveTerminal />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
};

export default Index;
