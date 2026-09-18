import axios from 'axios';

export const API_BASE_URL = 'http://10.0.2.2:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUserApi = async (payload: {
  fullName?: string;
  name?: string;
  email: string;
  phone: string;
  password: string;
}) => {
  const normalizedPayload = {
    name: payload.name ?? payload.fullName,
    email: payload.email,
    phone: payload.phone,
    password: payload.password,
  };

  const response = await api.post('/api/users/register', normalizedPayload);
  return response.data;
};

export const loginUserApi = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await api.post('/api/users/login', payload);
  return response.data;
};
