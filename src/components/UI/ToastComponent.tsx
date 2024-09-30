import React from 'react';
import Toast from 'react-native-toast-message';

interface ToastComponentProps {
  type: 'success' | 'error' | 'info'; // Mesaj türleri
  title: string; // Başlık
  message: string | null; // Mesaj içeriği
}

const ToastComponent: React.FC<ToastComponentProps> = ({ type, title, message }) => {
  React.useEffect(() => {
    if (message) { // Mesajın null olup olmadığını kontrol et
      Toast.show({
        type: type,
        text1: title,
        text2: message,
        position: 'top',
      });
    }
  }, [type, title, message]);

  return <Toast />;
};

export default ToastComponent;
