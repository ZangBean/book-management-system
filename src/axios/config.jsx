// src/api/axiosConfig.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://68a28561c5a31eb7bb1d1667.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    // Nếu dùng authentication token, có thể thêm vào đây:
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(
      'API Error:',
      error.response ? error.response.status : error.message
    )
    return Promise.reject(error)
  }
)

export default api
