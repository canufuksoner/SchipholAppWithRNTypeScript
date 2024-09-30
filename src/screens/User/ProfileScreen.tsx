import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { logout } from '../../store/Slices/authSlices'; // authSlice'daki logout fonksiyonu
import { AppDispatch } from '../../store/store';
import DangerButton from '../../components/UI/Buttons/DangerButton';
import { useApiContext } from '../../utils/ApiContext';

// Navigation parametre tipleri
type RootStackParamList = {
  PastFlights: undefined;
  UpcomingFlights: undefined;
  Login: undefined;
  PasswordChange: undefined;
};

const OptionButton: React.FC<{ title: string; onPress: () => void }> = ({
  title,
  onPress,
}) => (
  <TouchableOpacity style={styles.optionButton} onPress={onPress}>
    <View style={styles.buttonContent}>
      <Text style={styles.optionText}>{title}</Text>
      <Text style={styles.icon}>{'>'}</Text>
    </View>
  </TouchableOpacity>
);

const ProfileScreen = () => {
  const {clearCredentials} = useApiContext();

  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [flightsCompleted, setFlightsCompleted] = useState(24);
  const maxFlights = 50;
  const flightPoints = 3200;

  const progress = flightsCompleted / maxFlights;

  const getMembershipColor = () => {
    if (progress < 0.33) return 'green'; // Green membership
    if (progress < 0.66) return 'gold'; // Gold membership
    return 'black'; // Black membership
  };

  const handleLogout = () => {
    dispatch(logout());
    clearCredentials();
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.userInfo}>
          <Icon name="user" size={60} color="#000" />
          <Text style={styles.userName}>Can Ufuk</Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.flightsText}>
            Uçuşlarım: {flightsCompleted}/50
          </Text>
        </View>

        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>Green</Text>
          <Text style={styles.progressTextRight}>Black</Text>
        </View>
        <ProgressBar
          progress={progress}
          color={getMembershipColor()}
          style={styles.progressBar}
        />

        <View style={styles.pointsContainer}>
          <Text style={styles.pointsLabel}>Uçuş Puanı:</Text>
          <Text style={styles.pointsValue}>{flightPoints}</Text>
        </View>

        <OptionButton
          title="Şifre Değiştir"
          onPress={() => navigation.navigate('PasswordChange')}
        />
        <OptionButton
          title="Geçmiş Uçuşlar"
          onPress={() => navigation.navigate('PastFlights')}
        />
        <OptionButton
          title="Gelecek Uçuşlar"
          onPress={() => navigation.navigate('UpcomingFlights')}
        />
      </View>

      <DangerButton onPress={handleLogout} title="Çıkış Yap" />
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  userName: {
    fontSize: width > 400 ? 28 : 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  flightsText: {
    fontSize: width > 400 ? 18 : 16,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  progressText: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  progressTextRight: {
    fontSize: 16,
    color: 'black',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  pointsContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  pointsLabel: {
    fontSize: 18,
    color: '#555',
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 8,
    borderBottomColor: '#df5d42',
    borderBottomWidth: 1,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  optionText: {
    fontSize: 18,
    color: '#df5d42',
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 18,
    color: '#df5d42',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
