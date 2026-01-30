import { useTranslation } from '@/hooks/useTranslation';
import { getTaskStats } from '@/lib/db/tasksDb';
import React, { useEffect, useState } from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import {
    Appbar,
    Avatar,
    Card,
    Divider,
    List,
    Surface,
    Text,
    useTheme
} from 'react-native-paper';

interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  byPriority: Record<string, number>;
}

export default function ProfileScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    completed: 0,
    pending: 0,
    byPriority: {},
  });
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = async () => {
    try {
      const taskStats = await getTaskStats();
      setStats(taskStats);
    } catch (error) {
      console.error('Failed to load task stats:', error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  };

  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  const getPriorityColor = (priority: string): string => {
    switch (priority.toLowerCase()) {
      case 'urgent': return '#FF3B30';
      case 'high': return '#FF9F0A';
      case 'medium': return '#007AFF';
      case 'low': return '#34C759';
      default: return '#8E8E93';
    }
  };

  // Get localized priority label
  const getPriorityLabel = (priority: string): string => {
    const key = priority.toLowerCase() as 'low' | 'medium' | 'high' | 'urgent';
    // If we have a translation for this priority, use it, otherwise capitalize the key
    return t(`tasks.priorities.${key}`, { defaultValue: priority.charAt(0).toUpperCase() + priority.slice(1) });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header elevated>
        <Appbar.Content title={t('profile.title')} />
      </Appbar.Header>

      <ScrollView 
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* App Header Branding */}
        <Surface style={styles.brandingSection} elevation={1}>
            <Avatar.Icon size={80} icon="check-all" style={{ backgroundColor: theme.colors.primaryContainer }} />
            <Text variant="headlineMedium" style={[styles.appName, { color: theme.colors.onSurface }]}>{t('auth.appTitle')}</Text>
            <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>{t('welcome.subtitle')}</Text>
        </Surface>

        {/* Task Statistics */}
        <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>{t('profile.taskStats')}</Text>
            <View style={styles.statsGrid}>
                {/* Total */}
                <Card style={styles.statCard} mode="contained">
                    <Card.Content style={styles.statCardContent}>
                        <Avatar.Icon size={40} icon="format-list-bulleted" style={{ backgroundColor: theme.colors.secondaryContainer }} color={theme.colors.onSecondaryContainer} />
                        <Text variant="headlineMedium" style={styles.statValue}>{stats.total}</Text>
                        <Text variant="bodySmall">{t('profile.totalTasks')}</Text>
                    </Card.Content>
                </Card>
                
                {/* Completed */}
                <Card style={styles.statCard} mode="contained">
                    <Card.Content style={styles.statCardContent}>
                        <Avatar.Icon size={40} icon="check-circle-outline" style={{ backgroundColor: '#E8F5E9' }} color="#2E7D32" />
                        <Text variant="headlineMedium" style={styles.statValue}>{stats.completed}</Text>
                        <Text variant="bodySmall">{t('profile.completed')}</Text>
                    </Card.Content>
                </Card>

                {/* Pending */}
                <Card style={styles.statCard} mode="contained">
                    <Card.Content style={styles.statCardContent}>
                        <Avatar.Icon size={40} icon="clock-outline" style={{ backgroundColor: '#FFF3E0' }} color="#EF6C00" />
                        <Text variant="headlineMedium" style={styles.statValue}>{stats.pending}</Text>
                        <Text variant="bodySmall">{t('profile.pending')}</Text>
                    </Card.Content>
                </Card>

                {/* Completion Rate */}
                <Card style={styles.statCard} mode="contained">
                    <Card.Content style={styles.statCardContent}>
                        <Avatar.Icon size={40} icon="trending-up" style={{ backgroundColor: '#F3E5F5' }} color="#7B1FA2" />
                        <Text variant="headlineMedium" style={styles.statValue}>{completionRate}%</Text>
                        <Text variant="bodySmall">{t('profile.completion')}</Text>
                    </Card.Content>
                </Card>
            </View>
        </View>

        {/* Priority Breakdown */}
        {Object.keys(stats.byPriority).length > 0 && (
            <List.Section style={styles.sectionEntry}>
                <List.Subheader>{t('profile.tasksByPriority')}</List.Subheader>
                <Card mode="elevated">
                    <Card.Content style={{ padding: 0 }}>
                        {Object.entries(stats.byPriority).map(([priority, count], index) => (
                            <React.Fragment key={priority}>
                                {index > 0 && <Divider />}
                                <List.Item
                                    title={getPriorityLabel(priority)}
                                    left={() => <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(priority) }]} />}
                                    right={() => <Text variant="bodyLarge" style={{ alignSelf: 'center', fontWeight: 'bold' }}>{count}</Text>}
                                />
                            </React.Fragment>
                        ))}
                    </Card.Content>
                </Card>
            </List.Section>
        )}

        {/* App Info */}
        <List.Section style={styles.sectionEntry}>
            <List.Subheader>{t('profile.about')}</List.Subheader>
            <Card mode="elevated">
                 <Card.Content style={{ padding: 0 }}>
                    <List.Item
                        title={t('profile.version')}
                        description="1.0.0"
                        left={(props) => <List.Icon {...props} icon="information" />}
                    />
                    <Divider />
                    <List.Item
                        title={t('profile.storage')}
                        description="Local SQLite Database"
                        left={(props) => <List.Icon {...props} icon="database" />}
                    />
                 </Card.Content>
            </Card>
        </List.Section>

        <View style={styles.footer}>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>{t('profile.madeWithLove')}</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  brandingSection: {
    padding: 32,
    alignItems: 'center',
    marginBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  appName: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionEntry: {
      paddingHorizontal: 16,
      marginBottom: 0,
  },
  sectionTitle: {
      marginBottom: 12,
      fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%', // Approx 2 column
  },
  statCardContent: {
      alignItems: 'center',
      paddingVertical: 16,
  },
  statValue: {
      fontWeight: 'bold',
      marginVertical: 4,
  },
  priorityDot: {
      width: 12, 
      height: 12, 
      borderRadius: 6, 
      margin: 10,
      alignSelf: 'center',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
});

