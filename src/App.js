import React from 'react'
import firebase from './firebase'
import Items from './Items'
import {useAuthState} from "react-firebase-hooks/auth";

const auth = firebase.auth();

function App() {

  const [user] = useAuthState(auth);
  return (
    <div >
      <section>
        {user ? <Items /> : <SignIn />}
        {signOut()}
      </section>
    </div>
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
