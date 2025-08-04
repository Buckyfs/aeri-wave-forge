import {
  forwardRef,
  useRef,
  useEffect,
  useState,
  ElementRef,
  ComponentPropsWithoutRef
} from "react";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { api } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  expertise: z.string().min(2, 'Area of expertise is required'),
  availability: z.string().min(2, 'Please specify your availability'),
  linkedin_url: z.string().url().optional().or(z.literal('')),
  message: z.string().min(10, 'Please provide more details about your mentoring interests'),
});

export function MentorForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      email: '',
      expertise: '',
      availability: '',
      linkedin_url: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Prepare the data, handling optional linkedin_url
      const mentorData = {
        full_name: values.full_name,
        email: values.email,
        expertise: values.expertise,
        availability: values.availability,
        linkedin_url: values.linkedin_url || undefined,
        message: values.message,
      };

      await api.submitMentorApplication(mentorData);
      form.reset();
      
      // Show success message
      const formElement = document.querySelector('form');
      if (formElement) {
        formElement.style.display = 'none';
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed inset-0 flex items-center justify-center';
        successDiv.innerHTML = `
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Application submitted</h3>
            <p class="text-gray-600 dark:text-gray-300">We will review your mentor application and get back to you soon.</p>
            <div class="mt-6 flex justify-end">
              <button onclick="window.location.href='/'" class="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md">
                Return Home
              </button>
            </div>
          </div>
        `;
        formElement.parentElement?.appendChild(successDiv);
      }
    } catch (error) {
      console.error('Mentor form submission error:', error);
      toast({
        title: 'Error',
        description: 'There was an error submitting your application. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expertise"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area of Expertise</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Availability</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., 2 hours per week, evenings only"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Profile URL (Optional)</FormLabel>
              <FormControl>
                <Input type="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why do you want to mentor?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your experience and how you'd like to help others"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Submit Application</Button>
      </form>
    </Form>
  );
}
