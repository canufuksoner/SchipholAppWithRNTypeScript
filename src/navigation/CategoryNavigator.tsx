import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryScreen from '../screens/Category/CategoriesScreen';
import CategoryOverviewScreen from '../screens/Category/CategoryOverviewScreen';
import FlightListScreen from '../screens/Flight/FlightListScren';
import FlightSeatSelectionScreen from '../screens/Flight/FlightSeatSelectionScreen';
import FlightDetailsScreen from '../screens/Flight/FlightDetailScreen';

// Navigation parametre tipleri
type RootStackParamList = {
  Categories: undefined;
  FlightList: undefined;
  FlightDetails: { flightId: string };  // flightId parametresini alıyor
  FlightSeatSelection: { flightId: string }; // flightId parametresini alıyor
  CategoryOverview: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const CategoryNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen
        name="Categories"
        component={CategoryScreen}
        options={{
          title: 'Kampanyalar',
          headerTitleAlign: 'center', // Başlığı ortalamak için
        }}
      />
      <Stack.Screen
        name="CategoryOverview"
        component={CategoryOverviewScreen}
        options={{
          title: '',
          headerTitleAlign: 'center', // Başlığı ortalamak için
        }}
      />
      <Stack.Screen
        name="FlightList"
        component={FlightListScreen}
        options={{
          title: 'Kampanyalı Uçuşlar',
          headerTitleAlign: 'center', // Başlığı ortalamak için
        }}
      />
      <Stack.Screen
        name="FlightDetails"
        component={FlightDetailsScreen}
        options={{
          title: 'Uçuş Detay',
          headerTitleAlign: 'center', // Başlığı ortalamak için
        }}
      />
      <Stack.Screen
        name="FlightSeatSelection"
        component={FlightSeatSelectionScreen}
        options={{
          title: 'Uçak Rezervasyon',
          headerTitleAlign: 'center', // Başlığı ortalamak için
        }}
      />
    </Stack.Navigator>
  );
};

export default CategoryNavigator;
