import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DatabaseService } from '@/lib/database';
import { toast } from '@/components/ui/use-toast';
import type {
  Partner,
  Researcher,
  Supporter,
  Mentor,
  Newsletter
} from '@/types/database';

// Query keys for React Query
export const queryKeys = {
  partners: ['partners'] as const,
  researchers: ['researchers'] as const,
  supporters: ['supporters'] as const,
  mentors: ['mentors'] as const,
  newsletter: ['newsletter'] as const,
  dashboardStats: ['dashboard-stats'] as const,
};

// Partner hooks
export const usePartners = () => {
  return useQuery({
    queryKey: queryKeys.partners,
    queryFn: DatabaseService.getPartners,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreatePartner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DatabaseService.createPartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.partners });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats });
      toast({
        title: "Success!",
        description: "Your partnership application has been submitted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit partnership application. Please try again.",
        variant: "destructive",
      });
      console.error('Partner creation error:', error);
    },
  });
};

export const useUpdatePartnerStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Partner['status'] }) =>
      DatabaseService.updatePartnerStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.partners });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update partner status.",
        variant: "destructive",
      });
      console.error('Partner status update error:', error);
    },
  });
};

// Researcher hooks
export const useResearchers = () => {
  return useQuery({
    queryKey: queryKeys.researchers,
    queryFn: DatabaseService.getResearchers,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateResearcher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DatabaseService.createResearcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.researchers });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats });
      toast({
        title: "Success!",
        description: "Your researcher application has been submitted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit researcher application. Please try again.",
        variant: "destructive",
      });
      console.error('Researcher creation error:', error);
    },
  });
};

export const useUpdateResearcherStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Researcher['status'] }) =>
      DatabaseService.updateResearcherStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.researchers });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update researcher status.",
        variant: "destructive",
      });
      console.error('Researcher status update error:', error);
    },
  });
};

// Supporter hooks
export const useSupporters = () => {
  return useQuery({
    queryKey: queryKeys.supporters,
    queryFn: DatabaseService.getSupporters,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateSupporter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DatabaseService.createSupporter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.supporters });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats });
      toast({
        title: "Thank you!",
        description: "Your support has been recorded successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to record your support. Please try again.",
        variant: "destructive",
      });
      console.error('Supporter creation error:', error);
    },
  });
};

// Mentor hooks
export const useMentors = () => {
  return useQuery({
    queryKey: queryKeys.mentors,
    queryFn: DatabaseService.getMentors,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateMentor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DatabaseService.createMentor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mentors });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats });
      toast({
        title: "Success!",
        description: "Your mentor application has been submitted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit mentor application. Please try again.",
        variant: "destructive",
      });
      console.error('Mentor creation error:', error);
    },
  });
};

export const useUpdateMentorStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Mentor['status'] }) =>
      DatabaseService.updateMentorStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mentors });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update mentor status.",
        variant: "destructive",
      });
      console.error('Mentor status update error:', error);
    },
  });
};

// Newsletter hooks
export const useNewsletterSubscribers = () => {
  return useQuery({
    queryKey: queryKeys.newsletter,
    queryFn: DatabaseService.getNewsletterSubscribers,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSubscribeToNewsletter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DatabaseService.subscribeToNewsletter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.newsletter });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats });
      toast({
        title: "Subscribed!",
        description: "You have been successfully subscribed to our newsletter.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to subscribe to newsletter. Please try again.",
        variant: "destructive",
      });
      console.error('Newsletter subscription error:', error);
    },
  });
};

export const useUnsubscribeFromNewsletter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DatabaseService.unsubscribeFromNewsletter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.newsletter });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats });
      toast({
        title: "Unsubscribed",
        description: "You have been unsubscribed from our newsletter.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to unsubscribe from newsletter.",
        variant: "destructive",
      });
      console.error('Newsletter unsubscription error:', error);
    },
  });
};

// Dashboard stats hook
export const useDashboardStats = () => {
  return useQuery({
    queryKey: queryKeys.dashboardStats,
    queryFn: DatabaseService.getDashboardStats,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
