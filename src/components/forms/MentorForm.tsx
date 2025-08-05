import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function MentorForm() {
  return (
    <form action="https://formspree.io/f/meozrzzr" method="POST" className="space-y-6">
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Full Name
        </label>
        <Input
          id="full_name"
          name="full_name"
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
        <label htmlFor="profession" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Profession/Current Role
        </label>
        <Input
          id="profession"
          name="profession"
          type="text"
          required
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
        >
          <option value="">Select your availability</option>
          <option value="1-2 hours/week">1-2 hours per week</option>
          <option value="3-5 hours/week">3-5 hours per week</option>
          <option value="6-10 hours/week">6-10 hours per week</option>
          <option value="flexible">Flexible</option>
        </select>
      </div>

      <Button type="submit" className="w-full">
        Submit Mentor Application
      </Button>
    </form>
  );
}
