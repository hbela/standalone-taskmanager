// components/LanguageSwitcher.tsx
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Card, List, Text, useTheme } from 'react-native-paper';
import { LanguageContext } from '../context/LanguageContext';
import i18n, { changeAppLanguage } from '../i18n';

interface LanguageOption {
  code: string;
  label: string;
  flag: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'hu', label: 'Magyar', flag: '🇭🇺' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export default function LanguageSwitcher() {
  const { refreshApp, key } = useContext(LanguageContext);
  const router = useRouter();
  const currentLocale = i18n.locale;
  const theme = useTheme();

  console.log('[LanguageSwitcher] Current locale:', currentLocale, 'Context key:', key);

  const handleLanguageChange = async (languageCode: string) => {
    console.log('[LanguageSwitcher] Changing language from', currentLocale, 'to', languageCode);
    
    if (languageCode === currentLocale) {
      return;
    }

    await changeAppLanguage(languageCode);
    
    refreshApp();
    
    Alert.alert(i18n.t('success'), i18n.t('languageChanged'));
    
    setTimeout(() => {
      router.push('/(app)');
    }, 500);
  };

  return (
    <List.Section>
      <List.Subheader>{i18n.t('settings.language')}</List.Subheader>
      <Card mode="elevated" style={styles.card}>
        <Card.Content style={{ paddingVertical: 0, paddingHorizontal: 0 }}>
          {LANGUAGE_OPTIONS.map((lang, index) => (
            <React.Fragment key={lang.code}>
                <List.Item
                    title={lang.label}
                    left={() => <Text style={{ fontSize: 24, alignSelf:'center', marginHorizontal: 16 }}>{lang.flag}</Text>}
                    right={(props) => currentLocale === lang.code ? <List.Icon {...props} icon="check" color={theme.colors.primary} /> : null}
                    onPress={() => handleLanguageChange(lang.code)}
                    style={{ paddingVertical: 8 }}
                />
            </React.Fragment>
          ))}
        </Card.Content>
      </Card>
    </List.Section>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    overflow: 'hidden', // For rounded corners with list items
  },
});
