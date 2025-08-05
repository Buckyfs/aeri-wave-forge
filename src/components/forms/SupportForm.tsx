import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function SupportForm() {
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
        <label htmlFor="support_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          How would you like to support us?
        </label>
        <select
          id="support_type"
          name="support_type"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          <option value="">Select support type</option>
          <option value="financial">Financial Support</option>
          <option value="volunteer">Volunteer Time</option>
          <option value="resources">Provide Resources</option>
          <option value="mentorship">Mentorship</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Organization (Optional)
        </label>
        <Input
          id="organization"
          name="organization"
          type="text"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us more about how you'd like to support AERI and our mission"
          required
        />
      </div>

      <div>
        <label htmlFor="involvement_level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Preferred Level of Involvement
        </label>
        <select
          id="involvement_level"
          name="involvement_level"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          <option value="">Select involvement level</option>
          <option value="one-time">One-time Support</option>
          <option value="occasional">Occasional Support</option>
          <option value="regular">Regular Support</option>
          <option value="board-member">Board Member Interest</option>
        </select>
      </div>

      <Button type="submit" className="w-full">
        Submit Support Application
      </Button>
    </form>
  );
}
