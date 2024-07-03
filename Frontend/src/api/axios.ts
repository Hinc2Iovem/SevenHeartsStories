import axios from "axios";

const BASE_URL = "http://localhost:3500";

export const axiosCustomized = axios.create({
  baseURL: BASE_URL,
});
