import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const WELCOME_SHOWN_KEY = '@task_manager_welcome_shown';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShowWelcome, setShouldShowWelcome] = useState(false);

  useEffect(() => {
    checkWelcomeStatus();
  }, []);

  const checkWelcomeStatus = async () => {
    try {
      const hasSeenWelcome = await AsyncStorage.getItem(WELCOME_SHOWN_KEY);
      setShouldShowWelcome(hasSeenWelcome !== 'true');
    } catch (error) {
      console.error('Error checking welcome status:', error);
      setShouldShowWelcome(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (shouldShowWelcome) {
    return <Redirect href="/welcome" />;
  }

  return <Redirect href="/(app)" />;
}
