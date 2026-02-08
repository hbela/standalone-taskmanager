import LanguageSwitcher from '@/components/LanguageSwitcher';
import ScreenshotCaptureButton from '@/components/ScreenshotCaptureButton';
import { Spacing } from '@/constants/theme';
import { LanguageContext } from '@/context/LanguageContext';
import { DEVICE_DIMENSIONS, DeviceType, useScreenshot } from '@/context/ScreenshotContext';
import { useAppTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, Card, Chip, IconButton, List, Switch, Text, useTheme } from 'react-native-paper';

const WELCOME_SHOWN_KEY = '@task_manager_welcome_shown';

export default function SettingsScreen() {
  const { key } = useContext(LanguageContext);
  const { t } = useTranslation();
  const theme = useTheme();
  const { isDark, toggleTheme } = useAppTheme();
  const router = useRouter();
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  
  // Screenshot context
  const {
    selectedDevice,
    setSelectedDevice,
    capturedScreenshots,
    isUploading,
    uploadAllToGoogleDrive,
    clearAllScreenshots,
  } = useScreenshot();

  // Load welcome screen preference
  useEffect(() => {
    loadWelcomePreference();
  }, []);

  const loadWelcomePreference = async () => {
    try {
      const value = await AsyncStorage.getItem(WELCOME_SHOWN_KEY);
      // If value is 'true', welcome has been disabled, so we DON'T show it (toggle is OFF)
      // If value is null or 'false', we SHOULD show it (toggle is ON) - DEFAULT is ON
      setShowWelcomeScreen(value !== 'true');
    } catch (error) {
      console.error('Error loading welcome preference:', error);
      // Default to showing welcome screen on error
      setShowWelcomeScreen(true);
    }
  };

  const handleWelcomeToggle = async () => {
    try {
      const newValue = !showWelcomeScreen;
      setShowWelcomeScreen(newValue);
      // If toggle is ON (true), we want to show welcome, so set storage to 'false'
      // If toggle is OFF (false), we don't want to show welcome, so set storage to 'true'
      await AsyncStorage.setItem(WELCOME_SHOWN_KEY, newValue ? 'false' : 'true');
    } catch (error) {
      console.error('Error saving welcome preference:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]} key={key}>
      <Appbar.Header elevated>
        <Appbar.Content title={t('settings.title')} />
        <ScreenshotCaptureButton screenName="settings" />
      </Appbar.Header>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        <List.Section>
            <List.Subheader>{t('settings.appearance') || 'Appearance'}</List.Subheader>
            <Card style={styles.card} mode="elevated">
                <Card.Content style={{ padding: 0 }}>
                    <List.Item
                        title={isDark ? "Dark Mode" : "Light Mode"}
                        left={props => <List.Icon {...props} icon="theme-light-dark" />}
                        right={props => (
                            <IconButton
                                icon={isDark ? "weather-night" : "weather-sunny"}
                                selected={isDark}
                                onPress={toggleTheme}
                            />
                        )}
                    />
                </Card.Content>
            </Card>
        </List.Section>

        <List.Section>
            <List.Subheader>{t('settings.notifications')}</List.Subheader>
            <Card style={styles.card} mode="elevated">
                <Card.Content style={{ padding: 0 }}>
                    <List.Item
                        title={t('settings.showWelcomeScreen')}
                        description={t('settings.showWelcomeScreenDescription')}
                        left={props => <List.Icon {...props} icon="hand-wave" />}
                        right={props => (
                            <Switch
                                value={showWelcomeScreen}
                                onValueChange={handleWelcomeToggle}
                            />
                        )}
                    />
                </Card.Content>
            </Card>
        </List.Section>

        <LanguageSwitcher />
        
        {/* Screenshot Settings Section */}
        <List.Section>
            <List.Subheader>📸 Screenshot Capture</List.Subheader>
            <Card style={styles.card} mode="elevated">
                <Card.Content>
                    <Text variant="bodyMedium" style={{ marginBottom: Spacing.sm }}>
                        Device Size for Screenshots:
                    </Text>
                    <View style={styles.deviceChips}>
                        {(Object.keys(DEVICE_DIMENSIONS) as DeviceType[]).map((device) => (
                            <Chip
                                key={device}
                                selected={selectedDevice === device}
                                onPress={() => setSelectedDevice(device)}
                                showSelectedCheck
                                style={styles.deviceChip}
                            >
                                {DEVICE_DIMENSIONS[device].label}
                            </Chip>
                        ))}
                    </View>
                    
                    <Text 
                        variant="bodySmall" 
                        style={{ marginTop: Spacing.md, color: theme.colors.outline }}
                    >
                        💡 Tap the camera icon in any screen header to capture a screenshot.
                    </Text>
                </Card.Content>
            </Card>
            
            {/* Captured Screenshots List */}
            {capturedScreenshots.length > 0 && (
                <Card style={styles.card} mode="elevated">
                    <Card.Content>
                        <View style={styles.screenshotHeader}>
                            <Text variant="titleMedium">
                                Captured ({capturedScreenshots.length})
                            </Text>
                            <IconButton
                                icon="trash-can-outline"
                                size={20}
                                iconColor={theme.colors.error}
                                onPress={clearAllScreenshots}
                            />
                        </View>
                        
                        {capturedScreenshots.map((screenshot, index) => (
                            <View key={index} style={styles.screenshotItem}>
                                <List.Icon icon="image" />
                                <View style={{ flex: 1 }}>
                                    <Text variant="bodySmall" numberOfLines={1}>
                                        {screenshot.name}
                                    </Text>
                                    <Text variant="labelSmall" style={{ color: theme.colors.outline }}>
                                        {DEVICE_DIMENSIONS[screenshot.deviceType].label}
                                    </Text>
                                </View>
                            </View>
                        ))}
                        
                        <Button
                            mode="contained"
                            icon="cloud-upload"
                            onPress={uploadAllToGoogleDrive}
                            loading={isUploading}
                            disabled={isUploading}
                            style={{ marginTop: Spacing.md }}
                            buttonColor="#22c55e"
                        >
                            {isUploading ? 'Uploading...' : `Upload All to Drive (${capturedScreenshots.length})`}
                        </Button>
                    </Card.Content>
                </Card>
            )}
        </List.Section>
        
        <List.Section>
            <List.Subheader>Developer</List.Subheader>
            <Card style={styles.card}>
                <Card.Content style={styles.developerButtons}>
                    <Button 
                        mode="outlined" 
                        icon="hand-wave" 
                        onPress={() => router.push('/welcome')}
                    >
                        Preview Welcome Screen
                    </Button>
                </Card.Content>
            </Card>
        </List.Section>
        
        <List.Section>
            <List.Subheader>{t('settings.about')}</List.Subheader>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.appInfoRow}>
                        <Avatar.Icon size={48} icon="check-bold" />
                        <View style={styles.appInfoText}>
                            <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
                              Task Manager App
                            </Text>
                            <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
                              Version 1.0.0
                            </Text>
                            <Text 
                              variant="bodySmall" 
                              style={[styles.aboutText, { color: theme.colors.onSurfaceVariant }]}
                            >
                                This app is 100% free created by Bela Hajzer.
                            </Text>
                            <Text 
                              variant="bodySmall" 
                              style={[styles.copyrightText, { color: theme.colors.onSurfaceVariant }]}
                            >
                                Copyright © 2026. All rights reserved.
                            </Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </List.Section>
      </ScrollView>
    </View>
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
  card: {
    marginBottom: Spacing.lg,
  },
  developerButtons: {
    gap: Spacing.md,
  },
  appInfoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.lg,
  },
  appInfoText: {
      flex: 1,
  },
  aboutText: {
    marginTop: Spacing.sm,
  },
  copyrightText: {
    marginTop: Spacing.xs,
  },
  deviceChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  deviceChip: {
    marginBottom: Spacing.xs,
  },
  screenshotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  screenshotItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
});
