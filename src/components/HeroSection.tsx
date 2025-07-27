import { ArrowRight } from 'lucide-react';
import ParticlesBackground from './ParticlesBackground';
import { ActionButton } from '@/components/ui/action-button';

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center pt-12 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-wave-pattern opacity-10"></div>

      {/* Interactive particles */}
      <ParticlesBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Content side */}
          <div className="text-left animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">
              Transforming Tomorrow Today
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-lg">
              Join the movement where curiosity meets innovation. At AERI, we empower young minds to turn environmental challenges into sustainable solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <ActionButton
                to="/get-started"
                variant="primary"
                className="bg-primary hover:bg-primary/90 text-white"
                showArrow
              >
                Get Started
              </ActionButton>
              <ActionButton
                to="/about"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Learn More
              </ActionButton>
            </div>
          </div>

          {/* Image side with floating effect */}
          <div className="relative hidden lg:block">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-3xl opacity-20"></div>
            <div className="relative animate-float rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1615729947596-a598e5de0ab3"
                alt="Green landscape representing environmental innovation"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-30"></div>

              {/* Floating badge */}
              <div className="absolute bottom-6 right-6 bg-white p-3 rounded-lg shadow-lg animate-pulse-glow">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-800">15 Active Projects</span>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-secondary rounded-full"></div>
            <div className="absolute top-10 -right-5 w-10 h-10 bg-accent rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
