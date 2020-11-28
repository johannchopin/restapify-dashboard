import axios from 'axios'

const url = new URL(window.location.href)
//const port = url.port

// for development purpose only
const port = 6767

const instance = axios.create({
  baseURL: `http://localhost:${port}/restapify/api`
})

export default instance
