import { apiClient } from './client';

export const cartApi = {
  get(token: string) {
    return apiClient('/api/cart', { method: 'GET' }, token);
  },

  addItem(data: any, token: string) {
    return apiClient('/api/cart/items', { method: 'POST', body: data }, token);
  },

  updateItem(itemId: number, data: any, token: string) {
    return apiClient(`/api/cart/items/${itemId}`, { method: 'PUT', body: data }, token);
  },

  removeItem(itemId: number, token: string) {
    return apiClient(`/api/cart/items/${itemId}`, { method: 'DELETE' }, token);
  },

  clear(token: string) {
    return apiClient('/api/cart', { method: 'DELETE' }, token);
  },
};
