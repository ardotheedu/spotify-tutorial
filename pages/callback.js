import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../contexts/loginContext";
 
export default function Callback() {
   const router = useRouter();
   const { code } = router.query
  
   const {signIn} = useContext(AuthContext)
 
   async function getToken() {
       await signIn(code);
   }
 
   getToken()
   return (
       <div>Redirecionando</div>  
   )
}
