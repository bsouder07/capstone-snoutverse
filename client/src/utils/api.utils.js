import axios from "axios";
import { NODE_ENV } from "../configs/constants";

const api = axios.create({
  baseURL:
    NODE_ENV === "production"
      ? VITE_API_URL
      : "http://localhost:3001/api",
});

export const setAccessToken = (token) => {
  if (!token) {
    delete api.defaults.headers.common["Authorization"];
    return;
  }

  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default api;
