import axios from "axios";

export const api = axios.create({
  baseURL: "https://full-stack-dynamic-form-builder-system-1.onrender.com/api",
});
