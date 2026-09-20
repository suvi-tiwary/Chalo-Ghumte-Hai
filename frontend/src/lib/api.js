const configuredApiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

const apiBaseUrl = configuredApiUrl.replace(/\/$/, "");

export function apiUrl(path) {
  return `${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
