import React, {useState, useEffect} from 'react';
import { api } from '../services/api';
export default function Ranking() {
 const [data, setData] = useState()
 
 
 useEffect(() => {
   api.get('/me/top/artists')
     .then(response =>
       setData(response.data.items)
     )
 }, [])
 
 if(!data) {
     return (
         <div >
             Carregando
         </div>
     )
 }
 return (
      <main>
       <div class="container">
           <div class="row">
               { data && data.map((artist, index) => (
                 <div className="card col-lg-4 d-flex align-items-stretch" key={artist.id} >
                   <img width="250" height="250" src={artist.images[0].url} className="card-img-top" alt="..." />
                   <div className="card-body">
                     <h5 className="card-title">{artist.name}</h5>
                   </div>
                 </div>
             )) }
           </div>
       </div>
      </main>
);
 
};
