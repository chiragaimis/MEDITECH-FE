import axios from "axios";
import { apiConfig } from "../utils/apiConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: { "Content-Type": "application/json" },
});

// Queue to hold requests while token is being refreshed
let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (err: any) => void }[] = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
};

const logout = () => {
  localStorage.clear();
  window.dispatchEvent(new Event("auth:logout"));
};

// REQUEST — attach access token
axiosClient.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("access");
  if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  return config;
});

// RESPONSE — silent token refresh on 401
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const refresh = localStorage.getItem("refresh");
    if (!refresh) {
      logout();
      return Promise.reject(error);
    }

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosClient(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await axios.post<{ access: string }>(
        `${apiConfig.host}/auth/token/refresh/`,
        { refresh }
      );

      localStorage.setItem("access", data.access);
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
      originalRequest.headers.Authorization = `Bearer ${data.access}`;

      processQueue(null, data.access);
      return axiosClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      logout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosClient;
