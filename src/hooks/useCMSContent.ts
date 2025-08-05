import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import type { CMSContent } from '@/types/database';

export function useCMSContent(sectionKey?: string) {
  const [content, setContent] = useState<CMSContent | CMSContent[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getCMSContent(sectionKey);
        setContent(data);
      } catch (err) {
        // Don't set error state to prevent site breakage, just log
        console.warn('CMS content fetch error (using fallbacks):', err);
        setContent(null); // This will trigger fallback content
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [sectionKey]);

  return { content, loading, error };
}

// Helper hook to get a single content item by key
export function useCMSContentItem(sectionKey: string) {
  const { content, loading, error } = useCMSContent(sectionKey);
  
  return {
    content: content as CMSContent | null,
    loading,
    error
  };
}

// Helper function to get content value or fallback
export function getCMSContentValue(content: CMSContent | null, fallback: string): string {
  return content?.content || fallback;
}