import axios from "axios";

const API_URL = "http://localhost:5000";

export const secureApi = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export const guestApi = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

secureApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

secureApi.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await guestApi.post(`${API_URL}/auth/refresh-web`, {
            withCredentials: true
        });
        
        localStorage.setItem("token", response.data.accessToken);
        return secureApi.request(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }
  }
);
