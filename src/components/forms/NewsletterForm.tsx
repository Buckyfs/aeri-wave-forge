import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewsletterForm() {
  return (
    <form action="https://formspree.io/f/meozrzzr" method="POST" className="flex gap-2">
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="flex-1"
        required
      />
      <Button type="submit">Subscribe</Button>
    </form>
  );
}
