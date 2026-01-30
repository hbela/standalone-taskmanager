import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function SplashTestScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/icons/splash.png')}
        style={styles.splashImage}
        resizeMode="cover"
      />
      
      <Button 
        mode="contained" 
        onPress={() => router.back()}
        style={styles.closeButton}
      >
        Close Test
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  splashImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
});
