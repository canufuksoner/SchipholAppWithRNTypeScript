import React from 'react';
import { View, StyleSheet, Text, Dimensions, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import LightButton from '../UI/Buttons/LightButton';
import CardComponent from '../UI/CardComponent';

type RootStackParamList = {
  Categories: undefined;
  CategoryOverview: undefined;
};

interface CategoryGridItemProps {
  title: string;
  description: string;
  color: string;
}

const { width, height } = Dimensions.get('window');

const CategoryGridItem: React.FC<CategoryGridItemProps> = ({ title, description, color }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const pressHandler = () => {
    navigation.navigate('CategoryOverview');
  };

  return (
    <Pressable onPress={pressHandler}>
      <CardComponent style={[styles.gridItem, { backgroundColor: color }]}>
        <View style={styles.buttonContainer}>
          <LightButton title={title} onPress={pressHandler} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
      </CardComponent>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    width: width * 0.9,
    height: height * 0.25, // Ekran yüksekliğinin %25'ini kaplar
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
    marginTop: 8,
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  description: {
    textAlign: 'right',
  },
});

export default CategoryGridItem;
