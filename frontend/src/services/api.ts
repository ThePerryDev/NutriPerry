import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
<<<<<<< Updated upstream
  baseURL: "http://localhost:3000",
=======
  //
  //baseURL: "http://192.168.0.20:3000",
  baseURL: "http://192.168.0.20:3000",
>>>>>>> Stashed changes
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
