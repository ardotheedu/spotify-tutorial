export default function Home({link}) {
  return (
    <div className="d-flex align-items-center justify-content-center"
    style={{width: '100vw', height: '100vh'}}>
      <div className="justify-content-center text-center text-primary">
            <h1>Autenticação com Spotify</h1>
            <p>Autorize a aplicação:</p>
            <a href={link} className="btn btn-success">
              Login
              <span style={{margin: "0 0 0 8px"}} className="fa fa-spotify"></span>
            </a>
        </div>
    </div>
  )
 }
  
 import QueryString from "qs";
 var generateRandomString = function(length) {
   var text = '';
   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   for (var i = 0; i < length; i++) {
     text += possible.charAt(Math.floor(Math.random() * possible.length));
   }
   return text;
 };
 var redirect_uri = `http://localhost:3000/callback`;
 export const getServerSideProps = async () => {
  
  const client_id = 'seu client_id'
  const state = generateRandomString(16);
  
  var scope = 'user-top-read';
  const link = 'https://accounts.spotify.com/authorize?' +
    QueryString.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
  });
  return {
    props: {
      link
    },
  }
  
 }
 