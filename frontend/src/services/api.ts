import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  //
  //baseURL: "http://10.68.55.203:3000",
  baseURL: "http://10.68.55.203:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
