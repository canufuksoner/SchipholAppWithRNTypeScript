import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

// Props
interface LightButtonProps {
  title: string; // title prop'unun tipi
  onPress: any; // onPress prop'unun tipi
}

// LightButton bileşeni
const LightButton: React.FC<LightButtonProps> = ({ title, onPress }) => {
  return (
    <Pressable
      android_ripple={{ color: '#ccc' }}
      style={styles.button}
      onPress={onPress}
    >
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LightButton;
