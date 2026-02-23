import { apiClient } from './client';

export const contactApi = {
  submit(data: any) {
    return apiClient('/api/contact', { method: 'POST', body: data });
  },
};
