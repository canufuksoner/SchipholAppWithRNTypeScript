import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  useRoute,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';

import {fetchFlightById} from '../../store/Actions/flightActions';
import {RootState, AppDispatch} from '../../store/store';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import ErrorMessage from '../../components/UI/ErrorMessage';

type RootStackParamList = {
  FlightSeatSelection: {flightId: string};
};

const FlightDetailsScreen = ({
  route,
}: {
  route: {params: {flightId: string}};
}) => {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {flight, loading, error} = useSelector(
    (state: RootState) => state.flights,
  );

  const [buttonAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    dispatch(fetchFlightById(route.params.flightId)); // Uçuş ID'si ile eylemi çağır
  }, [dispatch, route.params.flightId]);

  function getEstimatedLandingHour(estimatedLandingTime: any): string {
    const date = new Date(estimatedLandingTime);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const handleSeatSelectionPress = () => {
    const {flightId} = route.params;
    Animated.timing(buttonAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      buttonAnimation.setValue(0);
      navigation.navigate('FlightSeatSelection', {flightId});
    });
  };

  const buttonScale = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1], // Butonun büyüme oranı
  });

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <View style={styles.container}>
      {flight ? (
        <>
          <Text style={styles.flightCode}>
            Uçuş Kodu: {flight.flightNumber}
          </Text>
          <Text style={styles.flightDate}>Tarih: {flight.scheduleDate}</Text>
          <Text style={styles.flightTime}>
            Saat: {getEstimatedLandingHour(flight.estimatedLandingTime)}
          </Text>
          <Text style={styles.flightRoute}>
            Kapı: {flight.terminal} ➔ {flight.flightDirection}
          </Text>
        </>
      ) : (
        <Text style={styles.notFoundText}>Uçuş bulunamadı.</Text>
      )}

      <TouchableOpacity
        style={styles.seatButton}
        onPress={handleSeatSelectionPress}>
        <Animated.View style={{transform: [{scale: buttonScale}]}}>
          <Text style={styles.buttonText}>Koltuk Seçimi</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  flightCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  flightDate: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  flightTime: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  flightRoute: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  notFoundText: {
    fontSize: 18,
    color: '#d9534f',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  errorText: {
    fontSize: 18,
    color: '#d9534f',
    textAlign: 'center',
    marginTop: 50,
  },
  seatButton: {
    backgroundColor: 'tomato',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 'auto',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FlightDetailsScreen;
