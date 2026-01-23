import ErrorMessage from '@/components/ErrorMessage';
import ExportButton from '@/components/ExportButton';
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
    Modal,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function TasksScreen() {
  const { t, _key } = useTranslation();
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

  const handleExport = async () => {
    if (filteredTasks.length === 0) {
      Alert.alert(t('export.title'), t('export.noTasks'));
      return;
    }

    Alert.alert(
      t('export.title'),
      filteredTasks.length === 1 
        ? t('export.confirmSingle')
        : t('export.confirm', { count: filteredTasks.length }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('export.button'),
          onPress: async () => {
            setIsExporting(true);
            try {
              // Generate Excel file
              console.log('📊 Generating Excel file...');
              const fileUri = await exportTasksToExcel(filteredTasks);
              const fileName = getFileNameFromUri(fileUri);
              
              // Upload to Google Drive
              console.log('☁️ Uploading to Google Drive...');
              const result = await uploadToGoogleDrive(fileUri, fileName);
              
              // Show success with option to view in Drive
              Alert.alert(
                t('common.success'),
                t('export.successWithLink'),
                [
                  { text: t('common.done'), style: 'default' },
                  {
                    text: t('export.viewInDrive'),
                    onPress: () => {
                      if (result.webViewLink) {
                        Linking.openURL(result.webViewLink);
                      }
                    }
                  }
                ]
              );
            } catch (error) {
              console.error('Export error:', error);
              const errorMessage = error instanceof Error ? error.message : t('export.error');
              Alert.alert(t('common.error'), errorMessage);
            } finally {
              setIsExporting(false);
            }
          }
        }
      ]
    );
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
      <View style={styles.container} key={`container-${_key}`}>
        {/* Custom Header */}
        <View style={styles.customHeader} key={`header-${_key}`}>
          {/* Title Row: Centered with Export Button */}
          <View style={styles.titleRow}>
            <Text style={styles.pageTitle} key={`title-${_key}-${forceRender}`}>
              {pageTitle}
            </Text>
            <View style={styles.headerActions}>
              <ExportButton
                onPress={handleExport}
                isExporting={isExporting}
                taskCount={filteredTasks.length}
              />
            </View>
          </View>
        </View>

        {/* Search and Filter Bar */}
        <View style={styles.header} key={`search-filter-${_key}`}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              key={`search-input-${_key}-${forceRender}`}
              style={styles.searchInput}
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Filter Chips */}
          <View style={styles.filterContainer} key={`filters-${_key}`}>
            {(['all', 'pending', 'overdue', 'completed'] as const).map((filterType) => (
              <TouchableOpacity
                key={`${filterType}-${_key}`}
                onPress={() => setFilter(filterType)}
                style={[
                  styles.filterChip,
                  filter === filterType && styles.filterChipActive
                ]}
              >
                <Text style={[
                  styles.filterChipText,
                  filter === filterType && styles.filterChipTextActive
                ]}>
                  {filterType === 'all' ? t('tasks.filterAll') :
                   filterType === 'pending' ? t('tasks.filterPending') :
                   filterType === 'overdue' ? t('tasks.filterOverdue') :
                   t('tasks.filterCompleted')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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

      {/* Export Loading Overlay */}
      <Modal
        visible={isExporting}
        transparent
        animationType="fade"
      >
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>{t('export.uploading')}</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  customHeader: {
    backgroundColor: 'white',
    paddingTop: 50, // Account for status bar
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  titleRow: {
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerActions: {
    marginLeft: 12,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  filterChipActive: {
    backgroundColor: '#007AFF',
  },
  filterChipText: {
    color: '#666',
    fontWeight: '400',
  },
  filterChipTextActive: {
    color: 'white',
    fontWeight: '600',
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
  footerLoading: {
    padding: 20,
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
  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 200,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '500',
  },
});
