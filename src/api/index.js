import axios from "axios";

import { apiConfig } from "@/config";

const API = axios.create({
  baseURL: process.env["API_URL"],
});

export default API;
