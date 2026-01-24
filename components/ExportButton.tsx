/**
 * Export Button Component
 * Provides UI for exporting tasks to Google Drive
 */

import { useTranslation } from '@/hooks/useTranslation';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ExportButtonProps {
  onPress: () => void;
  isExporting: boolean;
  disabled?: boolean;
  taskCount: number;
}

export default function ExportButton({ 
  onPress, 
  isExporting, 
  disabled = false,
  taskCount 
}: ExportButtonProps) {
  const { t } = useTranslation();
  
  const isDisabled = disabled || isExporting || taskCount === 0;
  
  return (
    <TouchableOpacity
      style={[styles.button, isDisabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {isExporting ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <View style={styles.content}>
          <Ionicons 
            name="cloud-upload-outline" 
            size={20} 
            color={isDisabled ? '#999' : '#fff'} 
          />
          <Text style={[styles.text, isDisabled && styles.textDisabled]}>
            {t('export.buttonShort')}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#34C759',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
  },
  buttonDisabled: {
    backgroundColor: '#E5E5EA',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  textDisabled: {
    color: '#999',
  },
});
