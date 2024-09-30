import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

// Props
interface LightButtonProps {
  title: string; // title prop'unun tipi
  onPress: () => void; // Daha iyi bir tip tanımı
}

// DangerButton bileşeni
const DangerButton: React.FC<LightButtonProps> = ({ title, onPress }) => {
  return (
    <Pressable
      android_ripple={{ color: '#ccc' }}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9a1d03'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff'
  },
});

export default DangerButton;
