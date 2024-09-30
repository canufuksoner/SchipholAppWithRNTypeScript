import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

const HeaderComponent: React.FC<HeaderProps> = ({ 
  title, 
  onBackPress, 
  rightIcon, 
  onRightIconPress 
}) => {
  return (
    <View style={styles.headerContainer}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress} style={styles.iconContainer}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress} style={styles.iconContainer}>
          <Icon name={rightIcon} size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  iconContainer: {
    padding: 5,
  },
});

export default HeaderComponent;
