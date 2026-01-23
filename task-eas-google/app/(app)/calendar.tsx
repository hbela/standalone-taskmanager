import { useTasks } from '@/hooks/useTasksQuery';
import { useTranslation } from '@/hooks/useTranslation';
import { Task } from '@/types/task';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';

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
        dotColor: hasOverdue ? '#FF3B30' : hasCompleted ? '#34C759' : '#007AFF',
      };
    });
    
    // Mark selected date
    marked[selectedDate] = {
      ...marked[selectedDate],
      selected: true,
      selectedColor: '#007AFF',
    };
    
    return marked;
  }, [tasksByDate, selectedDate]);

  const renderTask = ({ item: task }: { item: Task }) => {
    const isOverdue = !task.completed && new Date(task.dueDate!) < new Date();
    
    return (
      <TouchableOpacity
        style={[
          styles.taskCard,
          task.completed && styles.taskCardCompleted,
          isOverdue && styles.taskCardOverdue,
        ]}
        onPress={() => router.push(`/task/${task.id}`)}
      >
        <View style={styles.taskHeader}>
          <View style={styles.taskTitleRow}>
            <Ionicons
              name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
              size={24}
              color={
                task.completed
                  ? '#34C759'
                  : isOverdue
                  ? '#FF3B30'
                  : '#007AFF'
              }
            />
            <Text
              style={[
                styles.taskTitle,
                task.completed && styles.taskTitleCompleted,
              ]}
              numberOfLines={1}
            >
              {task.title}
            </Text>
          </View>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(task.priority) },
            ]}
          >
            <Text style={styles.priorityText}>
              {task.priority.toUpperCase()}
            </Text>
          </View>
        </View>
        {task.description && (
          <Text style={styles.taskDescription} numberOfLines={2}>
            {task.description}
          </Text>
        )}
        {task.contact && (
          <View style={styles.contactInfo}>
            <Ionicons name="person-outline" size={14} color="#666" />
            <Text style={styles.contactText}>{task.contact.fullName}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Ionicons name="calendar-outline" size={64} color="#C7C7CC" />
      <Text style={styles.emptyText}>{t('calendar.noTasks')}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{t('common.loading')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: '#007AFF',
          todayTextColor: '#FF3B30',
          dotColor: '#007AFF',
          textDayFontWeight: '500',
          textMonthFontWeight: '600',
          textDayHeaderFontWeight: '500',
        }}
      />
      
      <View style={styles.tasksSection}>
        <Text style={styles.sectionTitle}>
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

function getPriorityColor(priority: string) {
  switch (priority.toLowerCase()) {
    case 'urgent':
      return '#FF3B30';
    case 'high':
      return '#FF9500';
    case 'medium':
      return '#007AFF';
    case 'low':
      return '#34C759';
    default:
      return '#8E8E93';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasksSection: {
    flex: 1,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  tasksList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  taskCardCompleted: {
    opacity: 0.6,
    backgroundColor: '#F5F5F7',
  },
  taskCardOverdue: {
    borderColor: '#FF3B30',
    borderWidth: 2,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  taskTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    flex: 1,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginLeft: 32,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 32,
    gap: 4,
  },
  contactText: {
    fontSize: 12,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 16,
  },
});
