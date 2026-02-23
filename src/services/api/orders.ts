import { apiClient } from './client';

export const ordersApi = {
  list(token: string, params?: any) {
    return apiClient('/api/orders', { method: 'GET', params }, token);
  },

  getById(orderId: number, token: string) {
    return apiClient(`/api/orders/${orderId}`, { method: 'GET' }, token);
  },

  place(data: any, token: string) {
    return apiClient('/api/orders', { method: 'POST', body: data }, token);
  },
};
