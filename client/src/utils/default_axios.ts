import axios from "axios";
import address from "../config/server_address";

export default axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:8080" : address,
  headers: {
    "Content-type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true
})