import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect directly to the app
  return <Redirect href="/(app)" />;
}
