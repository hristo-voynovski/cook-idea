import axios from "axios";

const API = axios.create({baseURL: process.env.REACT_APP_API_URL});

export const register = (userData: {username:string, email:string, password:string}) => API.post("/auth/register", userData);

export const login = (userData: {email:string, password: string}) => API.post("auth/login", userData);
