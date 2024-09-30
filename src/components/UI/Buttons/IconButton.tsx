import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Props
interface LightButtonProps {
  title: string; // title prop'unun tipi
  onPress: () => void; // Daha iyi bir tip tanımı
}

// IconButton bileşeni
const IconButton: React.FC<LightButtonProps> = ({title, onPress}) => {
  return (
    <Pressable
      android_ripple={{color: '#ccc'}}
      style={styles.button}
      onPress={onPress}>
      <Icon name="search" size={20} onPress={() => {}} color={'#fff'}/>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 2
  },
});

export default IconButton;
