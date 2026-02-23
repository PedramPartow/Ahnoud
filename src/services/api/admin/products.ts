import { apiClient } from '../client';

export const adminProductsApi = {
  list(token: string, params?: any) {
    return apiClient('/api/admin/products', { method: 'GET', params }, token);
  },

  create(data: any, token: string) {
    return apiClient('/api/admin/products', { method: 'POST', body: data }, token);
  },

  update(productId: number, data: any, token: string) {
    return apiClient(`/api/admin/products/${productId}`, { method: 'PUT', body: data }, token);
  },

  delete(productId: number, token: string) {
    return apiClient(`/api/admin/products/${productId}`, { method: 'DELETE' }, token);
  },
};
