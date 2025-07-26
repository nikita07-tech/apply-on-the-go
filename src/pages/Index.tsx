import { useState } from "react";
import MobileHero from "@/components/MobileHero";
import MobileApplication from "@/components/MobileApplication";

const Index = () => {
  const [showApplication, setShowApplication] = useState(false);

  const handleGetStarted = () => {
    setShowApplication(true);
  };

  const handleBackToHome = () => {
    setShowApplication(false);
  };

  return (
    <div className="min-h-screen">
      {!showApplication ? (
        <MobileHero onGetStarted={handleGetStarted} />
      ) : (
        <MobileApplication onBack={handleBackToHome} />
      )}
    </div>
  );
};

export default Index;