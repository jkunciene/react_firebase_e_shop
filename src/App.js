import React from 'react'
import firebase from './firebase'
import Items from './Items'
import {useAuthState} from "react-firebase-hooks/auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Form from './Form';

const auth = firebase.auth();

function App() {

  const [user, loading, error] = useAuthState(auth);

  if(loading){
    return(
     <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
  if(error){
    return(
      <div>
        <p>Error occured! {error}</p>
      </div>
    )
  }

  
  return (
     
      <Router>
      <div >
         <nav>
          <ul className='nav justify-content-center'>
            <li className='nav-link'>
              <Link to="/"  >Home</Link>
            </li>
            <li className='nav-link'>
              <Link to="/form">{user ? "Form" : <SignIn />}</Link>
            </li>          
            <li className='nav-link'>
              <Link to="/"> {signOut()}</Link>
            </li>
           
          </ul>
        </nav>
               
        <Switch>       
          <Route path="/form">
            <Form />
          </Route>
          <Route path="/">
            <Items />
          </Route>
         
        </Switch>
      </div>
    </Router>
  
  );
}

function SignIn() {

  const signInWithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  
  return (
      <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}


function signOut() {
  return auth.currentUser && (

      <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;
