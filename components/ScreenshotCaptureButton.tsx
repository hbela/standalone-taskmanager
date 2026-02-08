/**
 * Screenshot Capture Button
 * 
 * A header icon button that captures the current screen.
 * Use this in screen headers for easy screenshot capture.
 */

import { useScreenshot } from '@/context/ScreenshotContext';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

interface ScreenshotCaptureButtonProps {
  screenName?: string;
}

export default function ScreenshotCaptureButton({ screenName }: ScreenshotCaptureButtonProps) {
  const { captureCurrentScreen, isCapturing } = useScreenshot();
  const theme = useTheme();

  const handleCapture = () => {
    captureCurrentScreen(screenName);
  };

  if (isCapturing) {
    return (
      <ActivityIndicator 
        size="small" 
        color={theme.colors.primary} 
        style={{ marginRight: 8 }} 
      />
    );
  }

  return (
    <IconButton
      icon="camera"
      size={24}
      onPress={handleCapture}
      iconColor={theme.colors.primary}
    />
  );
}
