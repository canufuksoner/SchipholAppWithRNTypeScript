import React, {useState, Suspense, lazy} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider, useSelector} from 'react-redux';
import store, {RootState} from './src/store/store'; // Redux store
import ToastComponent from './src/components/UI/ToastComponent';
import SplashScreen from './src/screens/SplashScreen';
import {ApiProvider, useApiContext} from './src/utils/ApiContext';

const LoginScreen = lazy(() => import('./src/screens/LoginScreen'));
const BottomNavigator = lazy(() => import('./src/navigation/BottomNavigator'));

function MainApp() {
  const { token } = useApiContext();
  const error = useSelector((state: RootState) => state.status.error);
  const [isSplashVisible, setSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setSplashVisible(false);
  };

  if (error != null) {
    return <ToastComponent type="error" title="Hata" message={error} />;
  }

  if (!token) {
    return (
      <Suspense
        fallback={
          <View>
            <Text>Yükleniyor...</Text>
          </View>
        }>
        <LoginScreen />
      </Suspense>
    );
  }

  if (isSplashVisible) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <Suspense
      fallback={
        <View>
          <Text>Yükleniyor...</Text>
        </View>
      }>
      <BottomNavigator />
    </Suspense>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <ApiProvider>
        <View style={[styles.container, backgroundStyle]}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <MainApp />
        </View>
      </ApiProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
