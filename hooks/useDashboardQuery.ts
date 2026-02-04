import { tasksApi } from '@/lib/api/tasks';
import { useQuery } from '@tanstack/react-query';

// Query keys for dashboard
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
};

/**
 * Hook to fetch dashboard statistics
 */
export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: () => tasksApi.getStats(),
    // Keep data fresh but allow background refetch
    staleTime: 1000 * 30, // 30 seconds
  });
}
