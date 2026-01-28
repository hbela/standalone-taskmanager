import ContactDisplay from '@/components/ContactDisplay';
import ErrorMessage from '@/components/ErrorMessage';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useDeleteTask, useTask, useToggleTaskComplete } from '@/hooks/useTasksQuery';
import { useTranslation } from '@/hooks/useTranslation';
import { getStatusColor, getStatusLabel, getTaskStatus } from '@/lib/taskUtils';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Appbar, Button, Card, Chip, Divider, Text, useTheme } from 'react-native-paper';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();
  
  // Fetch task with TanStack Query
  const { data: task, isLoading, error, refetch } = useTask(Number(id));
  
  // Mutations
  const deleteTaskMutation = useDeleteTask();
  const toggleCompleteMutation = useToggleTaskComplete();

  const handleDelete = () => {
    Alert.alert(
      t('tasks.deleteConfirmTitle'),
      t('tasks.deleteConfirmMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('tasks.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTaskMutation.mutateAsync(Number(id));
              router.push('/(app)');
            } catch (err) {
              Alert.alert(t('common.error'), t('tasks.deleteError'));
            }
          }
        }
      ]
    );
  };

  const handleToggleComplete = async () => {
    if (!task) return;
    try {
      await toggleCompleteMutation.mutateAsync({
        id: task.id,
        completed: !task.completed,
      });
      // Redirect to task list after toggling
      router.push('/(app)');
    } catch (err) {
      Alert.alert(t('common.error'), t('tasks.updateError'));
    }
  };

  if (isLoading) {
    return <LoadingSpinner message={t('tasks.loadingTask')} />;
  }

  if (error || !task) {
    return (
      <ErrorMessage
        message={error?.message || t('tasks.taskNotFound')}
        onRetry={() => refetch()}
      />
    );
  }

  const taskStatus = getTaskStatus(task);
  const statusColor = getStatusColor(taskStatus);
  const statusLabel = getStatusLabel(taskStatus, t);

  const priorityColors = {
      urgent: '#FF3B30',
      high: '#FF9500',
      medium: '#007AFF',
      low: '#34C759',
  };
  const priorityColor = priorityColors[task.priority as keyof typeof priorityColors] || '#8E8E93';

  return (
    <View style={styles.container}>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => router.push('/(app)')} />
        <Appbar.Content title={t('tasks.taskDetails')} />
        <Appbar.Action icon="pencil" onPress={() => router.push(`/(app)/task/edit/${id}`)} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Header Card */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.headerRow}>
               <Text variant="headlineSmall" style={[
                 styles.title, 
                 task.completed && { textDecorationLine: 'line-through', color: theme.colors.onSurfaceDisabled }
               ]}>
                 {task.title}
               </Text>
            </View>
            
            <View style={styles.chipRow}>
              <Chip 
                mode="flat" 
                style={{ backgroundColor: statusColor + '20' }}
                textStyle={{ color: statusColor }}
              >
                {statusLabel}
              </Chip>
              <Chip 
                  mode="outlined"
                  textStyle={{ color: priorityColor }}
                  style={{ borderColor: priorityColor }}
              >
                  {t(`tasks.priorities.${task.priority}`).toUpperCase()}
              </Chip>
            </View>
          </Card.Content>
        </Card>

        {/* Description & Details Card */}
        <Card style={styles.card}>
          <Card.Content style={{ gap: 16 }}>
             {task.description && (
               <View>
                 <Text variant="titleMedium" style={{ marginBottom: 4 }}>{t('tasks.description')}</Text>
                 <Text variant="bodyLarge">{task.description}</Text>
               </View>
             )}
             
             {task.description && <Divider />}

             <View style={styles.detailRow}>
                 <Ionicons name="calendar-outline" size={20} color={theme.colors.secondary} />
                 <View style={{ flex: 1 }}>
                     <Text variant="labelMedium">{t('tasks.dueDate')}</Text>
                     <Text variant="bodyMedium">
                         {task.dueDate ? new Date(task.dueDate).toLocaleString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true
                         }) : t('common.no')}
                     </Text>
                 </View>
             </View>

             <View style={styles.detailRow}>
                 <Ionicons name="time-outline" size={20} color={theme.colors.secondary} />
                 <View style={{ flex: 1 }}>
                     <Text variant="labelMedium">{t('tasks.created')}</Text>
                     <Text variant="bodyMedium">
                         {new Date(task.createdAt).toLocaleString('en-US', {
                             month: 'short', day: 'numeric', year: 'numeric'
                         })}
                     </Text>
                 </View>
             </View>

             {task.updatedAt !== task.createdAt && (
               <View style={styles.detailRow}>
                   <Ionicons name="create-outline" size={20} color={theme.colors.secondary} />
                   <View style={{ flex: 1 }}>
                       <Text variant="labelMedium">{t('tasks.updated')}</Text>
                       <Text variant="bodyMedium">
                           {new Date(task.updatedAt).toLocaleString('en-US', {
                               month: 'short', day: 'numeric', year: 'numeric'
                           })}
                       </Text>
                   </View>
               </View>
             )}
          </Card.Content>
        </Card>

        {/* Contact Section */}
        {task.contactId && (
          <Card style={styles.card}>
            <Card.Title title={t('tasks.contact')} />
            <Card.Content>
               <ContactDisplay contactId={task.contactId} showActions={true} />
            </Card.Content>
          </Card>
        )}

        {/* Actions */}
        <View style={styles.actions}>
            <Button 
                mode="contained" 
                icon={task.completed ? "close" : "check"}
                onPress={handleToggleComplete}
                buttonColor={task.completed ? theme.colors.primary : "#34C759"}
                style={styles.button}
                contentStyle={styles.buttonContent}
            >
                {task.completed ? t('tasks.markPending') : t('tasks.markComplete')}
            </Button>

            <Button 
                mode="contained"
                icon="pencil"
                onPress={() => router.push(`/(app)/task/edit/${id}`)}
                style={styles.button}
                contentStyle={styles.buttonContent}
            >
                {t('tasks.editTask')}
            </Button>

            <Button 
                mode="contained" 
                icon="delete"
                onPress={handleDelete}
                buttonColor={theme.colors.error}
                style={styles.button}
                contentStyle={styles.buttonContent}
            >
                {t('tasks.deleteTask')}
            </Button>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    flex: 1,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  actions: {
      gap: 12,
      marginTop: 8,
  },
  button: {
      borderRadius: 8,
  },
  buttonContent: {
      height: 48,
  }
});
