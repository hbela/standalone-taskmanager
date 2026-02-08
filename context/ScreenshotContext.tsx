/**
 * Screenshot Context
 * 
 * Provides global state for screenshot capture functionality.
 * Manages device size selection and captured screenshots list.
 */

import { uploadImageToGoogleDrive } from '@/lib/export/googleDriveService';
import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { Alert, Linking } from 'react-native';
import { captureScreen } from 'react-native-view-shot';

export type DeviceType = 'phone' | 'tablet7' | 'tablet10';

export interface ScreenshotDimensions {
  width: number;
  height: number;
  label: string;
}

export const DEVICE_DIMENSIONS: Record<DeviceType, ScreenshotDimensions> = {
  phone: {
    width: 1080,
    height: 1920,
    label: 'Phone (1080x1920)',
  },
  tablet7: {
    width: 1200,
    height: 1920,
    label: '7" Tablet (1200x1920)',
  },
  tablet10: {
    width: 1600,
    height: 2560,
    label: '10" Tablet (1600x2560)',
  },
};

interface CapturedScreenshot {
  uri: string;
  name: string;
  timestamp: Date;
  deviceType: DeviceType;
}

interface ScreenshotContextType {
  selectedDevice: DeviceType;
  setSelectedDevice: (device: DeviceType) => void;
  capturedScreenshots: CapturedScreenshot[];
  isCapturing: boolean;
  isUploading: boolean;
  captureCurrentScreen: (screenName?: string) => Promise<void>;
  uploadAllToGoogleDrive: () => Promise<void>;
  clearAllScreenshots: () => void;
}

const ScreenshotContext = createContext<ScreenshotContextType | undefined>(undefined);

export function ScreenshotProvider({ children }: { children: ReactNode }) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('phone');
  const [capturedScreenshots, setCapturedScreenshots] = useState<CapturedScreenshot[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const captureCurrentScreen = useCallback(async (screenName?: string) => {
    setIsCapturing(true);
    try {
      // Small delay to let UI settle and ensure proper rendering
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dimensions = DEVICE_DIMENSIONS[selectedDevice];
      
      // Capture at native resolution - do NOT force width/height as it causes layout distortion
      // The device type is used for naming/metadata purposes
      const uri = await captureScreen({
        format: 'png',
        quality: 1,
        result: 'tmpfile',
        // Removed width/height to prevent scaling issues
      });

      const timestamp = new Date();
      const name = `screenshot_${screenName || 'screen'}_${selectedDevice}_${timestamp.toISOString().replace(/[:.]/g, '-')}.png`;

      const newScreenshot: CapturedScreenshot = {
        uri,
        name,
        timestamp,
        deviceType: selectedDevice,
      };

      setCapturedScreenshots(prev => [...prev, newScreenshot]);

      Alert.alert(
        '📸 Screenshot Captured!',
        `${name}\nDevice type: ${dimensions.label}\n\nGo to Settings to upload to Google Drive.`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Screenshot capture failed:', error);
      Alert.alert('Error', 'Failed to capture screenshot. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  }, [selectedDevice]);

  const uploadAllToGoogleDrive = useCallback(async () => {
    if (capturedScreenshots.length === 0) {
      Alert.alert('No Screenshots', 'Please capture some screenshots first.');
      return;
    }

    setIsUploading(true);
    let successCount = 0;
    let lastWebViewLink: string | undefined;

    try {
      for (const screenshot of capturedScreenshots) {
        const result = await uploadImageToGoogleDrive(screenshot.uri, screenshot.name);
        lastWebViewLink = result.webViewLink;
        successCount++;
      }

      Alert.alert(
        '✅ Upload Complete!',
        `${successCount} screenshot(s) uploaded to Google Drive.`,
        [
          { 
            text: 'OK',
            onPress: () => setCapturedScreenshots([])  // Clear list on OK
          },
          {
            text: 'Open in Drive',
            onPress: () => {
              setCapturedScreenshots([]);  // Clear list
              if (lastWebViewLink) {
                Linking.openURL(lastWebViewLink);
              }
            }
          }
        ]
      );
    } catch (error: any) {
      Alert.alert(
        'Upload Error',
        `Uploaded ${successCount} of ${capturedScreenshots.length}. Error: ${error.message}`
      );
    } finally {
      setIsUploading(false);
    }
  }, [capturedScreenshots]);

  const clearAllScreenshots = useCallback(() => {
    Alert.alert(
      'Clear All Screenshots?',
      `This will remove ${capturedScreenshots.length} screenshot(s) from the list.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => setCapturedScreenshots([])
        }
      ]
    );
  }, [capturedScreenshots.length]);

  return (
    <ScreenshotContext.Provider
      value={{
        selectedDevice,
        setSelectedDevice,
        capturedScreenshots,
        isCapturing,
        isUploading,
        captureCurrentScreen,
        uploadAllToGoogleDrive,
        clearAllScreenshots,
      }}
    >
      {children}
    </ScreenshotContext.Provider>
  );
}

export function useScreenshot() {
  const context = useContext(ScreenshotContext);
  if (!context) {
    throw new Error('useScreenshot must be used within a ScreenshotProvider');
  }
  return context;
}
