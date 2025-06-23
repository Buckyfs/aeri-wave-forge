import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCreatePartner } from '@/hooks/useDatabase';

const formSchema = z.object({
  organization_name: z.string().min(2, 'Organization name is required'),
  contact_name: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  partnership_type: z.enum(['business', 'academic', 'nonprofit']),
  message: z.string().min(10, 'Please provide more details about your interest'),
});

type FormData = z.infer<typeof formSchema>;

export function PartnerForm() {
  const createPartner = useCreatePartner();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization_name: '',
      contact_name: '',
      email: '',
      phone: '',
      partnership_type: 'business',
      message: '',
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      // Ensure all required fields are present
      const partnerData = {
        organization_name: values.organization_name,
        contact_name: values.contact_name,
        email: values.email,
        phone: values.phone || undefined,
        partnership_type: values.partnership_type,
        message: values.message,
      };

      await createPartner.mutateAsync(partnerData);
      form.reset();
    } catch (error) {
      // Error handling is done in the hook
      console.error('Form submission error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="organization_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Name</FormLabel>
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone (Optional)</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="partnership_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Partnership Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a partnership type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="nonprofit">Non-Profit</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your organization and how you'd like to partner with us"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={createPartner.isPending}
        >
          {createPartner.isPending ? 'Submitting...' : 'Submit Application'}
        </Button>
      </form>
    </Form>
  );
}
