import axios from 'axios';
import {parseCookies} from 'nookies'
let  cookies = parseCookies()
export const api = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  headers: {
      Authorization: `Bearer ${cookies['spotifyauth.token']}`
  }
})
