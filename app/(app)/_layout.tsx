import { useTranslation } from '@/hooks/useTranslation';
import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';

export default function AppLayout() {
  const { t, _key } = useTranslation();
  const theme = useTheme();
  
  // State for tab titles to force updates
  const [tabTitles, setTabTitles] = useState({
    tasks: t('tasks.title'),
    calendar: t('calendar.title'),
    create: t('tasks.create'),
    dashboard: t('dashboard.title'),
    settings: t('settings.title'),
  });

  // Update tab titles when language changes
  useEffect(() => {
    setTabTitles({
      tasks: t('tasks.title'),
      calendar: t('calendar.title'),
      create: t('tasks.create'),
      dashboard: t('dashboard.title'),
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

  const calendarOptions = useMemo(() => ({
    title: tabTitles.calendar,
    headerShown: false,
    tabBarIcon: ({ color, size }: any) => (
      <Ionicons name="calendar" size={size} color={color} />
    ),
  }), [tabTitles.calendar]);

  const createOptions = useMemo(() => ({
    title: tabTitles.create,
    tabBarIcon: ({ color, size }: any) => (
      <Ionicons name="add-circle" size={size} color={color} />
    ),
  }), [tabTitles.create]);

  const dashboardOptions = useMemo(() => ({
    title: tabTitles.dashboard,
    tabBarIcon: ({ color, size }: any) => (
      <Ionicons name="stats-chart" size={size} color={color} />
    ),
  }), [tabTitles.dashboard]);

  const settingsOptions = useMemo(() => ({
    title: tabTitles.settings,
    tabBarIcon: ({ color, size }: any) => (
      <Ionicons name="settings" size={size} color={color} />
    ),
  }), [tabTitles.settings]);

  const screenOptions = useMemo(() => ({
    headerShown: false,
  }), []);

  return (
    <Tabs
      screenOptions={screenOptions}
      tabBar={({ navigation, state, descriptors, insets }) => {
        // Filter out hidden routes (href: null)
        const visibleRoutes = state.routes.filter((route) => {
          const { options } = descriptors[route.key];
          // Filter by name and hidden option
          // @ts-ignore
          if (options.href === null) return false;
          if (['notification-qa', 'contacts', 'task', 'sitemap', '+not-found'].includes(route.name)) return false;
          return true;
        });

        // Calculate correct index for the visible routes
        const currentRouteKey = state.routes[state.index].key;
        let index = visibleRoutes.findIndex((r) => r.key === currentRouteKey);

        // If we are on a hidden route, default to 0
        if (index === -1) index = 0;

        return (
          <BottomNavigation.Bar
            navigationState={{ ...state, routes: visibleRoutes, index }}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }
              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              return options.title !== undefined ? options.title : route.name;
            }}
            style={{
               position: 'absolute',
               left: 0,
               right: 0,
               bottom: 0,
               marginBottom: 25,
               marginHorizontal: 20,
               borderRadius: 20,
               backgroundColor: theme.colors.elevation.level2,
               elevation: 4,
               justifyContent: 'center',
            }}
          />
        );
      }}
    >
      <Tabs.Screen name="index" options={indexOptions} />
      <Tabs.Screen name="calendar" options={calendarOptions} />
      <Tabs.Screen name="create" options={createOptions} />
      <Tabs.Screen name="dashboard" options={dashboardOptions} />
      <Tabs.Screen name="settings" options={settingsOptions} />
      <Tabs.Screen name="notification-qa" options={{ href: null }} />
      <Tabs.Screen name="contacts" options={{ href: null }} />
      <Tabs.Screen name="task" options={{ href: null, title: '' }} />
    </Tabs>
  );
}
