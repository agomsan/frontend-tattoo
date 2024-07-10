import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Reemplaza con la URL de tu backend
});

export const getData = async () => {
  try {
    const response = await api.get('/data');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos', error);
    throw error;
  }
};
