import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function PartnerForm() {
  return (
    <form action="https://formspree.io/f/meozrzzr" method="POST" className="space-y-6">
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

      <Button type="submit" className="w-full">
        Submit Application
      </Button>
    </form>
  );
}
