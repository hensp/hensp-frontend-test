import axios from 'axios';

const API_URL = 'https://backend-dummy.hospitaldeespecialidades.com.sv/api';

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const getMedicines = async (token) => {
  const response = await api.get('/medicines', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addMedicine = async (token, medicine) => {
  const response = await api.post('/medicines', medicine, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateMedicine = async (token, id, medicine) => {
  const response = await api.put(`/medicines/${id}`, medicine, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteMedicine = async (token, id) => {
  const response = await api.delete(`/medicines/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
