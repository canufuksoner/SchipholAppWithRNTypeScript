import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';

const LoadingIndicator = () => {
  const spinValue = new Animated.Value(0); // Yüklenme simgesini döndürmek için animasyon değeri

  // Döndürme animasyonu
  const startSpin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => startSpin()); // Sonsuz döngü için animasyonu tekrar başlat
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Dönüş açısı
  });

  React.useEffect(() => {
    startSpin(); // Bileşen yüklendiğinde animasyonu başlat
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <ActivityIndicator size="large" color="#007BFF" />
      </Animated.View>
      <Text style={styles.loadingText}>Yükleniyor...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5, // Android için
  },
  loadingText: {
    fontSize: 18,
    marginTop: 10,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default LoadingIndicator;
