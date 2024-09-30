import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {fetchFlightById, selectSeat} from '../../store/Actions/flightActions';
import {RootState, AppDispatch} from '../../store/store';

type RootStackParamList = {
  FlightSeatSelection: {flightId: string};
};

type FlightSeatSelectionRouteProp = RouteProp<
  RootStackParamList,
  'FlightSeatSelection'
>;

interface FlightSeatSelectionScreenProps {
  route: FlightSeatSelectionRouteProp;
}

const seats = ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D']; // Koltuklar

const FlightSeatSelectionScreen: React.FC<FlightSeatSelectionScreenProps> = ({
  route,
}) => {
  const {flightId} = route.params;

  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation();

  const [selectedSeats, setSelectedSeats] = useState<string[]>([
    '1A',
    '1D',
    '2A',
    '2B',
  ]);
  const [currentSeat, setCurrentSeat] = useState<string | null>(null); // Anlık seçim için state

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleConfirmSeats} style={{marginRight: 15}}>
          <Icon name="plus" size={30} color="tomato" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, selectedSeats, currentSeat]);

  const {flight, loading, error} = useSelector(
    (state: RootState) => state.flights,
  );

  useEffect(() => {
    dispatch(fetchFlightById(flightId)); // Uçuş ID'si ile seçilen uçuş bilgilerini getir
  }, [dispatch, flightId]);

  const handleSeatPress = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      Alert.alert(
        `${seat} numaralı koltuk başkası tarafından seçilmiş`,
        'Farklı koltuk seçimi yaparak işlemlerinize devam edebilirsiniz',
      );
    } else {
      setCurrentSeat(seat); // Anlık koltuk seçimi güncelle
    }
  };

  const handleConfirmSeats = () => {
    if (currentSeat === null) {
      Alert.alert('Seçim yapılmadı', 'Lütfen bir koltuk seçin.');
    } else {
      Alert.alert(
        'Onaylıyor musunuz?',
        `Uçuş Kodu: ${flightId}\nSeçilen Koltuk: ${currentSeat}`,
        [
          {
            text: 'İptal',
            style: 'cancel',
          },
          {
            text: 'Onayla',
            onPress: () => {
              setSelectedSeats([...selectedSeats, currentSeat]); // Seçimi onayla
              setCurrentSeat(null); // Anlık seçimi sıfırla

              dispatch(selectSeat({flightId, seat: currentSeat})); // API'ye POST isteği gönder
            },
          },
        ],
      );
    }
  };

  const renderSeat = (seat: string) => (
    <TouchableOpacity
      key={seat}
      style={[
        styles.seat,
        selectedSeats.includes(seat)
          ? styles.selectedSeat
          : styles.availableSeat,
        currentSeat === seat ? styles.highlightedSeat : null, // Anlık seçimi vurgula
      ]}
      onPress={() => handleSeatPress(seat)}>
      <Text style={styles.seatText}>{seat}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Koltuk Seçimi</Text>

      {flight && (
        <>
          <Text style={styles.flightInfo}>Uçuş Kodu: {flightId}</Text>
          <Text style={styles.flightInfo}>Uçuş Kodu: {flight.flightNumber}</Text>
          <Text style={styles.flightInfo}>Tarih: {flight.scheduleDate}</Text>
          <Text style={styles.flightInfo}>Kapı: {flight.terminal} ➔ {flight.flightDirection}</Text>
        </>
      )}

      <View style={styles.seatContainer}>{seats.map(renderSeat)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  flightInfo: {
    fontSize: 18,
    marginBottom: 10,
  },
  seatContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  seat: {
    width: 50,
    height: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },
  availableSeat: {
    borderColor: 'green',
    backgroundColor: 'white',
  },
  selectedSeat: {
    borderColor: 'red',
    backgroundColor: 'lightgrey',
  },
  highlightedSeat: {
    borderColor: 'blue', // Anlık seçimi vurgulamak için
    backgroundColor: 'lightblue', // Anlık seçim için arka plan rengi
  },
  seatText: {
    fontSize: 18,
  },
});

export default FlightSeatSelectionScreen;
