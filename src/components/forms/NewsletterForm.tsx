import React from 'react'import {
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
      
      // Show success message
      const formElement = document.querySelector('form');
      if (formElement) {
        formElement.style.display = 'none';
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed inset-0 flex items-center justify-center';
        successDiv.innerHTML = `
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Successfully Subscribed!</h3>
            <p class="text-gray-600 dark:text-gray-300">Thank you for subscribing to our newsletter. You'll receive updates about our latest research and events.</p>
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
      toast({
        title: 'Error',
        description: 'There was an error subscribing to the newsletter. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
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
