import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

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

  const unavailable = useCallback(async () => {
    console.warn('Screenshot capture is only available in the native app.');
  }, []);

  return (
    <ScreenshotContext.Provider
      value={{
        selectedDevice,
        setSelectedDevice,
        capturedScreenshots: [],
        isCapturing: false,
        isUploading: false,
        captureCurrentScreen: unavailable,
        uploadAllToGoogleDrive: unavailable,
        clearAllScreenshots: () => {},
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
