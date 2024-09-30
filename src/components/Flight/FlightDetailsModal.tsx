import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {Flight} from '../../models/flight';
import moment from 'moment';

type FlightDetailsModalProps = {
  isVisible: boolean;
  closeModal: () => void;
  flight: Flight | null;
  handleSelectSeat?: () => void;
  isSeatSelection?: boolean;
};

const FlightDetailsModal: React.FC<FlightDetailsModalProps> = ({
  isVisible,
  closeModal,
  flight,
  handleSelectSeat,
  isSeatSelection = false,
}) => {
  // Uçuş bilgileri mevcut mu kontrol et
  const flightDateTime = flight
    ? moment(
        `${flight.scheduleDate} ${flight.scheduleDateTime}`,
        'YYYY-MM-DD HH:mm',
      )
    : moment();
  const currentTime = moment(); // Şu anki zaman
  const isFlightInFuture = flightDateTime.isAfter(currentTime.add(1, 'hours')); // Uçuşun şu anki zamandan en az 1 saat sonra olup olmadığını kontrol et

  function getEstimatedLandingHour(estimatedLandingTime: any): string {
    const date = new Date(estimatedLandingTime);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.modalTitle}>Uçuş Bilgileri</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
          </View>
          {flight ? (
            <View>
              <Text style={styles.detailText}>
                Uçuş Kodu: {flight.flightNumber}
              </Text>
              <Text style={styles.detailText}>
                Tarih: {flight.scheduleDate}
              </Text>
              <Text style={styles.detailText}>
                Saat: {getEstimatedLandingHour(flight.estimatedLandingTime)}
              </Text>
              <Text style={styles.detailText}>
                Kapı: {flight.terminal} ➔ {flight.flightDirection}
              </Text>
              <Text style={styles.detailText}>Kod: {flight.airlineCode}</Text>
              {isSeatSelection && isFlightInFuture && (
                <TouchableOpacity onPress={handleSelectSeat}>
                  <Text style={styles.startAnimationButton}>Koltuk Seçimi</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <Text style={styles.detailText}>Uçuş bilgisi mevcut değil.</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 18,
    color: '#f45725',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  detailText: {
    fontSize: 16,
    marginVertical: 5,
  },
  startAnimationButton: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 10,
  }
});

export default FlightDetailsModal;
