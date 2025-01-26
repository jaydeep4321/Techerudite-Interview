import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const AUTH_SERVICES = {
  async adminRgister(data: any) {
    return axios.post<{ userId: number; message: string }>(
      `${API_URL}/auth/admin/register`,
      data
    );
  },
  async customerRgister(data: any) {
    return axios.post<{ userId: number; message: string }>(
      `${API_URL}/auth/customer/register`,
      data
    );
  },
  async verifyOtp(data: any) {
    return axios.post(`${API_URL}/auth/verify-email`, data);
  },
  async adminLogin(data: any) {
    return axios.post(`${API_URL}/auth/login`, data);
  },
};
