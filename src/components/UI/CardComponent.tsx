import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

// CardComponent bileşeni
interface CardComponentProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>; // StyleProp<ViewStyle> ile daha esnek bir stil tipi
}

const CardComponent: React.FC<CardComponentProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    padding: 20, // İçerideki öğelere boşluk eklemek için
    backgroundColor: '#fff', // Kartın arka plan rengi
    shadowColor: '#000', // Kart gölgesi
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Android'de gölge etkisi
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardComponent;
