import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  //
  //baseURL: "http://192.168.0.138:3000",
  baseURL: "http://192.168.0.138:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
