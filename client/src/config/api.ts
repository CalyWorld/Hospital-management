type ViteEnvLike = {
  VITE_API_BASE_URL?: string;
};

const env = (import.meta as ImportMeta & { env?: ViteEnvLike }).env;
const apiBaseUrl =
  env?.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const buildApiUrl = (path: string) => `${apiBaseUrl}${path}`;
