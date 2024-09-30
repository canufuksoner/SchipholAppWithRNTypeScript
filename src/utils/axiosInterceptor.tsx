import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.schiphol.nl/public-flights',
});


apiClient.interceptors.request.use(
    config => {
        config.headers.Accept = 'application/json';
        config.headers.app_id = 'b1e630f2';
        config.headers.app_key = '05ff84255edaf3b64e03aec11469bb51';
        config.headers.ResourceVersion = 'v4';
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default apiClient;
