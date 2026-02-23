import { apiClient } from './client';

export const userApi = {
  getMe(token: string) {
    return apiClient('/api/me', { method: 'GET' }, token);
  },
};
