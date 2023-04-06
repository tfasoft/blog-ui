import axios from "axios";

import { apiConfig } from "@/config";

const API = axios.create({
  baseURL: apiConfig.endpoint || "http://localhost:4444/api",
});

export default API;
