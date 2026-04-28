import axios from "axios";
import { getAuthToken } from "./authStorage";

/**
 * API BASE
 */
export const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://watch-project-dcvf.onrender.com/api";

/**
 * Axios instance
 */
export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

/**
 * Attach JWT token
 */
api.interceptors.request.use((cfg) => {
  const token = getAuthToken();
  if (token) {
    cfg.headers = cfg.headers || {};
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

/**
 * Backend host (for images)
 */
export function getImageBaseHost() {
  return API_BASE.replace(/\/api\/?$/i, "");
}

/**
 * Normalize image URL
 */
export function normalizeImageUrl(raw) {
  if (!raw || typeof raw !== "string") return null;

  const baseHost = getImageBaseHost();
  const trimmed = raw.trim();

  // already full URL
  if (
    trimmed.startsWith("http") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }

  // uploads path
  if (trimmed.includes("uploads")) {
    return `${baseHost}/${trimmed.replace(/^\/+/, "")}`;
  }

  return `${baseHost}/${trimmed.replace(/^\/+/, "")}`;
}