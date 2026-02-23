import { apiClient } from '../client';

export const adminContactFormsApi = {
  list(token: string, params?: any) {
    return apiClient('/api/admin/contact-forms', { method: 'GET', params }, token);
  },

  getById(formId: number, token: string) {
    return apiClient(`/api/admin/contact-forms/${formId}`, { method: 'GET' }, token);
  },

  delete(formId: number, token: string) {
    return apiClient(`/api/admin/contact-forms/${formId}`, { method: 'DELETE' }, token);
  },
};
