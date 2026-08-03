import AuroraBackground from "@/components/effects/AuroraBackground";
import MouseSpotlight from "@/components/effects/MouseSpotlight";
import CyberGrid from "@/components/effects/CyberGrid";
import FloatingParticles from "@/components/effects/FloatingParticles";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";

import ThreatFeedSection from "@/components/landing/sections/ThreatFeedSection";
import AITerminalSection from "@/components/landing/sections/AITerminalSection";

import Workflow from "@/components/landing/Workflow";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Background Effects */}

      <AuroraBackground />
      <MouseSpotlight />
      <CyberGrid />
      <FloatingParticles />

      {/* Navigation */}

      <Navbar />

      {/* Hero */}

      <Hero />

      {/* Platform Statistics */}

      <Stats />

      {/* Features */}

      <Features />

      {/* Live Threat Intelligence */}

      <ThreatFeedSection />

      {/* AI Investigation */}

      <AITerminalSection />

      {/* Workflow */}

      <Workflow />

      {/* Footer */}

      <Footer />
    </main>
  );
}