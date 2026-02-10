import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface OpenMapButtonProps {
  address: string;
  label?: string;
  style?: any;
}

export default function OpenMapButton({ 
  address, 
  label = 'Open in Maps',
  style 
}: OpenMapButtonProps) {
  const openAddressInMaps = async () => {
    try {
      // Format the address for a maps URL
      const formattedAddress = encodeURIComponent(address.trim());

      // Try multiple URL schemes for better compatibility
      // geo: scheme works on both Android and iOS
      const geoUrl = `geo:0,0?q=${formattedAddress}`;
      const httpsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;

      try {
        // Try geo: scheme first (works better on Android)
        await Linking.openURL(geoUrl);
      } catch (_geoError) {
        // Fallback to HTTPS URL
        try {
          await Linking.openURL(httpsUrl);
        } catch (_httpsError) {
          Alert.alert('Error', 'Cannot open maps on this device.');
        }
      }
    } catch (error) {
      console.error('Error opening maps:', error);
      Alert.alert('Error', 'Failed to open maps. Please try again.');
    }
  };

  return (
    <TouchableOpacity 
      onPress={openAddressInMaps} 
      style={[styles.button, style]}
      activeOpacity={0.7}
    >
      <Ionicons name="map-outline" size={20} color="#007AFF" />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#E8F4FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
