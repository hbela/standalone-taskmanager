import { Spacing } from '@/constants/theme';
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
            uncheckedColor={isOverdue ? '#FF3B30' : theme.colors.outline}
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
              textStyle={{ color: priorityColor, fontSize: 11, lineHeight: 11 }}
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
              <Ionicons name="calendar-outline" size={14} color={theme.colors.outline} />
              <Text variant="labelSmall" style={{ color: theme.colors.outline }}>
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
          <Ionicons name="chevron-forward" size={20} color={theme.colors.outlineVariant} />
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    marginHorizontal: Spacing.lg,
  },
  completedCard: {
    opacity: 0.7,
  },
  overdueCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  leftColumn: {
    marginRight: Spacing.sm,
  },
  mainContent: {
    flex: 1,
    gap: Spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  title: {
    flex: 1,
    marginRight: Spacing.sm,
    fontWeight: '600',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  priorityChip: {
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  dateText: {
  },
  rightColumn: {
    marginLeft: Spacing.sm,
    justifyContent: 'center',
  },
});
