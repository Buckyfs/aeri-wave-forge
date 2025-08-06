import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';

export function ResearcherForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Extract form data for database
    const researcherData = {
      full_name: formData.get('full_name') as string,
      email: formData.get('email') as string,
      age: parseInt(formData.get('age') as string),
      education_level: formData.get('education_level') as string,
      research_interests: formData.get('research_interests') as string,
      previous_experience: formData.get('previous_experience') as string || undefined,
      project_idea: formData.get('project_idea') as string || undefined,
      time_commitment: formData.get('time_commitment') as string,
    };

    try {
      // Step 1: Save to Supabase database
      try {
        await api.submitResearcherApplication(researcherData);
        console.log('✅ Researcher application saved to database');
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
        form.reset();
        showSuccessPopup('Research Application Submitted', 'Thank you for your interest in joining our research team! We will review your application and get back to you soon.');
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
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Age
        </label>
        <Input
          id="age"
          name="age"
          type="number"
          min="13"
          max="30"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="education_level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Current Education Level
        </label>
        <select
          id="education_level"
          name="education_level"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
          disabled={isSubmitting}
        >
          <option value="">Select your education level</option>
          <option value="high_school">High School</option>
          <option value="undergraduate">Undergraduate</option>
          <option value="graduate">Graduate</option>
          <option value="postgrad">Post-Graduate</option>
        </select>
      </div>

      <div>
        <label htmlFor="research_interests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Research Interests
        </label>
        <Textarea
          id="research_interests"
          name="research_interests"
          placeholder="Describe your research interests and areas you'd like to explore"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="previous_experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Previous Research Experience
        </label>
        <Textarea
          id="previous_experience"
          name="previous_experience"
          placeholder="Describe any previous research experience, projects, or relevant background"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="project_idea" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Project Idea or Research Question
        </label>
        <Textarea
          id="project_idea"
          name="project_idea"
          placeholder="Share any specific project ideas or research questions you'd like to pursue"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="time_commitment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Time Commitment
        </label>
        <select
          id="time_commitment"
          name="time_commitment"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
          disabled={isSubmitting}
        >
          <option value="">Select your available time commitment</option>
          <option value="2-5 hours/week">2-5 hours per week</option>
          <option value="6-10 hours/week">6-10 hours per week</option>
          <option value="11-20 hours/week">11-20 hours per week</option>
          <option value="20+ hours/week">20+ hours per week</option>
        </select>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Research Application'}
      </Button>
    </form>
  );
}
