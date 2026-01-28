import { useTasks } from '@/hooks/useTasksQuery';
import { useTranslation } from '@/hooks/useTranslation';
import { Task } from '@/types/task';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
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
                textStyle={{ fontSize: 10, lineHeight: 10 }}
                style={{ backgroundColor: getPriorityColor(task.priority), height: 24 }}
            >
                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{task.priority.toUpperCase()}</Text>
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
      <Ionicons name="calendar-outline" size={64} color="#C7C7CC" />
      <Text variant="bodyLarge" style={styles.emptyText}>{t('calendar.noTasks')}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 16 }}>{t('common.loading')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header elevated>
        <Appbar.Content title={t('calendar.title')} />
      </Appbar.Header>

      <Card style={styles.calendarCard} mode="elevated">
        <Card.Content style={{ padding: 0 }}>
            <Calendar
                current={selectedDate}
                onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
                markedDates={markedDates}
                theme={{
                selectedDayBackgroundColor: theme.colors.primary,
                todayTextColor: theme.colors.error,
                dotColor: theme.colors.primary,
                textDayFontWeight: '500',
                textMonthFontWeight: '600',
                textDayHeaderFontWeight: '500',
                }}
            />
        </Card.Content>
      </Card>
      
      <View style={styles.tasksSection}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          {new Date(selectedDate).toLocaleDateString(t('common.locale'), {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <FlatList
          data={selectedTasks}
          renderItem={renderTask}
          keyExtractor={(item) => `task-${item.id}`}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.tasksList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarCard: {
      margin: 16,
      backgroundColor: 'white', 
      borderRadius: 12,
      overflow: 'hidden',
  },
  tasksSection: {
    flex: 1,
    paddingTop: 16,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  tasksList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  taskCard: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  taskTitle: {
    flex: 1,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  taskDescription: {
    marginTop: 4,
    marginLeft: 32,
    opacity: 0.7,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 32,
    gap: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    color: '#8E8E93',
    marginTop: 16,
  },
});
