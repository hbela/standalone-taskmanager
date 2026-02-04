import ErrorMessage from '@/components/ErrorMessage';
import LoadingSpinner from '@/components/LoadingSpinner';
import TaskForm from '@/components/TaskForm';
import { useTask, useUpdateTask } from '@/hooks/useTasksQuery';
import { useTranslation } from '@/hooks/useTranslation';
import { UpdateTaskInput } from '@/types/task';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
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

  const handleSubmit = async (data: UpdateTaskInput) => {
    try {
      await updateTaskMutation.mutateAsync({
        id: Number(id),
        data,
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
