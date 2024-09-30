// MyDrawer.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import FlightListScreen from '../screens/Flight/FlightListScren';
import PastFlightsScreen from '../screens/Flight/PastFlightsScreen';
import UpcomingFlightsScreen from '../screens/Flight/UpcomingFlightsScreen';


// Drawer Navigator oluşturma
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Flights" component={FlightListScreen} />
      <Drawer.Screen name="PastFlights" component={PastFlightsScreen} />
      <Drawer.Screen name="UpcomingFlights" component={UpcomingFlightsScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
