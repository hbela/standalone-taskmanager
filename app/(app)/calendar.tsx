import ScreenshotCaptureButton from '@/components/ScreenshotCaptureButton';
import TaskCard from '@/components/TaskCard';
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
  // Helper to get local date string YYYY-MM-DD
  const toLocalISOString = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000;
    const localTime = new Date(date.getTime() - offset);
    return localTime.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(
    toLocalISOString(new Date())
  );

  // Set calendar locale based on current language
  useEffect(() => {
    const languageCode = t('common.languageCode');
    LocaleConfig.defaultLocale = languageCode;
  }, [t]);

  // Extract tasks array from response
  const tasks: Task[] = data?.tasks || [];

  // Group tasks by date for calendar dots
  const tasksByDate = useMemo(() => {
    const grouped: { [date: string]: Task[] } = {};
    
    tasks.forEach(task => {
      if (task.dueDate) {
        const dateKey = toLocalISOString(new Date(task.dueDate));
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        grouped[dateKey].push(task);
      }
    });
    
    return grouped;
  }, [tasks]);

  // Calculate displayed tasks: Overdue + Due Today
  const displayedTasks = useMemo(() => {
    const overdue: Task[] = [];
    const dueToday: Task[] = [];

    const getPriorityScore = (p: string) => {
      switch(p.toLowerCase()) {
        case 'urgent': return 3;
        case 'high': return 2;
        case 'medium': return 1;
        case 'low': return 0;
        default: return 0;
      }
    };

    const sortFn = (a: Task, b: Task) => {
      // First, sort by priority (descending - higher priority first)
      const priorityDiff = getPriorityScore(b.priority) - getPriorityScore(a.priority);
      if (priorityDiff !== 0) return priorityDiff;
      
      // If same priority, sort by due date (ascending - older dates first)
      const timeA = new Date(a.dueDate || 0).getTime();
      const timeB = new Date(b.dueDate || 0).getTime();
      return timeA - timeB;
    };

    tasks.forEach(task => {
        if (task.completed || !task.dueDate) return; // Do not display completed tasks

        const taskDateKey = toLocalISOString(new Date(task.dueDate));

        if (taskDateKey === selectedDate) {
            dueToday.push(task);
        } else if (taskDateKey < selectedDate) {
            overdue.push(task);
        }
    });

    overdue.sort(sortFn);
    dueToday.sort(sortFn);

    return [...overdue, ...dueToday];
  }, [tasks, selectedDate]);

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


  const renderTask = ({ item: task }: { item: Task }) => {
    return (
      <TaskCard
        task={task}
        onPress={() => router.push(`/task/${task.id}`)}
      />
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
        <ScreenshotCaptureButton screenName="calendar" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card style={styles.calendarCard} mode="contained">
            <Card.Content style={{ padding: 0, backgroundColor: theme.colors.surface }}>
                <Calendar
                    key={`${t('common.languageCode')}-${theme.dark}`}
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
                    textDisabledColor: theme.colors.onSurfaceDisabled,
                    }}
                />
            </Card.Content>
          </Card>
          
          <View style={styles.tasksSection}>
            <View style={styles.tasksHeader}>
              <Text variant="titleMedium" style={styles.tasksDueTitle}>
                {t('calendar.tasksDue')}
              </Text>
              <Text variant="bodyMedium" style={styles.dateSubtitle}>
                {new Date(selectedDate).toLocaleDateString(t('common.locale'), {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
            
            <View style={styles.tasksList}>
                {displayedTasks.length === 0 ? (
                    renderEmpty()
                ) : (
                    displayedTasks.map(task => (
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
      margin: Spacing.sm,
      borderRadius: Spacing.md,
      overflow: 'hidden',
  },
  tasksSection: {
  },
  tasksHeader: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  tasksDueTitle: {
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  dateSubtitle: {
    color: '#666',
  },
  tasksList: {
    paddingBottom: 120, // Keep for floating bottom navbar
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
