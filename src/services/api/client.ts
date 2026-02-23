const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

   
function buildUrl(path: string, params?: Record<string, any>): string {
  let url: string;

  if (BASE_URL) {
    const fullUrl = new URL(path, BASE_URL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        fullUrl.searchParams.set(key, String(value));
      });
    }
    return fullUrl.toString();
  }

  url = path;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }
  return url;
}

function getAuthHeaders(token?: string | null): HeadersInit {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function apiClient(
  path: string,
  { body, params, headers, ...options }: any = {},
  token?: string | null
) {
  const response = await fetch(buildUrl(path, params), {
    ...options,
    headers: {
      ...getAuthHeaders(token),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new ApiError(response.status, error.error || 'Request failed');
  }

  return response.json();
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}