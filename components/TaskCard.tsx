import { useTranslation } from '@/hooks/useTranslation';
import { isTaskOverdue } from '@/lib/taskUtils';
import { Task } from '@/types/task';
import { formatDateTime } from '@/utils/dateFormatter';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Checkbox, Chip, Text, useTheme } from 'react-native-paper';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggleComplete: () => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
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
};

export default function TaskCard({
  task,
  onPress,
  onToggleComplete
}: TaskCardProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isOverdue = isTaskOverdue(task);
  const priorityColor = getPriorityColor(task.priority);

  return (
    <Card
      style={[
        styles.card,
        task.completed && styles.completedCard,
        isOverdue && !task.completed && styles.overdueCard
      ]}
      onPress={onPress}
      mode="elevated"
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.leftColumn}>
          <Checkbox
            status={task.completed ? 'checked' : 'unchecked'}
            onPress={onToggleComplete}
            color={task.completed ? '#34C759' : theme.colors.primary}
            uncheckedColor={isOverdue ? '#FF3B30' : '#C7C7CC'}
          />
        </View>

        <View style={styles.mainContent}>
          <View style={styles.headerRow}>
            <Text
              variant="titleMedium"
              style={[
                styles.title,
                task.completed && styles.completedText
              ]}
              numberOfLines={2}
            >
              {task.title}
            </Text>
            <Chip
              textStyle={{ color: priorityColor, fontSize: 10, lineHeight: 10, marginVertical: 0, marginHorizontal: 0 }}
              style={[styles.priorityChip, { backgroundColor: priorityColor + '20', borderColor: priorityColor }]}
              compact
            >
              {task.priority.toUpperCase()}
            </Chip>
          </View>

          {task.description ? (
            <Text
              variant="bodyMedium"
              style={[
                styles.description,
                task.completed && styles.completedText
              ]}
              numberOfLines={2}
            >
              {task.description}
            </Text>
          ) : null}

          <View style={styles.footer}>
            <View style={styles.dateRow}>
              <Ionicons name="calendar-outline" size={14} color="#8E8E93" />
              <Text variant="labelSmall" style={styles.dateText}>
                {formatDateTime(task.createdAt)}
              </Text>
            </View>

            {task.dueDate && (
              <View style={styles.dateRow}>
                <Ionicons
                  name={isOverdue ? "alert-circle" : "alarm-outline"}
                  size={14}
                  color={isOverdue ? "#FF3B30" : "#FF9500"}
                />
                <Text
                  variant="labelSmall"
                  style={[
                    styles.dateText,
                    isOverdue ? { color: '#FF3B30', fontWeight: 'bold' } : { color: '#FF9500' }
                  ]}
                >
                  {formatDateTime(task.dueDate)}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.rightColumn}>
          <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    marginHorizontal: 16,
    backgroundColor: 'white',
  },
  completedCard: {
    opacity: 0.7,
    backgroundColor: '#F9F9F9',
  },
  overdueCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  leftColumn: {
    marginRight: 8,
  },
  mainContent: {
    flex: 1,
    gap: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    marginRight: 8,
    fontWeight: '600',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  priorityChip: {
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    color: '#3C3C43',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    color: '#8E8E93',
  },
  rightColumn: {
    marginLeft: 8,
    justifyContent: 'center',
  },
});
