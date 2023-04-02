import axios from "axios";

import config from "../config";

const API = axios.create({
  baseURL: config.baseUrl,
});

export default API;
