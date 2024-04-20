import { COOKIES_KEY } from '@/utils/cookies'
import axios from 'axios'
import { deleteCookie } from 'cookies-next'

export const api = axios.create({
  baseURL: 'https://api.natoshi.app/',
  headers: {
    'Content-Type': 'application/json',
  },
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      deleteCookie(COOKIES_KEY.JWT)
      window.location.replace('/auth')
    }
    return error
  },
)
