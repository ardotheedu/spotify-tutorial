import { createContext } from "react"
import { setCookie } from 'nookies'
 
import Router from "next/router";
import axios from "axios";
 
export const AuthContext = createContext({});
 
export function AuthProvider({ children }) {
 
   async function signIn(code){
       try {
          
           let api = axios.create({
               baseURL: '/api'
           })
           const response = await api.post('/access_token', {
               code,
           })
 
           const {access_token, refresh_token} = response.data;
 
           setCookie(undefined, 'spotifyauth.token', access_token, {
               maxAge: 60 * 60 * 24 * 30,
               path: '/'
           })
 
           setCookie(undefined, 'spotifyauth.refreshToken', refresh_token,{
               maxAge: 60 * 60 * 24 * 30,
               path: '/'
           })
 
           api.defaults.headers['Authorization'] = `Bearer ${access_token}`
 
           Router.push('/ranking')
       } catch (err) {
           console.log(err)
       }
   }
 
 
   return (
       <AuthContext.Provider value={{signIn}}>
           {children}
       </AuthContext.Provider>
   )
}
