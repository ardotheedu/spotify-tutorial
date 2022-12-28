import { AuthProvider } from '../contexts/loginContext';
 
function MyApp({ Component, pageProps }) {
 
 return (
   <AuthProvider>
     <Component {...pageProps} />
   </AuthProvider>
 )
}
 
export default MyApp