import { apiClient } from '../client';

export const adminUsersApi = {
  list(token?: string | null, params?: any) {
    return apiClient('/api/admin/users', { method: 'GET', params }, token);
  },
};
