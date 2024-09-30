// SplashScreen.tsx
import React from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const translateX = new Animated.Value(-100); // Başlangıçta ekranın dışından başlatıyoruz
  const translateY = new Animated.Value(height); // Başlangıçta alt kısımdan

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: width + 100, // Ekranın sağından dışarıya çıkması için
        duration: 3000, // 3 saniye sürecek
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -100, // Ekranın üst kısmına
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Animasyon tamamlandığında onFinish fonksiyonu çağrılır
      onFinish();
    });
  };

  React.useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={[
      styles.container,
    ]}>
      <View style={styles.circle}>
        <Animated.View style={{ transform: [{ translateX }] }}>
          <Icon name="plane" size={120} color="#000" />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 5,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default SplashScreen;
