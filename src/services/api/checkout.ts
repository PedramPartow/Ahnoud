import { apiClient } from './client';

export const checkoutApi = {
  checkout(token: string) {
    return apiClient('/api/checkout', { method: 'POST' }, token);
  },

  getGateways(token: string) {
    return apiClient('/api/payments/gateways', { method: 'GET' }, token);
  },

  initiatePayPal(orderId: number, token: string) {
    return apiClient(
      '/api/payments/initiate',
      { method: 'POST', body: { order_id: orderId, gateway: 'paypal' } },
      token
    );
  },

  initiateStripe(orderId: number, token: string) {
    return apiClient(
      '/api/payments/initiate',
      { method: 'POST', body: { order_id: orderId, gateway: 'stripe' } },
      token
    );
  },

  confirmPayment(data: any, token: string) {
    return apiClient('/api/payments/confirm', { method: 'POST', body: data }, token);
  },

  cancelPayment(orderId: number, token: string) {
    return apiClient(
      '/api/payments/cancel',
      { method: 'POST', body: { order_id: orderId } },
      token
    );
  },

  getPaymentStatus(orderId: number, token: string) {
    return apiClient(`/api/payments/${orderId}`, { method: 'GET' }, token);
  },
};
