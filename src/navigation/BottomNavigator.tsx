import React, {ReactNode} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {View, TouchableOpacity, TouchableOpacityProps} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import CategoryNavigator from './CategoryNavigator';
import FlightNavigator from './FlightNavigator';
import QRCodeScannerScreen from '../screens/Flight/QRCodeScannerScreen';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator();

interface CustomTabBarButtonProps extends TouchableOpacityProps {
  children: ReactNode;
}

const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = ({
  children,
  onPress,
  ...props
}) => (
  <TouchableOpacity
    style={{
      top: -15,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 10},
      shadowOpacity: 0.3,
      shadowRadius: 3.5,
      elevation: 5,
    }}
    onPress={onPress}
    {...props} 
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'tomato',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const BottomNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === 'Anasayfa') {
              iconName = 'home';
            } else if (route.name === 'Uçuşlar') {
              iconName = 'flight';
            } else if (route.name === 'Kampanyalar') {
              iconName = 'local-offer';
            } else if (route.name === 'Profil') {
              iconName = 'person';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
        })}>
        <Tab.Screen name="Anasayfa" component={HomeNavigator} options={{headerShown: false}} />
        <Tab.Screen name="Uçuşlar" component={FlightNavigator} options={{headerShown: false}}/>

        {/* Barcode Icon */}
        <Tab.Screen
          name="Barkod"
          component={QRCodeScannerScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="qr-code-scanner" size={35} color="white" />
            ),
            tabBarButton: props => <CustomTabBarButton {...props} />,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Kampanyalar"
          component={CategoryNavigator}
          options={{title: 'Kampanyalar', headerShown: false}} 
        />
        <Tab.Screen name="Profil" component={ProfileNavigator} options={{headerShown: false}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigator;
