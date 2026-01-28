import LanguageSwitcher from '@/components/LanguageSwitcher';
import { LanguageContext } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Card, List, Text, useTheme } from 'react-native-paper';

export default function SettingsScreen() {
  const { key } = useContext(LanguageContext);
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]} key={key}>
      <Appbar.Header elevated>
        <Appbar.Content title={t('settings.title')} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <LanguageSwitcher />
        
        <List.Section>
            <List.Subheader>{t('settings.about')}</List.Subheader>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.appInfoRow}>
                        <Avatar.Icon size={48} icon="check-bold" />
                        <View style={styles.appInfoText}>
                            <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>Task Manager App</Text>
                            <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>Version 1.0.0</Text>
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
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
  },
  appInfoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
  },
  appInfoText: {
      flex: 1,
  }
});
