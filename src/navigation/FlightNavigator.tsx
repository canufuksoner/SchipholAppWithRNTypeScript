// Navigation.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlightListScreen from '../screens/Flight/FlightListScren';
import FlightSeatSelectionScreen from '../screens/Flight/FlightSeatSelectionScreen';
import FlightDetailsScreen from '../screens/Flight/FlightDetailScreen';

// Navigation parametre tipleri
type RootStackParamList = {
  FlightList: undefined;
  FlightDetails: {flightId: string}; // flightId parametresini alıyor
  FlightSeatSelection: {flightId: string}; // flightId parametresini alıyor
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const FlightNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="FlightList">
      <Stack.Screen
        name="FlightList"
        component={FlightListScreen}
        options={{title: 'Uçuşlar'}} // Ekran başlığı
      />
      <Stack.Screen
        name="FlightDetails"
        component={FlightDetailsScreen}
        options={{title: 'Uçuş Detay'}} // Ekran başlığı
      />
      <Stack.Screen
        name="FlightSeatSelection"
        component={FlightSeatSelectionScreen}
        options={{title: 'Uçak Rezervasyon'}} // Ekran başlığı
      />
    </Stack.Navigator>
  );
};

export default FlightNavigator;
