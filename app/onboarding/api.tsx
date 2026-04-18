import axios from "axios";

const API = axios.create({
  baseURL: "https://credit-api.hayokmedicare.ng/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default API;