# Refactoring Summary: Calendar, Profile, Settings & Notification-QA Screens

This document details all the changes made to apply the professional design system to four additional screens in your Task Manager app.

---

## Overview of Changes

All four screens have been refactored to use the **Spacing tokens** from the design system and improve **typography consistency**. The changes eliminate hardcoded values and ensure proper theme integration for dark mode support.

---

## 1. Calendar Screen (`app/(app)/calendar.tsx`)

### Key Changes

#### Added Spacing Import
```typescript
import { Spacing } from '@/constants/theme';
```

#### Typography Improvements

**Before:**
```typescript
<Text style={{ fontSize: 10, lineHeight: 10 }}>
  {task.priority.toUpperCase()}
</Text>
```

**After:**
```typescript
<Chip 
  compact 
  textStyle={{ color: 'white', fontWeight: 'bold' }}
  style={{ backgroundColor: getPriorityColor(task.priority), height: 24 }}
>
  {task.priority.toUpperCase()}
</Chip>
```

**Removed hardcoded `fontSize: 10`** from priority chip and let the Chip component handle typography properly.

#### Spacing Token Replacements

| Element | Before | After |
|---------|--------|-------|
| Calendar card margin | `margin: 16` | `margin: Spacing.lg` |
| Calendar card border radius | `borderRadius: 12` | `borderRadius: Spacing.md` |
| Section title padding | `paddingHorizontal: 16` | `paddingHorizontal: Spacing.lg` |
| Section title margin | `marginBottom: 12` | `marginBottom: Spacing.md` |
| Task card margin bottom | `marginBottom: 12` | `marginBottom: Spacing.md` |
| Task card margin horizontal | `marginHorizontal: 16` | `marginHorizontal: Spacing.lg` |
| Task header margin | `marginBottom: 8` | `marginBottom: Spacing.sm` |
| Task title row gap | `gap: 8` | `gap: Spacing.sm` |
| Task description margin | `marginTop: 4` | `marginTop: Spacing.xs` |
| Contact info margin | `marginTop: 8` | `marginTop: Spacing.sm` |
| Contact info gap | `gap: 4` | `gap: Spacing.xs` |
| Empty state padding | `paddingVertical: 48` | `paddingVertical: Spacing.huge` |
| Empty text margin | `marginTop: 16` | `marginTop: Spacing.lg` |
| Loading text margin | `marginTop: 16` | `marginTop: Spacing.lg` |

#### Theme Color Improvements

**Before:**
```typescript
emptyText: {
  color: '#8E8E93',  // ❌ Hardcoded color
  marginTop: 16,
},
```

**After:**
```typescript
emptyText: {
  marginTop: Spacing.lg,
  // Color applied inline: { color: theme.colors.onSurfaceVariant }
},
```

**Removed hardcoded colors** to ensure proper dark mode support.

---

## 2. Profile Screen (`app/(app)/profile.tsx`)

### Key Changes

#### Added Spacing Import
```typescript
import { Spacing } from '@/constants/theme';
```

#### Spacing Token Replacements

| Element | Before | After |
|---------|--------|-------|
| Content padding bottom | `paddingBottom: 32` | `paddingBottom: Spacing.xxxl` |
| Branding section padding | `padding: 32` | `padding: Spacing.xxxl` |
| Branding margin bottom | `marginBottom: 16` | `marginBottom: Spacing.lg` |
| Branding border radius | `borderBottomLeftRadius: 24` | `borderBottomLeftRadius: Spacing.xxl` |
| Branding border radius | `borderBottomRightRadius: 24` | `borderBottomRightRadius: Spacing.xxl` |
| App name margin | `marginTop: 16` | `marginTop: Spacing.lg` |
| Section padding | `paddingHorizontal: 16` | `paddingHorizontal: Spacing.lg` |
| Section margin | `marginBottom: 16` | `marginBottom: Spacing.lg` |
| Section title margin | `marginBottom: 12` | `marginBottom: Spacing.md` |
| Stats grid gap | `gap: 12` | `gap: Spacing.md` |
| Stat card content padding | `paddingVertical: 16` | `paddingVertical: Spacing.lg` |
| Stat value margin | `marginVertical: 4` | `marginVertical: Spacing.xs` |
| Priority dot size | `width: 12, height: 12` | `width: Spacing.md, height: Spacing.md` |
| Footer padding | `padding: 24` | `padding: Spacing.xxl` |

#### Typography Consistency

All text elements already use proper RNP variants (`headlineMedium`, `titleMedium`, `bodyLarge`, `bodySmall`), so **no typography changes were needed**. The profile screen was already well-structured!

---

## 3. Settings Screen (`app/(app)/settings.tsx`)

### Key Changes

#### Added Spacing Import
```typescript
import { Spacing } from '@/constants/theme';
```

#### Spacing Token Replacements

| Element | Before | After |
|---------|--------|-------|
| Content padding | `padding: 16` | `padding: Spacing.lg` |
| Card margin bottom | `marginBottom: 16` | `marginBottom: Spacing.lg` |
| Developer buttons gap | `gap: 12` | `gap: Spacing.md` |
| App info row gap | `gap: 16` | `gap: Spacing.lg` |

#### Typography Improvements

**Before:**
```typescript
<Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}>
  This app is 100% free created by Bela Hajzer.
</Text>
<Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}>
  Copyright © 2026. All rights reserved.
</Text>
```

**After:**
```typescript
<Text 
  variant="bodySmall" 
  style={[styles.aboutText, { color: theme.colors.onSurfaceVariant }]}
>
  This app is 100% free created by Bela Hajzer.
</Text>
<Text 
  variant="bodySmall" 
  style={[styles.copyrightText, { color: theme.colors.onSurfaceVariant }]}
>
  Copyright © 2026. All rights reserved.
</Text>
```

**New styles added:**
```typescript
aboutText: {
  marginTop: Spacing.sm,
},
copyrightText: {
  marginTop: Spacing.xs,
},
```

Moved inline styles to StyleSheet for better organization and consistency.

---

## 4. Notification QA Screen (`app/(app)/notification-qa.tsx`)

### Key Changes

This screen was **completely redesigned** to integrate with React Native Paper and the theme system. It was previously using raw React Native components with hardcoded colors.

#### Major Structural Changes

**Added:**
- Spacing import
- Theme integration via `useTheme()`
- Appbar header for consistency
- Card component for log section
- Proper RNP Text variants

#### Typography Improvements

**Before:**
```typescript
header: { 
  fontSize: 24,  // ❌ Hardcoded
  fontWeight: 'bold', 
  marginBottom: 4,
  color: '#333'  // ❌ Hardcoded color
},
subheader: {
  fontSize: 14,  // ❌ Hardcoded
  color: '#666',  // ❌ Hardcoded color
  marginBottom: 16
},
buttonTitle: {
  fontSize: 16,  // ❌ Hardcoded
  fontWeight: '600',
  color: '#fff',
  marginBottom: 4
},
buttonSubtitle: {
  fontSize: 12,  // ❌ Hardcoded
  color: '#fff',
  opacity: 0.8
},
```

**After:**
```typescript
// Header is now in Appbar (no custom style needed)

subheader: {
  marginBottom: Spacing.lg,
  // Color applied inline: { color: theme.colors.onSurfaceVariant }
},
buttonTitle: {
  // Uses variant="titleMedium" on Text component
  fontWeight: '600',
  color: '#fff',
  marginBottom: Spacing.xs,
},
buttonSubtitle: {
  // Uses variant="bodySmall" on Text component
  color: '#fff',
  opacity: 0.8,
},
```

#### Spacing Token Replacements

| Element | Before | After |
|---------|--------|-------|
| Container padding | `padding: 16` | `padding: Spacing.lg` |
| Subheader margin | `marginBottom: 16` | `marginBottom: Spacing.lg` |
| Buttons margin | `marginBottom: 12` | `marginBottom: Spacing.md` |
| Button padding | `padding: 16` | `padding: Spacing.lg` |
| Button border radius | `borderRadius: 12` | `borderRadius: Spacing.md` |
| Button margin bottom | `marginBottom: 12` | `marginBottom: Spacing.md` |
| Button title margin | `marginBottom: 4` | `marginBottom: Spacing.xs` |
| Log section margin | `marginTop: 12` | `marginTop: Spacing.md` |
| Log header margin | `marginBottom: 8` | Removed (using Card.Title) |
| Log container padding | `padding: 12` | Removed (using Card.Content) |
| Empty log margin | `marginTop: 20` | `marginTop: Spacing.xl` |

#### Theme Integration

**Before:**
```typescript
container: { 
  backgroundColor: '#f5f5f5'  // ❌ Hardcoded
},
button: { 
  backgroundColor: '#007AFF',  // ❌ Hardcoded
},
dangerButton: {
  backgroundColor: '#FF3B30',  // ❌ Hardcoded
},
```

**After:**
```typescript
container: { 
  // Background color applied inline: { backgroundColor: theme.colors.background }
},
button: { 
  // Background color applied inline: { backgroundColor: buttonColor }
  // Where buttonColor = danger ? theme.colors.error : theme.colors.primary
},
```

**Now properly supports dark mode!**

---

## Summary of Impact

### Calendar Screen
- **14 spacing values** replaced with tokens
- **1 typography fix** (priority chip)
- **1 color fix** (empty state text)

### Profile Screen
- **15 spacing values** replaced with tokens
- Typography was already perfect ✓

### Settings Screen
- **4 spacing values** replaced with tokens
- **2 inline styles** moved to StyleSheet

### Notification QA Screen
- **Complete redesign** with theme integration
- **10 spacing values** replaced with tokens
- **5 hardcoded font sizes** replaced with RNP variants
- **4 hardcoded colors** replaced with theme colors
- **Added Appbar** for consistency with other screens
- **Added Card component** for better visual hierarchy

---

## Testing Checklist

After applying these changes, test the following:

### Calendar Screen
- [ ] Calendar card spacing looks consistent
- [ ] Task cards have proper spacing
- [ ] Priority chips are readable (no longer 10px)
- [ ] Empty state displays correctly
- [ ] Dark mode works properly

### Profile Screen
- [ ] Branding section spacing is correct
- [ ] Stats grid has consistent gaps
- [ ] Priority breakdown list displays correctly
- [ ] Footer spacing is appropriate
- [ ] Dark mode works properly

### Settings Screen
- [ ] Card spacing is consistent
- [ ] Developer buttons have proper gap
- [ ] About section text spacing is correct
- [ ] Dark mode works properly

### Notification QA Screen
- [ ] Appbar header displays correctly
- [ ] Button spacing is consistent
- [ ] Log card integrates well with theme
- [ ] **Dark mode now works** (previously broken)
- [ ] All text is readable and properly sized

---

## Files to Replace

Replace these files in your project:

1. `app/(app)/calendar.tsx` → `refactored-calendar.tsx`
2. `app/(app)/profile.tsx` → `refactored-profile.tsx`
3. `app/(app)/settings.tsx` → `refactored-settings.tsx`
4. `app/(app)/notification-qa.tsx` → `refactored-notification-qa.tsx`

---

## Next Steps

With these four screens refactored, you've now applied the professional design system to:

✅ TasksScreen (index.tsx)
✅ TaskDetailScreen (task/[id].tsx)
✅ EditTaskScreen (task/edit/[id].tsx)
✅ CalendarScreen (calendar.tsx)
✅ ProfileScreen (profile.tsx)
✅ SettingsScreen (settings.tsx)
✅ NotificationQAScreen (notification-qa.tsx)

refactored-calendar.tsx

import { Spacing } from '@/constants/theme';
import { useTasks } from '@/hooks/useTasksQuery';
import { useTranslation } from '@/hooks/useTranslation';
import { Task } from '@/types/task';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import {
    ActivityIndicator,
    Appbar,
    Card,
    Chip,
    Text,
    useTheme
} from 'react-native-paper';

// Configure calendar localization
LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today'
};

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  today: "Aujourd'hui"
};

LocaleConfig.locales['hu'] = {
  monthNames: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
  dayNames: ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
  dayNamesShort: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
  today: 'Ma'
};

LocaleConfig.locales['de'] = {
  monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  today: 'Heute'
};

export default function CalendarScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { data, isLoading } = useTasks();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  // Set calendar locale based on current language
  useEffect(() => {
    const languageCode = t('common.languageCode');
    LocaleConfig.defaultLocale = languageCode;
  }, [t]);

  // Extract tasks array from response
  const tasks: Task[] = data?.tasks || [];

  // Group tasks by date
  const tasksByDate = useMemo(() => {
    const grouped: { [date: string]: Task[] } = {};
    
    tasks.forEach(task => {
      if (task.dueDate) {
        const dateKey = new Date(task.dueDate).toISOString().split('T')[0];
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        grouped[dateKey].push(task);
      }
    });
    
    return grouped;
  }, [tasks]);

  // Get tasks for selected date
  const selectedTasks = tasksByDate[selectedDate] || [];

  // Create marked dates for calendar
  const markedDates = useMemo(() => {
    const marked: any = {};
    
    Object.keys(tasksByDate).forEach(date => {
      const tasksOnDate = tasksByDate[date];
      const hasOverdue = tasksOnDate.some(
        task => !task.completed && new Date(task.dueDate!) < new Date()
      );
      const hasCompleted = tasksOnDate.some(task => task.completed);
      
      marked[date] = {
        marked: true,
        dotColor: hasOverdue ? theme.colors.error : hasCompleted ? theme.colors.primary : theme.colors.secondary,
      };
    });
    
    // Mark selected date
    marked[selectedDate] = {
      ...marked[selectedDate],
      selected: true,
      selectedColor: theme.colors.primary,
    };
    
    return marked;
  }, [tasksByDate, selectedDate, theme]);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent': return '#FF3B30';
      case 'high': return '#FF9500';
      case 'medium': return '#007AFF';
      case 'low': return '#34C759';
      default: return '#8E8E93';
    }
  };

  const renderTask = ({ item: task }: { item: Task }) => {
    const isOverdue = !task.completed && new Date(task.dueDate!) < new Date();
    
    return (
      <Card
        style={[
            styles.taskCard,
            task.completed && { opacity: 0.6, backgroundColor: theme.colors.surfaceDisabled },
            isOverdue && { borderColor: theme.colors.error, borderWidth: 1 }
        ]}
        onPress={() => router.push(`/task/${task.id}`)}
        mode="elevated"
      >
        <Card.Content>
            <View style={styles.taskHeader}>
            <View style={styles.taskTitleRow}>
                <Ionicons
                name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
                size={24}
                color={
                    task.completed
                    ? theme.colors.primary
                    : isOverdue
                    ? theme.colors.error
                    : theme.colors.primary
                }
                />
                <Text
                variant="titleMedium"
                style={[
                    styles.taskTitle,
                    task.completed && styles.taskTitleCompleted,
                ]}
                numberOfLines={1}
                >
                {task.title}
                </Text>
            </View>
            <Chip 
                compact 
                textStyle={{ color: 'white', fontWeight: 'bold' }}
                style={{ backgroundColor: getPriorityColor(task.priority), height: 24 }}
            >
                {task.priority.toUpperCase()}
            </Chip>
            </View>
            {task.description && (
            <Text variant="bodyMedium" style={styles.taskDescription} numberOfLines={2}>
                {task.description}
            </Text>
            )}
            {task.contact && (
            <View style={styles.contactInfo}>
                <Ionicons name="person-outline" size={14} color={theme.colors.onSurfaceVariant} />
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>{task.contact.fullName}</Text>
            </View>
            )}
        </Card.Content>
      </Card>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Ionicons name="calendar-outline" size={64} color={theme.colors.outlineVariant} />
      <Text variant="bodyLarge" style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
        {t('calendar.noTasks')}
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text variant="bodyMedium" style={{ marginTop: Spacing.lg }}>
          {t('common.loading')}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header elevated>
        <Appbar.Content title={t('calendar.title')} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card style={styles.calendarCard} mode="elevated">
            <Card.Content style={{ padding: 0 }}>
                <Calendar
                    key={t('common.languageCode')}
                    current={selectedDate}
                    onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
                    markedDates={markedDates}
                    theme={{
                    calendarBackground: theme.colors.surface,
                    textSectionTitleColor: theme.colors.onSurface,
                    dayTextColor: theme.colors.onSurface,
                    monthTextColor: theme.colors.onSurface,
                    selectedDayBackgroundColor: theme.colors.primary,
                    selectedDayTextColor: theme.colors.onPrimary,
                    todayTextColor: theme.colors.error,
                    dotColor: theme.colors.primary,
                    textDayFontWeight: '500',
                    textMonthFontWeight: '600',
                    textDayHeaderFontWeight: '500',
                    arrowColor: theme.colors.onSurface,
                    }}
                />
            </Card.Content>
          </Card>
          
          <View style={styles.tasksSection}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              {new Date(selectedDate).toLocaleDateString(t('common.locale'), {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
            
            <View style={styles.tasksList}>
                {selectedTasks.length === 0 ? (
                    renderEmpty()
                ) : (
                    selectedTasks.map(task => (
                        <React.Fragment key={`task-${task.id}`}>
                            {renderTask({ item: task })}
                        </React.Fragment>
                    ))
                )}
            </View>
          </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
      paddingBottom: 120,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarCard: {
      margin: Spacing.lg,
      borderRadius: Spacing.md,
      overflow: 'hidden',
  },
  tasksSection: {
  },
  sectionTitle: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  tasksList: {
    paddingBottom: 120, // Keep for floating bottom navbar
  },
  taskCard: {
    marginBottom: Spacing.md,
    marginHorizontal: Spacing.lg,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  taskTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.sm,
  },
  taskTitle: {
    flex: 1,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  taskDescription: {
    marginTop: Spacing.xs,
    marginLeft: 32,
    opacity: 0.7,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    marginLeft: 32,
    gap: Spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.huge,
  },
  emptyText: {
    marginTop: Spacing.lg,
  },
});


import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Spacing } from '@/constants/theme';
import { LanguageContext } from '@/context/LanguageContext';
import { useAppTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, Card, IconButton, List, Text, useTheme } from 'react-native-paper';

export default function SettingsScreen() {
  const { key } = useContext(LanguageContext);
  const { t } = useTranslation();
  const theme = useTheme();
  const { isDark, toggleTheme } = useAppTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]} key={key}>
      <Appbar.Header elevated>
        <Appbar.Content title={t('settings.title')} />
        <Appbar.Action 
            icon={isDark ? "weather-night" : "weather-sunny"} 
            onPress={toggleTheme} 
        />
      </Appbar.Header>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        <List.Section>
            <List.Subheader>{t('settings.appearance') || 'Appearance'}</List.Subheader>
            <Card style={styles.card} mode="elevated">
                <Card.Content style={{ padding: 0 }}>
                    <List.Item
                        title={isDark ? "Dark Mode" : "Light Mode"}
                        left={props => <List.Icon {...props} icon="theme-light-dark" />}
                        right={props => (
                            <IconButton
                                icon={isDark ? "weather-night" : "weather-sunny"}
                                selected={isDark}
                                onPress={toggleTheme}
                            />
                        )}
                    />
                </Card.Content>
            </Card>
        </List.Section>

        <LanguageSwitcher />
        
        <List.Section>
            <List.Subheader>Developer</List.Subheader>
            <Card style={styles.card}>
                <Card.Content style={styles.developerButtons}>
                    <Button 
                        mode="outlined" 
                        icon="eye" 
                        onPress={() => router.push('/splash-test')}
                    >
                        Preview Splash Screen
                    </Button>
                    <Button 
                        mode="outlined" 
                        icon="hand-wave" 
                        onPress={() => router.push('/welcome')}
                    >
                        Preview Welcome Screen
                    </Button>
                </Card.Content>
            </Card>
        </List.Section>
        
        <List.Section>
            <List.Subheader>{t('settings.about')}</List.Subheader>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.appInfoRow}>
                        <Avatar.Icon size={48} icon="check-bold" />
                        <View style={styles.appInfoText}>
                            <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
                              Task Manager App
                            </Text>
                            <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
                              Version 1.0.0
                            </Text>
                            <Text 
                              variant="bodySmall" 
                              style={[styles.aboutText, { color: theme.colors.onSurfaceVariant }]}
                            >
                                This app is 100% free created by Bela Hajzer.
                            </Text>
                            <Text 
                              variant="bodySmall" 
                              style={[styles.copyrightText, { color: theme.colors.onSurfaceVariant }]}
                            >
                                Copyright © 2026. All rights reserved.
                            </Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </List.Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: 120,
  },
  card: {
    marginBottom: Spacing.lg,
  },
  developerButtons: {
    gap: Spacing.md,
  },
  appInfoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.lg,
  },
  appInfoText: {
      flex: 1,
  },
  aboutText: {
    marginTop: Spacing.sm,
  },
  copyrightText: {
    marginTop: Spacing.xs,
  },
});

-------------------------------------

refactored-settings.tsx

import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Spacing } from '@/constants/theme';
import { LanguageContext } from '@/context/LanguageContext';
import { useAppTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, Card, IconButton, List, Text, useTheme } from 'react-native-paper';

export default function SettingsScreen() {
  const { key } = useContext(LanguageContext);
  const { t } = useTranslation();
  const theme = useTheme();
  const { isDark, toggleTheme } = useAppTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]} key={key}>
      <Appbar.Header elevated>
        <Appbar.Content title={t('settings.title')} />
        <Appbar.Action 
            icon={isDark ? "weather-night" : "weather-sunny"} 
            onPress={toggleTheme} 
        />
      </Appbar.Header>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        <List.Section>
            <List.Subheader>{t('settings.appearance') || 'Appearance'}</List.Subheader>
            <Card style={styles.card} mode="elevated">
                <Card.Content style={{ padding: 0 }}>
                    <List.Item
                        title={isDark ? "Dark Mode" : "Light Mode"}
                        left={props => <List.Icon {...props} icon="theme-light-dark" />}
                        right={props => (
                            <IconButton
                                icon={isDark ? "weather-night" : "weather-sunny"}
                                selected={isDark}
                                onPress={toggleTheme}
                            />
                        )}
                    />
                </Card.Content>
            </Card>
        </List.Section>

        <LanguageSwitcher />
        
        <List.Section>
            <List.Subheader>Developer</List.Subheader>
            <Card style={styles.card}>
                <Card.Content style={styles.developerButtons}>
                    <Button 
                        mode="outlined" 
                        icon="eye" 
                        onPress={() => router.push('/splash-test')}
                    >
                        Preview Splash Screen
                    </Button>
                    <Button 
                        mode="outlined" 
                        icon="hand-wave" 
                        onPress={() => router.push('/welcome')}
                    >
                        Preview Welcome Screen
                    </Button>
                </Card.Content>
            </Card>
        </List.Section>
        
        <List.Section>
            <List.Subheader>{t('settings.about')}</List.Subheader>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.appInfoRow}>
                        <Avatar.Icon size={48} icon="check-bold" />
                        <View style={styles.appInfoText}>
                            <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
                              Task Manager App
                            </Text>
                            <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
                              Version 1.0.0
                            </Text>
                            <Text 
                              variant="bodySmall" 
                              style={[styles.aboutText, { color: theme.colors.onSurfaceVariant }]}
                            >
                                This app is 100% free created by Bela Hajzer.
                            </Text>
                            <Text 
                              variant="bodySmall" 
                              style={[styles.copyrightText, { color: theme.colors.onSurfaceVariant }]}
                            >
                                Copyright © 2026. All rights reserved.
                            </Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </List.Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: 120,
  },
  card: {
    marginBottom: Spacing.lg,
  },
  developerButtons: {
    gap: Spacing.md,
  },
  appInfoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.lg,
  },
  appInfoText: {
      flex: 1,
  },
  aboutText: {
    marginTop: Spacing.sm,
  },
  copyrightText: {
    marginTop: Spacing.xs,
  },
});


-----------------------------------------

refactored-profile.tsx
import { Spacing } from '@/constants/theme';
import { useTranslation } from '@/hooks/useTranslation';
import { getTaskStats } from '@/lib/db/tasksDb';
import React, { useEffect, useState } from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import {
    Appbar,
    Avatar,
    Card,
    Divider,
    List,
    Surface,
    Text,
    useTheme
} from 'react-native-paper';

interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  byPriority: Record<string, number>;
}

export default function ProfileScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    completed: 0,
    pending: 0,
    byPriority: {},
  });
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = async () => {
    try {
      const taskStats = await getTaskStats();
      setStats(taskStats);
    } catch (error) {
      console.error('Failed to load task stats:', error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  };

  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  const getPriorityColor = (priority: string): string => {
    switch (priority.toLowerCase()) {
      case 'urgent': return '#FF3B30';
      case 'high': return '#FF9F0A';
      case 'medium': return '#007AFF';
      case 'low': return '#34C759';
      default: return '#8E8E93';
    }
  };

  // Get localized priority label
  const getPriorityLabel = (priority: string): string => {
    const key = priority.toLowerCase() as 'low' | 'medium' | 'high' | 'urgent';
    // If we have a translation for this priority, use it, otherwise capitalize the key
    return t(`tasks.priorities.${key}`, { defaultValue: priority.charAt(0).toUpperCase() + priority.slice(1) });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header elevated>
        <Appbar.Content title={t('profile.title')} />
      </Appbar.Header>

      <ScrollView 
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* App Header Branding */}
        <Surface style={styles.brandingSection} elevation={1}>
            <Avatar.Icon size={80} icon="check-all" style={{ backgroundColor: theme.colors.primaryContainer }} />
            <Text variant="headlineMedium" style={[styles.appName, { color: theme.colors.onSurface }]}>
              {t('auth.appTitle')}
            </Text>
            <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
              {t('welcome.subtitle')}
            </Text>
        </Surface>

        {/* Task Statistics */}
        <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              {t('profile.taskStats')}
            </Text>
            <View style={styles.statsGrid}>
                {/* Total */}
                <Card style={styles.statCard} mode="contained">
                    <Card.Content style={styles.statCardContent}>
                        <Avatar.Icon 
                          size={40} 
                          icon="format-list-bulleted" 
                          style={{ backgroundColor: theme.colors.secondaryContainer }} 
                          color={theme.colors.onSecondaryContainer} 
                        />
                        <Text variant="headlineMedium" style={styles.statValue}>
                          {stats.total}
                        </Text>
                        <Text variant="bodySmall">{t('profile.totalTasks')}</Text>
                    </Card.Content>
                </Card>
                
                {/* Completed */}
                <Card style={styles.statCard} mode="contained">
                    <Card.Content style={styles.statCardContent}>
                        <Avatar.Icon 
                          size={40} 
                          icon="check-circle-outline" 
                          style={{ backgroundColor: '#E8F5E9' }} 
                          color="#2E7D32" 
                        />
                        <Text variant="headlineMedium" style={styles.statValue}>
                          {stats.completed}
                        </Text>
                        <Text variant="bodySmall">{t('profile.completed')}</Text>
                    </Card.Content>
                </Card>

                {/* Pending */}
                <Card style={styles.statCard} mode="contained">
                    <Card.Content style={styles.statCardContent}>
                        <Avatar.Icon 
                          size={40} 
                          icon="clock-outline" 
                          style={{ backgroundColor: '#FFF3E0' }} 
                          color="#EF6C00" 
                        />
                        <Text variant="headlineMedium" style={styles.statValue}>
                          {stats.pending}
                        </Text>
                        <Text variant="bodySmall">{t('profile.pending')}</Text>
                    </Card.Content>
                </Card>

                {/* Completion Rate */}
                <Card style={styles.statCard} mode="contained">
                    <Card.Content style={styles.statCardContent}>
                        <Avatar.Icon 
                          size={40} 
                          icon="trending-up" 
                          style={{ backgroundColor: '#F3E5F5' }} 
                          color="#7B1FA2" 
                        />
                        <Text variant="headlineMedium" style={styles.statValue}>
                          {completionRate}%
                        </Text>
                        <Text variant="bodySmall">{t('profile.completion')}</Text>
                    </Card.Content>
                </Card>
            </View>
        </View>

        {/* Priority Breakdown */}
        {Object.keys(stats.byPriority).length > 0 && (
            <List.Section style={styles.sectionEntry}>
                <List.Subheader>{t('profile.tasksByPriority')}</List.Subheader>
                <Card mode="elevated">
                    <Card.Content style={{ padding: 0 }}>
                        {Object.entries(stats.byPriority).map(([priority, count], index) => (
                            <React.Fragment key={priority}>
                                {index > 0 && <Divider />}
                                <List.Item
                                    title={getPriorityLabel(priority)}
                                    left={() => <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(priority) }]} />}
                                    right={() => (
                                      <Text variant="bodyLarge" style={{ alignSelf: 'center', fontWeight: 'bold' }}>
                                        {count}
                                      </Text>
                                    )}
                                />
                            </React.Fragment>
                        ))}
                    </Card.Content>
                </Card>
            </List.Section>
        )}

        {/* App Info */}
        <List.Section style={styles.sectionEntry}>
            <List.Subheader>{t('profile.about')}</List.Subheader>
            <Card mode="elevated">
                 <Card.Content style={{ padding: 0 }}>
                    <List.Item
                        title={t('profile.version')}
                        description="1.0.0"
                        left={(props) => <List.Icon {...props} icon="information" />}
                    />
                    <Divider />
                    <List.Item
                        title={t('profile.storage')}
                        description="Local SQLite Database"
                        left={(props) => <List.Icon {...props} icon="database" />}
                    />
                 </Card.Content>
            </Card>
        </List.Section>

        <View style={styles.footer}>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              {t('profile.madeWithLove')}
            </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: Spacing.xxxl,
  },
  brandingSection: {
    padding: Spacing.xxxl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderBottomLeftRadius: Spacing.xxl,
    borderBottomRightRadius: Spacing.xxl,
  },
  appName: {
    marginTop: Spacing.lg,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionEntry: {
      paddingHorizontal: Spacing.lg,
      marginBottom: 0,
  },
  sectionTitle: {
      marginBottom: Spacing.md,
      fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statCard: {
    width: '48%', // Approx 2 column
  },
  statCardContent: {
      alignItems: 'center',
      paddingVertical: Spacing.lg,
  },
  statValue: {
      fontWeight: 'bold',
      marginVertical: Spacing.xs,
  },
  priorityDot: {
      width: Spacing.md, 
      height: Spacing.md, 
      borderRadius: 6, 
      margin: 10,
      alignSelf: 'center',
  },
  footer: {
    padding: Spacing.xxl,
    alignItems: 'center',
  },
});
--------------------------------------------


refactored-notification-qa.tsx

import { Spacing } from '@/constants/theme';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Appbar, Card, Text, useTheme } from 'react-native-paper';
import {
    cancelAllNotifications,
    cancelTestTaskNotifications,
    listScheduledNotifications,
    scheduleTestTask,
    sendQuickTestNotification,
} from '../../lib/notifications/notificationQA';

export default function NotificationQAScreen() {
  const theme = useTheme();
  const [log, setLog] = useState<string[]>([]);

  // Helper to append log
  const appendLog = (message: string) => {
    setLog((prev) => [message, ...prev]);
    console.log(message);
  };

  const handleQuickTest = async () => {
    try {
      const id = await sendQuickTestNotification();
      appendLog(`✅ Quick test notification scheduled: ${id}`);
    } catch (error) {
      appendLog(`❌ Error: ${error}`);
    }
  };

  const handleScheduleTestTask = async () => {
    try {
      const ids = await scheduleTestTask();
      appendLog(`✅ Test task reminders scheduled: ${ids.join(', ')}`);
    } catch (error) {
      appendLog(`❌ Error: ${error}`);
    }
  };

  const handleListScheduled = async () => {
    try {
      const scheduled = await listScheduledNotifications();
      appendLog(`📊 Scheduled notifications: ${scheduled.length}`);
      scheduled.forEach((n, i) => {
        const trigger = n.trigger as any;
        let triggerInfo = 'unknown';
        
        if (trigger?.value) {
          // Date trigger with timestamp
          triggerInfo = new Date(trigger.value).toLocaleString();
        } else if (trigger?.seconds) {
          // Time interval trigger
          triggerInfo = `in ${trigger.seconds}s`;
        } else if (trigger?.hour !== undefined && trigger?.minute !== undefined) {
          // Daily trigger
          triggerInfo = `daily at ${trigger.hour}:${trigger.minute.toString().padStart(2, '0')}`;
        }
        
        appendLog(
          `[${i}] ${n.content.title} - ${triggerInfo}`
        );
      });
    } catch (error) {
      appendLog(`❌ Error: ${error}`);
    }
  };

  const handleCancelTestTask = async () => {
    try {
      await cancelTestTaskNotifications();
      appendLog('✅ Test task notifications cancelled');
    } catch (error) {
      appendLog(`❌ Error: ${error}`);
    }
  };

  const handleCancelAll = async () => {
    try {
      await cancelAllNotifications();
      appendLog('✅ All notifications cancelled');
    } catch (error) {
      appendLog(`❌ Error: ${error}`);
    }
  };

  const handleClearLog = () => {
    setLog([]);
    appendLog('🧹 Log cleared');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header elevated>
        <Appbar.Content title="📋 Notification QA" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="bodyMedium" style={[styles.subheader, { color: theme.colors.onSurfaceVariant }]}>
          Test local notifications on physical device
        </Text>
        
        <View style={styles.buttons}>
          <TestButton 
            onPress={handleQuickTest}
            title="🚀 Send Quick Test Notification"
            subtitle="Triggers in 5 seconds"
            theme={theme}
          />

          <TestButton 
            onPress={handleScheduleTestTask}
            title="📝 Schedule Test Task Reminders"
            subtitle="10-min due date with 1 & 5-min reminders"
            theme={theme}
          />

          <TestButton 
            onPress={handleListScheduled}
            title="📊 List All Scheduled Notifications"
            subtitle="Shows IDs, titles, and triggers"
            theme={theme}
          />

          <TestButton 
            onPress={handleCancelTestTask}
            title="❌ Cancel Test Task Notifications"
            subtitle="Removes only test task (ID: 999)"
            theme={theme}
          />

          <TestButton 
            onPress={handleCancelAll}
            title="⚠️ Cancel All Notifications"
            subtitle="Clears everything (use with caution)"
            danger
            theme={theme}
          />

          <TestButton 
            onPress={handleClearLog}
            title="🧹 Clear Log"
            subtitle="Reset the log display"
            theme={theme}
          />
        </View>

        <Card style={styles.logCard} mode="elevated">
          <Card.Title 
            title={`📝 Log Output (${log.length})`}
            titleVariant="titleMedium"
          />
          <Card.Content>
            <ScrollView style={styles.logContainer}>
              {log.length === 0 ? (
                <Text variant="bodyMedium" style={[styles.emptyLog, { color: theme.colors.onSurfaceVariant }]}>
                  No logs yet. Press a button to test!
                </Text>
              ) : (
                log.map((line, index) => (
                  <Text 
                    key={index} 
                    variant="bodySmall" 
                    style={[styles.logLine, { color: theme.colors.onSurface }]}
                  >
                    {line}
                  </Text>
                ))
              )}
            </ScrollView>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

interface TestButtonProps {
  onPress: () => void;
  title: string;
  subtitle: string;
  danger?: boolean;
  theme: any;
}

function TestButton({ onPress, title, subtitle, danger, theme }: TestButtonProps) {
  const buttonColor = danger ? theme.colors.error : theme.colors.primary;
  
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: buttonColor }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text variant="titleMedium" style={styles.buttonTitle}>
        {title}
      </Text>
      <Text variant="bodySmall" style={styles.buttonSubtitle}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: 120,
  },
  subheader: {
    marginBottom: Spacing.lg,
  },
  buttons: { 
    marginBottom: Spacing.md,
  },
  button: { 
    padding: Spacing.lg,
    borderRadius: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonTitle: {
    fontWeight: '600',
    color: '#fff',
    marginBottom: Spacing.xs,
  },
  buttonSubtitle: {
    color: '#fff',
    opacity: 0.8,
  },
  logCard: {
    marginTop: Spacing.md,
  },
  logContainer: { 
    maxHeight: 300,
  },
  logLine: { 
    marginBottom: 6,
    fontFamily: 'monospace',
  },
  emptyLog: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: Spacing.xl,
  }
});


