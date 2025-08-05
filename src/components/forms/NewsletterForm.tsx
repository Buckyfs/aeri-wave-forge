import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { api } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export function NewsletterForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await api.subscribeToNewsletter(values.email);
      form.reset();
      
      // Show success message - find the specific newsletter form
      const newsletterForm = document.querySelector('form[data-newsletter-form]') || document.querySelector('form');
      if (newsletterForm) {
        // Create overlay that covers the entire viewport
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
        overlay.innerHTML = `
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Subscribed!</h3>
            <p class="text-gray-600 dark:text-gray-300">You have been successfully subscribed to our newsletter.</p>
            <div class="mt-6 flex justify-end">
              <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md">
                Close
              </button>
            </div>
          </div>
        `;
        
        // Add to body instead of form parent to ensure it's visible
        document.body.appendChild(overlay);
        
        // Remove overlay when clicking outside
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) {
            overlay.remove();
          }
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error subscribing to the newsletter. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2" data-newsletter-form>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </Form>
  );
} 
