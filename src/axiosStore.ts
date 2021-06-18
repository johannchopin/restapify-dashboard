import axios from 'axios'

// @ts-ignore
const port = (process.env.NODE_ENV === 'development' 
  ? 6767 
  : new URL(window.location.href).port)

// @ts-ignore
const baseUrl = (process.env.NODE_ENV === 'development' 
  ? '/dev/restapify/api' 
  : '/restapify/api')

const instance = axios.create({
  baseURL: `http://localhost:${port}${baseUrl}`
})

export default instance
