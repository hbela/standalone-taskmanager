import TaskForm from '@/components/TaskForm';
import { useCreateTask } from '@/hooks/useTasksQuery';
import { useTranslation } from '@/hooks/useTranslation';
import { CreateTaskInput, UpdateTaskInput } from '@/types/task';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Dialog, Paragraph, Portal } from 'react-native-paper';

export default function CreateTaskScreen() {
  const router = useRouter();
  const createTaskMutation = useCreateTask();
  const { t, _key } = useTranslation();

  // Dialog state
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState<'success' | 'error'>('success');

  // Force re-render when language changes
  const [renderKey, setRenderKey] = useState(0);
  
  useEffect(() => {
    console.log('[CreateTaskScreen] Language key changed:', _key);
    setRenderKey(prev => prev + 1);
  }, [_key]);

  // Also force update when tab becomes focused
  useFocusEffect(
    useCallback(() => {
      console.log('[CreateTaskScreen] Tab focused, renderKey:', renderKey);
      setRenderKey(prev => prev + 1);
    }, [])
  );

  const submitLabel = t('tasks.createTask');

  const handleSubmit = async (data: CreateTaskInput | UpdateTaskInput) => {
    try {
      await createTaskMutation.mutateAsync(data as CreateTaskInput);
      
      setDialogTitle(t('common.success'));
      setDialogMessage(t('tasks.createSuccess'));
      setDialogType('success');
      setDialogVisible(true);

    } catch (error: any) {
      setDialogTitle(t('common.error'));
      setDialogMessage(error.message || t('errors.createTask'));
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

  return (
    <View style={styles.container} key={`create-screen-${renderKey}`}>
      <Appbar.Header elevated>
        <Appbar.Content title={t('tasks.create')} />
      </Appbar.Header>

      <TaskForm
        key={`create-form-${renderKey}`}
        onSubmit={handleSubmit}
        submitLabel={submitLabel}
        loading={createTaskMutation.isPending}
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
    backgroundColor: '#F5F5F7',
  },
});
