import axios from 'axios';

export const fetchAirlinesApi = async () => {
    const response = await axios.get('https://api.schiphol.nl/public-flights/airlines', {
        headers: {
            Accept: 'application/json',
            app_id: 'b1e630f2',
            app_key: '05ff84255edaf3b64e03aec11469bb51',
            ResourceVersion: 'v4',
        },
    });
    return response.data; // API'den gelen veriyi döndür
};
