import axios from 'axios'

// @ts-ignore
const port = (__NODE_ENV__ === 'development' 
  ? 6767 
  : new URL(window.location.href).port)

const instance = axios.create({
  baseURL: `http://localhost:${port}/restapify/api`
})

export default instance
