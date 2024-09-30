import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CategoryScreen from '../screens/Category/CategoriesScreen';
import CategoryOverviewScreen from '../screens/Category/CategoryOverviewScreen';
import FlightListScreen from '../screens/Flight/FlightListScren';
import FlightSeatSelectionScreen from '../screens/Flight/FlightSeatSelectionScreen';
import HomeScreen from '../screens/HomeScreen';
import FilteredFlightsScreen from '../screens/Flight/FilteredFlightsScreen';
import FlightDetailsScreen from '../screens/Flight/FlightDetailScreen';
import PastFlightsScreen from '../screens/Flight/PastFlightsScreen';
import UpcomingFlightsScreen from '../screens/Flight/UpcomingFlightsScreen';

// Navigation parametre tipleri
type RootStackParamList = {
  Home: undefined;
  FilteredFlights: undefined;
  Categories: undefined;
  FlightList: undefined;
  FlightDetails: {flightId: string}; // flightId parametresini alıyor
  FlightSeatSelection: {flightId: string}; // flightId parametresini alıyor
  CategoryOverview: undefined;
  PastFlights: undefined;
  UpcomingFlights: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const SchipholNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Ana Sayfa'}} // Ekran başlığı
      />
      <Stack.Screen
        name="FilteredFlights"
        component={FilteredFlightsScreen}
        options={{title: ''}} // Ekran başlığı
      />
      <Stack.Screen
        name="Categories"
        component={CategoryScreen}
        options={{title: 'Kampanyalar'}} // Ekran başlığı
      />
      <Stack.Screen
        name="FlightList"
        component={FlightListScreen}
        options={{title: 'Uçuş Liste'}} // Ekran başlığı
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
      <Stack.Screen
        name="PastFlights"
        component={PastFlightsScreen}
        options={{title: 'Geçmiş Uçuşlar'}} // Ekran başlığı
      />
      <Stack.Screen
        name="UpcomingFlights"
        component={UpcomingFlightsScreen}
        options={{title: 'Gelecek Uçuşlar'}} // Ekran başlığı
      />
      <Stack.Screen
        name="CategoryOverview"
        component={CategoryOverviewScreen}
        options={{title: 'sKampanya Detay'}} // Ekran başlığı
      />
    </Stack.Navigator>
  );
};

export default SchipholNavigator;
