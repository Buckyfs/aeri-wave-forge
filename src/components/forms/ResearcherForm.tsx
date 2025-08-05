import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ResearcherForm() {
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
        >
          <option value="">Select your available time commitment</option>
          <option value="2-5 hours/week">2-5 hours per week</option>
          <option value="6-10 hours/week">6-10 hours per week</option>
          <option value="11-20 hours/week">11-20 hours per week</option>
          <option value="20+ hours/week">20+ hours per week</option>
        </select>
      </div>

      <Button type="submit" className="w-full">
        Submit Research Application
      </Button>
    </form>
  );
}
