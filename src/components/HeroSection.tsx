import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Award, Globe } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onApplyClick: () => void;
}

const HeroSection = ({ onApplyClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-85"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 animate-fade-in bg-white/10 text-white border-white/20 backdrop-blur-sm">
            🚀 We're Hiring Amazing Talent
          </Badge>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up leading-tight">
            Join Our
            <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Innovation Team
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-fade-in animation-delay-200 leading-relaxed">
            Be part of a forward-thinking company that values creativity, growth, and excellence. 
            Shape the future with cutting-edge technology and amazing colleagues.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-fade-in animation-delay-400">
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Users className="w-6 h-6 text-blue-200" />
              <div className="text-left">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-blue-200">Team Members</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Award className="w-6 h-6 text-blue-200" />
              <div className="text-left">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-blue-200">Awards Won</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Globe className="w-6 h-6 text-blue-200" />
              <div className="text-left">
                <div className="text-2xl font-bold">25+</div>
                <div className="text-sm text-blue-200">Countries</div>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-600">
            <Button
              onClick={onApplyClick}
              variant="hero"
              size="lg"
              className="text-lg px-8 py-4 h-auto"
            >
              Apply Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 h-auto bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm"
            >
              View Open Positions
            </Button>
          </div>
          
          {/* Benefits Preview */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm animate-fade-in animation-delay-800">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3">
              <div className="font-semibold">Remote Work</div>
              <div className="text-blue-200">Work from anywhere</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3">
              <div className="font-semibold">Health Benefits</div>
              <div className="text-blue-200">Full coverage</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3">
              <div className="font-semibold">Growth</div>
              <div className="text-blue-200">Learning budget</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3">
              <div className="font-semibold">Equity</div>
              <div className="text-blue-200">Stock options</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;