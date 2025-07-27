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
  institution: z.string().min(2, 'Institution is required'),
  research_area: z.string().min(2, 'Research area is required'),
  cv_url: z.string().url().optional().or(z.literal('')),
  message: z.string().min(10, 'Please provide more details about your research interests'),
});

export function ResearcherForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      email: '',
      institution: '',
      research_area: '',
      cv_url: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Prepare the data, handling optional cv_url
      const researcherData = {
        full_name: values.full_name,
        email: values.email,
        institution: values.institution,
        research_area: values.research_area,
        cv_url: values.cv_url || undefined,
        message: values.message,
      };

      await api.submitResearcherApplication(researcherData);
      toast({
        title: 'Application submitted',
        description: 'We will review your application and get back to you soon.',
      });
      form.reset();
    } catch (error) {
      console.error('Researcher form submission error:', error);
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
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institution</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="research_area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Research Area</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cv_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CV/Resume URL (Optional)</FormLabel>
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
              <FormLabel>Research Interests</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your research interests and how you'd like to contribute"
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
