import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  useRoute,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {RootState, AppDispatch} from '../../store/store';
import {fetchFlights} from '../../store/Actions/flightActions';

import {Flight} from '../../models/flight';
import HeaderComponent from '../../components/UI/HeaderComponnet';
import FlatListComponent from '../../components/UI/FatListComponent';

interface RouteParams {
  departureDate: Date;
  returnDate: Date;
  passengers: number;
}

type RootStackParamList = {
  FlightDetails: {flightId: string};
  FlightSeatSelection: {flightId: string};
};

const FilteredFlightsScreen = () => {
  const route = useRoute();
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {departureDate, returnDate, passengers} = route.params as RouteParams;

  // Redux store'dan uçuş verilerini alma
  const {flights, loading, error} = useSelector(
    (state: RootState) => state.flights,
  );

  useEffect(() => {
    dispatch(fetchFlights());
  }, []);

  useEffect(() => {
    dispatch(fetchFlights()); // departureDate, returnDate, passengers bilgilerine göre veri çekmek için method değişikliği
  }, [departureDate, returnDate, passengers]);

  const openFlightDetails = (flightId: string) => {
    navigation.navigate('FlightDetails', {flightId});
  };

  const openSeatSelection = (flightId: string) => {
    navigation.navigate('FlightSeatSelection', {flightId});
  };

  const renderFlightItem = ({item}: {item: Flight}) => {
    function getEstimatedLandingHour(estimatedLandingTime: any): string {
      const date = new Date(estimatedLandingTime);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }

    return (
      <View style={styles.flightItem}>
        <Text style={styles.flightNumber}>
          {item.flightName}-{item.flightNumber}
        </Text>
        <Text style={styles.flightRoute}>
          {item.terminal} ➔ {item.flightDirection}
        </Text>
        <Text style={styles.flightDate}>
          {item.scheduleDate}{' '}
          {getEstimatedLandingHour(item.estimatedLandingTime)}
        </Text>

        {/* Detaylar butonu */}
        <TouchableOpacity onPress={() => openFlightDetails(item.id)}>
          <Text style={styles.detailsButton}>Detaylar</Text>
        </TouchableOpacity>

        {/* Koltuk Seçimi butonu */}
        <TouchableOpacity onPress={() => openSeatSelection(item.id)}>
          <Text style={styles.seatSelectionButton}>Koltuk Seçimi</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderComponent title="Kriterlere Uygun Uçuşlar" />

      <FlatListComponent
        loading={loading}
        error={error}
        data={flights}
        renderItem={data => renderFlightItem(data)}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  flightItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  flightNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  flightRoute: {
    fontSize: 16,
    marginTop: 5,
  },
  flightDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  flightStatus: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
  },
  detailsButton: {
    marginTop: 10,
    color: '#007BFF',
  },
  seatSelectionButton: {
    marginTop: 5,
    color: '#FF4500',
  },
});

export default FilteredFlightsScreen;
