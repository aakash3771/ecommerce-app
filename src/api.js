import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com", // or your actual API base URL
});

export default api;
