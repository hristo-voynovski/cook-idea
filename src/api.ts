import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"});

export const register = (userData: {username:string, email:string, password:string}) => API.post("/auth/register", userData);

export const login = (userData: {email:string, password: string}) => API.post("auth/login", userData);
