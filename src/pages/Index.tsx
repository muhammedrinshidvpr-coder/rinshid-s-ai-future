import FloatingNav from '@/components/FloatingNav';
import AnimatedBackground from '@/components/AnimatedBackground';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import Projects from '@/components/Projects';
import VentureTimeline from '@/components/VentureTimeline';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AIChatWidget from '@/components/AIChatWidget';

const Index = () => {
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
        <Contact />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
};

export default Index;
