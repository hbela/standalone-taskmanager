import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Spacing } from '@/constants/theme';
import { LanguageContext } from '@/context/LanguageContext';
import { useAppTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, Card, IconButton, List, Text, useTheme } from 'react-native-paper';

export default function SettingsScreen() {
  const { key } = useContext(LanguageContext);
  const { t } = useTranslation();
  const theme = useTheme();
  const { isDark, toggleTheme } = useAppTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]} key={key}>
      <Appbar.Header elevated>
        <Appbar.Content title={t('settings.title')} />
        <Appbar.Action 
            icon={isDark ? "weather-night" : "weather-sunny"} 
            onPress={toggleTheme} 
        />
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

        <LanguageSwitcher />
        
        <List.Section>
            <List.Subheader>Developer</List.Subheader>
            <Card style={styles.card}>
                <Card.Content style={styles.developerButtons}>
                    <Button 
                        mode="outlined" 
                        icon="eye" 
                        onPress={() => router.push('/splash-test')}
                    >
                        Preview Splash Screen
                    </Button>
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
});
