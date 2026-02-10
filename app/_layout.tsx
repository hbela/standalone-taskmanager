import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSpinner from '@/components/LoadingSpinner';
import { LanguageProvider } from '@/context/LanguageContext';
import { ScreenshotProvider } from '@/context/ScreenshotContext';
import { ThemeProvider, useAppTheme } from '@/context/ThemeContext';
import { initializeDatabase } from '@/lib/database';
import { configureErrorHandling, logError, logInfo } from '@/utils/errorHandler';
import * as Sentry from '@sentry/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

// Configure error handling (disables console logs in production)
configureErrorHandling();

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
        logInfo('Database', 'Database initialized');
        setIsInitialized(true);
      } catch (error) {
        logError('Database', error);
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
        
        logInfo('Notifications', 'Notifications initialized successfully');
      } catch (error) {
        logError('Notifications', error);
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
          logInfo('Notifications', 'Notification tapped for task:', taskId);
          // Navigate to task detail or task list
          router.push('/(app)');
        });

        return () => {
          subscription.remove();
        };
      } catch (error) {
        logError('Notifications', error);
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

function InnerRootLayout() {
    const { theme } = useAppTheme();
    
    return (
        <PaperProvider theme={theme}>
            <LanguageProvider>
                <ScreenshotProvider>
                    <QueryClientProvider client={queryClient}>
                        <RootLayoutNav />
                    </QueryClientProvider>
                </ScreenshotProvider>
            </LanguageProvider>
        </PaperProvider>
    );
}

export default Sentry.wrap(function RootLayout() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <InnerRootLayout />
      </ThemeProvider>
    </ErrorBoundary>
  );
});