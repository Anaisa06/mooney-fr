import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import https from 'https';


// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });

const backApiUrl = 'http://prepared-rita-mooney-02759274.koyeb.app/api/';

// const backApiUrl = 'http://192.168.1.7:3002/api/'


const apiAxiosInstance = axios.create({
    baseURL: backApiUrl,
    timeout: 10000,     
    headers: {
      'Content-Type': 'application/json',
  },
  });

  apiAxiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
);

apiAxiosInstance.interceptors.response.use(
    (response) =>{
      return response;
    },
    (error) => {
      console.error('Response error:', error.toJSON());
      if (error.response) {
        const customError = {
          message: error.response.data.message || 'Algo salió mal',
          status: error.response.status,
          
        };
        return Promise.reject(customError);
      } else if (error.request) {
        return Promise.reject({ message: 'No se recibió respuesta del servidor', status: 503 });
      } else {
        return Promise.reject({ message: 'Error en la solicitud', status: 500 });
      }
    }
  )

  export default apiAxiosInstance;