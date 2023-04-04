import axios from "axios";

import { apiConfig } from "@/config";

console.log(apiConfig.endpoint);

const API = axios.create({
  baseURL: "http://localhost:4444/api",
});

export default API;
