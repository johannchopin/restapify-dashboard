import axios from 'axios'

// @ts-ignore
const port = (process.env.NODE_ENV === 'development' 
  ? 6767 
  : new URL(window.location.href).port)

// @ts-ignore
const baseURL = (process.env.NODE_ENV === 'development' 
  ? 'http://localhost:6767/dev/restapify/api' 
  : 'api')

const instance = axios.create({ baseURL })

export default instance
