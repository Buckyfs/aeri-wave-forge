import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function PartnerForm() {
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
        // Reset form
        form.reset();
        
        // Show success popup
        showSuccessPopup('Partnership Application Submitted', 'Thank you for your interest in partnering with AERI! We will review your application and get back to you soon.');
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="organization_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Organization Name
        </label>
        <Input
          id="organization_name"
          name="organization_name"
          type="text"
          required
        />
      </div>

      <div>
        <label htmlFor="contact_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Contact Name
        </label>
        <Input
          id="contact_name"
          name="contact_name"
          type="text"
          required
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
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Phone (Optional)
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
        />
      </div>

      <div>
        <label htmlFor="partnership_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Partnership Type
        </label>
        <select
          id="partnership_type"
          name="partnership_type"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          <option value="">Select a partnership type</option>
          <option value="business">Business</option>
          <option value="academic">Academic</option>
          <option value="nonprofit">Non-Profit</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your organization and how you'd like to partner with us"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
}
