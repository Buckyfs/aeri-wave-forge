import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ActionButton } from '@/components/ui/action-button';

const CtaSection = () => {

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-primary">
        <div className="absolute inset-0 bg-wave-pattern opacity-10"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make Your Mark?
          </h2>

          <p className="text-lg text-white/90 mb-8">
            Choose your path and join us in creating sustainable solutions for tomorrow's challenges.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            <ActionButton
              to="/apply-researcher"
              variant="secondary"
              className="bg-[#00FFA3] hover:bg-[#00FFA3]/90 text-black"
              showArrow
            >
              Apply as Researcher
            </ActionButton>
            <ActionButton
              to="/become-mentor"
              variant="outline"
              className="bg-white text-primary hover:bg-white/90"
              showArrow
            >
              Become a Mentor
            </ActionButton>
            <ActionButton
              to="/become-partner"
              variant="primary"
              className="bg-primary hover:bg-primary/90 text-white"
              showArrow
            >
              Partner With Us
            </ActionButton>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <h3 className="font-heading text-xl font-semibold mb-4 text-white">Stay Updated on Our Journey</h3>
            <p className="text-white/80 mb-6">
              Subscribe to our newsletter for project updates, research breakthroughs, and community achievements.
            </p>

            <form action="https://formspree.io/f/meozrzzr" method="POST" className="flex flex-col md:flex-row gap-4">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="bg-white/20 border-0 text-white placeholder:text-white/60 focus-visible:ring-secondary"
                required
              />
              <Button
                type="submit"
                className="bg-secondary text-primary hover:bg-secondary/90"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
