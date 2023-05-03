import axios from 'axios';

const API_URL = 'https://backend-dummy.hospitaldeespecialidades.com.sv/api';

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    throw new Error('Error al iniciar sesión. Por favor, verifique sus credenciales e intente de nuevo.');
  }
};

export const getMedicines = async (token) => {
  try {
    const response = await api.get('/medicines', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Error de autenticación. Por favor, inicie sesión para continuar.');
    } else {
      throw new Error('Error al obtener la lista de medicamentos. Por favor, inténtelo de nuevo más tarde.');
    }
  }
};

export const addMedicine = async (token, medicine) => {
  try {
    const response = await api.post('/medicines', medicine, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Error de autenticación. Por favor, inicie sesión para continuar.');
    } else {
      throw new Error('Error al agregar el medicamento. Por favor, inténtelo de nuevo más tarde.');
    }
  }
};

export const updateMedicine = async (token, id, medicine) => {
  try {
    const response = await api.put(`/medicines/${id}`, medicine, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Error de autenticación. Por favor, inicie sesión para continuar.');
    } else if (error.response && error.response.status === 404) {
      throw new Error('El medicamento que intenta actualizar no existe.');
    } else {
      throw new Error('Error al actualizar el medicamento. Por favor, inténtelo de nuevo más tarde.');
    }
  }
};

export const deleteMedicine = async (token, id) => {
  try {
    const response = await api.delete(`/medicines/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Error de autenticación. Por favor, inicie sesión para continuar.');
    } else if (error.response && error.response.status === 404) {
      throw new Error('El medicamento que intenta eliminar no existe.');
    } else {
      throw new Error('Error al eliminar el medicamento. Por favor, inténtelo de nuevo más tarde.');
    }
  }
};
