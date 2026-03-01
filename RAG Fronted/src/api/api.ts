import axios from "axios";
import { APP_CONFIG } from "../app/AppConst";

const api = axios.create({
  baseURL: APP_CONFIG.url,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}[] = [];

function notifySessionExpired() {
  window.dispatchEvent(new Event("SESSION_EXPIRED"));
}

function processQueue(error: any) {
  failedQueue.forEach((p) =>
    error ? p.reject(error) : p.resolve(null)
  );
  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    // 🚫 Never retry auth actions
    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/logout")
    ) {
      return Promise.reject(error);
    }

    // 🔥 Refresh failed → REAL logout
    if (originalRequest.url?.includes("/auth/refresh")) {
      notifySessionExpired();
      return Promise.reject(error);
    }

    // 🔁 Prevent infinite loop
    if (originalRequest._retry) {
      notifySessionExpired();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // ⏳ If refresh already running → queue
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    isRefreshing = true;

    try {
      // 🔑 Always TRY refresh — backend decides validity
      await api.post("/auth/refresh");

      processQueue(null);
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      notifySessionExpired();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;