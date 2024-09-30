import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../store/store';

import CustomInput from '../../components/UI/Inputs/CustomInput';
import PrimaryButton from '../../components/UI/Buttons/PrimaryButton';
import {useApiContext} from '../../utils/ApiContext';
import ToastComponent from '../../components/UI/ToastComponent';

const PasswordChangeScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch: AppDispatch = useDispatch();

  const {password, username, setCredentials, clearCredentials} = useApiContext();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = () => {
    setError('');

    if (oldPassword !== password) {
      setError('Mevcut şifre bilgisini hatalı girdiniz');
      return;
    }

    if (newPassword === oldPassword) {
      setError('Yeni şifre eski şifreyle aynı olamaz.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Şifre en az 6 haneli olmalıdır.');
      return;
    }
    if (!/^\d+$/.test(newPassword)) {
      setError('Şifre yalnızca sayılardan oluşmalıdır.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    clearCredentials();
    setCredentials(username, newPassword);

    Alert.alert(
      'Başarılı',
      'Şifreniz başarıyla değiştirildi.',
      [
        {
          text: 'OK',
          onPress: () =>     navigation.navigate('Login')   // Login ekranına yönlendir
        },
      ],
      { cancelable: false }
    );  };

  return (
    <View style={styles.container}>
      {error && <ToastComponent type="error" title="Hata!" message={error} />}

      <CustomInput
        placeholder="Eski Şifre"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
        error={error ? '' : undefined}
      />

      <CustomInput
        placeholder="Yeni Şifre"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        keyboardType="numeric"
      />

      <CustomInput
        placeholder="Yeni Şifreyi Onayla"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        keyboardType="numeric"
      />

      <PrimaryButton title="Şifreyi Değiştir" onPress={handlePasswordChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PasswordChangeScreen;
