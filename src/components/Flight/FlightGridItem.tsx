import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CardComponent from '../UI/CardComponent';
import {Flight} from '../../models/flight';
import IconButton from '../UI/Buttons/IconButton';

interface FlightGridItemProps {
  flight: Flight;
  onPress: () => void;
}

function getEstimatedLandingHour(estimatedLandingTime: any): string {
  const date = new Date(estimatedLandingTime);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

const FlightGridItem: React.FC<FlightGridItemProps> = ({flight, onPress}) => {
  return (
    <CardComponent style={[styles.gridItem]}>
      <View style={styles.row}>
        <View style={styles.leftContainer}>
          <Text style={styles.codeLabel}>Uçuş Kodu:</Text>
          <Text style={styles.codeText}>
             {flight.flightName}-{flight.flightNumber}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.detailsText}>Tarih: {flight.scheduleDate}</Text>
          <Text style={styles.detailsText}>
            Saat: {getEstimatedLandingHour(flight.estimatedLandingTime)}
          </Text>
          <Text style={styles.detailsText}>
            Kapı: {flight.terminal} ➔ {flight.flightDirection}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <IconButton title={'Detay'} onPress={onPress} />
      </View>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    margin: 10,
    height: 150,
    borderRadius: 10,
    elevation: 3,
    justifyContent: 'space-between', // Bilgileri ve butonu aralarında boşluk olacak şekilde yerleştirir
    padding: 10, // İçerik için boşluk
  },
  row: {
    flexDirection: 'row', // Yan yana yerleştir
    justifyContent: 'space-between', // Alanı eşit şekilde dağıt
    alignItems: 'center', // Dikey ortalama
    flex: 1,
  },
  leftContainer: {
    flex: 1,
    marginRight: 10, // Sağdaki öğe ile 10px boşluk bırak
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end', // Sağdaki öğeleri sağa hizala
  },
  codeLabel: {
    fontSize: 14,
    color: '#888',
  },
  codeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
  },
  detailsText: {
    fontSize: 14,
    color: '#888',
  },
});

export default FlightGridItem;
