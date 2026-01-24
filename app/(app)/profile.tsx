import { getTaskStats } from '@/lib/db/tasksDb';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  byPriority: Record<string, number>;
}

export default function ProfileScreen() {
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

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* App Header */}
      <View style={styles.header}>
        <View style={styles.appIconContainer}>
          <Ionicons name="checkmark-done" size={50} color="#007AFF" />
        </View>
        
        <Text style={styles.appName}>Task Manager</Text>
        <Text style={styles.appTagline}>Your Personal Productivity App</Text>
      </View>

      {/* Task Statistics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Task Statistics</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#007AFF15' }]}>
              <Ionicons name="list" size={24} color="#007AFF" />
            </View>
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#34C75915' }]}>
              <Ionicons name="checkmark-circle" size={24} color="#34C759" />
            </View>
            <Text style={styles.statValue}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#FF9F0A15' }]}>
              <Ionicons name="time" size={24} color="#FF9F0A" />
            </View>
            <Text style={styles.statValue}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#AF52DE15' }]}>
              <Ionicons name="trending-up" size={24} color="#AF52DE" />
            </View>
            <Text style={styles.statValue}>{completionRate}%</Text>
            <Text style={styles.statLabel}>Completion</Text>
          </View>
        </View>
      </View>

      {/* Priority Breakdown */}
      {Object.keys(stats.byPriority).length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tasks by Priority</Text>
          
          {Object.entries(stats.byPriority).map(([priority, count]) => (
            <View key={priority} style={styles.priorityItem}>
              <View style={styles.priorityInfo}>
                <View style={[
                  styles.priorityDot,
                  { backgroundColor: getPriorityColor(priority) }
                ]} />
                <Text style={styles.priorityLabel}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Text>
              </View>
              <Text style={styles.priorityCount}>{count}</Text>
            </View>
          ))}
        </View>
      )}

      {/* App Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="information-circle-outline" size={24} color="#8E8E93" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="phone-portrait-outline" size={24} color="#8E8E93" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Storage</Text>
            <Text style={styles.infoValue}>Local SQLite Database</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made with ❤️ for productivity
        </Text>
      </View>
    </ScrollView>
  );
}

function getPriorityColor(priority: string): string {
  switch (priority.toLowerCase()) {
    case 'urgent':
      return '#FF3B30';
    case 'high':
      return '#FF9F0A';
    case 'medium':
      return '#007AFF';
    case 'low':
      return '#34C759';
    default:
      return '#8E8E93';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  appIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  appTagline: {
    fontSize: 16,
    color: '#8E8E93',
  },
  section: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  priorityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  priorityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  priorityLabel: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  priorityCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoIcon: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#8E8E93',
  },
});

