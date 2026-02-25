import { apiClient } from '../client';

export const adminProductsApi = {
  list(token?: string | null, params?: any) {
    return apiClient('/api/admin/products', { method: 'GET', params }, token);
  },

  getById(productId: number, token?: string | null) {
    return apiClient(`/api/admin/products/${productId}`, { method: 'GET' }, token);
  },

  create(data: any, token?: string | null) {
    return apiClient('/api/admin/products', { method: 'POST', body: data }, token);
  },

  update(productId: number, data: any, token?: string | null) {
    return apiClient(`/api/admin/products/${productId}`, { method: 'PUT', body: data }, token);
  },

  delete(productId: number, token?: string | null) {
    return apiClient(`/api/admin/products/${productId}`, { method: 'DELETE' }, token);
  },
};
