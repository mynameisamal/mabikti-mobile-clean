import React, { useEffect, useRef } from 'react';
import { View, Animated, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  const logoAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Mulai animasi fade in + zoom
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Setelah 2.5 detik, pindah ke login
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/logo.png')}
        style={[
          styles.logo,
          {
            opacity: logoAnim,
            transform: [
              {
                scale: logoAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          },
        ]}
      />
      <Text style={styles.credit}>by CharityCode</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  credit: {
    position: 'absolute',
    bottom: 40,
    fontSize: 16,
    color: '#555',
  },
});
