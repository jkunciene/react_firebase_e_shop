import React from 'react'
import firebase from './firebase'
import {useAuthState} from "react-firebase-hooks/auth";

const auth = firebase.auth();

const MyDashboard = (props) => {
    console.log(props)
     const [user] = useAuthState(auth);

     
       

  return (
      <div >
       matyti savo prekes
      </div>
  )
}

export default MyDashboard
