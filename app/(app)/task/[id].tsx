import ContactDisplay from '@/components/ContactDisplay';
import ErrorMessage from '@/components/ErrorMessage';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Spacing } from '@/constants/theme';
import { useDeleteTask, useTask, useToggleTaskComplete } from '@/hooks/useTasksQuery';
import { useTranslation } from '@/hooks/useTranslation';
import { getStatusColor, getStatusLabel, getTaskStatus } from '@/lib/taskUtils';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { Appbar, Button, Card, Dialog, Divider, List, Paragraph, Portal, Text, useTheme } from 'react-native-paper';

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
  
  // Dialog state
  const [deleteDialogVisible, setDeleteDialogVisible] = React.useState(false);

  const handleDelete = () => {
    setDeleteDialogVisible(true);
  };
  
  const handleConfirmDelete = async () => {
    setDeleteDialogVisible(false);
    try {
      await deleteTaskMutation.mutateAsync(Number(id));
      router.push('/(app)');
    } catch (err) {
      Alert.alert(t('common.error'), t('tasks.deleteError'));
    }
  };

  const handleToggleComplete = async () => {
    if (!task) return;
    try {
      await toggleCompleteMutation.mutateAsync({
        id: task.id,
        completed: !task.completed,
      });
      // Redirect to task list after toggling - Removed to allow seeing completion date
      // router.push('/(app)');
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
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => router.push('/(app)')} />
        <Appbar.Content title={t('tasks.taskDetails')} />
        <Appbar.Action icon="pencil" onPress={() => router.push(`/(app)/task/edit/${id}`)} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Header Card */}
        <Card style={styles.card}>
          <Card.Content>
            {/* Title Section */}
            <View style={styles.inlineFieldRow}>
              <Text 
                variant="titleMedium" 
                style={[styles.fieldLabel, { color: theme.colors.primary }]}
              >
                {t('tasks.titleLabel')}:{' '}
              </Text>
              <Text variant="bodyLarge" style={[
                styles.inlineFieldValue,
                { color: theme.colors.onSurface },
                task.completed && { textDecorationLine: 'line-through', color: theme.colors.onSurfaceDisabled }
              ]}>
                {task.title}
              </Text>
            </View>
            
            {/* Status Section */}
            <View style={styles.inlineFieldRow}>
              <Text 
                variant="titleMedium" 
                style={[styles.fieldLabel, { color: theme.colors.primary }]}
              >
                {t('tasks.statusLabel')}:{' '}
              </Text>
              <Text 
                variant="bodyLarge"
                style={{ color: statusColor, fontSize: 11, lineHeight: 11, textTransform: 'uppercase' }}
              >
                {statusLabel}
              </Text>
            </View>
            
            {/* Priority Section */}
            <View style={styles.inlineFieldRow}>
              <Text 
                variant="titleMedium" 
                style={[styles.fieldLabel, { color: theme.colors.primary }]}
              >
                {t('tasks.priorityLabel')}:{' '}
              </Text>
              <Text 
                variant="bodyLarge"
                style={{ color: priorityColor, fontSize: 11, lineHeight: 11, textTransform: 'uppercase' }}
              >
                {t(`tasks.priorities.${task.priority}`)}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Description & Details Card */}
        <Card style={styles.card}>
          <Card.Content style={styles.detailsContent}>
             {task.description && (
               <View>
                 <Text 
                   variant="titleMedium" 
                   style={[styles.sectionTitle, { color: theme.colors.primary }]}
                 >
                   {t('tasks.description')}
                 </Text>
                 <Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>
                   {task.description}
                 </Text>
               </View>
             )}
             
             {task.description && <Divider style={styles.divider} />}
 
             {task.comment && (
               <View>
                 <Text 
                   variant="titleMedium" 
                   style={[styles.sectionTitle, { color: theme.colors.primary }]}
                 >
                   {t('tasks.comment')}
                 </Text>
                 <Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>
                   {task.comment}
                 </Text>
               </View>
             )}
             
             {task.comment && <Divider style={styles.divider} />}

             {task.bill && (
               <List.Item
                   title={t('form.bill')}
                   description={`${task.bill.toFixed(2)} ${task.billCurrency || 'USD'}`}
                   left={props => <List.Icon {...props} icon="currency-usd" color={theme.colors.primary} />}
                   titleStyle={[styles.listItemTitle, { color: theme.colors.primary }]}
                   descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface, fontWeight: '600' }]}
               />
             )}

             <List.Item
                 title={t('tasks.dueDate')}
                 description={task.dueDate ? new Date(task.dueDate).toLocaleString(t('common.locale'), {
                    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
                 }) : t('common.no')}
                 left={props => <List.Icon {...props} icon="calendar-outline" color={theme.colors.primary} />}
                 titleStyle={[styles.listItemTitle, { color: theme.colors.primary }]}
                 descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
             />

             <List.Item
                 title={t('tasks.created')}
                 description={new Date(task.createdAt).toLocaleString(t('common.locale'), {
                     month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
                 })}
                 left={props => <List.Icon {...props} icon="clock-outline" color={theme.colors.primary} />}
                 titleStyle={[styles.listItemTitle, { color: theme.colors.primary }]}
                 descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
             />


             {task.completed && task.completedAt && (
               <List.Item
                   title={t('tasks.completed')}
                   description={new Date(task.completedAt).toLocaleString(t('common.locale'), {
                       month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
                   })}
                   left={props => <List.Icon {...props} icon="check-circle-outline" color={theme.colors.primary} />}
                   titleStyle={[styles.listItemTitle, { color: theme.colors.primary }]}
                   descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
               />
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
            {taskStatus !== 'completed' && (
                <Button 
                    mode="contained" 
                    icon="check"
                    onPress={handleToggleComplete}
                    buttonColor="#34C759"
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                >
                    {t('tasks.markComplete')}
                </Button>
            )}

            {taskStatus === 'pending' && (
                <Button 
                    mode="contained"
                    icon="pencil"
                    onPress={() => router.push(`/(app)/task/edit/${id}`)}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                >
                    {t('tasks.editTask')}
                </Button>
            )}

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
      
      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={() => setDeleteDialogVisible(false)}>
          <Dialog.Title>{t('tasks.deleteConfirmTitle')}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{t('tasks.deleteConfirmMessage')}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>{t('common.cancel')}</Button>
            <Button onPress={handleConfirmDelete} textColor={theme.colors.error}>{t('tasks.delete')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: 200,
    gap: Spacing.lg,
  },
  card: {
    borderRadius: Spacing.md,
  },
  inlineFieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    flexWrap: 'wrap',
  },
  fieldLabel: {
    fontWeight: '600',
  },
  inlineFieldValue: {
    flex: 1,
  },
  detailsContent: {
    gap: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.sm,
  },
  divider: {
    marginVertical: Spacing.sm,
  },
  listItemTitle: {
    // Use RNP default styling, no hardcoded fontSize
    color: undefined, // Will use theme.colors.onSurfaceVariant by default
  },
  listItemDescription: {
    // Use RNP default styling, no hardcoded fontSize
    marginTop: Spacing.xs,
  },
  detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
  },
  actions: {
      gap: Spacing.md,
      marginTop: Spacing.sm,
  },
  button: {
      borderRadius: Spacing.sm,
  },
  buttonContent: {
      height: 48,
  }
});
