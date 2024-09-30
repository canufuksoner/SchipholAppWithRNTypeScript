import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import FlightSearchComponent from '../components/Flight/FlightSearchComponent';
import PrimaryButton from '../components/UI/Buttons/PrimaryButton';

// Mock kampanyalı uçuş verileri
const promotionalFlights = [
  { id: '1', flightNumber: 'TK123', originalPrice: 500, discountRate: 20 },
  { id: '2', flightNumber: 'TK456', originalPrice: 600, discountRate: 15 },
  { id: '3', flightNumber: 'TK789', originalPrice: 450, discountRate: 10 },
];

// Navigation parametre tipleri
type RootStackParamList = {
  FilteredFlights: { departureDate: Date; returnDate: Date; passengers: number; };
  FlightDetails: { flightId: string; };
};

function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isLandscape, setIsLandscape] = useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const handleSearch = useCallback((departureDate: Date, returnDate: Date, passengers: number) => {
    navigation.navigate('FilteredFlights', { departureDate, returnDate, passengers });
  }, [navigation]);

  const openFilterModal = () => setFilterModalVisible(true);
  const closeFilterModal = () => setFilterModalVisible(false);

  useEffect(() => {
    const updateLayout = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);
    updateLayout(); 

    return () => subscription?.remove();
  }, []);

  const renderFlightItem = (item: any) => {
    const discountedPrice = item.originalPrice - (item.originalPrice * item.discountRate) / 100;

    return (
      <View style={styles.flightItem}>
        <Text style={styles.flightNumber}>Uçuş Kodu: {item.flightNumber}</Text>
        <Text style={styles.price}>İndirimli Fiyat: {discountedPrice}₺ (%{item.discountRate} indirim)</Text>
        <PrimaryButton
          title="Rezervasyon Yap"
          onPress={() => navigation.navigate('FlightDetails', { flightId: '140759103210004766' })}
        />
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      {isLandscape && (
        <View style={styles.header}>
          <TouchableOpacity style={styles.filterIcon} onPress={openFilterModal}>
            <Text style={styles.filterText}>🔍 Filtre</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isLandscape && (
        <>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Schiphol'e Hoş Geldiniz</Text>
          </View>
          <FlightSearchComponent onSearch={handleSearch} />
        </>
      )}

      <FlatList
        style={styles.promotionalListContainer}
        data={promotionalFlights}
        keyExtractor={(item) => item.id}
        renderItem={renderFlightItem}
        showsVerticalScrollIndicator={false} 
      />

      <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeFilterModal}
      >
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
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  header: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'flex-end',
  },
  filterIcon: {
    padding: 10,
  },
  filterText: {
    fontSize: 18,
  },
  welcomeContainer: {
    padding: 5,
    marginVertical: 5,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  promotionalListContainer: {
    padding: 5,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  flightItem: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  flightNumber: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 12,
  },
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
});

export default HomeScreen;
