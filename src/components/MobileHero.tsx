import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Smartphone, Zap, MapPin, Clock, Star } from "lucide-react";
import mobileHero from "@/assets/mobile-hero.jpg";

interface MobileHeroProps {
  onGetStarted: () => void;
}

const MobileHero = ({ onGetStarted }: MobileHeroProps) => {
  return (
    <div className="relative min-h-screen bg-gradient-mobile overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-mobile-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-200"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-mobile-accent rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-400"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-8 pb-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-mobile-primary" />
            </div>
            <span className="text-white font-bold text-lg">Apply on the Go</span>
          </div>
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Sign In
          </Button>
        </header>

        {/* Hero Content */}
        <div className="text-center text-white space-y-6">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm px-4 py-2">
            🚀 #1 Mobile Job Platform
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Apply for Jobs
            <span className="block text-mobile-secondary">
              Anywhere, Anytime
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-4">
            The fastest way to apply for jobs on your mobile device. One-tap applications, real-time updates, and instant notifications.
          </p>

          {/* Hero Image */}
          <div className="relative max-w-sm mx-auto my-8">
            <div className="relative">
              <img 
                src={mobileHero} 
                alt="Mobile job application" 
                className="w-full h-auto rounded-3xl shadow-mobile-glow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mobile-primary/20 to-transparent rounded-3xl"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-3 shadow-mobile animate-bounce-in">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-bold text-gray-800">4.9★</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-mobile-accent rounded-2xl p-3 shadow-mobile animate-bounce-in animation-delay-200">
              <div className="text-white text-center">
                <div className="text-xl font-bold">2.5M+</div>
                <div className="text-xs">Applications</div>
              </div>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 px-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              <Zap className="w-4 h-4" />
              Instant Apply
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              <MapPin className="w-4 h-4" />
              Location Based
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              <Clock className="w-4 h-4" />
              Real-time Updates
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 px-4 mt-8">
            <Button
              onClick={onGetStarted}
              className="w-full bg-white text-mobile-primary hover:bg-white/90 h-14 text-lg font-semibold rounded-2xl shadow-mobile"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              variant="ghost"
              className="w-full text-white border-white/30 border h-12 rounded-2xl hover:bg-white/10"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 px-4">
            <p className="text-white/70 text-sm mb-4">Trusted by job seekers at</p>
            <div className="flex justify-center items-center gap-6 opacity-60">
              <div className="text-white font-bold">Google</div>
              <div className="text-white font-bold">Apple</div>
              <div className="text-white font-bold">Meta</div>
              <div className="text-white font-bold">Netflix</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default MobileHero;