import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3001/persons'
})


export const getAll = () => api.get('/')

export const create = personObj => api.post('/', personObj)

export const update = (id, personObj) => api.put(`/${id}`, personObj)

export const del = id => api.delete(`/${id}`)