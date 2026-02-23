import { apiClient } from './client';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://Api.ahnoudnuts.com';

export const authApi = {
  register(data: any) {
    return apiClient('/api/auth/register', { method: 'POST', body: data });
  },

  login(data: any) {
    return apiClient('/api/auth/login', { method: 'POST', body: data });
  },

  confirmEmail(token: string) {
    return apiClient('/api/auth/confirm-email', { method: 'GET', params: { token } });
  },

  resendConfirmation(email: string) {
    return apiClient('/api/auth/resend-confirmation', { method: 'POST', body: { email } });
  },

  getGoogleLoginUrl() {
    return `${BASE_URL}/api/auth/google`;
  },

  getAppleLoginUrl() {
    return `${BASE_URL}/api/auth/apple`;
  },
};