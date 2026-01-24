import { useTranslation } from '@/hooks/useTranslation';
import { MaterialIcons } from '@expo/vector-icons';
import { useSpeechRecognitionEvent } from 'expo-speech-recognition';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Safely import the module
let SpeechModule: any = null;
try {
  SpeechModule = require('expo-speech-recognition');
} catch (e) {
  console.log('[DictationButton] expo-speech-recognition not available:', e);
}

// Global state to track which button instance is currently listening
let activeButtonId: string | null = null;

interface DictationButtonProps {
  id: string; // Unique identifier for this button instance
  onDictationComplete: (text: string) => void;
  disabled?: boolean;
}

export default function DictationButton({ id, onDictationComplete, disabled }: DictationButtonProps) {
  const { t, locale } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [currentText, setCurrentText] = useState('');
  
  // The actual API is in ExpoSpeechRecognitionModule
  const Speech = SpeechModule?.ExpoSpeechRecognitionModule;
  const moduleAvailable = Speech && typeof Speech.requestSpeechRecognizerPermissionsAsync === 'function';

  // Listen for speech recognition results - only process if this is the active button
  useSpeechRecognitionEvent('result', (event: any) => {
    if (activeButtonId !== id) {
      console.log(`[DictationButton:${id}] Ignoring result event - not active (active: ${activeButtonId})`);
      return;
    }
    
    console.log(`[DictationButton:${id}] Result event:`, event);
    if (event.results && event.results.length > 0) {
      const transcript = event.results[0]?.transcript || event.results[0];
      console.log(`[DictationButton:${id}] Transcript:`, transcript);
      setCurrentText(transcript);
      
      // If this is the final result, call the completion handler
      if (event.isFinal && transcript.trim()) {
        console.log(`[DictationButton:${id}] Final result, calling onDictationComplete`);
        onDictationComplete(transcript);
      }
    }
  });

  // Listen for speech recognition end - only process if this is the active button
  useSpeechRecognitionEvent('end', () => {
    if (activeButtonId !== id) {
      console.log(`[DictationButton:${id}] Ignoring end event - not active`);
      return;
    }
    
    console.log(`[DictationButton:${id}] Speech ended`);
    setIsListening(false);
    setCurrentText('');
    activeButtonId = null; // Clear the active button
  });

  // Listen for errors - only process if this button was listening
  useSpeechRecognitionEvent('error', (event: any) => {
    // Check if this button was the one listening (either still active or just stopped)
    const wasActive = activeButtonId === id || isListening;
    
    if (!wasActive) {
      console.log(`[DictationButton:${id}] Ignoring error event - not active`);
      return;
    }
    
    console.error(`[DictationButton:${id}] Error event:`, JSON.stringify(event, null, 2));
    console.error(`[DictationButton:${id}] Error type:`, event.error);
    console.error(`[DictationButton:${id}] Error message:`, event.message);
    
    setIsListening(false);
    setCurrentText('');
    
    // Only clear activeButtonId if this was the active button
    if (activeButtonId === id) {
      activeButtonId = null;
    }
    
    // Don't show an alert for "no-speech" - it's normal when user doesn't speak
    if (event.error === 'no-speech') {
      console.log(`[DictationButton:${id}] No speech detected - user did not speak`);
      return;
    }
    
    // Don't show alert for "aborted" - happens when user stops manually
    if (event.error === 'aborted') {
      console.log(`[DictationButton:${id}] Recognition aborted - user stopped`);
      return;
    }
    
    // Show alert for actual errors
    Alert.alert(
      t('common.error'), 
      `${t('dictation.startError')}\n\nError: ${event.error || 'Unknown'}`
    );
  });

  // Check microphone permission on component mount
  useEffect(() => {
    if (!moduleAvailable) {
      console.log(`[DictationButton:${id}] Module not available`);
      return;
    }

    (async () => {
      try {
        const { status } = await Speech.requestSpeechRecognizerPermissionsAsync();
        setPermissionGranted(status === 'granted');
        if (status !== 'granted') {
          Alert.alert(
            t('dictation.permissionRequired'),
            t('dictation.permissionExplanation'),
            [{ text: 'OK' }]
          );
        }
      } catch (error) {
        console.error(`[DictationButton:${id}] Permission request error:`, error);
      }
    })();
  }, [moduleAvailable, t, Speech, id]);

  // Function to START listening
  const startListening = async () => {
    if (!permissionGranted || disabled || !moduleAvailable) {
      console.log(`[DictationButton:${id}] Cannot start - permission:`, permissionGranted, 'disabled:', disabled, 'available:', moduleAvailable);
      return;
    }

    try {
      // Set this button as the active one
      activeButtonId = id;
      setIsListening(true);
      
      console.log(`[DictationButton:${id}] Starting speech recognition with locale:`, locale);
      
      // Try to start speech recognition
      if (typeof Speech.start === 'function') {
        await Speech.start({ lang: locale });
        console.log(`[DictationButton:${id}] Started listening`);
      } else {
        console.error(`[DictationButton:${id}] No start method found`);
        Alert.alert(t('common.error'), 'Speech recognition API not available');
        setIsListening(false);
        activeButtonId = null;
      }
    } catch (error) {
      console.error(`[DictationButton:${id}] START error:`, error);
      Alert.alert(t('common.error'), t('dictation.startError'));
      setIsListening(false);
      activeButtonId = null;
    }
  };

  // Function to STOP listening
  const stopListening = async () => {
    if (!Speech || !isListening) return;
    
    try {
      console.log(`[DictationButton:${id}] Stopping speech recognition`);
      
      if (typeof Speech.stop === 'function') {
        await Speech.stop();
      }
      
      // The 'end' event listener will handle the rest
      console.log(`[DictationButton:${id}] Stop requested`);
    } catch (error) {
      console.error(`[DictationButton:${id}] STOP error:`, error);
      setIsListening(false);
      activeButtonId = null;
    }
  };

  // If module is not available, show a message
  if (!moduleAvailable) {
    return (
      <View style={[styles.container, styles.disabledContainer]}>
        <MaterialIcons name="build" size={22} color="#FF9500" />
        <Text style={styles.rebuildText}>
          Rebuild required for voice dictation
        </Text>
      </View>
    );
  }

  // If permission was denied, show a disabled state
  if (!permissionGranted) {
    return (
      <View style={[styles.container, styles.disabledContainer]}>
        <MaterialIcons name="mic-off" size={22} color="#999" />
        <Text style={styles.disabledText}>
          {t('dictation.micDisabled')}
        </Text>
      </View>
    );
  }

  // Main render: Button
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPressIn={startListening}
        onPressOut={stopListening}
        disabled={disabled}
        style={[
          styles.container,
          isListening && styles.listeningContainer,
          disabled && styles.disabledContainer,
        ]}
      >
        {isListening ? (
          <ActivityIndicator size="small" color="#FF3B30" />
        ) : (
          <MaterialIcons name="mic" size={22} color="#007AFF" />
        )}
        <Text
          style={[
            styles.buttonText,
            isListening && styles.listeningText,
            disabled && styles.disabledText,
          ]}
        >
          {isListening
            ? t('dictation.listening')
            : t('dictation.holdToTalk')}
        </Text>
      </TouchableOpacity>

      {/* Real-time transcription preview */}
      {currentText ? (
        <View style={styles.previewBox}>
          <Text style={styles.previewLabel}>
            {t('dictation.preview')}:
          </Text>
          <Text style={styles.previewText}>{currentText}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f0f8ff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  listeningContainer: {
    backgroundColor: '#ffeaea',
    borderColor: '#FF3B30',
  },
  disabledContainer: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#007AFF',
  },
  listeningText: {
    color: '#FF3B30',
  },
  disabledText: {
    color: '#999',
  },
  rebuildText: {
    marginLeft: 8,
    fontSize: 13,
    color: '#FF9500',
    fontWeight: '500',
  },
  previewBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#34C759',
  },
  previewLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginBottom: 4,
  },
  previewText: {
    fontSize: 15,
    color: '#222',
    lineHeight: 20,
  },
});
