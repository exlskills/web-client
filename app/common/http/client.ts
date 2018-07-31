import axios from 'axios'
import { AUTH_URL } from '../constants'

const client = axios.create({
  baseURL: AUTH_URL,
  withCredentials: true
})
client.defaults.headers.post['Content-Type'] = 'application/json'

export default client
