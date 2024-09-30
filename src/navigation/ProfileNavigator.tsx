import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlightSeatSelectionScreen from '../screens/Flight/FlightSeatSelectionScreen';
import ProfileScreen from '../screens/User/ProfileScreen';
import FlightDetailsScreen from '../screens/Flight/FlightDetailScreen';
import PastFlightsScreen from '../screens/Flight/PastFlightsScreen';
import UpcomingFlightsScreen from '../screens/Flight/UpcomingFlightsScreen';
import LoginScreen from '../screens/LoginScreen';
import PasswordChangeScreen from '../screens/User/PasswordChangeScreen';

// Navigation parametre tipleri
type RootStackParamList = {
  Profile: undefined;
  FlightList: undefined;
  PastFlights: undefined;
  UpcomingFlights: undefined;
  FlightDetails: {flightId: string}; // flightId parametresini alıyor
  FlightSeatSelection: {flightId: string}; // flightId parametresini alıyor,
  Login: undefined,
  PasswordChange: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profil', headerShown: false }} // App header'ı gizle
      />
      <Stack.Screen
        name="PastFlights"
        component={PastFlightsScreen}
        options={{title: ''}} // Ekran başlığı
      />
      <Stack.Screen
        name="UpcomingFlights"
        component={UpcomingFlightsScreen}
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
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Giriş'}} // Ekran başlığı
      />
      <Stack.Screen
        name="PasswordChange"
        component={PasswordChangeScreen}
        options={{title: 'Şifre Değiştir'}} // Ekran başlığı
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
