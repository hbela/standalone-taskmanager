import LoadingSpinner from '@/components/LoadingSpinner';
import { LanguageProvider } from '@/context/LanguageContext';
import { initializeDatabase } from '@/lib/database';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 1,
    },
  },
});

function RootLayoutNav() {
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // Initialize database
  useEffect(() => {
    const init = async () => {
      try {
        await initializeDatabase();
        console.log('✅ Database initialized');
        setIsInitialized(true);
      } catch (error) {
        console.error('❌ Database initialization failed:', error);
        // Still set initialized to true to allow app to load
        setIsInitialized(true);
      }
    };

    init();
  }, []);

  // Initialize notifications
  useEffect(() => {
    const initNotifications = async () => {
      try {
        const { notificationService } = await import('@/lib/notifications');
        await notificationService.initialize();
        
        // Schedule daily summary at 9 AM
        await notificationService.scheduleDailySummary(9);
        
        console.log('✅ Notifications initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize notifications:', error);
      }
    };

    if (isInitialized) {
      initNotifications();
    }
  }, [isInitialized]);

  // Handle notification taps
  useEffect(() => {
    const setupNotificationHandler = async () => {
      try {
        const { notificationService } = await import('@/lib/notifications');
        
        const subscription = notificationService.setupNotificationListener((taskId) => {
          console.log('Notification tapped for task:', taskId);
          // Navigate to task detail or task list
          router.push('/(app)');
        });

        return () => {
          subscription.remove();
        };
      } catch (error) {
        console.error('Failed to setup notification handler:', error);
      }
    };

    if (isInitialized) {
      setupNotificationHandler();
    }
  }, [router, isInitialized]);

  if (!isInitialized) {
    return <LoadingSpinner message="Initializing app..." />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <RootLayoutNav />
      </QueryClientProvider>
    </LanguageProvider>
  );
}
