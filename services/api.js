import axios, { AxiosError } from 'axios';
import {parseCookies, setCookie} from 'nookies'
 
let  cookies = parseCookies()
let isRefreshing = false
let failedRequestsQueue = []
 
export const api = axios.create({
   baseURL: 'https://api.spotify.com/v1/',
   headers: {
       Authorization: `Bearer ${cookies['spotifyauth.token']}`
   }
})
 
const apinext = axios.create({
   baseURL: '/api'
})
 
api.interceptors.response.use(response => {
   return response
}, (error) => {
   if (error.response.status === 401) {
       if (error.response.data.error.message === 'The access token expired') {
           cookies = parseCookies()
 
           const {'spotifyauth.refreshToken': refresh_token} = cookies;
 
           const originalConfig = error.config
 
           if(!isRefreshing) {
               isRefreshing = true
               apinext.post('/refresh_token', {
                   refresh_token,
               }).then(response => {
                   const {access_token} = response.data;
  
                   setCookie(undefined, 'spotifyauth.token', access_token, {
                       maxAge: 60 * 60 * 24 * 30,
                       path: '/'
                   })
                   setCookie(undefined, 'spotify.refreshToken', response.data.refresh_token,{
                       maxAge: 60 * 60 * 24 * 30,
                       path: '/'
                   })
  
                   api.defaults.headers['Authorization'] = `Bearer ${access_token}`
                  
                   failedRequestsQueue.forEach(request => request.onSuccess(access_token))
                   failedRequestsQueue = [];
               }).catch(err => {
                   failedRequestsQueue.forEach(request => request.onFailure(err))
                   failedRequestsQueue = [];
 
                   if (process.browser) {
                       signOut();
                   }
               }).finally(() => {
                   isRefreshing = false
               })
           }
 
 
           return new Promise((resolve, reject) => {
               failedRequestsQueue.push({
                   onSuccess: (access_token) => {
                       originalConfig.headers['Authorization'] = `Bearer ${access_token}`
 
                       resolve(api(originalConfig))
                   },
                   onFailure: (err) => {
                       reject(err)
                   }
               })
           })
          
       }
   }
})
