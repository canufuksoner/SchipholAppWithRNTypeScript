import apiClient from '../../utils/axiosInterceptor';
import { Flight } from '../../models/flight';

// Tüm uçuşları getiren fonksiyon
export const fetchFlightsApi = async () => {
    const response = await apiClient.get('/flights?includedelays=false&page=0&sort=%2BscheduleTime');
    return response.data; // API'den gelen veriyi döndür
};

// Uçuş ID'sine göre uçuş getiren fonksiyon
export const fetchFlightByIdApi = async (id: string): Promise<Flight> => {
    const response = await apiClient.get(`/flights/${id}`);
    return response.data; // API'den gelen veriyi döndür
};

// Destinasyonları getiren fonksiyon
export const fetchDestinationsApi = async () => {
    const response = await apiClient.get('/destinations');
    return response.data;
};

// Koltuk seçimini backend'e POST eden fonksiyon
export const postSeatSelectionApi = async (flightId: string, seat: string) => {
    const response = await apiClient.post(`/flights/${flightId}/seat-selection`, {
        seat, // Seçilen koltuk
    });
    return response.data; // API'den gelen yanıtı döndür
};
