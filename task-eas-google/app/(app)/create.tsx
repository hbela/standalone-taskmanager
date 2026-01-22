import TaskForm from '@/components/TaskForm';
import { useCreateTask } from '@/hooks/useTasksQuery';
import { useTranslation } from '@/hooks/useTranslation';
import { CreateTaskInput, UpdateTaskInput } from '@/types/task';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export default function CreateTaskScreen() {
  const router = useRouter();
  const createTaskMutation = useCreateTask();
  const { t, _key } = useTranslation();

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
  console.log('[CreateTaskScreen] Render - _key:', _key, 'renderKey:', renderKey, 'submitLabel:', submitLabel);

  const handleSubmit = async (data: CreateTaskInput | UpdateTaskInput) => {
    try {
      await createTaskMutation.mutateAsync(data as CreateTaskInput);
      
      Alert.alert(
        t('common.success'),
        t('tasks.createSuccess'),
        [
          {
            text: t('common.done'),
            onPress: () => router.push('/(app)')
          }
        ]
      );
    } catch (error: any) {
      Alert.alert(
        t('common.error'),
        error.message || t('errors.createTask')
      );
    }
  };

  return (
    <View style={styles.container} key={`create-screen-${renderKey}`}>
      <TaskForm
        key={`create-form-${renderKey}`}
        onSubmit={handleSubmit}
        submitLabel={submitLabel}
        loading={createTaskMutation.isPending}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
});
