import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3001/api/users'
})


export const getALLUser = async () => api.get('/').then(res => res.data)
