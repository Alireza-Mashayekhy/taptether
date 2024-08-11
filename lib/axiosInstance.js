// axiosInstance.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://emdadkhodro.tech/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosInstance;
