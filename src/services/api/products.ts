import { apiClient } from './client';

export const productsApi = {
  list(params?: any) {
    return apiClient('/api/products', { method: 'GET', params });
  },

  getById(id: number) {
    return apiClient(`/api/products/${id}`, { method: 'GET' });
  },
};
