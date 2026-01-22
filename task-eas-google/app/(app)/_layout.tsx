import { useTranslation } from '@/hooks/useTranslation';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';

export default function AppLayout() {
  const { t, _key } = useTranslation();
  
  // State for tab titles to force updates
  const [tabTitles, setTabTitles] = useState({
    tasks: t('tasks.title'),
    create: t('tasks.create'),
    profile: t('settings.profile'),
    settings: t('settings.title'),
  });

  // Update tab titles when language changes
  useEffect(() => {
    setTabTitles({
      tasks: t('tasks.title'),
      create: t('tasks.create'),
      profile: t('settings.profile'),
      settings: t('settings.title'),
    });
    console.log('[AppLayout] Updated tab titles:', {
      tasks: t('tasks.title'),
      create: t('tasks.create'),
      profile: t('settings.profile'),
      settings: t('settings.title'),
    });
  }, [_key, t]);

  // Memoize options to ensure they update when language changes
  const indexOptions = useMemo(() => ({
    title: tabTitles.tasks,
    headerShown: false,
    tabBarIcon: ({ color, size }: any) => (
      <Ionicons name="list" size={size} color={color} />
    ),
  }), [tabTitles.tasks]);

  const createOptions = useMemo(() => ({
    title: tabTitles.create,
    tabBarIcon: ({ color, size }: any) => (
      <Ionicons name="add-circle" size={size} color={color} />
    ),
  }), [tabTitles.create]);

  const profileOptions = useMemo(() => ({
    title: tabTitles.profile,
    tabBarIcon: ({ color, size }: any) => (
      <Ionicons name="person" size={size} color={color} />
    ),
  }), [tabTitles.profile]);

  const settingsOptions = useMemo(() => ({
    title: tabTitles.settings,
    tabBarIcon: ({ color, size }: any) => (
      <Ionicons name="settings" size={size} color={color} />
    ),
  }), [tabTitles.settings]);

  const screenOptions = useMemo(() => ({
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: '#8E8E93',
    headerStyle: {
      backgroundColor: '#F5F5F7',
    },
    headerTitleStyle: {
      fontWeight: '600' as const,
    },
  }), []);

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen name="index" options={indexOptions} />
      <Tabs.Screen name="create" options={createOptions} />
      <Tabs.Screen name="profile" options={profileOptions} />
      <Tabs.Screen name="settings" options={settingsOptions} />
      <Tabs.Screen name="notification-qa" options={{ href: null }} />
      <Tabs.Screen name="contacts" options={{ href: null }} />
      <Tabs.Screen name="task" options={{ href: null, title: '' }} />
    </Tabs>
  );
}
