import ErrorMessage from '@/components/ErrorMessage';
import LoadingSpinner from '@/components/LoadingSpinner';
import TaskCard from '@/components/TaskCard';
import { useDeleteTask, useTasks, useToggleTaskComplete } from '@/hooks/useTasksQuery';
import { useTranslation } from '@/hooks/useTranslation';
import { exportTasksToExcel, getFileNameFromUri } from '@/lib/export/excelExporter';
import { uploadToGoogleDrive } from '@/lib/export/googleDriveService';
import { isTaskOverdue } from '@/lib/taskUtils';
import { Task } from '@/types/task';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Appbar, Button, Chip, Dialog, Paragraph, Portal, Searchbar, useTheme } from 'react-native-paper';

export default function TasksScreen() {
  const { t, _key } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'overdue' | 'completed'>('pending');
  const [forceRender, setForceRender] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  
  // State for translated text to force updates
  const [pageTitle, setPageTitle] = useState(t('tasks.title'));
  const [searchPlaceholder, setSearchPlaceholder] = useState(t('tasks.searchPlaceholder'));

  // Force re-render when language changes
  React.useEffect(() => {
    setForceRender(prev => prev + 1);
    // Update text state to force React Native to recognize the change
    setPageTitle(t('tasks.title'));
    setSearchPlaceholder(t('tasks.searchPlaceholder'));
    console.log('[TasksScreen] Updated text state:', {
      title: t('tasks.title'),
      placeholder: t('tasks.searchPlaceholder'),
    });
  }, [_key, t]);

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [exportDialogVisible, setExportDialogVisible] = useState(false);
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);
  const [exportResult, setExportResult] = useState<{ webViewLink?: string } | null>(null);
  const [exportError, setExportError] = useState('');

  // Debug logging
  console.log('[TasksScreen] Rendering with key:', _key, 'forceRender:', forceRender);
  console.log('[TasksScreen] Current translations:', {
    title: t('tasks.title'),
    searchPlaceholder: t('tasks.searchPlaceholder'),
    filterPending: t('tasks.filterPending'),
  });
  console.log('[TasksScreen] State values:', { pageTitle, searchPlaceholder });

  // Fetch tasks with TanStack Query
  const { data, isLoading, error, refetch, isRefetching } = useTasks({
    status: filter === 'all' || filter === 'overdue' ? undefined : filter,
  });

  // Mutations
  const deleteTaskMutation = useDeleteTask();
  const toggleCompleteMutation = useToggleTaskComplete();

  const tasks = data?.tasks || [];

  const handleDelete = (task: Task) => {
    Alert.alert(
      t('tasks.delete'),
      t('tasks.deleteConfirm', { title: task.title }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTaskMutation.mutateAsync(task.id);
            } catch (err) {
              Alert.alert(t('common.error'), t('errors.deleteTask'));
            }
          }
        }
      ]
    );
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      await toggleCompleteMutation.mutateAsync({
        id: task.id,
        completed: !task.completed,
      });
    } catch (err) {
      Alert.alert(t('common.error'), t('errors.updateTask'));
    }
  };

  const handleExport = () => {
    if (filteredTasks.length === 0) {
      Alert.alert(t('export.title'), t('export.noTasks'));
      return;
    }
    setExportDialogVisible(true);
  };

  const performExport = async () => {
    setExportDialogVisible(false);
    setIsExporting(true);
    try {
      // Generate Excel file
      console.log('📊 Generating Excel file...');
      const fileUri = await exportTasksToExcel(filteredTasks);
      const fileName = getFileNameFromUri(fileUri);
      
      // Upload to Google Drive
      console.log('☁️ Uploading to Google Drive...');
      const result = await uploadToGoogleDrive(fileUri, fileName);
      
      setExportResult(result);
      setSuccessDialogVisible(true);
      
    } catch (error) {
      console.error('Export error:', error);
      const errorMessage = error instanceof Error ? error.message : t('export.error');
      setExportError(errorMessage);
      setErrorDialogVisible(true);
    } finally {
      setIsExporting(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    // Search filter
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    // Status filter
    if (filter === 'pending') {
      // Pending: not completed AND not overdue
      return !task.completed && !isTaskOverdue(task);
    } else if (filter === 'overdue') {
      // Overdue: not completed AND overdue
      return !task.completed && isTaskOverdue(task);
    }
    
    // 'all' and 'completed' filters handled by backend
    return true;
  });

  const renderTask = ({ item }: { item: Task }) => (
    <TaskCard
      task={item}
      onPress={() => router.push(`/(app)/task/${item.id}`)}
      onToggleComplete={() => handleToggleComplete(item)}
    />
  );


  const renderEmpty = () => {
    if (isLoading) return null;
    
    return (
      <View style={styles.emptyContainer} key={`empty-${_key}`}>
        <Ionicons name="checkmark-done-circle" size={64} color="#ccc" />
        <Text style={styles.emptyText} key={`empty-text-${_key}`}>
          {searchQuery
            ? t('tasks.noSearchResults')
            : filter === 'completed' 
            ? t('tasks.noCompletedTasks')
            : filter === 'pending'
            ? t('tasks.noPendingTasks')
            : filter === 'overdue'
            ? t('tasks.noOverdueTasks')
            : t('tasks.emptyHint')}
        </Text>
        {!searchQuery && filter === 'all' && (
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push('/(app)/create')}
          >
            <Text style={styles.createButtonText} key={`create-btn-${_key}`}>{t('tasks.create')}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (isLoading) {
    return <LoadingSpinner message={t('common.loading')} />;
  }

  if (error && tasks.length === 0) {
    return (
      <ErrorMessage
        message={error.message || t('errors.loadTasks')}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]} key={`container-${_key}`}>
        {isSearchVisible ? (
          <Appbar.Header elevated>
            <Searchbar
              placeholder={searchPlaceholder}
              onChangeText={setSearchQuery}
              value={searchQuery}
              icon="arrow-left"
              onIconPress={() => {
                setIsSearchVisible(false);
                setSearchQuery('');
              }}
              style={styles.searchBar}
            />
          </Appbar.Header>
        ) : (
          <Appbar.Header elevated>
            <Appbar.Content title={pageTitle} />
            <Appbar.Action icon="magnify" onPress={() => setIsSearchVisible(true)} />
            {filter === 'completed' && (
              <Appbar.Action 
                 icon="cloud-upload"
                 onPress={handleExport} 
                 disabled={isExporting} 
              />
            )}
          </Appbar.Header>
        )}

        {/* Filter Chips */}
        <View style={[styles.filterContainer, { backgroundColor: theme.colors.background }]} key={`filters-${_key}`}>
          {(['all', 'pending', 'overdue', 'completed'] as const).map((filterType) => (
            <Chip
              key={`${filterType}-${_key}`}
              selected={filter === filterType}
              onPress={() => setFilter(filterType)}
              style={styles.filterChip}
              showSelectedOverlay
            >
                {filterType === 'all' ? t('tasks.filterAll') :
                 filterType === 'pending' ? t('tasks.filterPending') :
                 filterType === 'overdue' ? t('tasks.filterOverdue') :
                 t('tasks.filterCompleted')}
            </Chip>
          ))}
        </View>

        {/* Task List */}
        <FlatList
          key={`task-list-${_key}`}
          data={filteredTasks}
          renderItem={renderTask}
          keyExtractor={(item) => `task-${item.id}-${_key}`}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          extraData={`${_key}-${forceRender}`}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />
          }
        />

        {/* Error Banner */}
        {error && tasks.length > 0 && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{error.message || 'An error occurred'}</Text>
            <TouchableOpacity onPress={() => refetch()}>
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Export Confirmation Dialog */}
      <Portal>
        <Dialog 
          visible={exportDialogVisible} 
          onDismiss={() => setExportDialogVisible(false)}
          style={[styles.dialog, { backgroundColor: theme.colors.surface }]}
        >
          <Dialog.Title style={styles.dialogTitle}>{t('export.title')}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              {filteredTasks.length === 1 
                ? t('export.confirmCompletedSingle')
                : t('export.confirmCompleted', { count: filteredTasks.length })}
            </Paragraph>
            <Paragraph style={{ marginTop: 8, fontStyle: 'italic' }}>
              {t('export.backupNote')}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setExportDialogVisible(false)}>{t('common.cancel')}</Button>
            <Button onPress={performExport}>{t('export.button')}</Button>
          </Dialog.Actions>
        </Dialog>

        {/* Success Dialog */}
        <Dialog 
          visible={successDialogVisible} 
          onDismiss={() => setSuccessDialogVisible(false)}
          style={[styles.dialog, { backgroundColor: theme.colors.surface }]}
        >
          <Dialog.Title style={styles.dialogTitle}>{t('common.success')}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{t('export.successWithLink')}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setSuccessDialogVisible(false)}>{t('common.done')}</Button>
            {exportResult?.webViewLink && (
              <Button onPress={() => {
                if (exportResult.webViewLink) {
                  Linking.openURL(exportResult.webViewLink);
                }
                setSuccessDialogVisible(false);
              }}>
                {t('export.viewInDrive')}
              </Button>
            )}
          </Dialog.Actions>
        </Dialog>

        {/* Error Dialog */}
        <Dialog 
          visible={errorDialogVisible} 
          onDismiss={() => setErrorDialogVisible(false)}
          style={[styles.dialog, { backgroundColor: theme.colors.surface }]}
        >
          <Dialog.Title style={styles.dialogTitle}>{t('common.error')}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{exportError}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setErrorDialogVisible(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>

        {/* Loading Dialog */}
        <Dialog 
          visible={isExporting} 
          dismissable={false}
          style={[styles.dialog, { backgroundColor: theme.colors.surface }]}
        >
          <Dialog.Content style={styles.loadingContent}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={[styles.loadingText, { color: theme.colors.onSurface }]}>{t('export.uploading')}</Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flex: 1,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
  },
  filterChip: {
    marginRight: 4,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  createButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF3B30',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  errorBannerText: {
    flex: 1,
    color: 'white',
    marginRight: 12,
  },
  dialog: {
    borderRadius: 12,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '500',
  },
});
