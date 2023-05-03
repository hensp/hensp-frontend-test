import axios from 'axios';

const API_URL = 'https://backend-dummy.hospitaldeespecialidades.com.sv/api';

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (usuario, password) => {
  try {
    const response = await api.post('/auth/login', { usuario, password });
    const token = response.data.token;
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', token);
    }
    return token;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Credenciales inválidas. Por favor, verifique sus datos e intente de nuevo.');
    } else {
      throw new Error('Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
    }
  }
};


export const getMedicines = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No se ha iniciado sesión.');
    }
    const response = await api.get('/medicamentos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('No se pudo autenticar. Por favor, inicie sesión para continuar.');
    } else {
      throw new Error('Error al obtener la lista de medicamentos. Por favor, inténtelo de nuevo más tarde.');
    }
  }
};


export const addMedicine = async (medicine) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.post('/medicamentos', medicine, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('No se pudo autenticar. Por favor, inicie sesión para continuar.');
    } else {
      throw new Error('Error al agregar el medicamento. Por favor, inténtelo de nuevo más tarde.');
    }
  }
};

export const updateMedicine = async (id, medicine) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.put(`/medicamentos/${id}`, medicine, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('No se pudo autenticar. Por favor, inicie sesión para continuar.');
    } else if (error.response && error.response.status === 404) {
      throw new Error('El medicamento que intenta actualizar no existe.');
    } else {
      throw new Error('Error al actualizar el medicamento. Por favor, inténtelo de nuevo más tarde.');
    }
  }
};

export const deleteMedicine = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.delete(`/medicamentos/${id}`, {
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
