import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';

import { fetchDestinations } from '../../store/Actions/flightActions';
import { RootState, AppDispatch } from '../../store/store';
import PrimaryButton from '../UI/Buttons/PrimaryButton';
import IconButton from '../UI/Buttons/IconButton';
import ModalListComponent from '../UI/ModalListComponent';

interface SearchProps {
  onSearch: (
    departureDate: Date,
    returnDate: Date,
    passengers: number,
    selectedOption: string,
  ) => void;
}

const SearchSchema = Yup.object().shape({
  departureDate: Yup.date().required('Gidiş tarihi zorunludur'),
  returnDate: Yup.date()
    .required('Dönüş tarihi zorunludur')
    .min(Yup.ref('departureDate'), 'Dönüş tarihi gidiş tarihinden önce olamaz'),
  passengers: Yup.number()
    .min(1, 'Kişi sayısı en az 1 olmalı')
    .max(6, 'Kişi sayısı en fazla 6 olmalıdır')
    .required('Kişi sayısı zorunludur'),
});

const FlightSearchComponent: React.FC<SearchProps> = ({ onSearch }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ text: '', value: '' });

  const { destinations, loading, error } = useSelector(
    (state: RootState) => state.flights,
  );

  // Uçuş verilerini fetch et
  useEffect(() => {
    dispatch(fetchDestinations());
  }, [dispatch]);

  const handleSelect = (text: string, value: string) => {
    setSelectedOption({ text, value });
    setModalVisible(false);
  };

  // Destinasyonları uygun formata çevir
  const formattedDestinations = destinations.map(destination => {
    const text = destination.city
      ? `${destination.city}, ${destination.country}`
      : destination.country;
    return {
      value: destination.iata,
      text: text,
    };
  });

  return (
    <View>
      <Formik
        initialValues={{
          departureDate: new Date(),
          returnDate: new Date(),
          passengers: 1,
          showDeparturePicker: false,
          showReturnPicker: false,
        }}
        validationSchema={SearchSchema}
        onSubmit={values => {
          onSearch(
            values.departureDate,
            values.returnDate,
            values.passengers,
            selectedOption.value,
          );
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            <Text style={styles.header}>Uçuş Ara</Text>

            <View style={styles.datePickerContainer}>
              <View style={styles.datePicker}>
                <Text style={styles.label}>Gidiş Tarihi</Text>
                <PrimaryButton
                  title={values.departureDate.toLocaleDateString()}
                  onPress={() => setFieldValue('showDeparturePicker', true)}
                />
                <ErrorMessage name="departureDate">
                  {msg => <Text style={styles.errorText}>{msg}</Text>}
                </ErrorMessage>
              </View>

              <View style={styles.datePicker}>
                <Text style={styles.label}>Dönüş Tarihi</Text>
                <PrimaryButton
                  title={values.returnDate.toLocaleDateString()}
                  onPress={() => setFieldValue('showReturnPicker', true)}
                />
                <ErrorMessage name="returnDate">
                  {msg => <Text style={styles.errorText}>{msg}</Text>}
                </ErrorMessage>
              </View>
            </View>

            <View style={styles.datePickerContainer}>
              <View style={styles.datePicker}>
                <Text style={styles.label}>Kişi Sayısı</Text>
                <View style={styles.passengerControl}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#ddd',
                      borderRadius: 50,
                    }}>
                    <Icon
                      name="remove"
                      size={30}
                      onPress={() =>
                        setFieldValue(
                          'passengers',
                          Math.max(values.passengers - 1, 1),
                        )
                      }
                    />
                  </View>
                  <Text style={styles.passengerCount}>{values.passengers}</Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#ddd',
                      borderRadius: 50,
                    }}>
                    <Icon
                      name="add"
                      size={30}
                      onPress={() =>
                        setFieldValue(
                          'passengers',
                          Math.min(values.passengers + 1, 6),
                        )
                      }
                    />
                  </View>
                </View>
                {touched.passengers && errors.passengers && (
                  <Text style={styles.errorText}>{errors.passengers}</Text>
                )}
              </View>

              <View style={styles.datePicker}>
                <Text style={styles.label}>Gidiş Noktası</Text>
                <Pressable
                  onPress={() => setModalVisible(true)}
                  style={styles.pressableButton}>
                  <Text style={styles.pressableButtonText}>
                    {selectedOption.text || 'Henüz Seçilmedi'}
                  </Text>
                </Pressable>
                <ModalListComponent
                  data={formattedDestinations}
                  isVisible={isModalVisible}
                  onClose={() => setModalVisible(false)}
                  onSelect={handleSelect}
                />
              </View>
            </View>

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <IconButton title="Ara" onPress={handleSubmit} />
            )}

            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Tarih Seçiciler */}
            <DatePicker
              modal
              locale="tr"
              open={values.showDeparturePicker}
              date={values.departureDate}
              onConfirm={date => {
                setFieldValue('departureDate', date);
                setFieldValue('showDeparturePicker', false);
              }}
              onCancel={() => setFieldValue('showDeparturePicker', false)}
            />
            <DatePicker
              modal
              locale="tr"
              open={values.showReturnPicker}
              date={values.returnDate}
              onConfirm={date => {
                setFieldValue('returnDate', date);
                setFieldValue('showReturnPicker', false);
              }}
              onCancel={() => setFieldValue('showReturnPicker', false)}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: '800',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  datePicker: {
    flex: 1,
    marginHorizontal: 5,
  },
  passengerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  passengerControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passengerCount: {
    fontSize: 24,
    marginHorizontal: 16,
  },
  modalTrigger: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  pressableButton: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    alignItems: 'center',
  },
  pressableButtonText: {
    color: 'tomato',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FlightSearchComponent;
