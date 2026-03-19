import axios from "axios";
import { apiConfig } from "../utils/apiConfig";

interface RefreshResponse {
  access: string;
}

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================================================
// 🚀 REQUEST INTERCEPTOR — Add Access Token
// =====================================================
axiosClient.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =====================================================
// 🚀 RESPONSE INTERCEPTOR — Refresh Token Logic
// =====================================================
axiosClient.interceptors.response.use(
  (response) => response,

  async (error: any) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");

        if (!refresh) {
          localStorage.clear();
          // Instead of redirect, dispatch event for React to handle
          window.dispatchEvent(new Event('auth:logout'));
          return Promise.reject(error);
        }

        // Refresh token API - Direct endpoint without /api/v1
        const refreshResponse = await axios.post<RefreshResponse>(
          `${apiConfig.host}/token/refresh/`,
          { refresh }
        );

        const newAccess = refreshResponse.data.access;

        localStorage.setItem("access", newAccess);

        // Update request header
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccess}`,
        };

        // Retry original request
        return axiosClient(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        // Instead of redirect, dispatch event for React to handle
        window.dispatchEvent(new Event('auth:logout'));
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
