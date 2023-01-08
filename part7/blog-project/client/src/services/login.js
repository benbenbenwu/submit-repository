import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3001/api/login'
})


export const login = async credentials => {
  const res = await api.post('/', credentials)
  return res.data
}