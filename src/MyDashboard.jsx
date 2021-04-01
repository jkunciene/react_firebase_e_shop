import React from 'react'
import firebase from './firebase'

const auth = firebase.auth();

const MyDashboard = (props) => {
        const {text, uid, description, price, quantity} = props.message;
        console.log(props.message)
       // const loginClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
      <div >       
        <h3>{text}</h3>
        <p>{description}</p>
        <p>Kaina: {price} $ </p>
        <p>Kiekis: {quantity} vnt.</p>
      </div>
  )

  
}

export default MyDashboard
