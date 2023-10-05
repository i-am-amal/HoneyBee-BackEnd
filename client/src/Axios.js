import axios from "axios";
import { baseURL } from "./constants/Constants.js";
const instance = axios.create({
  baseURL:baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default instance;