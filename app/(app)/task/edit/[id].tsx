import ErrorMessage from '@/components/ErrorMessage';
import LoadingSpinner from '@/components/LoadingSpinner';
import ScreenshotCaptureButton from '@/components/ScreenshotCaptureButton';
import TaskForm from '@/components/TaskForm';
import { useTask, useUpdateTask } from '@/hooks/useTasksQuery';
import { useTranslation } from '@/hooks/useTranslation';
import { RecurrenceScope, UpdateTaskInput } from '@/types/task';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Appbar, Button, Dialog, Paragraph, Portal, useTheme } from 'react-native-paper';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t, _key } = useTranslation();
  const theme = useTheme();
  
  // Dialog state
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState<'success' | 'error'>('success');

  // Force re-render when language changes
  const [, forceUpdate] = useState(0);
  
  useEffect(() => {
    forceUpdate(prev => prev + 1);
  }, [_key]);
  
  // Fetch task data
  const { data: task, isLoading, error } = useTask(Number(id));
  
  // Update mutation
  const updateTaskMutation = useUpdateTask();

  const performUpdate = async (data: UpdateTaskInput, scope: RecurrenceScope = 'this') => {
    try {
      await updateTaskMutation.mutateAsync({
        id: Number(id),
        data,
        scope,
      });
      
      setDialogTitle(t('common.success'));
      setDialogMessage(t('tasks.updateSuccess'));
      setDialogType('success');
      setDialogVisible(true);

    } catch (error: any) {
      setDialogTitle(t('common.error'));
      setDialogMessage(error.message || t('tasks.updateError'));
      setDialogType('error');
      setDialogVisible(true);
    }
  };

  const handleSubmit = async (data: UpdateTaskInput) => {
    if (!task?.recurrenceSeriesId) {
      await performUpdate(data);
      return;
    }

    Alert.alert(
      t('tasks.recurringEditTitle', { defaultValue: 'Edit recurring task' }),
      t('tasks.recurringEditMessage', { defaultValue: 'Apply these changes to this task only, this and future tasks, or the entire series?' }),
      [
        { text: t('tasks.thisTaskOnly', { defaultValue: 'This task only' }), onPress: () => performUpdate(data, 'this') },
        { text: t('tasks.thisAndFuture', { defaultValue: 'This and future' }), onPress: () => performUpdate(data, 'future') },
        { text: t('tasks.entireSeries', { defaultValue: 'Entire series' }), onPress: () => performUpdate(data, 'series') },
        { text: t('common.cancel'), style: 'cancel' },
      ]
    );
  };

  const handleDialogDismiss = () => {
    setDialogVisible(false);
    if (dialogType === 'success') {
      router.push('/(app)');
    }
  };

  const handleCancel = () => {
    router.push('/(app)');
  };

  if (isLoading) {
    return <LoadingSpinner message={t('tasks.loadingTask')} />;
  }

  if (error || !task) {
    return (
      <ErrorMessage
        message={error?.message || t('tasks.taskNotFound')}
        onRetry={() => {}}
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header elevated>
          <Appbar.BackAction onPress={() => router.back()} />
          <Appbar.Content title={t('tasks.editTask')} />
          <ScreenshotCaptureButton screenName="edit_task" />
      </Appbar.Header>
      
      <TaskForm
        key={`edit-form-${_key}`}
        initialValues={{
          title: task.title,
          description: task.description || undefined,
          priority: task.priority,
          dueDate: task.dueDate || undefined,
          reminderTimes: task.reminderTimes || undefined,
          contactId: task.contactId || undefined,
          bill: task.bill || undefined,
          billCurrency: task.billCurrency || undefined,
          comment: task.comment || undefined,
          completed: task.completed,
          completedAt: task.completedAt,
          recurrence: task.recurrenceSeriesId && task.recurrenceFrequency ? {
            frequency: task.recurrenceFrequency,
            interval: task.recurrenceInterval || 1,
            weekdays: task.recurrenceWeekdays || undefined,
            startDate: task.dueDate || new Date().toISOString(),
            endDate: task.recurrenceEndDate || null,
            occurrenceCount: task.recurrenceOccurrenceCount || null,
          } : null,
        }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel={t('tasks.updateTask')}
        loading={updateTaskMutation.isPending}
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={handleDialogDismiss}>
          <Dialog.Title>{dialogTitle}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDialogDismiss}>
              {dialogType === 'success' ? t('common.done') : 'OK'}
            </Button>
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
});
