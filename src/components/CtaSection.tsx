import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ActionButton } from '@/components/ui/action-button';
import { api } from '@/lib/api';

const CtaSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;

    try {
      // Step 1: Save to Supabase database
      try {
        await api.subscribeToNewsletter(email);
        console.log('✅ Newsletter subscription saved to database');
      } catch (dbError) {
        console.warn('⚠️ Database save failed, continuing with email...', dbError);
      }

      // Step 2: Send to Formspree for email notification
      const response = await fetch('https://formspree.io/f/meozrzzr', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Reset form
        form.reset();

        // Show success popup
        showSuccessPopup('Newsletter Subscription', 'Thank you for subscribing! You\'ll receive project updates, research breakthroughs, and community achievements.');
      } else {
        throw new Error('Email notification failed');
      }
    } catch (error) {
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showSuccessPopup = (title: string, message: string) => {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';

    // Create modal
    overlay.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-8 transform transition-all">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">${title}</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">${message}</p>
          <button id="closeModal" class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Close
          </button>
        </div>
      </div>
    `;

    // Add to page
    document.body.appendChild(overlay);

    // Add click handlers
    const closeBtn = overlay.querySelector('#closeModal');
    closeBtn?.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
  };

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

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row gap-4">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="bg-white/20 border-0 text-white placeholder:text-white/60 focus-visible:ring-secondary"
                required
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                className="bg-secondary text-primary hover:bg-secondary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
