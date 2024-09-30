import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlightSeatSelectionScreen from '../screens/Flight/FlightSeatSelectionScreen';
import HomeScreen from '../screens/HomeScreen';
import FlightDetailsScreen from '../screens/Flight/FlightDetailScreen';
import FilteredFlightsScreen from '../screens/Flight/FilteredFlightsScreen';

// Navigation parametre tipleri
type RootStackParamList = {
  Drawer: undefined;
  Home: undefined;
  FlightList: undefined;
  FlightDetails: {flightId: string}; // flightId parametresini alıyor
  FlightSeatSelection: {flightId: string}; // flightId parametresini alıyor
  FilteredFlights: {
    departureDate: string;
    returnDate: string;
    passengers: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Drawer">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home', headerShown: false }} // App header'ı gizle
      />
      <Stack.Screen
        name="FilteredFlights"
        component={FilteredFlightsScreen}
        options={{title: ''}} // Ekran başlığı
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

export default HomeNavigator;
