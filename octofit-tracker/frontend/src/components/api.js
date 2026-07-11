const codespaceName = typeof import.meta.env.VITE_CODESPACE_NAME === 'string'
  ? import.meta.env.VITE_CODESPACE_NAME.trim()
  : '';

export const CODESPACE_NAME = codespaceName;
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

// Debug: log resolved environment values at runtime
try {
  // eslint-disable-next-line no-console
  console.info('[api] VITE_CODESPACE_NAME=', codespaceName, 'API_BASE_URL=', API_BASE_URL)
} catch (e) {
  // ignore logging errors in some environments
}

export function getApiUrl(resource) {
  return `${API_BASE_URL}/api/${resource}/`;
}

export function normalizeApiResponse(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload?.data && Array.isArray(payload.data)) return payload.data;
  if (payload?.results && Array.isArray(payload.results)) return payload.results;
  if (payload?.items && Array.isArray(payload.items)) return payload.items;
  return [];
}
