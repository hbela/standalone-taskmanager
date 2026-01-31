import { Spacing } from '@/constants/theme';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Appbar, Card, Text, useTheme } from 'react-native-paper';
import {
  cancelAllNotifications,
  cancelTestTaskNotifications,
  listScheduledNotifications,
  scheduleTestTask,
  sendQuickTestNotification,
} from '../../lib/notifications/notificationQA';

export default function NotificationQAScreen() {
  const theme = useTheme();
  const [log, setLog] = useState<string[]>([]);

  // Helper to append log
  const appendLog = (message: string) => {
    setLog((prev) => [message, ...prev]);
    console.log(message);
  };

  const handleQuickTest = async () => {
    try {
      const id = await sendQuickTestNotification();
      appendLog(`✅ Quick test notification scheduled: ${id}`);
    } catch (error) {
      appendLog(`❌ Error: ${error}`);
    }
  };

  const handleScheduleTestTask = async () => {
    try {
      const ids = await scheduleTestTask();
      appendLog(`✅ Test task reminders scheduled: ${ids.join(', ')}`);
    } catch (error) {
      appendLog(`❌ Error: ${error}`);
    }
  };

  const handleListScheduled = async () => {
    try {
      const scheduled = await listScheduledNotifications();
      appendLog(`📊 Scheduled notifications: ${scheduled.length}`);
      scheduled.forEach((n, i) => {
        const trigger = n.trigger as any;
        let triggerInfo = 'unknown';
        
        if (trigger?.value) {
          // Date trigger with timestamp
          triggerInfo = new Date(trigger.value).toLocaleString();
        } else if (trigger?.seconds) {
          // Time interval trigger
          triggerInfo = `in ${trigger.seconds}s`;
        } else if (trigger?.hour !== undefined && trigger?.minute !== undefined) {
          // Daily trigger
          triggerInfo = `daily at ${trigger.hour}:${trigger.minute.toString().padStart(2, '0')}`;
        }
        
        appendLog(
          `[${i}] ${n.content.title} - ${triggerInfo}`
        );
      });
    } catch (error) {
      appendLog(`❌ Error: ${error}`);
    }
  };

  const handleCancelTestTask = async () => {
    try {
      await cancelTestTaskNotifications();
      appendLog('✅ Test task notifications cancelled');
    } catch (error) {
      appendLog(`❌ Error: ${error}`);
    }
  };

  const handleCancelAll = async () => {
    try {
      await cancelAllNotifications();
      appendLog('✅ All notifications cancelled');
    } catch (error) {
      appendLog(`❌ Error: ${error}`);
    }
  };

  const handleClearLog = () => {
    setLog([]);
    appendLog('🧹 Log cleared');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header elevated>
        <Appbar.Content title="📋 Notification QA" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="bodyMedium" style={[styles.subheader, { color: theme.colors.onSurfaceVariant }]}>
          Test local notifications on physical device
        </Text>
        
        <View style={styles.buttons}>
          <TestButton 
            onPress={handleQuickTest}
            title="🚀 Send Quick Test Notification"
            subtitle="Triggers in 5 seconds"
            theme={theme}
          />

          <TestButton 
            onPress={handleScheduleTestTask}
            title="📝 Schedule Test Task Reminders"
            subtitle="10-min due date with 1 & 5-min reminders"
            theme={theme}
          />

          <TestButton 
            onPress={handleListScheduled}
            title="📊 List All Scheduled Notifications"
            subtitle="Shows IDs, titles, and triggers"
            theme={theme}
          />

          <TestButton 
            onPress={handleCancelTestTask}
            title="❌ Cancel Test Task Notifications"
            subtitle="Removes only test task (ID: 999)"
            theme={theme}
          />

          <TestButton 
            onPress={handleCancelAll}
            title="⚠️ Cancel All Notifications"
            subtitle="Clears everything (use with caution)"
            danger
            theme={theme}
          />

          <TestButton 
            onPress={handleClearLog}
            title="🧹 Clear Log"
            subtitle="Reset the log display"
            theme={theme}
          />
        </View>

        <Card style={styles.logCard} mode="elevated">
          <Card.Title 
            title={`📝 Log Output (${log.length})`}
            titleVariant="titleMedium"
          />
          <Card.Content>
            <ScrollView style={styles.logContainer}>
              {log.length === 0 ? (
                <Text variant="bodyMedium" style={[styles.emptyLog, { color: theme.colors.onSurfaceVariant }]}>
                  No logs yet. Press a button to test!
                </Text>
              ) : (
                log.map((line, index) => (
                  <Text 
                    key={index} 
                    variant="bodySmall" 
                    style={[styles.logLine, { color: theme.colors.onSurface }]}
                  >
                    {line}
                  </Text>
                ))
              )}
            </ScrollView>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

interface TestButtonProps {
  onPress: () => void;
  title: string;
  subtitle: string;
  danger?: boolean;
  theme: any;
}

function TestButton({ onPress, title, subtitle, danger, theme }: TestButtonProps) {
  const buttonColor = danger ? theme.colors.error : theme.colors.primary;
  
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: buttonColor }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text variant="titleMedium" style={styles.buttonTitle}>
        {title}
      </Text>
      <Text variant="bodySmall" style={styles.buttonSubtitle}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: 120,
  },
  subheader: {
    marginBottom: Spacing.lg,
  },
  buttons: { 
    marginBottom: Spacing.md,
  },
  button: { 
    padding: Spacing.lg,
    borderRadius: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonTitle: {
    fontWeight: '600',
    color: '#fff',
    marginBottom: Spacing.xs,
  },
  buttonSubtitle: {
    color: '#fff',
    opacity: 0.8,
  },
  logCard: {
    marginTop: Spacing.md,
  },
  logContainer: { 
    maxHeight: 300,
  },
  logLine: { 
    marginBottom: 6,
    fontFamily: 'monospace',
  },
  emptyLog: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: Spacing.xl,
  }
});
