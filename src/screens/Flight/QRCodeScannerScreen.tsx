import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner'; 
import { RNCamera } from 'react-native-camera';

import { useDispatch } from 'react-redux';
import { fetchFlightById } from '../../store/Actions/flightActions';
import { AppDispatch } from '../../store/store';

type RootStackParamList = {
    FlightDetails: { flightId: string };
};

const QRCodeScannerScreen = () => {
    const dispatch: AppDispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const onSuccess = async (e: { data: string }) => {
        const scannedData = e.data; // QR kod verisini çıkar
        setLoading(true);
    
        try {
            const response = await dispatch(fetchFlightById(scannedData));
            // Burada payload'ı kontrol edin
            if (response && response.type === 'flight/fetchFlightById/fulfilled') {
                navigation.navigate('FlightDetails', { flightId: scannedData });
            } else {
                Alert.alert('Hata', 'Rezervasyon bilgisi bulunamadı.');
            }
        } catch (error: any) {
            Alert.alert('Hata', error.message || 'Bir hata oluştu, lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="tomato" />
                <Text>Yükleniyor...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <QRCodeScanner
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.off}
                topContent={<Text style={styles.centerText}>Uçuş QR kodunuzu okutun</Text>}
                bottomContent={<Text style={styles.centerText}>Uçuş bilgilerinizi görüntülemek için QR kodu tarayın</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerText: {
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'tomato',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default QRCodeScannerScreen;
