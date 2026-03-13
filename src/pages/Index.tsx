import { useEffect, useState, useCallback } from 'react';
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
import NeuralPreloader from '@/components/NeuralPreloader';
import CommandPalette from '@/components/CommandPalette';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const handlePreloaderComplete = useCallback(() => setLoading(false), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading && <NeuralPreloader onComplete={handlePreloaderComplete} />}
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
        <CommandPalette />
      </div>
    </>
  );
};

export default Index;
