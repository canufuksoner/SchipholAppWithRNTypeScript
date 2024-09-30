import React, { useLayoutEffect, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { fetchFlights } from '../../store/Actions/flightActions';
import FlightGridItem from '../../components/Flight/FlightGridItem';
import { Flight } from '../../models/flight';
import { RootState, AppDispatch } from '../../store/store';
import FlightDetailsModal from '../../components/Flight/FlightDetailsModal';
import FlatListComponent from '../../components/UI/FatListComponent';
import FlightSearchComponent from '../../components/Flight/FlightSearchComponent';

const FlightListScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch: AppDispatch = useDispatch();

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = React.useState(false);
  const [selectedFlight, setSelectedFlight] = React.useState<Flight | null>(null);

  const openFilterModal = () => setFilterModalVisible(true);
  const closeFilterModal = () => setFilterModalVisible(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={openFilterModal} style={{ marginRight: 15 }}>
          <Icon name="filter" size={30} color="tomato" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const { flights, loading, error } = useSelector((state: RootState) => state.flights);

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  const handleSearch = useCallback((departureDate: Date, returnDate: Date, passengers: number) => {
    closeFilterModal();
    navigation.navigate('FilteredFlights', { departureDate, returnDate, passengers });
  }, [navigation]);

  const openModal = useCallback((flight: Flight) => {
    setSelectedFlight(flight);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedFlight(null);
    setModalVisible(false);
  }, []);

  const handleSelectSeat = () => {
    if (selectedFlight) {
      closeModal();
      navigation.navigate('FlightSeatSelection', { flightId: selectedFlight.id });
    }
  };

  const renderedFlights = useMemo(() => flights.map(flight => ({
    id: flight.id.toString(),
    flight
  })), [flights]);

  const renderItem = ({ item }: { item: { id: string; flight: Flight } }) => (
    <FlightGridItem flight={item.flight} onPress={() => openModal(item.flight)} />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatListComponent
        loading={loading}
        error={error}
        data={renderedFlights}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <FlightDetailsModal
        isVisible={isModalVisible}
        closeModal={closeModal}
        flight={selectedFlight}
        handleSelectSeat={handleSelectSeat}
        isSeatSelection={true}
      />

      <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeFilterModal}
        onDismiss={closeFilterModal}>
        <TouchableWithoutFeedback onPress={closeFilterModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <FlightSearchComponent onSearch={handleSearch} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default FlightListScreen;
