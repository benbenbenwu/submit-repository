

import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3001/api/blogs'
})

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAll = () => api.get('/').then(res => res.data)


export const create = async (blogObject) => {

  const config = {
    headers: { Authorization: token },
  }

  const res = await api.post('/', blogObject, config)

  return res.data
}

export const update = async (id, blogObject) => await api.put(`/${id}`, blogObject)

export const del = async (id, username) => {
  const config = {
    headers: { Authorization: token },
    data: {
      username
    }
  }
  await api.delete(`/${id}`, config)
}