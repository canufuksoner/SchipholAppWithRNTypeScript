import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import HeaderComponent from '../../components/UI/HeaderComponnet';

type RootStackParamList = {
  FlightList: undefined;
};

const { width, height } = Dimensions.get('window');

const CategoryOverviewScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleViewFlights = () => {
    navigation.navigate('FlightList');
  };

  return (
    <View style={styles.container}>
      <HeaderComponent title='Uçuş Kampanyaları' />
      <Text style={styles.description}>
        Burada, mevcut uçuş kampanyalarımız hakkında detaylı bilgi bulabilirsiniz. İhtiyacınıza uygun fırsatları keşfedin.
      </Text>

      <Pressable onPress={handleViewFlights} style={styles.pressable}>
        <IconButton icon="airplane-takeoff" size={40} />
        <Text style={styles.buttonText}>Uçuşları Görüntüle</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  description: {
    fontSize: width > height ? 18 : 16, 
    textAlign: 'center',
    marginBottom: 20,
  },
  pressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: width > height ? 18 : 16,
    marginLeft: 10,
    color: '#007BFF',
  },
});

export default CategoryOverviewScreen;
