import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DatabaseService } from './database-service';

// Generic React hooks for any table
export const useTableData = <T>(table: string) => {
  return useQuery({
    queryKey: [table],
    queryFn: () => DatabaseService.getAll<T>(table),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTableDataWithFilters = <T>(table: string, filters: Record<string, any>) => {
  return useQuery({
    queryKey: [table, filters],
    queryFn: () => DatabaseService.getWithFilters<T>(table, filters),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTableRecord = <T>(table: string, id: string) => {
  return useQuery({
    queryKey: [table, id],
    queryFn: () => DatabaseService.getById<T>(table, id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateRecord = <T>(table: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: T) => DatabaseService.insert(table, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
    },
    onError: (error) => {
      console.error(`Error creating record in ${table}:`, error);
    },
  });
};

export const useUpdateRecord = <T>(table: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<T> }) =>
      DatabaseService.update(table, id, updates),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [table] });
      queryClient.invalidateQueries({ queryKey: [table, id] });
    },
    onError: (error) => {
      console.error(`Error updating record in ${table}:`, error);
    },
  });
};

export const useDeleteRecord = (table: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DatabaseService.delete(table, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
    },
    onError: (error) => {
      console.error(`Error deleting record from ${table}:`, error);
    },
  });
};

export const useTableCount = (table: string) => {
  return useQuery({
    queryKey: [table, 'count'],
    queryFn: () => DatabaseService.count(table),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Example usage:
// const { data: users, isLoading } = useTableData<User>('users');
// const { mutate: createUser, isPending } = useCreateRecord<User>('users');
// const { mutate: updateUser } = useUpdateRecord<User>('users');
// const { mutate: deleteUser } = useDeleteRecord('users');
