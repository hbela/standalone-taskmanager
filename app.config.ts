import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: 'standalone-taskmanager',
  slug: 'standalone-taskmanager',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icons/icon.png',
  scheme: 'standalone-taskmanager',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    infoPlist: {
      NSSpeechRecognitionUsageDescription: 'Allow $(PRODUCT_NAME) to use speech recognition for voice dictation.',
      NSMicrophoneUsageDescription: 'Allow $(PRODUCT_NAME) to access your microphone for voice dictation.',
    },
  },
  owner: 'elyscom',
  android: {
    package: 'com.standalonetaskmanager.app',
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/images/icons/adaptive-icon.png',
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    permissions: [
      'POST_NOTIFICATIONS',
      'SCHEDULE_EXACT_ALARM',
      'READ_CONTACTS',
      'WRITE_CONTACTS',
      'RECORD_AUDIO',
      'android.permission.READ_CONTACTS',
      'android.permission.WRITE_CONTACTS',
      'android.permission.RECORD_AUDIO',
    ],
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? './google-services.json',
  },
  web: {
    output: 'static',
    favicon: './assets/images/icons/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/icons/splash-large.png',
        resizeMode: 'contain',
        backgroundColor: '#1C1C1E',
        dark: {
          backgroundColor: '#1C1C1E',
        },
      },
    ],
    'expo-secure-store',
    'expo-notifications',
    '@react-native-community/datetimepicker',
    [
      'expo-contacts',
      {
        contactsPermission: 'The app accesses your contacts to help you manage tasks with people.',
      },
    ],
    [
      'expo-speech-recognition',
      {
        microphonePermission: 'Allow $(PRODUCT_NAME) to access your microphone for voice dictation.',
        speechRecognitionPermission: 'Allow $(PRODUCT_NAME) to use speech recognition for voice dictation.',
      },
    ],
    'expo-localization',
    'expo-sqlite',
    'expo-font',
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    [
      '@react-native-google-signin/google-signin',
      {
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
        iosUrlScheme: 'com.googleusercontent.apps.13205155505-h8notg3rkd4bgr1151s4re3fn4s6u6f1',
      },
    ],
    'expo-build-properties',
    [
      '@sentry/react-native/expo',
      {
        url: 'https://sentry.io/',
        project: 'taskmanager',
        organization: 'elyscom',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: 'a3b2021f-b56f-4d8f-895b-079c14265e32',
    },
  },
});
