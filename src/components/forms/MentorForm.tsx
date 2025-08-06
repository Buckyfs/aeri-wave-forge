import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function MentorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/meozrzzr', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        showSuccessPopup('Mentor Application Submitted', 'Thank you for your interest in becoming a mentor! We will review your application and contact you soon.');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showSuccessPopup = (title: string, message: string) => {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
    
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
    
    document.body.appendChild(overlay);
    
    const closeBtn = overlay.querySelector('#closeModal');
    closeBtn?.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Full Name
        </label>
        <Input 
          id="full_name"
          name="full_name" 
          type="text"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email
        </label>
        <Input 
          id="email"
          name="email" 
          type="email"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="profession" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Profession/Current Role
        </label>
        <Input 
          id="profession"
          name="profession" 
          type="text"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="experience_years" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Years of Experience
        </label>
        <select 
          id="experience_years"
          name="experience_years" 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
          disabled={isSubmitting}
        >
          <option value="">Select experience level</option>
          <option value="1-3">1-3 years</option>
          <option value="4-7">4-7 years</option>
          <option value="8-15">8-15 years</option>
          <option value="15+">15+ years</option>
        </select>
      </div>

      <div>
        <label htmlFor="expertise_areas" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Areas of Expertise
        </label>
        <Textarea
          id="expertise_areas"
          name="expertise_areas"
          placeholder="Describe your areas of expertise and specializations"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Why do you want to mentor young researchers?
        </label>
        <Textarea
          id="motivation"
          name="motivation"
          placeholder="Tell us about your motivation to mentor and guide young researchers"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Availability
        </label>
        <select 
          id="availability"
          name="availability" 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
          disabled={isSubmitting}
        >
          <option value="">Select your availability</option>
          <option value="1-2 hours/week">1-2 hours per week</option>
          <option value="3-5 hours/week">3-5 hours per week</option>
          <option value="6-10 hours/week">6-10 hours per week</option>
          <option value="flexible">Flexible</option>
        </select>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Mentor Application'}
      </Button>
    </form>
  );
}