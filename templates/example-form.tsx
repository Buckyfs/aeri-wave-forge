import React, { useState } from 'react';
import { useCreateRecord, useTableData } from './react-hooks';

// Define your data type
interface Contact {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at?: string;
}

// Example form component using the database hooks
export function ContactForm() {
  const [formData, setFormData] = useState<Contact>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Use the generic hook for creating records
  const createContact = useCreateRecord<Contact>('contacts');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createContact.mutateAsync(formData);

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });

      alert('Contact submitted successfully!');
    } catch (error) {
      console.error('Error submitting contact:', error);
      alert('Error submitting contact. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={createContact.isPending}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {createContact.isPending ? 'Submitting...' : 'Submit Contact'}
      </button>
    </form>
  );
}

// Example of displaying data from the database
export function ContactList() {
  const { data: contacts, isLoading, error } = useTableData<Contact>('contacts');

  if (isLoading) return <div>Loading contacts...</div>;
  if (error) return <div>Error loading contacts: {error.message}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Contacts</h2>
      {contacts?.map((contact) => (
        <div key={contact.id} className="border p-4 rounded-md">
          <h3 className="font-semibold">{contact.name}</h3>
          <p className="text-gray-600">{contact.email}</p>
          {contact.phone && <p className="text-gray-600">{contact.phone}</p>}
          <p className="mt-2">{contact.message}</p>
        </div>
      ))}
    </div>
  );
}

// Usage example:
// import { ContactForm, ContactList } from './example-form';
//
// function App() {
//   return (
//     <div>
//       <ContactForm />
//       <ContactList />
//     </div>
//   );
// }

// IMPORTANT: Always use database hooks instead of direct API calls
// ❌ Don't do this:
// import { api } from '@/lib/api';
// await api.submitData(data);

// ✅ Do this instead:
// import { useCreateRecord } from '@/hooks/useDatabase';
// const createRecord = useCreateRecord<YourType>('your_table');
// await createRecord.mutateAsync(data);
