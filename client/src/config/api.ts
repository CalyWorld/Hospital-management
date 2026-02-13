const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const buildApiUrl = (path: string) => `${apiBaseUrl}${path}`;
