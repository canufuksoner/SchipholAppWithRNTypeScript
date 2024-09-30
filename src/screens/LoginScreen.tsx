import React, {useEffect, useRef, useState} from 'react';
import * as Yup from 'yup';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {RootState, AppDispatch} from '../store/store';
import {login} from '../store/Actions/authActions';
import ToastComponent from '../components/UI/ToastComponent';
import CustomInput from '../components/UI/Inputs/CustomInput';
import {useApiContext} from '../utils/ApiContext';

const LoginScreen = () => {
  const [username, setUsername] = useState('username');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const {
    username: storedUsername,
    password: storedPassword,
    setCredentials,
    setUserToken,
  } = useApiContext();

  const {loading, error} = useSelector((state: RootState) => state.auth);

  const animatedValue = useRef(new Animated.Value(-100)).current;

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Kullanıcı adı gerekli'),
    password: Yup.string().required('Şifre gerekli'),
  });

  const handleLogin = async () => {
    try {
      await validationSchema.validate({username, password});

      if (
        (!storedUsername && !storedPassword) ||
        (username === storedUsername && password === storedPassword)
      ) {
        dispatch(login({username, password}));
        setCredentials(username, password);
        setUserToken('acc-token');
      } else {
        throw new Error('Kullanıcı adı veya şifre hatalı');
      }
    } catch (err: any) {
      ToastComponent({type: 'error', title: 'Hata', message: err.message});
    }
  };

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[styles.header, {transform: [{translateY: animatedValue}]}]}>
        <Icon name="plane" size={80} color="tomato" />
      </Animated.View>

      <Text style={styles.title}>Schiphol App</Text>

      <CustomInput
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
      />

      <CustomInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {storedPassword && <Text>Şifre: {storedPassword}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Giriş Yap</Text>
        )}
      </TouchableOpacity>

      {error && <ToastComponent type="error" title="Hata" message={error} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    margin: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'tomato',
    opacity: 0.9,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
