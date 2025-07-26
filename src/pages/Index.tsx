import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ApplicationForm from "@/components/ApplicationForm";

const Index = () => {
  const [showApplication, setShowApplication] = useState(false);

  const scrollToApplication = () => {
    setShowApplication(true);
    // Small delay to ensure the component is rendered before scrolling
    setTimeout(() => {
      const applicationSection = document.getElementById('application-section');
      if (applicationSection) {
        applicationSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onApplyClick={scrollToApplication} />
      
      {showApplication && (
        <section id="application-section" className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <ApplicationForm />
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;