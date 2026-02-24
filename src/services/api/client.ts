const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const PROXY_PREFIX = '/api/proxy';

function isAbsoluteHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function readLangFromCookie(cookieValue: string): string | null {
  const localeCookie = cookieValue
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith('locale='));

  if (!localeCookie) return null;
  const [, locale] = localeCookie.split('=');
  return locale ? decodeURIComponent(locale) : null;
}

function getCurrentLang(): string {
  if (typeof window !== 'undefined') {
    const fromCookie = readLangFromCookie(document.cookie);
    const fromHtml = document.documentElement.lang || null;
    return fromCookie || fromHtml || 'en';
  }

  return process.env.LANG || 'en';
}

function buildUrl(path: string, params?: Record<string, any>): string {
  let url: string;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (BASE_URL) {
    const shouldUseProxy = typeof window !== 'undefined' && isAbsoluteHttpUrl(BASE_URL);

    if (shouldUseProxy) {
      url = `${PROXY_PREFIX}${normalizedPath}`;
      if (params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          searchParams.set(key, String(value));
        });
        url += `?${searchParams.toString()}`;
      }
      return url;
    }

    const fullUrl = new URL(normalizedPath, BASE_URL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        fullUrl.searchParams.set(key, String(value));
      });
    }
    return fullUrl.toString();
  }

  url = normalizedPath;
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
  const lang = getCurrentLang();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Lang': lang,
    'Accept-Language': lang,
  };
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