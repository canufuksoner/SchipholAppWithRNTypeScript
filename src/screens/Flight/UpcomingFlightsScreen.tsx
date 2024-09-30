import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

import {Flight} from '../../models/flight';
import {upcomingFlights} from '../../data/dummy-data';
import FlightDetailsModal from '../../components/Flight/FlightDetailsModal';
import FlatListComponent from '../../components/UI/FatListComponent';
import HeaderComponent from '../../components/UI/HeaderComponnet';

const UpcomingFlightsScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const {loading, error} = useSelector((state: RootState) => state.flights);

  const renderFlightItem = ({item}: {item: Flight}) => {
    return (
      <View style={styles.flightItem}>
        <Text style={styles.flightNumber}>{item.flightNumber}</Text>
        <Text style={styles.flightRoute}>
          {item.terminal} ➔ {item.flightDirection}
        </Text>
        <Text style={styles.flightDate}>{item.scheduleDate}</Text>

        <TouchableOpacity onPress={() => openModal(item)}>
          <Text style={styles.detailsButton}>Detay</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const openModal = (flight: Flight) => {
    setSelectedFlight(flight);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedFlight(null);
    setModalVisible(false);
  };

  const handleSelectSeat = () => {
    closeModal();
  };

  return (
    <View style={styles.container}>
      <HeaderComponent title="Yaklaşan Uçuşlar" />

      <FlatListComponent
        loading={loading}
        error={error}
        data={upcomingFlights}
        renderItem={data => renderFlightItem(data)}
        keyExtractor={item => item.id}
      />

      <FlightDetailsModal
        isVisible={isModalVisible}
        closeModal={closeModal}
        flight={selectedFlight}
        handleSelectSeat={handleSelectSeat}
        isSeatSelection={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingBottom: 20,
  },
  flightItem: {
    backgroundColor: '#fff',
    padding: 15,
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
    color: '#007BFF'
  },
});

export default UpcomingFlightsScreen;
