import axios from 'axios';

const API_BASE = 'http://192.168.100.22:5000/api'; // Replace with your backend URL

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// REGISTER
export const registerUser = async (userData: {
  name: string;
  email: string;
  phone: string;
  password: string;
  verificationMethod: 'email' | 'phone';
}) => {
  return await api.post('/users/register', userData);
};

// VERIFY OTP
export const verifyOtp = async(payload: { email: string; otp: string }) => {
  return await api.post('/users/verify-otp', payload);
};

// LOGIN
export const loginUser = async (payload: { email: string; password: string }) => {
  return await api.post('/users/login', payload);
};

// Logout
export const logout = async () => {
  return await api.post('/users/logout');
};


// FORGOT PASSWORD
export const forgotPassword = async (payload: { email: string }) => {
  return await api.post('/users/forgot-password', payload);
};

// RESET PASSWORD
export const resetPassword = async(payload: {
  otp: string;
  password: string;
  confirmPassword: string;
}) => {
  return await api.post('/users/reset-password', payload);
};

// FETCH CHAT HISTORY
export const fetchChatHistory = async (token: string) => {
  return await api.get('/chat/history', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// SEND MESSAGE TO BOTW
export const sendChatMessage = async (
  payload: { message: string },
  token: string
) => {
  return await api.post('/chat/send', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
