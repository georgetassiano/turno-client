import { createAuth } from 'vue-auth3'
import axios from './axios'
import driverAuthBearer from 'vue-auth3/drivers/auth/bearer-token'
import router from '@/router'

export default createAuth({
  fetchData: {
    enabled: true, // send a request to `/api/user` if the user information stored in the cookie is not visible
    cache: false, //save user information to localStorage for use
    enabledInBackground: false // refresh user information in the background
  },
  refreshToken: {
    enabled: false, // refresh token in goto page
    enabledInBackground: false // refresh token in background
  },
  drivers: {
    http: {
      request: axios
    },
    auth: driverAuthBearer
  },
  plugins: {
    router
  }
})
