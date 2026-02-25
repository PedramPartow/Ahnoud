import { apiClient } from '../client';

export const adminOrdersApi = {
  list(token?: string | null, params?: any) {
    return apiClient('/api/admin/orders', { method: 'GET', params }, token);
  },

  getById(orderId: number, token?: string | null) {
    return apiClient(`/api/admin/orders/${orderId}`, { method: 'GET' }, token);
  },

  updateStatus(orderId: number, data: any, token?: string | null) {
    return apiClient(`/api/admin/orders/${orderId}/status`, { method: 'PATCH', body: data }, token);
  },
};
