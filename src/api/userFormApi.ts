import axios from "axios";  
import type { User } from "../types/user";

const BASE_URL = "http://localhost:3001/users"

export const getUsers=()=>axios.get<User[]>(BASE_URL);
export const createUser=(data:User)=>axios.post(BASE_URL,data);
export const updateUser=(id:number,data:User)=>axios.put(`${BASE_URL}/${id}`,data)
export const deleteUser=(id:number)=>axios.delete(`${BASE_URL}/${id}`)